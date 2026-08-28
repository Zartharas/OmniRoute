import assert from "node:assert/strict";
import test from "node:test";

import {
  mapFailedTlsResult,
  missingCookieResult,
} from "../../open-sse/executors/lmarena/response.ts";

const forbiddenGuidance =
  /recaptchaV3Token|reCAPTCHA v3 token|cf_clearance|__cf_bm|residential\/browser-grade|paste a fresh full Cookie header/i;

async function readErrorMessage(result: {
  response: Response;
}): Promise<{
  type: string;
  code: string;
  message: string;
}> {
  const body = (await result.response.json()) as {
    error?: {
      type?: string;
      code?: string;
      message?: string;
    };
  };

  return {
    type: String(body.error?.type || ""),
    code: String(body.error?.code || ""),
    message: String(body.error?.message || ""),
  };
}

function makeBlockedResult(opts: {
  text: string;
  hasRecaptcha?: boolean;
}) {
  return mapFailedTlsResult({
    status: 403,
    text: opts.text,
    hasRecaptcha: opts.hasRecaptcha === true,
    model: "public-test-model",
    arenaModelId: "arena-test-model",
    url: "https://arena.ai/nextjs-api/stream/create-evaluation",
    headers: {},
    transformedBody: {},
  });
}

test(
  "generic Arena 403 remains cloudflare_or_bot but never recommends challenge-token injection",
  async () => {
    const result = makeBlockedResult({
      text: "Forbidden",
    });

    assert.ok(result);
    assert.equal(result.response.status, 403);

    const error = await readErrorMessage(result);

    assert.equal(error.type, "api_error");
    assert.equal(error.code, "cloudflare_or_bot");
    assert.doesNotMatch(error.message, forbiddenGuidance);
    assert.match(error.message, /official browser/i);
    assert.match(error.message, /does not automate/i);
  }
);

test(
  "Cloudflare challenge guidance stays interactive and avoids bot-evasion instructions",
  async () => {
    const result = makeBlockedResult({
      text: "<!DOCTYPE html><title>Just a moment...</title><div>cf-chl</div>",
    });

    assert.ok(result);

    const error = await readErrorMessage(result);

    assert.equal(error.code, "cloudflare_or_bot");
    assert.doesNotMatch(error.message, forbiddenGuidance);
    assert.match(error.message, /Cloudflare challenge/i);
    assert.match(error.message, /official browser/i);
    assert.match(error.message, /does not automate/i);
  }
);

test(
  "rejected request with an existing browser verification signal still stops safely",
  async () => {
    const result = makeBlockedResult({
      text: "Forbidden",
      hasRecaptcha: true,
    });

    assert.ok(result);

    const error = await readErrorMessage(result);

    assert.equal(error.code, "cloudflare_or_bot");
    assert.doesNotMatch(error.message, forbiddenGuidance);
    assert.match(error.message, /official browser/i);
    assert.match(error.message, /does not automate/i);
  }
);

test(
  "missing-cookie guidance requests supported browser reauthentication without challenge cookies",
  async () => {
    const result = missingCookieResult(
      "https://arena.ai/nextjs-api/stream/create-evaluation",
      {},
      {}
    );

    const error = await readErrorMessage(result);

    assert.equal(result.response.status, 401);
    assert.equal(error.code, "missing_cookie");
    assert.doesNotMatch(error.message, forbiddenGuidance);
    assert.match(error.message, /supported browser login flow/i);
  }
);
