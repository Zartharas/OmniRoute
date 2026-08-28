import assert from "node:assert/strict";
import test from "node:test";

import {
  __clearLMArenaLiveModelCacheForTesting,
  LMArenaExecutor,
  resolveLMArenaLiveChatModelId,
} from "../../open-sse/executors/lmarena.ts";
import { LMARENA_DIRECT_URL } from "../../open-sse/executors/lmarena/models.ts";
import { __setTlsFetchOverrideForTesting } from "../../open-sse/services/lmarenaTlsClient.ts";

const STALE_NAME = "gpt-oss-120b";
const STALE_ID = "6ee9f901-17b5-4fbe-9cc2-13c16497c23b";
const GOOD_NAME = "gpt-5.2-high";
const GOOD_ID = "019b1449-0313-7911-b836-419e2ed79b2e";

function model(id: string, publicName: string, chatRank: number) {
  return {
    id,
    publicName,
    name: publicName,
    displayName: publicName,
    organization: "openai",
    provider: "openai",
    userSelectable: true,
    capabilities: {
      inputCapabilities: { text: true },
      outputCapabilities: { text: true },
    },
    rankByModality: { chat: chatRank },
  };
}

function liveHtml(models: unknown[]): string {
  return `<html><script>window.__arena={"initialModels":${JSON.stringify(models)},"after":true};</script></html>`;
}

function input(modelName: string) {
  return {
    model: modelName,
    body: { messages: [{ role: "user", content: "Reply with exactly OK" }] },
    credentials: {
      cookie: "arena-auth-prod-v1.0=chunk0; arena-auth-prod-v1.1=chunk1",
      providerSpecificData: { recaptchaV3Token: "legacy-token-must-never-escape" },
    },
    signal: new AbortController().signal,
    log: console,
  };
}

test("live resolver rejects the exact current gpt-oss sentinel shape", () => {
  const live = [model(STALE_ID, STALE_NAME, Number.MAX_SAFE_INTEGER)];
  assert.equal(resolveLMArenaLiveChatModelId(STALE_NAME, STALE_ID, live), null);
  assert.equal(resolveLMArenaLiveChatModelId(STALE_ID, STALE_ID, live), null);
});

test("live resolver prefers a ranked duplicate over an unranked duplicate", () => {
  const live = [
    model("aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", "dup-model", Number.MAX_SAFE_INTEGER),
    model("11111111-2222-7333-8444-555555555555", "dup-model", 17),
  ];
  assert.equal(
    resolveLMArenaLiveChatModelId("dup-model", "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", live),
    "11111111-2222-7333-8444-555555555555"
  );
});

test("sentinel live model is rejected locally with zero create-evaluation POSTs", async () => {
  __clearLMArenaLiveModelCacheForTesting();
  let publicGets = 0;
  let posts = 0;
  __setTlsFetchOverrideForTesting(async (url, options) => {
    if (url === LMARENA_DIRECT_URL && (options.method || "GET") === "GET") {
      publicGets++;
      return {
        status: 200,
        headers: new Headers({ "Content-Type": "text/html" }),
        text: liveHtml([
          model(STALE_ID, STALE_NAME, Number.MAX_SAFE_INTEGER),
          model(GOOD_ID, GOOD_NAME, 35),
        ]),
        body: null,
      };
    }
    posts++;
    return {
      status: 200,
      headers: new Headers({ "Content-Type": "text/event-stream" }),
      text: '0:"unexpected"\nd:{"finishReason":"stop"}\n',
      body: null,
    };
  });

  try {
    const result = await new LMArenaExecutor().execute(input(STALE_NAME));
    assert.equal(publicGets, 1);
    assert.equal(posts, 0);
    assert.equal(result.response.status, 422);
    const err = await result.response.json();
    assert.equal(err.error.code, "model_not_chat_eligible");
    const body = result.transformedBody as Record<string, unknown>;
    assert.equal(body.recaptchaV3Token, null);
    assert.equal(Object.hasOwn(body, "recaptchaToken"), false);
  } finally {
    __setTlsFetchOverrideForTesting(null);
    __clearLMArenaLiveModelCacheForTesting();
  }
});

test("unverifiable live metadata is fail-closed with zero create-evaluation POSTs", async () => {
  __clearLMArenaLiveModelCacheForTesting();
  let posts = 0;
  __setTlsFetchOverrideForTesting(async (url, options) => {
    if (url === LMARENA_DIRECT_URL && (options.method || "GET") === "GET") {
      return {
        status: 503,
        headers: new Headers({ "Content-Type": "text/plain" }),
        text: "unavailable",
        body: null,
      };
    }
    posts++;
    return { status: 200, headers: new Headers(), text: "", body: null };
  });

  try {
    const result = await new LMArenaExecutor().execute(input(GOOD_NAME));
    assert.equal(posts, 0);
    assert.equal(result.response.status, 503);
    const err = await result.response.json();
    assert.equal(err.error.code, "model_eligibility_unverified");
  } finally {
    __setTlsFetchOverrideForTesting(null);
    __clearLMArenaLiveModelCacheForTesting();
  }
});

test("ranked live model performs one public GET then one POST with current wire contract", async () => {
  __clearLMArenaLiveModelCacheForTesting();
  let publicGets = 0;
  let posts = 0;
  let postedBody: Record<string, unknown> | null = null;
  let postedReferer = "";

  __setTlsFetchOverrideForTesting(async (url, options) => {
    if (url === LMARENA_DIRECT_URL && (options.method || "GET") === "GET") {
      publicGets++;
      assert.equal(options.headers?.Cookie, undefined);
      return {
        status: 200,
        headers: new Headers({ "Content-Type": "text/html" }),
        text: liveHtml([model(GOOD_ID, GOOD_NAME, 35)]),
        body: null,
      };
    }

    posts++;
    postedBody = JSON.parse(String(options.body || "{}")) as Record<string, unknown>;
    postedReferer = String(options.headers?.Referer || "");
    return {
      status: 200,
      headers: new Headers({ "Content-Type": "text/event-stream" }),
      text: '0:"OK"\nd:{"finishReason":"stop"}\n',
      body: null,
    };
  });

  try {
    const result = await new LMArenaExecutor().execute(input(GOOD_NAME));
    assert.equal(publicGets, 1);
    assert.equal(posts, 1);
    assert.equal(result.response.status, 200);
    assert.equal(postedReferer, LMARENA_DIRECT_URL);
    assert.equal(postedBody?.modelAId, GOOD_ID);
    assert.equal(postedBody?.mode, "direct");
    assert.equal(postedBody?.recaptchaV3Token, null);
    assert.equal(Object.hasOwn(postedBody || {}, "recaptchaToken"), false);
  } finally {
    __setTlsFetchOverrideForTesting(null);
    __clearLMArenaLiveModelCacheForTesting();
  }
});
