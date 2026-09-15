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
| 5 | D18 bounded orchestration/evidence foundation transplant | Active | R7 preserves the accepted R6 16-file closure and fixes only a harness regex runtime defect |
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

The TypeScript AST/module graph was structurally valid and found:

- 1,164 files;
- 2,924 edges;
- 63 files missing from current;
- 841 identical current files;
- 260 divergent current files;
- 0 unresolved internal imports.

But the graph crossed retired OpenCode inventory and network-capable historical services. Reachability evidence is not automatic patch authority.

### R4 — failed safely

Classification: `SEVEN_FILE_FEATURE_CONTRACT_REQUIRES_BOUNDED_MISSING_SUPPORT_CLOSURE`.

R4 correctly froze the exact seven-file D18 feature contract and proved all seven were missing, copied byte-exact, and passive/unwired. Its first regression then failed because `gatePathCandidateDispositionShadowObservability.ts` imports missing `gatePathCandidateDispositionShadowBinding.ts`.

### R5 — failed safely

Classification: `HARD_NAMESPACE_BOUNDARY_REJECTED_LEGITIMATE_AUTH_KEEPER_SUPPORT_DEPENDENCY`.

R5 correctly derived a missing-only support closure that stopped at current-owned files, but its hard support namespace rule rejected legitimate cross-pillar support:

- `open-sse/services/combo/executeTargetGates.ts` → `src/lib/authKeeper/comboRoutingEligibility.ts`;
- `open-sse/services/combo/attemptLoopTypes.ts` → `src/lib/authKeeper/comboRoutingEligibility.ts`.

Permanent lesson: path namespaces are not architectural authority. Cross-pillar dependencies must be evaluated by ownership/effect semantics, not rejected solely by directory.

### R6 — failed safely after successful closure discovery

Classification: `HARNESS_ONLY_PYTHON_REGEX_INLINE_FLAG_PLACEMENT`.

R6 replaced the hard namespace rule with a complete missing-only support closure plus effect/risk gating. Before any candidate creation it successfully converged on:

- 7 feature-contract files;
- 9 missing support files;
- 16 total byte-exact copy candidates;
- `gatePathCandidateDispositionShadowBinding.ts` rediscovered;
- `src/lib/authKeeper/comboRoutingEligibility.ts` rediscovered;
- 0 unresolved project-local imports;
- traversal stopped at current-owned dependencies.

The next risk-preflight block failed before mutation because one Python regex was built from two implicitly concatenated strings that both contained global inline `(?i)` flags. Python 3.11 rejected the second flag because it was not at the beginning of the combined expression.

This was a harness-only failure. The 16-file dependency boundary is retained as the current derived support result.

Permanent lesson: regex syntax must be runtime-compiled during prevalidation; shell/Python syntax compilation alone is insufficient for dynamically constructed regex patterns.

### R7 — active

R7 preserves the R6 closure algorithm and the derived 7 + 9 = 16 file support result. It changes only harness qualification around the risk catalog:

1. remove inline global regex flags from case-insensitive patterns;
2. pass `re.I` through `re.compile(..., re.I)` instead;
3. runtime-compile the full risk regex catalog before the real risk gate;
4. run behavior smoke assertions for every risk regex;
5. require zero inline global `(?i)` flags in embedded Python;
6. safely recover any uncommitted R6 residue;
7. preserve the complete missing-only closure, pre-test static import-resolution gate, passive/unwired boundary, 10+3 invariants and default Webpack build qualification.

The anti-repeat engineering rule is now explicit: dependency discovery, static import resolution, and runtime regex compilation must all complete before tests or source acceptance. Do not fix missing dependencies one-at-a-time when a complete parser-backed closure can be derived first.

## 6. Permanent transplant-set distinction

For historical feature reintegration, keep these sets separate:

1. final commit diff;
2. feature-owned frozen contract;
3. minimal missing support closure relative to current authority;
4. full transitive historical reachability graph;
5. current implementation authority.

The patch surface is not automatically any one of those sets in isolation. It must be source-backed, bounded, compatible with current authority and free of unrelated historical application resurrection.

## 7. Full end-to-end qualification — pending

Begins only after an accepted bounded D18 candidate succeeds.

Target path:

`Codex Unified → OmniRoute → Auth Keeper/provider → orchestration/fallback → response → Operations Floor evidence`

Qualification must include quota, cooldown, provider outage, auth expiry/re-auth, fallback, workload isolation, protected-native preservation, restart/recovery and rollback readiness.

## 8. Live activation — not authorized

No current local acceptance authorizes production cutover, D18 readout activation or preference-routing activation.
