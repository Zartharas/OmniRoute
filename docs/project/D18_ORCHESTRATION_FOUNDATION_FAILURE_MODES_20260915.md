# D18 Orchestration Foundation Transplant — Failure Modes and Engineering Record

Date: 2026-09-15
Status: Durable fork engineering appendix

This document records the engineering failures and decisions discovered while transplanting the frozen D18 bounded production-evidence/orchestration foundation onto the current integrated OmniRoute authority.

It is not an activation authority. D18 remains passive/unwired until later evidence explicitly authorizes otherwise.

## 1. Authorities

Current OmniRoute parent authority before D18 transplant:

- commit `1c4da240883e729d38a356ec83919ad7f6637623`;
- tree `569335188af0ec7c20d43b2a9ecc98bca83a1e9b`.

Frozen D18 source authority:

- branch `feat/r16-32d18-bounded-production-evidence-readout`;
- commit `0f13a6d6df0251d9fa39e70aff78c0b58766845d`;
- tree `71e1f60cd349599df0e9c4f800af6e6a3f719fd4`;
- parent `0b42d800a4f6bb1f000a51cb5e93a2be18ea623b`.

Read-only transplant audit evidence ZIP SHA-256:

`69104b926e96801a17f70d1da2c02d28bc678d0c717d6f200003cefceb1d4c13`

## 2. Read-only audit result

The final D18 commit changed exactly two files, both missing from the current integrated OmniRoute tree:

- `open-sse/services/combo/boundedProductionEvidenceReadout.ts`
- `tests/unit/combo/boundedProductionEvidenceReadout.test.ts`

Audit result:

- missing: 2;
- identical: 0;
- divergent: 0;
- deletions: 0;
- external runtime inbound edges: 0;
- source safety blockers: 0;
- review flags: 0;
- decision: `SELECTIVE_D18_TRANSPLANT_REQUIRED`.

The audit was correct about the final commit diff but did not yet prove that the final diff was the full feature dependency contract.

## 3. Candidate R1 — final-diff closure omission

Classification:

`GENUINE_OUTBOUND_DEPENDENCY_CLOSURE_OMISSION`

The two final D18 blobs were copied byte-exact, but the bounded readout regression immediately failed because its historical dependency `computationalShadowObservabilityAccumulator.ts` was not present in the current integration tree.

Lesson:

A final-commit diff is not automatically a complete feature transplant boundary. Earlier accepted lineage may contain foundation code required by the final feature.

Prevention:

- establish the source-backed feature contract before candidate construction;
- do not add dependencies one at a time through repeated trial-and-error runs;
- distinguish final-commit change surface from inherited feature contract.

## 4. Candidate R2 — regex import scanner false positives

Classification:

`HARNESS_ONLY_REGEX_IMPORT_SCANNER_FALSE_POSITIVE`

R2 attempted to compute a recursive internal import closure with regex matching. It failed on two apparent internal dependencies:

- `open-sse/utils/publicCreds.ts` → `./open-sse/utils/publicCreds.ts`;
- `open-sse/services/combo/autoStrategy.ts` → `../services/combo`.

R3 later proved both strings were not actual TypeScript module edges.

Lesson:

Regex occurrence matching is not module-graph authority. Comments, examples, strings or unrelated syntax can resemble imports.

Prevention:

- use TypeScript compiler AST for import/export/require/import-type discovery;
- use TypeScript module resolution with the repository tsconfig for actual module targets;
- preserve unresolved real project-local module edges as fail-closed errors.

## 5. Candidate R3 — unbounded dependency graph mistaken for patch authority

Classification:

`UNBOUNDED_TRANSITIVE_GRAPH_IS_NOT_D18_PATCH_AUTHORITY`

The TypeScript AST/module resolver worked correctly and produced a complete historical reachability graph:

- seed files: 7;
- closure files: 1,164;
- graph edges: 2,924;
- missing in current integration: 63;
- identical current files: 841;
- divergent current files: 260;
- unresolved internal imports: 0.

The graph then reached historical application surface that was not appropriate to transplant as D18 authority, including:

- retired OpenCode provider inventory;
- provider-usage/fetcher code;
- quota/network fetchers;
- ChatGPT web helper/network-capable code.

Examples of retired-provider hits included:

- `open-sse/services/usage/fetcherProviders.ts` — `opencode-go`, `opencode`, `opencode-zen`;
- `open-sse/services/usage/supportedProviders.ts` — `opencode-go`.

This did **not** mean the TypeScript graph was wrong. It meant complete reachability was the wrong patch-authority model.

Lesson:

Dependency reachability and feature patch authority are different concepts.

A correct transitive graph may cross shared utilities, provider catalogs and application services that a bounded feature never intended to own or transplant.

Prevention:

- use graph discovery as evidence, not automatic materialization authority;
- prefer an explicit frozen feature contract when one exists;
- do not resurrect retired providers or network-capable historical services merely because they are reachable from historical source;
- preserve newer current implementations unless the feature contract explicitly owns them and compatibility evidence requires change.

## 6. R4 bounded contract authority

The corrected candidate direction is the exact source-backed seven-file D18 contract boundary:

1. `open-sse/services/combo/boundedProductionEvidenceReadout.ts`
2. `tests/unit/combo/boundedProductionEvidenceReadout.test.ts`
3. `open-sse/services/combo/gatePathCandidateDispositionShadowObservability.ts`
4. `open-sse/services/combo/executeTargetGates.ts`
5. `open-sse/services/combo/computationalShadowObservabilityAccumulator.ts`
6. `tests/unit/combo/computationalShadowObservabilityAccumulator.test.ts`
7. `tests/unit/combo/gatePathCandidateDispositionShadowObservability.test.ts`

R4 rules:

- verify exact D18 hashes for all seven contract files;
- classify each against current OmniRoute as missing / identical / divergent-existing;
- materialize **missing only**;
- copy missing files byte-exact;
- overwrite zero existing current files;
- preserve newer divergent current implementations and prove compatibility through tests;
- reject the 1,164-file historical graph as patch authority;
- reject retired-provider, protected-routeability, DB-write or network-call behavior in transplanted production files;
- require zero external production consumers of `boundedProductionEvidenceReadout.ts`;
- run all three bounded D18 regression files;
- require changed-file lint pass and zero changed-file TypeScript diagnostics;
- preserve the current 10 routed + 3 protected-native workload authority;
- run the default Webpack production build;
- perform no live/provider/credential/dependency-install/remote-push side effects.

## 7. Architecture sanity conclusion

The D18 work remains aligned with the five-pillar architecture.

R1, R2 and R3 did not redefine the architecture; they progressively improved our understanding of the correct transplant boundary:

- R1 proved two files were too narrow;
- R2 proved regex module discovery was unreliable;
- R3 proved the complete transitive graph was too broad as patch authority;
- R4 returns to the frozen bounded D18 feature contract.

This preserves:

- OmniRoute routing authority;
- Auth Keeper credential/session authority;
- protected-native separation;
- retired OpenCode/TheOldLLM status;
- passive/unwired D18 evidence semantics;
- Operations Floor observer/operator semantics;
- later full end-to-end qualification before activation.

## 8. Permanent engineering rule

For historical feature transplants, always distinguish four different sets:

1. final commit diff;
2. feature-owned frozen contract;
3. transitive dependency/reachability graph;
4. current implementation authority.

None of those sets may be silently substituted for another.

The correct patch surface is the smallest source-backed feature-owned contract that can be qualified against current implementation authority without resurrecting unrelated historical application behavior.
