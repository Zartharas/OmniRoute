import test from "node:test";
import assert from "node:assert/strict";
import { SafeOutboundFetchError } from "../../src/shared/network/safeOutboundFetch.ts";
import { normalizeNvidiaValidationFailure } from "../../src/lib/providers/validation/specialtyInline.ts";
import { OAUTH_TEST_CONFIG } from "../../src/app/api/providers/[id]/test/oauthTestConfig.ts";

test("NVIDIA timeout probe is credential-inconclusive instead of an auth failure", () => {
  const error = new SafeOutboundFetchError(
    "Request to https://integrate.api.nvidia.com/v1/chat/completions timed out after 20000ms",
    {
      code: "TIMEOUT",
      url: "https://integrate.api.nvidia.com/v1/chat/completions",
      method: "POST",
      attempts: 1,
      isRetryable: true,
      timeoutMs: 20_000,
    }
  );

  const result = normalizeNvidiaValidationFailure(error) as {
    valid: boolean;
    error: string | null;
    method?: string;
    warning?: string;
  };

  assert.equal(result.valid, true);
  assert.equal(result.error, null);
  assert.equal(result.method, "chat_probe_inconclusive");
  assert.match(String(result.warning), /credential validity is inconclusive/i);
});

test("NVIDIA non-timeout network failures remain failures", () => {
  const error = new SafeOutboundFetchError("fetch failed", {
    code: "NETWORK_ERROR",
    url: "https://integrate.api.nvidia.com/v1/chat/completions",
    method: "POST",
    attempts: 1,
    isRetryable: true,
  });

  const result = normalizeNvidiaValidationFailure(error);

  assert.equal(result.valid, false);
  assert.equal(result.error, "fetch failed");
});

test("Antigravity and AGY treat HTTP 400 as auth-accepted, not credential failure", () => {
  assert.deepEqual(OAUTH_TEST_CONFIG.antigravity?.acceptStatuses, [400]);
  assert.deepEqual(OAUTH_TEST_CONFIG.agy?.acceptStatuses, [400]);
  assert.ok(!OAUTH_TEST_CONFIG.antigravity?.acceptStatuses?.includes(401));
  assert.ok(!OAUTH_TEST_CONFIG.antigravity?.acceptStatuses?.includes(403));
  assert.ok(!OAUTH_TEST_CONFIG.agy?.acceptStatuses?.includes(401));
  assert.ok(!OAUTH_TEST_CONFIG.agy?.acceptStatuses?.includes(403));
});
