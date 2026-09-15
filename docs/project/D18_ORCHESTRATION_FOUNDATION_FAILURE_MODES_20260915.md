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

## 9. Candidate R6 — complete missing-only closure with effect/risk policy

R6 keeps the seven-file feature contract as ownership authority but removes the hard path allowlist.

Traversal rule:

`STOP_AT_CURRENT_OWNED_DEPENDENCIES`

R6 preflight algorithm:

1. seed the TypeScript AST/module resolver with the seven feature-contract files;
2. resolve real project-local module edges against pinned D18;
3. if a resolved target already exists in current OmniRoute, record an authority-boundary edge and stop traversal there;
4. if a target is missing from current, add it to the missing-only support set and recurse through that missing file regardless of directory namespace;
5. require zero unresolved project-local imports;
6. require the closure to rediscover both known concrete blockers: `gatePathCandidateDispositionShadowBinding.ts` and `src/lib/authKeeper/comboRoutingEligibility.ts`;
7. inventory the entire derived copy set before any candidate is created;
8. reject the whole set if it contains retired OpenCode/TheOldLLM production references, routeable protected-native state, DB writes, network calls, child-process/server side effects, or known historical provider/usage/fetcher/quota application surfaces;
9. only after the complete copy set passes those gates may an isolated candidate worktree be created;
10. copy only missing files byte-exact and overwrite zero current files;
11. before tests, re-run TypeScript module resolution against the assembled candidate and require every project-local import from every copied source file to resolve;
12. this pre-test resolution gate is specifically intended to prevent another static `ERR_MODULE_NOT_FOUND` cycle;
13. then run the three D18 regressions, changed-file lint/type gates, 10+3 workload invariants and default Webpack production build.

R6 does not weaken the architectural boundary. It replaces path-based legitimacy with evidence-based behavior and current-authority boundaries.

## 10. Permanent anti-repeat engineering rules

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
- preserve unresolved runtime-computed dependency failures as genuine qualification failures rather than hiding them;
- do not resurrect retired providers or network-capable historical application services merely because they are reachable historically.

## 11. Architecture sanity conclusion

The D18 work remains aligned with the five-pillar architecture.

R1 through R5 refined engineering authority; they did not redefine the product:

- OmniRoute remains routing/orchestration authority;
- Auth Keeper remains credential/session/account authority and may expose eligibility contracts consumed by orchestration;
- Operations Floor remains observer/operator plane;
- GPT-5.6 Sol/Terra/Luna remain protected-native and non-routeable in the normal fleet;
- OpenCode and TheOldLLM remain retired from active product scope;
- D18 remains passive/unwired;
- full end-to-end qualification remains required before any activation or cutover.
