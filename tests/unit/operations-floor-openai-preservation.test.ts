import test from "node:test";
import assert from "node:assert/strict";

const {
  buildOperationsAttentionItems,
  getOperationsLane,
  isProtectedOpenAiProvider,
  normalizeOperationsProviderId,
  summarizeOpenAiPreservation,
} = await import(
  "../../src/app/(dashboard)/dashboard/operations-floor/operationsFloorModel.ts"
);
const {
  buildOperationsFloorSimulation,
  OPERATIONS_FLOOR_SIMULATION_FINAL_STEP,
} = await import(
  "../../src/app/(dashboard)/dashboard/operations-floor/operationsFloorSimulation.ts"
);
const {
  deriveOperationsFloorSystemSignals,
  isFreshOperationsFloorSystemSignal,
} = await import(
  "../../src/app/(dashboard)/dashboard/operations-floor/operationsFloorSystemSignals.ts"
);

test("operations floor recognizes only the protected OpenAI provider family", () => {
  assert.equal(isProtectedOpenAiProvider("codex"), true);
  assert.equal(isProtectedOpenAiProvider(" OpenAI "), true);
  assert.equal(isProtectedOpenAiProvider("chatgpt-web-codex"), true);
  assert.equal(isProtectedOpenAiProvider("deepseek-web"), false);
  assert.equal(isProtectedOpenAiProvider("zai"), false);
});

test("operations floor provider normalization is defensive", () => {
  assert.equal(normalizeOperationsProviderId("  CoDeX  "), "codex");
  assert.equal(normalizeOperationsProviderId(null), "");
  assert.equal(normalizeOperationsProviderId(42), "");
});

test("operations floor classifies request animation lanes", () => {
  assert.equal(getOperationsLane("deepseek-web"), "primary");
  assert.equal(getOperationsLane("zai"), "primary");
  assert.equal(getOperationsLane("codex"), "protected");
  assert.equal(getOperationsLane("chatgpt-web-codex"), "protected");
  assert.equal(getOperationsLane("   "), null);
  assert.equal(getOperationsLane(undefined), null);
});

test("preservation summary reports observed routing without inventing token savings", () => {
  const summary = summarizeOpenAiPreservation([
    { provider: "deepseek-web", tokensInput: 1000, tokensOutput: 200 },
    { provider: "zai", tokensInput: 500, tokensOutput: 100 },
    { provider: "codex", tokensInput: 750, tokensOutput: 300 },
    { provider: "", tokensInput: 9999, tokensOutput: 9999 },
  ]);

  assert.equal(summary.observedRequests, 3);
  assert.equal(summary.openAiRequests, 1);
  assert.equal(summary.nonOpenAiRequests, 2);
  assert.equal(summary.nonOpenAiShare, 2 / 3);
  assert.equal(summary.observedInputTokens, 2250);
  assert.equal(summary.observedOutputTokens, 600);
  assert.equal("tokensSaved" in summary, false);
});

test("attention queue derives provider errors and active rate limits from observed state", () => {
  const now = Date.UTC(2026, 7, 19, 15, 0, 0);
  const items = buildOperationsAttentionItems(
    [
      { id: "a", provider: "zai", testStatus: "failed" },
      { id: "b", provider: "zai", testStatus: "success" },
      { id: "c", provider: "mistral", rateLimitedUntil: now + 60_000 },
      { id: "d", provider: "deepseek-web", rateLimitedUntil: now - 60_000 },
    ],
    [],
    [],
    now
  );

  assert.equal(items.some((item) => item.id === "provider-error:zai" && item.severity === "error"), true);
  assert.equal(items.some((item) => item.id === "provider-rate-limit:mistral"), true);
  assert.equal(items.some((item) => item.id === "provider-rate-limit:deepseek-web"), false);
});

test("attention queue surfaces failed requests and protected fallback attempts without inventing causes", () => {
  const now = Date.UTC(2026, 7, 19, 15, 0, 0);
  const items = buildOperationsAttentionItems(
    [],
    [
      {
        id: "req-1",
        provider: "zai",
        model: "glm",
        status: "error",
        error: "HTTP 401",
        timestamp: now - 1_000,
      },
    ],
    [
      {
        comboName: "coding-primary",
        provider: "codex",
        model: "gpt-5",
        type: "attempt",
        timestamp: now,
      },
    ],
    now
  );

  const request = items.find((item) => item.requestId === "req-1");
  assert.equal(request?.detail, "HTTP 401");
  assert.equal(request?.provider, "zai");

  const protectedFallback = items.find((item) => item.kind === "fallback");
  assert.equal(protectedFallback?.title, "Protected OpenAI lane was reached");
  assert.match(protectedFallback?.detail ?? "", /coding-primary/);
  assert.equal(protectedFallback?.severity, "warning");
});

test("attention queue distinguishes primary target failures from fallback failures", () => {
  const now = Date.UTC(2026, 7, 19, 18, 30, 0);
  const primary = buildOperationsAttentionItems(
    [],
    [],
    [
      {
        comboName: "coding-primary",
        targetIndex: 0,
        provider: "deepseek-web",
        model: "deepseek-reasoner",
        type: "failed",
        error: "primary failed",
        timestamp: now,
      },
    ],
    now
  );
  const fallback = buildOperationsAttentionItems(
    [],
    [],
    [
      {
        comboName: "coding-primary",
        targetIndex: 1,
        provider: "codex",
        model: "gpt-5",
        type: "failed",
        error: "fallback failed",
        timestamp: now,
      },
    ],
    now
  );

  assert.equal(primary.find((item) => item.id.startsWith("combo-failed:"))?.title, "coding-primary primary target failed");
  assert.equal(fallback.find((item) => item.id.startsWith("combo-failed:"))?.title, "coding-primary fallback attempt failed");
});

test("zero-call simulation stages primary routing before protected fallback", () => {
  const now = Date.UTC(2026, 7, 19, 18, 30, 0);
  const primary = buildOperationsFloorSimulation(1, now);
  const failed = buildOperationsFloorSimulation(2, now);
  const fallback = buildOperationsFloorSimulation(3, now);

  assert.equal(primary.activeRequests.length, 1);
  assert.equal(primary.activeRequests[0]?.provider, "deepseek-web");
  assert.equal(primary.comboEvents[0]?.type, "attempt");
  assert.equal(primary.comboEvents[0]?.provider, "deepseek-web");

  assert.equal(failed.activeRequests.length, 0);
  assert.equal(failed.completedRequests[0]?.status, "error");
  assert.equal(failed.connections.find((connection) => connection.provider === "deepseek-web")?.testStatus, "error");

  assert.equal(fallback.activeRequests.length, 1);
  assert.equal(fallback.activeRequests[0]?.provider, "codex");
  assert.equal(fallback.comboEvents.some((event) => event.type === "attempt" && event.provider === "codex"), true);
});

test("zero-call simulation completes with evidence but no invented token usage", () => {
  const now = Date.UTC(2026, 7, 19, 18, 30, 0);
  const snapshot = buildOperationsFloorSimulation(OPERATIONS_FLOOR_SIMULATION_FINAL_STEP, now);
  const summary = summarizeOpenAiPreservation(snapshot.completedRequests);

  assert.equal(snapshot.label, "completed");
  assert.equal(snapshot.activeRequests.length, 0);
  assert.equal(snapshot.completedRequests.some((request) => request.provider === "codex" && request.status === "success"), true);
  assert.equal(snapshot.comboEvents.some((event) => event.provider === "codex" && event.type === "succeeded"), true);
  assert.equal(summary.openAiRequests, 1);
  assert.equal(summary.nonOpenAiRequests, 1);
  assert.equal(summary.observedInputTokens, 0);
  assert.equal(summary.observedOutputTokens, 0);
});

test("system telemetry derives only supported auth and compression evidence", () => {
  const now = Date.UTC(2026, 7, 19, 19, 30, 0);
  const signals = deriveOperationsFloorSystemSignals([
    {
      event: "credential.health.changed",
      channel: "credentials",
      timestamp: now - 5_000,
      data: { provider: "zai", oldStatus: "degraded", newStatus: "healthy" },
    },
    {
      event: "compression.step",
      channel: "compression",
      timestamp: now - 4_000,
      data: { engine: "rtk", state: "running", stepIndex: 0, totalSteps: 2 },
    },
    {
      event: "compression.debug",
      channel: "compression",
      timestamp: now - 3_000,
      data: { engine: "unknown" },
    },
    {
      event: "compression.completed",
      channel: "compression",
      timestamp: now - 2_000,
      data: { mode: "stacked", savingsPercent: 64, originalTokens: 1000, compressedTokens: 360 },
    },
  ]);

  assert.equal(signals.auth?.provider, "zai");
  assert.equal(signals.auth?.oldStatus, "degraded");
  assert.equal(signals.auth?.newStatus, "healthy");
  assert.equal(signals.compression?.event, "compression.completed");
  assert.equal(signals.compression?.mode, "stacked");
  assert.equal(signals.compression?.savingsPercent, 64);
  assert.equal(signals.compression?.originalTokens, 1000);
  assert.equal(signals.compression?.compressedTokens, 360);
});

test("system floor animation freshness is bounded to recent observed events", () => {
  const now = Date.UTC(2026, 7, 19, 19, 30, 0);
  assert.equal(isFreshOperationsFloorSystemSignal({ timestamp: now - 10_000 }, now), true);
  assert.equal(isFreshOperationsFloorSystemSignal({ timestamp: now - 20_000 }, now), false);
  assert.equal(isFreshOperationsFloorSystemSignal({ timestamp: now + 1_000 }, now), false);
  assert.equal(isFreshOperationsFloorSystemSignal(null, now), false);
});
