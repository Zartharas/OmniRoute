# Master Roadmap — Fork Product Goal

Last reviewed: 2026-09-26
Status: Canonical long-range roadmap; D19/FreeLLM and R16.32 pre-tag boundary complete; five-pillar convergence is the active product-level continuation

This roadmap tracks the fork's five-pillar product goal. It is intentionally separate from the upstream OmniRoute `ROADMAP.md`.

For the latest accepted engineering checkpoint and exact current phase, also read [Current Project Status](CURRENT_STATUS.md). D19's exact phase contract is [R16.32 D19 — Production-Safe Empirical Orchestration Evidence Readout](R16_32_D19_EMPIRICAL_ORCHESTRATION_EVIDENCE_READOUT.md).

## 1. Goal

Deliver one Codex-centered AI engineering agent backed by a heterogeneous AI workforce, with OmniRoute as the routing/orchestration authority, Auth Keeper as the credential/session authority, workload-aware multi-model orchestration, protected OpenAI/Codex capacity, and a Dunder-Mifflin-inspired Operations Floor that makes the organization observable in real time.

## 2. Pillar status

### Pillar 1 — Codex Unified Agent

Status: Partially implemented / needs reintegration and final productization

Completed or proven historically:

- unified Codex configuration/catalog/workload-policy artifacts;
- host-side `codex-unified-router` lineage;
- multi-model catalog/workload curation;
- personal versus isolated MTA/enterprise lanes;
- protected OpenAI/Codex preservation concepts;
- model aliases and workload-policy driven routing concepts.

Remaining:

- make the unified Codex control plane a first-class maintained part of the repository/release story rather than primarily host-side state;
- reconcile it with the current OmniRoute/Auth Keeper lineage;
- define the final one-agent task-delegation contract;
- ensure model/provider switching does not require manual session restarts;
- add end-to-end tests from Codex request through OmniRoute/Auth Keeper/provider and back.

### Pillar 2 — Unified OmniRoute AI Workforce

Status: Strong foundation / ongoing expansion and upstream reconciliation

Completed or proven:

- large upstream provider/model catalog and multiple routing strategies;
- free/keyless routing foundations;
- API-provider routing;
- combos/fallback/resilience;
- provider/model capability work;
- custom provider/access integrations developed across fork branches;
- OpenCode free/keyless behavior preserved while managed access can be added separately.

Remaining:

- normalize provider access modes and adapters so free/API/subscription/web/human-verification lanes are represented consistently;
- complete final provider/account eligibility contract with Auth Keeper;
- make provider additions avoid unnecessary core coupling;
- keep absorbing compatible upstream provider/catalog improvements.

### Pillar 3 — Auth Keeper

Status: Mature implementation foundation / live D18 integration accepted

Completed or proven:

- standalone local service and dashboard;
- account/browser-profile isolation;
- exact provider/account/connection binding;
- safe sync/recovery contracts;
- macOS persistent service/install/rollback mechanics;
- bounded automatic recovery watcher;
- provider auth probes and secret-handling boundaries;
- private implementation repository with release/validation discipline;
- request-local transport/admission integration with OmniRoute;
- dedicated secretless connection-state contract qualified in isolation and from the live D18 runtime;
- LaunchAgent hardening accepted at mode `0600`;
- live D18 container-to-Auth-Keeper transport accepted without credential exposure.

Remaining:

- finish all provider modes needed by the unified workforce;
- keep free/keyless providers independent from managed-auth paths;
- complete browser/session lifecycle support where policy allows;
- preserve interactive-human-verification as a distinct lane where no reusable credential should be owned;
- complete end-to-end qualification against the final Codex Unified control plane.

### Pillar 4 — Intelligent Multi-Model Orchestration

Status: Advanced foundation; D18/D19/FreeLLM and the R16.32 pre-tag Auth Keeper boundary are accepted; preference/multi-model convergence remains

Accepted R16.32 lineage includes:

- normalized candidate facts and deterministic disposition;
- computational shadow without additional real traffic;
- explainability/evidence taxonomy and bounded observability;
- source-backed blocker and positive hard-fact capture;
- request/context compatibility discovery;
- executionKey-keyed request-local provenance;
- corrected three-component context composition;
- D14 R6 isolated compatibility-provenance implementation;
- D15 R2 canonical qualification;
- later D16/D17/D18 lineage advancing from completeness/reconciliation into Auth Keeper-aware admission;
- R12-R6 isolated D18 flag-ON runtime authority;
- R7 exact-object/AST reconciliation of the two connection-state paths;
- R3 production-path transport/topology readiness;
- R4 fail-closed direct-Docker activation/rollback design;
- H1 Auth Keeper plist hardening;
- A1 authorized D18 production activation;
- composite O1+O2 accepted post-activation freeze with R16.31 rollback integrity proven.

Current live checkpoint:

- D18 is the accepted frozen live OmniRoute baseline;
- live source commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`;
- live tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`;
- live image: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`;
- R16.31 rollback holder and original rollback volume remain retained intact.

Current accepted continuation:

- D19 hard-gate/observation work is no longer the active development phase;
- FreeLLMAPI signed advisory metadata integration is qualified and live under the later accepted handoff;
- the private R16.32/Auth Keeper pre-tag reconciliation is promoted at `470a9eb5d5014c0df116c9e3c5b6ae3853bda021`;
- upstream release reconciliation is optional compatibility work; fork-owned release qualification does not wait for an upstream tag;
- the active product-level next phase is the Five-Pillar Architecture Convergence Audit.

D19 must prove:

- exact source-backed semantics for every counted category;
- routing/target-order/filter/selection/fallback behavior unchanged;
- provider/model-call delta = 0;
- Auth Keeper-fetch delta = 0;
- credential-acquisition delta = 0;
- no D19 evidence readback into routing;
- bounded, secretless, low-cardinality in-memory aggregate evidence;
- no persistence migration;
- observation/readout failure contained and unable to fail routing.

D19 first gate is S1: exact local accepted-object source census against the D18 Git object. No D19 source mutation begins until S1 identifies the actual evidence owners, source predicates/types, safe insertion/readout points, protected call counts and candidate file allowlist.

Remaining Pillar 4 work after D19 includes:

- freeze production empirical evidence only if separately authorized;
- derive later activation/preference criteria from observed evidence rather than arbitrary thresholds;
- build provider-neutral preference intelligence only among candidates that survived hard gates;
- continue model-intelligence enrichment only as a provenance-labeled soft evidence layer;
- connect accepted orchestration evidence into Codex Unified and Operations Floor.

Planned Model Intelligence Enrichment subproject:

- define a Unified Model Intelligence Registry;
- enrich the verified model catalog with provenance-labeled architecture metadata;
- support fields such as dense/MoE structure, active/total scale, context, attention/layer mix and KV-cache estimates where source-backed;
- evaluate Sebastian Raschka's LLM Architecture Gallery as an external enrichment input: <https://sebastianraschka.com/llm-architecture-gallery/>;
- ingest external metadata offline/pinned rather than through request-time network calls;
- reconcile provider/model aliases explicitly;
- keep external benchmark scores in a separately labeled evidence class;
- never let external metadata override official provider/API capability, request-local runtime evidence, Auth Keeper admission, workload policy, explicit pins, context compatibility, quota cutoffs or cooldown/breaker state;
- make the enrichment useful to both future soft preference intelligence and Operations Floor worker cards.

### Pillar 5 — Operations Floor

Status: Significant historical implementation exists / reintegration required

Historical implementation branches:

- `feat/operations-floor-openai-preservation`
- `feat/operations-floor-protected-native`

Implemented concepts include:

- provider/workload floor visualization;
- routing/fallback lanes and animation;
- inspectable provider/request state;
- operator attention items;
- evidence inspector;
- pixel-office representation;
- local pixel agents;
- provider test action;
- auth/compression/system telemetry;
- zero-call routing simulation;
- unified routed workload fleet;
- personal versus isolated MTA visibility;
- separate Protected Native ChatGPT presentation.

Remaining:

- reconcile Operations Floor branches with the current upstream and R16.x lineage;
- reconnect the floor to the final request-local routing/evidence model;
- surface Auth Keeper state without leaking secrets;
- surface Codex Unified task/worker assignment;
- show multi-model reasoning/judging versus the designated acting model;
- optionally surface provenance-labeled model-intelligence metadata for worker understanding/capacity planning;
- preserve protected-native and workload-isolation semantics;
- make the floor an operational control/inspection surface without becoming a router.

## 3. Cross-cutting phases

### Phase A — Preserve upstream compatibility

- continuously track compatible upstream OmniRoute releases;
- reconcile rather than overwrite fork-specific architecture;
- keep fork divergence explicit and small where practical.

### Phase B — Normalize access modes

- free/keyless;
- API credential;
- managed external credential/session;
- subscription/coding-plan;
- interactive human verification;
- protected native.

Each access mode must define ownership, eligibility, recovery and routing semantics.

### Phase C — Complete orchestration evidence and live-admission foundation

Accepted foundation:

- D14 request/context compatibility-provenance implementation;
- D15 canonical qualification;
- later completeness/readiness lineage;
- D18 Auth Keeper-aware admission qualification;
- D18 authorized production activation;
- composite D18 post-activation freeze.

Accepted bridge:

- D19 production-safe empirical orchestration evidence readout and hard-gate authority are accepted historical foundation;
- FreeLLMAPI signed advisory metadata integration was later qualified and activated without acquiring routing authority;
- empirical rates remain evidence, not automatic pass/fail thresholds;
- future preference intelligence must consume only accepted evidence and may not bypass harder gates.

### Phase D — Model intelligence and preference intelligence

#### D0 — Model intelligence enrichment

- define the Unified Model Intelligence Registry contract;
- identify official versus external evidence classes;
- support pinned/offline external architecture metadata ingestion;
- reconcile model aliases and immutable source provenance;
- keep architecture/benchmark enrichment non-authoritative for hard gates;
- expose safe metadata to Operations Floor.

#### D1 — Provider-neutral preference intelligence

- identify source-backed preference signals;
- score only candidates that survived hard gates;
- keep core evaluator provider-neutral;
- shadow preference ordering before activation;
- protect explicit pins, workload isolation, Auth Keeper denial, capability/context checks, cooldowns and quota cutoffs;
- qualify preference evidence before restricted activation;
- use the accepted D19 empirical baseline to inform later criteria rather than inventing arbitrary thresholds.

### Phase E — Codex Unified reintegration

- bring the unified model catalog/workload policy under maintained repository/release authority;
- define Codex as the user-facing agent and OmniRoute as the delegation brain;
- support multiple reasoning/review workers behind one controlled acting model;
- qualify tool ownership and mutation safety.

### Phase F — Operations Floor reintegration

- merge/reconcile historical floor work with current architecture;
- display live worker assignments, routing, fallback, auth, quota, health and evidence;
- display protected-native state separately;
- preserve personal/MTA isolation;
- add operator actions only where they cannot bypass routing/auth authority;
- integrate provenance-labeled model intelligence without turning visual metadata into routing authority.

### Phase G — Product acceptance and promotion

- full end-to-end acceptance across Codex Unified → OmniRoute → Auth Keeper/provider → response;
- failure tests for quota, cooldown, provider outage, auth expiry, re-auth, fallback, restart and rollback;
- canonical build provenance;
- canary/shadow review;
- explicit live-cutover authorization;
- post-cutover observation and rollback validation.

D18 provides a proven live-promotion and post-cutover-freeze reference pattern for later production changes.

## 4. Explicitly stale/incomplete framings

The following must not be used as the master roadmap:

- upstream `ROADMAP.md` by itself;
- R16.32 by itself;
- Auth Keeper's local provider/recovery roadmap by itself;
- the Operations Floor branch roadmap by itself;
- OpenCode integration by itself;
- a single provider catalog by itself;
- an external model-architecture gallery or benchmark by itself.

The statements "D14 is the current implementation step", "D16 is next", "D18 is not live", and "D19 has no canonical scope" are stale.

Current authority is: the five-pillar architecture remains canonical; D18/D19/FreeLLM foundations are accepted; provider-neutral convergence and canonical non-live integration are qualified; the fork owns its release authority and upstream releases are optional compatibility inputs.

## 5. Status update rule

When a phase is accepted:

1. update [Current Project Status](CURRENT_STATUS.md) with the exact checkpoint if it changes;
2. update the current checkpoint here if the milestone changes the master status;
3. update the Architecture Source of Truth if an authority boundary, evidence precedence or product goal changes;
4. update the Engineering Source of Truth if the engineering method/invariants change;
5. record exact Git/evidence authority in the relevant implementation repository;
6. do not treat chat history as a substitute for these updates.

## 6. 2026-09-26 continuation update

The master product goal remains unchanged. The program must not narrow itself into R16.32, Auth Keeper, OpenCode, Operations Floor, or any one provider/access lane.

### Completed/frozen foundations

- Codex Unified historical control-plane/catalog/workload-policy lineage exists and has undergone reintegration work.
- Unified OmniRoute provider/routing/fallback foundation is strong.
- Auth Keeper credential/session/admission boundary is mature and the latest two-file support repair is promoted.
- D18 live admission foundation is accepted.
- D19 hard-gate/evidence authority is accepted.
- FreeLLMAPI signed advisory metadata integration is qualified/live and remains non-authoritative for routing.
- rollback preservation and cleanup/recovery work are closed within their authorized scopes.
- R16.32 pre-tag upstream/Auth Keeper reconciliation is promoted at `470a9eb5d5014c0df116c9e3c5b6ae3853bda021`.

### Remaining product-level work

1. **Codex Unified convergence**
   - make the unified control plane a maintained release artifact;
   - finalize one-agent task delegation;
   - remove dependence on manual provider/model switching;
   - qualify the complete Codex ingress path.

2. **Unified workforce convergence**
   - normalize access-mode contracts across free/keyless, API, managed session, subscription/coding-plan, interactive-human-verification, and protected-native lanes;
   - keep provider additions modular and upstream-compatible.

3. **Intelligent orchestration convergence**
   - preserve hard-gate precedence;
   - develop provider-neutral preference only among surviving candidates;
   - qualify specialist/critique/judge/synthesis patterns with designated mutation ownership.

4. **Operations Floor convergence**
   - reconnect historical floor work to current request-local routing/evidence;
   - surface Auth Keeper, quota/cooldown, fallback, workload, protected-native and worker-assignment state without leaking secrets or becoming a router.

5. **Product acceptance**
   - perform full five-pillar end-to-end acceptance, including outage, quota, cooldown, auth expiry/re-auth, fallback, restart/recovery, rollback, protected-native preservation, workload isolation, evidence continuity, and final non-drift.

### Fork-owned release authority

- canonical release authority: `Zartharas/OmniRoute` + `Zartharas/omniroute-auth-keeper`;
- current release candidate: `release/five-pillar-qualified-20260930-rc1`;
- exact source: `654dc956ce09bcb7c57995c3c292f663352f2d22`;
- upstream tag/release publication is not a prerequisite;
- preserve upstream compatibility where practical, but do not make upstream owner timing a fork release gate;
- keep merge/publication/deployment/live activation separately authorized.

### Release lane

The R16r35 upstream-tag wait is historical compatibility evidence only. The fork-owned release lane proceeds from the exact qualified canonical integration head and does not require an upstream tag. Upstream releases may later be reconciled when useful.
