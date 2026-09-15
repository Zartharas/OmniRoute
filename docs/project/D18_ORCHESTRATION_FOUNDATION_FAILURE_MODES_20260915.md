# D18 Orchestration Foundation Transplant — Failure Modes and Engineering Record

Date: 2026-09-15
Status: Durable fork engineering appendix — D18 transplant accepted at R8

This document records the engineering failures, corrections and accepted result discovered while transplanting the frozen D18 bounded production-evidence/orchestration foundation onto the current integrated OmniRoute authority.

It is not an activation authority. The accepted D18 R8 foundation remains passive/unwired until later evidence explicitly authorizes otherwise.

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

Accepted R8 transplant authority:

- branch `feat/d18-orchestration-foundation-transplant-r8`;
- commit `58452140ffc8122a26a387638f8a38d7d80f5024`;
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`;
- parent `1c4da240883e729d38a356ec83919ad7f6637623`;
- evidence ZIP SHA-256 `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`.

## 2. Audit result

The final frozen D18 commit changed exactly two files, both absent from the integrated tree:

- `open-sse/services/combo/boundedProductionEvidenceReadout.ts`
- `tests/unit/combo/boundedProductionEvidenceReadout.test.ts`

That audit correctly described the final commit diff and proved no inbound runtime wiring, safety blocker or deletion. It did not prove those two files were the complete executable/testable support set.

## 3. Candidate R1 — final-diff closure omission

Classification:

`GENUINE_OUTBOUND_DEPENDENCY_CLOSURE_OMISSION`

The two final D18 blobs were copied byte-exact, but the bounded-readout regression failed because inherited foundation code such as `computationalShadowObservabilityAccumulator.ts` was absent.

Permanent lesson: final commit diff and transplant support boundary are different sets.

## 4. Candidate R2 — regex import scanner false positives

Classification:

`HARNESS_ONLY_REGEX_IMPORT_SCANNER_FALSE_POSITIVE`

Regex discovery misclassified import-looking strings as module edges. TypeScript AST/module resolution later proved the false positives.

Permanent lesson: comments, strings and import-looking text are not module-graph authority.

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

The source-backed feature-owned contract is:

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

R4 proved all seven feature-contract files were missing from current OmniRoute and copied them byte-exact with zero overwrite or semantic adaptation. Regression loading then failed because `gatePathCandidateDispositionShadowObservability.ts` imports missing `gatePathCandidateDispositionShadowBinding.ts`.

Permanent lesson: feature-owned contract and minimal executable/testable support set are different sets.

## 8. Candidate R5 — hard namespace rejected legitimate architecture support

Classification:

`HARD_NAMESPACE_BOUNDARY_REJECTED_LEGITIMATE_AUTH_KEEPER_SUPPORT_DEPENDENCY`

R5 improved traversal by stopping at current-owned files, but its hard support namespace rejected real Auth Keeper eligibility support:

- `open-sse/services/combo/executeTargetGates.ts` → `src/lib/authKeeper/comboRoutingEligibility.ts`;
- `open-sse/services/combo/attemptLoopTypes.ts` → `src/lib/authKeeper/comboRoutingEligibility.ts`.

This was a policy/harness failure. Cross-pillar eligibility consumption is compatible with the five-pillar authority boundary while Auth Keeper retains credential/session/account authority.

Permanent lesson: directory namespaces are not architectural legitimacy.

## 9. Candidate R6 — complete missing-only closure, then regex harness failure

Classification:

`HARNESS_ONLY_PYTHON_REGEX_INLINE_FLAG_PLACEMENT`

R6 removed the hard path allowlist and used complete missing-only traversal with:

`STOP_AT_CURRENT_OWNED_DEPENDENCIES`

It converged before mutation on:

- 7 feature-contract files;
- 9 missing support files;
- 16 total copy candidates;
- `gatePathCandidateDispositionShadowBinding.ts` rediscovered;
- `src/lib/authKeeper/comboRoutingEligibility.ts` rediscovered;
- 0 unresolved project-local imports.

The next risk block failed before candidate creation because one Python regex was assembled from adjacent strings that each carried a global inline `(?i)` flag.

Permanent lesson: qualification regex catalogs must be runtime-compiled and behavior-smoked during harness prevalidation.

## 10. Candidate R7 — transplant mechanics pass, historical test typing fails current TypeScript

Classification:

`HISTORICAL_TEST_TYPESCRIPT_COMPATIBILITY_DIAGNOSTIC`

R7 preserved the stable R6 closure and proved the transplant mechanics through the current toolchain:

- risk regex catalog: 8/8 compile and behavior-smoke pass;
- complete copy-set risk gate: pass;
- retired-provider/protected-routeable/DB-write/network/process/server/historical-path hits: 0;
- isolated candidate parent: exact `1c4da240883e729d38a356ec83919ad7f6637623`;
- copied files: 16;
- pre-adaptation byte identity: pass;
- current-owned files overwritten: 0;
- bounded-readout external runtime consumers: 0;
- pre-test unresolved project-local imports: 0;
- `ERR_MODULE_NOT_FOUND` prevention gate: pass;
- bounded readout tests: 10/10 pass;
- accumulator tests: 16/16 pass;
- observability-adapter tests: 9/9 pass;
- focused total: 35/35 pass;
- changed-file ESLint: pass.

The only changed-file TypeScript diagnostic was:

`tests/unit/combo/computationalShadowObservabilityAccumulator.test.ts(109,5): error TS2698: Spread types may only be created from object types.`

The exact historical test SHA-256 was:

`d1813972782f5fe56fc0212dcffab0aa234e8f2b239147099231403907ceadf8`

The helper returns a synthetic evidence object with historical `as never`; the sensitive-extra regression later spreads `...evidence()`. Current TypeScript 6.0.3 rejects that test-only typing construct even though runtime semantics remain valid.

Permanent lesson: historical runtime success does not waive current compiler compatibility. Test-only compatibility may be adapted only through narrowly gated runtime-erased typing changes with production source kept exact.

## 11. Candidate R8 — accepted

R8 did not reopen dependency discovery. It preserved the proven 7 + 9 = 16-file closure and allowed at most one test-only compatibility adaptation.

Pre-adaptation qualification:

- exact current parent authority: pass;
- 16-file closure unchanged;
- unresolved project-local imports: 0;
- copy-set effect/architecture risk gate: pass;
- external runtime consumers for bounded readout: 0;
- exact pre-adaptation changed-file diagnostic count: 1;
- exact line-109 TS2698 identity: pass;
- TypeScript version: 6.0.3.

Compatibility proof:

- AST-confirmed failing spread operand: exactly `evidence()`;
- original transpiled JavaScript length: 12,102 bytes;
- safe variants tried in one run: `Record<string, unknown>`, `object`, and `unknown as Record<string, unknown>`;
- every trial emitted JavaScript byte-identical to the original;
- selected variant: `record` / `Record<string, unknown>`;
- post-adaptation changed-file diagnostics: 0;
- adapted-test ESLint: pass;
- runtime-JavaScript parity: pass;
- adapted test SHA-256 `b79a2df559db085aba1562ca67f83bfb3df2fe7e454384a3d2d5ea60d8a43964`;
- production-source adaptation count: 0.

Post-adaptation qualification:

- bounded readout tests: 10/10 pass;
- accumulator tests: 16/16 pass;
- observability-adapter tests: 9/9 pass;
- focused total: 35/35 pass;
- changed-file lint: pass;
- changed-file TypeScript diagnostics: 0;
- current routed models: 10;
- personal lane: 6;
- MTA lane: 4;
- protected-native models: 3;
- protected-native routeability: none;
- default build bundler: Webpack;
- production build rc: 0;
- Turbopack panic signatures: absent;
- `BUILD_ID`: present;
- standalone output: present;
- build output file count: 22,645;
- exact precommit scope: 16 files;
- byte-exact files: 15;
- test-only adapted files: 1;
- production-source adapted files: 0;
- commit/evidence/non-drift gates: pass.

Accepted authority:

- commit `58452140ffc8122a26a387638f8a38d7d80f5024`;
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`;
- parent `1c4da240883e729d38a356ec83919ad7f6637623`;
- evidence ZIP SHA-256 `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`.

Independent evidence-package review after the run verified:

- uploaded ZIP outer SHA matched exactly;
- one evidence root with 36 ZIP entries;
- 33 manifest-tracked files: all present, all SHA-256 values matched;
- 34 `evidence-hashes.txt` entries: all validated;
- patch/name-status contained exactly 16 added paths;
- focused test logs recorded 10/10 + 16/16 + 9/9 and zero failures;
- current 10+3 contract-preservation log matched accepted architecture;
- build summary recorded Webpack, standalone present, 22,645 files and no Turbopack panic;
- selected test-only compatibility variant preserved the original emitted-JavaScript SHA `40edbf0183520eee994fcc8a4d86a3f763d477958360674d85f2c8b8c7a98ffd`.

R8 is therefore the accepted D18 transplant authority.

## 12. Permanent anti-repeat engineering rules

Historical feature transplant work must distinguish:

1. final commit diff;
2. feature-owned frozen contract;
3. complete missing-only support closure relative to current authority;
4. complete transitive historical reachability graph;
5. current implementation authority.

Permanent rules:

- never add missing dependencies one-by-one when a parser-backed closure can be derived first;
- never treat a directory namespace as architecture authority by itself;
- stop historical traversal at current-owned implementations;
- safety-classify the complete copy set before candidate mutation;
- require assembled-candidate static project-local import resolution before tests;
- runtime-compile and behavior-smoke qualification regex catalogs;
- classify changed-file compiler diagnostics before compatibility edits;
- test-only TypeScript compatibility requires runtime-erased adaptation plus emitted-JavaScript parity;
- production source remains exact unless separately justified;
- compatibility variants should be resolved inside one qualification run rather than repeated operator reruns;
- do not resurrect retired providers or unrelated network-capable historical application services merely because they are historically reachable.

## 13. Architecture sanity conclusion

The accepted R8 transplant remains aligned with the five-pillar architecture:

- OmniRoute remains routing/orchestration authority;
- Auth Keeper remains credential/session/account authority and exposes bounded eligibility contracts consumed by orchestration;
- Operations Floor remains observer/operator plane;
- GPT-5.6 Sol/Terra/Luna remain protected-native and non-routeable in the normal fleet;
- OpenCode and TheOldLLM remain retired from active product scope;
- D18 remains passive/unwired;
- D19 must not resume automatically.

## 14. Next phase — full end-to-end qualification

The next accepted baseline is R8 commit `58452140ffc8122a26a387638f8a38d7d80f5024`.

Qualification target:

`Codex Unified → OmniRoute → Auth Keeper/provider → orchestration/fallback → response → Operations Floor evidence`

The qualification phase must cover quota/cooldown behavior, provider outage handling, auth expiry/re-auth boundaries, fallback behavior, workload isolation, protected-native preservation, restart/recovery, rollback readiness and evidence continuity.

Entering full E2E qualification does not authorize live-provider calls, credential-value reads, production mutation, D18 activation or cutover. Those remain separate explicit gates.
