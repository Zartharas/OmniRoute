# Fork-Owned Release Authority — 2026-09-30

## Status

Canonical release-policy decision for the `Zartharas/OmniRoute` fork.

This decision corrects the older R16.32-only assumption that final product release provenance must wait for an immutable tag from the original upstream repository.

## Authority

The fork is the product authority for the five-pillar program.

Canonical public architecture/governance:

- `Zartharas/OmniRoute`

Canonical private implementation and release-evidence repository:

- `Zartharas/omniroute-auth-keeper`

The original upstream repository remains a compatibility and improvement source. Its releases/tags may be evaluated and incorporated when useful, but they do **not** gate the fork's own product release, build provenance, or five-pillar acceptance.

This follows the existing architecture rule:

> upstream product/release direction is a useful reference but does not supersede this fork's five-pillar goal.

## Qualified product authority

Canonical qualified five-pillar head:

`654dc956ce09bcb7c57995c3c292f663352f2d22`

Canonical integration qualification:

`PASS_CANONICAL_FIVE_PILLAR_INTEGRATION_QUALIFICATION_R2`

`CANONICAL_INTEGRATION_QUALIFIED_NONLIVE_EXACT_LINEAGE`

Canonical pre-integration base:

`470a9eb5d5014c0df116c9e3c5b6ae3853bda021`

Topology:

- merge base = exact pre-integration base;
- 183 commits ahead;
- 0 behind;
- P4E + P5A→P5E ancestry proven;
- P4F/P4G provider-specific held branches are not inherited.

## Fork-owned release-candidate authority

Fork release-candidate branch:

`release/five-pillar-qualified-20260930-rc1`

Exact source commit:

`654dc956ce09bcb7c57995c3c292f663352f2d22`

The release-candidate ref intentionally points to the already-qualified canonical integration head. Creating the release ref does not rewrite source and does not itself authorize merge, deployment, live activation, provider calls, or publication.

## Upstream policy

The original upstream repository is no longer a release blocker.

Allowed:

- ingest compatible upstream improvements;
- compare later upstream releases against fork invariants;
- reconcile fixes when useful;
- retain upstream provenance as descriptive metadata.

Not required before a fork release:

- an upstream immutable tag;
- an upstream GitHub release;
- upstream branch freeze;
- upstream owner approval.

The legacy `v3.8.51` tag wait remains useful only as historical R16.32 upstream-sync evidence.

## Version identity

The qualified source currently carries upstream-derived package metadata:

- package name: `omniroute`;
- package version: `3.8.51`.

Fork release provenance must therefore distinguish:

1. **source/package lineage identity** — the inherited package version;
2. **fork release identity** — the fork-owned release candidate/ref and later fork-owned tag/release.

Do not mutate the qualified source merely to manufacture a version label before provenance qualification. If a later packaging/version change is required for distribution, treat it as a separate bounded release mutation and requalify it.

## Next bounded phase

`FORK_OWNED_RELEASE_PROVENANCE_QUALIFICATION`

Required before any tag/publication decision:

- exact release ref = qualified canonical head;
- exact source commit/tree identity;
- package/lockfile provenance;
- build/toolchain authority;
- release artifact/build reproducibility where supported;
- full permanent-gate regression;
- no provider network calls;
- active-worktree nonmutation;
- rollback/source retention;
- explicit publication/merge/live authorization kept separate.

## Safety

`FIVE_PILLAR_ARCHITECTURE=QUALIFIED_NONLIVE`

`CANONICAL_INTEGRATION=QUALIFIED_NONLIVE_EXACT_LINEAGE`

`FORK_RELEASE_AUTHORITY=ZARTHARAS_FORK`

`UPSTREAM_TAG_REQUIRED=NO`

`REAL_PROVIDER_CALL_BUDGET=0`

`MERGE=NOT_AUTHORIZED`

`RELEASE_PUBLICATION=NOT_AUTHORIZED`

`LIVE_ACTIVATION=NOT_AUTHORIZED`


## Frozen release-provenance qualification

The fork-owned release candidate is now frozen for non-live provenance qualification.

Release ref:

`release/five-pillar-qualified-20260930-rc1`

Exact source:

`654dc956ce09bcb7c57995c3c292f663352f2d22`

Frozen source identities:

- source tree: `541e2b6bdfa682bc3d008356e41b34ea72c49248`;
- package blob: `612c15ab2f995152514edebae78c4c0ba1b97063`;
- lockfile blob: `4214aef2e49956e416a013d5c25f574e442b52f2`;
- lockfile bytes: `1387787`;
- Node-policy blob: `a45fd52cc5891570d6299fab38643103c3955474`;
- Node policy: `24`.

Qualification artifact:

- branch: `qualification/fork-owned-release-provenance-r1`;
- commit: `7c92fbb13d66216d11c6219917e3ecf9d5596021`;
- harness: `scripts/qualification/fork-owned-release-provenance-qualification-r1.sh`;
- bytes: `19731`;
- SHA-256: `f252228a299920fb197171871bfcdc6bcebf736c2a56a41abc0786ebf6cf5f00`;
- harness blob: `8c4c1a7746f78122ac587029eb6aeca03ac988f0`;
- qualification topology: exact source + one harness file;
- workflow runs on the source candidate: none.

The next action is the local immutable qualification run documented in:

`docs/project/CHAT_HANDOFF_20260930_FORK_RELEASE_PROVENANCE.md`

No tag/release publication, merge, deployment or live activation is authorized by freezing this artifact.


## Post-productization RC2 authority

The original RC1/P5E authority above remains immutable historical release-provenance evidence.

After Codex Unified and adopted orchestration-pattern productization, the cumulative qualified source advanced to:

`5702c3bbd6eb50d720a04d99fbeb81e586f5cd09`

New cumulative integration ref:

`integration/productized-five-pillar-nonlive-20260930`

New fork release-candidate ref:

`release/five-pillar-productized-20260930-rc2`

Both point exactly to the cumulative E2 source.

RC2 qualification result:

`PASS_POST_PRODUCTIZATION_CANONICAL_INTEGRATION_RELEASE_F1_QUALIFICATION_R1`

`POST_PRODUCTIZATION_CANONICAL_INTEGRATION_RELEASE_QUALIFIED_NONLIVE`

F1 re-qualified the cumulative canonical lineage and fork-owned build/pack provenance without moving RC1 or historical PR #39.

RC2 release evidence:

- source tree: `52bd6b3de8cee30c80f795584483720e1c78618c`;
- inherited package blob: `612c15ab2f995152514edebae78c4c0ba1b97063`;
- inherited lockfile blob: `4214aef2e49956e416a013d5c25f574e442b52f2`;
- Node-policy blob: `a45fd52cc5891570d6299fab38643103c3955474`;
- BUILD_SHA: `5702c3bbd`;
- tarball SHA-256: `bc39bb18ef73eec15911e93944a44a669a8690404d4bd6965c099b136e069402`;
- RC2 manifest SHA-256: `dfd53fbbb59d25901afb98993869f2c54ad8d10732e1bda3272da1f49a3c6063`;
- dependency installation: NO;
- real provider calls: NO.

RC2 is qualified non-live only. It does not authorize merge, GitHub release/tag publication, deployment, cutover or live provider validation.
