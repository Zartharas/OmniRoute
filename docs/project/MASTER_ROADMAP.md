# Master Roadmap — Fork Product Goal

Last reviewed: 2026-09-17
Status: Canonical long-range roadmap for the `Zartharas/OmniRoute` fork; D18 is now frozen live baseline

This roadmap tracks the fork's five-pillar product goal. It is intentionally separate from the upstream OmniRoute `ROADMAP.md`.

For the latest accepted engineering checkpoint and exact current phase, also read [Current Project Status](CURRENT_STATUS.md).

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

Status: Active major workstream; D18 activation and post-activation freeze accepted

Accepted R16.32 lineage now includes:

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

Current checkpoint:

- D18 is the accepted frozen live OmniRoute baseline.
- live source commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`;
- live tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`;
- live image: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`;
- R16.31 rollback holder and original rollback volume remain retained intact.

The next R16.32 phase beyond the accepted D18 freeze is **not canonically defined in this roadmap yet**. Do not infer or invent D19 scope from chat history. D19 remains unauthorized until its objective, invariants, evidence gates and mutation boundaries are explicitly defined and approved.

Remaining Pillar 4 product work includes:

- continue evidence-driven provider-neutral orchestration improvements from the D18 live baseline;
- define any next activation/intelligence phase in canonical docs before implementation;
- preserve hard-gate precedence and protected OpenAI/Codex capacity;
- continue model-intelligence enrichment and preference work only as soft-evidence layers after hard gates;
- connect the accepted live orchestration evidence model into Codex Unified and Operations Floor.

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

Accepted:

- D14 request/context compatibility-provenance implementation;
- D15 canonical qualification;
- later completeness/readiness lineage;
- D18 Auth Keeper-aware admission qualification;
- D18 authorized production activation;
- composite D18 post-activation freeze.

Current rule:

- treat D18 as frozen live baseline;
- retain R16.31 rollback authority;
- do not reopen completed pre-activation evidence phases without contradictory evidence;
- define the next R16.32 phase canonically before implementation.

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
- qualify preference evidence before restricted activation.

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

D18 now provides a proven live-promotion and post-cutover-freeze reference pattern for later production changes.

## 4. Explicitly stale/incomplete framings

The following must not be used as the master roadmap:

- upstream `ROADMAP.md` by itself;
- R16.32 by itself;
- Auth Keeper's local provider/recovery roadmap by itself;
- the Operations Floor branch roadmap by itself;
- OpenCode integration by itself;
- a single provider catalog by itself;
- an external model-architecture gallery or benchmark by itself.

The statements "D14 is the current implementation step", "D16 is next", and "D18 is not live" are stale. D18 is now the accepted frozen live baseline.

No canonical D19 scope is currently defined here. D19 must not be started merely because D18 is complete.

## 5. Status update rule

When a phase is accepted:

1. update [Current Project Status](CURRENT_STATUS.md) with the exact checkpoint if it changes;
2. update the current checkpoint here if the milestone changes the master status;
3. update the Architecture Source of Truth if an authority boundary, evidence precedence or product goal changes;
4. update the Engineering Source of Truth if the engineering method/invariants change;
5. record exact Git/evidence authority in the relevant implementation repository;
6. do not treat chat history as a substitute for these updates.
