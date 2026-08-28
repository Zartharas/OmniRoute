import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { updateProviderCredentials } from "../../src/sse/services/tokenRefresh.ts";

describe("refreshed credential persistence", () => {
  it("fails closed when the persistence sink reports failure", async () => {
    let calls = 0;

    await assert.rejects(
      updateProviderCredentials(
        "kimi-connection",
        {
          apiKey: "new-access",
          accessToken: "new-access",
          refreshToken: "new-refresh",
          expiresAt: "2026-08-25T12:00:00.000Z",
        },
        async () => {
          calls += 1;
          return false;
        }
      ),
      /persist refreshed provider credentials/i
    );

    assert.equal(calls, 1);
  });

  it("forwards rotated credential material and acknowledges only durable persistence", async () => {
    let capturedConnectionId: string | null = null;
    let capturedUpdates: Record<string, unknown> | null = null;

    const persisted = await updateProviderCredentials(
      "kimi-connection",
      {
        apiKey: "new-access",
        accessToken: "new-access",
        refreshToken: "new-refresh",
        expiresAt: "2026-08-25T12:00:00.000Z",
      },
      async (connectionId, updates) => {
        capturedConnectionId = connectionId;
        capturedUpdates = updates;
        return { id: connectionId };
      }
    );

    assert.equal(persisted, true);
    assert.equal(capturedConnectionId, "kimi-connection");
    assert.deepEqual(capturedUpdates, {
      accessToken: "new-access",
      testStatus: "active",
      lastError: null,
      lastErrorAt: null,
      lastErrorType: null,
      lastErrorSource: null,
      errorCode: null,
      refreshToken: "new-refresh",
      expiresAt: "2026-08-25T12:00:00.000Z",
      tokenExpiresAt: "2026-08-25T12:00:00.000Z",
      apiKey: "new-access",
    });
  });
});
