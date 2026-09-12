# R16.32-B Phase Record — Pure Deterministic Candidate Disposition

**Record date:** 2026-09-12  
**Repository:** `Zartharas/OmniRoute`  
**Documentation branch:** `integration/auth-keeper`  
**Local accepted lineage:** newer than this GitHub branch; commit/tree authorities below are recorded from the accepted local evidence.

## Purpose

This phase record supplements `AUTH_KEEPER_ENGINEERING_INCIDENT_LEDGER.md` with the complete R16.32-B implementation, validation-harness incidents, accepted source authorities, and final phase disposition.

R16.32-B implements a pure deterministic disposition/reason evaluator over the normalized hard facts accepted in R16.32-A. It remains completely unwired to dispatch and performs no I/O, credential access, Auth Keeper calls, provider/model calls, scoring, ranking, or fallback mutation.

Primary safety invariant:

`R16.32 output eligibility ⊆ R16.31 input eligibility`

Disposition contract:

- known hard blocker -> `ineligible` with deterministic blocker reason;
- no blocker + any unknown hard fact -> `unresolved` with deterministic unknown reason;
- all v1 hard facts known and non-blocking -> `eligible / ALL_HARD_FACTS_ALLOW`.

A known blocker always dominates uncertainty.

---

## B1 R1 — Expected test SHA did not match shell-heredoc output

**Classification:** Validation-harness hash-accounting failure  
**Product failure:** No  
**Status:** Resolved

The first B1 script created the isolated branch/worktree correctly from accepted A3 and wrote the intended evaluator/test files, but failed before test execution with:

`ERROR=B1_TEST_SHA_UNEXPECTED`

**Root cause**

The expected SHA for `candidateDisposition.test.ts` was calculated from text containing one terminal newline, while the shell heredoc materialized the same semantic test content with an additional trailing blank line. The evaluator source itself already matched its expected SHA.

**Prevention rule**

When a script embeds source/test files with heredocs, hash the exact bytes that the shell will materialize, including EOF newline behavior. Prefer canonical EOF normalization before establishing accepted file hashes.

---

## B1 R2 — All 23 tests passed; Git whitespace gate rejected extra EOF blank lines

**Classification:** Source-materialization whitespace/harness failure  
**Product failure:** No  
**Status:** Resolved

The resumed B1 gate proved:

- exact accepted A3 parent authority;
- exact partial B1 source authority;
- provider-specific literal count: 0;
- runtime I/O primitive count: 0;
- preference/scoring term count: 0;
- runtime import count: 0;
- external dispatch reference count: 0;
- declared tests: 23;
- skipped/todo tests: 0;
- Node 24 + `tsx` runner preflight: PASS;
- focused B1 suite: 23/23 PASS;
- 4,096 deterministic mixed-state disposition samples: PASS.

The gate then failed at `git diff --cached --check` because both newly created files had one extra blank line at EOF.

**Root cause**

The semantic content was correct, but the generated files violated Git whitespace policy.

**Resolution**

Collapse each trailing newline run to exactly one EOF newline, re-hash, re-run the full 23-test suite, restage, and require `git diff --cached --check` to pass before commit.

**Prevention rule**

Generated source files must be canonicalized for EOF whitespace before their accepted SHA is frozen. Semantic test success does not waive repository whitespace policy.

---

## B1 accepted — Pure deterministic evaluator

**Commit:** `555cd4402d2006329f78bae4900a64ccb26a3ffd`  
**Tree:** `2cee967e6f71a9a742a32b0e5edabb9de5cbdb3c`  
**Parent:** accepted A3 `a8ea7291a868087fc278b2b62d542c931b34e837`

**Files introduced**

- `open-sse/services/combo/candidateDisposition.ts`
- `tests/unit/combo/candidateDisposition.test.ts`

**Canonical hashes**

- evaluator module SHA-256: `61907684abd0a3e32695fb86da8d5c053665af87c3891b837705e349e5a65384`;
- B1 test SHA-256: `9c2705284c7df40ce22f04aac98bf90c594ced1682b8aa9c153010b7e6ca030f`.

**Accepted evidence**

- 23/23 focused tests passed;
- 4,096 deterministic mixed-state samples passed;
- known blocker dominates unknown state;
- unknown without blocker remains unresolved;
- eligibility requires every v1 hard fact to be known and non-blocking;
- result surface contains only contract version, disposition, and reason;
- extra identity/preference-shaped input cannot affect the result;
- malformed/missing/future hard facts fail closed;
- no provider-specific branching;
- no runtime I/O;
- no preference scoring;
- no dispatch wiring;
- no live mutation;
- no Auth Keeper or provider/model calls;
- operator and accepted A3 worktrees remained unchanged.

---

## B2 accepted — Property and monotonicity hardening

**Commit:** `b4d3d1ea5a767eefcd06db840cf4abffc74f46b4`  
**Tree:** `16ac3cb00e29890b29b95e9840c1a3d980ff23ab`  
**Parent:** B1 `555cd4402d2006329f78bae4900a64ccb26a3ffd`

B2 was a strict **test-only** commit. The runtime evaluator remained byte-identical at SHA-256:

`61907684abd0a3e32695fb86da8d5c053665af87c3891b837705e349e5a65384`

Updated B2 test SHA-256:

`7969d20540544dbc24f7b1febf74fbb997df1a1ce2374499d1687d43f7c546a7`

**Property evidence**

- 35/35 tests passed;
- adding a blocker never relaxes disposition;
- resolving an unknown to its passing value cannot create an ineligible result in a blocker-free vector;
- resolving an unknown to its blocking value always forces ineligible;
- a pinned known blocker remains ineligible while other facts mutate;
- blocker and unknown reason precedence remain deterministic;
- 2,048 × 14 mixed-state add-blocker samples passed;
- 512 × 14 pinned-blocker mutation samples passed;
- 4,096 unknown-to-pass samples passed;
- 2,048 unknown-to-block samples passed;
- 4,096 blocker-superset samples passed;
- 32,768 pinned-blocker mutation-pair samples passed;
- runtime module changed: NO;
- dispatch wiring changed: NO;
- accepted A3/operator/live runtime remained unchanged.

---

## B3 accepted — Canonical Docker/typecheck/lint/build differential

**Phase:** R16.32-B3, 2026-09-12  
**Classification:** Final phase validation  
**Status:** Accepted

**Baseline authority**

- accepted A3 commit: `a8ea7291a868087fc278b2b62d542c931b34e837`;
- A3 tree: `bf19ca34264b72cee595b92e5e8149c595862b87`.

**Candidate authority**

- B2 commit: `b4d3d1ea5a767eefcd06db840cf4abffc74f46b4`;
- B2 tree: `16ac3cb00e29890b29b95e9840c1a3d980ff23ab`;
- candidate parent: B1 `555cd4402d2006329f78bae4900a64ccb26a3ffd`;
- full A3→B2 diff file count: 2;
- external evaluator runtime-reference count: 0.

**Canonical build authority**

- root Dockerfile builder stage under Node 26;
- lockfile-controlled `npm ci`;
- `OMNIROUTE_USE_TURBOPACK=0` canonical webpack path;
- `OMNIROUTE_BUILD_MEMORY_MB=6144`;
- host `node_modules` reuse: NO;
- exact A3 baseline production build: PASS, RC 0;
- exact B2 candidate production build: PASS, RC 0.

The build emitted the known static-generation proxy fallback message for the agent-bridge route, but the production build completed successfully. It is not classified as a B candidate regression.

**Focused B2 execution**

The production-oriented builder image does not carry the test source, so the exact candidate test tree was mounted read-only after proving the source and mounted SHA:

`7969d20540544dbc24f7b1febf74fbb997df1a1ce2374499d1687d43f7c546a7`

All 35 B2 tests passed inside the exact candidate builder environment.

**TypeScript differential**

Baseline and candidate each produced the same inherited diagnostic:

`src/lib/authKeeper/client.ts(446,26): TS2339: Property 'fetchImpl' does not exist on type 'AuthKeeperClientDependencies'.`

- baseline raw diagnostic count: 1;
- candidate raw diagnostic count: 1;
- candidate-only diagnostic count: 0;
- typecheck differential: PASS.

**Lint differential**

Baseline and candidate each produced the same four inherited lint errors in unrelated existing test files and the same unpruned-suppressions condition.

- baseline full-lint RC: 2;
- candidate full-lint RC: 2;
- candidate B changed-files lint RC: 0;
- normalized baseline lint SHA-256: `040995b0637e5b131dab10424d058944e1f00eaab97d07fd6fcdae0445a71cd9`;
- normalized candidate lint SHA-256: `040995b0637e5b131dab10424d058944e1f00eaab97d07fd6fcdae0445a71cd9`;
- normalized outputs equal: YES;
- full-lint differential: PASS.

**Non-mutation / cleanup**

- disposable baseline source remained clean;
- disposable candidate source remained clean;
- temporary builder images removed;
- temporary worktrees removed;
- accepted B2 worktree unchanged;
- operator checkout unchanged;
- live R16.31 remained running, healthy, restart count 0;
- no live runtime mutation;
- no Auth Keeper mutation/calls;
- no provider/model calls;
- no remote push.

**Final disposition**

`R16_32_B3_STATUS=CANONICAL_DOCKER_DIFFERENTIAL_ACCEPTED`

`RESULT=PASS_R16_32_B3_CANONICAL_DOCKER_DIFFERENTIAL`

`R16_32_B_STATUS=PURE_DETERMINISTIC_DISPOSITION_PHASE_ACCEPTED`

**Next phase**

`R16_32_C_COMPUTATIONAL_SHADOW_EVALUATION_DESIGN`

---

## Durable B-phase prevention rules

1. Freeze hashes only after exact shell/file materialization and canonical EOF normalization.
2. Keep semantic test success and repository whitespace policy as independent gates.
3. Hard blockers must be monotonic: adding or preserving a known blocker can never relax disposition.
4. Unknown facts must never be silently converted into allow or deny; unresolved is a distinct state.
5. Preference/identity/model/provider data must not influence the hard-disposition evaluator.
6. Keep pure evaluator phases unwired until their canonical build/typecheck/lint differential closes.
7. For production-oriented Docker stages, prove test-source materialization separately from dependency/runtime authority.
8. In repositories with inherited quality debt, require zero candidate-only diagnostics plus clean changed files rather than treating shared baseline errors as new regressions.
9. Computational shadowing in R16.32-C must not use the existing real-traffic `shadowRouting.ts` path if that path can issue model/provider calls.
