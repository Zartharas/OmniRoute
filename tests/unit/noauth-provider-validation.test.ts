/**
 * Tests for noAuth provider validation:
 * - noAuth is a presentation/access category, not an API-key capability
 * - only explicitly supported free providers may create optional API-key connections
 * - `kimi` API key provider stays on the dedicated Moonshot executor
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  NOAUTH_PROVIDERS,
  providerAllowsOptionalApiKey,
  supportsNoAuthProviderProxy,
} from "../../src/shared/constants/providers.ts";
import { hasSpecializedExecutor } from "../../open-sse/executors/index.ts";

test("OpenCode explicitly allows an optional API key in addition to anonymous use", () => {
  assert.equal(providerAllowsOptionalApiKey("opencode"), true);
});

for (const provider of ["theoldllm", "chipotle", "duckduckgo-web", "veoaifree-web"]) {
  test(`${provider} does not gain optional API-key capability from noAuth membership`, () => {
    assert.equal(providerAllowsOptionalApiKey(provider), false);
  });
}

// `kimi` is the hidden legacy id for Moonshot API compatibility, not Kimi Web.
test("kimi API key provider uses the specialized Moonshot executor", () => {
  assert.equal(hasSpecializedExecutor("kimi"), true);
});

// no regression: kimi-web and kimi-coding still have their executors
test("kimi-web still has specialized executor", () => {
  assert.equal(hasSpecializedExecutor("kimi-web"), true);
});

test("kimi-coding-apikey still has specialized executor", () => {
  assert.equal(hasSpecializedExecutor("kimi-coding-apikey"), true);
});

test("provider proxy controls use a centralized no-auth capability allowlist", () => {
  assert.equal(supportsNoAuthProviderProxy("opencode"), true);
  assert.equal(supportsNoAuthProviderProxy("theoldllm"), true);

  for (const providerId of Object.keys(NOAUTH_PROVIDERS)) {
    if (providerId !== "opencode" && providerId !== "theoldllm") {
      assert.equal(supportsNoAuthProviderProxy(providerId), false, providerId);
    }
  }
});
