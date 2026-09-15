# D18 Orchestration Foundation Transplant — Failure Modes and Engineering Record

Date: 2026-09-15
Status: Durable fork engineering appendix

This document records the engineering failures and decisions discovered while transplanting the frozen D18 bounded production-evidence/orchestration foundation onto the current integrated OmniRoute authority.

It is not an activation authority. D18 remains passive/unwired until later evidence explicitly authorizes otherwise.

## 1. Authorities

Current OmniRoute parent before D18 transplant:

- commit `1c4da240883e729d38a356ec83919ad7f6637623`;
- tree `569335188af0ec7c20d43b2a9ecc98bca83a1e9b`.

Frozen D18 source authority:

- branch `feat/r16-32d18-bounded-production-evidence-readout`;
- commit `0f13a6d6df0251d9fa39e70aff78c0b58766845d`;
- tree `71e1f60cd349599df0e9c4f800af6e6a3f719fd4`;
- parent `0b42d800a4f6bb1f000a51cb5e93a2be18ea623b`.

Read-only transplant audit evidence ZIP SHA-256:

`69104b926e96801a17f70d1da2c02d28bc678d0c717d6f200003cefceb1d4c13`

## 2. Audit result

The final D18 commit changed exactly two files, both absent from the current integrated tree:

- `open-sse/services/combo/boundedProductionEvidenceReadout.ts`
- `tests/unit/combo/boundedProductionEvidenceReadout.test.ts`

The audit correctly described the final commit diff and proved no inbound runtime wiring, safety blocker or deletion. It did not prove that those two files were the complete transplant support set.

## 3. Candidate R1 — final-diff closure omission

Classification:

`GENUINE_OUTBOUND_DEPENDENCY_CLOSURE_OMISSION`

The two final D18 blobs were copied byte-exact, but the bounded-readout regression failed because earlier D18 foundation code, including `computationalShadowObservabilityAccumulator.ts`, was absent.

Permanent lesson: final commit diff and feature transplant boundary are different sets.

## 4. Candidate R2 — regex import scanner false positives

Classification:

`HARNESS_ONLY_REGEX_IMPORT_SCANNER_FALSE_POSITIVE`

Regex discovery reported apparent internal module edges that were not real TypeScript dependencies. TypeScript AST/module resolution later proved the false positives.

Permanent lesson: comments/strings/import-looking text are not module-graph authority.

## 5. Candidate R3 — full reachability mistaken for patch authority

Classification:

`UNBOUNDED_TRANSITIVE_GRAPH_IS_NOT_D18_PATCH_AUTHORITY`

TypeScript AST/module resolution correctly produced a full historical reachability graph:

- seed files: 7;
- closure files: 1,164;
- graph edges: 2,924;
- missing in current: 63;
- identical current files: 841;
- divergent current files: 260;
- unresolved internal imports: 0.

That graph crossed unrelated historical application surface, including retired OpenCode provider inventory and network-capable provider/runtime services.

Permanent lesson: a correct dependency graph is evidence, not automatic transplant ownership.

## 6. Seven-file D18 feature contract

The source-backed feature-owned contract remains:

1. `open-sse/services/combo/boundedProductionEvidenceReadout.ts`
2. `tests/unit/combo/boundedProductionEvidenceReadout.test.ts`
3. `open-sse/services/combo/gatePathCandidateDispositionShadowObservability.ts`
4. `open-sse/services/combo/executeTargetGates.ts`
5. `open-sse/services/combo/computationalShadowObservabilityAccumulator.ts`
6. `tests/unit/combo/computationalShadowObservabilityAccumulator.test.ts`
7. `tests/unit/combo/gatePathCandidateDispositionShadowObservability.test.ts`

The seven files define feature ownership. They do not imply ownership of every historical module transitively reachable from them.

## 7. Candidate R4 — feature contract not self-contained as support set

Classification:

`SEVEN_FILE_FEATURE_CONTRACT_REQUIRES_BOUNDED_MISSING_SUPPORT_CLOSURE`

R4 proved:

- all seven feature-contract files are missing from current OmniRoute;
- all seven were copied byte-exact;
- zero current files were overwritten;
- semantic adaptation remained none;
- retired-provider, protected-routeability, DB-write and network-call scans were clean for those seven;
- the bounded readout had zero external production consumer.

The first bounded-readout regression then failed during module loading:

`gatePathCandidateDispositionShadowObservability.ts` imports missing `gatePathCandidateDispositionShadowBinding.ts`.

This establishes a new distinction:

**feature-owned contract** is not necessarily the same as **minimal support set required to independently load and test that feature against the current tree**.

R4 therefore remained too narrow for qualification even though its seven-file feature boundary was source-correct.

## 8. Candidate R5 — bounded missing-only support closure

R5 keeps the seven files as feature authority and derives only support that is absent from current implementation authority.

Traversal rule:

`STOP_AT_CURRENT_OWNED_DEPENDENCIES`

Algorithm:

1. seed the TypeScript AST/module resolver with the seven contract files;
2. resolve real project-local module edges against the pinned D18 tree;
3. if the resolved target already exists in current OmniRoute, record a boundary edge and **do not recurse through the historical version**;
4. if the target is missing from current and is one of the seven contract files, keep it in the contract set;
5. if the target is missing and lies under `open-sse/services/combo/` or `tests/unit/combo/`, classify it as bounded missing support and recurse only through that missing file;
6. if a missing dependency falls outside those bounded namespaces, fail closed instead of importing it;
7. require the derived closure to rediscover the concrete R4 blocker `gatePathCandidateDispositionShadowBinding.ts`;
8. safety-scan the final copy set before candidate mutation;
9. copy only missing files byte-exact;
10. overwrite zero current files;
11. preserve passive/unwired bounded-readout semantics;
12. run the three D18 regressions, changed-file lint/type gates, current 10+3 workload invariants and the default Webpack production build.

This is deliberately different from R3: R5 does **not** traverse through current-owned files into their historical dependencies.

## 9. Permanent transplant-set model

Historical feature transplant work must distinguish at least five sets:

1. final commit diff;
2. feature-owned frozen contract;
3. minimal missing support closure relative to current authority;
4. complete transitive historical reachability graph;
5. current implementation authority.

None may be silently substituted for another.

The correct candidate patch surface is the smallest source-backed feature contract plus required missing support that can be qualified against current authority without overwriting current implementations or resurrecting unrelated historical behavior.

## 10. Architecture sanity conclusion

The D18 work remains aligned with the five-pillar architecture.

R1 through R4 refined engineering authority; they did not redefine the product:

- OmniRoute remains routing/orchestration authority;
- Auth Keeper remains credential/session authority;
- Operations Floor remains observer/operator plane;
- GPT-5.6 Sol/Terra/Luna remain protected-native and non-routeable in the normal fleet;
- OpenCode and TheOldLLM remain retired from active product scope;
- D18 remains passive/unwired;
- full end-to-end qualification remains required before any activation or cutover.
