# Auth Keeper Reconciliation R6-R9 Failure Modes — 2026-09-15

Status: Durable engineering appendix for the `Zartharas/OmniRoute` fork only.

This appendix records additional reconciliation failures discovered after the original Auth Keeper failure-mode appendix. These rules apply to fork engineering and must not be submitted to the original upstream OmniRoute repository unless explicitly authorized.

## 1. Live-registration tests must retire with the provider

Observed during Candidate R6: the runtime and active server bootstrap correctly stopped registering OpenCode, but `r16-17-opencode-live-provider-registration-source.node.test.mjs` still positively required `createProviderServerRuntime("opencode", ...)` to exist in `server.mjs`.

A second stale test, `r16-17-provider-adapter-skeletons.node.test.mjs`, still attempted to execute OpenCode through active provider-bound transport. The retired transport correctly rejected that request with `AUTH_KEEPER_PROVIDER_NOT_ALLOWED`.

Prevention:

- when a provider becomes retired, migrate tests that positively require its active bootstrap or active transport execution;
- preserve direct tests of dormant implementation modules separately;
- an active dispatcher rejecting a retired provider is the correct contract and should be tested explicitly;
- a dormant implementation remaining unit-testable does not imply the active provider registry or transport should admit it.

## 2. Explicit mutations and exact-plan authority must be mechanically reconciled

Observed during Candidate R7: the transform intentionally rewrote `r16-17-opencode-live-provider-registration-source.node.test.mjs`, but the expected Auth Keeper changeset omitted that file. The candidate failed even though the transform itself was correct.

Prevention:

- every explicit mutation target must be present in the exact expected changeset;
- mechanically cross-check mutation targets against plan authority before delivery;
- if the transform reports an actual file set, compare it to the expected set as sets, not counts only;
- fail on both missing expected files and unexpected additional files;
- never hand-maintain a growing exact-plan list without a consistency check.

## 3. Provider-specific source-wiring detection must account for filenames and CamelCase identifiers

Observed during Candidate R8: `r16-17-opencode-binding-readiness-wiring-source.node.test.mjs` still asserted active OpenCode service and HTTP-route wiring. A bounded `\bopencode\b` detector missed the stale assertion because the provider name appeared inside CamelCase identifiers such as `checkOpenCodeBindingReadiness` and constants such as `OPENCODE_BINDING_READINESS_PATH`.

The same file also contained a valid dormant implementation regression verifying key-before-binding lookup order in `opencodeApiKeyAcceptance.mjs`.

Prevention:

- do not rely only on word-boundary provider-name regexes for source-wiring classification;
- use filename role, exact symbols, import targets, route constants and bootstrap function names as discriminators;
- separate mixed tests into dormant implementation assertions and active-wiring assertions;
- preserve low-level dormant behavior tests while replacing only stale service/server wiring expectations;
- include the migrated file in targeted validation before the full suite.

## 4. Assertion audits must not scan across assertion boundaries

Observed during Candidate R9: a pre-full-suite audit attempted to find positive retired-provider assertions using patterns such as `assert.match[\s\S]{0,500}...` and `assert.ok[\s\S]{0,800}...`.

Those expressions crossed from one assertion into later assertions in the same file. As a result, an earlier benign `assert.match(...)` or `assert.ok(...)` was incorrectly paired with a later `assert.doesNotMatch(...)` containing retired-provider identifiers. Seven already-migrated negative retirement tests were falsely classified as stale positive wiring tests.

Prevention:

- never infer assertion semantics by scanning an arbitrary character window beyond the current assertion call;
- parse or structurally bound each assertion call when semantic classification is required;
- when a transform writes deterministic canonical test templates, prefer exact-template or hash attestation over heuristic proximity regexes;
- inventory the exact provider-specific source-wiring tests and require each to match one approved retirement template;
- keep distinct approved templates for generic retirement tests, live-registration retirement tests and mixed dormant-plus-retirement tests;
- if a heuristic guard contradicts targeted tests and a deterministic transform, inspect the guard before modifying qualified source.

## 5. Canonical test-template attestation is stronger than textual proximity

For deterministic reconciliation transforms, qualification should prove the transformed artifact is exactly what was intended.

Recommended pattern:

1. define the canonical transformed test body;
2. hash the exact UTF-8 bytes of that template;
3. inventory the source-wiring tests expected to use it;
4. verify each transformed file hash against its approved template hash;
5. fail if the inventory contains an unexpected file or omits a required file;
6. maintain separate hashes for intentionally different templates;
7. run targeted tests after attestation, then the complete suite.

This is more reliable than trying to reconstruct JavaScript assertion semantics with loose regular expressions.

## 6. Reconciliation sequence rule

When a candidate fails late in qualification:

- preserve all gates that already passed;
- classify whether the failure is source, test compatibility, or harness-only;
- do not redesign qualified source merely because a later harness check is wrong;
- change only the narrowest authority that evidence proves incorrect;
- re-run the complete qualification chain after the correction;
- record each new failure mode in the fork so future reconciliation work does not rediscover it.
