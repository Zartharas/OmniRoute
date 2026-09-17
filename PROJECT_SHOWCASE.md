# OmniRoute Fork — Project Showcase and Progress

Last reviewed: 2026-09-17
Status: D18 is the accepted frozen live baseline; R16.31 rollback authority is retained intact; the five-pillar product remains in progress

This document is the human-readable showcase for the `Zartharas/OmniRoute` fork. It summarizes what has been built and proven, what is live now, what is currently being worked on, and what remains to complete the original product goal.

It is a presentation summary, not a replacement for machine evidence or the canonical architecture/engineering/status documents. When details conflict, follow `SOURCE_OF_TRUTH.md` and the canonical documents under `docs/project/`.

## 1. Original product goal

The goal is not merely a multi-provider proxy, an Auth Keeper service, a routing experiment, or an Operations Floor dashboard.

The intended end state is one Codex-centered AI engineering system:

```text
User
  |
  v
Codex Unified Agent
  |
  v
OmniRoute routing/orchestration
  |------------------------------|
  v                              v
Auth Keeper                 AI workforce / protected capacity
sessions / auth             free / API / subscription / web /
eligibility / recovery      enterprise / human-verification
  |                              |
  |------------------------------|
                 |
                 v
        orchestration / fallback
                 |
                 v
              response
                 |
                 v
          Operations Floor
     evidence / health / routing /
       workers / operator attention
```

The five product pillars are:

1. **Codex Unified Agent** — one user-facing engineering agent/session.
2. **Unified OmniRoute AI Workforce** — a heterogeneous provider/model fleet behind one routing/orchestration authority.
3. **Auth Keeper** — credential, session, account, re-authentication, recovery, and routing-safe eligibility authority.
4. **Intelligent Multi-Model Orchestration** — conservative hard-gate evaluation followed by provider-neutral intelligence among survivors.
5. **Operations Floor** — a real-time observer/operator plane that explains the AI organization without becoming a competing router.

Core authority boundaries remain unchanged:

- OmniRoute owns routing, provider selection, orchestration, fallback, and model-workforce decisions.
- Auth Keeper owns credential/session/account lifecycle and routing-safe eligibility/admission facts.
- Operations Floor observes and operates the system; it does not own routing policy.
- Protected native/OpenAI/Codex capacity remains distinct where policy requires preservation.
- Free/keyless lanes must remain free/keyless when managed authentication is added elsewhere.
- Workload isolation is a hard routing boundary.

## 2. What is live now

### R16.32 D18 production baseline

D18 was authorized and activated on 2026-09-17 and then frozen through the accepted composite O1+O2 post-activation checkpoint.

Current live authority:

- container: `mer-omniroute`
- container ID: `5e5a904141fb8f17fd8e410f4f57284bc1a4cfbc7318dca46418925a51620efd`
- source commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`
- source tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`
- image tag: `omniroute:d18-r8-r9-candidate-linux-r10`
- image ID: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`
- milestone label: `R16.32-D18`
- data volume: `omniroute-d18-live-data-5ae6f97e7322`
- network: `mer-gateway_default`
- restart policy: `unless-stopped`
- runtime user: `node`
- published ports: 20128, 20129 and 20132 on `127.0.0.1` only
- D18 Auth Keeper combo-admission activation: enabled
- Auth Keeper token mount: read-only
- workload-policy mount: read-only

Accepted live evidence includes:

- Docker health `healthy`;
- restart count `0`;
- `OOMKilled=false`;
- `/healthz=200` and `/livez=200`;
- all three loopback ports reachable;
- router/config/catalog/policy host sentinels unchanged;
- 120-second activation stability gate passed;
- later O1 observation after 3,176 seconds of uptime passed;
- additional O1 60-second / 12-sample stability gate passed.

### Live Auth Keeper contract

The live D18 runtime has independently passed the production Auth Keeper connection-state contract:

- unauthenticated request = 401;
- authenticated request = 200;
- contract = `auth-keeper-connection-state/v1`;
- mode = `READ_ONLY`;
- `mutationPerformed=false`;
- `credentialsReturned=false`;
- `rawCredentialIncludedInOutput=false`;
- accounts array present;
- zero unexpected contract keys;
- zero forbidden secret-material keys.

The dedicated Auth Keeper service-token value was not printed or hashed by the qualification/activation/freeze procedures.

### Auth Keeper host hardening

The Auth Keeper LaunchAgent plist was hardened from `0644` to `0600` with a chmod-only change. Health remained HTTP 200 before and after, and no Auth Keeper service restart or runtime replacement was required.

## 3. Rollback safety retained

The previous R16.31 production runtime remains deliberately retained as rollback authority.

- rollback holder: `mer-omniroute-r16-31-rollback-d18-5ae6f97e7322`
- holder state: `exited`
- rollback image ID: `sha256:370d49896920568bc5adbfe71316879368ec93be0cd020cf1b546fa3ef2640aa`
- original R16.31 data volume: `omniroute-r16-31-live-data-34bd2fdbb8b0`

O2 proved the retained original R16.31 volume still exactly matches its A1 cutover-time authority:

- entries: `3045`
- files: `3010`
- symlinks: `0`
- file bytes: `503748301`
- content digest: `1ffd01aee9b89d9ef2d231a721790a87515163f6221b9e4d8413cd2a00975f70`
- link digest: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`

Rollback cleanup is not authorized. The retained R16.31 holder and original volume remain safety assets.

## 4. Major work completed so far

### Fork architecture and engineering governance

- Established explicit public architecture, engineering, roadmap, status, and handoff sources of truth.
- Separated product authority from upstream README/roadmap and from individual subprojects.
- Defined evidence precedence and fail-closed engineering rules.
- Established exact Git/source/image/runtime evidence as implementation authority.
- Added permanent regression lessons for Bash 3.2, TypeScript AST ownership, harness semantics, secret handling, clone helpers, and protected-volume read-only auditing.

### Upstream and production lineage reconciliation

- Reconciled the fork with newer upstream OmniRoute source while preserving fork-specific architecture.
- Forward-ported required upstream/root-layout behavior into the accepted D18 candidate lineage.
- Produced and retained a Linux/amd64 buildable candidate image with exact source binding.
- Preserved production topology, host sentinels, data, and rollback authority through controlled direct-Docker promotion.

### R16.32 orchestration evidence foundation

Accepted work across the R16.32 lineage includes:

- normalized candidate facts;
- deterministic candidate disposition;
- computational shadowing without additional real provider traffic;
- explainability/reason taxonomy;
- bounded observation/evidence collection;
- source-backed blocker and positive-hard-fact capture;
- request/context compatibility discovery;
- request-local compatibility provenance;
- corrected three-component context composition;
- execution-key request-local evidence design;
- compile/lint/build differential qualification;
- hard-gate completeness and synthetic comparable-proceed evidence;
- Auth Keeper-aware combo admission and routing eligibility;
- exact source/call-topology reconciliation for the two Auth Keeper connection-state consumers;
- isolated flag-OFF and flag-ON runtime qualification;
- production-path transport/topology readiness;
- fail-closed activation/automatic-rollback runbook review;
- authorized live activation;
- post-activation freeze and rollback-integrity proof.

### Auth Keeper integration

- Dedicated service-token contract established without using general dashboard/control tokens.
- Container-to-host Auth Keeper transport qualified over the real production network path.
- Secretless connection-state response contract accepted.
- Auth Keeper remains the credential/session authority while OmniRoute remains routing authority.
- Live D18 activation did not require Auth Keeper redeployment.
- LaunchAgent permission hardening completed.

### Activation and rollback engineering

- Revalidated exact R16.31 live prestate before cutover.
- Reconstructed 17 operator overrides into a private `0600` temporary env-file without printing/hashing values.
- Proved the root clone-helper path before cutover.
- Stopped and retained R16.31 as a rollback holder.
- Cloned the stopped production data into a fresh D18 volume with file/content integrity verification.
- Started the exact accepted D18 image with preserved ports/network/mounts/restart policy.
- Validated live health, topology and Auth Keeper contract.
- Armed automatic rollback for every post-stop failure/interruption.
- Retained the old runtime and original data after success instead of deleting rollback authority.

### Post-activation freeze

- O1 proved continued D18 live identity, stability, host sentinels, Auth Keeper contract, activation fields, evidence-root integrity and non-drift.
- O1's rollback digest failure was correctly classified as a harness capability error rather than a data defect.
- O2 added only `DAC_READ_SEARCH` to a network-none/read-only helper and reproduced the exact A1 rollback-volume digest.
- Composite O1+O2 is the accepted post-activation freeze authority.

## 5. Five-pillar progress showcase

| Pillar | Current state | Proven / completed | Still required |
| --- | --- | --- | --- |
| Codex Unified Agent | Partially implemented; reintegration/productization required | Unified config/catalog/workload-policy lineage, host router concepts, protected-capacity concepts, workload isolation foundations | Make the control plane repository-owned and release-managed; define final task-delegation contract; model/provider switching without manual session restart; full end-to-end Codex tests |
| Unified OmniRoute AI Workforce | Strong foundation; ongoing | Large provider/model catalog, routing strategies, free/keyless paths, API routing, combos/fallback, provider capability work, multiple custom access integrations | Normalize access modes/adapters; finish provider/account eligibility contract; reduce unnecessary provider-core coupling; continue compatible upstream reconciliation |
| Auth Keeper | Mature foundation; live D18 integration accepted | Local service/dashboard, profile/account isolation, provider/account/connection binding, recovery/re-auth mechanics, persistent macOS service, secret handling, live secretless connection-state integration | Finish all provider modes required by the final workforce; complete browser/session lifecycle coverage; preserve explicit human-verification lane; end-to-end qualification against final Codex Unified plane |
| Intelligent Multi-Model Orchestration | D18 live and frozen; major foundation accepted | Hard-gate facts, disposition, shadowing, provenance, context compatibility, Auth Keeper admission, exact source/runtime reconciliation, production activation and freeze | Define the next R16.32 phase; collect/interpret broader empirical evidence where required; implement provider-neutral preference intelligence only among hard-gate survivors; model-intelligence enrichment under provenance rules; qualify later activation changes before promotion |
| Operations Floor | Significant historical implementation; reintegration required | Provider/workload floor concepts, routing/fallback visualization, attention/evidence inspector, auth/system telemetry concepts, protected-native presentation, workload-isolation views | Reconcile historical branches with current D18/R16.32 lineage; connect live request-local evidence; surface Auth Keeper state safely; show Codex worker assignment and acting/review models; preserve observer/operator-only authority |

## 6. What we are working on now

The immediate activation/freeze work is complete. The current engineering baseline is:

**D18 live + frozen post-activation, with R16.31 rollback retained intact.**

The next work should proceed from that baseline rather than rerunning D18 qualification.

Current continuation priorities are:

1. **Define the next R16.32 product phase canonically before implementation.** The repository does not yet contain an authoritative D19 scope; the name must not be used as a substitute for a reviewed objective and invariants.
2. **Retain rollback authority while the new baseline matures.** Cleanup of the R16.31 holder/original volume requires a separate retention decision.
3. **Continue Pillar 4 beyond D18 without weakening hard gates.** Preference/model intelligence must remain subordinate to Auth Keeper, workload policy, capability/context, cooldown/breaker, quota and explicit request authority.
4. **Reintegrate the higher-level product planes.** Codex Unified and Operations Floor must be reconciled with the now-live OmniRoute/Auth Keeper orchestration baseline.
5. **Continue provider/access-mode normalization and upstream compatibility work.**

## 7. What remains to finish the original goal

The original goal is complete only when the five pillars work as one coherent product, not when any single R16.x milestone passes.

### A. Finish Codex Unified as the single user-facing agent

Required end state:

- one Codex-centered session/workspace;
- repository-owned, release-managed unified control-plane configuration;
- clear delegation contract from Codex into OmniRoute;
- multiple reasoning/review workers allowed behind one controlled acting model;
- no manual provider/model session restart for normal switching;
- tool/mutation ownership explicitly controlled;
- end-to-end Codex request tests through the full stack.

### B. Finish the unified workforce/access-mode model

Required end state:

- consistent representation of free/keyless, API credential, managed session, subscription/coding-plan, web, enterprise and interactive-human-verification lanes;
- ownership, eligibility, recovery and routing semantics defined per access mode;
- provider additions isolated from the core where practical;
- ongoing upstream catalog/provider improvements absorbed without breaking fork invariants.

### C. Finish Auth Keeper provider/session coverage

Required end state:

- all managed-auth provider modes needed by the final workforce;
- robust browser/session lifecycle and bounded recovery;
- explicit non-secret routing-safe state for OmniRoute and Operations Floor;
- human-required verification preserved where automatic reusable credentials do not exist;
- final end-to-end qualification with Codex Unified and production OmniRoute.

### D. Finish intelligent orchestration beyond the D18 hard-gate foundation

Required end state:

- source-backed/provider-neutral preference signals;
- preference applied only to candidates that survived hard gates;
- empirical/shadow evidence before any preference activation;
- evidence-derived activation criteria rather than arbitrary thresholds;
- Unified Model Intelligence Registry with provenance-labeled architecture metadata where useful;
- external metadata/benchmarks kept below official capability/runtime evidence in authority;
- no extra provider/Auth Keeper calls merely to score candidates when request-local evidence already exists.

### E. Reintegrate and finish Operations Floor

Required end state:

- reconcile the historical Operations Floor branches with the current source/runtime lineage;
- show live workers, routing, fallback, auth state, health, quota/cooldown, workload assignment and operator attention;
- display evidence explaining why routing/fallback occurred;
- show protected-native capacity separately where policy requires it;
- preserve personal versus isolated enterprise/MTA visibility;
- display Codex Unified worker/delegation state;
- expose safe operator controls without bypassing OmniRoute or Auth Keeper authority.

### F. Full end-to-end product acceptance

Before the original goal can be considered complete, the complete path must be qualified:

```text
Codex Unified
  -> OmniRoute
  -> Auth Keeper / provider eligibility
  -> orchestration / fallback
  -> provider/model execution
  -> response
  -> Operations Floor evidence
```

Acceptance must include normal and failure paths such as:

- quota exhaustion;
- cooldown/breaker behavior;
- provider outage;
- authentication expiry and re-authentication;
- fallback behavior;
- workload isolation;
- protected-capacity preservation;
- restart/recovery;
- rollback readiness;
- build/source/runtime provenance;
- evidence continuity from request through operator view.

Only after this full product acceptance should the fork be described as having completed the original five-pillar goal.

## 8. Important current guardrails

- Do not remove the R16.31 rollback holder or original volume without a separate accepted cleanup decision.
- Do not silently rebuild or replace the accepted D18 live image.
- Do not change the Auth Keeper dedicated token-file contract casually.
- Do not restart historical R1-R4/O1 qualification simply to obtain new green output; rerun only when new contradictory evidence requires it.
- Do not invent D19 scope. Define the next phase first.
- Do not let Operations Floor become routing authority.
- Do not let preference intelligence override hard-gate failures.
- Do not force credentials onto free/keyless paths.
- Do not collapse protected-native capacity into the ordinary routed fleet when policy requires preservation.

## 9. Accepted milestone/evidence lineage

Current accepted lineage includes:

- R10 — Linux-buildable retained D18 image freeze;
- R11 — isolated flag-OFF qualification;
- R12-R6 — first valid isolated flag-ON behavioral authority;
- R7 — exact-object/AST source/call-topology reconciliation;
- R3 — production-path transport/topology readiness;
- R4 — fail-closed activation/automatic-rollback runbook review;
- H1 — Auth Keeper LaunchAgent hardening;
- A1 — authorized D18 production activation;
- O1+O2 composite — accepted post-activation live freeze and rollback-integrity authority.

The full low-level checkpoint is maintained in `docs/project/CURRENT_STATUS.md` and `docs/project/HANDOFF_R16_32_D18_AUTH_KEEPER_2026-09-16.md`.

## 10. Where to read next

- Product architecture: `docs/project/ARCHITECTURE_SOURCE_OF_TRUTH.md`
- Engineering rules: `docs/project/ENGINEERING_SOURCE_OF_TRUTH.md`
- Long-range plan: `docs/project/MASTER_ROADMAP.md`
- Exact current checkpoint: `docs/project/CURRENT_STATUS.md`
- D18/Auth Keeper continuity: `docs/project/HANDOFF_R16_32_D18_AUTH_KEEPER_2026-09-16.md`
- Documentation authority: `SOURCE_OF_TRUTH.md`

The private `Zartharas/omniroute-auth-keeper` repository remains the implementation/release-engineering authority for Auth Keeper itself.