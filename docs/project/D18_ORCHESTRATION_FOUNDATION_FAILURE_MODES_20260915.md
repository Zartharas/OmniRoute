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

Regex discovery misclassified import-looking strings as module edges. TypeScript AST/module resolution later proved the false positives.

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

R4 proved all seven feature-contract files were missing from current OmniRoute and copied them byte-exact with zero overwrite or semantic adaptation. The first regression then failed during module loading because `gatePathCandidateDispositionShadowObservability.ts` imports missing `gatePathCandidateDispositionShadowBinding.ts`.

Permanent lesson: feature-owned contract and minimal executable/testable support set are different sets.

## 8. Candidate R5 — hard namespace boundary rejected a legitimate architecture dependency

Classification:

`HARD_NAMESPACE_BOUNDARY_REJECTED_LEGITIMATE_AUTH_KEEPER_SUPPORT_DEPENDENCY`

R5 improved the traversal rule by stopping at every dependency already owned by current OmniRoute, but it still imposed a hard missing-support namespace allowlist:

- `open-sse/services/combo/`
- `tests/unit/combo/`

The read-only closure preflight correctly rediscovered the R4 blocker, then also found two real missing edges into the Auth Keeper eligibility contract:

- `open-sse/services/combo/executeTargetGates.ts` → `src/lib/authKeeper/comboRoutingEligibility.ts`
- `open-sse/services/combo/attemptLoopTypes.ts` → `src/lib/authKeeper/comboRoutingEligibility.ts`

R5 failed before candidate creation with `D18_R5_MISSING_SUPPORT_OUTSIDE_BOUNDED_NAMESPACE`.

This was a policy/harness failure, not evidence that the Auth Keeper dependency is architecturally invalid. The path is consistent with the five-pillar authority boundary: orchestration may consume an Auth Keeper eligibility contract while Auth Keeper retains credential/session/account authority.

Permanent lesson: directory namespaces are not a reliable proxy for architectural legitimacy.

## 9. Candidate R6 — complete missing-only closure, then regex harness failure

Classification:

`HARNESS_ONLY_PYTHON_REGEX_INLINE_FLAG_PLACEMENT`

R6 kept the seven-file feature contract as ownership authority, removed the hard path allowlist, and changed support discovery to a complete missing-only closure relative to the current integrated tree.

Traversal rule:

`STOP_AT_CURRENT_OWNED_DEPENDENCIES`

R6 successfully converged before mutation on:

- 7 feature-contract files;
- 9 missing support files;
- 16 total copy candidates;
- `gatePathCandidateDispositionShadowBinding.ts` rediscovered;
- `src/lib/authKeeper/comboRoutingEligibility.ts` rediscovered;
- 0 unresolved project-local imports.

The next effect/risk block failed before candidate creation because one Python regex was assembled from adjacent strings that each carried a global inline `(?i)` flag. Python 3.11 rejected the second global flag because it was no longer at pattern position zero.

This was harness-only. The 16-file missing-only closure remained valid.

Permanent lesson: regex catalogs must be runtime-compiled and behavior-smoked during harness prevalidation. Shell syntax and Python bytecode compilation do not prove dynamically assembled regex validity.

## 10. Candidate R7 — transplant mechanics pass, historical test typing fails current TypeScript

Classification:

`HISTORICAL_TEST_TYPESCRIPT_COMPATIBILITY_DIAGNOSTIC`

R7 preserved the R6 closure algorithm and added a runtime regex-catalog self-test using `re.I` flags rather than inline global flags.

R7 then proved the transplant mechanics end-to-end up to the TypeScript gate:

- risk regex catalog: 8/8 compile and behavior smoke pass;
- complete copy-set risk gate: pass;
- retired-provider hits: 0;
- protected-native routeable hits: 0;
- DB-write hits: 0;
- network-call hits: 0;
- child-process side-effect hits: 0;
- server side-effect hits: 0;
- historical application-path risk hits: 0;
- isolated candidate parent: exact `1c4da240883e729d38a356ec83919ad7f6637623`;
- copied files: 16;
- byte identity before compatibility adaptation: pass;
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

The historical test helper returns its synthetic evidence object with `as never`; line 109 then spreads `...evidence()` while adding deliberately sensitive extra keys for a negative-leakage regression. Current TypeScript rejects spreading a value typed as `never`, although the runtime JavaScript and the focused regression behavior remain valid.

The exact historical test SHA-256 is:

`d1813972782f5fe56fc0212dcffab0aa234e8f2b239147099231403907ceadf8`

Earlier D2 evidence recorded that exact generated test identity and 16/16 accumulator regression pass. The production accumulator itself remains source-correct and runtime-clean.

Permanent lesson: historical runtime success does not waive current compiler compatibility. If the incompatibility is test-only, a compatibility adaptation may be acceptable only when it is narrowly gated, runtime-erased, and production source remains exact.

## 11. Candidate R8 — active compatibility strategy

R8 does not reopen dependency discovery. The R7 7 + 9 = 16-file closure, zero unresolved-import result, risk classification and passive/unwired boundary remain the transplant authority.

R8 permits at most one compatibility adaptation:

`tests/unit/combo/computationalShadowObservabilityAccumulator.test.ts`

R8 must fail closed unless the pre-adaptation changed-file diagnostic set contains exactly the known line-109 `TS2698` diagnostic.

Compatibility procedure:

1. verify the historical test still has SHA-256 `d1813972782f5fe56fc0212dcffab0aa234e8f2b239147099231403907ceadf8`;
2. run current `tsc --noEmit` before adaptation and require exactly one changed-file diagnostic, the known line-109 TS2698;
3. use the TypeScript AST to require the diagnostic node to be the spread assignment whose operand is exactly `evidence()`;
4. generate only type-assertion alternatives for that operand;
5. force `transpileModule` to emit non-empty JavaScript and require every candidate assertion to produce JavaScript byte-identical to the unadapted test;
6. try the variants inside the same qualification run and select the first variant that yields zero changed-file TypeScript diagnostics and passes ESLint;
7. allow exactly one adapted file and require it to be under `tests/`;
8. require the other 15 transplanted files to remain byte-exact to D18;
9. require production-source adaptation count to remain zero;
10. re-run all 35 focused regressions after adaptation;
11. re-run all changed-file lint/type gates;
12. preserve current 10-routed + 3-protected-native invariants;
13. run the default Webpack production build and artifact qualification;
14. commit only after every gate passes.

This is a type-system compatibility repair only. Emitted runtime JavaScript parity is an explicit acceptance condition.

## 12. Permanent anti-repeat engineering rules

Historical feature transplant work must distinguish at least these sets:

1. final commit diff;
2. feature-owned frozen contract;
3. complete missing-only support closure relative to current authority;
4. complete transitive historical reachability graph;
5. current implementation authority.

Additional rules:

- never add missing dependencies one-by-one through repeated test failures when a parser-backed closure can be derived first;
- never treat a directory namespace as architectural authority by itself;
- stop traversal at current-owned implementations rather than walking through their historical dependency graph;
- compute and safety-classify the whole missing copy set before candidate mutation;
- require an assembled-candidate static import-resolution pass before executing tests;
- runtime-compile and behavior-smoke regex catalogs before using them as a qualification gate;
- classify changed-file compiler diagnostics before attempting compatibility edits;
- for test-only TypeScript compatibility, require runtime-erased adaptation plus emitted-JavaScript parity;
- production source must remain exact unless a separately justified adaptation is explicitly authorized;
- compatibility variants should be tested automatically inside one qualification run rather than through repeated operator reruns;
- preserve unresolved runtime-computed dependency failures as genuine qualification failures rather than hiding them;
- do not resurrect retired providers or network-capable historical application services merely because they are reachable historically.

## 13. Architecture sanity conclusion

The D18 work remains aligned with the five-pillar architecture.

R1 through R7 refined engineering authority; they did not redefine the product:

- OmniRoute remains routing/orchestration authority;
- Auth Keeper remains credential/session/account authority and may expose eligibility contracts consumed by orchestration;
- Operations Floor remains observer/operator plane;
- GPT-5.6 Sol/Terra/Luna remain protected-native and non-routeable in the normal fleet;
- OpenCode and TheOldLLM remain retired from active product scope;
- D18 remains passive/unwired;
- full end-to-end qualification remains required before any activation or cutover.
