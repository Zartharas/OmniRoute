/**
 * R16.13 OpenCode free-catalog contract.
 *
 * Evidence basis (2026-08-28):
 * - The accepted base `opencode` registry drifted behind its sibling
 *   `opencode-zen` registry (which already records north-mini-code-free as
 *   delisted).
 * - OpenCode's public /zen/v1/models catalog advertises the current rotating
 *   free-suffix surface.
 * - Runtime auth must remain dual-mode: paid/unknown models require API key;
 *   free models stay keyless; opencode-go always requires a key.
 *
 * This test is intentionally local/static. It performs no upstream request.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { opencodeProvider } from "../../open-sse/config/providers/registry/opencode/index.ts";
import { opencode_zenProvider } from "../../open-sse/config/providers/registry/opencode/zen/index.ts";
import { isPremiumOpencodeModel } from "../../open-sse/executors/opencode.ts";

const CURRENT_FREE_CATALOG = [
  "big-pickle",
  "deepseek-v4-flash-free",
  "muse-spark-1.2-contributor-free",
  "mimo-v2.5-free",
  "hy3-free",
  "ling-3.0-flash-fin-free",
  "nemotron-3-ultra-free",
  "nemotron-3.5-lightning-free",
  "laguna-s-2.1-free",
] as const;

function modelIds(provider: { models?: Array<{ id: string }> }): Set<string> {
  return new Set((provider.models ?? []).map((model) => model.id));
}

test("base oc and opencode-zen registries expose the synchronized rotating free catalog", () => {
  const base = modelIds(opencodeProvider);
  const zen = modelIds(opencode_zenProvider);

  for (const id of CURRENT_FREE_CATALOG) {
    assert.equal(base.has(id), true, `base registry missing current free model: ${id}`);
    assert.equal(zen.has(id), true, `zen registry missing current free model: ${id}`);
  }

  assert.equal(
    base.has("north-mini-code-free"),
    false,
    "base registry still advertises delisted north-mini-code-free"
  );
  assert.equal(
    zen.has("north-mini-code-free"),
    false,
    "zen registry still advertises delisted north-mini-code-free"
  );
});

test("OpenCode auth remains dual-mode and fail-closed for unknown premium models", () => {
  assert.equal(opencodeProvider.authType, "apikey");
  assert.equal(opencodeProvider.passthroughModels, true);

  assert.equal(isPremiumOpencodeModel("big-pickle", "opencode"), false);
  assert.equal(isPremiumOpencodeModel("big-pickle", "opencode-zen"), false);

  assert.equal(isPremiumOpencodeModel("future-rotation-free", "opencode"), false);
  assert.equal(isPremiumOpencodeModel("future-rotation-free", "opencode-zen"), false);

  assert.equal(isPremiumOpencodeModel("gpt-5-nano", "opencode"), true);
  assert.equal(isPremiumOpencodeModel("unknown-future-paid-model", "opencode"), true);

  assert.equal(isPremiumOpencodeModel("hy3-free", "opencode-go"), true);
});
