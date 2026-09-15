# Master Roadmap — Fork Product Goal

Last reviewed: 2026-09-15
Status: Canonical roadmap for the `Zartharas/OmniRoute` fork

This roadmap tracks the fork's five-pillar goal and current sequencing. Upstream OmniRoute `ROADMAP.md` remains upstream-only context.

## 1. Goal

Deliver one Codex-centered AI engineering agent backed by a heterogeneous AI workforce, with OmniRoute as routing/orchestration authority, Auth Keeper as credential/session authority, evidence-driven multi-model orchestration, protected OpenAI/Codex capacity and an Operations Floor that makes the organization understandable in real time.

## 2. Pillar status

### Pillar 1 — Codex Unified Agent

Status: **Current repository reintegration complete; final end-to-end product acceptance still pending.**

Completed/proven:

- unified Codex configuration/catalog/workload-policy authority;
- codex-unified-router lineage;
- personal versus isolated MTA/enterprise lanes;
- protected-native preservation model;
- repository reintegration and current host-sentinel qualification.

Remaining:

- full end-to-end qualification against the accepted OmniRoute + Auth Keeper + Operations Floor + D18 lineage;
- final release/promotion authority;
- live operational validation after explicit cutover authorization.

### Pillar 2 — Unified OmniRoute AI Workforce

Status: **Strong current foundation; continuing upstream/provider maintenance.**

Current active fleet authority:

- 10 routed models: 6 personal + 4 MTA/enterprise;
- 3 protected-native ChatGPT models: GPT-5.6 Sol, Terra, Luna;
- protected-native models remain non-routeable in the normal fleet.

OpenCode and TheOldLLM are retired from active product scope. Historical references/tombstones may remain but must not become active routing/bootstrap/workload/Operations Floor/Auth Keeper authority.

Remaining:

- continue compatible upstream provider/catalog ingestion;
- maintain access-mode normalization without reactivating retired lanes;
- preserve free/keyless behavior where applicable;
- requalify provider/account eligibility after major upstream changes.

### Pillar 3 — Auth Keeper

Status: **Final contract reconciliation complete at R11.**

Accepted authority:

- commit `b3b0d137369038d22820947729233deaec19e166`;
- tree `9377fe6afe21f098861f32c751f05c8a72882211`;
- 457/457 tests pass.

Remaining:

- participate in full end-to-end acceptance;
- preserve current provider/account/session boundaries during future upstream changes;
- live-cutover/recovery validation only after explicit authorization.

### Pillar 4 — Intelligent Multi-Model Orchestration

Status: **Active current major workstream; D18 bounded foundation transplant in progress.**

Completed/proven across the R16.32 lineage:

- normalized candidate facts;
- deterministic disposition;
- computational shadow without extra real traffic;
- explainability taxonomy;
- bounded observability;
- request-local blocker/positive-fact capture;
- request/context compatibility provenance;
- executionKey-keyed sidecar design;
- D14/D15 compatibility-provenance qualification;
- post-D15 activation-readiness work through D18 source freeze;
- D18 passive/unwired bounded production-evidence readout authority frozen locally.

Current D18 source authority:

- commit `0f13a6d6df0251d9fa39e70aff78c0b58766845d`;
- tree `71e1f60cd349599df0e9c4f800af6e6a3f719fd4`.

Current engineering step:

- exact seven-file frozen D18 contract classification/transplant;
- missing-only byte-exact materialization;
- preserve newer divergent current implementations;
- zero external production consumers of the bounded readout;
- three bounded D18 tests;
- changed-file lint/type gates;
- current 10+3 contract preservation;
- default Webpack production build qualification.

Important sequencing rule:

- **do not resume D19 automatically**;
- D18 acceptance is followed by **full end-to-end qualification**;
- any later activation/preference phase requires separate evidence and authorization.

### Pillar 5 — Operations Floor

Status: **Selective reintegration complete and qualified in the current local integration lineage.**

Accepted local authority:

- commit `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c`;
- tree `2dbd97c1a0bfd1d3e1b9ffb1ce02fdc76848fddb`.

Completed:

- selective historical reintegration from pinned Operations Floor branches;
- 27-file source authority classified and reconciled;
- bounded compatibility adaptations for current component contracts;
- 10-routed + 3-protected-native workload model preserved;
- protected-native routeability remained zero;
- retired OpenCode/TheOldLLM remained inactive;
- Operations Floor remained observability/operator plane, not router;
- production build qualified successfully with Webpack.

Remaining:

- consume/visualize later accepted orchestration evidence only after D18/full-E2E contracts are proven;
- continue preserving secret isolation and routing authority boundaries;
- live operational validation after explicit promotion.

## 3. Build qualification workstream

Status: **Complete for current lineage.**

Accepted current production build policy:

- `npm run build` defaults to Webpack;
- `OMNIROUTE_USE_TURBOPACK=0` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=1` → explicit Turbopack opt-in.

Reason: repeated Turbopack production builds hit a deterministic invariant panic while the same accepted source built successfully with Webpack.

Do not spend future narrow qualification cycles rediscovering the same known Turbopack failure unless the purpose of the phase is specifically to re-evaluate Turbopack.

## 4. Current cross-cutting sequence

### Phase A — Upstream compatibility

Ongoing continuously:

- absorb compatible upstream OmniRoute releases;
- preserve fork invariants;
- keep deliberate divergence explicit.

### Phase B — Codex Unified reintegration

Status: **Complete for current integration lineage.**

### Phase C — Auth Keeper final reconciliation

Status: **Complete at R11.**

### Phase D — Operations Floor selective reintegration

Status: **Complete.**

### Phase E — Production build-policy hardening

Status: **Complete: Webpack default / Turbopack explicit opt-in.**

### Phase F — D18 bounded orchestration/evidence foundation

Status: **Active.**

Current candidate direction: R4 exact frozen seven-file contract boundary.

Acceptance must prove:

- no retired-provider resurrection;
- no provider/network side effects in transplanted missing contract files;
- no routing activation;
- no external production consumer of the bounded readout;
- no overwrite of newer current implementations;
- bounded D18 tests pass;
- changed-file lint/type gate passes;
- 10+3 workload/protected-native authority preserved;
- default Webpack production build passes.

### Phase G — Full end-to-end qualification

Status: **Pending D18 acceptance.**

Qualify the integrated product path:

`Codex Unified → OmniRoute → Auth Keeper/provider → orchestration/fallback → response → Operations Floor evidence`

Include controlled failure cases for:

- quota/cooldown;
- provider outage;
- auth expiry/re-auth;
- fallback;
- workload isolation;
- protected-native preservation;
- restart/recovery;
- production build identity;
- rollback readiness.

### Phase H — Model intelligence / preference intelligence

Status: **Planned, not activation authority.**

A Unified Model Intelligence Registry may add provenance-labeled architecture metadata and later soft preference signals. External architecture/benchmark data remains subordinate to hard routing evidence.

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
- “Operations Floor reintegration is still pending”;
- “Codex Unified still needs initial reintegration”;
- “OpenCode/TheOldLLM remain active planned lanes.”

## 6. Status-update rule

When a phase is accepted:

1. update [Current Project Status](CURRENT_STATUS.md);
2. update [Engineering Tracker](ENGINEERING_TRACKER.md);
3. update this roadmap if sequencing/status changed;
4. update [Architecture Source of Truth](ARCHITECTURE_SOURCE_OF_TRUTH.md) if product/authority/provider scope changed;
5. update [Engineering Source of Truth](ENGINEERING_SOURCE_OF_TRUTH.md) and [Failure-Mode Register](FAILURE_MODE_REGISTER.md) for permanent engineering lessons;
6. record exact Git/evidence authority;
7. never use chat history as a substitute for these updates.
