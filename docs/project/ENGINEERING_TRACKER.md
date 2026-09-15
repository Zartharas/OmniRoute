# Engineering Tracker

Last reviewed: 2026-09-15
Status: Durable tracker for `Zartharas/OmniRoute`

For continuation, read [CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md).

## Current sequence

1. Codex Unified reintegration — complete.
2. Auth Keeper R11 — complete at `b3b0d137369038d22820947729233deaec19e166`.
3. Operations Floor — complete at `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c`.
4. Webpack-default build policy — complete at parent `1c4da240883e729d38a356ec83919ad7f6637623`.
5. D18 — complete/accepted at R8 `58452140ffc8122a26a387638f8a38d7d80f5024`, tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`.
6. Full E2E qualification — **active; user authorized non-destructive engineering qualification**.
7. Live cutover — not authorized.

Do not resume D19 automatically.

## R8 acceptance

Evidence `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`.

16 paths (7 contract + 9 support); current-owned overwrite 0; unresolved local imports 0; bounded readout runtime consumers 0; 15 byte-exact files + one test-only runtime-erased adaptation; production-source adaptation 0; focused tests 35/35; lint/type pass; 10+3 preserved; Webpack/BUILD_ID/standalone pass; Turbopack panic absent. D18 remains passive/unwired.

## Workload/provider authority

10 routed = 6 personal + 4 MTA/enterprise; GPT-5.6 Sol/Terra/Luna protected-native/non-routeable; OpenCode/TheOldLLM retired.

## Anti-repeat D18 sequence

R1 final diff too narrow; R2 regex import false positives; R3 valid graph too broad; R4 feature contract not self-contained; R5 hard namespace rejected legitimate Auth Keeper support; R6 correct 16-file closure then Python regex runtime bug; R7 mechanics/tests passed then historical test TS2698; R8 accepted.

## Active full E2E phase

Target: `Codex Unified → OmniRoute → Auth Keeper/provider eligibility → orchestration/fallback → response → Operations Floor evidence`.

Next deliverable: one consolidated prevalidated non-destructive harness. Cover lineage, host sentinels, Codex Unified contracts, Auth Keeper eligibility, routing/fallback, quota/cooldown, provider outage, auth-expiry/re-auth semantics, workload isolation, protected-native preservation, Operations Floor evidence, restart/recovery, rollback readiness, Webpack identity and evidence continuity.

Safety: no uncontrolled live provider/model calls, credential-value reads, live Auth Keeper mutation, production routing/provider mutation, D18/preference activation, live image/container/database mutation, remote push/deploy/cutover unless later explicitly authorized.

Last accepted local script: `omniroute_d18_orchestration_foundation_transplant_candidate_r8.sh` → `PASS_D18_ORCHESTRATION_FOUNDATION_TRANSPLANT_CANDIDATE_R8`. If its output appears again, verify against R8 and do not reopen R1-R7.
