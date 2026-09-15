# Master Roadmap — Fork Product Goal

Last reviewed: 2026-09-15
Status: Canonical roadmap for the `Zartharas/OmniRoute` fork

This roadmap tracks the fork's five-pillar goal and current sequencing. Upstream OmniRoute `ROADMAP.md` remains upstream-only context.

## 1. Goal

Deliver one Codex-centered AI engineering agent backed by a heterogeneous AI workforce, with OmniRoute as routing/orchestration authority, Auth Keeper as credential/session authority, evidence-driven multi-model orchestration, protected OpenAI/Codex capacity and an Operations Floor that makes the organization understandable in real time.

## 2. Pillar status

### Pillar 1 — Codex Unified Agent

Status: **Repository reintegration complete; full integrated E2E qualification active.**

Completed/proven:

- unified Codex configuration/catalog/workload-policy authority;
- codex-unified-router lineage;
- personal versus isolated MTA/enterprise lanes;
- protected-native preservation model;
- repository reintegration and current host-sentinel qualification.

Remaining:

- full integrated qualification against accepted OmniRoute R8 + Auth Keeper R11 + Operations Floor lineage;
- final release/promotion authority;
- live operational validation after explicit cutover authorization.

### Pillar 2 — Unified OmniRoute AI Workforce

Status: **Strong current foundation; full integrated qualification active.**

Current active fleet authority:

- 10 routed models: 6 personal + 4 MTA/enterprise;
- 3 protected-native ChatGPT models: GPT-5.6 Sol, Terra, Luna;
- protected-native models remain non-routeable in the normal fleet.

OpenCode and TheOldLLM are retired from active product scope. Historical references/tombstones may remain but must not become active routing/bootstrap/workload/Operations Floor/Auth Keeper authority.

### Pillar 3 — Auth Keeper

Status: **Final contract reconciliation complete at R11; full integrated qualification active.**

Accepted authority:

- commit `b3b0d137369038d22820947729233deaec19e166`;
- tree `9377fe6afe21f098861f32c751f05c8a72882211`;
- 457/457 tests pass.

### Pillar 4 — Intelligent Multi-Model Orchestration

Status: **D18 bounded foundation transplant complete at R8; full E2E qualification active.**

Accepted R8 authority:

- branch `feat/d18-orchestration-foundation-transplant-r8`;
- commit `58452140ffc8122a26a387638f8a38d7d80f5024`;
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`;
- parent `1c4da240883e729d38a356ec83919ad7f6637623`;
- evidence SHA-256 `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`.

Accepted R8 outcomes:

- 7 feature-contract + 9 missing-support files = 16-file bounded transplant;
- no overwrite of current-owned implementations;
- zero unresolved project-local imports;
- zero external runtime consumer for bounded readout;
- zero retired-provider/protected-routeability/DB-write/network/process/server/historical-path risk hits;
- 35/35 focused regressions pass;
- changed-file lint pass;
- changed-file TypeScript diagnostics zero after one test-only runtime-erased compatibility adaptation;
- production-source adaptation count zero;
- current 10+3 workload contract preserved;
- default Webpack production build/standalone qualification pass.

Important sequencing rule:

- **do not resume D19 automatically**;
- D18 remains passive/unwired;
- next step is full end-to-end qualification;
- later activation/preference phases require separate evidence and authorization.

### Pillar 5 — Operations Floor

Status: **Selective reintegration complete and qualified; full integrated qualification active.**

Accepted local authority:

- commit `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c`;
- tree `2dbd97c1a0bfd1d3e1b9ffb1ce02fdc76848fddb`.

Operations Floor remains an observability/operator plane, not routing authority.

## 3. Build qualification workstream

Status: **Complete for current lineage.**

Accepted current production build policy:

- `npm run build` defaults to Webpack;
- `OMNIROUTE_USE_TURBOPACK=0` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=1` → explicit Turbopack opt-in.

Reason: repeated Turbopack production builds hit a deterministic invariant panic while the same accepted source built successfully with Webpack.

Do not spend future ordinary qualification cycles rediscovering the same known Turbopack failure unless the purpose is specifically to re-evaluate Turbopack.

## 4. Current cross-cutting sequence

### Phase A — Upstream compatibility

Status: **Ongoing continuously.**

### Phase B — Codex Unified reintegration

Status: **Complete for current integration lineage.**

### Phase C — Auth Keeper final reconciliation

Status: **Complete at R11.**

### Phase D — Operations Floor selective reintegration

Status: **Complete.**

### Phase E — Production build-policy hardening

Status: **Complete: Webpack default / Turbopack explicit opt-in.**

### Phase F — D18 bounded orchestration/evidence foundation

Status: **Complete and accepted at R8.**

Accepted authority: `58452140ffc8122a26a387638f8a38d7d80f5024` / tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`.

### Phase G — Full end-to-end qualification

Status: **Active.**

Accepted baseline: D18 R8.

Qualify the integrated product path:

`Codex Unified → OmniRoute → Auth Keeper/provider eligibility → orchestration/fallback → response → Operations Floor evidence`

Current authorization is for a **non-destructive engineering qualification harness**, not live cutover.

The preferred execution model is one consolidated harness with read-only preflight, fail-closed guards, deterministic/mocked failure injection where possible, evidence packaging and final non-drift.

Qualification should cover:

- canonical source/tree authority and host-sentinel non-drift;
- Codex Unified ingress/config/catalog/workload contracts;
- Auth Keeper eligibility boundary without credential-value reads;
- routing/fallback decision semantics;
- quota/cooldown behavior;
- provider outage behavior without uncontrolled external traffic;
- auth-expiry/re-auth semantics without mutating live sessions;
- personal versus MTA/enterprise isolation;
- protected-native preservation/non-routeability;
- Operations Floor evidence/observer-plane contracts;
- restart/recovery and rollback readiness;
- Webpack production build identity/standalone output;
- evidence continuity.

Safety boundary unless explicitly expanded later:

- no uncontrolled live provider/model calls;
- no secret/token/credential-value reads or printing;
- no live Auth Keeper account/session mutation;
- no production routing/provider mutation;
- no D18/preference activation;
- no live image/container/database mutation;
- no remote push/deploy/cutover.

### Phase H — Model intelligence / preference intelligence

Status: **Planned, not activation authority.**

Preference intelligence may rank only candidates that already survived hard gates.

### Phase I — Product acceptance and live promotion

Status: **Not authorized.**

Requires:

- accepted integrated source/tree authority;
- full-E2E qualification;
- canary/shadow evidence;
- evidence-derived activation criteria;
- rollback state and health checks;
- explicit live-cutover authorization;
- post-cutover observation.

## 5. Explicitly stale/incomplete framings

Do not use any of these as the master roadmap:

- upstream `ROADMAP.md` alone;
- R16.32 alone;
- Auth Keeper alone;
- Operations Floor alone;
- OpenCode integration;
- TheOldLLM integration;
- a single provider catalog;
- an external model gallery/benchmark.

Also stale:

- “D16 is the next phase”;
- “D18 transplant is still active”;
- “R4 is the current D18 candidate”;
- “Operations Floor reintegration is still pending”;
- “Codex Unified still needs initial reintegration”;
- “OpenCode/TheOldLLM remain active planned lanes.”

## 6. Continuation / handoff

For a new engineering chat, use:

[CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md)

It records exact accepted Git/evidence authority, D18 R1-R8 failure history, anti-repeat rules, current authorization and E2E safety boundaries.

## 7. Status-update rule

When a phase is accepted:

1. update [Current Project Status](CURRENT_STATUS.md);
2. update [Engineering Tracker](ENGINEERING_TRACKER.md);
3. update this roadmap if sequencing/status changed;
4. update [Architecture Source of Truth](ARCHITECTURE_SOURCE_OF_TRUTH.md) if product/authority/provider scope changed;
5. update [Engineering Source of Truth](ENGINEERING_SOURCE_OF_TRUTH.md) and [Failure-Mode Register](FAILURE_MODE_REGISTER.md) for permanent engineering lessons;
6. update the new-chat handoff when current authority/phase changes materially;
7. record exact Git/evidence authority;
8. never use chat history as a substitute for these updates.
