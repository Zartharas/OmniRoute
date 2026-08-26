import assert from "node:assert/strict";
import { test } from "node:test";

import { getExtractionConfig } from "../../open-sse/services/tokenExtractionConfig.ts";

test("Kimi web-session contract captures lifecycle credentials from www.kimi.ai", () => {
  const config = getExtractionConfig("kimi-web");

  assert.ok(config);

  assert.equal(
    config.loginUrl,
    "https://www.kimi.ai/"
  );

  assert.equal(
    config.homeUrl,
    "https://www.kimi.ai"
  );

  assert.ok(
    config.tokenSources.some(
      (source) =>
        source.type === "localStorage" &&
        source.key === "access_token"
    )
  );

  assert.ok(
    config.tokenSources.some(
      (source) =>
        source.type === "localStorage" &&
        source.key === "refresh_token"
    )
  );

  assert.ok(
    config.tokenSources.some(
      (source) =>
        source.type === "cookie" &&
        source.name === "kimi-auth" &&
        source.domain === ".kimi.ai"
    )
  );
});
