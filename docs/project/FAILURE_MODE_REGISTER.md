# Engineering Failure-Mode Register

Last reviewed: 2026-09-15
Status: Durable engineering guardrail for the `Zartharas/OmniRoute` fork

This register records harness, authority, source-shape and qualification failures that have already occurred during OmniRoute, Codex Unified, Auth Keeper and R16.x work. Its purpose is prevention: future scripts and reviews should treat these as known failure classes and should not rediscover them by trial and error.

This document is not a substitute for the Architecture or Engineering Source of Truth. It is a permanent implementation checklist used together with those documents.

For Auth Keeper retirement/reachability lessons discovered during final reconciliation, also see [Auth Keeper Reconciliation Failure Modes — 2026-09-15](AUTH_KEEPER_RECONCILIATION_FAILURE_MODES_20260915.md).

## 1. Authority and provenance failures

### 1.1 Historical runtime state treated as current authority

Observed failure: a previously valid live router hash and topology were reused as if they were still current.

Prevention:

- separate repository-import authority, candidate-origin provenance and current live rollback/sentinel authority;
- hash-lock each role independently;
- never promote an old live hash, port or topology into a permanent invariant without fresh evidence;
- use current deployed artifacts as non-mutation sentinels unless they are explicitly designated as import authority.

### 1.2 Deployed runtime treated as repository productization authority

Observed failure: a deployed router was inspected as if it defined the source that should be committed to the repository.

Prevention:

- identify the exact curated/source candidate that owns repository productization;
- treat deployed state and repository source as different authorities unless a phase explicitly proves they are identical;
- preserve rollback/live state without copying it wholesale into source.

### 1.3 Canonical documents assumed to exist in the implementation checkout

Observed failure: a reintegration script required canonical project documents in a private/local implementation repository where they did not exist.

Prevention:

- record which repository owns each canonical document;
- fetch/import public canonical docs from an exact pinned public commit when the implementation checkout is not their authority;
- fail closed on missing authority, not on a false local-path assumption.

### 1.4 Accepted phase inferred from numbering instead of product roadmap

Observed failure class: a numbered R16 subphase could be continued mechanically even when the product dependency order required a different workstream.

Prevention:

- derive the next workstream from the five-pillar architecture and canonical roadmap;
- do not automatically increment D/R numbers;
- treat implementation programs such as R16.32 as supporting work, not as the product roadmap driver.

## 2. Schema and source-shape assumption failures

### 2.1 External model catalog `id` versus `slug`

Observed failure: Codex Unified reconciliation assumed the external model catalog used `id`, while the exact artifact uses `models[].slug`. Router `CATALOG[]` uses `id`, and workload policy resolves route aliases separately.

Prevention:

- validate each artifact schema independently before parity checks;
- never normalize different artifact identity fields into one assumed key;
- assert uniqueness and cross-artifact parity using the source-backed field for each artifact.

### 2.2 Invented wire field requirement (`accountId`)

Observed failure: Auth Keeper reconciliation required `accountId` on the OmniRoute wire contract even though the accepted contract is `providerId + connectionId`, with unique account resolution performed server-side.

Prevention:

- derive required wire fields from exact source and tests;
- distinguish wire identity from server-side resolved identity;
- do not add fields simply because they would be convenient to audit.

### 2.3 Regex route extraction missed the first inline dictionary key

Observed failure: a route-count regex missed the first key in a top-level dictionary and reported nine routes instead of ten.

Prevention:

- use AST/semantic extraction for structural Python authority;
- never make route identity depend on pretty-print layout or line position.

## 3. Harness and worktree failure classes

### 3.1 Synthetic fixtures with escaped newlines

Observed failure: an embedded Python parser fixture contained literal `\\n` text rather than real newlines, causing a syntax error before product code was evaluated.

Prevention:

- execute synthetic fixtures, do not only compile the harness;
- verify the exact bytes/strings passed to embedded parsers.

### 3.2 Git untracked-directory collapse

Observed failure: `git status --porcelain=v1` summarized new nested directories instead of listing the individual files expected by an exact scope validator.

Prevention:

- use `git status --porcelain=v1 --untracked-files=all` for file-level scope authority.

### 3.3 Validator-created `__pycache__` artifacts

Observed failure: `python -m py_compile` inside an isolated worktree created `__pycache__` and caused the exact changeset gate to fail.

Prevention:

- use in-memory `compile()` for validation when target directories must remain pristine;
- set `sys.dont_write_bytecode = True` during semantic loading where appropriate;
- explicitly reject bytecode artifacts before scope validation.

### 3.4 Clean-status false failure under `set -euo pipefail`

Observed failure: `grep -v` returned status 1 because a clean repository produced no matching lines, causing a clean-state pipeline to fail.

Prevention:

- use counters such as `awk 'END { print NR + 0 }'` when zero rows are a valid success state;
- avoid grep pipelines whose exit status conflates "no rows" with "error".

### 3.5 Linked-worktree `.git` assumption

Observed failure: a guard tested `.git` with `-d`, but linked worktrees store `.git` as a file.

Prevention:

- use `-e` when checking whether a path is a Git worktree unless the exact representation is part of the invariant.

### 3.6 Brittle exact test-title transforms

Observed failure: a candidate transform depended on a historical human-readable test title and stopped when the test had already been renamed.

Prevention:

- select tests by semantic behavior/source contract rather than display title;
- post-check that the old positive behavior is gone.

### 3.7 Whole-file retired-provider scans

Observed failure: a guard rejected any textual occurrence of a retired provider name even when executable provider authority was already empty.

Prevention:

- distinguish executable policy, registry/bootstrap/import reachability and historical/tombstone text;
- allow negative regression assertions and historical comments while blocking active reachability.

## 4. Build and qualification failure classes

### 4.1 External `node_modules` symlink with Turbopack

Observed failure: a disposable worktree symlinked `node_modules` to a sibling checkout; Turbopack rejected the symlink because it pointed outside the project filesystem root.

Prevention:

- prefer a local APFS copy-on-write clone of an already-qualified dependency tree;
- verify representative files have identical hashes but different inodes;
- audit cloned symlink targets and fail closed on external/broken links;
- remove the dependency clone before commit.

### 4.2 Pre-existing baseline build failures

Observed failure class: the accepted repository baseline may already have unrelated full-build failures.

Prevention:

- run baseline and candidate under the same build/toolchain topology;
- compare normalized fatal signatures;
- fail on candidate-only signatures or changed-path fatal hits;
- do not silently fix unrelated baseline debt as part of a narrow candidate.

### 4.3 ANSI-decorated build logs

Observed failure: a fatal-signature parser treated visibly clean terminal text as raw text, but saved logs still contained ANSI escapes, leaving the parser with an empty signature set.

Prevention:

- strip ANSI/OSC terminal decorations before signature extraction;
- test the parser against actual captured build output, not only synthetic plain text.

## 5. Provider retirement and active-scope rules

### 5.1 Dormant implementation must not be resurrected

Observed failure risk: a harness can assume that both historical retired implementation families must exist even though an accepted prior takedown already removed one.

Prevention:

- preserve the exact observed hash-locked dormant inventory;
- do not recreate absent retired code merely to satisfy an inferred topology.

### 5.2 Short provider aliases require bounded matching

Observed failure risk: a short retired alias such as `tllm` can match unrelated identifiers such as `getLLM` under an unbounded substring search.

Prevention:

- use token/path/provider-table semantics, not arbitrary substring matching.

### 5.3 Retirement is about executable authority

A retired provider is out of active scope when it is absent from executable routing/provider policy, registries, bootstrap and active import reachability. Historical docs, tombstones, removal tests and unreachable implementation files do not by themselves reactivate a provider.

## 6. Transaction and evidence rules

- precommit failures may remove only worktrees/branches created by the current failed run and only after exact parent/scope proof;
- a branch containing a non-base commit must never be silently deleted by automatic residue recovery;
- authoritative evidence ZIP and Downloads copy must have identical SHA-256;
- source, D18, host/runtime sentinels and unrelated worktrees must be proven unchanged;
- a PASS token is not accepted without its corresponding evidence/commit/non-drift gates.

## 7. Canonical documentation rule

A technically passing implementation is not canonical-complete if project documents still describe removed providers, stale phases or contradictory sequencing.

Canonical cleanup must distinguish current product authority from historical prose. The next engineer should not be able to read the repository and infer a provider or phase is active when it is not.

## 8. Pre-delivery generated-script checklist

Before a generated engineering script is given to the operator:

1. pin exact branch/head/tree/evidence authorities;
2. classify repository-import authority separately from live sentinels;
3. inspect exact schemas before writing parity logic;
4. use semantic/AST locators for structured source;
5. syntax-check Bash with macOS Bash compatibility in mind;
6. compile every embedded Python block;
7. execute high-risk embedded parser/transform logic on synthetic fixtures;
8. execute at least one negative/fail-closed fixture where practical;
9. avoid validator filesystem pollution;
10. use `--untracked-files=all` for exact Git scope;
11. test linked-worktree handling;
12. ensure clean-state zero rows do not fail under `pipefail`;
13. verify rollback/residue recovery only deletes known uncommitted state;
14. avoid dependency installation when an exact qualified dependency authority can be reused;
15. do not symlink `node_modules` outside a Turbopack project root;
16. distinguish baseline diagnostics from candidate-only regressions;
17. strip terminal escape sequences before log-signature parsing;
18. distinguish executable retired-provider authority from historical references;
19. preserve observed dormant source without resurrecting absent retired code;
20. re-check canonical docs and roadmap sequencing before calling a phase complete.
