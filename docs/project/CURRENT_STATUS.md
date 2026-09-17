# Current Project Status

Last reviewed: 2026-09-17
Status: Canonical R16.32 D18 checkpoint; D18 production activation accepted and live, R16.31 rollback authority retained, D19 not authorized

This document records the latest accepted engineering checkpoint for the `Zartharas/OmniRoute` fork. Product intent remains in [Architecture Source of Truth](ARCHITECTURE_SOURCE_OF_TRUTH.md), engineering method remains in [Engineering Source of Truth](ENGINEERING_SOURCE_OF_TRUTH.md), and the detailed continuity record remains in [R16.32 D18 Auth Keeper Qualification Handoff](HANDOFF_R16_32_D18_AUTH_KEEPER_2026-09-16.md).

Accepted Git objects, source hashes, runtime evidence and exact activation evidence remain implementation authority when they are more specific than this summary.

## 1. Overall product status

The five-pillar product goal remains unchanged:

1. Codex Unified Agent
2. Unified OmniRoute AI Workforce
3. Auth Keeper
4. Intelligent Multi-Model Orchestration
5. Operations Floor

The active program remains R16.32 under Pillar 4. D18 isolated qualification, source/runtime reconciliation, pre-activation readiness, runbook review, hardening, and authorized live activation are complete. D18 is now the live OmniRoute runtime. This does not authorize D19.

## 2. Current live production authority — D18

Authorized live activation A1 completed successfully on 2026-09-17.

Current live authority:

- container: `mer-omniroute`;
- live container ID: `5e5a904141fb8f17fd8e410f4f57284bc1a4cfbc7318dca46418925a51620efd`;
- source commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`;
- source tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`;
- image tag: `omniroute:d18-r8-r9-candidate-linux-r10`;
- image ID: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`;
- cutover milestone label: `R16.32-D18`;
- activation: `OMNIROUTE_AUTH_KEEPER_COMBO_ADMISSION_ENABLED=1`;
- network: `mer-gateway_default`;
- restart policy: `unless-stopped`;
- runtime user: `node`;
- data volume: `omniroute-d18-live-data-5ae6f97e7322`;
- ports 20128, 20129 and 20132 remain bound to `127.0.0.1` only;
- Auth Keeper service-token mount remains read-only;
- workload-policy mount remains read-only;
- Docker health after activation and after the 120-second stability gate: `healthy`;
- restart count: `0`.

A1 host validation passed `/healthz` = 200, `/livez` = 200, all three loopback ports reachable, and all four host sentinels unchanged.

A1 live Auth Keeper validation passed:

- unauthenticated connection-state request = 401;
- authenticated request = 200;
- exact `auth-keeper-connection-state/v1` contract;
- `mode=READ_ONLY`;
- `mutationPerformed=false`;
- `credentialsReturned=false`;
- `rawCredentialIncludedInOutput=false`;
- zero unexpected contract keys;
- zero forbidden secret-material keys.

The activation script itself made zero provider/model calls. This statement is limited to the activation procedure and is not a claim about unrelated production traffic.

A1 evidence root:

`$HOME/Library/Application Support/OmniRoute/AuthKeeper/d18-live-activation-a1-20260917T154403Z`

## 3. Retained R16.31 rollback authority

R16.31 remains deliberately retained as rollback authority after successful D18 activation:

- rollback holder: `mer-omniroute-r16-31-rollback-d18-5ae6f97e7322`;
- holder state: `exited`;
- image ID: `sha256:370d49896920568bc5adbfe71316879368ec93be0cd020cf1b546fa3ef2640aa`;
- original data volume: `omniroute-r16-31-live-data-34bd2fdbb8b0`;
- original R16.31 data volume remains untouched and retained.

Do not remove the rollback holder or original R16.31 data volume until a separately accepted cleanup/retention decision is made.

## 4. Auth Keeper hardening

The previously open LaunchAgent permission hardening item is closed.

H1 changed `$HOME/Library/LaunchAgents/com.omniroute.auth-keeper.plist` from mode `0644` to `0600` using a chmod-only change. Auth Keeper health remained HTTP 200 before and after, service identity remained valid, and no Auth Keeper service restart/runtime mutation occurred.

Current accepted plist mode: `0600`.

## 5. D18 source/image authority

- branch: `feat/d18-r8-union-lockfix-linux-canary-r9`;
- commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`;
- tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`;
- parent: `13453f6bdf1c9279da3bea0d2382959c92c93d3e`;
- candidate delta: `package.json`, `package-lock.json`;
- retained/live image ID: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`;
- platform: `linux/amd64`.

D18 source hashes:

- `open-sse/services/combo.ts`: `47028689cb3a372b4afc341f13ba32e01dd006553a38de9f9837369ec5c68742`;
- `src/lib/authKeeper/comboAdmissionActivation.ts`: `062d25bd7e8ea2ac58903e43922821e66c3171e13fe892a779749d10cb1a7239`;
- `src/lib/authKeeper/comboRoutingEligibility.ts`: `adccf245faee216e168b15b3961bea427b9dd73803698f74cb351dc982328294`.

## 6. Accepted qualification lineage

The following remain accepted historical authorities:

- R10: Linux-buildable retained image freeze;
- R11: isolated flag-OFF runtime qualification;
- R12-R6: first valid isolated flag-ON runtime authority;
- R7: formal exact-object/AST source/call-topology reconciliation;
- R3: pre-activation production-path transport/topology readiness;
- R4: fail-closed direct-Docker activation/automatic-rollback runbook review;
- H1: Auth Keeper plist hardening;
- A1: successful authorized D18 live activation.

Do not rediscover documented R12/R7/R1-R2 harness/validator defects as product defects.

## 7. A1 activation transaction facts

A1:

- revalidated exact R16.31 prestate and host sentinels;
- reconstructed 17 operator overrides into a private `0600` temporary env-file without printing/hashing values;
- passed the root clone-helper positive pre-cutover probe;
- stopped and retained R16.31 as the rollback holder;
- cloned 3,045 entries / 3,010 files / 503,748,301 bytes into the new D18 volume;
- matched source/destination content digest `1ffd01aee9b89d9ef2d231a721790a87515163f6221b9e4d8413cd2a00975f70`;
- started exact D18 image and validated preserved topology;
- validated Auth Keeper secretless routing-state access;
- passed a 120-second post-cutover stability observation with health healthy and restart count zero;
- retained R16.31 rollback container and original data volume;
- generated seven evidence-file hashes;
- did not mutate source or Git;
- did not begin D19.

A1 result: **PASS_D18_LIVE_ACTIVATION_A1**.

## 8. Current active boundary

D18 is live and accepted. The immediate engineering boundary is post-activation observation/freeze and rollback-retention management, not another pre-activation diagnostic.

Until a later explicit authorization/accepted phase:

- do not remove the retained R16.31 rollback holder;
- do not remove the original R16.31 data volume;
- do not rebuild or silently replace the accepted D18 image;
- do not mutate the Auth Keeper token-file contract;
- do not begin D19;
- do not interpret historical pre-activation statements that D18 was not live as current authority.

## 9. Publication rule

Update this status and the D18 handoff whenever live D18 authority, rollback retention, source/image authority, Auth Keeper integration, post-activation validation, or D19 authorization changes.
