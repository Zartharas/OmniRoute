# OmniRoute Repair Incident Register

**Repository scope:** `Zartharas/OmniRoute` fork only  
**Companion scope:** `Zartharas/omniroute-auth-keeper` where an Auth Keeper defect or repair directly affected OmniRoute behavior  
**Maintainer purpose:** durable engineering memory, troubleshooting reference, regression-prevention checklist, and post-incident history  
**Coverage:** recorded OmniRoute/Auth Keeper repair work through 2026-08-27
**Upstream policy:** this file is intentionally maintained only in the fork and is not intended for upstream submission.

> Security note: this register intentionally excludes passwords, API keys, bearer tokens, cookies, refresh-token values, credential HMACs/digests, local management/admin tokens, and other secret material. Account names, provider credential values, and unnecessary connection identifiers are omitted. Public commit/PR/issue identifiers are retained where they are useful for engineering provenance.

---

## 1. How to use this register

Every entry records:

- **Symptom / failure:** what was observed.
- **Impact:** what the failure could break or mislead.
- **Decisive evidence:** the shortest discriminator that separated the real cause from competing theories.
- **Root cause:** the actual defect when proven.
- **Permanent fix:** the source, runtime, release-engineering, or workflow repair.
- **Regression protection:** test or operational guard that prevents recurrence.
- **Never repeat:** explicit engineering lesson.
- **Status:** `CLOSED`, `OPEN`, `MONITOR`, or `EXTERNAL REFERENCE`.

This is intentionally broader than an application bug list. It includes source defects, deployment defects, test-harness defects, shell failures, Docker/SQLite pitfalls, Auth Keeper lifecycle errors, CI misclassification, and operator mistakes that materially affected the repair process.

---

## 2. Current architectural invariants

These invariants emerged from the incidents below and should be treated as project-level constraints.

### 2.1 Evidence-first repair rule

Prefer the shortest path:

`observable symptom -> decisive discriminator -> permanent source fix -> focused regression -> controlled deployment proof`

Do not collect broad diagnostics when they cannot distinguish competing causes.

### 2.2 Secret-handling rule

Never print or persist in logs:

- access tokens
- refresh tokens
- cookies
- bearer tokens
- API keys
- management/admin credentials
- credential HMACs
- credential digests
- decrypted credential payloads

Credential values may be decrypted or transformed internally only when required by the application path, and then must be cleared from transient objects as soon as practical.

### 2.3 Kimi Web responsibility split

- **Auth Keeper:** browser-session acquisition/reacquisition and recovery-ready capture.
- **OmniRoute proactive path:** Token Health refreshes Kimi Web before access-token expiry.
- **OmniRoute reactive path:** executor refreshes after a real `401`, persists rotated credentials, then retries.
- **Automatic Keeper recovery:** remains disabled for Kimi Web. Current automatic-recovery allowlist is intentionally limited to `zai-web` and `deepseek-web`.

### 2.4 SQLite / Docker rule

Never directly open a detached read-only Docker SQLite volume for integrity inspection. Copy the database, WAL, and SHM files into writable ephemeral storage first.

### 2.5 Production cutover rule

Do not mutate the original live volume in place. Use:

1. read-only proof,
2. quiescent copy,
3. candidate volume,
4. offline migration/integrity validation,
5. exact runtime parity checks,
6. controlled cutover,
7. automatic rollback until final acceptance.

### 2.6 Git rule

Git ancestry is not semantic proof. Prefer exact blob identity, exact file-scope diffs, and source behavior.

### 2.7 Test rule

A repository with known baseline failures must be compared against its baseline. Do not require an unrelated repository-wide gate to become green solely because a focused patch is being validated.

---

# 3. Runtime and database incidents

## OR-DB-001 — SQLite data directory / startup initialization was not guaranteed

**Status:** CLOSED

### Symptom / failure

SQLite startup/request paths could fail with errors equivalent to:

- database directory does not exist
- database cannot be opened
- initialization happening too late, at request time

### Impact

Requests could reach database-backed code before the filesystem and SQLite singleton were ready, producing misleading downstream failures.

### Decisive evidence

Isolated startup tests using explicit `DATA_DIR` / `SQLITE_FILE` showed the failure was environmental initialization order rather than provider logic.

### Root cause

Database directory creation and `ensureDbInitialized()` were not treated as a startup invariant on every relevant path.

### Permanent fix

Initialize the database and required parent directory during startup rather than relying on first-request behavior.

### Regression protection

- startup tests with isolated data directories
- explicit DB initialization assertions
- fail-fast startup behavior when DB initialization cannot complete

### Never repeat

Do not let request-time code become the first place that creates or initializes persistent application state.

---

## OR-DB-002 — SQLite read caches could survive singleton reset

**Status:** CLOSED

### Symptom / failure

After resetting/reinitializing the SQLite singleton, reads could reflect stale cached data even though the underlying database instance had changed.

### Root cause

Read caches were not invalidated when the singleton database lifecycle reset.

### Permanent fix

Invalidate DB read caches whenever the SQLite singleton is reset/recreated.

### Regression protection

Reset tests must prove that reads after reset are sourced from the new database state.

### Never repeat

Any singleton reset must invalidate every cache whose correctness depends on singleton identity.

---

## OR-DB-003 — Fatal boot-time SQLite driver failures were obscured by fallback cascades

**Status:** CLOSED

### Symptom / failure

A boot-time SQLite/native-driver failure could cascade through fallback paths and appear as a generic later failure rather than the original fatal cause.

### Root cause

The fatal initialization cause was swallowed or under-logged before fallback behavior.

### Permanent fix

Preserve and log the first fatal boot-time database/driver cause and fail clearly when no safe fallback exists.

### Regression protection

Boot tests should assert the original fatal cause is observable rather than replaced by a secondary error.

### Never repeat

Do not hide the first fatal initialization error behind a chain of fallback messages.

---

## OR-DB-004 — Detached read-only Docker SQLite inspection caused `SQLITE_CANTOPEN`

**Status:** CLOSED

### Symptom / failure

Diagnostic scripts attempted to open a SQLite database directly from a detached read-only Docker volume and hit `SQLITE_CANTOPEN` / “cannot open database.”

### Impact

The diagnostic harness falsely suggested database corruption or incompatibility.

### Decisive evidence

The same database opened successfully after copying DB + WAL + SHM to writable ephemeral storage.

### Root cause

SQLite may require writable filesystem behavior even for integrity-oriented reads, especially with WAL state and sidecar files.

### Permanent fix

For detached-volume inspection:

1. mount/read source without changing it,
2. copy database file plus `-wal` and `-shm` sidecars,
3. operate only on the writable ephemeral copy.

### Regression protection

Every release/cutover harness now treats direct detached read-only SQLite opens as banned.

### Never repeat

Never diagnose a Docker SQLite volume by opening the production database file directly from a read-only detached mount.

---

## OR-DB-005 — Database backup helper invoked SQLite path as JavaScript

**Status:** CLOSED

### Symptom / failure

A cutover/backup step used a command equivalent to:

`node "$DB_BACKUP_PATH"`

Node interpreted the SQLite file path as a JavaScript program.

### Root cause

Command argument semantics were wrong: the helper intended to run JavaScript from stdin while passing a database path as data.

### Permanent fix

Use `node -` for stdin JavaScript and pass the DB path via an environment variable or explicit non-code argument.

### Regression protection

Shell/static review of every `node` invocation used during mutation windows.

### Never repeat

Before mutation, validate whether each command argument is code, data, or a filename consumed by the program.

---

## OR-DB-006 — Live DB clone omitted `server.env` / encryption authority

**Status:** CLOSED

### Symptom / failure

A cloned/canary database booted but encrypted provider credentials could not be used correctly.

### Decisive evidence

Database inventory was intact, but the clone lacked the persistent encryption authority stored alongside the live runtime.

### Root cause

The migration clone copied the SQLite state without the required `server.env` material that supplied the existing storage-encryption key.

### Permanent fix

- preserve the existing secret authority
- copy required non-replaceable server environment material into the isolated clone
- do not generate a replacement storage key
- avoid process-environment shadowing of the persistent secret
- run migration canaries with external network disabled

### Regression protection

Canary gates prove:

- bootstrap secret authority preserved
- no replacement secret generation
- key-match probe passes
- provider inventory preserved
- no provider calls
- no secret output

### Never repeat

A database snapshot is not a complete encrypted application snapshot unless the corresponding encryption authority is preserved.

---

# 4. Docker, runtime parity, and cutover incidents

## OR-DEPLOY-001 — SIGTERM exit code `143` was misclassified as deployment failure

**Status:** CLOSED

### Symptom / failure

A deliberately stopped candidate/container returned process exit code `143`.

### Root cause

The harness treated every non-zero shutdown code as a crash instead of recognizing SIGTERM semantics.

### Permanent fix

Accept `143` only when accompanied by mandatory post-stop proofs:

- container stopped as expected
- SQLite integrity/quick-check passes on writable snapshot
- expected persistent inventory preserved
- no unauthorized process/runtime mutation

### Regression protection

`143` is conditionally accepted; it is never accepted without post-stop integrity proof.

### Never repeat

Signal-derived shutdown codes must be interpreted in context, not treated as ordinary application exits.

---

## OR-DEPLOY-002 — Docker Desktop bind paths compared unequal because of canonicalization

**Status:** CLOSED

### Symptom / failure

Runtime-spec parity checks reported bind-mount drift between paths represented as `/host_mnt/Users/...` and `/Users/...`.

### Root cause

Docker Desktop canonicalized the same host path into a different textual representation.

### Permanent fix

Canonicalize known Docker Desktop macOS bind-path forms before equality comparison.

### Regression protection

Runtime parity compares canonical path identity rather than raw string representation.

### Never repeat

Do not use raw bind-source strings as semantic identity on Docker Desktop for macOS.

---

## OR-DEPLOY-003 — DNS `null` and `[]` were incorrectly treated as always different

**Status:** CLOSED

### Symptom / failure

Candidate runtime parity failed when Docker represented “no DNS override” as `null` in one place and an empty list in another.

### Root cause

The parity checker compared serialization rather than semantics.

### Permanent fix

Treat only empty DNS values as equivalent:

- `null`
- absent
- `[]`

Any non-empty DNS list remains strict and order/value aware.

### Regression protection

Self-test explicitly proves empty equivalence while preserving strict non-empty comparison.

### Never repeat

Normalize only representations that are provably semantically identical; never normalize away real DNS values.

---

## OR-DEPLOY-004 — Diagnostic suppression environment variables were promoted into production assumptions

**Status:** CLOSED

### Symptom / failure

An early Kimi cutover harness attempted to enforce diagnostic/test suppression variables as if they were required production invariants, including variants such as:

- `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`
- `OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK`
- `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`

### Impact

A diagnostic convenience could have accidentally disabled the very production subsystem being repaired.

### Root cause

The harness confused “safe diagnostic environment” with “correct live environment.”

### Permanent fix

Production parity now explicitly rejects diagnostic suppression variables unless they were already part of the proven live runtime contract.

### Regression protection

Cutover scripts assert that token health/background services remain enabled when required.

### Never repeat

Never promote a test-only or diagnostic-only environment variable into a production invariant.

---

## OR-DEPLOY-005 — Invented `server.env` permission invariant caused false rollback

**Status:** CLOSED

### Symptom / failure

A cutover revision enforced a newly invented fixed permission requirement (`0600`) for `server.env` and rolled back even though the live system's proven security contract did not require that exact mode.

### Root cause

The harness substituted an opinionated security policy for source-derived/live-derived invariants.

### Permanent fix

Use source-derived and live-derived checks:

- secret authority unchanged
- owner/security posture not widened
- no secret replacement
- no extra readability exposure
- runtime successfully uses the existing secret

### Regression protection

No hard-coded permission mode unless the application itself requires it.

### Never repeat

Security validation must prove “no weakening,” not invent unrelated invariants during a production repair.

---

## OR-DEPLOY-006 — Quiescent copy / WAL handling was required for safe live-volume migration

**Status:** CLOSED

### Symptom / failure

Copying active SQLite state without quiescing or preserving WAL/SHM state risked an inconsistent candidate.

### Permanent fix

The proven cutover sequence:

1. establish source identity,
2. quiesce original container,
3. copy persistent volume,
4. include SQLite sidecars,
5. validate copied database offline,
6. boot candidate from the copied volume,
7. keep original volume untouched for rollback.

### Never repeat

Never build a production rollback/candidate pair from a logically inconsistent SQLite copy.

---

# 5. Build, dependency, TypeScript, and CI incidents

## OR-BUILD-001 — `open-sse` package metadata and lockfile drift caused `npm ci EUSAGE`

**Status:** CLOSED / WORKAROUND DOCUMENTED

### Symptom / failure

Docker/E2E build failed with `npm ci` usage/lockfile errors.

### Decisive evidence

`open-sse/package.json` had moved to a newer version/dependency state while the workspace lockfile entry still reflected the previous version and dependencies.

### Root cause

Workspace package metadata and lockfile metadata were inconsistent.

### Permanent fix / safe workaround

For disposable E2E builds, repair lockfile metadata in an isolated worktree/build context, then prove the intended source tree itself remains unchanged.

### Regression protection

Before Docker E2E:

- verify package and lockfile workspace versions agree
- verify dependency sets agree
- never silently edit the canonical tree just to get a build

### Never repeat

`npm ci` failures should be resolved by proving package/lockfile consistency, not by switching to an unpinned install mode in production.

---

## OR-BUILD-002 — Native Docker dependencies can be broken by `--ignore-scripts`

**Status:** CLOSED / PROCESS GUARD

### Symptom / failure

Native modules required by Docker/runtime could be present in `node_modules` but unusable after installs that suppressed package install scripts.

### Root cause

Some native dependencies require install/build scripts to materialize platform binaries.

### Permanent fix

If `--ignore-scripts` is used for a constrained install, explicitly rebuild/repair required native dependencies before runtime validation.

### Regression protection

Container smoke tests exercise native dependency load before candidate promotion.

### Never repeat

“Package directory exists” does not prove a native Node dependency is runnable.

---

## OR-BUILD-003 — Full repository TypeScript check was treated as an absolute green gate

**Status:** CLOSED

### Symptom / failure

A focused Kimi repair passed targeted tests but the harness failed on thousands of pre-existing repository-wide TypeScript diagnostics.

### Example baseline

The Kimi cutover captured a baseline of approximately 4,786 existing diagnostics on the same source tree.

### Root cause

The harness incorrectly required `npx tsc --noEmit` to become globally green even though the branch already had a large unrelated error baseline.

### Permanent fix

Use same-worktree baseline comparison:

- capture baseline before patch
- run post-patch compiler with identical options
- fail only on new stable diagnostic identities
- additionally require changed files to have zero post-patch diagnostics

### Regression protection

A focused patch is responsible for **no new errors**, not for repairing every historic unrelated error.

### Never repeat

Never introduce an absolute global typecheck gate without first proving the baseline is globally green.

---

## OR-BUILD-004 — TypeScript comparator used full diagnostic prose as identity

**Status:** CLOSED

### Symptom / failure

Kimi R4 cutover reported many “new” diagnostics in unchanged files even though the underlying errors were the same.

### Root cause

The comparator treated complete multiline TypeScript diagnostic text as identity. TypeScript can expand type/union explanatory prose differently between runs while preserving the same error location/code.

### Permanent fix

Use a stable key:

`normalized file + line + column + TS error code`

Also:

- run `tsc --pretty false`
- fail on parser blind spots
- fail if changed files have any diagnostics
- compare multiplicity with a counter

### Regression protection

Self-test proves message-prose drift does not create a fake new error while a changed line/code does.

### Never repeat

Compiler prose is presentation; stable location/code is diagnostic identity.

---

## OR-BUILD-005 — Pre-existing full-suite failures were incorrectly at risk of being attributed to a focused patch

**Status:** CLOSED / PROCESS GUARD

### Symptom / failure

During isolated repair work, unrelated tests were already failing on the base revision.

### Known examples encountered

- `8510-adobe-firefly-edits-route.test.ts`
- `a2a-v1-compat-10839.test.ts`

### Permanent fix

Capture pre-patch baseline on the exact same worktree and isolate focused regressions from known unrelated failures.

### Never repeat

A patch should not be blamed for a failure demonstrably present on its parent revision.

---

## OR-BUILD-006 — PR quality-gate status was oversimplified

**Status:** CLOSED / PROCESS GUARD

### Symptom / failure

A Kimi durability PR had successful security/static checks while an overall quality gate remained failed because of impacted-test/TIA behavior.

### Impact

It would have been incorrect to describe the PR as “fully green.”

### Permanent fix

Report CI status per check and discriminate:

- security/static success
- impacted-test subset/TIA result
- focused regression status
- overall combined status

### Never repeat

Do not collapse a multi-check CI result into “green” or “red” without understanding which gate failed.

---

## OR-BUILD-007 — Missing `playwright` dependency caused seven false full-suite failures

**Status:** CLOSED

### Symptom / failure

Auth Keeper closure run:

- Kimi targeted tests: `15/15` pass
- `npm run check`: pass
- full suite: seven test files failed immediately with `ERR_MODULE_NOT_FOUND: playwright`

### Decisive evidence

Every failing file died at module import from `src/browser.mjs`; test assertions never ran.

### Root cause

The reconciled worktree no longer had lockfile-pinned runtime dependencies installed.

### Permanent fix

Before full-suite proof:

1. check whether `playwright` resolves,
2. if absent, run `npm ci` from the pinned lockfile,
3. skip browser download when system Chrome is the intended runtime,
4. verify worktree remains clean,
5. verify HEAD SHA unchanged,
6. rerun the exact expected suite.

### Final proof

`217 tests / 217 pass / 0 fail`

### Never repeat

A module-load dependency failure is an environment failure, not evidence that seven independent feature tests regressed.

---

## OR-BUILD-008 — Flaky CI polling deadlines were too narrow

**Status:** CLOSED / PROCESS GUARD

### Symptom / failure

Asynchronous CI/service checks could exceed a narrow polling deadline even when the underlying component was healthy.

### Permanent fix

Use bounded but realistic polling windows and distinguish “not ready yet” from a proven failure.

### Never repeat

A health poll timeout must reflect actual startup/CI latency rather than an arbitrary short constant.

---

# 6. Git, branch, worktree, and source-identity incidents

## OR-GIT-001 — Wrong base / divergent branch changed intended history

**Status:** CLOSED

### Symptom / failure

A feature/repair branch was rebased against the wrong or newly diverged release history; observed divergence included a non-zero count on both sides.

### Root cause

The repair proceeded before re-proving base/head identities.

### Permanent fix

Before integration:

- fetch/refresh upstream
- record exact base SHA
- record exact head SHA
- verify intended divergence
- verify allowed file scope
- run `git diff --check`

### Never repeat

Do not rebase or merge a repair branch until the exact base and intended file set are pinned.

---

## OR-GIT-002 — Git ancestry was used as semantic proof

**Status:** CLOSED

### Symptom / failure

A valid repair could be rejected because the expected commit was not an ancestor after cherry-pick/rebase/reconciliation, even though the relevant source was byte-identical.

### Root cause

The gate used history topology as a proxy for behavior.

### Permanent fix

For behavior-critical files, compare:

- blob SHA
- byte identity
- exact semantic markers
- focused tests

Use ancestry only for integration history questions.

### Never repeat

A cherry-picked fix can be semantically identical without preserving the original ancestry.

---

## OR-GIT-003 — Kimi/Auth Keeper repair existed on another branch while the inspected worktree had different modifications

**Status:** CLOSED

### Symptom / failure

The active worktree showed modifications, while the known Kimi fix existed on a different remote branch/commit.

### Impact

Risk of integrating the wrong version or mixing unrelated edits.

### Permanent fix

Perform read-only topology checks:

- current branch
- current HEAD
- clean/dirty state
- target repair commit
- target commit parent
- exact changed files
- exact source diff

### Never repeat

Never “continue from memory” when multiple repair worktrees/branches exist; identify the exact source candidate first.

---

## OR-GIT-004 — Parallel worktrees risked cross-task contamination

**Status:** CLOSED / PROCESS GUARD

### Context

OmniRoute work included separate provider repairs and unrelated PR work (for example provider-deletion work and Z.AI/Kimi branches).

### Permanent fix

Each focused repair uses an isolated worktree/branch with recorded base, allowed paths, and purpose.

### Never repeat

Do not reuse a worktree from an unrelated provider/task merely because it has the right repository.

---

## OR-GIT-005 — Accumulated temporary worktrees/download artifacts created ambiguity

**Status:** CLOSED

### Symptom / failure

Multiple temporary repair worktrees, scripts, logs, and downloaded artifacts made it harder to know which tree/script was canonical.

### Permanent process fix

After a repair is durably published and rollback needs are satisfied:

- retain the canonical branch and final logs
- archive/delete superseded scripts
- remove disposable worktrees
- keep the active production and rollback identities documented

### Closure evidence

The 2026-08-26 cleanup was completed in guarded phases:

- OmniRoute/Auth Keeper Downloads artifacts were moved into timestamped archives with manifests rather than blindly deleted.
- stale Git worktree metadata was pruned.
- clean worktrees were removed only when their exact HEAD was already contained by an `origin/*` branch.
- dirty and unpublished worktrees were held for reconciliation.
- superseded Kimi worktrees were removed only after byte-parity or commit/blob-level comparison against the final production source.
- unique untracked Kimi regression evidence was archived before removal.
- unrelated Mistral, Z.AI, search-blocked-provider, and operations-floor work was intentionally preserved.
- no local branch, remote branch, Docker resource, or application data was deleted as part of cleanup.

### Never repeat

Operational memory must live in Git/docs, not only in a pile of timestamped shell scripts.

---

## OR-GIT-006 — Final production Kimi source was live but not yet durable in the fork

**Status:** CLOSED

### Symptom / failure

The production Kimi Web scheduler repair was running successfully from exact local commit
`4d995a75a8703b1fb7342e3bfbd24e02bc6e95f4`, but that commit was not addressable in
`Zartharas/OmniRoute` after the runtime repair had already been accepted.

### Impact

A workstation loss, accidental worktree deletion, or later cleanup could have destroyed the
only convenient source copy of the exact production repair even though the live container was
healthy. Reconstructing an equivalent patch later would not provide exact source provenance.

### Decisive evidence

Before publication, GitHub returned no commit for
`4d995a75a8703b1fb7342e3bfbd24e02bc6e95f4`. The preserved final Kimi worktree was clean,
its parent was exactly `fce6dbef543338fd57f9b9e80730e06da0f8adb9`, and the commit scope
was exactly two files:

- `src/lib/tokenHealthCheck.ts`
- `tests/unit/token-health-check-kimi-web-provider-sweep.test.ts`

### Root cause

Production/runtime closure happened before the exact tested local commit had been published to
the fork. The source remained safe only because the final worktree was explicitly protected
during cleanup.

### Permanent fix

Publish the exact existing commit object, without recreation or force push, to the fork-only
branch:

`fix/kimi-web-provider-health-sweep-20260826-155148`

The publication gate required:

- exact commit SHA and parent SHA
- exact two-file scope
- exact blob identities
- clean local worktree
- fork-origin identity
- remote branch race gate
- non-force push
- post-push remote SHA attestation
- post-fetch blob attestation
- no default-branch mutation
- no upstream mutation
- no Docker or application-data mutation

### Closure evidence

GitHub now resolves the exact commit:

`4d995a75a8703b1fb7342e3bfbd24e02bc6e95f4`

with parent:

`fce6dbef543338fd57f9b9e80730e06da0f8adb9`

and exact blobs:

- `src/lib/tokenHealthCheck.ts` -> `a9f91c41a06a3ec0f6310af4b9bc03e11eb3b182`
- `tests/unit/token-health-check-kimi-web-provider-sweep.test.ts` -> `a23eb5f1b5792bfddc66ace70584d735cd79e591`

The fork default branch was intentionally not changed by this durability publication.

### Regression protection

A production repair is not considered source-durably closed until its exact tested commit is
reachable from the fork (or another explicitly approved durable remote) and the remote SHA/blob
identity has been attested.

### Never repeat

Do not clean up the final repair worktree or declare source closure solely because the runtime is
healthy. Publish and attest the exact tested source first.

---

# 7. Shell, scripting, and release-harness incidents

## OR-HARNESS-001 — Docker `exec` Node stdin was not kept open

**Status:** CLOSED

### Symptom / failure

A helper sent JavaScript to `docker exec ... node -` without `-i`, causing stdin to close and Node to exit without executing the intended helper.

### Impact

The harness could emit a false database or lifecycle failure despite an exit code that looked harmless.

### Permanent fix

Use the proven form:

`docker exec -i <container> node - <args> < helper.js`

### Regression protection

Harness self-tests validate stdin execution before any mutation.

### Never repeat

Any container command that consumes stdin must explicitly keep stdin attached.

---

## OR-HARNESS-002 — Heredoc error-handler placement leaked shell text into Python

**Status:** CLOSED

### Symptom / failure

A construct around `<<PY || ...` was syntactically acceptable to `bash -n` but caused shell/error-handler text to become part of Python input.

### Root cause

Heredoc termination and shell control-flow syntax were arranged unsafely.

### Permanent fix

Separate heredoc execution from shell error handling; compile-check embedded Python blocks independently.

### Regression protection

- `bash -n`
- extract/compile every embedded Python block
- extract/`node --check` every embedded Node block

### Never repeat

Passing `bash -n` does not prove embedded-language blocks are valid.

---

## OR-HARNESS-003 — Malformed inline Python assignment stopped a resume path

**Status:** CLOSED

### Symptom / failure

An inline helper contained malformed Python equivalent to `key, value =` and stopped before mutation.

### Permanent fix

Compile-check every embedded Python block before running the harness.

### Never repeat

Generated helper code must be syntax-validated as its own language, not only as shell text.

---

## OR-HARNESS-004 — Helper functions mutated global `errexit` state

**Status:** CLOSED / BANNED PATTERN

### Symptom / failure

Utility functions using `set +e` / `set -e` could leak shell execution-mode changes to callers.

### Impact

Subsequent commands might unexpectedly ignore failures or abort.

### Permanent fix

Use subshells or explicit status capture so helpers do not mutate caller-global shell options.

### Regression protection

“helper global errexit mutation” is a banned pattern in final cutover harnesses.

### Never repeat

A utility function must not silently change the failure semantics of the rest of the script.

---

## OR-HARNESS-005 — macOS Bash 3.2 incompatible/malformed substring expansion

**Status:** CLOSED

### Symptom / failure

Kimi R5 reached commit/build and stopped with:

`bad substitution`

The generated code had effectively split:

`${CANDIDATE_SHA:0:12}`

across multiple lines inside the parameter expansion.

### Root cause

Generated Bash parameter expansion was malformed and insufficiently tested against the target shell.

### Permanent fix

Use portable:

`printf '%.12s' "$CANDIDATE_SHA"`

### Regression protection

- macOS Bash 3.2 compatibility audit
- no multiline parameter expansions
- portable short-SHA self-test

### Never repeat

Do not use clever shell expansion when a simple portable command is clearer and safer.

---

## OR-HARNESS-006 — Failure trap reported `exit_code=0` after a failed run

**Status:** CLOSED

### Symptom / failure

The same R5 run visibly failed but the final fail-closed block printed `exit_code=0`.

### Root cause

The EXIT cleanup trusted `$?` even in a shell-expansion failure path where the observed status did not represent the overall unsuccessful run.

### Permanent fix

If the run-success marker was never set, cleanup coerces zero to non-zero before reporting/exiting.

### Regression protection

Startup self-test explicitly proves “non-success + rc 0” becomes process failure.

### Never repeat

A failure-reporting trap must never allow a visibly failed run to return success.

---

## OR-HARNESS-007 — Full-message typecheck regression detector produced false positives

**Status:** CLOSED

See `OR-BUILD-004`. This is also a release-harness defect because it blocked production cutover after the Kimi source patch itself had passed.

### Never repeat

Comparison tooling is production tooling. Test the comparator itself.

---

## OR-HARNESS-008 — Candidate was advanced without first proving every post-stop operation

**Status:** CLOSED / PROCESS GUARD

### Risk

Once the live container is stopped, every remaining command must already have been rehearsed because a shell/tool mistake can lengthen outage or complicate rollback.

### Permanent fix

Rehearse post-stop operations against disposable snapshots before the mutation window.

### Never repeat

Do not discover command syntax after production has been stopped.

---


## OR-HARNESS-009 — Node stdin execution used `"-"` as a module-resolution filename

**Status:** CLOSED

### Symptom / failure

A management-auth probe run with `node -` attempted `createRequire(process.argv[1])`; stdin mode sets that argument to `"-"`, which is not an absolute filename or file URL.

### Permanent fix

Anchor module resolution to a known absolute `package.json` path instead of stdin's synthetic filename.

### Never repeat

When Node executes from stdin, do not treat `process.argv[1]` as a real script path.

---

## OR-HARNESS-010 — Management auth and trusted-locality failures were initially conflated

**Status:** CLOSED

### Symptom / failure

Container-loopback management probes returned `401 AUTH_001`, which could be mistaken for failed trusted-loopback stamping.

### Decisive evidence

The LOCAL_ONLY route did **not** return `403 LOCAL_ONLY`; it reached ordinary management authentication and returned `401`.

### Permanent fix

Use response semantics to separate:

- `403 LOCAL_ONLY` -> locality rejection
- `401 AUTH_001` -> management authentication rejection

When management auth is unnecessary for the target proof, use the production CLIENT_API path instead of forcing management credentials.

### Never repeat

Do not diagnose authentication and locality from the same generic 401/403 bucket.

---

## OR-HARNESS-011 — Live browser-contract capture was blocked by modal UI state

**Status:** CLOSED

### Symptom / failure

A Conol Radix dialog intercepted pointer events and caused the first dynamic request-capture harness to time out on the composer.

### Permanent fix

Use a disposable copy of the authenticated browser profile, dismiss or remove modal state only in that disposable page, programmatically focus the composer, and intercept/abort every non-GET request before it reaches the provider.

### Regression protection

Dynamic web-contract capture must prove:

- canonical Keeper profile not mutated
- credential value not printed
- target request captured before abort
- provider mutation did not occur

### Never repeat

Do not make evidence collection depend on incidental live UI overlays or mutate the canonical authenticated browser profile to get around them.

---

## OR-HARNESS-012 — Full-suite comparator treated expected fixture errors as regressions

**Status:** CLOSED

### Symptom / failure

A baseline comparator classified thousands of expected test-fixture logs (`401`, `429`, quota errors, simulated network failures) as failure fingerprints and reported hundreds of false "new failures."

### Root cause

The comparator parsed application log severity instead of actual Node test-runner results and initially recognized only TAP-style summary lines.

### Permanent fix

Compare actual test-runner evidence:

- TAP `not ok` names
- spec-runner `✖`/`✗` names
- Node `# ...` or `ℹ ...` summary sequences
- true command/infrastructure failures only

Normalize both literal and URL-encoded worktree paths before comparison.

### Never repeat

Expected error-path logs are test data, not test failures. Baseline comparison must consume the test runner's result protocol.

---

## OR-HARNESS-013 — Runtime mount parity assumed `/app/data` was the only mount

**Status:** CLOSED

### Symptom / failure

A candidate canary failed closed because the live container also had the intentional read-only unified workload-policy bind:

`/run/omniroute-unified/workload-policy.json`

### Permanent fix

Require the exact proven two-mount contract:

- writable `/app/data` volume
- read-only workload-policy bind

Also preserve the environment path and canonicalize Docker Desktop `/host_mnt/Users/...` versus `/Users/...` source forms.

### Never repeat

Do not reduce runtime parity to "the mount I care about." Reproduce all proven operational mounts and fail closed on unexpected additions or permission changes.

---

## OR-HARNESS-014 — Documentation-only CRLF edit tripped `git diff --check`

**Status:** CLOSED

### Symptom / failure

A documentation-only edit to a CRLF file introduced visible `^M` trailing-whitespace failures even though the Conol RED->GREEN behavior was already passing.

### Permanent fix

Prove the file's executable body was unchanged, restore the unnecessary documentation-only edit, and keep the source patch scoped to the two behavioral/test files.

### Never repeat

Do not normalize or partially rewrite line endings in unrelated files during a focused repair merely to update commentary.

---



## OR-HARNESS-015 — R21 full-suite harness defeated OmniRoute's per-process `DATA_DIR` isolation

**Status:** CLOSED
**First observed:** 2026-08-27
**Closed:** 2026-08-27
**Affected component:** test/release harness
**Affected provider:** Arena/LMArena repair validation

### Symptom / failure

The R21 Arena guidance candidate passed its focused safety tests, existing Arena/LMArena regressions, and changed-file lint, but the repository-wide unit regression appeared to hang/stall under high concurrency.

### Impact

The harness could falsely suggest a source regression or host/Docker instability and could unnecessarily prolong a validation run.

### Decisive evidence

OmniRoute's own `tests/_setup/isolateDataDir.ts` states that each `node:test` file process must receive its own temporary `DATA_DIR` to prevent concurrent SQLite lock contention.

That preloader only creates a unique temporary directory when `DATA_DIR` is unset.

R21 instead exported one shared explicit directory for the entire concurrent test run:

`DATA_DIR=<single shared isolated path>`

The pinned repository test command also used concurrency `20`, amplifying the shared-SQLite collision risk.

### Root cause

The R21 wrapper unintentionally overrode OmniRoute's test isolation contract. A single explicit `DATA_DIR` was shared by many concurrent test processes, defeating the repository's built-in per-process SQLite isolation.

### Permanent fix

R22 leaves `DATA_DIR` unset for repository-wide tests so `tests/_setup/isolateDataDir.ts` creates a unique temporary directory per test-file process.

R22 also uses the repository's `test:unit:ci` path:

- `--test-force-exit`
- concurrency `4`
- per-process test `DATA_DIR`
- `APP_LOG_TO_FILE=false`
- system-trust writes disabled
- DNS writes disabled

### Regression protection

Future repository-wide OmniRoute test harnesses must:

- never export one shared `DATA_DIR` across concurrent test processes
- allow `tests/_setup/isolateDataDir.ts` to own test DB isolation
- use bounded concurrency for repair validation
- use `--test-force-exit` where the repository's supported test command already provides it

### Rollback / safety notes

The failed/stalled R21 validation did not modify canonical OmniRoute source, Keeper source, production credentials, provider state, or the live OmniRoute database.

### Never repeat

Do not override a repository's isolation preloader with a shared environment value merely because the shared path itself is disposable.

---

## OR-HARNESS-016 — Docker Desktop received repeated termination signals during R21 campaign

**Status:** MONITOR — future harness interaction mitigated; original signal sender unresolved
**First observed:** 2026-08-27
**Closed:** N/A
**Affected component:** macOS Docker Desktop / validation environment
**Affected provider:** N/A

### Symptom / failure

During the R21 full-regression campaign, Docker Desktop became unavailable twice. The Docker backend shut down at approximately:

- 2026-08-27 12:22:20 CDT
- 2026-08-27 13:02:47 CDT

After the second event, Docker-related macOS processes were still observable while the `desktop-linux` engine was unreachable.

### Impact

The event could be misdiagnosed as:

- Docker OOM
- Resource Saver
- disk pressure
- an OmniRoute `docker stop`
- a Docker virtualization crash
- a provider-side failure

It also distracted the Arena repair by making the test-suite stall look Docker-related before the independent shared-`DATA_DIR` defect was identified.

### Decisive evidence

Docker's backend logs recorded, before shutdown cleanup:

`engine linux/virtualization-framework shutdown requested (cancel cause: terminated signal received)`

For both events, `com.docker.virtualization.watchdog` reported:

`watchdog detected parent process disappeared`

only **after** the backend had already received the termination signal and begun shutdown.

Therefore the watchdog parent-disappearance message is a downstream consequence of backend termination, not proof of the original signal sender.

Additional negative evidence:

- no Docker backend OOM signature
- no disk-pressure signature
- Resource Saver behavior did not match the full Desktop/backend exit
- no explicit Docker Desktop stop/kill command was found in the narrow shell-history scan
- no matching LaunchAgent/LaunchDaemon Docker killer was found
- static OmniRoute scans found no direct Docker Desktop control path
- Firefly unit process-kill tests use mocks/safety guards and do not establish a Docker kill path

### Root cause

**UNKNOWN.**

Historical retained logs prove that the Docker backend received a termination signal, but they do not identify the process that sent it.

Do not rewrite the root cause as “parent process disappeared”: that watchdog event happened after backend shutdown had already started.

### Mitigation / process fix

R22 removes Docker from the Arena guidance validation path:

- the harness never invokes the Docker CLI
- Docker is not a prerequisite or health gate
- any incidental Docker client code in the full unit run is pointed at an intentionally nonexistent socket
- no production Docker container/engine mutation is permitted
- the repository-wide test run uses correct per-process `DATA_DIR` isolation

This prevents future Arena guidance validation from depending on or intentionally interacting with the live Docker Desktop engine.

### Regression protection

For test campaigns that do not require Docker:

- do not target the live Docker Desktop socket
- do not start/restart Docker as a test prerequisite
- separate Docker lifecycle observations from application test failures
- preserve exact timestamps before attributing causation

If the termination repeats outside R21/R22 activity, capture the signal sender at event time rather than inferring it from post-exit watchdog messages.

### Rollback / safety notes

No Docker settings were changed during the investigation. Resource Saver, Docker CPU/RAM settings, images, containers, and volumes were not modified to diagnose this event.

### Never repeat

A downstream watchdog “parent disappeared” message does not identify who terminated the parent. Do not claim a Docker root cause until the signal sender is actually evidenced.

---


# 8. Auth Keeper and recovery-watcher incidents

## OR-AK-001 — Auth Keeper used the wrong persistent data directory assumption

**Status:** CLOSED

### Symptom / failure

Diagnostics looked in a repository-local data path while the installed service actually used the persistent macOS Application Support data directory.

### Impact

The wrong state/profile could be inspected, leading to incorrect lifecycle conclusions.

### Permanent fix

Treat the installed service's Application Support path as authoritative. Derive runtime/data paths from the service configuration rather than repository layout.

### Never repeat

Repository source location and installed persistent-state location are different identities.

---

## OR-AK-002 — Kimi refresh token was captured but not projected through the contract adapter

**Status:** CLOSED

### Symptom / failure

Keeper could capture Kimi browser material but the adapted credential omitted the refresh lifecycle, leaving OmniRoute with access-only material.

### Root cause

`adaptKimiContractCapture` projected access token aliases but not the captured `localStorage:refresh_token`.

### Permanent fix

Project Kimi lifecycle material into:

- top-level access token
- top-level refresh token where contract requires it
- provider-specific access aliases
- provider-specific refresh aliases (`refresh_token` and `refreshToken`)

### Regression protection

Dedicated Kimi contract adapter regression tests.

### Durable repair provenance

Auth Keeper fork ultimately fast-forwarded to tested commit:

`259aebf4e3902d744a5cc261c74e32cadf737a3d`

with full `217/217` suite passing.

### Never repeat

A browser capture is not durable simply because an access token exists; lifecycle credentials must survive every adapter boundary.

---

## OR-AK-003 — Kimi Keeper accepted weak access-only / legacy-cookie-only sessions

**Status:** CLOSED

### Symptom / failure

Earlier behavior could accept a short-lived access token or legacy Kimi cookie without proving the refresh lifecycle required for durable management.

### Root cause

The Keeper contract was shaped like a generic token/cookie adapter rather than a refreshable browser-session lifecycle.

### Permanent fix

Reconciled Kimi Keeper contract now:

- uses `https://www.kimi.ai/`
- captures `localStorage:access_token`
- captures `localStorage:refresh_token`
- validates access against `https://www.kimi.ai/api/user`
- rejects access-only capture
- rejects legacy-cookie-only capture
- preserves refresh aliases
- fails inconclusive without overwriting stable credentials

### Regression protection

Focused Kimi tests plus full Keeper suite.

### Never repeat

For a refreshable provider, “credential present” must mean the complete durable lifecycle is present and authenticated.

---

## OR-AK-004 — Kimi macOS real-Keychain handling was missing from contract inspection

**Status:** CLOSED

### Symptom / failure

Kimi browser inspection on macOS could miss the real Chrome cookie/keychain behavior required by the contract-specific path.

### Permanent fix

Add Kimi-specific real-Keychain inspection/correction while preserving normal human system-Chrome authentication and existing Qwen behavior.

### Regression protection

Tests prove:

- Kimi contract inspection uses the real macOS Chrome keychain
- the correction does not alter normal interactive Chrome authentication

### Never repeat

Browser automation and offline browser-profile inspection have different keychain requirements; do not conflate them.

---

## OR-AK-005 — Generic web-cookie validation accepted an invalid Z.AI session

**Status:** CLOSED

### Symptom / failure

A syntactically present Z.AI credential could be treated as valid even when an intentionally invalid session was supplied.

### Root cause

Presence/shape validation was mistaken for authenticated semantic validation.

### Permanent fix

Add a GET-only, body-free authenticated probe against the provider's user/settings boundary and compare live vs fixed-invalid semantics.

### Safety properties

- no response-body credential leakage
- invalid controls contain fixed synthetic data only
- production automatic-recovery trigger remains exact non-terminal OmniRoute HTTP `401`

### Never repeat

Credential presence is not proof of authentication.

---

## OR-AK-006 — Recovery watcher could become dangerous without explicit observer/apply boundaries

**Status:** CLOSED / ARCHITECTURAL GUARD

### Required behavior established

- observer mode is default
- continuous recovery requires explicit `--apply`
- automatic recovery requires explicit acknowledgement
- watch interval cannot be faster than the supported lower bound
- observer mode performs no recovery POST
- apply mode bounds recoveries per scan
- one-shot apply exits non-zero when an attempted recovery fails
- zero-candidate scans do not mutate
- history is bounded, sanitized, newest-first, and private
- free-form errors/credentials are not persisted
- watcher plist contains no credentials
- watcher replacement waits for launchd teardown before bootstrap

### Never repeat

A watcher must not turn observation into mutation through a default, timeout, or restart side effect.

---

## OR-AK-007 — Unsupported/no-auth capabilities were treated as provider health failures

**Status:** CLOSED

### Symptom / failure

Provider-health probing could attempt auth semantics for providers/capabilities that did not support that probe and produce false failures.

### Root cause

Capability routing lacked explicit “unsupported/skip” semantics.

### Permanent fix

Unsupported probe capabilities are skipped rather than translated into auth failure.

### Regression protection

Provider-neutral health tests include unsupported capability cases.

### Never repeat

“Cannot probe” and “authentication failed” are different states.

---

## OR-AK-008 — UI re-auth/sync left stale local Kimi state presentation

**Status:** MONITOR — operationally reconciled; source root cause not yet proven

### Symptom / failure

After using the Auth Keeper UI to reauthenticate and sync two Kimi accounts:

- OmniRoute connections were active/healthy,
- but Keeper status still showed one account as `REAUTH_REQUIRED` and another as `AUTHENTICATING`.

### Decisive evidence

Running noninteractive Keeper `refresh` against the already-saved profiles produced:

- `refresh=PASS`
- `state=CREDENTIAL_PRESENT`
- both `localStorage:access_token` and `localStorage:refresh_token`
- authenticated probe `PASS`
- no secret output

for both accounts.

### Current conclusion

The browser profiles and durable Kimi credentials were correct; the stale local state was reconciled without another browser login or OmniRoute mutation.

### Operational fix

Use contract-driven noninteractive `refresh` to reconcile local Keeper state after a successful UI login/sync when profile evidence is already present.

### Source follow-up

Do **not** claim a permanent source fix yet. If this repeats, trace the dashboard staged-login/sync state transition and determine why final local state was not persisted/visible.

### Never repeat

Do not reauthenticate a healthy account simply because a local status label is stale; first prove the saved profile with a non-mutating/non-syncing refresh inspection.

---

# 9. Kimi Web application lifecycle incidents

## OR-KIMI-001 — Kimi validator used stale `.com` origin while executor used `.ai`

**Status:** CLOSED / UPSTREAM RECONCILED

### Symptom / failure

Validator/test behavior and executor behavior disagreed about Kimi origin.

### Root cause

A validator path used `www.kimi.com` while the executor/API path had moved to `www.kimi.ai`.

### Upstream reference

- upstream issue `#11515`
- upstream fix PR `#11521`

### Permanent fix

Validator contract uses:

- `https://www.kimi.ai/api/user`
- Origin `https://www.kimi.ai`
- Referer `https://www.kimi.ai/`

### Additional local incident

A stale local test later still expected `.com`; the runtime source was already correct. That failure was fixed in the test, not by regressing production back to `.com`.

### Never repeat

When origin contracts change, update executor, validator, browser contract, and tests together.

---

## OR-KIMI-002 — Kimi provider Test Connection failed because access token had expired

**Status:** CLOSED AS SYMPTOM / LED TO ROOT-CAUSE DISCOVERY

### Symptom / failure

A real application-level Kimi Test Connection returned invalid with no useful response body while the provider row still contained refresh material.

### Decisive evidence

Secret-safe lifecycle inspection showed:

- effective access token present but expired
- provider-specific refresh material present
- reactive refresh code present
- manual refresh route present

### Conclusion

The invalid result was consistent with expired access, not missing credentials or a shell-harness failure.

### Never repeat

When Test Connection fails, classify access expiry and refresh reachability before asking the user to reauthenticate.

---

## OR-KIMI-003 — Proactive Kimi refresh code existed but scheduler could never select Kimi Web

**Status:** CLOSED — PRIMARY PERMANENT KIMI ROOT CAUSE

### Symptom / failure

Kimi Web access tokens repeatedly expired even though dedicated Kimi proactive-refresh logic existed.

### Decisive evidence

Live source and DB semantics proved:

- token-health sweep loaded only `authType="oauth"` rows
- Kimi Web rows were stored as `authType="apikey"`
- exact provider filtering was supported by DB
- dedicated Kimi branch in `checkConnection()` existed
- Kimi refresh implementation existed and was expiry-aware
- manual refresh worked
- reactive `401` refresh worked
- Kimi was not explicitly skipped
- health-check interval was enabled

### Root cause

`KIMI_WEB_PROVIDER_ID_EXCLUDED_FROM_OAUTH_ONLY_TOKEN_HEALTH_SWEEP`

The refresh leaf existed but was unreachable from the scheduler.

### Permanent fix

Add an exact-provider bridge:

- keep existing OAuth query
- separately load `provider="kimi-web"`
- deduplicate by connection ID
- preserve Kimi's dedicated refresh branch
- do **not** query generic `authType="apikey"`
- do **not** add Moonshot/Kimi API key
- do **not** add Kimi Coding API-key provider
- do **not** migrate Kimi Web auth type
- select by provider ID, never account/email identity

### Regression protection

Test requires loader calls equivalent to:

1. `{ authType: "oauth" }`
2. `{ provider: "kimi-web" }`

and proves a Kimi Coding OAuth row remains ordinary OAuth behavior while Kimi Web gets the exact bridge.

### Production proof

Final Kimi cutover passed:

- proactive scheduler bridge live
- explicit refresh before copy
- credential lifecycle preserved across cutover
- same-container restart persistence
- final exact-target Test Connection HTTP 200
- no lifecycle rotation during final test
- rollback retained

### Source durability proof

The exact production commit was subsequently published to the fork-only branch
`fix/kimi-web-provider-health-sweep-20260826-155148` and re-attested remotely:

- commit: `4d995a75a8703b1fb7342e3bfbd24e02bc6e95f4`
- parent: `fce6dbef543338fd57f9b9e80730e06da0f8adb9`
- source blob: `a9f91c41a06a3ec0f6310af4b9bc03e11eb3b182`
- regression-test blob: `a23eb5f1b5792bfddc66ace70584d735cd79e591`
- force push: **NO**
- fork default branch mutation: **NO**
- upstream mutation: **NO**

### Never repeat

Provider authentication classification is not always lifecycle semantics. A provider stored as `apikey` may still require refreshable session scheduling.

---

## OR-KIMI-004 — Reactive Kimi refresh consumed rotated credentials without durable persistence

**Status:** CLOSED

### Symptom / failure

Executor could receive a real `401`, exchange the refresh token, and retry using the new access token, but rotated credentials were not guaranteed to be durably persisted before retry.

### Impact

A request could recover once and then strand the connection because the database still held the old lifecycle.

### Permanent fix

Persistence now occurs **before** retry.

Acceptance contract:

- refresh succeeds
- persistence happens exactly once before retry
- retry uses refreshed access token
- persistence failure means no retry
- if no persistence sink exists, do not consume refresh lifecycle in a way that cannot be saved

### Regression protection

TDD source tests and fork PR verification.

### Never repeat

A refresh is not successful until the rotated lifecycle is durably committed.

---

## OR-KIMI-005 — Kimi lifecycle aliases were inconsistent across layers

**Status:** CLOSED

### Symptom / failure

Top-level and provider-specific credential shapes could differ, e.g. refresh material existing only in provider-specific data.

### Permanent fix

Every Kimi lifecycle boundary explicitly recognizes the supported aliases and preserves the refresh token when rotating.

### Never repeat

Credential schema compatibility must be tested across browser capture, DB storage, refresh service, executor, and update API.

---

## OR-KIMI-006 — Kimi automatic recovery was at risk of being confused with routine token refresh

**Status:** CLOSED / ARCHITECTURAL DECISION

### Risk

Because Auth Keeper can reacquire browser credentials, it could be tempting to schedule Keeper as the routine Kimi refresh engine.

### Decision

Do not do that.

- OmniRoute owns proactive access-token refresh.
- OmniRoute owns reactive `401` refresh.
- Auth Keeper is a browser-session recovery/bootstrap mechanism.

### Regression protection

Kimi remains absent from the automatic-recovery allowlist.

### Never repeat

Do not use interactive/browser recovery infrastructure to replace a provider's normal refresh-token lifecycle.

---

# 10. Kimi repair-harness sequence and lessons

## OR-KIMI-H01 — Early cutover gate used diagnostic suppression flags

See `OR-DEPLOY-004`.

**Outcome:** fail-closed before mutation.

---

## OR-KIMI-H02 — Next cutover revision invented fixed `server.env` permissions

See `OR-DEPLOY-005`.

**Outcome:** false failure/rollback; replaced by source-derived no-widening checks.

---

## OR-KIMI-H03 — Repository-wide typecheck baseline was treated as new failure

See `OR-BUILD-003`.

**Outcome:** Kimi patch itself passed; harness was repaired.

---

## OR-KIMI-H04 — TypeScript diagnostic prose caused false “new errors”

See `OR-BUILD-004`.

**Outcome:** stable-key comparator introduced.

---

## OR-KIMI-H05 — Candidate short-SHA Bash expansion failed

See `OR-HARNESS-005`.

**Outcome:** production still untouched; source tests had already passed.

---

## OR-KIMI-H06 — Failure block masked unsuccessful R5 as exit zero

See `OR-HARNESS-006`.

**Outcome:** cleanup semantics repaired before next run.

---

## OR-KIMI-H07 — Auth Keeper final publish gate failed because `playwright` was not installed

See `OR-BUILD-007`.

**Outcome:** no branch push, no main push, no service install on failed run; corrected run restored dependencies and passed `217/217`.

---

# 11. Provider/runtime behavior incidents outside Kimi

## OR-PROVIDER-001 — Local rate-limit queue saturation returned 503

**Status:** CLOSED AS CLASSIFICATION / MONITOR OPERATIONALLY

### Symptom / failure

Requests waited up to the configured maximum queue time and then returned `503` when all eligible accounts for a model/provider were rate-limited.

### Root cause

This was local capacity/routing exhaustion, not necessarily an upstream service outage.

### Permanent handling

- classify queue saturation separately from provider auth failure
- expose account/model lockout state
- permit configured fallback only when semantically valid
- do not trigger credential recovery for a rate-limit condition

### Never repeat

A `503` produced by the local scheduler/queue must not be diagnosed as a broken provider credential.

---

## OR-PROVIDER-002 — Media-only SSE inputs risked being dropped

**Status:** CLOSED

### Symptom / failure

SSE/executor paths could mishandle requests whose meaningful input was media rather than ordinary text content.

### Permanent fix

Preserve media-only input through request normalization and executor handoff.

### Regression protection

Media-only SSE request tests.

### Never repeat

“Empty text” does not mean “empty request.”

---

## OR-PROVIDER-003 — Retry policy needed to distinguish transient upstream failure from permanent/auth failure

**Status:** CLOSED

### Risk

Blind retry can amplify auth failures, invalid requests, or permanent provider errors.

### Permanent fix

Retry only failures classified as transient/retryable; do not retry semantic/auth failures as if they were network noise.

### Never repeat

Retry policy is part of error classification, not a generic wrapper around every exception.

---

## OR-PROVIDER-004 — Conol Web first-turn session-create contract drift caused provider-side `400`

**Status:** CLOSED

### Symptom / failure

Real `conol-web` chat/model-test requests failed at session creation with:

`Conol session creation failed (HTTP 400)`

The failure affected many models because it occurred before model-specific follow-up handling or response streaming.

### Impact

Conol Web connections could look healthy in generic credential validation while real chat failed. Reauthentication could temporarily distract the investigation without repairing the actual protocol defect.

### Decisive evidence

The evidence sequence deliberately separated credential state from protocol state:

1. Auth Keeper binding, secure Conol session-cookie presence, and synchronization were healthy.
2. A real pinned production chat on the exact failing connection reproduced `POST /api/sessions -> HTTP 400`.
3. Current authenticated Conol browser JavaScript showed that the web client now sends the first user turn inside `POST /api/sessions`.
4. A disposable-profile request interception captured the exact live body without allowing a provider mutation:

   `{"source":{"type":"home"},"messages":[{"type":"text","content":"..."}],"timezone":"America/Chicago"}`

5. OmniRoute's July-era executor and unit tests still required `messages: []` on session creation, then posted the first turn separately.
6. RED tests for the current contract failed against the old executor; GREEN passed after the narrow repair.
7. The exact candidate completed a real pinned Conol chat with HTTP 200 and zero session-create 400s.
8. Guarded production cutover repeated that real chat successfully, followed by post-stop integrity proof and same-container restart persistence.

### Root cause

Conol changed its browser protocol after the integration was originally verified on 2026-07-30. New sessions must carry the first turn during `POST /api/sessions`; OmniRoute still created an empty session and deferred the first user turn to `/api/sessions/{id}/messages`.

This was **not** caused by:

- a stale Auth Keeper cookie
- a missing Keeper binding
- model-specific routing
- follow-up message formatting
- response-stream parsing

### Permanent fix

Exact source commit:

`6060b1370182cad758e8a349668335fa3c6583aa`

Changed only:

- `open-sse/executors/conol-web.ts`
- `tests/unit/conol-web.test.ts`

For a new Conol session, OmniRoute now sends:

- the transformed first-turn message parts
- timezone
- `modelPreset`
- `agentModel`
- optional clamped `agentEffort`

in the same `POST /api/sessions` request.

`POST /api/sessions/{id}/messages` remains follow-up-only, and `/model` remains available for a real model/effort switch on an existing session.

### Regression protection

Focused coverage proves:

- first turn is in session creation
- no duplicate first-turn `/messages` POST
- initial model selection is atomic with first-turn creation
- effort clamping remains correct
- image first-turn handling remains correct
- sticky-session follow-ups remain correct
- later model switching remains correct

Broader comparison on the exact parent and patch trees:

- 34,624 tests on each tree
- 34,527 pass / 76 fail / 21 skipped on each tree
- zero new failed-test names
- zero new infrastructure failures
- 4,785 TypeScript diagnostics on each tree
- zero new TypeScript diagnostics
- zero diagnostics in changed files

Candidate/runtime proof:

- writable snapshot integrity passed for 7 SQLite databases
- offline candidate booted healthy with external egress blocked
- one exact candidate Conol canary returned HTTP 200
- guarded production canary returned HTTP 200
- historical session-create 400 did not reproduce
- post-stop production-candidate data integrity passed
- same-container restart persistence passed
- original pre-cutover production data volume remained untouched during cutover

### Never repeat

Do not infer browser-provider health from a generic Test Connection result. Reproduce the actual executor path, identify the exact failing protocol boundary, then compare that boundary with the current browser client's request contract before changing credentials or mapping every HTTP 400 to authentication.


---

# 12. Human/operator and process errors

## OR-OPS-001 — Similar account names caused an `Unknown account` false alarm

**Status:** CLOSED / PROCESS GUARD

### Symptom / failure

A Kimi validation command used a misspelled account name and returned `Unknown account`.

### Root cause

Manual transcription of a similar account label.

### Permanent process fix

Derive provider/account names from Keeper `status` / matrix output rather than retyping from memory.

### Never repeat

When account names are machine-addressable identifiers, copy them from authoritative output.

---

## OR-OPS-002 — Reauthentication was considered too early during Kimi failures

**Status:** CLOSED / PROCESS GUARD

### Risk

Expired access initially looked like a browser-session failure even though a valid refresh lifecycle existed in OmniRoute.

### Permanent process fix

Before asking for reauth, prove:

1. credential decryption succeeds,
2. access presence/expiry,
3. refresh presence,
4. refresh route,
5. scheduler reachability,
6. reactive refresh behavior.

### Never repeat

Reauthentication is a last resort after lifecycle reachability is disproven.

---

## OR-OPS-003 — Broad repeated diagnostics increased risk without adding discrimination

**Status:** CLOSED / PROCESS GUARD

### Problem

Long repair sessions can drift into rerunning already-proven gates or collecting large dumps that do not separate competing causes.

### Permanent process fix

Record proven gates in this register and reuse them unless the relevant source/runtime identity changed.

### Never repeat

Do not rerun an expensive diagnostic solely because the conversation/session changed.

---

# 13. External/upstream references investigated but not locally reproduced

These are useful context but must not be confused with locally proven incidents.

## EXT-001 — OmniRoute issue `#9338`: Kimi K3 `resource_exhausted` across accounts

**Status:** EXTERNAL REFERENCE

Observed upstream behavior:

- multiple Kimi Web accounts failed for K3 with `resource_exhausted`
- the same accounts succeeded with K2.6

### Lesson

Do not interpret every Kimi `resource_exhausted` response as account quota exhaustion. Discriminate model/provider/protocol regressions from account quota.

---

## EXT-002 — Upstream Kimi validator domain issue `#11515` / fix PR `#11521`

**Status:** EXTERNAL REFERENCE / LOCAL SOURCE RECONCILED

See `OR-KIMI-001`.

---

## EXT-003 — Upstream lifecycle precedence behavior around Kimi refresh

**Status:** EXTERNAL REFERENCE / PRESERVATION REQUIREMENT

When backporting the exact Kimi provider scheduler bridge, existing upstream lifecycle precedence behavior was intentionally preserved rather than rewritten.

### Lesson

A local backport should add only the missing reachability edge; do not replace already-correct upstream lifecycle logic.

---

# 14. Final Kimi closure record

As of 2026-08-26:

## OmniRoute

- exact production source commit: `4d995a75a8703b1fb7342e3bfbd24e02bc6e95f4`
- fork-only durability branch: `fix/kimi-web-provider-health-sweep-20260826-155148`
- remote exact-SHA attestation: **PASS**
- remote exact-blob attestation: **PASS**
- fork default branch changed by durability publication: **NO**
- upstream repository changed by durability publication: **NO**
- exact-provider Kimi Web scheduler bridge: **PASS**
- proactive Kimi refresh: **PASS**
- reactive real-401 refresh: **PRESENT**
- rotated-token persist-before-retry: **PRESERVED**
- same-container restart credential persistence: **PASS**
- exact Kimi Test Connection: **PASS**
- generic API-key sweep introduced: **NO**
- Kimi Web auth-type migration: **NO**
- Moonshot/Kimi API behavior changed: **NO**
- Kimi Coding behavior changed: **NO**

## Auth Keeper

- tested durable commit: `259aebf4e3902d744a5cc261c74e32cadf737a3d`
- targeted Kimi tests: **15/15**
- full suite: **217/217**
- installed service health: **PASS**
- deployed source byte parity: **PASS**
- access token required: **YES**
- refresh token required: **YES**
- authenticated `.ai` probe: **PASS**
- legacy-cookie-only accepted: **NO**
- access-only accepted: **NO**
- Kimi automatic recovery: **DISABLED**
- automatic recovery allowlist: `deepseek-web,zai-web`

## Existing Kimi accounts

Both managed Kimi Web profiles were finally reconciled to:

- `CREDENTIAL_PRESENT`
- captured access token source
- captured refresh token source
- authenticated probe `PASS`
- no last error

No further routine reauthentication or Keeper-to-OmniRoute sync is required for healthy Kimi connections.

---

# 15. Permanent “do not repeat” checklist

Before any future OmniRoute repair:

1. **Pin exact source and runtime identities.**
2. **Prove the symptom on the exact target.**
3. **Do not print secrets or credential-derived fingerprints/HMACs/digests.**
4. **Do not ask for reauthentication until refresh lifecycle is disproven.**
5. **Do not use synthetic credential corruption unless the provider/test explicitly supports it and the test is isolated.**
6. **Do not mutate the original live SQLite volume in place.**
7. **Do not directly open detached read-only SQLite databases.**
8. **Copy DB + WAL + SHM to writable ephemeral storage for inspection.**
9. **Preserve `server.env`/encryption authority when cloning encrypted state.**
10. **Do not generate replacement encryption secrets during migration.**
11. **Treat SIGTERM `143` as acceptable only with post-stop integrity proof.**
12. **Canonicalize Docker Desktop bind paths before parity comparison.**
13. **Treat empty DNS `null`/`[]` as equivalent only when truly empty.**
14. **Never promote diagnostic suppression flags into production.**
15. **Do not invent file-permission invariants unrelated to application requirements.**
16. **Use `docker exec -i` for stdin-driven helpers.**
17. **Compile-check embedded Python and syntax-check embedded Node helpers.**
18. **Do not let helper functions leak `set -e` state.**
19. **Keep scripts compatible with the actual target shell (macOS Bash 3.2 where applicable).**
20. **Failure cleanup must never return exit zero unless the run explicitly reached success.**
21. **Capture test/typecheck baseline before judging focused patches.**
22. **Compare TypeScript diagnostics by stable key, not prose.**
23. **Require changed files to be typecheck-clean even when the repo baseline is not.**
24. **Install pinned dependencies before interpreting module-load test failures.**
25. **Use exact blob/file identity rather than ancestry as semantic proof.**
26. **Isolate repairs in dedicated worktrees with exact allowed file scope.**
27. **Do not mix unrelated provider/PR work in the same repair tree.**
28. **Rehearse every post-stop command before entering a production mutation window.**
29. **Keep automatic browser recovery separate from routine token refresh.**
30. **Treat provider capability “unsupported” as skip, not authentication failure.**
31. **Classify local queue/rate-limit saturation separately from provider outage/auth failure.**
32. **Retry only transient failures.**
33. **Preserve media-only requests.**
34. **Use authoritative status output for account/provider identifiers.**
35. **After a repair is closed, archive superseded worktrees/scripts and update this register.**


36. **Never export one shared `DATA_DIR` across concurrent OmniRoute test-file processes; let `tests/_setup/isolateDataDir.ts` create per-process temporary state.**
37. **Do not attribute Docker Desktop termination to OOM, Resource Saver, a test, or parent-watchdog output without evidence of the initiating signal/control path.**

---

# 16. Template for future incidents

Copy this section for each new defect.

```markdown
## OR-<AREA>-NNN — <short title>

**Status:** OPEN | CLOSED | MONITOR | EXTERNAL REFERENCE
**First observed:** YYYY-MM-DD
**Closed:** YYYY-MM-DD or N/A
**Affected component:** <component>
**Affected provider:** <provider or N/A>

### Symptom / failure

<observable behavior>

### Impact

<what could break or be misdiagnosed>

### Decisive evidence

<shortest evidence that separated the real cause from alternatives>

### Root cause

<proven cause; write UNKNOWN if not yet proven>

### Permanent fix

<source/runtime/process repair>

### Regression protection

<test, invariant, or deployment gate>

### Rollback / safety notes

<relevant rollback behavior>

### Never repeat

<explicit lesson>
```

---

# 17. Maintenance policy

- Update this file whenever a repair reaches a new proven root cause or permanent fix.
- Do not erase old mistakes because the code is now fixed; the purpose is institutional memory.
- If a prior conclusion is disproven, append the correction and mark the old conclusion superseded.
- Keep secrets out of Git history.
- Keep this document in the `Zartharas/OmniRoute` fork/internal branch only unless there is an explicit decision to upstream a sanitized subset.
- Use issue/PR identifiers only when they materially improve provenance.
- Prefer exact technical facts over narrative reconstruction.
