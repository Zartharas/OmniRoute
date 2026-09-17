# R16.32 D18 Auth Keeper Qualification Handoff

Last reviewed: 2026-09-16
Status: Active engineering handoff; runtime qualification materially advanced, formal read-only acceptance reconciliation still open

This document is the canonical handoff for continuing the current D18 OmniRoute/Auth Keeper activation-readiness work in a fresh engineering session. It is a status/evidence document, not product architecture authority. Product intent remains in `ARCHITECTURE_SOURCE_OF_TRUTH.md`; permanent engineering rules remain in `ENGINEERING_SOURCE_OF_TRUTH.md`; accepted Git/runtime evidence remains more specific than this summary.

## 1. Non-negotiable boundaries

- OmniRoute owns routing/provider/orchestration decisions.
- Auth Keeper owns credential/session/account lifecycle and routing eligibility/admission facts.
- Operations Floor remains observer/operator plane only.
- No production activation, deployment, cutover or D19 is authorized by this handoff.
- No real provider credentials or real provider/model calls were used in the D18 isolated qualification lineage described below.
- The live production runtime must remain unchanged until an explicitly authorized later phase.
- Do not weaken a failing assertion merely to make a qualification script pass; first classify the exact source/runtime discriminator.

## 2. Current source and image authority

### Linux-buildable source authority

- branch: `feat/d18-r8-union-lockfix-linux-canary-r9`
- commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`
- tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`
- parent: `13453f6bdf1c9279da3bea0d2382959c92c93d3e`
- accepted scope: `package.json`, `package-lock.json`
- package.json SHA-256: `5859ab110da0d81a811b2a7f2835bd27508018187cb18ae01418495b885be752`
- package-lock.json SHA-256: `09870271cdbbf6aaddb0d33f47f94dab67fb49c083af62055d7cfb13444c80b9`

### D18 activation source hashes bound during qualification

- `open-sse/services/combo.ts`: `47028689cb3a372b4afc341f13ba32e01dd006553a38de9f9837369ec5c68742`
- `src/lib/authKeeper/comboAdmissionActivation.ts`: `062d25bd7e8ea2ac58903e43922821e66c3171e13fe892a779749d10cb1a7239`
- `src/lib/authKeeper/comboRoutingEligibility.ts`: `adccf245faee216e168b15b3961bea427b9dd73803698f74cb351dc982328294`

### Retained Linux canary image authority

- tag: `omniroute:d18-r8-r9-candidate-linux-r10`
- image ID: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`
- platform: `linux/amd64`
- R10 evidence ZIP SHA-256: `a800dde4a18ebdde860499d9c8241b2ae0068b1065498213080e3c647af0dbd2`

R10 proved the exact image is Linux-buildable and preserved the frozen live runtime and host sentinels.

## 3. Frozen live production authority

The qualification lineage did not replace or mutate the live OmniRoute container.

Frozen live snapshot:

`279211b86f31339171caadac41aca3a928b5356cf696eb98a076486a97f52df3|sha256:370d49896920568bc5adbfe71316879368ec93be0cd020cf1b546fa3ef2640aa|running|0|2026-09-15T16:51:28.109833871Z`

Host non-drift sentinels:

- router SHA-256: `da5599b7c8cb0c6d755657069e5d2090b9e7d83edd4cbad4af3ed44c8495de97`
- config SHA-256: `2d731cb44980792ba010e51a865e1b11a99dc50b2c2ca0a50aaf903e5d8ae690`
- model catalog SHA-256: `6e88a9611dbc8978d2795fb14ce4fff0eabb82c2e68609b8c3994da92489250d`
- workload policy SHA-256: `2bf6ecd48cd4d1e604c71af28dbf4a0606aba34fbd1c33c16762836b45d47a31`

## 4. R11 accepted flag-OFF runtime qualification

R11 script SHA-256:

`5d0c6bdea739083833c1d0f53f3954bb9311e76fbc50776d3d409fa6f8dea69b`

R11 evidence ZIP SHA-256:

`1321c9769cfc1ac881c62c217650febb7aa1c05c6f0b4e822daaa52651168098`

Accepted facts:

- exact retained R10 image used;
- Docker network `none`;
- no published ports;
- no bind/named volumes;
- `/app/data` tmpfs only;
- D18 Auth Keeper admission flag explicitly OFF;
- `/healthz` 200 and `/livez` 200;
- no harness provider requests;
- successful external egress 0;
- canary cleanup passed;
- live runtime, stable container inventory and host sentinels unchanged.

Background application egress attempts to normal product metadata/services were observed but blocked by `network=none`; they were classified separately from provider dispatch and do not invalidate R11.

R11 status: **ACCEPTED**.

## 5. R12 flag-ON qualification lineage

R12 used an isolated canary from the exact R10 image with:

- D18 activation flag ON only inside the disposable canary;
- Docker network `none`;
- synthetic Auth Keeper on loopback `127.0.0.1:21991`;
- synthetic connection-state contract `auth-keeper-connection-state/v1`;
- fixed path `/v1/omniroute/connection-state`;
- synthetic combo pinned to `openai/gpt-4o` via `r12-r2-synthetic-conn`;
- no real provider connection row for that connection;
- no real provider credentials;
- no production/live Auth Keeper mutation.

### Failed harness iterations and classifications

These failures were harness defects, not accepted product/runtime defects:

1. R12 — `HARNESS_ONLY_WRONG_FILE_FOR_APPLY_AUTH_KEEPER_COMBO_ADMISSION_SYMBOL`
   - source-contract preflight looked for `applyAuthKeeperComboAdmission` in the activation wrapper instead of its actual routing-eligibility owner.
   - evidence SHA-256: `ce2dc21679790d2208d7ebc676fd78f806cafaf5bf3cc1b2801e5bbc32613f2a`

2. R12-R2 — `HARNESS_ONLY_SYNTHETIC_SERVER_TOKEN_PATH_MISMATCH`
   - synthetic server hardcoded the prior token path and exited before readiness.
   - evidence SHA-256: `c4c14081a209e65c078fcb2686d9d60234178dcf896d34a685a965a1716695c6`

3. R12-R3 — `HARNESS_ONLY_UNAUTHORIZED_READINESS_PROBE_EXPECTED_404`
   - readiness probe omitted the synthetic Authorization header, correctly receiving 401 while the harness expected 404.
   - evidence SHA-256: `93b081ee329c943907945e97cb697b10e89414f3810fddcd56319c310398ad3b`

4. R12-R4 — `HARNESS_ONLY_DOCKER_EXEC_STDIN_NOT_ATTACHED_FOR_NODE_HEREDOC`
   - the seed/chat Node programs used `node -` without `docker exec -i`, so stdin heredocs were not delivered and the commands silently no-op'd.
   - evidence SHA-256: `888433444c1ca02724465473a21537c68f11c1d5fa0af5480775b2c9bb2af42d`

5. R12-R5 — `HARNESS_ONLY_SYNTHETIC_SERVICE_TOKEN_VIOLATED_CLIENT_FILE_CONTRACT`
   - the synthetic token used URL-safe base64-style material and mode 0644, while the client requires a private regular token file with exactly 64 hexadecimal characters.
   - runtime therefore failed locally before fetch with 503 `Auth Keeper combo admission preparation failed` and zero synthetic Auth Keeper events.
   - evidence SHA-256: `3e9f73bf7f1a6b13f145f2fd6e664be4d9da6f0906b415900885b5cbc677f686`

## 6. R12-R6 first valid flag-ON runtime observation

R12-R6 script SHA-256:

`1c4fb841838456755039947b54c9227b8b1f53803ea37e4ada72b5d61cf26e90`

R12-R6 evidence ZIP SHA-256:

`7f58fff8115dc0ff5b5cf942d61e9fe91a402120e8882f1abd10daae403bc8b6`

Important validated facts:

- synthetic service-token contract passed: private regular 64-hex file, node-owned inside canary;
- synthetic Auth Keeper startup/readiness passed;
- ephemeral combo seed genuinely executed;
- separate post-seed SQLite verification passed;
- provider connection row for the synthetic connection ID remained absent;
- Auth Keeper event count before chat request was 0;
- chat probe genuinely executed;
- after the chat request, two authorized `GET /v1/omniroute/connection-state` events were observed, both status 200;
- request log contained `No credentials for openai` between the first and second GET;
- request log then contained `Skipping openai/gpt-4o — Auth Keeper routing eligibility excluded the target`;
- chat response was 503 with terminal `ALL_TARGETS_SKIPPED` and `attempted:0`;
- no target-specific provider dispatch marker was observed;
- no real provider request succeeded;
- Docker `network=none` preserved successful external egress at 0;
- canary cleanup passed;
- live runtime and stable container inventory remained unchanged.

Observed timestamp order in R12-R6 evidence:

1. first authorized connection-state GET;
2. `No credentials for openai`;
3. second authorized connection-state GET;
4. D18 log: `Auth Keeper routing eligibility excluded the target`.

The runtime evidence therefore materially supports pre-dispatch Auth Keeper exclusion for the synthetic target. However, total Auth Keeper event count cannot be assumed to equal one without first proving the exact source consumers in the candidate Git object.

## 7. R7 / R7-R2 read-only acceptance reconciliation

R7 was intentionally read-only: no container create/start/exec, no Docker build, no Git mutation and no live activation.

### R7

Script SHA-256:

`be6cf7032662638c801a93e13d5d1c57bff836b511ae345dd5dcaaa7c245cced`

R7 successfully bound R12-R6 evidence, candidate Git authority, R10 image authority, current live runtime and host sentinels, but failed because it searched the escaped `body_prefix=...` evidence string for unescaped JSON markers.

Classification: read-only parser harness defect.

### R7-R2 — current last local result

Script SHA-256:

`96dc9b7340c521a45a9b45b402ecd7b949627dc72d3bd99a2852a372b50a8d22`

R7-R2 corrected the `body_prefix` parser. The latest local output successfully reached:

- `r6_script_binding=PASS`
- `r6_evidence_binding=PASS`
- `candidate_git_authority=PASS`
- `r10_image_authority=PASS`
- `live_runtime_non_drift_current=PASS`
- `host_sentinels_current=PASS`
- `r7_parser_correction=PASS_DECODE_BODY_PREFIX_OUTER_JSON_STRING`
- `r6_manifest_integrity=PASS`
- `r6_runtime_sequence=PASS_EVENT1_THEN_NO_CREDENTIALS_THEN_EVENT2_THEN_D18_SKIP`
- `r6_chat_terminal=503_ALL_TARGETS_SKIPPED`
- `r6_chat_attempted_dispatch_count=0`
- `r6_d18_auth_keeper_skip_marker=PASS`
- `r6_provider_dispatch_for_synthetic_target=ABSENT`
- `r6_cleanup_non_drift=PASS`

It then failed at:

`d18_request_scoped_plan_missing=['authKeeperAdmissionPlanPromise', 'prepareAuthKeeperComboAdmissionPlan']`

This is currently classified as an **unresolved read-only source-owner/reconciliation assumption**, not a runtime failure. R7-R2 expected the request-scoped plan markers in `open-sse/services/combo.ts`, but the exact candidate object did not satisfy that assertion. Do not claim R7 formal acceptance until the exact source owner/call topology is reconciled.

## 8. Immediate next task

The next session should NOT rerun R12-R6 and should NOT modify production.

First action:

1. take the user's exact R7-R2 terminal output as the latest local observation;
2. inspect the exact candidate Git object at commit `5ae6f97e732263e1029b35aeccf4873ba22d4554`;
3. locate the actual owner(s) of request-scoped Auth Keeper combo-admission plan preparation/application;
4. determine why R7-R2's expected `authKeeperAdmissionPlanPromise` / `prepareAuthKeeperComboAdmissionPlan` markers were absent from `open-sse/services/combo.ts`;
5. distinguish a stale harness source-owner assumption from a real topology discrepancy;
6. produce one bounded read-only successor reconciliation only after that discriminator is proven;
7. do not weaken the runtime evidence or invent a single-consumer rule;
8. do not begin live cutover, deployment, D19 or production activation.

## 9. Engineering lessons that must carry forward

- Source ownership must be proven from the exact accepted Git object, not inferred from an earlier branch/snippet.
- `docker exec` + `node -` requires `-i` when program text is supplied on stdin.
- Synthetic Auth Keeper service-token fixtures must satisfy the production client token-file contract, including content shape and file privacy.
- Readiness probes must satisfy the same authorization contract as the endpoint being exercised.
- Separate application background egress attempts from provider dispatch; `network=none` is the hard containment authority.
- Never treat a harness log marker as proof if the underlying command output is empty; add independent state verification.
- Runtime event-count assertions must be tied to proven source consumers, not assumed architecture.
- Keep R10/R11/R12 evidence authority and live non-drift intact while reconciling R7.

## 10. New-chat handoff rule

A new chat should read this file first and treat the user's pasted R7-R2 terminal output as the newest evidence. The new chat must continue from Section 8 rather than re-running earlier R12 canaries or rediscovering already-classified harness failures.
