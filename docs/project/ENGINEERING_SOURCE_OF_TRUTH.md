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
6. [Full E2E Chat Handoff](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md) for new-conversation continuation at the current checkpoint.
7. Accepted Git objects, tests, build evidence and runtime evidence for implementation reality.
8. Upstream README/ROADMAP for upstream OmniRoute direction only.
9. Historical chats, issue comments, temporary scripts and branch notes as supporting evidence only.

If implementation reality contradicts architecture, surface the contradiction. Do not silently reinterpret architecture to match accidental code state.

## 3. Evidence-first workflow

Before mutating source:

- pin exact accepted source branch/head/tree/evidence authority;
- separate repository-import authority from live/runtime sentinel authority;
- inspect exact declarations/functions/types being changed;
- identify protected call counts and side effects;
- validate historical object availability instead of assuming an old checkout exists;
- create isolated candidates/worktrees where practical;
- syntax-check Bash for macOS `/bin/bash` compatibility;
- compile embedded Python/Node/TypeScript harness blocks;
- execute high-risk parser/regex/decision self-tests, not syntax compilation alone;
- use AST/semantic guards for structured source where structure matters;
- derive complete missing-only dependency closure before mutation when a historical transplant requires inherited support;
- require project-local static imports to resolve before running feature tests;
- fail closed on unexpected source shape or unresolved authority.

After mutation:

- prove exact changed-file scope using `--untracked-files=all`;
- prove parent/source authority;
- rerun semantic guards and focused regressions;
- distinguish baseline diagnostics from candidate-only diagnostics;
- independently forbid changed-file diagnostics unless a bounded compatibility adaptation is explicitly qualified;
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
- OmniRoute orchestration may consume Auth Keeper eligibility contracts while Auth Keeper retains credential/session/account authority.
- preference intelligence may rank only candidates that survived harder gates.

## 5. Build qualification policy

Production qualification currently defaults to Webpack:

- plain `npm run build` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=0` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=1` → explicit Turbopack opt-in/testing.

Reason: repeated production qualification exposed a deterministic Turbopack invariant panic on accepted source trees while the same source qualified successfully with Webpack.

Permanent rule:

- do not repeatedly rediscover the same Turbopack failure during ordinary engineering qualification;
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
5. separate final commit diff, feature-owned frozen contract, minimal missing support closure, full historical reachability and current implementation authority;
6. use TypeScript/parser/module-resolution authority for real module edges rather than regex text scanning;
7. stop historical support traversal at current-owned implementations;
8. classify candidate files as missing/identical/divergent;
9. copy historical blobs byte-exact before bounded compatibility adaptation;
10. do not use path namespace alone as architectural legitimacy;
11. do not materialize a complete historical transitive graph merely because it is reachable;
12. safety-classify the complete copy set before mutation;
13. require assembled-candidate static import resolution before tests;
14. never resurrect retired provider/runtime surface merely because it exists in historical reachability;
15. qualify the result against current contracts, tests, workload policy and builder.

## 7. Operations Floor lessons

Accepted Operations Floor work established these permanent rules:

- wholesale historical merges are forbidden; use selective source-backed reintegration;
- historical 14-model assumptions must be reconciled to the current 10-routed + 3-protected-native authority;
- component prop/interface drift is a compatibility problem, not permission to alter unrelated current contracts;
- absence of preview telemetry must be represented as absence, not invented data;
- sidebar description maps must use the semantic ID domain actually represented;
- TypeScript differentials must compare structured diagnostic identity and independently forbid changed-file diagnostics;
- multiline/wrapped message drift from unrelated baseline diagnostics is not a candidate regression by itself.

Accepted Operations Floor local authority:

- commit `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c`;
- tree `2dbd97c1a0bfd1d3e1b9ffb1ce02fdc76848fddb`.

## 8. D18 bounded-foundation rules and accepted authority

D18 is complete and accepted at R8.

Accepted local authority:

- branch `feat/d18-orchestration-foundation-transplant-r8`;
- commit `58452140ffc8122a26a387638f8a38d7d80f5024`;
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`;
- parent `1c4da240883e729d38a356ec83919ad7f6637623`;
- evidence SHA-256 `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`.

Accepted transplant structure:

- 7 feature-contract files;
- 9 missing support files;
- 16 total files;
- current-owned files overwritten: 0;
- unresolved project-local imports: 0;
- bounded readout external runtime consumers: 0;
- 15 files byte-exact to D18;
- one test-only runtime-erased TypeScript compatibility adaptation;
- production-source adaptation count: 0.

Accepted regressions/build:

- 35/35 focused tests pass;
- changed-file ESLint pass;
- changed-file TypeScript diagnostics: 0;
- current 10-routed + 3-protected-native contract preserved;
- default Webpack build/BUILD_ID/standalone qualification pass;
- Turbopack panic absent.

R8 acceptance does not activate D18. D18 remains passive/unwired until a later explicit activation gate.

### Permanent D18 failure lessons

R1: final commit diff can be too narrow.

R2: regex import scanning is not module authority.

R3: complete transitive reachability can be too broad and is not patch authority.

R4: feature-owned contract and executable/testable support set are different sets.

R5: hard path namespaces can reject legitimate architecture-owned cross-pillar support.

R6: dynamically assembled regexes must be runtime-compiled/behavior-smoked during harness prevalidation.

R7: historical runtime success does not waive current compiler compatibility.

R8: test-only TypeScript compatibility may be accepted only when exact diagnostic identity, AST target, runtime-erased change, emitted-JavaScript parity, zero production-source adaptation, full regression pass and current build qualification are all proven.

Detailed history is in [D18 Orchestration Foundation Failure Modes](D18_ORCHESTRATION_FOUNDATION_FAILURE_MODES_20260915.md).

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
- hard namespace allowlists treated as architecture authority;
- dynamically constructed Python regex flags not runtime-qualified;
- historical test-only TypeScript constructs rejected by current compiler;
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

## 11. Full end-to-end qualification policy — active phase

The active phase is full end-to-end qualification on accepted R8 authority.

The user authorized engineering qualification, not live cutover.

Preferred implementation model:

- one consolidated harness per phase;
- complete read-only preflight before runtime exercise;
- fail-closed authority/safety guards;
- mocks, fixtures or deterministic failure injection for quota/cooldown/outage/auth-expiry cases where available;
- no uncontrolled external provider traffic;
- no credential-value reads;
- no live Auth Keeper session/account mutation;
- no production routing/provider mutation;
- no D18/preference activation;
- no live image/container/database mutation;
- no remote push/deploy/cutover;
- evidence packaging and final non-drift.

Target path:

`Codex Unified → OmniRoute → Auth Keeper/provider eligibility → orchestration/fallback → response → Operations Floor evidence`

Qualification must cover source/tree lineage, host sentinels, workload isolation, protected-native preservation, eligibility boundaries, fallback/error behavior, restart/recovery, rollback readiness, evidence continuity and Webpack production identity.

If a required behavior cannot be qualified safely without expanding authorization, fail closed and record the gap rather than silently making live calls.

## 12. Codex Unified and Auth Keeper boundaries

Codex Unified remains the intended user-facing agent. Multiple reasoning workers do not imply uncontrolled multi-writer repository execution.

Auth Keeper is implemented in the private `Zartharas/omniroute-auth-keeper` repository. The private repo owns Auth Keeper implementation/release evidence; the public fork owns cross-product architecture/routing policy.

Accepted Auth Keeper R11 authority:

- commit `b3b0d137369038d22820947729233deaec19e166`;
- tree `9377fe6afe21f098861f32c751f05c8a72882211`;
- 457/457 tests pass.

## 13. Upstream integration policy

Continue absorbing compatible upstream OmniRoute changes.

When upstream overlaps custom architecture:

1. preserve upstream behavior unless a fork invariant requires a bounded override;
2. prefer extension/adaptation over fork-only rewrite;
3. rerun architectural non-regression tests;
4. keep Codex Unified, Auth Keeper and Operations Floor contracts intact;
5. document deliberate divergence.

## 14. Release/live-cutover boundary

Development/qualification authorization does not imply production authorization.

Live cutover requires separate explicit approval after:

- canonical source/tree authority is frozen;
- end-to-end qualification passes;
- production build identity is proven;
- canary/shadow evidence is reviewed;
- rollback image/state is known;
- live health checks and observation criteria are defined.

## 15. Documentation completion rule

A technically passing phase is incomplete if the repo still describes removed providers, stale phases or contradictory sequencing.

Update canonical docs, tracker and the new-chat handoff in the same engineering cycle whenever accepted authority or current phase materially changes.
