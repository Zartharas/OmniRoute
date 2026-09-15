# Engineering Tracker

Last reviewed: 2026-09-15
Status: Durable work tracker for the `Zartharas/OmniRoute` fork

This tracker records completed, active and pending engineering work across the five-pillar product. It is subordinate to accepted Git/test/build/runtime evidence and the canonical architecture/engineering documents.

## 1. Current product sequence

| Order | Workstream | Status | Current authority / next action |
| --- | --- | --- | --- |
| 1 | Codex Unified repository reintegration | Complete | Current integrated host/repository authority preserved through later phases |
| 2 | Auth Keeper final contract reconciliation | Complete | R11 `b3b0d137369038d22820947729233deaec19e166` |
| 3 | Operations Floor selective reintegration | Complete | `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c` |
| 4 | Production build-policy hardening | Complete | Webpack-default successor `1c4da240883e729d38a356ec83919ad7f6637623` |
| 5 | D18 bounded orchestration/evidence foundation transplant | Active | R6 complete missing-only support closure + effect/risk gate |
| 6 | Full end-to-end qualification | Pending | Begins only after D18 acceptance |
| 7 | Live activation / cutover | Not authorized | Separate explicit gate after full E2E/canary/rollback review |

Do **not** resume D19 automatically.

## 2. Current workload/provider authority

- routed models: 10;
- personal lane: 6;
- MTA/enterprise lane: 4;
- protected-native: GPT-5.6 Sol, Terra, Luna;
- protected-native routeability: none;
- OpenCode: retired from active product scope;
- TheOldLLM: retired from active product scope.

Historical references, tombstones and negative tests may remain if non-reachable.

## 3. Accepted completed work

### Codex Unified

- repository reintegration complete for the current integration lineage;
- host configuration/catalog/workload policy/router remain qualification sentinels;
- current 10-routed + 3-protected-native authority established;
- personal versus MTA/enterprise split preserved;
- protected-native Sol/Terra/Luna excluded from normal routed IDs.

### Auth Keeper R11

Accepted private-repo authority:

- commit `b3b0d137369038d22820947729233deaec19e166`;
- tree `9377fe6afe21f098861f32c751f05c8a72882211`;
- parent `9419532db2d37218778343b66f5667ea6e437b43`;
- full suite 457/457 pass;
- evidence ZIP SHA-256 `fd1be07a3e2eaf76aa6d9190cfc1725e69b34d6e099ff6104725165692808854`.

Boundary remains: OmniRoute owns routing/provider policy; Auth Keeper owns credential/session/account lifecycle.

### Operations Floor

Accepted local authority:

- commit `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c`;
- tree `2dbd97c1a0bfd1d3e1b9ffb1ce02fdc76848fddb`.

Accepted outcomes:

- 27-file selective reintegration;
- bounded current-contract adaptations only;
- current 10+3 workload authority preserved;
- protected-native routeability zero;
- OpenCode/TheOldLLM not reactivated;
- targeted tests/lint/type differential passed;
- Operations Floor remains observer/operator plane.

### Production build policy

Webpack-default successor:

- commit `1c4da240883e729d38a356ec83919ad7f6637623`;
- tree `569335188af0ec7c20d43b2a9ecc98bca83a1e9b`;
- parent `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c`.

Policy:

- plain `npm run build` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=0` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=1` → explicit Turbopack opt-in.

Standardization evidence ZIP SHA-256: `891bcfab81173eb86d5b9ab478eec6f3108c644f51dbf9440f970b63f5f5efeb`.

## 4. D18 source authority

Frozen local D18 authority:

- branch `feat/r16-32d18-bounded-production-evidence-readout`;
- commit `0f13a6d6df0251d9fa39e70aff78c0b58766845d`;
- tree `71e1f60cd349599df0e9c4f800af6e6a3f719fd4`;
- parent `0b42d800a4f6bb1f000a51cb5e93a2be18ea623b`.

D18 is local-only authority and must not be described as published to the fork remote by that SHA.

Read-only transplant audit evidence ZIP SHA-256:

`69104b926e96801a17f70d1da2c02d28bc678d0c717d6f200003cefceb1d4c13`

## 5. D18 candidate history

### R1 — failed safely

Classification: `GENUINE_OUTBOUND_DEPENDENCY_CLOSURE_OMISSION`.

The final D18 commit changed only two files, but the bounded-readout regression required earlier foundation code such as `computationalShadowObservabilityAccumulator.ts`.

Lesson: final commit diff is not automatically the complete transplant boundary.

### R2 — failed safely

Classification: `HARNESS_ONLY_REGEX_IMPORT_SCANNER_FALSE_POSITIVE`.

Regex discovery misclassified import-looking strings as module edges. TypeScript AST/module resolution is required for real dependency authority.

### R3 — failed safely

Classification: `UNBOUNDED_TRANSITIVE_GRAPH_IS_NOT_D18_PATCH_AUTHORITY`.

The TypeScript AST/module graph was structurally valid and found 1,164 files, 2,924 edges, 63 files missing from current, 841 identical current files, 260 divergent current files and 0 unresolved internal imports. The graph crossed retired OpenCode inventory and network-capable historical services, so reachability evidence was rejected as automatic patch authority.

### R4 — failed safely

Classification: `SEVEN_FILE_FEATURE_CONTRACT_REQUIRES_BOUNDED_MISSING_SUPPORT_CLOSURE`.

R4 correctly froze the exact seven-file D18 feature contract and copied all seven byte-exact with no current overwrite or semantic adaptation. The first regression failed at module load because `gatePathCandidateDispositionShadowObservability.ts` requires missing `gatePathCandidateDispositionShadowBinding.ts`.

### R5 — failed safely

Classification: `HARD_NAMESPACE_BOUNDARY_REJECTED_LEGITIMATE_AUTH_KEEPER_SUPPORT_DEPENDENCY`.

R5 correctly used `STOP_AT_CURRENT_OWNED_DEPENDENCIES`, but still required all missing support to stay under `open-sse/services/combo/` or `tests/unit/combo/`. Read-only closure derivation then found real missing edges:

- `open-sse/services/combo/executeTargetGates.ts` → `src/lib/authKeeper/comboRoutingEligibility.ts`;
- `open-sse/services/combo/attemptLoopTypes.ts` → `src/lib/authKeeper/comboRoutingEligibility.ts`.

R5 stopped before candidate creation. This is a harness/policy boundary failure, not evidence that the Auth Keeper eligibility dependency is invalid. Directory namespace alone is not architectural authority.

### R6 — active

Patch authority remains the seven-file D18 feature contract plus the **complete missing-only support closure relative to current authority**.

R6 rules:

1. seed the TypeScript AST/module resolver with the seven D18 feature-contract files;
2. resolve all real project-local module edges against pinned D18;
3. stop traversal at every target already owned by current OmniRoute;
4. recurse through every target missing from current regardless of directory namespace;
5. require zero unresolved project-local imports;
6. require the derived closure to rediscover both known blockers: `gatePathCandidateDispositionShadowBinding.ts` and `src/lib/authKeeper/comboRoutingEligibility.ts`;
7. inventory the complete copy set before candidate creation;
8. reject the copy set if it contains retired OpenCode/TheOldLLM production references, routeable protected-native state, DB writes, network calls, child-process/server side effects, or known historical provider/usage/fetcher/quota application surfaces;
9. create an isolated candidate only after that complete preflight passes;
10. copy missing files byte-exact and overwrite zero current files;
11. before tests, run a second TypeScript module-resolution pass against the assembled candidate and require every project-local import from every copied source file to resolve;
12. this pre-test gate is intended to prevent repeated static `ERR_MODULE_NOT_FOUND` failures;
13. run the three D18 regression files only after import closure is proven complete;
14. require changed-file lint pass and zero changed-file TypeScript diagnostics;
15. preserve the 10 routed + 3 protected-native workload authority;
16. run the default Webpack production build;
17. no live/provider/credential/dependency-install/remote-push side effects.

R6 specifically rejects both previous extremes and the R5 mistake:

- final-diff-only is too narrow;
- full historical reachability is too broad;
- hard directory allowlisting is not architectural authority;
- the accepted support model is complete missing-only closure bounded by current implementation authority and effect/risk policy.

## 6. Permanent anti-repeat transplant rules

For historical feature reintegration, keep these sets separate:

1. final commit diff;
2. feature-owned frozen contract;
3. complete missing-only support closure relative to current authority;
4. full transitive historical reachability graph;
5. current implementation authority.

Permanent execution rules:

- do not add missing dependencies one-by-one when parser-backed closure can derive them first;
- do not use directory namespace as a proxy for architectural legitimacy;
- stop dependency traversal at current-owned implementations;
- compute and safety-classify the entire missing copy set before candidate mutation;
- require an assembled-candidate static import-resolution pass before executing tests;
- preserve runtime-computed dependency failures as genuine qualification failures rather than masking them;
- never resurrect retired providers or network-capable historical application surfaces merely because they are historically reachable.

## 7. Full end-to-end qualification — pending

Begins only after an accepted bounded D18 candidate succeeds.

Target path:

`Codex Unified → OmniRoute → Auth Keeper/provider → orchestration/fallback → response → Operations Floor evidence`

Qualification must include quota, cooldown, provider outage, auth expiry/re-auth, fallback, workload isolation, protected-native preservation, restart/recovery and rollback readiness.

## 8. Live activation — not authorized

No current local acceptance authorizes production cutover, D18 readout activation or preference-routing activation.
