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
| 5 | D18 bounded orchestration/evidence foundation transplant | **Complete** | Accepted R8 `58452140ffc8122a26a387638f8a38d7d80f5024` / tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d` |
| 6 | Full end-to-end qualification | **Active** | Qualify the five-pillar path on the accepted R8 successor without authorizing live cutover |
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

### D18 bounded orchestration/evidence foundation — accepted R8

Accepted local authority:

- branch `feat/d18-orchestration-foundation-transplant-r8`;
- commit `58452140ffc8122a26a387638f8a38d7d80f5024`;
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`;
- parent `1c4da240883e729d38a356ec83919ad7f6637623`;
- evidence ZIP SHA-256 `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`.

Accepted transplant shape:

- 7 feature-contract files + 9 missing support files = 16 total files;
- traversal stopped at current-owned dependencies;
- project-local unresolved imports: 0;
- current-owned files overwritten: 0;
- bounded-readout external runtime consumers: 0;
- 15 files byte-exact to frozen D18;
- one test-only TypeScript compatibility adaptation;
- production-source adaptation count: 0;
- compatibility variant: `Record<string, unknown>` assertion around `evidence()` in `tests/unit/combo/computationalShadowObservabilityAccumulator.test.ts`;
- emitted JavaScript parity for the adapted test: pass;
- adapted test SHA-256 `b79a2df559db085aba1562ca67f83bfb3df2fe7e454384a3d2d5ea60d8a43964`.

Qualification results:

- copy-set risk gate: pass;
- retired-provider hits: 0;
- protected-native routeable hits: 0;
- DB-write/network/process/server/historical-path risk hits: 0;
- bounded readout tests: 10/10 pass;
- accumulator tests: 16/16 pass;
- observability-adapter tests: 9/9 pass;
- focused total: 35/35 pass;
- changed-file ESLint: pass;
- changed-file TypeScript diagnostics after adaptation: 0;
- current 10-routed + 3-protected-native invariants: pass;
- default Webpack production build: pass;
- build output file count: 22,645;
- standalone artifact: present;
- Turbopack panic signatures: absent;
- live runtime mutation/provider calls/credential reads/dependency install/remote push: none.

The uploaded R8 evidence package was independently rechecked after the run: outer ZIP SHA matched, all 33 manifest-tracked files matched their internal SHA-256 values, all 34 `evidence-hashes.txt` entries validated, the patch contained exactly 16 added paths, focused test logs showed 10/10 + 16/16 + 9/9 with zero failures, and the selected test-only assertion preserved the emitted-JavaScript SHA.

D18 remains passive/unwired. R8 acceptance is **not** live activation authority.

## 4. D18 source authority

Frozen local D18 source authority remains:

- branch `feat/r16-32d18-bounded-production-evidence-readout`;
- commit `0f13a6d6df0251d9fa39e70aff78c0b58766845d`;
- tree `71e1f60cd349599df0e9c4f800af6e6a3f719fd4`;
- parent `0b42d800a4f6bb1f000a51cb5e93a2be18ea623b`.

D18 source is local-only authority and must not be described as published to the fork remote by that SHA.

Read-only transplant audit evidence ZIP SHA-256:

`69104b926e96801a17f70d1da2c02d28bc678d0c717d6f200003cefceb1d4c13`

## 5. D18 candidate history

### R1 — failed safely

Classification: `GENUINE_OUTBOUND_DEPENDENCY_CLOSURE_OMISSION`.

The final D18 commit changed only two files, but the bounded-readout regression required earlier foundation code such as `computationalShadowObservabilityAccumulator.ts`.

### R2 — failed safely

Classification: `HARNESS_ONLY_REGEX_IMPORT_SCANNER_FALSE_POSITIVE`.

Regex discovery misclassified import-looking strings as module edges. TypeScript AST/module resolution is required for real dependency authority.

### R3 — failed safely

Classification: `UNBOUNDED_TRANSITIVE_GRAPH_IS_NOT_D18_PATCH_AUTHORITY`.

The TypeScript AST/module graph was structurally valid and found 1,164 files / 2,924 edges / 63 missing files, but crossed retired-provider and network-capable historical application surface. Reachability evidence is not automatic patch authority.

### R4 — failed safely

Classification: `SEVEN_FILE_FEATURE_CONTRACT_REQUIRES_BOUNDED_MISSING_SUPPORT_CLOSURE`.

The seven-file contract was source-correct but not self-contained; `gatePathCandidateDispositionShadowBinding.ts` was the first concrete missing support dependency.

### R5 — failed safely

Classification: `HARD_NAMESPACE_BOUNDARY_REJECTED_LEGITIMATE_AUTH_KEEPER_SUPPORT_DEPENDENCY`.

A hard combo/test namespace rejected legitimate `src/lib/authKeeper/comboRoutingEligibility.ts` support. Directory paths are not architectural authority.

### R6 — failed safely after closure discovery

Classification: `HARNESS_ONLY_PYTHON_REGEX_INLINE_FLAG_PLACEMENT`.

R6 converged on the stable 7 + 9 = 16-file missing-only closure with zero unresolved project-local imports, then stopped before mutation on a Python regex construction defect.

### R7 — failed safely after transplant mechanics passed

Classification: `HISTORICAL_TEST_TYPESCRIPT_COMPATIBILITY_DIAGNOSTIC`.

R7 assembled the 16-file candidate, passed copy-set risk, import-resolution, 35/35 focused tests and lint, then stopped on the single historical test-only line-109 TS2698 diagnostic.

### R8 — accepted

R8 preserved the R7 closure and repaired only the exact historical test typing incompatibility. Acceptance required and achieved:

- exact pre-adaptation TS2698 classification;
- AST identity of the `...evidence()` spread;
- runtime-erased type-assertion trials;
- byte-identical emitted JavaScript for every trial;
- selected `record` variant;
- zero changed-file diagnostics after adaptation;
- adapted-test ESLint pass;
- runtime-JavaScript parity pass;
- 35/35 focused regressions pass;
- 15 byte-exact transplant files + 1 test-only adapted file;
- production-source adaptation: none;
- current 10+3 contract preserved;
- default Webpack production build and standalone artifact qualification pass;
- commit/evidence/non-drift gates pass.

## 6. Permanent transplant-set and anti-repeat rules

For historical feature reintegration, keep these sets separate:

1. final commit diff;
2. feature-owned frozen contract;
3. minimal missing support closure relative to current authority;
4. full transitive historical reachability graph;
5. current implementation authority.

Permanent rules:

- do not add missing dependencies one-by-one when a parser-backed missing-only closure can be derived first;
- regex text matching is not module-graph authority;
- directory namespaces are not architectural legitimacy by themselves;
- stop historical traversal at current-owned implementations;
- safety-classify the complete copy set before candidate mutation;
- require static project-local import resolution before tests;
- runtime-compile and behavior-smoke qualification regex catalogs;
- classify changed-file compiler diagnostics before compatibility edits;
- test-only compiler compatibility adaptations require runtime-erased changes plus emitted-JavaScript parity;
- production source remains exact unless separately justified;
- compatibility variants should be resolved inside one qualification run rather than repeated operator reruns;
- historical reachability must not resurrect retired providers or unrelated network-capable application services.

## 7. Full end-to-end qualification — active

The accepted baseline is now D18 R8 commit `58452140ffc8122a26a387638f8a38d7d80f5024`.

Target path:

`Codex Unified → OmniRoute → Auth Keeper/provider → orchestration/fallback → response → Operations Floor evidence`

Qualification must cover quota/cooldown behavior, provider outage handling, auth expiry/re-auth boundaries, fallback behavior, workload isolation, protected-native preservation, restart/recovery, rollback readiness and evidence continuity.

Full E2E qualification must distinguish non-destructive/offline qualification from any live-provider or production-runtime exercise. No live-provider calls, credential-value reads, production mutation or cutover are authorized merely by entering this phase.

## 8. Live activation — not authorized

No current acceptance authorizes production cutover, D18 readout activation or preference-routing activation.
