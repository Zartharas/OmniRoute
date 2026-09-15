# Master Roadmap — Fork Product Goal

Last reviewed: 2026-09-15
Status: Canonical roadmap for the `Zartharas/OmniRoute` fork

For full continuation context, read [CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md).

## Goal

Deliver one Codex-centered AI engineering agent backed by a heterogeneous AI workforce, with OmniRoute as routing/orchestration authority, Auth Keeper as credential/session authority, evidence-driven multi-model orchestration, protected OpenAI/Codex capacity and an Operations Floor that makes the organization understandable in real time.

## Current phase status

- Codex Unified reintegration — complete.
- Auth Keeper R11 — complete.
- Operations Floor selective reintegration — complete.
- Webpack-default build policy — complete.
- D18 bounded orchestration/evidence transplant — complete and accepted at R8.
- Full end-to-end qualification — **active; user explicitly authorized non-destructive engineering qualification**.
- Live activation/cutover — not authorized.

Do not resume D19 automatically.

## Current accepted D18 authority

- branch `feat/d18-orchestration-foundation-transplant-r8`
- commit `58452140ffc8122a26a387638f8a38d7d80f5024`
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`
- parent `1c4da240883e729d38a356ec83919ad7f6637623`
- evidence `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`

Accepted R8: 16-path bounded transplant; no current-owned overwrite; zero unresolved local imports; bounded readout passive/unwired; 35/35 focused tests; changed-file lint/type pass; one runtime-erased test-only compatibility adaptation with emitted-JavaScript parity; production source adaptation zero; 10+3 preserved; default Webpack/BUILD_ID/standalone qualification pass.

## Workload/provider authority

- 10 routed: 6 personal + 4 MTA/enterprise;
- protected-native: GPT-5.6 Sol, Terra, Luna;
- protected-native routeability: none;
- OpenCode and TheOldLLM: retired from active scope.

## Build policy

- plain `npm run build` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=0` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=1` → explicit requalification only.

## Active full E2E phase

Target:

`Codex Unified → OmniRoute → Auth Keeper/provider eligibility → orchestration/fallback → response → Operations Floor evidence`

Next deliverable: one consolidated, non-destructive, prevalidated harness with read-only preflight, fail-closed guards, mocks/fixtures/deterministic failure injection where possible, evidence packaging and final non-drift.

Cover canonical lineage, host sentinels, Codex Unified contracts, Auth Keeper eligibility, routing/fallback, quota/cooldown, provider outage, auth-expiry/re-auth semantics, personal/MTA isolation, protected-native preservation, Operations Floor evidence, restart/recovery, rollback readiness, Webpack production identity and evidence continuity.

Safety boundary: no uncontrolled live provider/model calls, credential/secret value reads, live Auth Keeper mutation, production routing/provider mutation, D18/preference activation, live image/container/database mutation, remote push/deploy/cutover unless later explicitly authorized.

## Later phases

Model/preference intelligence remains planned and subordinate to hard gates. Product acceptance/live promotion remains not authorized until full E2E, canary/shadow evidence, rollback readiness and explicit cutover authorization exist.

## Documentation rule

When accepted authority or phase changes, update Current Status, Engineering Tracker, Roadmap, Engineering Source of Truth, failure records and the new-chat handoff in the same engineering cycle. Chat history is not a substitute.
