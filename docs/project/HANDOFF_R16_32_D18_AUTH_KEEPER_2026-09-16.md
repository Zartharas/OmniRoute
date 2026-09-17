# R16.32 D18 Auth Keeper Qualification Handoff

Last reviewed: 2026-09-17
Status: D18 isolated qualification, formal source/runtime reconciliation, pre-activation readiness and activation/rollback runbook review accepted; production activation still blocked pending explicit authorization

This is the canonical cross-project handoff for continuing D18 OmniRoute/Auth Keeper work. It records evidence/status only. Product intent remains in `ARCHITECTURE_SOURCE_OF_TRUTH.md`; permanent engineering method remains in `ENGINEERING_SOURCE_OF_TRUTH.md`; exact accepted Git/runtime evidence remains more specific than this summary.

## 1. Non-negotiable boundaries

- OmniRoute owns routing/provider/orchestration/model-workforce decisions.
- Auth Keeper owns credential/session/account lifecycle and routing eligibility/admission facts.
- Operations Floor is observer/operator plane only.
- Protected native ChatGPT/OpenAI capacity must not silently become ordinary routed fleet capacity.
- No production activation, deployment, cutover or D19 is authorized by this handoff.
- No real credentials or uncontrolled real provider/model calls were used in the accepted isolated D18 qualification/readiness lineage.
- Live production runtime must remain unchanged until an explicitly authorized later phase.
- Do not weaken failed assertions merely to obtain a pass; classify the exact discriminator first.

## 2. Accepted source/image authority

### Linux-buildable source

- branch: `feat/d18-r8-union-lockfix-linux-canary-r9`
- commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`
- tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`
- parent: `13453f6bdf1c9279da3bea0d2382959c92c93d3e`
- candidate delta: `package.json`, `package-lock.json`
- package.json SHA-256: `5859ab110da0d81a811b2a7f2835bd27508018187cb18ae01418495b885be752`
- package-lock.json SHA-256: `09870271cdbbf6aaddb0d33f47f94dab67fb49c083af62055d7cfb13444c80b9`

### D18 source hashes

- `open-sse/services/combo.ts`: `47028689cb3a372b4afc341f13ba32e01dd006553a38de9f9837369ec5c68742`
- `src/lib/authKeeper/comboAdmissionActivation.ts`: `062d25bd7e8ea2ac58903e43922821e66c3171e13fe892a779749d10cb1a7239`
- `src/lib/authKeeper/comboRoutingEligibility.ts`: `adccf245faee216e168b15b3961bea427b9dd73803698f74cb351dc982328294`

### Retained Linux canary image

- tag: `omniroute:d18-r8-r9-candidate-linux-r10`
- image ID: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`
- platform: `linux/amd64`
- R10 evidence ZIP SHA-256: `a800dde4a18ebdde860499d9c8241b2ae0068b1065498213080e3c647af0dbd2`

## 3. Frozen live production authority

Frozen live snapshot:

`279211b86f31339171caadac41aca3a928b5356cf696eb98a076486a97f52df3|sha256:370d49896920568bc5adbfe71316879368ec93be0cd020cf1b546fa3ef2640aa|running|0|2026-09-15T16:51:28.109833871Z`

Current live deployment authority is the accepted R16.31 direct-Docker runtime:

- milestone label: `R16.31`;
- source commit: `34bd2fdbb8b04d848a0157d763c70ec241468e1c`;
- source tree: `7d7b256d92036093535063fb930fe79bb3df4535`;
- network: `mer-gateway_default`;
- restart policy: `unless-stopped`;
- runtime user: `node`;
- data volume: `omniroute-r16-31-live-data-34bd2fdbb8b0`;
- Auth Keeper service token and workload policy remain read-only binds;
- published ports 20128, 20129 and 20132 remain bound to `127.0.0.1` only.

Host sentinels:

- router: `da5599b7c8cb0c6d755657069e5d2090b9e7d83edd4cbad4af3ed44c8495de97`
- config: `2d731cb44980792ba010e51a865e1b11a99dc50b2c2ca0a50aaf903e5d8ae690`
- model catalog: `6e88a9611dbc8978d2795fb14ce4fff0eabb82c2e68609b8c3994da92489250d`
- workload policy: `2bf6ecd48cd4d1e604c71af28dbf4a0606aba34fbd1c33c16762836b45d47a31`

No D18 qualification/readiness step replaced or mutated the live OmniRoute container or live Auth Keeper.

## 4. R11 accepted flag-OFF runtime qualification

- script SHA-256: `5d0c6bdea739083833c1d0f53f3954bb9311e76fbc50776d3d409fa6f8dea69b`
- evidence ZIP SHA-256: `1321c9769cfc1ac881c62c217650febb7aa1c05c6f0b4e822daaa52651168098`

Accepted facts include exact R10 image, activation OFF, network `none`, no published ports, no bind/named volumes, `/app/data` tmpfs, health/live 200, no harness provider requests, zero successful external egress, cleanup and live/host non-drift.

R11 status: **ACCEPTED**.

## 5. R12-R6 accepted flag-ON runtime authority

- script SHA-256: `1c4fb841838456755039947b54c9227b8b1f53803ea37e4ada72b5d61cf26e90`
- evidence ZIP SHA-256: `7f58fff8115dc0ff5b5cf942d61e9fe91a402120e8882f1abd10daae403bc8b6`

R12-R6 is the runtime authority for isolated D18 flag-ON behavior.

It proved:

- valid private 64-hex synthetic service-token contract;
- synthetic Auth Keeper readiness;
- genuine synthetic combo seed and independent SQLite verification;
- no provider connection row for the synthetic connection ID;
- pre-chat connection-state event count 0;
- two authorized `GET /v1/omniroute/connection-state` events after the chat, both 200;
- request sequence: GET #1, `No credentials for openai`, GET #2, then `Skipping openai/gpt-4o — Auth Keeper routing eligibility excluded the target`;
- terminal 503 `ALL_TARGETS_SKIPPED` with `attempted:0`;
- target-specific provider dispatch absent;
- no successful real provider request;
- successful external egress 0 under Docker `network=none`;
- cleanup and live/stable inventory non-drift.

## 6. R7 formal source/call-topology reconciliation — ACCEPTED

The earlier R7-R2/R7-R3 source-owner assertion was stale. It expected request-scoped plan markers in `open-sse/services/combo.ts` that are actually split across dedicated Auth Keeper modules.

Exact candidate source proved:

- `prepareAuthKeeperComboAdmissionPlan` owner: `src/lib/authKeeper/comboRoutingEligibility.ts`;
- memoization owner: `src/lib/authKeeper/comboAdmissionActivation.ts::createAuthKeeperComboAdmissionPlanProvider`;
- request-scoped memoization variable: `planPromise`;
- `combo.ts` request-path accessor: `getAuthKeeperAdmissionPlan`;
- admission application: `applyAuthKeeperComboAdmission` in `comboRoutingEligibility.ts`;
- connection-state fetch funnel: `connectionStateRoutingEligibility.ts`.

GET #1 is reconciled to availability/credential pre-screen:

`target-resolution pre-screen -> isModelAvailable/checkModelAvailable -> getProviderCredentialsWithQuotaPreflight -> getProviderCredentials -> applyAuthKeeperConnectionStateRoutingEligibility -> requestConnectionState -> /v1/omniroute/connection-state`

GET #2 is reconciled to the independent lazy D18 admission path:

`createAuthKeeperComboAdmissionPlanProvider.planPromise -> prepareAuthKeeperComboAdmissionPlan -> defaultApplyEligibility -> applyAuthKeeperConnectionStateRoutingEligibility -> requestConnectionState -> /v1/omniroute/connection-state -> applyAuthKeeperComboAdmission -> D18 target exclusion`

The exact candidate topology supports the R12-R6 observed order without changing or inventing an expected event count.

R7 source/call-topology reconciliation status: **ACCEPTED / CLOSED**.

## 7. Harness failures that must not be rediscovered

The following were harness/validator defects, not D18 product defects:

- R12 wrong source-owner assumption for `applyAuthKeeperComboAdmission`;
- R12-R2 synthetic server token-path mismatch;
- R12-R3 unauthorized readiness probe expected 404 instead of correct 401;
- R12-R4 missing stdin attachment for `docker exec ... node -` heredoc;
- R12-R5 synthetic service token violated the private 64-hex token-file contract;
- R7 escaped `body_prefix` parser defect;
- R7-R2/R7-R3 stale plan symbol/source-owner assumption;
- R7-R4 Bash 4 `mapfile` incompatible with macOS `/bin/bash` 3.2;
- R7-R6 ordinary `const` assignment misclassified as function declaration;
- R7-R7 arbitrary line-proximity assertion for `handleComboChat` callback wiring;
- R7-R8 inline TypeScript parameter object type mistaken for arrow-function body;
- R7-R9 AST query checked `Parameter.initializer` instead of the destructured `BindingElement` default for `prepare`;
- R1 image source-label blocker asserted label names outside the accepted R10 identity authority;
- R1 compared the deployed frozen Auth Keeper runtime against the wrong R11 source checkpoint;
- R2 generic secret-like-key scan misclassified the intentional false-valued safety indicators `credentialsReturned` and `rawCredentialIncludedInOutput`;
- R2 assumed Docker Compose provenance labels were required for a runtime promoted by the accepted R16.31 direct-Docker transaction.

## 8. Pre-activation readiness — ACCEPTED

R3 status: **ACCEPTED**.

R3 proved:

- exact frozen R16.31 live snapshot remains healthy and unchanged;
- the live runtime carries the accepted R16.31 milestone/source labels;
- exact network/restart/user/data/mount/port topology is frozen for the future runbook;
- R10 candidate image can reach the real live Auth Keeper over `mer-gateway_default` using the mounted dedicated service token;
- unauthenticated connection-state request returned 401 and authenticated request returned 200;
- the live response matched the exact `auth-keeper-connection-state/v1` secretless READ_ONLY schema;
- `mutationPerformed=false`, `credentialsReturned=false`, `rawCredentialIncludedInOutput=false`, accounts is an array, and the response contained zero unexpected or forbidden secret-material keys;
- zero provider calls occurred;
- disposable canary cleanup and complete source/container/live non-drift passed.

R3 result:

- `technical_blocker_count=0`;
- one separate hardening finding remains: the Auth Keeper LaunchAgent plist is currently `0644`, while accepted hardening expectation is `0600`.

The plist mode is a separate hardening item and is not classified as an Auth Keeper functional failure.

## 9. Direct-Docker activation/rollback runbook review — ACCEPTED

R4 status: **ACCEPTED**.

R4 performed no lifecycle mutation, generated no live activation script, and proved the future transaction is fully determined using the accepted R16.31 direct-Docker promotion/rollback model.

Future transaction authority:

1. revalidate exact current R16.31 live snapshot, health, labels, mounts, ports, network and host sentinels;
2. revalidate exact retained R10 D18 image and service-token metadata;
3. reconstruct current operator overrides relative to the R16.31 image into a temporary `0600` env-file and inject only the explicit D18 fields;
4. fail closed on rollback-holder/data-volume naming collisions;
5. stop `mer-omniroute`; from this point every failure automatically triggers rollback;
6. rename the stopped R16.31 container to `mer-omniroute-r16-31-rollback-d18-5ae6f97e7322` and keep its original data volume untouched;
7. create `omniroute-d18-live-data-5ae6f97e7322`;
8. clone stopped R16.31 data read-only into the D18 volume with an explicit root helper and verify file counts/bytes/content/symlink integrity;
9. start exact R10 as `mer-omniroute` with preserved network/restart/ports/mounts plus the D18 activation contract;
10. require healthy Docker state, restart count zero, exact image/topology/mount/port contract;
11. require host `/healthz` and `/livez`, all loopback ports, and activation-flag presence without printing unrelated environment values;
12. require live-container Auth Keeper 401/200 exact secretless-schema validation with no provider/model call;
13. observe a bounded stability window with health remaining healthy and restart count zero;
14. on success retain the stopped R16.31 rollback holder and original data volume until a separate cleanup decision.

Automatic rollback authority:

- any failure after the stop boundary removes only the failed D18 runtime if present, renames the retained R16.31 holder back to `mer-omniroute`, starts it with its untouched original data volume, and validates restored image/health/restart count/ports/topology;
- if restoration validation itself fails, stop secondary mutation and preserve all artifacts for operator review.

Secure environment review authority:

- 17 current operator overrides were reconstructed without printing or hashing values;
- temporary env-file mode was `0600`;
- explicit D18 values were exactly:
  - `OMNIROUTE_AUTH_KEEPER_BASE_URL=http://host.docker.internal:21991`
  - `OMNIROUTE_AUTH_KEEPER_SERVICE_TOKEN_FILE=/run/omniroute-auth-keeper/omniroute-service.token`
  - `OMNIROUTE_ALLOW_REMOTE_AUTH_KEEPER=1`
  - `OMNIROUTE_AUTH_KEEPER_COMBO_ADMISSION_ENABLED=1`

R4 result:

- `runbook_plan_error_count=0`;
- `hardening_finding_count=1` for the plist mode;
- `live_activation_authorized=NO`;
- `live_activation_script_generated=NO`;
- `live_activation_executed=NO`;
- live/source/container non-drift passed.

## 10. Current authorization boundary

D18 isolated qualification, formal source/runtime reconciliation, pre-activation readiness and activation/rollback runbook review are complete.

The project is now at an explicit operator decision boundary.

Decision A — Auth Keeper plist hardening:

- current path: `$HOME/Library/LaunchAgents/com.omniroute.auth-keeper.plist`;
- current observed mode: `0644`;
- accepted hardening expectation: `0600`;
- proposed remediation is a separate authorized `chmod 600`-only change; no service restart is expected to be required;
- no remediation has been executed.

Decision B — D18 live activation:

- generation or execution of the live activation transaction requires separate explicit operator authorization;
- passing R4 does not itself authorize cutover;
- D19 remains out of scope.

Until explicit authorization is given:

- do not rerun R12/R7/R1-R4 diagnostics without new contradictory evidence;
- do not chmod or otherwise mutate Auth Keeper solely because the hardening finding exists;
- do not generate or execute the live D18 activation transaction;
- do not replace the live OmniRoute container;
- do not deploy/cut over;
- do not begin D19.

## 11. Engineering lessons carried forward

- Prove source ownership from the exact accepted Git object.
- Prefer TypeScript AST/semantic guards over raw occurrence, brace, regex or line-proximity assumptions.
- Validate scripts against the actual operator shell/runtime, including macOS Bash 3.2 compatibility.
- Do not treat a total runtime event count as architectural truth until exact consumers are proven.
- Preserve R10/R11/R12 evidence authority and live non-drift during reconciliation.
- Treat R3 as current live/topology/Auth Keeper transport authority.
- Treat R4 as activation/rollback plan authority.
- A harness failure is not a product defect until the product discriminator is actually proven.
- Do not generate or execute a live activation script solely because the runbook review passed.

## 12. New-chat handoff rule

A new session should treat this document and `CURRENT_STATUS.md` as the accepted D18 checkpoint. Do not restart from R7, rerun R12 canaries, or rediscover R1-R4 readiness findings unless new contradictory evidence appears. Resume from the explicit operator authorization boundary described above.
