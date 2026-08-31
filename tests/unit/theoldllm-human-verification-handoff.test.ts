import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  __resetTheOldLlmHumanVerificationFetchOverrideForTesting,
  __setTheOldLlmHumanVerificationFetchOverrideForTesting,
  createTheOldLlmHumanVerificationCoordinator,
} from "../../open-sse/services/theOldLlmHumanVerification.ts";
import { TheOldLlmExecutor } from "../../open-sse/executors/theoldllm.ts";

test("OldLLM human-verification coordinator is headful, ephemeral, and stores no credentials", async () => {
  const events: string[] = [];
  let now = 1000;
  const evaluateResult = {
    status: 200,
    contentType: "text/event-stream",
    body: 'data: {"choices":[{"delta":{"content":"browser-ok"}}]}\n\ndata: [DONE]\n',
  };

  const page = {
    goto: async (url: string) => {
      events.push(`goto:${url}`);
    },
    evaluate: async (_fn: unknown, arg: { path: string; body: unknown }) => {
      events.push(`evaluate:${arg.path}`);
      assert.deepEqual(arg.body, { model: "GPT_5_4", messages: [] });
      return evaluateResult;
    },
    isClosed: () => false,
  };

  const context = {
    newPage: async () => {
      events.push("newPage");
      return page;
    },
    close: async () => {
      events.push("context.close");
    },
  };

  const browser = {
    newContext: async (options: Record<string, unknown>) => {
      events.push("newContext");
      assert.equal("storageState" in options, false);
      return context;
    },
    close: async () => {
      events.push("browser.close");
    },
  };

  const timerHandles: unknown[] = [];
  const coordinator = createTheOldLlmHumanVerificationCoordinator({
    now: () => now,
    setTimer: (_fn, _ms) => {
      const handle = { unref() {} };
      timerHandles.push(handle);
      return handle as ReturnType<typeof setTimeout>;
    },
    clearTimer: () => {},
    launchBrowser: async (options) => {
      events.push("launch");
      assert.equal(options.headless, false);
      return browser;
    },
  });

  const started = await coordinator.start();
  assert.equal(started.active, true);
  assert.equal(started.phase, "waiting");
  assert.equal(started.origin, "https://theoldllm.vercel.app");
  assert.ok(started.expiresAt! > started.startedAt!);

  const result = await coordinator.execute({ model: "GPT_5_4", messages: [] });
  assert.deepEqual(result, evaluateResult);
  assert.equal(coordinator.status().phase, "verified");
  assert.ok(events.includes("goto:https://theoldllm.vercel.app"));
  assert.ok(events.includes("evaluate:/api/chatgpt"));

  now += 1;
  await coordinator.stop("test-complete");
  assert.equal(coordinator.status().active, false);
  assert.ok(events.includes("context.close"));
  assert.ok(events.includes("browser.close"));
  assert.equal(timerHandles.length, 1);
});

test("OldLLM executor uses active browser handoff before any server fetch", async () => {
  const originalFetch = globalThis.fetch;
  let serverFetchCalled = false;
  globalThis.fetch = (async () => {
    serverFetchCalled = true;
    throw new Error("NETWORK_FORBIDDEN_IN_TEST");
  }) as typeof fetch;

  __setTheOldLlmHumanVerificationFetchOverrideForTesting(async (body) => {
    assert.equal(body.model, "GPT_5_4");
    return {
      status: 200,
      contentType: "text/event-stream",
      body: 'data: {"choices":[{"delta":{"content":"browser-path"}}]}\n\ndata: [DONE]\n',
    };
  });

  try {
    const executor = new TheOldLlmExecutor();
    const result = await executor.execute({
      model: "gpt-5.4",
      stream: true,
      body: { messages: [{ role: "user", content: "hello" }] },
      credentials: {},
      signal: null,
    } as never);

    assert.equal(result.response.status, 200);
    assert.match(await result.response.text(), /browser-path/);
    assert.equal(serverFetchCalled, false);
  } finally {
    __resetTheOldLlmHumanVerificationFetchOverrideForTesting();
    globalThis.fetch = originalFetch;
  }
});

test("OldLLM executor preserves fail-closed human-verification error through browser handoff", async () => {
  __setTheOldLlmHumanVerificationFetchOverrideForTesting(async () => ({
    status: 403,
    contentType: "text/html",
    body: "Verify you are human before continuing",
  }));

  try {
    const executor = new TheOldLlmExecutor();
    const result = await executor.execute({
      model: "gpt-5.4",
      stream: true,
      body: { messages: [{ role: "user", content: "hello" }] },
      credentials: {},
      signal: null,
    } as never);

    assert.equal(result.response.status, 503);
    const payload = JSON.parse(await result.response.text());
    assert.equal(payload.error.code, "THEOLDLLM_HUMAN_VERIFICATION_REQUIRED");
    assert.equal(
      payload.error.verification_endpoint,
      "/api/providers/theoldllm/human-verification"
    );
  } finally {
    __resetTheOldLlmHumanVerificationFetchOverrideForTesting();
  }
});

test("OldLLM management route is authenticated and never persists provider credentials", () => {
  const route = fs.readFileSync(
    path.join(
      process.cwd(),
      "src/app/api/providers/theoldllm/human-verification/route.ts"
    ),
    "utf8"
  );

  assert.match(route, /requireManagementAuth/);
  assert.match(route, /startTheOldLlmHumanVerification/);
  assert.match(route, /stopTheOldLlmHumanVerification/);
  assert.doesNotMatch(route, /createProviderConnection/);
  assert.doesNotMatch(route, /webSessionCredentials/);
});

test("OldLLM coordinator source contains no challenge/session extraction path", () => {
  const service = fs.readFileSync(
    path.join(process.cwd(), "open-sse/services/theOldLlmHumanVerification.ts"),
    "utf8"
  );

  for (const forbidden of [
    "context.cookies(",
    "storageState(",
    "localStorage.getItem",
    "sessionStorage.getItem",
    "request.allHeaders",
    "cf_clearance",
    "x-is-human",
    "x-path",
    "x-method",
    "x-request-token",
  ]) {
    assert.equal(
      service.toLowerCase().includes(forbidden.toLowerCase()),
      false,
      `service must not contain ${forbidden}`
    );
  }
});

test("OldLLM human-verification route always requires management auth", () => {
  const route = fs.readFileSync(
    path.join(
      process.cwd(),
      "src/app/api/providers/theoldllm/human-verification/route.ts"
    ),
    "utf8"
  );

  const matches = route.match(
    /requireManagementAuth\(request,\s*\{\s*alwaysRequireAuth:\s*true\s*\}\)/g
  );
  assert.equal(matches?.length, 3);
});
