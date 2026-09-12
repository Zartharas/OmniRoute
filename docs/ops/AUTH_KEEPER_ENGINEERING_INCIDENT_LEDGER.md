# OmniRoute + Auth Keeper Engineering Incident Ledger

**Repository:** `Zartharas/OmniRoute`  
**Branch:** `integration/auth-keeper`  
**Record refreshed:** 2026-09-12  
**Scope:** OmniRoute/Auth Keeper integration, provider/session transport, browser broker, upstream reconciliation, migrations, build/test tooling, cutover/promotion, rollback, and R16.32 routing-intelligence preparation.

> This document is an engineering record, not a claim that every locally accepted R16.x commit is already present on this GitHub branch. The active local integration lineage progressed beyond the current `integration/auth-keeper` branch tip. Where local release/validation evidence is referenced below, commit/image identifiers are recorded so the source authority remains explicit.

## Purpose

This ledger captures recurring defects, operational traps, tooling failures, root causes, fixes, and durable prevention rules discovered while building the OmniRoute + Auth Keeper architecture. It is intentionally broader than a changelog: failures that did **not** represent product defects are retained because they materially affected validation, cutover safety, or engineering time.

The core discipline is evidence-first and fail-closed:

- separate discovery, isolated mutation, validation, build/canary, promotion, and rollback;
- never infer live/source authority from the currently checked-out operator branch;
- never expose credential values in diagnostics;
- keep Auth Keeper as credential/session owner and OmniRoute as routing/execution owner;
- distinguish product defects from harness, dependency, environment, or orchestration failures;
- do not weaken a safety gate merely because a validation script is inconvenient;
- preserve rollback authority before every live mutation;
- do not reuse dependency trees across worktrees without proving compatibility;
- terminal execution should be the final step, not repeated discovery-by-user.

## Status legend

| Status | Meaning |
|---|---|
| Resolved | Root cause understood and repaired/retired. |
| Accepted constraint | Behavior is intentional and must be preserved. |
| Upstream-sensitive | May recur after upstream reconciliation and must be revalidated. |
| Pending validation | Design/source work exists but the next acceptance gate has not yet been completed. |
| Retired | Provider/feature intentionally removed or no longer pursued. |

---

# 1. Architecture and credential-boundary incidents

## 1.1 Container-to-host CLI token authentication returned 401

**Phase:** Early Auth Keeper local-companion integration  
**Classification:** Environment/auth-boundary failure  
**Status:** Resolved

**Symptom**

Auth Keeper operated as a localhost companion, but OmniRoute running inside Docker could not use a host-local CLI token path and returned HTTP 401.

**Root cause**

The authentication model implicitly treated container `localhost` and host `localhost` as the same security boundary. They are not. The token also needed an explicit scope appropriate to the action being performed.

**Resolution**

- established a scoped `oma_` token through `/api/cli/connect`;
- stored the token in Keychain rather than source/config/log output;
- separated ordinary write scope from later administrative provider-mutation scope;
- retained localhost-only Auth Keeper ownership rather than moving secrets into OmniRoute.

**Prevention rule**

Treat host, container, and browser-broker loopback boundaries as separate network/security domains. Never assume a host-local credential path is reachable or semantically identical from a container.

---

## 1.2 `noAuth` was at risk of being interpreted as “no credential exists”

**Phase:** Provider capability modeling / OpenCode + TheOldLLM  
**Classification:** Architecture/capability-model defect  
**Status:** Resolved as a contract rule

**Symptom**

Providers categorized as `noAuth` could accidentally inherit the wrong capability semantics, especially when browser/session credentials existed outside OmniRoute.

**Root cause**

Authentication *mechanism* and credential *ownership* were conflated. A provider can be secretless from OmniRoute’s perspective while Auth Keeper still owns a browser session, OAuth state, or optional API key.

**Resolution**

The architecture was formalized as:

- **OmniRoute:** routing, model selection, retries/fallback, execution policy;
- **Auth Keeper:** API keys, OAuth/browser sessions, refresh/re-auth, health/revocation;
- browser/CDP/Selkies transport: authentication/session transport only, not the routing authority.

OpenCode was modeled as anonymous/free with an optional managed API-key capability. TheOldLLM was modeled as browser/human-verification only and must not inherit API-key capability merely because its registry auth type is `noAuth`.

**Prevention rule**

Never derive credential ownership from a coarse registry auth label. Capability, ownership, and transport are separate dimensions.

---

## 1.3 Auth Keeper secret transport required file-mounted service-token authority

**Phase:** Auth Keeper service boundary hardening  
**Classification:** Security contract hardening  
**Status:** Resolved

**Risk**

Service tokens could have drifted into environment values, ad-hoc request construction, or logs.

**Resolution/contract**

- explicit Auth Keeper base URL plus service-token file are required;
- canonical file path: `/run/secrets/auth_keeper_service_token`;
- Authorization header is constructed from the file-backed token;
- malformed requests must be rejected before token read/network fetch;
- token values are never printed, hashed for display, or copied into evidence.

**Prevention rule**

Diagnostic evidence may record token-file path, mount mode, existence, and authorization result, but never the secret value.

---

# 2. Browser broker, Selkies, CDP, and session persistence

## 2.1 Browser service was unreachable from Docker without host-gateway mapping

**Classification:** Browser-broker network topology failure  
**Status:** Resolved

**Symptom**

The containerized browser/CDP path was not reachable from OmniRoute/Auth Keeper despite the browser itself running.

**Root cause**

Docker did not have the required host-gateway mapping.

**Fix**

Use the explicit host-gateway route (`gateway.docker.internal:host-gateway`) for the browser/CDP topology.

**Prevention rule**

Browser-broker validation must test network reachability from the actual consuming container, not only from the macOS host.

---

## 2.2 Selkies container failed with `unable to find user abc`

**Classification:** Container runtime/configuration error  
**Status:** Resolved

**Symptom**

Browser container startup failed after LinuxServer-style `PUID=501` / `PGID=20` settings were applied.

**Root cause**

Those identity settings were incompatible with the selected Selkies/browser image contract and caused the expected `abc` runtime user lookup to fail.

**Fix**

Remove the incompatible PUID/PGID override and use the image’s native user model.

**Prevention rule**

Do not transplant LinuxServer environment conventions into another image without verifying that image’s entrypoint/user contract.

---

## 2.3 VNC endpoint expectations were wrong for the actual browser UI technology

**Phase:** R16.16B/R16.16C documentation/topology reconciliation  
**Classification:** Documentation/diagnostic-model issue  
**Status:** Resolved

**Symptom**

A VNC-path probe returned 404 and was initially treated as evidence that browser UI transport was broken.

**Root cause**

The existing LinuxServer Chromium stack was Selkies/WebRTC-based, not noVNC/VNC. The README/UI contract did not identify that clearly enough.

**Fix**

Document the actual Selkies browser UI and validate the appropriate WebRTC/web surface rather than a VNC path.

**Prevention rule**

Never diagnose a WebRTC/Selkies browser deployment using an assumed VNC endpoint.

---

## 2.4 Provider launcher repeatedly reused one tab

**Classification:** Browser-session UX/orchestration defect  
**Status:** Design lesson / requires persistent-tab semantics for browser-auth providers

**Symptom**

Launching multiple provider pages repeatedly reused or navigated one tab instead of preserving simultaneous provider tabs.

**Impact**

Provider-specific browser sessions became harder to keep observable and stable, and a launcher-level `goto` loop could mask whether provider sessions were independently alive.

**Required behavior**

Browser-auth providers need persistent tab/session ownership and restoration semantics. The launcher should not assume one reusable navigation target is sufficient.

---

## 2.5 CDP detach was incorrectly equivalent to provider outage

**Classification:** Browser health-model issue  
**Status:** Accepted architectural lesson

**Symptom**

External CDP sessions could disconnect even though the provider browser endpoint/session remained usable.

**Root cause**

Transport liveness (CDP attachment) and provider-session health were treated as one state.

**Prevention rule**

CDP disconnect is not automatically provider failure. Browser-auth providers require session/browser liveness semantics distinct from API-key provider quota/latency scoring.

---

## 2.6 Kimi `.com` / `.ai` origin mismatch and incomplete token capture

**Phase:** Kimi browser-auth recovery, August 2026  
**Classification:** Product/session-capture defect  
**Status:** Resolved through isolated repair design; retain as regression risk

**Evidence**

A fresh `www.kimi.ai` session showed:

- Bearer `/api/user` returned 200;
- cookies-only returned 401;
- access JWT TTL was about 900 seconds;
- refresh JWT TTL was about 90 days.

**Root causes**

- OmniRoute/browser tooling had `.com` versus `.ai` origin inconsistency;
- capture/persistence omitted `refresh_token`;
- Auth Keeper could accept a capture without sufficient validation.

**Repair requirements**

- centralize the Kimi origin authority;
- capture, validate, and persist both access and refresh material without logging values;
- preserve the previous credential when an upstream probe is uncertain;
- validate rotation beyond the 15-minute access-token lifetime;
- do not reauthenticate unrelated accounts as part of repair testing.

---

## 2.7 Kimi session persistence versus CLI health had to be decoupled

**Classification:** Provider health-model issue  
**Status:** Resolved as architecture rule

**Finding**

Browser profile evidence showed durable Kimi state (`.cn_qbim_t`, `kimi-auth`, `sidebarStore`, `sse-mcp-language`) while CLI/API behavior could still fail independently.

**Prevention rule**

Do not use a broken CLI client as proof that a browser-auth session is invalid. Validate the credential/session owner appropriate to the provider transport.

---

# 3. Provider capability and transport incidents

## 3.1 OpenCode forced connection could be ignored by the no-auth early return

**Phase:** R16.17/OpenCode closure work  
**Classification:** Product routing/credential-selection defect  
**Status:** Resolved in isolated repair work

**Root cause**

`getProviderCredentials()` could return early for a no-auth provider before honoring a forced connection selection.

**Prevention rule**

Explicit connection selection must be evaluated before generic no-auth shortcuts when the provider supports an optional managed credential.

---

## 3.2 OpenCode provider-count tests lagged registry expansion

**Classification:** Test expectation drift  
**Status:** Resolved/known pattern

**Symptom**

CI still expected 8 providers after OpenCode made the catalog 9.

**Root cause**

Static test expectations were coupled to a provider count rather than authoritative catalog enumeration.

**Prevention rule**

Registry/catalog-driven tests should derive expected inventory from the canonical provider catalog whenever possible.

---

## 3.3 TheOldLLM same-browser programmatic request returned `403 THEOLDLLM_VERCEL_MITIGATED`

**Phase:** R16.17 provider work  
**Classification:** Upstream human-verification/anti-bot boundary  
**Status:** Retired as an automated provider route

**Finding**

Normal UI interaction could work while same-browser programmatic access was rejected by upstream Vercel mitigation.

**Security/ethics boundary**

The supported response was **not** to replay, harvest, or bypass the human-verification challenge.

Later upstream work removed TheOldLLM after an operator-written takedown. The local architecture therefore treated it as anonymous web + human verification only and removed/retired provider/routability/browser automation surfaces rather than attempting an anti-bot bypass.

**Prevention rule**

Human-verification challenges are an upstream access boundary. Fail closed and require legitimate interactive verification; do not turn browser-state access into challenge circumvention.

---

## 3.4 TheOldLLM browser contract required explicit bounded lifecycle semantics

**Phase:** R16.17C  
**Classification:** Browser transport hardening  
**Status:** Resolved/retained as design reference

The safe same-browser design required:

- fixed origin;
- exact verified page reuse;
- no auto-start;
- idempotent start;
- waiting phase on non-success;
- expiry cleanup;
- maximum TTL of 10 minutes;
- no Playwright/CDP storage-state harvesting;
- no replay of verification state.

---

## 3.5 Stream bridge leaked persistent close listeners

**Phase:** R16.17B  
**Classification:** Product resource-leak defect  
**Status:** Resolved

**Symptom**

Two persistent close listeners remained after normal stream completion.

**Root cause**

Per-read listener cleanup did not cover normal completion/backpressure/downstream-close paths correctly.

**Fix**

Cleanup was expanded across normal completion, backpressure, and downstream-close paths rather than changing runtime abort semantics.

**Prevention rule**

Streaming adapters require explicit listener/resource lifetime tests, including successful completion, not only abort/error cases.

---

# 4. Database, migration, and state-path incidents

## 4.1 Duplicate SQLite migration number `139`

**Classification:** Migration namespace collision  
**Status:** Resolved through isolated repair

**Symptom**

A migration-number collision was confirmed at `139`.

**Repair discipline**

A dedicated clean worktree was pinned to the relevant upstream commit and the repair surface was intentionally limited to:

- `139_job_registry.sql`;
- `migrationRunner.ts`;
- related constants.

Unrelated production, Docker, provider, Z.AI, and issue-8887 changes were excluded.

**Prevention rule**

Migration IDs are global repository namespace. Validate uniqueness before merge/rebase and isolate collision repair from unrelated feature work.

---

## 4.2 SQLite startup failures from missing parent directory

**Classification:** Runtime state-path provisioning defect  
**Status:** Resolved/known operational risk

**Symptoms**

- `better-sqlite3`: database could not be opened because directory did not exist;
- `node:sqlite`: `unable to open database file`.

**Root cause**

The database parent path was assumed to exist.

**Prevention rule**

State-directory provisioning must precede database open/migration. Disposable tests/builds must use isolated `DATA_DIR` values and never point at the operator or live database.

---

## 4.3 Sensitive state under `data/` creates clone/mount collision risk

**Classification:** Operational/security risk  
**Status:** Accepted constraint

Observed state includes account/control-token/profile/state artifacts and browser profile databases.

**Prevention rule**

Do not casually overlay, share, or rebuild against live `data/`. Clone operations must be explicit, integrity-checked, and separated from build/test contexts.

---

# 5. Git worktree, publication, and source-authority incidents

## 5.1 Operator checkout was incorrectly required to equal frozen accepted source

**Phase:** R16.32 roadmap R1  
**Classification:** Validation-script authority bug  
**Status:** Resolved

**Symptom**

The first R16.32 discovery gate required the operator checkout HEAD to equal accepted R16.31.

**Actual topology**

- operator checkout: branch `feat/r16-17-auth-keeper-connection-plane`, HEAD `434ea760f7d7369c8f7390543b979e15f09bdb78`;
- frozen accepted R16.31 source: `34bd2fdbb8b04d848a0157d763c70ec241468e1c`.

The difference was intentional.

**Fix**

Audit immutable accepted commit/tree objects directly and require the operator checkout merely to remain clean and unchanged.

**Prevention rule**

`operator checkout != accepted frozen source != live runtime` is a first-class topology rule.

---

## 5.2 Worktree registration parser broke on paths containing spaces

**Phase:** R16.32-A2 R2  
**Classification:** Script/parser failure  
**Status:** Resolved

**Symptom**

A parser using `awk ... $1=="worktree" { wt=$2 }` truncated:

`/Users/zarthras/Documents/Development Projects/...`

to the path segment before the space.

**Fix**

Parse porcelain records by removing the fixed `worktree ` prefix (`substr`) and compare the complete path.

**Prevention rule**

Never field-split path-bearing Git porcelain output on whitespace. Prefer complete-line parsing or NUL-safe interfaces.

---

## 5.3 Locale-dependent path ordering caused publication gate failure

**Phase:** R16.17 FREE6  
**Classification:** Script determinism failure  
**Status:** Resolved

**Symptom**

Validation failed solely because locale ordering placed `src/providers.mjs` and `src/providerTransportRuntime.mjs` differently than expected.

**Fix**

Use deterministic ordering (Python/specified byte ordering) rather than locale-sensitive shell sort assumptions.

**Prevention rule**

Evidence manifests and changed-file inventories must be deterministic across operator locales.

---

## 5.4 Historical `.codegraph/codegraph.db` exceeded GitHub’s recommended file size

**Phase:** R16.17 FREE8 publication  
**Classification:** Repository hygiene warning  
**Status:** Known historical artifact

GitHub warned that the historical database was about 57.11 MB. It was not introduced by the R16.17 changeset, so the release did not rewrite history or introduce LFS as an unrelated side effect.

**Prevention rule**

Do not perform opportunistic history rewrites during a release/cutover. Handle repository hygiene as a separately authorized change.

---

# 6. Compose, runtime authority, cutover, and rollback incidents

## 6.1 Base Compose render could select an old rollback image

**Phase:** R16.17 closure  
**Classification:** Deployment-authority trap  
**Status:** Resolved/important historical lesson

**Symptom**

The live canonical runtime had been created with a candidate Compose overlay, but rendering only the six base Compose files still selected the old rollback image.

**Impact**

A future recreate/restart using incomplete Compose authority could silently regress the running image.

**Prevention rule**

Promotion is incomplete until image authority is materialized into the durable deployment topology. Always prove what a future recreate will select, not just what is currently running.

---

## 6.2 Cutover needed transaction-style data clone and collision gates

**Phase:** R16.27a  
**Classification:** Cutover risk control  
**Status:** Resolved/retained process

R16.27a readiness used an isolated Compose-project swap with a data clone and validated 37/37 cutover fields, candidate/live parity, Auth Keeper mount/loopback contracts, and absence of volume/helper collisions. A rollback reference was preserved before promotion.

**Prevention rule**

Treat cutover as a transaction: preflight, immutable source/image authority, cloned state, collision check, health/auth checks, rollback ref, then promotion.

---

## 6.3 R16.31 promotion helper required root clone authority and interactive Docker stdin

**Phase:** R16.31 promotion  
**Classification:** Promotion-tooling failure  
**Status:** Resolved in promotion R2

**Symptoms/root causes**

- clone helper permissions required root execution for correct state copying;
- Docker exec heredoc required `-i` so stdin reached the container helper.

**Fix**

Promotion R2 corrected both issues before final cutover.

**Accepted R16.31 authority**

- source commit: `34bd2fdbb8b04d848a0157d763c70ec241468e1c`;
- tree: `7d7b256d92036093535063fb930fe79bb3df4535`;
- live image ID: `sha256:370d49896920568bc5adbfe71316879368ec93be0cd020cf1b546fa3ef2640aa`;
- live container: `mer-omniroute`;
- restart count: `0` after acceptance;
- Auth Keeper unauthorized/authorized probes: `401/200`;
- rollback R16.30 runtime/container and data volume retained;
- cloned-state count/digest checks passed.

**Prevention rule**

Promotion helpers must be validated under the same user/TTY/stdin model they will use during actual cutover.

---

# 7. Dependency and production-build incidents

## 7.1 Root `node_modules` symlink caused Turbopack build failure

**Classification:** Build-environment/worktree failure  
**Status:** Resolved as a permanent rule

**Symptom**

A production build failed when an isolated worktree’s root `node_modules` was a symlink outside the worktree.

**Root cause**

Turbopack rejected/resolved the external dependency topology differently from a normal local dependency tree.

**Prevention rule**

Do not treat cross-worktree `node_modules` symlinks as a canonical production-build environment. Use the repository’s lockfile-controlled Docker builder (`npm ci`) when exact local dependency parity is unavailable.

---

## 7.2 ONNX Runtime duplicate native-library SONAME conflict

**Classification:** Upstream dependency/native-build issue on the fork  
**Status:** Resolved on the fork branch; upstream-sensitive

**Symptom**

`@huggingface/transformers` pinned `onnxruntime-node` 1.24.3 while a root dependency bump allowed 1.27.x, causing two native copies of `libonnxruntime.so.1`. Runtime/native-loader ordering then produced version/SONAME conflicts during Docker verification.

**Fix**

Pin the root dependency to the exact compatible 1.24.3 line so npm dedupes to one native copy; verify with a regression test and real Docker build.

**Prevention rule**

For native Node packages, semver compatibility is insufficient when multiple copies export the same SONAME. Lockfile topology and native-loader behavior must be validated.

---

## 7.3 Snapshot builds intentionally avoided opportunistic dependency installation

**Phase:** R16.21/R16.22  
**Classification:** Process rule  
**Status:** Accepted constraint

Exact Git-archive snapshots copied dependencies only from a proven runtime; package install, live cutover, operator DB mutation, Docker mutation, and remote push were disabled during the source-validation phase.

**Prevention rule**

Do not install/update dependencies merely to make an isolated source check convenient. Either prove compatibility with an existing tree or use a disposable lockfile-controlled build environment.

---

# 8. Upstream reconciliation and cherry-pick incidents

## 8.1 Kimi upstream cherry-pick conflicted in provider settings/categories

**Classification:** Upstream reconciliation conflict  
**Status:** Resolved; recurring risk

**Symptom**

An upstream Kimi commit conflicted with local provider categories/settings because both sides had evolved provider registry/UI structures.

**Resolution**

Perform a semantic reconciliation: preserve local categories/UI guarantees while integrating the new provider parameters and wiring.

**Prevention rule**

Do not treat a clean textual cherry-pick as proof of semantic compatibility, and do not treat a textual conflict as proof the feature is incompatible.

---

## 8.2 “Both added” conflicts can mean local equivalent already exists

**Classification:** Upstream reconciliation ambiguity  
**Status:** Known pattern

Model-family/deprecation/caching changes were encountered where both upstream and local branches added equivalent files or behavior independently.

**Prevention rule**

Use semantic diff and behavior tests before accepting/rejecting a cherry-pick. Re-applying equivalent code can create regressions even if Git allows it.

---

## 8.3 Stale upstream fixes must be revalidated rather than blindly imported

Examples encountered during reconciliation included stale/closed tool-choice, XML-escape, provider-specific quota, and Copilot fixes.

**Prevention rule**

For every upstream candidate:

1. identify the exact defect it addressed;
2. determine whether the local branch still exhibits that defect;
3. compare current upstream implementation and local equivalent;
4. import only if the defect still exists and the patch does not violate Auth Keeper boundaries.

---

# 9. R16.32-A normalized-candidate-facts validation incident sequence

This section is intentionally detailed because it demonstrates how repeated harness assumptions can waste operator time even while fail-closed controls prevent product damage.

## 9.1 A2 R1: isolated Vitest config could not resolve dependencies

**Classification:** Test harness/environment failure  
**Product failure:** No  
**Test code executed:** No

The isolated worktree had no `node_modules`, so Vitest config loading failed on packages such as `vitest/config` and `@vitejs/plugin-react`.

**Lesson**

Prove the runner’s dependency/config environment before calling the test.

---

## 9.2 A2 R2: worktree parser was not space-safe

**Classification:** Script parser failure  
**Product failure:** No

The worktree registration parser truncated a path containing `Development Projects`.

**Lesson**

Full-path porcelain parsing is mandatory.

---

## 9.3 A2 R3: test path was outside Vitest include patterns

**Classification:** Test-discovery failure  
**Product failure:** No  
**Vitest started:** Yes  
**Test code executed:** No

`tests/unit/normalizedCandidateFacts.test.ts` did not belong to the repository’s configured Vitest test surface.

**Lesson**

Node-native unit tests and Vitest cover different repository surfaces. Test-runner ownership must be proved before execution.

---

## 9.4 A2 R4: Git status assumption misclassified relocated test

**Classification:** Harness/source-inventory failure  
**Product failure:** No

The relocated file existed and its SHA was verified, but the script made an invalid assumption about how Git status would report the new path.

**Lesson**

Use full untracked-file inventory (`--untracked-files=all`) and independently prove file existence/hash; do not infer one from the other.

---

## 9.5 Consolidated A2: static import audit counted ordinary exports as runtime imports

**Classification:** Static-analysis script false positive  
**Product failure:** No

A regex counted ordinary `export const` / `export type` declarations as runtime dependency edges, reporting `module_runtime_import_count=8` even though the module had only a type-only import.

**Lesson**

Static gates must model syntax precisely enough for the property they claim to prove. A false-positive security gate is safer than a false negative, but it is still an engineering defect and should be corrected before asking the operator to rerun work.

---

## 9.6 Final A2 R2: all 10 tests passed but Node 24 reporter parsing failed

**Classification:** Reporter-format parsing failure  
**Product failure:** No  
**Actual test result:** 10/10 pass

Node v24 emitted summary lines such as `ℹ tests 10`, while the script expected TAP-style `# tests 10`.

**Fix**

Use reporter-independent authority:

- statically prove the declared test count;
- prove no skip/todo markers;
- use Node test process exit code as pass/fail authority.

---

## 9.7 A2 accepted

**Commit:** `10de278487c7ec112edc8a63315bd2d3c3623703`  
**Tree:** `229c08bf84e1c2f94a4cc14e3c96165a1a17d0a0`  
**Parent:** exact R16.31 `34bd2fdbb8b04d848a0157d763c70ec241468e1c`

The accepted module is a pure, provider-neutral normalized-candidate-facts snapshot. It performs no I/O, no dispatch, no credential lookup, no Auth Keeper fetch, and no provider-specific branching.

---

## 9.8 A3 property/contract hardening accepted

**Commit:** `a8ea7291a868087fc278b2b62d542c931b34e837`  
**Tree:** `bf19ca34264b72cee595b92e5e8149c595862b87`  
**Parent:** A2 `10de278487c7ec112edc8a63315bd2d3c3623703`

**Evidence**

- 18/18 tests passed;
- 512 deterministic mixed tri-state samples;
- 256 allowlist samples;
- exact output-key contract;
- opaque identity preservation;
- caller input immutability;
- deterministic output;
- no route decision derived by the normalizer;
- no connection identifier added/widened;
- runtime module SHA unchanged;
- test-only A3 commit.

---

## 9.9 A4 R1: incorrectly required unrelated operator `package.json` parity

**Classification:** Validation topology error  
**Product failure:** No

The first A4 gate required the operator branch’s package manifest to equal the A3 candidate manifest. The operator branch is intentionally a different lineage.

**Lesson**

Dependency/build authority must be derived from the baseline/candidate pair being compared, not from an unrelated clean operator checkout.

---

## 9.10 A4 R2: no existing local dependency tree matched the R16.31/A3 lockfile

**Classification:** Dependency-environment incompatibility  
**Product failure:** No  
**Status:** Correct fail-closed result

R16.31 and A3 had identical `package.json` and `package-lock.json` (lockfile v3), but no registered local worktree contained an installed dependency tree that exactly realized that lockfile.

The operator tree matched many packages but had concrete version drift, including examples in:

- `@anthropic-ai/claude-agent-sdk`;
- `@anthropic-ai/sdk`;
- `@apidevtools/json-schema-ref-parser`;
- AWS SDK packages;
- ESLint core/config/plugin packages.

Other worktrees lacked most required packages.

**Lesson**

Do not weaken dependency parity to make a build run. If no compatible installed tree exists, use a disposable lockfile-controlled environment.

---

## 9.11 A4 R3: canonical Docker differential selected

**Classification:** Canonical validation design  
**Status:** Superseded by the executed R3 result in 9.12

The A4 design returned to the proven release environment:

- exact R16.31 and A3 commit worktrees;
- root Dockerfile `builder` stage;
- Node 26 builder environment;
- lockfile-controlled `npm ci` inside disposable Docker builds;
- `OMNIROUTE_USE_TURBOPACK=0` (canonical webpack path);
- `OMNIROUTE_BUILD_MEMORY_MB=6144`;
- no host `node_modules` reuse;
- candidate 18-test suite intended to execute in the builder environment;
- `typecheck:core` differential against exact R16.31 baseline;
- focused ESLint must report zero diagnostics on the two R16.32-A files;
- both baseline and candidate production builds must succeed;
- temporary images/worktrees removed afterward;
- no live or accepted-worktree mutation.

**Important baseline rule**

The repository carries inherited TypeScript/lint debt. Acceptance is therefore **no new candidate diagnostics relative to exact R16.31**, plus zero focused lint diagnostics on the R16.32-A changed files. Baseline debt is not silently relabeled as an R16.32 defect.

---

## 9.12 A4 R3 execution: both canonical production builds passed; focused test was absent from the builder image

**Phase:** R16.32-A4 canonical Docker differential R3, 2026-09-12  
**Classification:** Docker test-materialization / validation-harness failure  
**Product failure:** No  
**Status:** Fail closed; R4 required

**Evidence**

- script syntax check passed;
- exact R16.31 baseline source/tree authority passed;
- exact A3 candidate source/tree authority passed;
- baseline and candidate `package.json`, `package-lock.json`, and Dockerfile were identical;
- dependency authority was the root Dockerfile `builder` stage with lockfile-controlled `npm ci` under Node 26;
- host `node_modules` was not reused;
- exact R16.31 canonical webpack builder build returned `baseline_build_rc=0` and `baseline_production_build=PASS`;
- exact A3 canonical webpack builder build returned `candidate_build_rc=0` and `candidate_production_build=PASS`;
- the candidate builder image was created successfully;
- the next gate attempted `node --import tsx/esm --test tests/unit/combo/normalizedCandidateFacts.test.ts` inside the exported builder image;
- Node returned `Could not find 'tests/unit/combo/normalizedCandidateFacts.test.ts'`;
- `candidate_focused_test_rc=1` and the script failed closed with `ERROR=CANDIDATE_A3_FOCUSED_TEST_FAILED`;
- because the focused test gate failed first, later typecheck/lint/poststate acceptance gates were not reached by the main flow.

The webpack `PackFileCacheStrategy` restore messages were non-fatal in this run: both baseline and candidate canonical production builds completed with return code 0. They should be retained as informational build-cache evidence unless a future differential demonstrates candidate-specific behavior.

**Root cause**

The R3 harness assumed that the focused test path would be materialized inside the exported Docker `builder` image. The production source/module was present and built successfully, but the test source was not available at the path the runner invoked. This is a test-source materialization problem, not evidence of a failure in `normalizedCandidateFacts.ts`.

**R4 repair rule**

- preserve the exact same Dockerfile/Node 26/webpack/lockfile-controlled dependency authority;
- preserve both baseline and candidate production-build gates;
- use the exact disposable Git worktree as the test-source authority;
- bind-mount the exact commit's `tests` tree read-only into `/app/tests` for Node test and ESLint execution;
- hash the source test before the mount and hash it again from inside the container to prove byte-for-byte identity;
- verify the production module inside the candidate builder image against the accepted SHA before running the focused test;
- mount baseline and candidate test trees symmetrically for the full lint differential;
- do not copy or reuse host `node_modules`;
- do not mutate the accepted A3 worktree, operator checkout, live runtime, or Auth Keeper.

**Prevention rule**

Before running a test inside a production-oriented container stage, independently prove two authorities: **dependency/runtime authority** and **source-under-test materialization authority**. A successful image build does not imply that dev/test files are included in that image.

---

# 10. R16.32 routing-intelligence safety invariants

R16.32 must remain provider-neutral and may only rank among candidates that already survive hard policy/admission constraints.

Priority hierarchy:

1. explicit request/pinning semantics where contractual;
2. Auth Keeper eligibility;
3. exclusion/workload policy;
4. capability/context compatibility;
5. breaker/cooldown/unavailable state;
6. provider-neutral preference among survivors;
7. existing dispatch/fallback semantics unless separately proven.

Primary set invariant:

`R16.32 output eligibility ⊆ R16.31 input eligibility`

R16.32 must never:

- reintroduce a hard-rejected candidate;
- branch on provider names inside the intelligence core;
- read or emit credential secret values;
- make additional provider/model probes solely to score candidates;
- increase the request-scoped Auth Keeper fetch bound;
- silently replace an explicit provider/model selection;
- silently alter specialized early dispatch, fallback, or round-robin semantics.

Existing `shadowRouting.ts` is not suitable for computational-only R16.32 shadow evaluation because it can execute actual model traffic. Any R16.32 shadow phase must remain computational-only unless separately authorized.

---

# 11. Durable engineering rules derived from the incidents

## Source and Git authority

- Immutable accepted commit/tree objects are the source authority.
- A clean operator checkout may intentionally differ from accepted source.
- Parse Git porcelain paths in a space-safe/NUL-safe way.
- Never mutate the operator checkout merely to validate an accepted frozen commit.
- Keep source-changing experiments in isolated worktrees.

## Testing

- Prove which runner owns a test path before execution.
- Node-native tests and Vitest must not be treated as interchangeable.
- Prefer process exit code over parsing human-oriented reporter text.
- Prove that the test source is actually present in the environment where the runner will execute it.
- Treat dependency/runtime authority and test-source materialization authority as separate validations.
- Static validation scripts are production tooling: test their assumptions before asking for another operator run.
- Property tests should use deterministic loops when adding a new property-test dependency is unnecessary.

## Dependencies and builds

- Never assume two worktrees have equivalent `node_modules` because they are in the same repository.
- Never use an out-of-tree root `node_modules` symlink as canonical production-build proof.
- If exact local dependency parity cannot be proven, use the lockfile-controlled Docker builder.
- Do not install/update dependencies into an accepted worktree merely to satisfy validation.
- Validate production behavior through the same bundler/build path intended for release.

## Browser/session providers

- Browser session health, CDP attachment health, and API-key quota health are distinct concepts.
- Human-verification boundaries must not be bypassed or replayed.
- Auth Keeper owns browser/API credentials; OmniRoute consumes opaque connection identity and eligibility.
- Optional API-key capability must not be inferred from `noAuth` or vice versa.

## Database/state

- Create parent state directories before opening SQLite databases.
- Isolate test/build `DATA_DIR` from operator/live state.
- Validate migration number uniqueness.
- Clone live state transactionally and verify count/digest before promotion.

## Promotion/cutover

- Future recreate/restart authority matters as much as the currently running container.
- Verify image ID, health, restart count, mounts, env override metadata, and Auth Keeper 401/200 behavior before acceptance.
- Preserve rollback image/container/volume/ref before replacing live authority.
- Do not remove prior rollback assets until the new release is independently frozen and accepted.

## Upstream reconciliation

- Revalidate stale PRs/issues against current source before cherry-pick.
- Resolve semantically, not merely textually.
- Keep provider-specific compatibility fixes outside the provider-neutral routing core.
- Avoid unrelated repository cleanup/history rewrite during functional release work.

---

# 12. Current release/validation authorities

## Live accepted R16.31

| Item | Authority |
|---|---|
| Source commit | `34bd2fdbb8b04d848a0157d763c70ec241468e1c` |
| Source tree | `7d7b256d92036093535063fb930fe79bb3df4535` |
| Image ID | `sha256:370d49896920568bc5adbfe71316879368ec93be0cd020cf1b546fa3ef2640aa` |
| Live container | `mer-omniroute` |
| Accepted health | running / healthy / restart 0 |
| Auth Keeper probe | unauthorized 401 / authorized 200 |

## R16.32-A candidate authority

| Gate | Authority |
|---|---|
| A2 implementation commit | `10de278487c7ec112edc8a63315bd2d3c3623703` |
| A2 tree | `229c08bf84e1c2f94a4cc14e3c96165a1a17d0a0` |
| A3 test-hardening commit | `a8ea7291a868087fc278b2b62d542c931b34e837` |
| A3 tree | `bf19ca34264b72cee595b92e5e8149c595862b87` |
| A3 tests | 18/18 pass |
| Runtime wiring | none |
| Live mutation | none |
| A4 R3 baseline production build | PASS |
| A4 R3 candidate production build | PASS |
| A4 R3 focused test | NOT EXECUTED; source absent from builder image path |
| A4 overall | pending R4 test-materialization/typecheck/lint completion |

---

# 13. Open items

1. Complete R16.32-A4 R4 using the exact Docker builder environment plus read-only exact-commit test-source mounts; append the final typecheck/lint/poststate result here.
2. Only after A4 acceptance, proceed to **R16.32-B pure deterministic disposition/reason evaluator design**.
3. Keep R16.32-B pure and unwired initially; it must consume normalized facts, not acquire new facts.
4. Future computational shadow validation must not call the existing real-traffic shadow executor.
5. Continue reconciling upstream provider fixes semantically while keeping named-provider logic outside the R16.32 intelligence core.

---

# 14. Record-maintenance rule

Update this file whenever any of the following occurs:

- a validation/cutover script fails for a new root cause;
- a source/product defect is confirmed;
- a previous “product failure” is reclassified as harness/environment failure;
- a provider/session boundary changes;
- an upstream merge/cherry-pick introduces a new reconciliation rule;
- a release reaches freeze/promotion/rollback milestones;
- a dependency/build environment assumption is invalidated;
- a durable prevention rule is discovered.

For each new entry, record **phase, symptom, root cause, classification, resolution/status, and prevention rule**. This is intended to stop the same engineering mistake from being rediscovered in a later R16.x phase.
