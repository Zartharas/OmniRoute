# Current Project Status

Last reviewed: 2026-09-15
Status: Canonical checkpoint summary for the `Zartharas/OmniRoute` fork

This document records the latest accepted engineering checkpoint. Product architecture remains in [Architecture Source of Truth](ARCHITECTURE_SOURCE_OF_TRUTH.md), engineering method in [Engineering Source of Truth](ENGINEERING_SOURCE_OF_TRUTH.md), long-range sequencing in [Master Roadmap](MASTER_ROADMAP.md), detailed work-state in [Engineering Tracker](ENGINEERING_TRACKER.md), and new-chat continuation state in [Full E2E Chat Handoff](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md).

Accepted Git objects, tests, build evidence and runtime evidence remain implementation authority when more specific than this summary.

## Current program sequence

1. Codex Unified repository reintegration — complete.
2. Auth Keeper final contract reconciliation — complete at R11.
3. Operations Floor selective reintegration — complete.
4. Webpack-default production build policy — complete.
5. D18 bounded orchestration/evidence foundation transplant — complete and accepted at R8.
6. Full end-to-end qualification — **active; user authorized non-destructive engineering qualification**.
7. Live activation/cutover — not authorized.

Do not automatically resume D19.

## Current accepted OmniRoute authority

- branch: `feat/d18-orchestration-foundation-transplant-r8`
- commit: `58452140ffc8122a26a387638f8a38d7d80f5024`
- tree: `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`
- parent: `1c4da240883e729d38a356ec83919ad7f6637623`
- evidence ZIP SHA-256: `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`

R8 is local accepted engineering authority and is not claimed to be published to the fork release branch unless later Git evidence proves publication.

## R8 acceptance summary

- 7 feature-contract + 9 support = 16 transplanted paths;
- current-owned files overwritten: 0;
- unresolved project-local imports: 0;
- bounded readout external runtime consumers: 0;
- 15 files byte-exact to D18;
- one test-only runtime-erased TypeScript compatibility adaptation;
- production-source adaptation count: 0;
- focused tests: 35/35 pass;
- changed-file ESLint: pass;
- changed-file TypeScript diagnostics: 0;
- current 10-routed + 3-protected-native invariants: pass;
- default Webpack production build: pass;
- BUILD_ID and standalone output: present;
- output files: 22,645;
- Turbopack panic: absent.

D18 remains passive/unwired. R8 acceptance is not activation authority.

## Auth Keeper authority

- commit: `b3b0d137369038d22820947729233deaec19e166`
- tree: `9377fe6afe21f098861f32c751f05c8a72882211`
- 457/457 tests pass;
- evidence SHA-256: `fd1be07a3e2eaf76aa6d9190cfc1725e69b34d6e099ff6104725165692808854`.

## Operations Floor authority

- commit: `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c`
- tree: `2dbd97c1a0bfd1d3e1b9ffb1ce02fdc76848fddb`.

## Workload/provider authority

- routed: 10;
- personal: 6;
- MTA/enterprise: 4;
- protected-native: GPT-5.6 Sol, Terra, Luna;
- protected-native routeability: none;
- OpenCode: retired from active scope;
- TheOldLLM: retired from active scope.

## Production build policy

- plain `npm run build` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=0` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=1` → explicit Turbopack experiment/requalification only.

Do not repeatedly rediscover the known Turbopack invariant panic during ordinary acceptance work.

## Active full E2E phase

Accepted baseline: R8 commit `58452140ffc8122a26a387638f8a38d7d80f5024`.

Target path:

`Codex Unified → OmniRoute → Auth Keeper/provider eligibility → orchestration/fallback → response → Operations Floor evidence`

The next deliverable should be one consolidated, non-destructive, prevalidated E2E harness with read-only preflight, fail-closed guards, mocks/fixtures/deterministic failure injection where possible, evidence packaging and final non-drift.

It should cover source/tree lineage, host sentinels, Codex Unified contracts, Auth Keeper eligibility, routing/fallback, quota/cooldown, provider outage, auth-expiry/re-auth boundaries, workload isolation, protected-native preservation, Operations Floor evidence, restart/recovery, rollback readiness, Webpack production identity and evidence continuity.

### Safety boundary

Current authorization does not permit uncontrolled live provider/model calls, credential-value reads, live Auth Keeper mutation, production routing/provider mutation, D18/preference activation, live container/image/database mutation, remote push/deployment or live cutover.

## New-chat continuation

Read [CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md) first in a new conversation.

Last accepted local script: `omniroute_d18_orchestration_foundation_transplant_candidate_r8.sh`.

If its output/evidence is supplied again, verify against accepted R8 rather than reopening R1-R7. If a newer E2E harness output is supplied, identify it by header/hash and continue from that evidence.
