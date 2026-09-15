# Master Roadmap — Fork Product Goal

Last reviewed: 2026-09-15
Status: Canonical roadmap for the `Zartharas/OmniRoute` fork

For full continuation context, read [CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md).

## Goal

Deliver one Codex-centered AI engineering agent backed by a heterogeneous AI workforce, with OmniRoute as routing/orchestration authority, Auth Keeper as credential/session authority, evidence-driven multi-model orchestration, protected OpenAI/Codex capacity and an Operations Floor that makes the organization understandable in real time.

## Pillar status

1. Codex Unified Agent — repository reintegration complete; full integrated E2E qualification active.
2. Unified OmniRoute AI Workforce — current 10-routed + 3-protected-native foundation preserved; full integrated qualification active.
3. Auth Keeper — final contract reconciliation complete at R11; full integrated qualification active.
4. Intelligent Multi-Model Orchestration — D18 bounded foundation transplant complete and accepted at R8; full E2E qualification active.
5. Operations Floor — selective reintegration complete and qualified; full integrated qualification active.

OpenCode and TheOldLLM are retired from active product scope.

## Current accepted D18 authority

- branch `feat/d18-orchestration-foundation-transplant-r8`
- commit `58452140ffc8122a26a387638f8a38d7d80f5024`
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`
- parent `1c4da240883e729d38a356ec83919ad7f6637623`
- evidence SHA-256 `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`

Accepted R8 outcomes:

- 16-file bounded transplant (7 contract + 9 support);
- no overwrite of current-owned implementations;
- zero unresolved project-local imports;
- zero external runtime consumer for bounded readout;
- zero retired-provider/protected-routeability/DB-write/network/process/server/historical-path risk hits;
- 35/35 focused regressions pass;
- changed-file lint/type pass;
- one test-only runtime-erased compatibility adaptation with emitted-JavaScript parity;
- production-source adaptation count zero;
- current 10+3 workload contract preserved;
- default Webpack production build/standalone qualification pass.

D18 remains passive/unwired. Do not resume D19 automatically.

## Build policy

- plain `npm run build` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=0` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=1` → explicit Turbopack requalification only.

Do not repeatedly rediscover the known Turbopack invariant panic during ordinary acceptance work.

## Cross-cutting sequence

### Phase A — Upstream compatibility
Ongoing.

### Phase B — Codex Unified reintegration
Complete.

### Phase C — Auth Keeper final reconciliation
Complete at R11.

### Phase D — Operations Floor selective reintegration
Complete.

### Phase E — Production build-policy hardening
Complete.

### Phase F — D18 bounded orchestration/evidence foundation
Complete and accepted at R8.

### Phase G — Full end-to-end qualification
**Active and explicitly authorized for non-destructive engineering qualification.**

Accepted baseline: R8.

Target path:

`Codex Unified → OmniRoute → Auth Keeper/provider eligibility → orchestration/fallback → response → Operations Floor evidence`

Preferred execution model: one consolidated harness with read-only preflight, fail-closed guards, mocks/fixtures/deterministic failure injection where possible, evidence packaging and final non-drift.

Qualification scope:

- canonical source/tree authority and host-sentinel non-drift;
- Codex Unified ingress/config/catalog/workload contracts;
- Auth Keeper eligibility boundary without credential-value reads;
- routing/fallback semantics;
- quota/cooldown behavior;
- provider outage behavior without uncontrolled external traffic;
- auth-expiry/re-auth semantics without live session mutation;
- personal versus MTA/enterprise isolation;
- protected-native preservation/non-routeability;
- Operations Floor evidence/observer-plane contracts;
- restart/recovery and rollback readiness;
- Webpack production build identity/standalone output;
- evidence continuity.

Safety boundary: no uncontrolled live provider/model calls, secret/token/credential-value reads, live Auth Keeper account/session mutation, production routing/provider mutation, D18/preference activation, live image/container/database mutation, remote push/deploy/cutover unless later explicitly authorized.

### Phase H — Model intelligence / preference intelligence
Planned, not activation authority.

### Phase I — Product acceptance and live promotion
Not authorized.

Requires accepted integrated authority, full E2E qualification, canary/shadow evidence, rollback readiness, explicit live-cutover authorization and post-cutover observation.

## Explicitly stale framings

Do not use these as current:

- D16 is next;
- D18 transplant is active;
- R4/R5/R6/R7 is the current D18 candidate;
- Operations Floor reintegration is pending;
- Codex Unified still needs initial reintegration;
- OpenCode/TheOldLLM are active planned lanes.

## Documentation rule

When accepted authority or phase changes, update Current Status, Engineering Tracker, Roadmap, Engineering Source of Truth, failure records and the new-chat handoff in the same engineering cycle. Chat history is not a substitute.
