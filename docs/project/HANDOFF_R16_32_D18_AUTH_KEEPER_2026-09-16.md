# R16.32 D18 Auth Keeper Qualification Handoff

Last reviewed: 2026-09-17
Status: D18 isolated qualification and formal source/runtime reconciliation accepted; production activation still blocked pending separate authorization

This is the canonical cross-project handoff for continuing D18 OmniRoute/Auth Keeper work. It records evidence/status only. Product intent remains in `ARCHITECTURE_SOURCE_OF_TRUTH.md`; permanent engineering method remains in `ENGINEERING_SOURCE_OF_TRUTH.md`; exact accepted Git/runtime evidence remains more specific than this summary.

## 1. Non-negotiable boundaries

- OmniRoute owns routing/provider/orchestration/model-workforce decisions.
- Auth Keeper owns credential/session/account lifecycle and routing eligibility/admission facts.
- Operations Floor is observer/operator plane only.
- Protected native ChatGPT/OpenAI capacity must not silently become ordinary routed fleet capacity.
- No production activation, deployment, cutover or D19 is authorized by this handoff.
- No real credentials or uncontrolled real provider/model calls were used in the accepted isolated D18 qualification lineage.
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

Host sentinels:

- router: `da5599b7c8cb0c6d755657069e5d2090b9e7d83edd4cbad4af3ed44c8495de97`
- config: `2d731cb44980792ba010e51a865e1b11a99dc50b2c2ca0a50aaf903e5d8ae690`
- model catalog: `6e88a9611dbc8978d2795fb14ce4fff0eabb82c2e68609b8c3994da92489250d`
- workload policy: `2bf6ecd48cd4d1e604c71af28dbf4a0606aba34fbd1c33c16762836b45d47a31`

No qualification step in this lineage replaced or mutated the live OmniRoute container or live Auth Keeper.

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
- genuine combo seed and independent SQLite verification;
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

### Exact plan ownership

Exact candidate source proved:

- `prepareAuthKeeperComboAdmissionPlan` owner: `src/lib/authKeeper/comboRoutingEligibility.ts`;
- memoization owner: `src/lib/authKeeper/comboAdmissionActivation.ts::createAuthKeeperComboAdmissionPlanProvider`;
- request-scoped memoization variable: `planPromise`;
- `combo.ts` request-path accessor: `getAuthKeeperAdmissionPlan`;
- admission application: `applyAuthKeeperComboAdmission` in `comboRoutingEligibility.ts`;
- connection-state fetch funnel: `connectionStateRoutingEligibility.ts`.

### Reconciliation of GET #1

TypeScript AST analysis of exact commit `5ae6f97e...` proved:

- `src/sse/handlers/chat.ts::checkModelAvailable` exists once;
- it calls `getProviderCredentialsWithQuotaPreflight`;
- the same callback is structurally passed to `handleComboChat` as `isModelAvailable: checkModelAvailable`;
- `targetResolution.ts` passes `isModelAvailable` to `preScreenTargets`;
- `preScreenTargets` calls the callback;
- the `auth.ts` call graph is `getProviderCredentialsWithQuotaPreflight -> getProviderCredentials`;
- `getProviderCredentials` is the single owner of both `applyAuthKeeperConnectionStateRoutingEligibility` and the later `No credentials for ${provider}` log;
- source order is Auth Keeper eligibility filtering first, then the no-credentials terminal marker.

Therefore GET #1 is reconciled to availability/credential pre-screen.

### Reconciliation of GET #2

Exact candidate source proved the independent lazy admission path:

- `createAuthKeeperComboAdmissionPlanProvider` owns `planPromise`;
- the returned accessor memoizes a single `prepare(targets, { env })` promise;
- destructured parameter default binds `prepare` to `prepareAuthKeeperComboAdmissionPlan as AuthKeeperComboAdmissionPrepare`;
- `prepareAuthKeeperComboAdmissionPlan` uses `defaultApplyEligibility`;
- `defaultApplyEligibility` calls `applyAuthKeeperConnectionStateRoutingEligibility`;
- that funnels to `requestConnectionState` and then the client endpoint `/v1/omniroute/connection-state`;
- `combo.ts` later applies `applyAuthKeeperComboAdmission` and emits the D18 exclusion marker on skip.

Therefore GET #2 is reconciled to the separately memoized D18 admission-plan path.

### Formal runtime/source reconciliation

The exact candidate topology supports the R12-R6 observed order without changing or inventing an expected event count:

1. GET #1 — availability/credential pre-screen;
2. `No credentials for openai`;
3. GET #2 — lazy D18 admission-plan preparation;
4. `Auth Keeper routing eligibility excluded the target`;
5. terminal `ALL_TARGETS_SKIPPED`, `attempted:0`, no target-specific provider dispatch.

R7 source/call-topology reconciliation status: **ACCEPTED / CLOSED**.

No additional runtime canary was required.

## 7. Harness failures that must not be rediscovered

### R12 lineage

- R12 — wrong source owner for `applyAuthKeeperComboAdmission`.
- R12-R2 — synthetic server token-path mismatch.
- R12-R3 — unauthorized readiness probe expected 404 instead of correct 401.
- R12-R4 — missing `docker exec -i` for `node -` heredoc stdin.
- R12-R5 — synthetic service token violated private 64-hex token-file contract.

### R7 reconciliation lineage

- R7 — escaped `body_prefix` parser defect.
- R7-R2/R7-R3 — stale plan-symbol/source-owner assumption.
- R7-R4 — Bash 4 `mapfile` incompatible with macOS `/bin/bash` 3.2.
- R7-R6 — ordinary `const` assignment misclassified as function declaration.
- R7-R7 — arbitrary line-proximity assertion for callback wiring.
- R7-R8 — TypeScript inline parameter object type mistaken for arrow-function body.
- R7-R9 — AST query looked for the `prepare` default on `Parameter.initializer`; the actual default is on a destructured parameter `BindingElement`.

R7-R9 still produced accepted AST evidence for the complete first path, pre-screen callback, auth call graph, and shared connection-state HTTP funnel. The exact-object R7-R5/R7-R6 source evidence had already proven the remaining second-path binding/topology, so no R7-R10 was necessary.

## 8. Active next boundary

D18 isolated qualification plus formal source/runtime reconciliation is complete.

Do not rerun R12-R6 or create another topology-discovery script unless new contradictory evidence appears.

Any production activation/cutover must be a separately authorized phase with its own live-baseline, fail-closed activation, validation and rollback controls.

Until explicit authorization is given:

- do not activate D18 in production;
- do not replace the live OmniRoute container;
- do not deploy/cut over;
- do not mutate live Auth Keeper;
- do not begin D19.

## 9. Engineering lessons carried forward

- Prove source ownership from the exact accepted Git object.
- Prefer TypeScript AST/semantic guards over raw occurrence, brace, regex or line-proximity assumptions.
- Validate scripts against the actual operator shell/runtime, including macOS Bash 3.2 compatibility.
- Do not treat a total runtime event count as architectural truth until exact consumers are proven.
- Preserve R10/R11/R12 evidence authority and live non-drift during reconciliation.
- A harness failure is not a product defect until the product discriminator is actually proven.

## 10. New-chat handoff rule

A new session should treat this document and `CURRENT_STATUS.md` as the accepted D18 checkpoint. Do not restart from R7-R2, rerun R12 canaries, or rediscover the historical harness failures above.
