# Master Roadmap — Fork Product Goal

Last reviewed: 2026-09-14
Status: Canonical status/roadmap for the `Zartharas/OmniRoute` fork

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

Status: Active major workstream; compatibility-provenance foundation canonically qualified

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
  - `auto_estimated_input_context`;
- D14 R6 isolated request/context compatibility-provenance implementation accepted at local commit `0b42d800a4f6bb1f000a51cb5e93a2be18ea623b` / tree `3d8e1f26d2c32cccf48b45f31ab13e5e42d7b2aa`;
- D15 R2 canonical qualification accepted for that exact candidate;
- baseline and candidate production builder builds passed;
- typecheck/full-lint/changed-file lint differentials passed with no candidate-only diagnostics;
- focused regression moved from baseline 141/141 to candidate 155/155;
- routing compatibility parity passed 34/34 on both baseline and candidate;
- protected acquisition/dispatch topology remained unchanged;
- no additional Auth Keeper fetches or provider/model probes were introduced;
- no routing readback from compatibility provenance was introduced;
- pure qualification reached structural 14/14 known hard facts and a synthetic eligible/match comparable-proceed case.

Current checkpoint:

- `R16_32_D16_POST_COMPLETENESS_ACTIVATION_READINESS_REAUDIT` is next.
- D16 must re-audit the original D7 blocker set after structural hard-fact completeness was achieved.
- production activation remains blocked; D15 synthetic evidence is not production activation authority.

Remaining R16.32 evidence/activation work:

- qualify a safe production evidence readout;
- collect live candidate evidence without changing routing authority;
- measure empirical comparable-proceed coverage;
- measure empirical eligible coverage;
- measure mismatch, contained-error and not-ready rates;
- derive any future activation criteria from observed evidence instead of arbitrary thresholds;
- only after those gates, proceed to conservative provider-neutral preference intelligence.

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

### Phase C — Complete orchestration evidence foundation

Completed:

- D14 request/context compatibility-provenance implementation;
- D15 canonical compatibility-provenance qualification;
- structural 14/14 hard-fact coverage in pure qualification.

Current/remaining:

- D16 post-completeness activation-readiness re-audit;
- production-safe shadow evidence readout;
- live empirical agreement/mismatch/not-ready/error evidence;
- evidence-derived activation criteria.

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

## 4. Explicitly stale/incomplete framings

The following must not be used as the master roadmap:

- upstream `ROADMAP.md` by itself;
- R16.32 by itself;
- Auth Keeper's local provider/recovery roadmap by itself;
- the Operations Floor branch roadmap by itself;
- OpenCode integration by itself;
- a single provider catalog by itself;
- an external model-architecture gallery or benchmark by itself.

Each is a component, evidence source or subproject of the five-pillar plan.

The statement "D14 is the current implementation step" is stale. D14 R6 and D15 R2 are accepted; D16 is the next R16.32 phase.

## 5. Status update rule

When a phase is accepted:

1. update [Current Project Status](CURRENT_STATUS.md) with the exact checkpoint if it changes;
2. update the current checkpoint here if the milestone changes the master status;
3. update the Architecture Source of Truth if an authority boundary, evidence precedence or product goal changes;
4. update the Engineering Source of Truth if the engineering method/invariants change;
5. record exact Git/evidence authority in the relevant implementation repository;
6. do not treat chat history as a substitute for these updates.
