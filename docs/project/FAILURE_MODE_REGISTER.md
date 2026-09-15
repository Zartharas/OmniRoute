# Engineering Failure-Mode Register

Last reviewed: 2026-09-15
Status: Durable engineering guardrail for the `Zartharas/OmniRoute` fork

This register records harness, authority, source-shape and qualification failures that have already occurred during OmniRoute, Codex Unified, Auth Keeper and R16.x work. Its purpose is prevention: future scripts and reviews should treat these as known failure classes and should not rediscover them by trial and error.

This document is not a substitute for the Architecture or Engineering Source of Truth. It is a permanent implementation checklist used together with those documents.

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

- use AST/semantic parsing for source structures when syntax is available;
- do not count route identities with line/regex assumptions when object shape is executable code;
- include synthetic fixtures where the first key begins on the declaration line.

### 2.4 Interface/type-alias declaration shape assumed

Observed failure class: a named TypeScript contract was assumed to be an `interface` when the actual declaration could be a type alias/wrapper/intersection.

Prevention:

- inspect exact declaration kind before member assertions;
- resolve wrapper types such as `Readonly<T>` before generic identifiers;
- patch exact declaration scope rather than suffix/global text matches.

### 2.5 Symbolic source structures parsed with literal-only tools

Observed risk: `ast.literal_eval` or equivalent literal-only parsing is unsafe for structures containing symbolic references.

Prevention:

- use AST traversal or controlled module loading with side-effect guards;
- prove module-load side effects are absent before importing source for discovery.

## 3. Harness implementation failures

### 3.1 Embedded fixture newline escaped as literal `\n`

Observed failure: generated Python source contained a literal escaped newline and failed with `SyntaxError` before any source mutation.

Prevention:

- execute synthetic fixture paths, not only compile the outer shell script;
- compile every embedded Python block;
- include parser self-tests using actual newline-bearing source strings.

### 3.2 `git status` collapsed untracked directories

Observed failure: exact changed-file scope expected individual files, while default `git status` collapsed newly created directories.

Prevention:

- use `git status --porcelain=v1 --untracked-files=all` for exact file inventories;
- compare normalized file sets, not display-oriented status output.

### 3.3 Python compile created `__pycache__` inside candidate scope

Observed failure: qualifying a repository Python artifact with bytecode generation created an unexpected tracked-scope artifact.

Prevention:

- compile source in memory or use a bytecode-disabled method for repository validation;
- explicitly scan for `__pycache__`/`.pyc` after qualification;
- do not let validation mutate the candidate tree.

### 3.4 Clean-repository pipeline failed under `set -euo pipefail`

Observed failure: a `grep -v`-based clean-status counter returned exit code 1 on zero matches and aborted a successful clean-repository path.

Prevention:

- use counters that return success for zero rows, for example `awk 'END { print NR + 0 }'`;
- test both dirty and perfectly clean fixtures under the same shell options used in production.

### 3.5 Function parser matched parameter-destructuring brace instead of body brace

Observed failure: a source-removal parser selected the first `{` associated with a function signature and accidentally treated parameter destructuring as the function body.

Prevention:

- locate function body using syntax-aware parsing or balanced-token logic after the complete parameter list;
- include destructured-parameter fixtures in parser tests.

### 3.6 Nearest lexical function/return assumed to be semantic owner

Observed failure class: nested callbacks and repeated `return Object.freeze(...)` patterns were associated with the wrong semantic owner.

Prevention:

- resolve lexical/AST ownership explicitly;
- do not patch the nearest textual function/return without proving semantic scope.

### 3.7 Brittle exact test-title dependency

Observed failure: a reconciliation candidate required the exact historical title `TheOldLLM requires managed same-browser-context policy`; the frozen test had evolved and the transform failed before validation.

Prevention:

- transform tests by semantic structure and assertions, not display titles;
- titles are descriptive text, not machine authority;
- post-check that positive retired-provider assertions are gone regardless of title wording.

### 3.8 Over-broad textual retired-provider guard

Observed failure: a candidate rejected any occurrence of a retired provider name in an entire contract file, even when executable provider-policy tables were already empty and remaining text was historical/comment/tombstone material.

Prevention:

- guard executable authority structurally: provider tables, registry entries, imports, bootstrap calls and reachable graph;
- allow historical comments, negative tests and tombstones when they cannot re-enable routing;
- prove both positive behavior (harmless text tolerated) and negative behavior (active policy/import reintroduction fails closed).

### 3.9 Dormant implementation family assumed to exist

Observed failure risk: a cleanup harness required each retired implementation family to be present even though a prior accepted takedown may already have removed one.

Prevention:

- preserve the exact hash-locked dormant inventory discovered in the accepted audit;
- never recreate a missing retired implementation merely to satisfy a harness expectation;
- report per-family counts, but make preservation source-backed rather than hardcoded.

### 3.10 Bare `tllm` case-insensitive regex matched unrelated `getLLM` symbols

Observed failure: a takedown guard used an unbounded case-insensitive `tllm` pattern and matched unrelated generic LLM identifiers.

Prevention:

- match provider aliases as bounded tokens/identities;
- test near-collision identifiers such as `getLLM` and generic `llm` helpers.

### 3.11 Title-only structural test cleanup and global provider substitution

Observed failure: provider-specific test cleanup by title/global substitution left structural references and introduced incorrect semantic replacements.

Prevention:

- remove provider-specific imports, helpers, properties and assertions structurally;
- do not substitute one provider name for another simply to make a test pass;
- require zero surviving active references after semantic cleanup.

## 4. Build and dependency qualification failures

### 4.1 External `node_modules` symlink rejected by Turbopack

Observed failure: a disposable worktree symlinked `node_modules` from another filesystem location; Turbopack rejected the symlink because it pointed outside the project filesystem root.

Prevention:

- do not use external dependency symlinks for Next/Turbopack production qualification;
- use a local copy-on-write dependency clone where supported;
- verify representative hash parity, distinct inodes and symlink topology;
- remove the clone after qualification.

### 4.2 Candidate artifact changed Next/Turbopack project graph

Observed failure class: a raw Python repository artifact was introduced into a project whose Next/Turbopack graph then observed it unexpectedly.

Prevention:

- repository representations should match the host project/toolchain expectations;
- when source must be preserved but not treated as a project module, use an inert source capsule/data representation with integrity validation;
- prove packaged artifact presence without unintentionally making it an application module.

### 4.3 Baseline production build already fails

Observed failure: exact baseline and candidate builds both returned non-zero due inherited repository/toolchain failures.

Prevention:

- compare exact base versus candidate under the same toolchain and dependency tree;
- candidate qualification should reject candidate-only fatal signatures, not require an artificial clean baseline;
- do not silently edit unrelated inherited build debt.

### 4.4 ANSI escape sequences broke fatal-signature parser

Observed failure: build-log parsing failed to detect the baseline fatal signature because terminal ANSI escape sequences were not normalized.

Prevention:

- strip ANSI/control sequences before machine classification;
- bind reused build evidence to exact log hashes and candidate package identity;
- test parsers with colored and non-colored logs.

### 4.5 Human-oriented error counts treated as stable machine contract

Observed failure: qualification expected an exact Turbopack error-count token that was not stable in preserved logs.

Prevention:

- classify stable normalized fatal signatures rather than UI-oriented counts;
- prefer exact semantic error messages plus hashed evidence over presentation-layer cardinality.

## 5. Git/worktree and transaction failures

### 5.1 Linked worktree `.git` assumed to be a directory

Observed failure: a linked worktree was rejected because `.git` is a file, not a directory.

Prevention:

- use existence checks such as `-e` and Git commands to prove worktree identity;
- do not use `-d .git` as a worktree predicate.

### 5.2 Residue cleanup without exact authority would be unsafe

Required rule:

- a failed candidate may remove only a branch/worktree it created;
- verify branch head, worktree registration and changed-file scope before cleanup;
- if a commit exists or unexpected files are present, preserve state for inspection instead of force-cleaning it.

### 5.3 Validation artifact polluted exact changeset

Observed failures include bytecode and untracked-directory presentation artifacts.

Prevention:

- changed-file scope must be checked after all materialization/static validation and again immediately before commit;
- temporary dependency trees and validation outputs must be outside tracked scope or removed before the precommit gate.

## 6. Scope and product-boundary failures

### 6.1 Retired provider lane retained in executable router data

Observed failure: active router model-policy data still retained a retired provider-backed route after broader Codex Unified functional qualification passed.

Prevention:

- distinguish functional qualification from canonical/scope completion;
- scan executable route/policy tables separately from comments/docs;
- run a final active-scope cleanup before declaring a product workstream accepted.

### 6.2 Canonical documentation lagged accepted implementation

Observed failure: canonical docs still described an earlier R16 phase and retained retired provider lanes after later local work had advanced.

Prevention:

- architecture/status documentation is part of phase completion;
- after an accepted material change, reconcile active workstream, provider scope, accepted checkpoint and next dependency order;
- stale canonical status is a real blocker for handoff even when source tests pass.

### 6.3 Provider retirement confused with total string deletion

Required distinction:

- active route/provider policy, registry, server bootstrap and import reachability must be removed;
- historical changelog entries, negative regression tests and tombstone documentation may remain;
- dormant implementation may remain only when explicitly source-backed and unreachable;
- prior accepted takedowns must not be reversed to satisfy a cleanup harness.

## 7. Permanent pre-delivery checklist for generated engineering scripts

Before asking an operator to run a non-trivial script:

1. Pin every repository/branch/head/tree/evidence authority used by the phase.
2. Verify current versus historical authority roles separately.
3. Confirm exact source schema/declaration shapes.
4. Run `/bin/bash -n` under macOS Bash-compatible syntax.
5. Compile every embedded Python block.
6. Execute important parser/transform/recovery paths on synthetic fixtures.
7. Include at least one near-miss fixture for every structural matcher.
8. Test clean and dirty Git status paths.
9. Ensure validation creates no bytecode/build artifacts in tracked scope.
10. Verify exact untracked-file mode when comparing changed paths.
11. Avoid dependency symlinks for Next/Turbopack worktrees.
12. When baseline build is red, use exact base/candidate differential evidence.
13. Normalize ANSI/control sequences before log classification.
14. Prefer structural/AST/reachability guards over whole-file word scans.
15. Preserve exact source-backed dormant inventories; do not require retired code to exist.
16. Fail closed before mutation on unexpected source shape.
17. Use transactional cleanup only for exact uncommitted state created by the script.
18. Recheck changed-file scope immediately before commit.
19. Prove non-target/live/host artifacts remain unchanged.
20. Do not push or live-cutover unless that action is explicitly authorized by the phase.

## 8. Relationship to current product work

The lessons in this register apply across all five product pillars. They are especially relevant to Codex Unified repository reintegration, Auth Keeper contract reconciliation, Operations Floor selective reintegration and later orchestration-foundation transplantation.

The register intentionally records failures as engineering knowledge, not as product features. A failure that was caused by a harness assumption must not be reclassified as a product defect unless source-backed evidence proves the product itself was wrong.
