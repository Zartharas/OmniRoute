import assert from "node:assert/strict";
import test from "node:test";

import { buildLMArenaWireRequest } from "../../open-sse/executors/lmarena.ts";

const UUID_V7_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function baseBody(recaptchaV3Token: unknown = null): Record<string, unknown> {
  return {
    id: "01900000-0000-7000-8000-000000000001",
    mode: "direct-battle",
    modelAId: "6ee9f901-17b5-4fbe-9cc2-13c16497c23b",
    userMessageId: "01900000-0000-7000-8000-000000000002",
    modelAMessageId: "01900000-0000-7000-8000-000000000003",
    userMessage: {
      content: "Reply with exactly OK",
      experimental_attachments: [],
      metadata: {},
    },
    modality: "chat",
    recaptchaV3Token,
  };
}

test("Arena wire contract uses current Direct-mode request shape", () => {
  const wire = buildLMArenaWireRequest(
    {
      "Content-Type": "application/json",
      Referer: "https://arena.ai/",
      Cookie: "arena-auth-prod-v1.0=chunk0; arena-auth-prod-v1.1=chunk1",
    },
    baseBody()
  );

  assert.equal(wire.headers["Content-Type"], "text/plain;charset=UTF-8");
  assert.equal(wire.headers.Referer, "https://arena.ai/?mode=direct");
  assert.equal(wire.body.mode, "direct");
  assert.match(String(wire.body.modelBMessageId || ""), UUID_V7_RE);
  assert.equal(Object.hasOwn(wire.body, "recaptchaV3Token"), false);
});

test("Arena wire contract omits blank challenge-token fields", () => {
  const wire = buildLMArenaWireRequest({}, baseBody("   "));

  assert.equal(Object.hasOwn(wire.body, "recaptchaV3Token"), false);
});

test("Arena wire contract preserves a non-empty operator-supplied token", () => {
  const wire = buildLMArenaWireRequest({}, baseBody(" token-value "));

  assert.equal(wire.body.recaptchaV3Token, "token-value");
});
