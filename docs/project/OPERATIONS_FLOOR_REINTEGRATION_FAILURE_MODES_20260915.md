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
- when the accepted current repository shares the relevant object database, read historical paths with `git show <commit>:<path>` and compare with `git diff <base>..<head>`;
- verify the exact historical commits with `git cat-file -e <sha>^{commit}` before use;
- verify ancestry explicitly when the feature base matters;
- do not issue a network fetch merely because an old checkout directory is absent;
- do not recreate historical worktrees just to perform a read-only source audit;
- a missing historical working directory is not evidence that the historical commit is unavailable.

## 2. Repository object authority and working-copy authority are different concepts

A working copy is an operator convenience. A commit/tree is immutable source authority.

For read-only reintegration audits:

1. pin the current accepted repository branch/head/tree;
2. pin each historical commit/tree or feature-base commit;
3. prove those objects are available in the selected repository object database;
4. read historical files directly from the pinned objects;
5. classify current files as missing, identical, or divergent;
6. never require an old branch checkout to remain mounted merely because it once produced accepted evidence.

If historical objects are truly absent from the local object database, stop and classify that condition separately. Do not silently substitute a different branch, stale exported copy, or unpinned remote state.

## 3. Operations Floor reintegration remains selective

The checkout-path failure does not change the reintegration policy:

- wholesale merge remains forbidden;
- shared integration files must be reviewed semantically;
- OpenCode and TheOldLLM must not be reactivated;
- protected-native GPT-5.6 Sol, Terra, and Luna remain non-routeable;
- historical 14-model assumptions must be reconciled to the current Codex Unified authority before porting;
- accepted OmniRoute and Auth Keeper authorities must remain unchanged during the read-only audit.

## 4. Permanent generated-script rule

Before delivering any historical-lineage audit script:

- search the script for hard-coded historical checkout paths;
- distinguish paths needed because they are active accepted authorities from paths used only as historical Git-object containers;
- prefer one existing accepted Git object database when it already contains the pinned history;
- prevalidate that no unnecessary `git fetch`, clone, worktree creation, or source mutation is introduced;
- fail closed on object absence, not directory absence.

Operations Floor Audit R2 implements this correction by resolving all historical Operations Floor commits from the accepted R10 OmniRoute repository object database with no fetch and no historical checkout dependency.
