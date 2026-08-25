import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { persistRefreshedCredentialsOrThrow } from "../../src/sse/handlers/chatHelpers.ts";

describe("Kimi refreshed credential persistence wiring", () => {
  it("fails closed when the production persistence sink reports failure", async () => {
    let calls = 0;

    await assert.rejects(
      persistRefreshedCredentialsOrThrow(
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

  it("forwards the rotated credential payload and resolves only after persistence succeeds", async () => {
    let capturedConnectionId: string | null = null;
    let capturedPayload: Record<string, unknown> | null = null;

    await persistRefreshedCredentialsOrThrow(
      "kimi-connection",
      {
        apiKey: "new-access",
        accessToken: "new-access",
        refreshToken: "new-refresh",
        expiresAt: "2026-08-25T12:00:00.000Z",
      },
      async (connectionId, payload) => {
        capturedConnectionId = connectionId;
        capturedPayload = payload;
        return true;
      }
    );

    assert.equal(capturedConnectionId, "kimi-connection");
    assert.deepEqual(capturedPayload, {
      accessToken: "new-access",
      refreshToken: "new-refresh",
      expiresIn: undefined,
      expiresAt: "2026-08-25T12:00:00.000Z",
      providerSpecificData: undefined,
      apiKey: "new-access",
      testStatus: "active",
      isActive: undefined,
    });
  });
});
