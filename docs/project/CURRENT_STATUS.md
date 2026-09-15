# Current Project Status

Last reviewed: 2026-09-15
Status: Canonical checkpoint summary for the `Zartharas/OmniRoute` fork

This document records the latest accepted engineering checkpoint. Product architecture remains in [Architecture Source of Truth](ARCHITECTURE_SOURCE_OF_TRUTH.md), engineering method in [Engineering Source of Truth](ENGINEERING_SOURCE_OF_TRUTH.md), long-range sequencing in [Master Roadmap](MASTER_ROADMAP.md), and detailed work-state in [Engineering Tracker](ENGINEERING_TRACKER.md).

Accepted Git objects, tests, build evidence and runtime evidence remain implementation authority when more specific than this summary.

## 1. Five-pillar product status

The product goal remains unchanged:

1. Codex Unified Agent
2. Unified OmniRoute AI Workforce
3. Auth Keeper
4. Intelligent Multi-Model Orchestration
5. Operations Floor

The engineering program has advanced beyond the previous D14/D15 checkpoint. The current sequence is:

1. Codex Unified repository reintegration — complete for the current integration lineage.
2. Auth Keeper final contract reconciliation — complete at R11.
3. Operations Floor selective reintegration — complete and qualified.
4. Webpack-default production build policy — complete and qualified.
5. D18 bounded orchestration/evidence foundation transplant — active current phase.
6. Full end-to-end qualification — next after D18 acceptance.
7. Live activation/cutover — later explicit gate only.

Do not automatically resume D19. D18 is the bounded foundation authority for the current orchestration step.

## 2. Current OmniRoute integration authority

Latest accepted local integration authority before the D18 transplant:

- commit: `1c4da240883e729d38a356ec83919ad7f6637623`
- tree: `569335188af0ec7c20d43b2a9ecc98bca83a1e9b`
- branch/worktree lineage: `fix/production-webpack-default-r1`
- parent Operations Floor authority: `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c`

This authority is local engineering authority and is not claimed to be published to the fork release branch.

## 3. Auth Keeper authority

Auth Keeper final contract reconciliation is closed in the private repository.

Accepted R11 authority:

- commit: `b3b0d137369038d22820947729233deaec19e166`
- tree: `9377fe6afe21f098861f32c751f05c8a72882211`
- parent: `9419532db2d37218778343b66f5667ea6e437b43`
- full suite: 457/457 pass, 0 failures
- accepted evidence ZIP SHA-256: `fd1be07a3e2eaf76aa6d9190cfc1725e69b34d6e099ff6104725165692808854`

Auth Keeper remains credential/session authority; OmniRoute remains routing/provider authority.

## 4. Operations Floor reintegration authority

Operations Floor selective reintegration is closed at:

- commit: `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c`
- tree: `2dbd97c1a0bfd1d3e1b9ffb1ce02fdc76848fddb`

The reintegration was derived from pinned historical Operations Floor authority and a 27-file selective union rather than a wholesale merge.

Important accepted compatibility outcomes:

- historical source authority and current component compatibility were treated as separate gates;
- the current 10-routed + 3-protected-native workload model replaced stale historical 14-model assumptions;
- GPT-5.6 Sol/Terra/Luna remain protected-native and non-routeable;
- OpenCode and TheOldLLM were not reactivated;
- current component contracts were preserved through bounded adaptations;
- Operations Floor remains an observability/operator plane, not routing authority.

## 5. Production build qualification policy

The recurring Turbopack production-build failure was isolated from source correctness: the same accepted tree qualified successfully with Webpack.

Current build policy:

- default `npm run build` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=0` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=1` → explicit Turbopack opt-in/testing.

Webpack production qualification evidence:

- Operations Floor Webpack qualification ZIP SHA-256: `bf3c658cd0590d49cdc54b77ec671560701ffdd2f25aab3caa5d3fa4cefebbad`;
- Webpack-default standardization evidence ZIP SHA-256: `891bcfab81173eb86d5b9ab478eec6f3108c644f51dbf9440f970b63f5f5efeb`;
- default production build: pass;
- standalone output: present;
- Turbopack panic in Webpack log: absent.

This policy avoids repeatedly rediscovering the same Turbopack invariant panic while preserving explicit opt-in for future requalification.

## 6. Current routed/protected workload authority

Current host-side workload authority remains:

- routed models: 10;
- personal: 6;
- MTA/enterprise: 4;
- protected-native: 3;
- protected-native names: GPT-5.6 Sol, GPT-5.6 Terra, GPT-5.6 Luna;
- protected-native routeability: none.

The host configuration/catalog/workload policy/router are sentinels for current integration qualification, not substitutes for repository architecture documents.

## 7. Active-provider scope

OpenCode and TheOldLLM are retired from active product scope.

They must not be present as active providers/workers/routes/bootstrap candidates/fallback candidates or Auth Keeper activation targets. Historical references, negative tests and tombstones may remain when non-reachable.

This status supersedes earlier documentation that treated them as active architectural lanes.

## 8. D18 current phase

Frozen D18 source authority:

- commit: `0f13a6d6df0251d9fa39e70aff78c0b58766845d`
- tree: `71e1f60cd349599df0e9c4f800af6e6a3f719fd4`
- parent: `0b42d800a4f6bb1f000a51cb5e93a2be18ea623b`
- branch: `feat/r16-32d18-bounded-production-evidence-readout`

D18 is local-only source authority and is not currently resolvable from the fork remote by that commit SHA.

The first read-only transplant audit established:

- D18 final commit changed 2 files;
- both were missing from the current OmniRoute integration tree;
- zero divergent files;
- zero deletion files;
- zero external runtime inbound edges;
- zero retired-provider/protected-routeability/DB-write/network/credential review hits in that two-file surface;
- decision: selective transplant required.

Subsequent candidate work exposed an important contract-boundary lesson:

- R1 was too narrow: the final two-file D18 diff omitted earlier D18 foundation dependencies;
- R2 regex import scanning produced false module edges;
- R3 TypeScript AST resolution correctly found the full historical graph, but that graph expanded to 1,164 files with 63 missing files and reached retired-provider/network-capable historical surface;
- therefore the unbounded historical transitive graph is not D18 patch authority;
- current R4 direction is the exact source-backed seven-file D18 frozen contract boundary, copying only missing contract files and preserving newer current implementations.

D18 must remain passive/unwired during transplant. No live provider calls, credential acquisition, production DB writes or routing activation are authorized by this phase.

## 9. Next phase

Current next step:

`D18_ORCHESTRATION_FOUNDATION_TRANSPLANT_CANDIDATE_R4`

Acceptance requirements include:

- exact seven-file frozen contract classification;
- missing-only byte-exact materialization;
- no overwrite of newer divergent current implementations;
- zero external production consumers of the bounded readout;
- three bounded D18 contract tests passing;
- zero changed-file TypeScript diagnostics;
- changed-file lint pass;
- 10+3 workload/protected-native invariants preserved;
- default Webpack production build pass;
- no Turbopack panic in the Webpack build;
- no live/runtime/provider/credential mutation;
- no remote push.

If R4 is accepted, the next program step is `FULL_END_TO_END_QUALIFICATION`.

## 10. Live activation boundary

No current D18/Operations Floor/Webpack-default qualification authorizes production cutover or preference-routing activation.

Live activation remains a separate explicit decision after canonical source authority, end-to-end qualification, canary/shadow evidence, rollback state and live health checks are reviewed.

## 11. Publication rule

Update this document whenever a later accepted phase changes:

- current OmniRoute integration authority;
- Auth Keeper authority;
- Operations Floor authority;
- current D18 phase;
- build qualification policy;
- active-provider scope;
- protected-native/workload authority;
- full-E2E/live-cutover status.
