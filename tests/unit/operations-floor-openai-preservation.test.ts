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
