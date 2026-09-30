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
