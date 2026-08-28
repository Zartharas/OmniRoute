import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  fetchTheOldLlmWithProviderProxy,
  isHumanVerificationResponse,
} from "../../open-sse/executors/theoldllm.ts";

test("TheOldLLM wire request does not synthesize retired or browser-verification headers", async () => {
  let capturedInit: RequestInit | undefined;

  const response = await fetchTheOldLlmWithProviderProxy(
    { model: "GPT_5_4", messages: [{ role: "user", content: "unit-test" }], stream: true },
    new AbortController().signal,
    {
      resolveProxy: async () => null,
      hasBlockingProxyAssignment: () => false,
      runWithProxy: async (_proxy, request) => request(),
      fetch: (async (_url: RequestInfo | URL, init?: RequestInit) => {
        capturedInit = init;
        return new Response(
          'data: {"choices":[{"delta":{"content":"ok"}}]}\n\ndata: [DONE]\n\n',
          {
            status: 200,
            headers: { "content-type": "text/event-stream" },
          }
        );
      }) as typeof fetch,
    }
  );

  assert.equal(response.status, 200);
  assert.ok(capturedInit);

  const headers = new Headers(capturedInit.headers);
  assert.equal(headers.has("authorization"), false);
  assert.equal(headers.has("x-request-token"), false);
  assert.equal(headers.has("x-is-human"), false);
  assert.equal(headers.has("cookie"), false);
});

test("TheOldLLM recognizes a 200 SSE verification error", () => {
  const body =
    'data: {"error":{"message":"Verification failed. Verify you are human"}}\n\n';

  const response = new Response(body, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });

  assert.equal(isHumanVerificationResponse(response, body), true);
});

test("TheOldLLM does not classify ordinary model content about Turnstile as verification", () => {
  const body =
    'data: {"choices":[{"delta":{"content":"Cloudflare Turnstile is a verification widget."}}]}\n\n' +
    "data: [DONE]\n\n";

  const response = new Response(body, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });

  assert.equal(isHumanVerificationResponse(response, body), false);
});

test("TheOldLLM source contains no retired token generator or challenge-bypass implementation", () => {
  const source = readFileSync(
    new URL("../../open-sse/executors/theoldllm.ts", import.meta.url),
    "utf8"
  );

  // Positive semantic anchor required by source-scanner-guards: prove this
  // variable still points at the executor whose verification contract we guard.
  assert.match(source, /export function isHumanVerificationResponse\(/);

  assert.doesNotMatch(source, /oldllm-client-2026/);
  assert.doesNotMatch(source, /generateRequestToken/);
  assert.doesNotMatch(source, /Token rejected .*retrying with fresh token/i);
  assert.doesNotMatch(source, /\.set\(\s*["']x-is-human["']/i);
  assert.doesNotMatch(source, /["']x-is-human["']\s*:/i);
});
