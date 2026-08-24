import assert from "node:assert/strict";
import { test } from "node:test";

import {
  getKimiWebBaseUrl,
  getKimiWebChatUrl,
  getKimiWebCookieDomain,
  getKimiWebUserUrl,
} from "../../open-sse/utils/kimiWebUrls.ts";
import { getExtractionConfig } from "../../open-sse/services/tokenExtractionConfig.ts";
import { getWebSessionCredentialRequirement } from "../../src/shared/providers/webSessionCredentials.ts";
import { validateKimiWebProvider } from "../../src/lib/providers/validation/webProvidersA.ts";

test("Kimi web auth surfaces share the international kimi.ai origin", () => {
  assert.equal(getKimiWebBaseUrl(), "https://www.kimi.ai");

  assert.equal(getKimiWebUserUrl(), "https://www.kimi.ai/api/user");

  assert.equal(
    getKimiWebChatUrl(),
    "https://www.kimi.ai/apiv2/kimi.gateway.chat.v1.ChatService/Chat"
  );

  assert.equal(getKimiWebCookieDomain(), ".kimi.ai");
});

test("Kimi browser capture includes access and refresh token lifecycle", () => {
  const config = getExtractionConfig("kimi-web");

  assert.ok(config);

  assert.equal(config.loginUrl, "https://www.kimi.ai/");

  assert.equal(config.homeUrl, "https://www.kimi.ai");

  assert.ok(
    config.tokenSources.some(
      (source) => source.type === "localStorage" && source.key === "access_token"
    )
  );

  assert.ok(
    config.tokenSources.some(
      (source) => source.type === "localStorage" && source.key === "refresh_token"
    )
  );

  assert.ok(
    config.tokenSources.some(
      (source) =>
        source.type === "cookie" && source.name === "kimi-auth" && source.domain === ".kimi.ai"
    )
  );

  const requirement = getWebSessionCredentialRequirement("kimi-web");

  assert.ok(requirement);
  assert.notEqual(requirement.kind, "none");

  if (requirement.kind === "none") {
    throw new Error("kimi-web must require a token credential");
  }

  assert.ok(requirement.storageKeys.includes("refresh_token"));

  assert.ok(requirement.storageKeys.includes("refreshToken"));
});

test("Kimi validator proves Bearer access token against kimi.ai user boundary", async () => {
  const originalFetch = globalThis.fetch;

  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;

  try {
    globalThis.fetch = (async (url: Parameters<typeof fetch>[0], init?: RequestInit) => {
      capturedUrl = String(url);
      capturedInit = init;

      return new Response(
        JSON.stringify({
          id: "user-test-123",
          name: "Kimi Test",
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        }
      );
    }) as typeof fetch;

    const result = await validateKimiWebProvider({
      apiKey: "fresh-access-token",
    });

    assert.equal(result.valid, true);

    assert.equal(capturedUrl, "https://www.kimi.ai/api/user");

    const headers = capturedInit?.headers as Record<string, string>;

    assert.equal(headers.Authorization, "Bearer fresh-access-token");

    assert.equal(headers.Origin, "https://www.kimi.ai");

    assert.equal(headers.Referer, "https://www.kimi.ai/");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Kimi validator preserves real auth rejection status", async () => {
  const originalFetch = globalThis.fetch;

  try {
    globalThis.fetch = (async () =>
      new Response(
        JSON.stringify({
          error: "unauthorized",
        }),
        {
          status: 401,
          headers: {
            "content-type": "application/json",
          },
        }
      )) as typeof fetch;

    const result = await validateKimiWebProvider({
      apiKey: "expired-access-token",
    });

    assert.equal(result.valid, false);

    assert.equal(result.statusCode, 401);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
