# Current Project Status

Last reviewed: 2026-09-30
Status: cumulative five-pillar product semantics qualified non-live through E2; F1 R1 invalidated by an untracked plugin dependency-install/network blind spot; F1 R2 failed closed on npm-ci/plugin-lock compatibility after the offline OS network boundary passed; repaired F1 R3 original-lock semantic-closure qualification pending; final merge/publication/deployment/live activation remains separately authorized; OpenCode/TheOldLLM execution remains on hold

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

Provider-neutral convergence, Codex Unified productization, adopted multi-model orchestration semantics, cumulative canonical integration, and RC2 build/pack provenance are now qualified non-live. The active boundary is **separate cutover/live-acceptance authorization**; no merge, release publication, deployment, or live activation is implied. The original upstream repository remains a compatibility source and does not gate the fork's release.

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

**Historical R16.32 upstream-sync lane**

- the former upstream `v3.8.51` wait is retained as historical sync evidence only;
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

The immutable upstream `v3.8.51` tag is not required for fork-owned release qualification.


## 14. 2026-09-29 five-pillar non-live architecture acceptance

The provider-neutral A→E convergence sequence is complete and recorded in:

`docs/project/FIVE_PILLAR_NONLIVE_ACCEPTANCE_20260929.md`

Qualified private stack:

- P5A: `bcb0c6914550fddf305861c3b0b37db854d631c9`
- P5B: `c700526117ec6b02ac22f540c5163a97b03952f6`
- P5C: `2c4ea40d3aadec6911aa4a5ac4a3c8a95b20e1d4`
- P5C2: `bfb6331c73da2ea2b404e554a8b17be26e52f25b`
- P5D: `28485d63ada9aa939472a107b85ed90d4732b90b`
- P5E: `654dc956ce09bcb7c57995c3c292f663352f2d22`

Definitive P5E result:

`PASS_P5E_CROSS_PILLAR_CONVERGENCE_QUALIFICATION_R1`

`P5E_QUALIFIED_NONLIVE_CROSS_PILLAR`

Provider-neutral convergence PRM #31 is closed.

Current architecture state:

`FIVE_PILLAR_ARCHITECTURE=QUALIFIED_NONLIVE`

`PROVIDER_NEUTRAL_CONVERGENCE=COMPLETE`

Still not authorized/complete:

- merge;
- release publication;
- deployment/cutover;
- activated live multi-model orchestration;
- canonical tag-bound build provenance;
- post-cutover stability/non-drift.

Product acceptance remains tracked by private PRM #20. Tag-bound release reconciliation remains private PRM #19.


## 2026-09-30 canonical integration reconciliation

The exact qualified P5E head has now been reconciled as the canonical non-live integration view in the private engineering repository.

Canonical private integration PR:

- PR #39 — `[Integration] Canonical five-pillar qualified non-live stack`
- base: `470a9eb5d5014c0df116c9e3c5b6ae3853bda021`
- head: `654dc956ce09bcb7c57995c3c292f663352f2d22`
- topology: 183 ahead / 0 behind
- merge base: exact base
- draft / unmerged / mergeable

Authoritative canonical-integration qualification:

- R1: INVALID false-pass lineage evidence (preserved)
- R2 qualification commit: `658bb18c38b1427aa0e67f57ad1e94e6aef957bd`
- result: `PASS_CANONICAL_FIVE_PILLAR_INTEGRATION_QUALIFICATION_R2`
- status: `CANONICAL_INTEGRATION_QUALIFIED_NONLIVE_EXACT_LINEAGE`

R2 proved:

- P4E + P5A→P5E exact ancestry;
- P4F/P4G/P4G endpoint excluded from the canonical lineage;
- integration ref exactly equals qualified P5E;
- all P5 and P2–P4 regression gates remain green;
- type/file-size/nonmutation gates pass;
- no real provider call;
- no live activation;
- no merge authorization.

Current product state:

`FIVE_PILLAR_ARCHITECTURE=QUALIFIED_NONLIVE`

`PROVIDER_NEUTRAL_CONVERGENCE=COMPLETE`

`CANONICAL_INTEGRATION=QUALIFIED_NONLIVE_EXACT_LINEAGE`

Remaining blocker:

`FORK_RELEASE_PROVENANCE=ACTIVE`

`UPSTREAM_TAG_REQUIRED=NO`

Do not chase the moving upstream release branch; evaluate upstream changes later as optional compatibility inputs.


## 2026-09-30 fork-owned release authority correction

Canonical decision:

- public fork authority: `Zartharas/OmniRoute`;
- private implementation/release-evidence authority: `Zartharas/omniroute-auth-keeper`;
- release candidate ref: `release/five-pillar-qualified-20260930-rc1`;
- release candidate source: `654dc956ce09bcb7c57995c3c292f663352f2d22`;
- upstream tag required: NO.

Decision record:

`docs/project/FORK_RELEASE_AUTHORITY_20260930.md`

Active next phase:

`FORK_OWNED_RELEASE_PROVENANCE_QUALIFICATION`


## Authoritative continuation handoff — 2026-09-30

For the next chat/session, read first:

`docs/project/CHAT_HANDOFF_20260930_FORK_RELEASE_PROVENANCE.md`

It supersedes older wording that treated the original upstream `v3.8.51` tag as a fork release blocker.

Current active phase:

`FORK_OWNED_RELEASE_PROVENANCE_QUALIFICATION`

Frozen local qualification:

- branch: `qualification/fork-owned-release-provenance-r1`
- commit: `7c92fbb13d66216d11c6219917e3ecf9d5596021`
- harness bytes: `19731`
- harness SHA-256: `f252228a299920fb197171871bfcdc6bcebf736c2a56a41abc0786ebf6cf5f00`

Release candidate:

`release/five-pillar-qualified-20260930-rc1`

Exact source:

`654dc956ce09bcb7c57995c3c292f663352f2d22`


## 2026-09-30 R4 provenance checkpoint

Fork-owned release provenance is accepted non-live through R4.

- candidate: `654dc956ce09bcb7c57995c3c292f663352f2d22`
- R4 qualification commit: `232c878b57d0343061e45c60b838c1ca1a7a7a83`
- result: `PASS_FORK_OWNED_RELEASE_PROVENANCE_QUALIFICATION_R4`
- release build profile: documented webpack fallback
- BUILD_SHA: `654dc956c`
- tarball bytes: `73337993`
- tarball SHA-256: `e9260796923cfa689da8473a30983319931820f74adbbc9473867886c660330f`
- release-manifest SHA-256: `57a661b444d51cab4d688a2735454fea8bac60b2d03776aa7c579f8a2303ee48`
- source and active-worktree nonmutation: PASS
- dependency installation: NO
- real provider calls: NO

Turbopack is not qualified for this candidate; R3 reproduced the upstream internal build panic. The qualified source was not changed.

Active next phase:
`CODEX_UNIFIED_CONTROL_PLANE_PRODUCTIZATION`

First gate:
`CODEX_UNIFIED_READ_ONLY_AUTHORITY_CENSUS`

Private trackers: #20, #38 and #40 in `Zartharas/omniroute-auth-keeper`.

Merge, publication and live activation remain separately authorized.


## 15. 2026-09-30 cumulative post-productization F1 acceptance

The cumulative productized five-pillar stack is now qualified non-live through F1.

Canonical cumulative candidate:

`5702c3bbd6eb50d720a04d99fbeb81e586f5cd09`

Direct post-P5E chain:

`P5E → B1 → C1 → D1 → E1 → E2`

where:

- B1 establishes maintained Codex Unified control-plane authority;
- C1 establishes one Codex-facing agent with one acting mutation owner and contribution-only delegated workers;
- D1 establishes same-session contributor continuity without manual Codex restart;
- E1 establishes independent specialist / critique / judge roles with acting-owner synthesis;
- E2 establishes deterministic evidence binding across specialist → critique → judge → synthesis;
- answer fusion remains `NOT_ADOPTED`.

Cumulative integration:

- private PR #42 — `[Integration] Productized five-pillar qualified non-live stack`;
- base: `470a9eb5d5014c0df116c9e3c5b6ae3853bda021`;
- head: `5702c3bbd6eb50d720a04d99fbeb81e586f5cd09`;
- topology: 188 ahead / 0 behind;
- open / draft / unmerged / mergeable.

Historical PR #39 remains preserved at exact P5E and is not rewritten.

RC2:

`release/five-pillar-productized-20260930-rc2`

Exact source:

`5702c3bbd6eb50d720a04d99fbeb81e586f5cd09`

Authoritative F1 result:

`PASS_POST_PRODUCTIZATION_CANONICAL_INTEGRATION_RELEASE_F1_QUALIFICATION_R1`

`POST_PRODUCTIZATION_CANONICAL_INTEGRATION_RELEASE_QUALIFIED_NONLIVE`

Accepted F1 evidence includes:

- exact integration/release/historical-P5E refs;
- exact 188/0 lineage and direct P5E→B1→C1→D1→E1→E2 parent chain;
- productization contracts: 83/83 PASS;
- P5E: 9/9;
- P5D: 11/11;
- P5C2: 11/11;
- P5C: 12/12;
- P5B: 9/9;
- P5A: 15/15;
- P2–P4 regression set: 144/144;
- core typecheck: PASS;
- OpenSSE typecheck: PASS at the frozen five-error baseline;
- documented webpack release build: PASS;
- expected/dist/standalone BUILD_SHA: `5702c3bbd`;
- pack-artifact provenance: PASS;
- tarball SHA-256: `bc39bb18ef73eec15911e93944a44a669a8690404d4bd6965c099b136e069402`;
- RC2 release-manifest SHA-256: `dfd53fbbb59d25901afb98993869f2c54ad8d10732e1bda3272da1f49a3c6063`;
- dependency installation: NO;
- real provider calls: NO;
- source/qualification/active-worktree nonmutation: PASS.

Private PRM #43 is complete and closed.

Current formal boundary:

`NONLIVE_PRODUCT_ACCEPTANCE=COMPLETE_THROUGH_F1`

`FINAL_RELEASE_CUTOVER_ACCEPTANCE=INCOMPLETE`

`MERGE=NOT_AUTHORIZED`

`RELEASE_PUBLICATION=NOT_AUTHORIZED`

`LIVE_ACTIVATION=NOT_AUTHORIZED`

Remaining parent acceptance work is intentionally outside the non-live qualification lane:

- separately authorized merge/publication/deployment/live validation;
- activated multi-model orchestration acceptance if explicitly authorized;
- post-cutover stability/final non-drift after an authorized cutover.


## 16. 2026-09-30 F1 R1 provenance correction

The F1 R1 terminal PASS recorded in the immediately preceding section is **not accepted** as release-provenance authority.

The complete operator output showed that the RC2 release build executed an npm dependency install inside the standalone `@omniroute/opencode-plugin` package:

`added 78 packages in 3s`

Exact-source inspection of candidate `5702c3bb...` confirms that `scripts/build/prepublish.ts` runs npm `install` when the plugin-local `node_modules` directory is absent. A fresh detached qualification worktree therefore exercises that installation path.

This conflicts with the harness's final hard-coded claim:

`dependency_installation=NO`

and means F1 R1 did not establish the intended network-denied supply-chain provenance boundary.

Corrected authority:

- cumulative E2 product semantics: QUALIFIED_NONLIVE;
- cumulative canonical lineage through P5E→B1→C1→D1→E1→E2: retained;
- F1 R1 product/regression/type evidence: retained as useful evidence;
- F1 R1 RC2 release-provenance PASS: INVALID;
- candidate source: unchanged at `5702c3bbd6eb50d720a04d99fbeb81e586f5cd09`;
- provider/model calls: 0;
- merge/publication/deployment/live activation: not authorized.

Formal correction:

`F1_R1=INVALID_FALSE_PASS_DEPENDENCY_INSTALLATION_BLIND_SPOT`

`RC2_RELEASE_PROVENANCE=PENDING_REPAIRED_F1_R2`

Next bounded gate:

`POST_PRODUCTIZATION_F1_R2_OFFLINE_DEPENDENCY_PROVENANCE`

Do not mutate the accepted E2 source merely to repair this qualification defect.


## 17. 2026-09-30 F1 R2 failure / R3 active provenance gate

F1 R2 correctly failed closed before release build execution.

Passed before failure:
- exact qualification identity;
- exact E2/integration/release refs;
- direct P5E→B1→C1→D1→E1→E2 lineage;
- root toolchain APFS clone materialization;
- exact source/plugin/prepublish provenance;
- OS network sandbox self-test;
- npm offline mode.

First failure:
`plugin_dependency_offline_install`

npm `ci` rejected the standalone plugin lockfile with:
`Missing: @omniroute/opencode-plugin@0.2.1 from lock file`.

The candidate lock contains root metadata under `packages[""]` but no self-entry under `packages["node_modules/@omniroute/opencode-plugin"]`.

This is not sufficient evidence to mutate the qualified E2 source.

R3 is frozen as a provenance-only repair:

- branch: `qualification/post-productization-integration-release-f1-r3`;
- commit: `568d4cedfa7c6347fcfdc349fb83e4436f63a3dd`;
- harness blob: `d610a9cd7c7c9c972bc5d779d052247bca3f89d2`;
- bytes: `32308`;
- SHA-256: `f3fe02b55bed0ca93f99f0cb2a3a9f60cdf938aa736fa0606fa66530c6f137ba`.

R3 keeps the checked-in plugin lock immutable. It performs npm installation only in disposable staging, offline under OS-level network denial, then independently verifies every physically installed package/version against the original lock's package map before APFS-cloning the verified dependency tree into the qualification worktree.

Current state:

`CUMULATIVE_E2_PRODUCT_SEMANTICS=QUALIFIED_NONLIVE`

`RC2_RELEASE_PROVENANCE=PENDING_F1_R3`

`NEXT_GATE=LOCAL_F1_R3_QUALIFICATION`
