# Current Project Status

Last reviewed: 2026-09-17
Status: Canonical R16.32 D18 checkpoint; isolated qualification, source/runtime reconciliation, pre-activation readiness and activation/rollback runbook review accepted; production activation not authorized

This document records the latest accepted engineering checkpoint for the `Zartharas/OmniRoute` fork. Product intent remains in [Architecture Source of Truth](ARCHITECTURE_SOURCE_OF_TRUTH.md), engineering method remains in [Engineering Source of Truth](ENGINEERING_SOURCE_OF_TRUTH.md), and the detailed continuity record remains in [R16.32 D18 Auth Keeper Qualification Handoff](HANDOFF_R16_32_D18_AUTH_KEEPER_2026-09-16.md).

Accepted Git objects, source hashes, runtime evidence and exact-object source analysis remain the implementation authority when they are more specific than this summary.

## 1. Overall product status

The five-pillar product goal remains unchanged:

1. Codex Unified Agent
2. Unified OmniRoute AI Workforce
3. Auth Keeper
4. Intelligent Multi-Model Orchestration
5. Operations Floor

The active program remains R16.32 under Pillar 4. D18 isolated qualification, source/runtime reconciliation, pre-activation readiness, and activation/rollback runbook review are complete. This still does not complete the overall product and does not authorize production activation.

## 2. Live production authority

The D18 qualification/readiness lineage has not changed the live production runtime.

Frozen live snapshot authority:

`279211b86f31339171caadac41aca3a928b5356cf696eb98a076486a97f52df3|sha256:370d49896920568bc5adbfe71316879368ec93be0cd020cf1b546fa3ef2640aa|running|0|2026-09-15T16:51:28.109833871Z`

The current live runtime is the accepted R16.31 direct-Docker deployment with:

- cutover milestone label `R16.31`;
- source commit `34bd2fdbb8b04d848a0157d763c70ec241468e1c`;
- source tree `7d7b256d92036093535063fb930fe79bb3df4535`;
- network `mer-gateway_default`;
- restart policy `unless-stopped`;
- runtime user `node`;
- loopback-only published ports 20128, 20129 and 20132;
- live data volume `omniroute-r16-31-live-data-34bd2fdbb8b0`;
- read-only Auth Keeper service-token bind;
- read-only workload-policy bind.

Host non-drift sentinels:

- router SHA-256: `da5599b7c8cb0c6d755657069e5d2090b9e7d83edd4cbad4af3ed44c8495de97`
- config SHA-256: `2d731cb44980792ba010e51a865e1b11a99dc50b2c2ca0a50aaf903e5d8ae690`
- model catalog SHA-256: `6e88a9611dbc8978d2795fb14ce4fff0eabb82c2e68609b8c3994da92489250d`
- workload policy SHA-256: `2bf6ecd48cd4d1e604c71af28dbf4a0606aba34fbd1c33c16762836b45d47a31`

Current rules:

- no D18 production activation has been authorized;
- no D18 deployment/cutover has been performed by this qualification/readiness lineage;
- no D19 work is authorized by this checkpoint;
- a qualified local source/image must not be inferred to be live.

## 3. Current D18 source and image authority

Linux-buildable source authority:

- branch: `feat/d18-r8-union-lockfix-linux-canary-r9`
- commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`
- tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`
- parent: `13453f6bdf1c9279da3bea0d2382959c92c93d3e`
- accepted candidate scope: `package.json`, `package-lock.json`

D18 source hashes bound during qualification:

- `open-sse/services/combo.ts`: `47028689cb3a372b4afc341f13ba32e01dd006553a38de9f9837369ec5c68742`
- `src/lib/authKeeper/comboAdmissionActivation.ts`: `062d25bd7e8ea2ac58903e43922821e66c3171e13fe892a779749d10cb1a7239`
- `src/lib/authKeeper/comboRoutingEligibility.ts`: `adccf245faee216e168b15b3961bea427b9dd73803698f74cb351dc982328294`

Retained Linux canary image authority:

- tag: `omniroute:d18-r8-r9-candidate-linux-r10`
- image ID: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`
- platform: `linux/amd64`
- R10 evidence ZIP SHA-256: `a800dde4a18ebdde860499d9c8241b2ae0068b1065498213080e3c647af0dbd2`

R10 established Linux buildability while preserving live runtime and host non-drift.

## 4. R11 flag-OFF qualification

R11 evidence ZIP SHA-256:

`1321c9769cfc1ac881c62c217650febb7aa1c05c6f0b4e822daaa52651168098`

R11 status: **ACCEPTED**.

Accepted facts include exact R10 image use, activation flag OFF, Docker network `none`, no published ports, no bind/named volumes, `/app/data` tmpfs, `/healthz` and `/livez` 200, no harness provider requests, zero successful external egress, cleanup, and live/host non-drift.

## 5. R12-R6 first valid flag-ON runtime authority

R12-R6 script SHA-256:

`1c4fb841838456755039947b54c9227b8b1f53803ea37e4ada72b5d61cf26e90`

R12-R6 evidence ZIP SHA-256:

`7f58fff8115dc0ff5b5cf942d61e9fe91a402120e8882f1abd10daae403bc8b6`

R12-R6 remains the runtime authority. It proved:

- valid private 64-hex synthetic Auth Keeper service-token contract;
- synthetic Auth Keeper readiness;
- genuine synthetic combo seed plus independent SQLite verification;
- no provider connection row for the synthetic connection ID;
- pre-chat Auth Keeper event count 0;
- two authorized `GET /v1/omniroute/connection-state` events after the chat, both HTTP 200;
- runtime order: first connection-state GET, `No credentials for openai`, second connection-state GET, then `Skipping openai/gpt-4o — Auth Keeper routing eligibility excluded the target`;
- terminal 503 `ALL_TARGETS_SKIPPED` with `attempted:0`;
- no target-specific provider dispatch marker;
- no successful real provider request;
- successful external egress 0 under Docker `network=none`;
- cleanup and live/stable inventory non-drift.

## 6. Formal source/call-topology reconciliation — CLOSED

The R7 source-owner/call-topology blocker is closed by exact-object and AST-backed evidence. No additional runtime canary was required.

Exact candidate source proves:

- plan preparation owner: `src/lib/authKeeper/comboRoutingEligibility.ts::prepareAuthKeeperComboAdmissionPlan`;
- request-scoped memoization owner: `src/lib/authKeeper/comboAdmissionActivation.ts::createAuthKeeperComboAdmissionPlanProvider`;
- memoization state: local closure variable `planPromise`;
- request-path accessor owner: `open-sse/services/combo.ts::getAuthKeeperAdmissionPlan`;
- admission application owner: `src/lib/authKeeper/comboRoutingEligibility.ts::applyAuthKeeperComboAdmission`;
- connection-state fetch funnel owner: `src/lib/authKeeper/connectionStateRoutingEligibility.ts`.

GET #1 is reconciled to:

`targetResolution.preScreenTargets -> isModelAvailable/checkModelAvailable -> getProviderCredentialsWithQuotaPreflight -> getProviderCredentials -> applyAuthKeeperConnectionStateRoutingEligibility -> requestConnectionState -> /v1/omniroute/connection-state`

GET #2 is reconciled to:

`createAuthKeeperComboAdmissionPlanProvider.planPromise -> prepareAuthKeeperComboAdmissionPlan -> defaultApplyEligibility -> applyAuthKeeperConnectionStateRoutingEligibility -> requestConnectionState -> /v1/omniroute/connection-state -> applyAuthKeeperComboAdmission -> D18 target exclusion`

The exact candidate topology supports the already-collected R12-R6 runtime sequence without changing or inventing an expected event count.

Formal R7 source-topology reconciliation status: **ACCEPTED / CLOSED**.

## 7. Historical harness defects — do not rediscover

The following were harness/validator defects rather than D18 product defects:

- R12 wrong source owner for `applyAuthKeeperComboAdmission`;
- R12-R2 synthetic token-path mismatch;
- R12-R3 incorrect 404 expectation for an unauthorized endpoint that correctly returns 401;
- R12-R4 missing stdin attachment for `docker exec ... node -`;
- R12-R5 invalid synthetic token-file contract;
- R7 escaped evidence-parser defect;
- R7-R2/R7-R3 stale plan-symbol/source-owner assumption;
- R7-R4 Bash 4 `mapfile` on macOS Bash 3.2;
- R7-R6 ordinary `const` assignment misclassified as a function;
- R7-R7 arbitrary line-proximity assertion;
- R7-R8 inline TypeScript parameter object type mistaken for function body;
- R7-R9 destructured `BindingElement` default incorrectly queried as `Parameter.initializer`;
- R1 candidate-image source-label assertion used label names outside the accepted R10 identity authority;
- R1 compared the live frozen Auth Keeper runtime against the later R11 source checkpoint instead of the accepted deployed `1b4859a...` runtime;
- R2 generic secret-like-key scanner treated the safe contract indicators `credentialsReturned` and `rawCredentialIncludedInOutput` as secret-bearing fields;
- R2 assumed current Compose provenance labels were required even though R16.31 used a direct-Docker cutover model.

## 8. Pre-activation readiness — ACCEPTED

R3 status: **ACCEPTED**.

R3 proved:

- exact current R16.31 live runtime snapshot and health;
- exact R16.31 direct-cutover labels/source authority;
- exact live network/restart/user/mount/port topology;
- current dedicated Auth Keeper service-token metadata contract;
- R10 candidate container-to-host Auth Keeper transport over the real production network path;
- unauthorized connection-state request = 401;
- authorized connection-state request = 200;
- exact secretless `auth-keeper-connection-state/v1` response contract, including `mode=READ_ONLY`, `mutationPerformed=false`, `credentialsReturned=false`, `rawCredentialIncludedInOutput=false`, accounts array, zero unexpected contract keys and zero forbidden secret-material keys;
- zero provider calls;
- complete cleanup and live/source/container non-drift.

R3 ended with:

- `technical_blocker_count=0`;
- one separate hardening finding: Auth Keeper LaunchAgent plist is currently mode `0644`, while accepted hardening expectation is `0600`.

The plist mode is a hardening item, not a current Auth Keeper functional failure. No remediation has yet been authorized or executed.

## 9. Activation/rollback runbook review — ACCEPTED

R4 status: **ACCEPTED**.

The future D18 production transaction is now fully determined in review form using the proven R16.31 direct-Docker model. R4 performed no lifecycle mutation and generated no live activation script.

Runbook authority:

- transaction model: stop current R16.31 live container, retain it as rollback holder, create a fresh D18 data volume, clone stopped R16.31 data with integrity verification, start exact R10 candidate with preserved topology plus explicit D18 activation fields, validate health/topology/Auth Keeper transport, observe stability, and automatically rollback on any failure after the stop boundary;
- future rollback holder: `mer-omniroute-r16-31-rollback-d18-5ae6f97e7322`;
- future D18 data volume: `omniroute-d18-live-data-5ae6f97e7322`;
- secure future env reconstruction: 17 current operator overrides retained in a temporary `0600` env-file without printing/hashing values;
- explicit D18 fields: `OMNIROUTE_AUTH_KEEPER_BASE_URL=http://host.docker.internal:21991`, `OMNIROUTE_AUTH_KEEPER_SERVICE_TOKEN_FILE=/run/omniroute-auth-keeper/omniroute-service.token`, `OMNIROUTE_ALLOW_REMOTE_AUTH_KEEPER=1`, and `OMNIROUTE_AUTH_KEEPER_COMBO_ADMISSION_ENABLED=1`;
- preserve `mer-gateway_default`, `unless-stopped`, loopback 20128/20129/20132, read-only Auth Keeper token mount, read-only workload-policy mount, and cloned live data;
- rollback data authority remains the untouched original R16.31 volume;
- rollback image authority remains `sha256:370d49896920568bc5adbfe71316879368ec93be0cd020cf1b546fa3ef2640aa`;
- any failure after stopping the current live container must invoke automatic rollback to the retained R16.31 holder; restoration itself must be validated fail-closed.

R4 ended with:

- `runbook_plan_error_count=0`;
- `hardening_finding_count=1` for the plist mode;
- `live_activation_authorized=NO`;
- `live_activation_script_generated=NO`;
- `live_activation_executed=NO`;
- complete live/source/container non-drift.

## 10. Current active boundary

D18 isolated qualification, source/runtime reconciliation, pre-activation readiness, and activation/rollback runbook review are complete.

The project is now at an **explicit operator authorization boundary**.

Two decisions remain separate:

1. Auth Keeper LaunchAgent hardening: whether to remediate `$HOME/Library/LaunchAgents/com.omniroute.auth-keeper.plist` from `0644` to `0600`.
2. D18 production activation: whether to authorize generation/execution of the fail-closed direct-Docker activation transaction with automatic R16.31 rollback.

Until explicit authorization is given:

- do not rerun R12/R7/R1-R4 diagnostics without new contradictory evidence;
- do not chmod or otherwise mutate live Auth Keeper state solely because the hardening finding exists;
- do not generate or execute the live D18 activation transaction;
- do not replace the live OmniRoute container;
- do not deploy/cut over;
- do not begin D19.

## 11. Publication rule

Update this status and the D18 handoff whenever a later accepted phase changes Git/image/runtime authority, activation blockers, live production authority, publication state or the Auth Keeper integration boundary.
