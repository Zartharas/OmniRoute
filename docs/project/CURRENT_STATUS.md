# Current Project Status

Last reviewed: 2026-09-17
Status: Canonical R16.32 D18 checkpoint; D18 production activation and composite post-activation freeze accepted, R16.31 rollback authority retained intact, D19 not authorized

This document records the latest accepted engineering checkpoint for the `Zartharas/OmniRoute` fork. Product intent remains in [Architecture Source of Truth](ARCHITECTURE_SOURCE_OF_TRUTH.md), engineering method remains in [Engineering Source of Truth](ENGINEERING_SOURCE_OF_TRUTH.md), and detailed continuity remains in [R16.32 D18 Auth Keeper Qualification Handoff](HANDOFF_R16_32_D18_AUTH_KEEPER_2026-09-16.md).

Accepted Git objects, source hashes, runtime evidence, activation evidence and post-activation freeze evidence remain implementation authority when they are more specific than this summary.

## 1. Overall product status

The five-pillar product goal remains unchanged:

1. Codex Unified Agent
2. Unified OmniRoute AI Workforce
3. Auth Keeper
4. Intelligent Multi-Model Orchestration
5. Operations Floor

The active program remains R16.32 under Pillar 4. D18 qualification, source/runtime reconciliation, pre-activation readiness, runbook review, Auth Keeper hardening, authorized live activation and post-activation freeze are complete. D18 is the accepted live OmniRoute baseline. This checkpoint does not authorize D19.

## 2. Current live production authority — D18

Authorized live activation A1 completed successfully on 2026-09-17 and is now followed by an accepted composite O1+O2 post-activation freeze.

Current live authority:

- container: `mer-omniroute`;
- live container ID: `5e5a904141fb8f17fd8e410f4f57284bc1a4cfbc7318dca46418925a51620efd`;
- source commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`;
- source tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`;
- image tag: `omniroute:d18-r8-r9-candidate-linux-r10`;
- image ID: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`;
- milestone label: `R16.32-D18`;
- activation: `OMNIROUTE_AUTH_KEEPER_COMBO_ADMISSION_ENABLED=1`;
- network: `mer-gateway_default`;
- restart policy: `unless-stopped`;
- runtime user: `node`;
- data volume: `omniroute-d18-live-data-5ae6f97e7322`;
- ports 20128, 20129 and 20132 bound to `127.0.0.1` only;
- Auth Keeper service-token mount read-only;
- workload-policy mount read-only.

A1 established the live runtime and passed a 120-second stability gate. O1 later observed the same container after 3,176 seconds of uptime with:

- state `running`;
- health `healthy`;
- restart count `0`;
- `OOMKilled=false`;
- no Docker state error;
- exact source/image/data/milestone identity preserved.

O1 then passed another fresh 60-second / 12-sample stability observation.

## 3. Live Auth Keeper and host authority

A1 and O1 independently validated the live D18 container against Auth Keeper:

- unauthenticated connection-state request = 401;
- authenticated request = 200;
- exact `auth-keeper-connection-state/v1` contract;
- `mode=READ_ONLY`;
- `mutationPerformed=false`;
- `credentialsReturned=false`;
- `rawCredentialIncludedInOutput=false`;
- accounts array present;
- zero unexpected contract keys;
- zero forbidden secret-material keys.

O1 also reconfirmed:

- `/healthz` = 200;
- `/livez` = 200;
- loopback ports 20128/20129/20132 reachable;
- router/config/catalog/policy host sentinels unchanged;
- Auth Keeper LaunchAgent plist mode remains `0600`.

Validation scripts made zero provider/model calls. This statement is limited to the validation procedures and does not characterize unrelated production traffic.

## 4. Retained R16.31 rollback authority — INTACT

R16.31 remains deliberately retained as rollback authority:

- rollback holder: `mer-omniroute-r16-31-rollback-d18-5ae6f97e7322`;
- holder state: `exited`;
- image ID: `sha256:370d49896920568bc5adbfe71316879368ec93be0cd020cf1b546fa3ef2640aa`;
- original data volume: `omniroute-r16-31-live-data-34bd2fdbb8b0`.

O2 proved the original R16.31 data volume still exactly matches its A1 cutover-time authority:

- entry count: `3045`;
- file count: `3010`;
- symlink count: `0`;
- file bytes: `503748301`;
- content digest: `1ffd01aee9b89d9ef2d231a721790a87515163f6221b9e4d8413cd2a00975f70`;
- link digest: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.

O2 used a network-none, read-only helper with the rollback volume mounted read-only. It dropped all capabilities and added only `DAC_READ_SEARCH`, which was necessary to read protected rollback files without granting write authority.

Rollback cleanup is **not authorized**. Do not remove the rollback holder or original R16.31 volume until a separately accepted retention/cleanup phase.

## 5. O1/O2 post-activation freeze — ACCEPTED

Composite post-activation authority:

- O1 is accepted for all live/runtime/topology/Auth Keeper/host/evidence/stability gates;
- O2 is accepted for rollback-holder and original-volume integrity;
- composite result: `PASS_D18_POST_ACTIVATION_FREEZE_COMPOSITE_O1_O2`;
- D18 live authority: `FROZEN_POST_ACTIVATION`;
- R16.31 rollback authority: `RETAINED_INTACT`.

O1's rollback digest failure is classified as **harness-only**. The helper used `--user 0:0` together with `--cap-drop ALL`; removing DAC read capability caused `EACCES` on `/data/oauth/kimi-coding-device-id`. Because the helper exited before emitting digest fields, the six O1 count/digest “drift” findings were empty-output fallout and are invalid as independent drift evidence.

O2 corrected only that discriminator by retaining the read-only/network-none boundary while adding `--cap-add DAC_READ_SEARCH`. O2 then reproduced the exact A1 rollback-volume counts and digests with failure count zero.

Do not rerun O1 solely to obtain a green line. The accepted freeze is the composite O1+O2 result.

## 6. Auth Keeper hardening

The former LaunchAgent permission finding is closed.

H1 changed `$HOME/Library/LaunchAgents/com.omniroute.auth-keeper.plist` from `0644` to `0600` using a chmod-only change. Auth Keeper health remained HTTP 200 before and after, service identity remained valid, and no service restart/runtime mutation occurred.

Current accepted plist mode: `0600`.

## 7. D18 source/image authority

- branch: `feat/d18-r8-union-lockfix-linux-canary-r9`;
- commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`;
- tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`;
- parent: `13453f6bdf1c9279da3bea0d2382959c92c93d3e`;
- retained/live image ID: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`;
- platform: `linux/amd64`.

D18 source hashes:

- `open-sse/services/combo.ts`: `47028689cb3a372b4afc341f13ba32e01dd006553a38de9f9837369ec5c68742`;
- `src/lib/authKeeper/comboAdmissionActivation.ts`: `062d25bd7e8ea2ac58903e43922821e66c3171e13fe892a779749d10cb1a7239`;
- `src/lib/authKeeper/comboRoutingEligibility.ts`: `adccf245faee216e168b15b3961bea427b9dd73803698f74cb351dc982328294`.

## 8. Accepted authority lineage

Current accepted authorities:

- R10: Linux-buildable retained image freeze;
- R11: isolated flag-OFF runtime qualification;
- R12-R6: isolated flag-ON behavioral authority;
- R7: formal exact-object/AST source/call-topology reconciliation;
- R3: production-path transport/topology readiness;
- R4: direct-Docker activation/automatic-rollback runbook review;
- H1: Auth Keeper plist hardening;
- A1: successful authorized D18 live activation;
- O1+O2 composite: accepted D18 post-activation freeze and rollback-integrity authority.

Do not rediscover documented R12/R7/R1-R2/O1 harness defects as product defects.

A1 evidence root remains:

`$HOME/Library/Application Support/OmniRoute/AuthKeeper/d18-live-activation-a1-20260917T154403Z`

O1 reconfirmed all seven A1 bound evidence files against `evidence-hashes.txt`.

## 9. Current active boundary

D18 is live, accepted, and frozen post-activation. The pre-activation and immediate post-activation freeze phases are closed.

The safe continuation point is **R16.32 product work using D18 as the live baseline**, while retaining R16.31 rollback authority. D19 is not authorized by this checkpoint.

Until separately authorized/accepted:

- do not remove the retained R16.31 rollback holder;
- do not remove the original R16.31 data volume;
- do not silently rebuild or replace the accepted D18 image;
- do not change the Auth Keeper token-file contract;
- do not restart R1-R4/O1 diagnostics without new contradictory evidence;
- do not begin D19.

## 10. Publication rule

Update this status and the D18 handoff whenever live D18 authority, rollback retention, source/image authority, Auth Keeper integration, later R16.32 product work, cleanup authorization, or D19 authorization changes.
