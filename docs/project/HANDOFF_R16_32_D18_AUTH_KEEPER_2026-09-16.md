# R16.32 D18 Auth Keeper Qualification Handoff

Last reviewed: 2026-09-17
Status: D18 qualification/reconciliation/readiness complete; H1 hardening, A1 production activation, and composite O1+O2 post-activation freeze accepted; D18 frozen live with R16.31 rollback intact; D19 not authorized

This is the canonical cross-project handoff for continuing D18 OmniRoute/Auth Keeper work. Product intent remains in `ARCHITECTURE_SOURCE_OF_TRUTH.md`; permanent engineering method remains in `ENGINEERING_SOURCE_OF_TRUTH.md`; exact accepted Git/runtime/activation/freeze evidence remains more specific than this summary.

## 1. Non-negotiable architecture boundaries

- OmniRoute owns routing/provider/orchestration/model-workforce decisions.
- Auth Keeper owns credential/session/account lifecycle and routing eligibility/admission facts.
- Operations Floor is observer/operator plane only.
- Protected native ChatGPT/OpenAI capacity must not silently become ordinary routed fleet capacity.
- D19 is not authorized by this handoff.
- Do not weaken failed assertions merely to obtain a pass; classify the exact discriminator first.

## 2. Current D18 frozen live authority

D18 activation A1 completed successfully on 2026-09-17 and the live runtime is now frozen post-activation by accepted composite O1+O2 evidence.

Current live runtime:

- container: `mer-omniroute`;
- container ID: `5e5a904141fb8f17fd8e410f4f57284bc1a4cfbc7318dca46418925a51620efd`;
- source commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`;
- source tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`;
- image: `omniroute:d18-r8-r9-candidate-linux-r10`;
- image ID: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`;
- milestone: `R16.32-D18`;
- activation: `OMNIROUTE_AUTH_KEEPER_COMBO_ADMISSION_ENABLED=1`;
- network: `mer-gateway_default`;
- restart policy: `unless-stopped`;
- runtime user: `node`;
- data volume: `omniroute-d18-live-data-5ae6f97e7322`;
- loopback ports: 20128/20129/20132;
- Auth Keeper token and workload-policy mounts: read-only.

A1 passed a 120-second stability gate. O1 later observed 3,176 seconds of uptime with health `healthy`, restart count `0`, `OOMKilled=false`, no Docker state error, exact identity/topology preserved, and a further fresh 60-second / 12-sample stability gate passed.

## 3. Live Auth Keeper / host validation

A1 and O1 both validated live D18 against Auth Keeper:

- unauthenticated connection-state request = 401;
- authenticated request = 200;
- exact contract `auth-keeper-connection-state/v1`;
- `mode=READ_ONLY`;
- `mutationPerformed=false`;
- `credentialsReturned=false`;
- `rawCredentialIncludedInOutput=false`;
- accounts array present;
- zero unexpected contract keys;
- zero forbidden secret-material keys.

O1 also reconfirmed `/healthz=200`, `/livez=200`, all loopback ports reachable, all four host sentinels unchanged, and Auth Keeper LaunchAgent plist mode `0600`.

Validation scripts made zero provider/model calls; this claim is limited to those procedures and does not characterize unrelated production traffic.

## 4. R16.31 rollback authority — RETAINED INTACT

- holder: `mer-omniroute-r16-31-rollback-d18-5ae6f97e7322`;
- state: `exited`;
- image ID: `sha256:370d49896920568bc5adbfe71316879368ec93be0cd020cf1b546fa3ef2640aa`;
- original data volume: `omniroute-r16-31-live-data-34bd2fdbb8b0`.

O2 proved the original volume still exactly matches its A1 cutover-time authority:

- `entryCount=3045`;
- `fileCount=3010`;
- `linkCount=0`;
- `fileBytes=503748301`;
- `contentDigest=1ffd01aee9b89d9ef2d231a721790a87515163f6221b9e4d8413cd2a00975f70`;
- `linkDigest=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.

Rollback cleanup is not authorized. Do not remove the holder or original volume until a separate accepted retention/cleanup phase.

## 5. O1/O2 freeze authority and harness lineage

Composite freeze result:

`PASS_D18_POST_ACTIVATION_FREEZE_COMPOSITE_O1_O2`

Accepted authority split:

- O1: live/runtime/topology/Auth Keeper/host/evidence/stability authority;
- O2: rollback-holder/original-volume integrity authority.

O1's digest failure is harness-only. Its helper combined `--user 0:0` with `--cap-drop ALL`, removing DAC read capability and causing `EACCES` on `/data/oauth/kimi-coding-device-id`. The helper exited before emitting digest fields, so the later O1 count/digest drift lines were empty-output fallout and are not independent evidence of rollback-data drift.

O2 corrected only that discriminator by preserving network-none/read-only/no-new-privileges boundaries and adding only `DAC_READ_SEARCH`. O2 reproduced the exact A1 rollback-volume authority with `o2_failure_count=0`.

Do not rerun O1 solely to produce an all-green standalone result. The accepted freeze is composite O1+O2.

## 6. Accepted authority lineage

- R10: Linux image freeze;
- R11: isolated flag-OFF runtime qualification;
- R12-R6: isolated flag-ON behavioral authority;
- R7: exact-object/AST source/call-topology reconciliation;
- R3: production-path transport/topology readiness;
- R4: activation/rollback plan authority;
- H1: Auth Keeper plist hardening;
- A1: live activation authority;
- O1+O2: post-activation freeze and rollback-integrity authority.

Do not rediscover documented R12/R7/R1-R2/O1 harness failures as product defects.

## 7. A1 evidence authority

A1 script SHA-256:

`fb48e6ebbac917004000afc87e17b2c35c86498c97db85b2b0560389b3565be3`

A1 evidence root:

`$HOME/Library/Application Support/OmniRoute/AuthKeeper/d18-live-activation-a1-20260917T154403Z`

O1 reconfirmed all seven A1 evidence files against `evidence-hashes.txt`.

## 8. Current engineering boundary

D18 pre-activation work, activation, and immediate post-activation freeze are closed.

Continue **R16.32 product work using D18 as the live baseline**, while retaining R16.31 rollback authority. D19 remains out of scope.

Until separately authorized/accepted:

- do not remove `mer-omniroute-r16-31-rollback-d18-5ae6f97e7322`;
- do not remove `omniroute-r16-31-live-data-34bd2fdbb8b0`;
- do not silently rebuild/replace the accepted D18 image;
- do not change the Auth Keeper token-file contract;
- do not restart R1-R4/O1 diagnostics without contradictory evidence;
- do not begin D19.

## 9. New-chat handoff rule

A new session must start from **D18 frozen live/accepted with R16.31 rollback retained intact**. Historical statements that D18 is not live or still awaiting freeze are superseded by A1 plus composite O1+O2. Treat A1 as live-runtime activation authority, O1+O2 as post-activation freeze authority, R12-R6 as isolated flag-ON behavioral authority, R7 as source-topology authority, R3 as production-path transport/topology authority, and R4 as activation/rollback design authority.
