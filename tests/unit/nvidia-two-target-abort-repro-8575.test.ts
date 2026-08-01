import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-nvidia-8575-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "nvidia-8575-test-secret";

const [{ handleComboChat }, { resolveDispatchClientRawRequest }] = await Promise.all([
  import("../../open-sse/services/combo.ts"),
  import("../../src/sse/handlers/chat/clientRawRequest.ts"),
]);

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

const firstModel = "nvidia/z-ai/glm-5.2";
const secondModel = "nvidia/deepseek-ai/deepseek-v4-pro";

function makeTwoTargetCombo(name: string, targetTimeoutMs: number) {
  return {
    name,
    strategy: "priority",
    models: [{ model: firstModel }, { model: secondModel }],
    config: {
      targetTimeoutMs,
      maxRetries: 0,
      maxSetRetries: 0,
      retryDelayMs: 0,
      fallbackDelayMs: 0,
    },
  };
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test("#8575: timed-out NVIDIA target is aborted before the second target succeeds", async () => {
  const clientAbortController = new AbortController();
  const attemptedModels: string[] = [];
  const infoMessages: string[] = [];
  let firstTargetAbortObserved = false;
  let firstTargetStillActive = false;
  let firstTargetCompletedLate = false;

  const testLog = {
    ...log,
    info: (...args: unknown[]) => infoMessages.push(args.map(String).join(" ")),
  };

  const handleSingleModel = async (
    _body: Record<string, unknown>,
    modelStr: string,
    target?: { modelAbortSignal?: AbortSignal | null }
  ): Promise<Response> => {
    attemptedModels.push(modelStr);

    const dispatchRequest = resolveDispatchClientRawRequest(
      { signal: clientAbortController.signal },
      target?.modelAbortSignal
    );

    if (modelStr === firstModel) {
      firstTargetStillActive = true;
      return new Promise<Response>((resolve, reject) => {
        const lateCompletion = setTimeout(() => {
          firstTargetStillActive = false;
          firstTargetCompletedLate = true;
          resolve(new Response("late first-target success", { status: 200 }));
        }, 150);

        const onAbort = () => {
          clearTimeout(lateCompletion);
          firstTargetStillActive = false;
          firstTargetAbortObserved = true;
          reject(dispatchRequest?.signal?.reason ?? new Error("first target aborted"));
        };

        if (dispatchRequest?.signal?.aborted) onAbort();
        else dispatchRequest?.signal?.addEventListener("abort", onAbort, { once: true });
      });
    }

    return new Response("second target success", { status: 200 });
  };

  const result = await handleComboChat({
    body: { model: "nvidia-repro", messages: [{ role: "user", content: "ping" }] },
    combo: makeTwoTargetCombo("nvidia-8575-timeout", 25),
    handleSingleModel,
    log: testLog,
    settings: {},
    allCombos: [],
    signal: clientAbortController.signal,
  });

  assert.deepEqual(
    attemptedModels,
    [firstModel, secondModel],
    `the combo should time out target one, then attempt target two exactly once; logs=${infoMessages.join(" | ")}`
  );
  assert.equal(result.status, 200, "the second NVIDIA target should complete the combo");
  assert.equal(firstTargetAbortObserved, true, "target one must observe its timeout abort");
  assert.equal(firstTargetStillActive, false, "target one must be inactive before combo success");

  await wait(175);
  assert.equal(
    firstTargetCompletedLate,
    false,
    "the abandoned target must not complete after the fallback has succeeded"
  );
});

test("#8575: client abort stops the active NVIDIA target and prevents target-two fallback", async () => {
  const clientAbortController = new AbortController();
  const attemptedModels: string[] = [];
  let firstTargetAbortObserved = false;
  let firstTargetStillActive = false;

  const handleSingleModel = async (
    _body: Record<string, unknown>,
    modelStr: string,
    target?: { modelAbortSignal?: AbortSignal | null }
  ): Promise<Response> => {
    attemptedModels.push(modelStr);

    if (modelStr !== firstModel) {
      return new Response("unexpected fallback", { status: 200 });
    }

    const dispatchRequest = resolveDispatchClientRawRequest(
      { signal: clientAbortController.signal },
      target?.modelAbortSignal
    );

    firstTargetStillActive = true;
    return new Promise<Response>((resolve) => {
      const unexpectedCompletion = setTimeout(() => {
        firstTargetStillActive = false;
        resolve(new Response("unexpected first-target success", { status: 200 }));
      }, 300);

      const onAbort = () => {
        clearTimeout(unexpectedCompletion);
        firstTargetAbortObserved = true;
        firstTargetStillActive = false;
        resolve(new Response("Client disconnected", { status: 499 }));
      };

      if (dispatchRequest?.signal?.aborted) onAbort();
      else dispatchRequest?.signal?.addEventListener("abort", onAbort, { once: true });
    });
  };

  const abortTimer = setTimeout(
    () => clientAbortController.abort(new Error("client disconnected")),
    25
  );
  const startedAt = Date.now();

  const result = await handleComboChat({
    body: { model: "nvidia-repro", messages: [{ role: "user", content: "ping" }] },
    combo: makeTwoTargetCombo("nvidia-8575-client-abort", 500),
    handleSingleModel,
    log,
    settings: {},
    allCombos: [],
    signal: clientAbortController.signal,
  });

  clearTimeout(abortTimer);
  const elapsedMs = Date.now() - startedAt;

  assert.equal(result.status, 499, "the combo should surface the client disconnect");
  assert.deepEqual(
    attemptedModels,
    [firstModel],
    "a client disconnect must not cascade to the second NVIDIA target"
  );
  assert.equal(firstTargetAbortObserved, true, "the active target must observe client abort");
  assert.equal(firstTargetStillActive, false, "the active target must be cleaned up");
  assert.ok(elapsedMs < 250, `client abort cleanup took too long: ${elapsedMs}ms`);
});
