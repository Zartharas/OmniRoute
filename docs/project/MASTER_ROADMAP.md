# Master Roadmap — Fork Product Goal

Last reviewed: 2026-09-13
Status: Canonical status/roadmap for the `Zartharas/OmniRoute` fork

This roadmap tracks the fork's five-pillar product goal. It is intentionally separate from the upstream OmniRoute `ROADMAP.md`.

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

Status: Mature implementation foundation / still expanding toward full multi-provider session plane

Completed or proven:

- standalone local service and dashboard;
- account/browser-profile isolation;
- exact provider/account/connection binding;
- safe sync/recovery contracts;
- macOS persistent service/install/rollback mechanics;
- bounded automatic recovery watcher;
- provider auth probes and secret-handling boundaries;
- private implementation repository with release/validation discipline;
- later work on request-local transport/admission integration with OmniRoute.

Remaining:

- finish all provider modes needed by the unified workforce;
- keep free/keyless providers independent from managed-auth paths;
- complete browser/session lifecycle support where policy allows;
- preserve interactive-human-verification as a distinct lane where no reusable credential should be owned;
- complete end-to-end qualification against the final Codex Unified control plane.

### Pillar 4 — Intelligent Multi-Model Orchestration

Status: Active major workstream

Completed or accepted in the R16.32 lineage:

- normalized candidate facts;
- deterministic candidate disposition;
- computational shadow with no additional real traffic;
- explainability/evidence taxonomy;
- bounded observability accumulator;
- contained observational wiring;
- source-backed blocker capture;
- source-backed positive hard-fact capture;
- request/context compatibility discovery;
- executionKey-keyed request-local provenance design;
- corrected context composition with three components:
  - `generic_request_context`
  - `configured_context`
  - `auto_estimated_input_context`

Current checkpoint:

- D14 request/context compatibility provenance implementation is the active implementation line; D14 R1 failed safely on a declaration-scoped harness ambiguity before mutation and the corrected R2 path is the next execution step.

Remaining after D14/D15:

- canonical compatibility-provenance qualification;
- safe aggregate evidence/readout;
- empirical shadow evidence collection;
- activation-readiness reassessment;
- provider-neutral preference signal inventory;
- pure preference evaluator;
- preference computational shadow;
- evidence qualification;
- restricted activation design;
- canary and production promotion only after explicit authorization.

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

### Phase C — Complete orchestration evidence foundation

- finish D14/D15;
- complete shadow evidence readout;
- collect empirical agreement/mismatch/not-ready/error evidence;
- establish activation thresholds from evidence rather than inventing them.

### Phase D — Preference intelligence

- identify source-backed preference signals;
- score only candidates that survived hard gates;
- keep core evaluator provider-neutral;
- shadow preference ordering before activation;
- protect explicit pins, workload isolation, Auth Keeper denial, capability/context checks, cooldowns and quota cutoffs.

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
- add operator actions only where they cannot bypass routing/auth authority.

### Phase G — Product acceptance and promotion

- full end-to-end acceptance across Codex Unified → OmniRoute → Auth Keeper/provider → response;
- failure tests for quota, cooldown, provider outage, auth expiry, re-auth, fallback, restart and rollback;
- canonical build provenance;
- canary/shadow review;
- explicit live-cutover authorization;
- post-cutover observation and rollback validation.

## 4. Explicitly stale/incomplete framings

The following must not be used as the master roadmap:

- upstream `ROADMAP.md` by itself;
- R16.32 by itself;
- Auth Keeper's local provider/recovery roadmap by itself;
- the Operations Floor branch roadmap by itself;
- OpenCode integration by itself;
- a single provider catalog by itself.

Each is a component of the five-pillar plan.

## 5. Status update rule

When a phase is accepted:

1. update the current checkpoint here if the milestone changes the master status;
2. update the Architecture Source of Truth if an authority boundary or product goal changes;
3. update the Engineering Source of Truth if the engineering method/invariants change;
4. record exact Git/evidence authority in the relevant implementation repository;
5. do not treat chat history as a substitute for these updates.
