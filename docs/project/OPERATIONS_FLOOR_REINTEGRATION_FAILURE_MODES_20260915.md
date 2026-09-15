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
