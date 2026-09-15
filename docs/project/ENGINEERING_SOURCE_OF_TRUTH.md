# Engineering Source of Truth

Last reviewed: 2026-09-15
Status: Canonical engineering governance for the `Zartharas/OmniRoute` fork

This document governs how architecture changes are implemented, qualified and promoted.

## 1. Engineering objective

Engineering work must advance the five-pillar architecture without silently narrowing the product into a single provider, model, branch or R16.x subproject.

OmniRoute, Auth Keeper, Codex Unified and Operations Floor may evolve independently, but their shared contracts and authority boundaries must remain explicit and testable.

## 2. Source-of-truth precedence

Use this precedence when facts conflict:

1. [Architecture Source of Truth](ARCHITECTURE_SOURCE_OF_TRUTH.md) for product intent and architecture invariants.
2. This document for engineering method and non-regression rules.
3. [Master Roadmap](MASTER_ROADMAP.md) for long-range sequencing.
4. [Current Project Status](CURRENT_STATUS.md) for the latest accepted checkpoint summary.
5. [Engineering Tracker](ENGINEERING_TRACKER.md) for active work items, completed phases and known blockers.
6. Accepted Git objects, tests, build evidence and runtime evidence for implementation reality.
7. Upstream README/ROADMAP for upstream OmniRoute direction only.
8. Historical chats, issue comments, temporary scripts and branch notes as supporting evidence only.

If implementation reality contradicts architecture, surface the contradiction. Do not silently reinterpret architecture to match accidental code state.

## 3. Evidence-first workflow

Before mutating source:

- pin exact accepted source branch/head/tree/evidence authority;
- separate repository-import authority from live/runtime sentinel authority;
- inspect exact declarations/functions/types being changed;
- identify protected call counts and side effects;
- validate historical object availability instead of assuming an old checkout exists;
- create isolated candidates/worktrees where practical;
- syntax-check Bash for macOS Bash compatibility;
- compile embedded Python/Node/TypeScript harness blocks;
- exercise high-risk parser/decision logic before operator execution;
- use AST/semantic guards for structured source where structure matters;
- fail closed on unexpected source shape.

After mutation:

- prove exact changed-file scope using `--untracked-files=all`;
- prove parent/source authority;
- rerun semantic guards and focused regressions;
- distinguish baseline diagnostics from candidate-only diagnostics;
- run changed-file lint/type gates;
- run production build qualification using the current canonical builder policy;
- prove operator/live/non-target worktrees and host sentinels were not mutated;
- record commit/tree/evidence hashes for accepted phases;
- do not push/deploy/live-cutover merely because development qualification passes.

## 4. Current product-scope invariants

- OpenCode and TheOldLLM are retired from active product scope.
- Historical references/tombstones/negative tests do not reactivate a provider.
- GPT-5.6 Sol, Terra and Luna remain protected-native and non-routeable in the normal fleet.
- Current workload authority is 10 routed models: 6 personal + 4 MTA/enterprise, plus 3 protected-native.
- Operations Floor must not become a router.
- Auth Keeper must not redefine OmniRoute routing policy.
- preference intelligence may rank only candidates that survived harder gates.

## 5. Build qualification policy

Production qualification currently defaults to Webpack:

- plain `npm run build` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=0` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=1` → explicit Turbopack opt-in/testing.

Reason: repeated production qualification exposed a deterministic Turbopack invariant panic on accepted source trees while the same source qualified successfully with Webpack.

Permanent rule:

- do not repeatedly rediscover the same Turbopack failure during every narrow engineering phase;
- qualify ordinary acceptance/release builds with the proven Webpack path;
- retain Turbopack as an explicit experiment/requalification path;
- treat future Turbopack reactivation as evidence-based, not assumed.

## 6. Historical-source reintegration rules

Historical source authority and current compatibility are separate gates.

When reintegrating old feature branches:

1. pin exact historical commit/tree/branch authority;
2. do not depend on old local checkout paths;
3. test whether objects exist in the current local Git object database;
4. if not, use a disposable historical object store from exact authorized branch refs rather than mutating an accepted repo's object database;
5. classify candidate files as missing/identical/divergent;
6. copy historical blobs byte-exact before applying any bounded current-compatibility adaptation;
7. preserve current implementations when a historical transitive dependency is not itself patch authority;
8. never resurrect retired provider/runtime surface merely because it exists in historical reachability;
9. qualify the result against current contracts, tests, workload policy and builder.

## 7. Operations Floor lessons

Accepted Operations Floor work established these permanent rules:

- wholesale historical merges are forbidden; use selective source-backed reintegration;
- historical 14-model assumptions must be reconciled to the current 10-routed + 3-protected-native authority;
- component prop/interface drift is a compatibility problem, not permission to alter unrelated current contracts;
- absence of preview telemetry must be represented as absence, not invented data;
- sidebar description maps must use the semantic ID domain actually represented (`SidebarItemId` where always-visible items such as `proxy` are valid), not a narrower hideable-only domain;
- TypeScript differentials must compare structured diagnostic identity (path/line/column/code) and independently forbid changed-file diagnostics;
- multiline/wrapped message drift from unrelated baseline diagnostics is not a candidate regression by itself.

Accepted Operations Floor local authority:

- commit `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c`;
- tree `2dbd97c1a0bfd1d3e1b9ffb1ce02fdc76848fddb`.

## 8. D18 bounded-foundation rules

D18 exposed three distinct failure classes that are now permanent lessons:

### R1 — final-diff scope can be too narrow

The final D18 commit changed only two files, but one of those files depended on earlier foundation work. A final-commit diff is not automatically the complete transplant contract.

Rule: determine source-backed feature contract/dependency ownership before assuming the final diff is sufficient.

### R2 — regex import scanning is not module authority

A regex scanner matched import-looking text that was not a real module edge.

Rule: use the TypeScript parser/module resolver for actual module-graph questions. Comments/strings/examples must not become fake dependencies.

### R3 — complete transitive reachability can be too broad

A correct TypeScript AST/module-resolver closure reached 1,164 historical files, 63 missing current files, retired OpenCode inventory and network-capable historical services. That graph was useful evidence, but it was not valid D18 patch authority.

Rule: distinguish **dependency reachability** from **feature patch authority**. A historical transitive graph must not be blindly materialized when the feature's frozen contract is explicitly bounded.

Current D18 transplant direction:

- exact frozen seven-file contract boundary;
- classify those seven as missing/identical/divergent-existing;
- copy missing files byte-exact only;
- preserve divergent newer current implementations;
- require zero external production consumers of the bounded readout;
- require the three bounded D18 tests to pass;
- no provider calls, credentials, DB writes or routing activation.

## 9. Harness regression register

Permanent known failure classes include:

- `null` versus `undefined` sentinel assumptions;
- trailing whitespace/final-newline hygiene;
- incorrect lexical semantic ownership of nested callbacks/returns;
- wrapper/generic type-resolution order;
- global text replacement where declaration-scoped transforms are required;
- missing callback bindings for inserted references;
- runtime versus type-only import confusion;
- global snapshot-call counting instead of semantic-role classification;
- treating candidate presence as compatibility proof;
- object-identity assumptions where stable request-local keys exist;
- mixing historical config with unrelated current dependencies;
- requiring a zero-diagnostic historical baseline rather than baseline/candidate differential parity;
- guessing TypeScript declaration shape from semantic naming;
- treating Markdown prose as machine authority;
- old-checkout-path assumptions for historical Git authority;
- assuming accepted current object databases contain all historical objects;
- linewise TypeScript diagnostic comparison;
- stale hideable-only sidebar ID domains;
- regex module-edge false positives;
- unbounded historical dependency closure treated as patch authority;
- Turbopack with external `node_modules` symlinks;
- Turbopack invariant panic repeatedly rediscovered after Webpack success already proved source/build viability.

Detailed failures are recorded in [Engineering Failure-Mode Register](FAILURE_MODE_REGISTER.md).

## 10. Routing/orchestration non-regression rules

Unless explicitly revised:

- explicit request/pinning wins where applicable;
- Auth Keeper admission is harder than preference;
- exclusion/workload policy is harder than preference;
- capability/context compatibility is harder than preference;
- breaker/cooldown/unavailability is harder than preference;
- preference ranks survivors only;
- compatibility evidence should be reused, not recomputed solely for scoring;
- no extra Auth Keeper/provider/model/credential acquisition solely for scoring when request-local evidence exists;
- routing experiments begin shadow/observational and activate only after evidence;
- external architecture/benchmark metadata is enrichment, not a hard-gate authority.

## 11. Codex Unified and Auth Keeper boundaries

Codex Unified remains the intended user-facing agent. Multiple reasoning workers do not imply uncontrolled multi-writer repository execution.

Auth Keeper is implemented in the private `Zartharas/omniroute-auth-keeper` repository. The private repo owns Auth Keeper implementation/release evidence; the public fork owns cross-product architecture/routing policy.

Accepted Auth Keeper R11 authority:

- commit `b3b0d137369038d22820947729233deaec19e166`;
- tree `9377fe6afe21f098861f32c751f05c8a72882211`;
- 457/457 tests pass.

## 12. Upstream integration policy

Continue absorbing compatible upstream OmniRoute changes.

When upstream overlaps custom architecture:

1. preserve upstream behavior unless a fork invariant requires a bounded override;
2. prefer extension/adaptation over fork-only rewrite;
3. rerun architectural non-regression tests;
4. keep Codex Unified, Auth Keeper and Operations Floor contracts intact;
5. document deliberate divergence.

## 13. Release/live-cutover boundary

Development/qualification authorization does not imply production authorization.

Live cutover requires separate explicit approval after:

- canonical source/tree authority is frozen;
- end-to-end qualification passes;
- production build identity is proven;
- canary/shadow evidence is reviewed;
- rollback image/state is known;
- live health checks and observation criteria are defined.

## 14. Documentation completion rule

A technically passing phase is incomplete if the repo still describes removed providers, stale phases or contradictory sequencing.

Update the canonical docs and tracker in the same engineering cycle whenever accepted authority or current phase materially changes.
