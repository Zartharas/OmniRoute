# Engineering Tracker

Last reviewed: 2026-09-15
Status: Durable work tracker for the `Zartharas/OmniRoute` fork

For new-chat continuation, use [CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md).

## Current sequence

| Order | Workstream | Status | Authority / next action |
| --- | --- | --- | --- |
| 1 | Codex Unified repository reintegration | Complete | Preserved through current integration lineage |
| 2 | Auth Keeper final contract reconciliation | Complete | R11 `b3b0d137369038d22820947729233deaec19e166` |
| 3 | Operations Floor selective reintegration | Complete | `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c` |
| 4 | Production build-policy hardening | Complete | Webpack-default parent `1c4da240883e729d38a356ec83919ad7f6637623` |
| 5 | D18 bounded orchestration/evidence transplant | Complete | R8 `58452140ffc8122a26a387638f8a38d7d80f5024` / tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d` |
| 6 | Full end-to-end qualification | **Active / authorized non-destructive engineering qualification** | Build one consolidated prevalidated harness from R8 |
| 7 | Live activation / cutover | Not authorized | Separate explicit gate after E2E/canary/rollback review |

Do not resume D19 automatically.

## Current workload/provider authority

- routed models: 10;
- personal: 6;
- MTA/enterprise: 4;
- protected-native: GPT-5.6 Sol, Terra, Luna;
- protected-native routeability: none;
- OpenCode and TheOldLLM: retired from active scope.

## Accepted R8

- branch `feat/d18-orchestration-foundation-transplant-r8`
- commit `58452140ffc8122a26a387638f8a38d7d80f5024`
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`
- parent `1c4da240883e729d38a356ec83919ad7f6637623`
- evidence `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`

Acceptance:

- 7 contract + 9 support = 16 paths;
- current-owned overwrite 0;
- unresolved project-local imports 0;
- bounded readout external runtime consumers 0;
- 15 byte-exact files + 1 test-only runtime-erased compatibility adaptation;
- production-source adaptation 0;
- focused tests 35/35 pass;
- lint/type pass;
- 10+3 workload contract preserved;
- default Webpack production build pass;
- BUILD_ID/standalone present;
- 22,645 build output files;
- Turbopack panic absent.

D18 remains passive/unwired.

## Auth Keeper R11

- commit `b3b0d137369038d22820947729233deaec19e166`
- tree `9377fe6afe21f098861f32c751f05c8a72882211`
- 457/457 tests pass
- evidence `fd1be07a3e2eaf76aa6d9190cfc1725e69b34d6e099ff6104725165692808854`

## Operations Floor

- commit `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c`
- tree `2dbd97c1a0bfd1d3e1b9ffb1ce02fdc76848fddb`

## D18 failure sequence

- R1: final diff too narrow.
- R2: regex import false positives.
- R3: full historical graph valid but too broad for patch authority.
- R4: feature contract not self-contained for tests.
- R5: hard path namespace rejected legitimate Auth Keeper support.
- R6: correct 16-file closure found; Python regex runtime bug.
- R7: mechanics/tests passed; one historical test TS2698 remained.
- R8: accepted after runtime-erased test-only compatibility adaptation with emitted-JS parity.

Permanent lessons are in `D18_ORCHESTRATION_FOUNDATION_FAILURE_MODES_20260915.md`.

## Active full E2E qualification

Accepted baseline: R8.

Target:

`Codex Unified → OmniRoute → Auth Keeper/provider eligibility → orchestration/fallback → response → Operations Floor evidence`

The user explicitly authorized non-destructive engineering qualification.

Next deliverable: one consolidated prevalidated harness with read-only preflight, fail-closed safety guards, mocks/fixtures/deterministic failure injection where possible, evidence packaging and final non-drift.

Qualification scope: source/tree lineage, host sentinels, Codex Unified contracts, Auth Keeper eligibility, routing/fallback, quota/cooldown, provider outage, auth-expiry/re-auth semantics, workload isolation, protected-native preservation, Operations Floor evidence, restart/recovery, rollback readiness, Webpack production identity and evidence continuity.

Safety: no uncontrolled live provider/model calls, credential-value reads, live Auth Keeper mutation, production routing/provider mutation, D18/preference activation, live image/container/database mutation, remote push/deploy/cutover unless later explicitly authorized.

## Last accepted local script

`omniroute_d18_orchestration_foundation_transplant_candidate_r8.sh`

Result: `PASS_D18_ORCHESTRATION_FOUNDATION_TRANSPLANT_CANDIDATE_R8`.

If its output is shared again, verify against R8; do not reopen R1-R7. If a newer E2E harness output is supplied, identify by header/hash and continue from it.
