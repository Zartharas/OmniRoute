# Current Project Status

Last reviewed: 2026-09-28
Status: five-pillar architecture unchanged; provider-specific OpenCode/TheOldLLM execution is on hold; qualified P4G transport retained as non-live architecture evidence; provider-neutral five-pillar convergence is active; immutable upstream v3.8.51 tag remains a separate release gate

This document records the latest accepted engineering checkpoint for the `Zartharas/OmniRoute` fork. Product intent remains in [Architecture Source of Truth](ARCHITECTURE_SOURCE_OF_TRUTH.md), engineering method remains in [Engineering Source of Truth](ENGINEERING_SOURCE_OF_TRUTH.md), long-range sequencing remains in [Master Roadmap](MASTER_ROADMAP.md), and D19's exact development contract is defined in [R16.32 D19 — Production-Safe Empirical Orchestration Evidence Readout](R16_32_D19_EMPIRICAL_ORCHESTRATION_EVIDENCE_READOUT.md).

Accepted Git objects, source hashes, runtime evidence, activation evidence and post-activation freeze evidence remain implementation authority when they are more specific than this summary.

## 1. Overall product status

The five-pillar product goal remains unchanged:

1. Codex Unified Agent
2. Unified OmniRoute AI Workforce
3. Auth Keeper
4. Intelligent Multi-Model Orchestration
5. Operations Floor

R16.32 remains an important Pillar 4 workstream, but it is not the product by itself. D18 qualification/activation/freeze, D19 hard-gate/evidence work, FreeLLMAPI signed-advisory integration, cleanup closure, and the private Auth Keeper/upstream pre-tag reconciliation through R16r35 are complete within their accepted scopes.

The current product-level next phase is a **Five-Pillar Architecture Convergence Audit** across Codex Unified, the unified OmniRoute workforce, Auth Keeper, intelligent orchestration, and Operations Floor. In parallel, the release lane waits for the immutable upstream `v3.8.51` tag before final tag-bound reconciliation. The missing tag blocks that release lane only; it does not block all remaining product engineering.

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

## 9. D19 / FreeLLM accepted boundary

D19's purpose and historical development contract remain defined in `R16_32_D19_EMPIRICAL_ORCHESTRATION_EVIDENCE_READOUT.md`, but the active D19 development framing in this older status is superseded.

Later accepted evidence established the D19 hard-gate/observation authority and then qualified and activated FreeLLMAPI as signed advisory metadata only. The authoritative post-D19 live/cleanup record is `docs/research/R16.32-POST-D19-FREELLMAPI-HANDOFF-20260921.md`.

Do not restart D19 S1-S6 or reinterpret advisory metadata as routing authority absent contradictory evidence.

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
- do not reopen, replace or mutate the accepted D19 production state without separate authorization;
- do not activate provider-neutral preference scoring merely because D19 evidence becomes available.

## 11. Publication rule

Update this status, the D19 definition/continuity record, the master roadmap and relevant Auth Keeper handoffs whenever D19 source authority, evidence semantics, accepted candidate state, live authorization, rollback retention, or the next preference-intelligence boundary changes.

## 12. 2026-09-26 product-level continuation checkpoint

### Private R16.32 pre-tag promotion

The private engineering repository `Zartharas/omniroute-auth-keeper` completed the bounded pre-tag Auth Keeper/upstream reconciliation:

- promoted branch: `feat/r16-17-auth-keeper-connection-plane`
- promoted commit: `470a9eb5d5014c0df116c9e3c5b6ae3853bda021`
- R16r33 result: `PASS_R16R33_TWO_FILE_PROMOTION`
- qualification semantic scope: FIVE files
- runtime pre-satisfied/byte-locked scope: THREE runtime files
- actual promoted mutation: TWO support files
- targeted/full-core TypeScript: GREEN
- ESLint differential: PASS_NO_NEW_DIAGNOSTICS
- five-file semantic contract: PASS
- PR #14 focused regression: GREEN
- Auth Keeper focused regression: GREEN
- frozen R16 whole-suite differential: PASS_NO_NEW_FAILURES
- remote push verified
- final worktree clean

R16r35 then completed the read-only post-promotion/readiness gate:

- result: `WAIT_R16R35_UPSTREAM_V3851_TAG`
- upstream `release/v3.8.51` observed head: `ae2ba35852d4e5a55486a1c0e6a779105564fd6d`
- immutable `v3.8.51` tag: ABSENT
- evidence root: `/Users/zarthras/Downloads/omniroute_r16_32_r16r35_tag_readiness_20260926T184148Z`
- source/ref/GitHub-metadata/Docker/live/dependency mutation by the local harness: NONE

Private continuation documentation head after the R35 update:

- `17e298e4616655b9ce9014f1f77a9ecf7e2be88f`

### Two-lane continuation

**Release lane**

- wait for immutable upstream `v3.8.51`;
- bind its exact commit/tree;
- reconcile/reapply the qualified semantics;
- rerun final qualification;
- obtain separate authorization before merge/publication/deployment/live validation.

**Product lane**

Proceed with a consolidated Five-Pillar Architecture Convergence Audit to establish, from accepted evidence:

- what is live;
- what is qualified but not live;
- what exists only historically and still needs reintegration;
- remaining Codex Unified productization;
- remaining workforce access-mode normalization;
- remaining provider-neutral preference/multi-model orchestration work;
- remaining Operations Floor convergence;
- final end-to-end acceptance gaps;
- work blocked specifically by `v3.8.51`;
- work that can proceed without mutating the frozen live baseline.

The target end-to-end path remains:

`User → Codex Unified → OmniRoute → Auth Keeper + eligible AI workforce → orchestration/fallback → response → Operations Floor evidence`.


## 13. 2026-09-28 provider-neutral convergence reset

The consolidated convergence audit is now recorded in:

`docs/project/FIVE_PILLAR_CONVERGENCE_AUDIT_20260928.md`

The project is explicitly returning to the original five-pillar architecture goal.

Current provider-specific decision:

- OpenCode live execution: HOLD;
- TheOldLLM redevelopment/live execution: HOLD;
- OpenCode adapter/tests and the qualified P4G endpoint remain preserved as architecture/qualification evidence;
- no further real OpenCode request is part of the current engineering plan;
- real-provider call budget remains zero.

Private P4G endpoint qualification established a non-live Auth Keeper credential-isolation/transport seam at candidate `c750da9aad019120ff7dfeb00f637254d8cedf74` with `PASS_P4G_AUTH_KEEPER_TRANSPORT_ENDPOINT_QUALIFICATION_R3`, 197/197 focused regressions, and zero real provider calls during endpoint qualification.

The next product engineering phase is **Provider-Neutral Workforce Contract Convergence**:

1. read-only authority inventory;
2. normalized provider-neutral access-mode/admission contract;
3. provider-neutral execution seam preserving Auth Keeper secret ownership and OmniRoute routing authority;
4. deterministic synthetic multi-mode qualification;
5. Codex Unified and Operations Floor cross-pillar convergence without changing live routing.

The immutable `v3.8.51` tag still blocks only final tag-bound release reconciliation.
