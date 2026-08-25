import { describe, it } from "node:test";
import assert from "node:assert/strict";
import * as mod from "../../open-sse/executors/kimi-web.ts";

function successfulEndStream(): Uint8Array {
  const frame = mod.frameConnectMessage("{}");
  frame[0] = 2;
  return frame;
}

function authorizationHeader(init?: RequestInit): string | undefined {
  const headers = init?.headers as Record<string, string> | undefined;
  return headers?.Authorization;
}

describe("Kimi Web Executor 401 Retry", () => {
  it("persists rotated access and refresh material exactly once before retrying with the refreshed access token", async () => {
    const executor = new mod.KimiWebExecutor();
    const originalFetch = globalThis.fetch;
    const events: string[] = [];
    const chatAuthorizations: Array<string | undefined> = [];
    const refreshAuthorizations: Array<string | undefined> = [];
    let chatAttempts = 0;
    let persistCount = 0;
    let persistedCredentials: Record<string, unknown> | null = null;

    try {
      globalThis.fetch = (async (url: Parameters<typeof fetch>[0], init?: RequestInit) => {
        const target = String(url);
        if (target.includes("/api/auth/token/refresh")) {
          events.push("refresh");
          refreshAuthorizations.push(authorizationHeader(init));
          return new Response(
            JSON.stringify({
              access_token: "new_refreshed_access_token",
              refresh_token: "new_refresh_token",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }

        chatAttempts += 1;
        chatAuthorizations.push(authorizationHeader(init));
        if (chatAttempts === 1) {
          events.push("initial");
          return new Response(JSON.stringify({ code: "unauthenticated" }), { status: 401 });
        }

        events.push("retry");
        return new Response(successfulEndStream(), {
          status: 200,
          headers: { "content-type": "application/connect+json" },
        });
      }) as typeof fetch;

      const result = await executor.execute({
        model: "k2d6",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: {
          apiKey: "old_expired_token",
          accessToken: "old_expired_token",
          refreshToken: "sample_refresh",
        },
        signal: null,
        onCredentialsRefreshed: async (newCredentials: Record<string, unknown>) => {
          events.push("persist");
          persistCount += 1;
          persistedCredentials = newCredentials;
        },
      } as never);

      assert.equal(result.response.status, 200);
      assert.deepEqual(events, ["initial", "refresh", "persist", "retry"]);
      assert.equal(persistCount, 1);
      assert.deepEqual(chatAuthorizations, [
        "Bearer old_expired_token",
        "Bearer new_refreshed_access_token",
      ]);
      assert.deepEqual(refreshAuthorizations, ["Bearer sample_refresh"]);
      assert.equal(persistedCredentials?.apiKey, "new_refreshed_access_token");
      assert.equal(persistedCredentials?.accessToken, "new_refreshed_access_token");
      assert.equal(persistedCredentials?.refreshToken, "new_refresh_token");
      assert.equal(typeof persistedCredentials?.expiresAt, "string");
      assert.ok(Number.isFinite(Date.parse(String(persistedCredentials?.expiresAt))));
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("fails closed when rotated credentials cannot be persisted and never retries with unpersisted material", async () => {
    const executor = new mod.KimiWebExecutor();
    const originalFetch = globalThis.fetch;
    const events: string[] = [];
    let chatAttempts = 0;

    try {
      globalThis.fetch = (async (url: Parameters<typeof fetch>[0]) => {
        const target = String(url);
        if (target.includes("/api/auth/token/refresh")) {
          events.push("refresh");
          return new Response(
            JSON.stringify({
              access_token: "new_refreshed_access_token",
              refresh_token: "new_refresh_token",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }

        chatAttempts += 1;
        events.push(chatAttempts === 1 ? "initial" : "retry");
        if (chatAttempts === 1) {
          return new Response(JSON.stringify({ code: "unauthenticated" }), { status: 401 });
        }
        return new Response(successfulEndStream(), { status: 200 });
      }) as typeof fetch;

      await assert.rejects(
        executor.execute({
          model: "k2d6",
          body: { messages: [{ role: "user", content: "hi" }] },
          stream: false,
          credentials: {
            apiKey: "old_expired_token",
            accessToken: "old_expired_token",
            refreshToken: "sample_refresh",
          },
          signal: null,
          onCredentialsRefreshed: async () => {
            events.push("persist");
            throw new Error("credential store unavailable");
          },
        } as never),
        /credential store unavailable/
      );

      assert.deepEqual(events, ["initial", "refresh", "persist"]);
      assert.equal(chatAttempts, 1, "retry must not run after persistence failure");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("does not consume a refresh token when no durable credential persistence callback exists", async () => {
    const executor = new mod.KimiWebExecutor();
    const originalFetch = globalThis.fetch;
    let chatAttempts = 0;
    let refreshAttempts = 0;

    try {
      globalThis.fetch = (async (url: Parameters<typeof fetch>[0]) => {
        const target = String(url);
        if (target.includes("/api/auth/token/refresh")) {
          refreshAttempts += 1;
          return new Response(
            JSON.stringify({ access_token: "new_refreshed_access_token" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }

        chatAttempts += 1;
        if (chatAttempts === 1) {
          return new Response(JSON.stringify({ code: "unauthenticated" }), { status: 401 });
        }
        return new Response(successfulEndStream(), { status: 200 });
      }) as typeof fetch;

      const result = await executor.execute({
        model: "k2d6",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: {
          apiKey: "old_expired_token",
          accessToken: "old_expired_token",
          refreshToken: "sample_refresh",
        },
        signal: null,
      } as never);

      assert.equal(result.response.status, 401);
      assert.equal(refreshAttempts, 0, "rotating refresh token must not be consumed without a sink");
      assert.equal(chatAttempts, 1, "no retry is allowed without durable refreshed credentials");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
