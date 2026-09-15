# D18 Orchestration Foundation Transplant — Failure Modes and Engineering Record

Date: 2026-09-15
Status: Durable fork engineering appendix — D18 transplant accepted at R8

This document records the engineering failures and decisions discovered while transplanting the frozen D18 bounded production-evidence/orchestration foundation onto the current integrated OmniRoute authority.

It is not activation authority. D18 remains passive/unwired until later evidence explicitly authorizes otherwise.

## 1. Authorities

Current accepted D18 R8 successor:

- branch `feat/d18-orchestration-foundation-transplant-r8`;
- commit `58452140ffc8122a26a387638f8a38d7d80f5024`;
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`;
- parent `1c4da240883e729d38a356ec83919ad7f6637623`;
- evidence ZIP SHA-256 `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`.

Frozen historical D18 source authority:

- branch `feat/r16-32d18-bounded-production-evidence-readout`;
- commit `0f13a6d6df0251d9fa39e70aff78c0b58766845d`;
- tree `71e1f60cd349599df0e9c4f800af6e6a3f719fd4`;
- parent `0b42d800a4f6bb1f000a51cb5e93a2be18ea623b`.

Read-only transplant audit evidence ZIP SHA-256:

`69104b926e96801a17f70d1da2c02d28bc678d0c717d6f200003cefceb1d4c13`

## 2. Final accepted R8 shape

R8 closed the D18 transplant workstream with:

- 7 feature-contract files;
- 9 missing support files;
- 16 total transplanted paths;
- current-owned files overwritten: 0;
- project-local unresolved imports before tests: 0;
- bounded readout external runtime consumers: 0;
- 15 files byte-exact to frozen D18;
- 1 historical test-only TypeScript compatibility adaptation;
- production-source adaptation count: 0.

Selected compatibility adaptation:

`tests/unit/combo/computationalShadowObservabilityAccumulator.test.ts`

The historical helper returned its synthetic evidence object with `as never`; a negative-leakage test later spread `...evidence()`. Current TypeScript raised TS2698 even though runtime behavior was valid. R8 selected a runtime-erased `Record<string, unknown>` assertion after proving exact diagnostic identity, AST target identity and byte-identical emitted JavaScript.

Final focused qualification:

- bounded readout tests: 10/10 pass;
- accumulator tests: 16/16 pass;
- observability-adapter tests: 9/9 pass;
- total: 35/35 pass;
- changed-file ESLint: pass;
- changed-file TypeScript diagnostics: 0;
- 10 routed + 3 protected-native invariants: pass;
- default Webpack production build: pass;
- BUILD_ID: present;
- standalone output: present;
- build output files: 22,645;
- Turbopack panic: absent.

Independent evidence review verified the outer evidence ZIP SHA, all manifest/evidence-hash entries, exact 16-path patch, focused test totals and emitted-JavaScript parity.

## 3. Candidate R1 — final-diff closure omission

Classification: `GENUINE_OUTBOUND_DEPENDENCY_CLOSURE_OMISSION`.

The final D18 commit changed only two files, but the bounded-readout regression required earlier foundation code, including `computationalShadowObservabilityAccumulator.ts`.

Permanent lesson: final commit diff and feature transplant boundary are different sets.

## 4. Candidate R2 — regex import scanner false positives

Classification: `HARNESS_ONLY_REGEX_IMPORT_SCANNER_FALSE_POSITIVE`.

Regex discovery misclassified import-looking strings as module edges. TypeScript AST/module resolution later proved the false positives.

Permanent lesson: comments/strings/import-looking text are not module-graph authority.

## 5. Candidate R3 — full reachability mistaken for patch authority

Classification: `UNBOUNDED_TRANSITIVE_GRAPH_IS_NOT_D18_PATCH_AUTHORITY`.

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

The source-backed feature-owned contract was:

1. `open-sse/services/combo/boundedProductionEvidenceReadout.ts`
2. `tests/unit/combo/boundedProductionEvidenceReadout.test.ts`
3. `open-sse/services/combo/gatePathCandidateDispositionShadowObservability.ts`
4. `open-sse/services/combo/executeTargetGates.ts`
5. `open-sse/services/combo/computationalShadowObservabilityAccumulator.ts`
6. `tests/unit/combo/computationalShadowObservabilityAccumulator.test.ts`
7. `tests/unit/combo/gatePathCandidateDispositionShadowObservability.test.ts`

The seven files defined feature ownership but did not imply ownership of every historical module transitively reachable from them.

## 7. Candidate R4 — feature contract not self-contained as support set

Classification: `SEVEN_FILE_FEATURE_CONTRACT_REQUIRES_BOUNDED_MISSING_SUPPORT_CLOSURE`.

R4 proved all seven feature-contract files were missing from current OmniRoute and copied them byte-exact with zero overwrite or semantic adaptation. Regression loading failed because `gatePathCandidateDispositionShadowObservability.ts` imported missing `gatePathCandidateDispositionShadowBinding.ts`.

Permanent lesson: feature-owned contract and minimal executable/testable support set are different sets.

## 8. Candidate R5 — hard namespace boundary rejected legitimate architecture support

Classification: `HARD_NAMESPACE_BOUNDARY_REJECTED_LEGITIMATE_AUTH_KEEPER_SUPPORT_DEPENDENCY`.

R5 stopped traversal at current-owned files but imposed a hard missing-support namespace allowlist. It rejected legitimate cross-pillar support:

- `executeTargetGates.ts` → `src/lib/authKeeper/comboRoutingEligibility.ts`;
- `attemptLoopTypes.ts` → `src/lib/authKeeper/comboRoutingEligibility.ts`.

Permanent lesson: directory namespaces are not a reliable proxy for architectural legitimacy.

## 9. Candidate R6 — complete missing-only closure, then regex harness failure

Classification: `HARNESS_ONLY_PYTHON_REGEX_INLINE_FLAG_PLACEMENT`.

R6 converged before mutation on:

- 7 feature-contract files;
- 9 missing support files;
- 16 total copy candidates;
- `gatePathCandidateDispositionShadowBinding.ts` rediscovered;
- `src/lib/authKeeper/comboRoutingEligibility.ts` rediscovered;
- 0 unresolved project-local imports.

The effect/risk block then failed because adjacent Python regex strings contained repeated global inline `(?i)` flags.

Permanent lesson: regex catalogs must be runtime-compiled and behavior-smoked during harness prevalidation.

## 10. Candidate R7 — mechanics pass, historical test typing fails current TypeScript

Classification: `HISTORICAL_TEST_TYPESCRIPT_COMPATIBILITY_DIAGNOSTIC`.

R7 proved the transplant mechanics were healthy:

- complete copy-set risk preflight pass;
- all safety hit counts zero;
- exact parent `1c4da240883e729d38a356ec83919ad7f6637623`;
- 16 files materialized byte-exact;
- current-owned files overwritten: 0;
- bounded-readout external runtime consumers: 0;
- pre-test project-local unresolved imports: 0;
- bounded readout tests: 10/10 pass;
- accumulator tests: 16/16 pass;
- observability-adapter tests: 9/9 pass;
- focused total: 35/35 pass;
- changed-file ESLint: pass.

The only remaining changed-file TypeScript diagnostic was:

`tests/unit/combo/computationalShadowObservabilityAccumulator.test.ts(109,5): error TS2698: Spread types may only be created from object types.`

Permanent lesson: historical runtime success does not waive current compiler compatibility.

## 11. Candidate R8 — accepted compatibility strategy

R8 did not reopen dependency discovery. It preserved the R7 7 + 9 = 16-file closure and zero-unresolved-import result.

R8 acceptance procedure:

1. required the pre-adaptation changed-file diagnostic set to contain exactly one diagnostic;
2. required that diagnostic to be the known line-109 TS2698;
3. AST-confirmed the failing spread assignment was exactly `...evidence()`;
4. generated only TypeScript type-assertion alternatives for that operand;
5. required non-empty transpiled JavaScript and byte-identical emitted JavaScript for all candidate assertions;
6. selected the first assertion producing zero changed-file TypeScript diagnostics and passing ESLint;
7. allowed exactly one adapted file under `tests/`;
8. required the other 15 transplanted files to remain byte-exact;
9. required production-source adaptation count to remain zero;
10. re-ran all 35 focused regressions;
11. re-ran changed-file lint/type gates;
12. preserved current 10-routed + 3-protected-native invariants;
13. ran default Webpack production build and artifact qualification;
14. committed only after every gate passed.

Accepted selected variant: runtime-erased `Record<string, unknown>` assertion.

Result: `PASS_D18_ORCHESTRATION_FOUNDATION_TRANSPLANT_CANDIDATE_R8`.

## 12. Permanent anti-repeat engineering rules

Historical feature transplant work must distinguish:

1. final commit diff;
2. feature-owned frozen contract;
3. complete missing-only support closure relative to current authority;
4. complete transitive historical reachability graph;
5. current implementation authority.

Additional rules:

- never add missing dependencies one-by-one when a parser-backed closure can be derived first;
- never treat a directory namespace as architectural authority by itself;
- stop traversal at current-owned implementations;
- compute and safety-classify the whole missing copy set before candidate mutation;
- require assembled-candidate static import resolution before tests;
- runtime-compile and behavior-smoke regex catalogs before use;
- classify changed-file compiler diagnostics before compatibility edits;
- for test-only TypeScript compatibility, require runtime-erased adaptation plus emitted-JavaScript parity;
- production source remains exact unless separately justified;
- compatibility variants should be tested automatically inside one qualification run rather than through repeated operator reruns;
- do not resurrect retired providers or network-capable historical application services merely because they are reachable historically.

## 13. Architecture sanity conclusion

The D18 work remains aligned with the five-pillar architecture.

- OmniRoute remains routing/orchestration authority;
- Auth Keeper remains credential/session/account authority and may expose eligibility contracts consumed by orchestration;
- Operations Floor remains observer/operator plane;
- GPT-5.6 Sol/Terra/Luna remain protected-native and non-routeable in the normal fleet;
- OpenCode and TheOldLLM remain retired from active product scope;
- D18 remains passive/unwired;
- full end-to-end qualification is now the active phase;
- live cutover remains separately gated and unauthorized.

For new-chat continuation, use [CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md).
