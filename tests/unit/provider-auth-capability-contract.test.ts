import assert from "node:assert/strict";
import test from "node:test";

import {
  FREE_APIKEY_PROVIDER_IDS,
  providerAllowsOptionalApiKey,
  supportsApiKeyOnFreeProvider,
} from "../../src/shared/constants/providers.ts";
import {
  isManagedProviderConnectionId,
  resolveStaticProviderCatalogEntry,
} from "../../src/lib/providers/catalog.ts";
import { createProviderSchema } from "../../src/shared/validation/schemas/provider.ts";

test("OldLLM auth capability is explicit and not API-key connectable", () => {
  assert.equal(providerAllowsOptionalApiKey("theoldllm"), false);
  assert.equal(supportsApiKeyOnFreeProvider("theoldllm"), false);
  assert.equal(isManagedProviderConnectionId("theoldllm"), false);

  const entry = resolveStaticProviderCatalogEntry("theoldllm");
  assert.ok(entry);
  assert.equal(entry.category, "no-auth");
  assert.equal(entry.displayAuthType, "no-auth");
  assert.equal(entry.toggleAuthType, "no-auth");
  assert.equal(entry.credentialOwnership, "none");
  assert.equal(entry.upstreamAccessMode, "interactive-human-verification");
  assert.equal(entry.supportsOptionalApiKey, false);

  const parsed = createProviderSchema.safeParse({
    provider: "theoldllm",
    name: "The Old LLM",
  });
  assert.equal(parsed.success, false);
  if (!parsed.success) {
    assert.ok(
      parsed.error.issues.some(
        (issue) => issue.path[0] === "apiKey" && issue.message === "API key is required"
      )
    );
  }
});

test("OpenCode preserves anonymous free mode plus optional managed API key", () => {
  assert.equal(providerAllowsOptionalApiKey("opencode"), true);
  assert.equal(supportsApiKeyOnFreeProvider("opencode"), true);
  assert.equal(isManagedProviderConnectionId("opencode"), true);

  const entry = resolveStaticProviderCatalogEntry("opencode");
  assert.ok(entry);
  assert.equal(entry.category, "no-auth");
  assert.equal(entry.displayAuthType, "no-auth");
  assert.equal(entry.toggleAuthType, "no-auth");
  assert.equal(entry.credentialOwnership, "omniroute-optional");
  assert.equal(entry.upstreamAccessMode, "anonymous");
  assert.equal(entry.supportsOptionalApiKey, true);

  const parsed = createProviderSchema.safeParse({
    provider: "opencode",
    name: "OpenCode Free",
  });
  assert.equal(parsed.success, true);
});

test("explicit free API-key capability set is preserved exactly", () => {
  assert.deepEqual(
    [...FREE_APIKEY_PROVIDER_IDS].sort(),
    ["aihorde", "auggie", "dahl", "opencode", "qoder", "zcode"]
  );

  assert.equal(providerAllowsOptionalApiKey("duckduckgo-web"), false);
  assert.equal(providerAllowsOptionalApiKey("theoldllm"), false);
  assert.equal(providerAllowsOptionalApiKey("opencode"), true);
});
