# Operations Floor Reintegration Failure Modes — 2026-09-15

Status: Durable engineering appendix for the `Zartharas/OmniRoute` fork only.

This appendix records failure modes discovered while beginning Operations Floor selective reintegration after Codex Unified and Auth Keeper reconciliation. It is private fork engineering guidance and must not be submitted to the original upstream OmniRoute repository unless explicitly authorized.

## 1. Historical commit authority must not depend on old checkout paths

Operations Floor Selective Reintegration Audit R1 failed before evidence collection because it assumed these historical working copies still existed:

- `/Users/zarthras/Documents/Development Projects/OmniRoute-operations-floor`
- `/Users/zarthras/Documents/Development Projects/OmniRoute-operations-floor-durable`

The historical Operations Floor commits themselves still exist in the `Zartharas/OmniRoute` Git lineage. The failure was therefore a harness authority-location error, not missing source history.

Known historical authority:

- feature base: `e646fe84c76d2ddaf1aa8deb6bf49052852d839b`
- first Operations Floor commit: `7998fbb5b5ad0a1351658840c067616dca9e0a8a`
- OpenAI-preservation head: `71a5faac8bfaac93a9ca23db63b104f24ab7d829`
- protected-native/workload head: `ecebb6253a8581516a2b12622724838c790c4ed8`

Prevention:

- treat Git commit/tree objects as historical source authority, not a specific local worktree path;
- verify the exact historical commits before use;
- verify ancestry explicitly when the feature base matters;
- do not recreate historical worktrees just to perform a read-only source audit;
- a missing historical working directory is not evidence that the historical commit is unavailable.

## 2. Remote historical authority and local object availability are separate facts

Operations Floor Audit R2 corrected the old-worktree assumption by trying to read the historical objects from the accepted R10 repository's local Git object database. That also failed: the exact historical commits still existed in the `Zartharas/OmniRoute` fork, but `git cat-file -e` in the local R10 object store could not resolve the first Operations Floor commit.

R2 failure classification:

`HARNESS_ONLY_ACCEPTED_R10_OBJECT_DB_DID_NOT_CONTAIN_HISTORICAL_COMMITS`

The important distinction is:

- remote repository lineage proves the historical commit exists in the fork;
- local object-database availability proves whether a specific checkout can inspect that object without network access.

One does not imply the other. A current checkout can be shallow, selectively fetched, pruned, or created from a lineage that does not retain every historical object locally.

Prevention:

1. test local object availability explicitly with `git cat-file -e`;
2. if absent, do not reinterpret that as missing historical authority;
3. do not mutate the accepted repository's object database merely to satisfy a read-only audit;
4. instead, create a disposable bare Git store outside the accepted worktree;
5. fetch only exact advertised historical branch refs from the same authorized fork;
6. verify fetched branch heads against pinned commit SHAs;
7. verify the feature-base parent relationship after fetch;
8. run all historical comparisons against that temporary object store;
9. remove the temporary store before final non-drift checks.

## 3. Exact branch refs are preferable to arbitrary SHA fetches

For the Operations Floor lineage, the fork still exposes these exact branches:

- `feat/operations-floor-openai-preservation`
- `feat/operations-floor-protected-native`

Audit R3 therefore fetches those exact advertised refs into a temporary bare repository and requires their heads to equal the pinned historical authority:

- OpenAI-preservation head: `71a5faac8bfaac93a9ca23db63b104f24ab7d829`
- protected-native head: `ecebb6253a8581516a2b12622724838c790c4ed8`

This is safer than fetching arbitrary unadvertised SHA objects because branch identity and commit identity are both verified.

## 4. Repository object authority and working-copy authority are different concepts

A working copy is an operator convenience. A commit/tree is immutable source authority.

For read-only reintegration audits:

1. pin the current accepted repository branch/head/tree;
2. pin each historical commit/tree or feature-base commit;
3. prove whether those objects are available locally;
4. if not local, build a disposable historical object store from exact authorized branch refs;
5. read historical files directly from pinned objects;
6. classify current files as missing, identical, or divergent;
7. delete the temporary object store before final non-drift validation.

Never silently substitute a different branch, stale exported copy, or unpinned remote state.

## 5. Operations Floor reintegration remains selective

The R1/R2 authority-location failures do not change the reintegration policy:

- wholesale merge remains forbidden;
- shared integration files must be reviewed semantically;
- OpenCode and TheOldLLM must not be reactivated;
- protected-native GPT-5.6 Sol, Terra, and Luna remain non-routeable;
- historical 14-model assumptions must be reconciled to the current Codex Unified authority before porting;
- accepted OmniRoute and Auth Keeper authorities must remain unchanged during the read-only audit.

## 6. Permanent generated-script rule

Before delivering any historical-lineage audit script:

- search for hard-coded historical checkout paths;
- distinguish active accepted paths from historical-object containers;
- preflight local object availability rather than assuming it;
- if local history is absent, isolate network retrieval in a temporary bare store;
- pin the remote repository and exact branch refs;
- verify fetched branch heads and ancestry before reading source;
- ensure fetch does not touch accepted repositories;
- ensure the temporary object store is removed on both success and failure;
- perform final non-drift checks after temporary history cleanup.

Operations Floor Audit R3 implements this stronger model.

## 7. R3 established the exact reintegration set

Audit R3 passed with the disposable historical-store model and established the current reintegration authority:

- historical selective union: 27 files;
- missing from accepted R10: 23;
- identical to accepted R10: 0;
- divergent shared integration files: 4;
- retired-provider hits: 0;
- protected-native routeability hits: 0;
- legacy hard-coded route/model-count hits: 0;
- decision: `SELECTIVE_PORT_REQUIRED`.

The four divergent shared files are:

- `src/server/ws/liveServerAllowList.ts`
- `src/shared/components/Header.tsx`
- `src/shared/constants/sidebarVisibility/sections.ts`
- `src/shared/constants/sidebarVisibility/types.ts`

The accepted R3 evidence ZIP SHA-256 is:

`1942377bc4a8a3a81faaad0933824117779b6ece3e7435729c5e03978ecef512`

This classification is the source authority for selective candidate construction. Do not replace it with a later broad file discovery unless evidence shows the R3 authority itself is stale.

## 8. Historical source authority and current-contract compatibility are separate gates

Operations Floor Selective Reintegration Candidate R1 correctly imported all 23 missing historical blobs and three-way merged all four divergent shared files. It then failed TypeScript differential qualification before commit.

R1 candidate failure classification:

`GENUINE_HISTORICAL_COMPONENT_CONTRACT_INCOMPATIBILITY_PLUS_LINEWISE_TYPESCRIPT_DIFF_ARTIFACT`

Four diagnostics represented real historical/current contract incompatibilities:

1. `OperationsFloorClient.tsx` did not pass the already-loaded `workloads` collection to `OperationsFloorInspector`, even though the Inspector contract requires it.
2. `PixelOfficePreviewClient.tsx` did not pass `systemSignals` to `OperationsFloorTiledOffice`.
3. `PixelOfficePreviewClient.tsx` did not pass `workloads` to `OperationsFloorInspector`.
4. the merged `Header.tsx` retained a parent `settings` description key while the reintegrated `HideableSidebarItemId` authority no longer contains a parent `settings` item; the valid configuration IDs are the `settings-*` child pages.

A fifth reported candidate-only line was not an independent diagnostic. It was a wrapped continuation line from a Playwright type diagnostic that the line-by-line differential comparator separated from its parent diagnostic.

Prevention:

- byte-exact historical import is only the first gate; historical code must still satisfy the current accepted component contracts;
- apply compatibility changes only after proving the exact historical source blob was imported;
- keep the compatibility adaptation set explicit and minimal;
- distinguish "historical source authority" from "final current-compatible candidate authority";
- compare TypeScript diagnostics as complete diagnostic blocks, not individual output lines;
- never treat an indented/wrapped continuation line as a separate candidate-only error without identifying its parent diagnostic.

## 9. Bounded compatibility-adaptation rule

For Candidate R2, the 27-file reintegration authority remains unchanged. Only three already-authorized files may receive compatibility adaptations:

- `src/app/(dashboard)/dashboard/operations-floor/OperationsFloorClient.tsx`
- `src/app/(dashboard)/dashboard/operations-floor/pixel/PixelOfficePreviewClient.tsx`
- `src/shared/components/Header.tsx`

Of the 23 originally missing historical files, 21 must remain byte-identical to their R3 historical authority. The two historical files allowed to diverge are the main Operations Floor client and the pixel preview, and only for the current component-contract fixes above.

The pixel preview has no workload-policy or system-event acquisition path. Therefore its compatibility behavior must represent absence explicitly:

- `workloads={[]}` for the Inspector;
- `systemSignals={{ auth: null, compression: null }}` for the tiled office.

Do not invent workload entries or telemetry merely to satisfy a component prop contract.

## 10. Permanent TypeScript differential rule

For baseline/candidate TypeScript comparison:

1. normalize worktree-root paths;
2. identify canonical diagnostic starts such as `file(line,column): error TS####:`;
3. group every wrapped continuation/source excerpt with its parent diagnostic;
4. compare complete normalized diagnostic blocks;
5. if baseline passes and candidate fails, fail immediately;
6. if both fail, candidate-only diagnostic blocks must still be zero;
7. preserve the candidate-only block report in evidence.

A linewise set difference is not a reliable TypeScript differential when diagnostics can wrap across lines.
