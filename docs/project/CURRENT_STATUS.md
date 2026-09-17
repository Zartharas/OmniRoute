# Current Project Status

Last reviewed: 2026-09-17
Status: D18 frozen live baseline accepted; R16.31 rollback retained intact; R16.32 D19 empirical-evidence development authorized, live D19 promotion not authorized

This document records the latest accepted engineering checkpoint for the `Zartharas/OmniRoute` fork. Product intent remains in [Architecture Source of Truth](ARCHITECTURE_SOURCE_OF_TRUTH.md), engineering method remains in [Engineering Source of Truth](ENGINEERING_SOURCE_OF_TRUTH.md), long-range sequencing remains in [Master Roadmap](MASTER_ROADMAP.md), and D19's exact development contract is defined in [R16.32 D19 — Production-Safe Empirical Orchestration Evidence Readout](R16_32_D19_EMPIRICAL_ORCHESTRATION_EVIDENCE_READOUT.md).

Accepted Git objects, source hashes, runtime evidence, activation evidence and post-activation freeze evidence remain implementation authority when they are more specific than this summary.

## 1. Overall product status

The five-pillar product goal remains unchanged:

1. Codex Unified Agent
2. Unified OmniRoute AI Workforce
3. Auth Keeper
4. Intelligent Multi-Model Orchestration
5. Operations Floor

The active program remains R16.32 under Pillar 4. D18 qualification, reconciliation, pre-activation readiness, Auth Keeper hardening, authorized activation and composite O1+O2 post-activation freeze are complete. D18 is the accepted frozen live baseline.

The next defined phase is **R16.32 D19 — Production-Safe Empirical Orchestration Evidence Readout**. D19 definition and non-live development/qualification are authorized. Production D19 activation remains a separate authorization boundary.

## 2. Current live production authority — D18

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

A1 established the live runtime and passed a 120-second stability gate. O1 later observed the same container after 3,176 seconds of uptime with state `running`, health `healthy`, restart count `0`, `OOMKilled=false`, no Docker state error, and exact source/image/data/milestone identity preserved. O1 also passed another fresh 60-second / 12-sample stability observation.

D19 development must not mutate or silently replace this live authority.

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

O1 also reconfirmed `/healthz=200`, `/livez=200`, all three loopback ports reachable, router/config/catalog/policy host sentinels unchanged, and Auth Keeper LaunchAgent plist mode `0600`.

Validation scripts made zero provider/model calls. This statement is limited to those procedures and does not characterize unrelated production traffic.

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

Rollback cleanup is **not authorized**. D19 development does not change that retention decision.

## 5. O1/O2 post-activation freeze — ACCEPTED

Composite post-activation authority:

- O1: live/runtime/topology/Auth Keeper/host/evidence/stability authority;
- O2: rollback-holder/original-volume integrity authority;
- composite result: `PASS_D18_POST_ACTIVATION_FREEZE_COMPOSITE_O1_O2`;
- D18 live authority: `FROZEN_POST_ACTIVATION`;
- R16.31 rollback authority: `RETAINED_INTACT`.

O1's rollback digest failure is permanently classified as harness-only: `--cap-drop ALL` removed DAC read capability from the root read-only helper, causing `EACCES` before digest output. Its six secondary count/digest drift lines were empty-output fallout. O2 added only `DAC_READ_SEARCH` while retaining network-none/read-only/no-new-privileges boundaries and reproduced the exact A1 counts/digests with zero failures.

Do not rerun O1 solely to obtain a standalone green result.

## 6. Auth Keeper hardening

H1 changed `$HOME/Library/LaunchAgents/com.omniroute.auth-keeper.plist` from `0644` to `0600` using a chmod-only change. Auth Keeper health remained HTTP 200 before and after, service identity remained valid, and no service restart/runtime mutation occurred.

Current accepted plist mode: `0600`.

## 7. D18 source/image authority

- branch: `feat/d18-r8-union-lockfix-linux-canary-r9`;
- commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`;
- tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`;
- parent: `13453f6bdf1c9279da3bea0d2382959c92c93d3e`;
- retained/live image ID: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`;
- platform: `linux/amd64`.

Protected D18 source hashes:

- `open-sse/services/combo.ts`: `47028689cb3a372b4afc341f13ba32e01dd006553a38de9f9837369ec5c68742`;
- `src/lib/authKeeper/comboAdmissionActivation.ts`: `062d25bd7e8ea2ac58903e43922821e66c3171e13fe892a779749d10cb1a7239`;
- `src/lib/authKeeper/comboRoutingEligibility.ts`: `adccf245faee216e168b15b3961bea427b9dd73803698f74cb351dc982328294`.

## 8. Accepted authority lineage

Current accepted authorities:

- R10: Linux-buildable retained image freeze;
- R11: isolated flag-OFF runtime qualification;
- R12-R6: isolated flag-ON behavioral authority;
- R7: exact-object/AST source/call-topology reconciliation;
- R3: production-path transport/topology readiness;
- R4: direct-Docker activation/automatic-rollback runbook review;
- H1: Auth Keeper plist hardening;
- A1: successful authorized D18 live activation;
- O1+O2: accepted D18 post-activation freeze and rollback-integrity authority.

Do not rediscover documented R12/R7/R1-R2/O1 harness defects as product defects.

A1 evidence root remains:

`$HOME/Library/Application Support/OmniRoute/AuthKeeper/d18-live-activation-a1-20260917T154403Z`

O1 reconfirmed all seven A1 bound evidence files against `evidence-hashes.txt`.

## 9. D19 active development boundary

D19 is now canonically defined in `R16_32_D19_EMPIRICAL_ORCHESTRATION_EVIDENCE_READOUT.md`.

D19 purpose: establish a bounded, secretless, production-safe empirical readout from orchestration facts D18 already computes before any future provider-neutral preference activation.

Development/non-live qualification is authorized through D19-S6. Immediate next step is **D19-S1 exact accepted-object source census**, read-only against the local accepted D18 Git object.

D19 invariants include:

- routing/selection/order/filter/fallback semantics unchanged;
- provider/model-call delta = 0;
- Auth Keeper-fetch delta = 0;
- credential-acquisition delta = 0;
- no readback from D19 evidence into routing;
- bounded in-memory aggregate only;
- secretless/low-cardinality readout;
- no persistence migration;
- unexpected observation state contained and never allowed to fail the routed request.

Production D19 activation (S7) is **not authorized** by the current continuation authorization and requires a separate explicit live-cutover decision after S1-S6 evidence is accepted.

## 10. Current guardrails

Until separately authorized/accepted:

- do not remove the retained R16.31 rollback holder;
- do not remove the original R16.31 data volume;
- do not silently rebuild or replace the accepted D18 live image;
- do not change the Auth Keeper token-file contract;
- do not restart R1-R4/O1 diagnostics without contradictory evidence;
- do not activate D19 in production;
- do not activate provider-neutral preference scoring merely because D19 evidence becomes available.

## 11. Publication rule

Update this status, the D19 definition/continuity record, the master roadmap and relevant Auth Keeper handoffs whenever D19 source authority, evidence semantics, accepted candidate state, live authorization, rollback retention, or the next preference-intelligence boundary changes.