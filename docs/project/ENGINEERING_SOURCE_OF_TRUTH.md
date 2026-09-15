# Engineering Source of Truth

Last reviewed: 2026-09-15
Status: Canonical engineering governance for the `Zartharas/OmniRoute` fork

This document governs how architecture changes are implemented, qualified and promoted.

For a new conversation continuing the current work, read [CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md) after this document.

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
- derive complete missing-only dependency closure before mutation when historical support is inherited;
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

Do not repeatedly rediscover the same Turbopack failure during ordinary engineering qualification.

## 6. Historical-source reintegration rules

Historical source authority and current compatibility are separate gates.

When reintegrating old feature branches:

1. pin exact historical commit/tree/branch authority;
2. do not depend on old local checkout paths;
3. distinguish final commit diff, feature-owned contract, missing support closure, full historical reachability and current implementation authority;
4. use parser/module-resolution authority for real module edges rather than regex text scanning;
5. stop historical support traversal at current-owned implementations;
6. classify candidate files as missing/identical/divergent;
7. copy historical blobs byte-exact before bounded compatibility adaptation;
8. do not use path namespace alone as architectural legitimacy;
9. do not materialize a full historical transitive graph merely because it is reachable;
10. safety-classify the complete copy set before mutation;
11. require assembled-candidate static import resolution before tests;
12. never resurrect retired provider/runtime surface merely because it exists in historical reachability;
13. qualify against current contracts, tests, workload policy and builder.

## 7. Accepted D18 bounded-foundation authority

D18 is complete and accepted at R8.

Accepted local authority:

- branch `feat/d18-orchestration-foundation-transplant-r8`;
- commit `58452140ffc8122a26a387638f8a38d7d80f5024`;
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`;
- parent `1c4da240883e729d38a356ec83919ad7f6637623`;
- evidence SHA-256 `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`.

Accepted R8 facts:

- 7 feature-contract + 9 support = 16 transplanted paths;
- current-owned files overwritten: 0;
- unresolved project-local imports: 0;
- bounded readout external runtime consumers: 0;
- 15 files byte-exact to D18;
- one test-only runtime-erased TypeScript compatibility adaptation;
- production-source adaptation count: 0;
- 35/35 focused regressions pass;
- changed-file ESLint pass;
- changed-file TypeScript diagnostics: 0;
- current 10+3 workload contract preserved;
- default Webpack build/BUILD_ID/standalone qualification pass;
- Turbopack panic absent.

R8 acceptance does not activate D18. D18 remains passive/unwired until a later explicit activation gate.

Detailed history is in [D18 Orchestration Foundation Failure Modes](D18_ORCHESTRATION_FOUNDATION_FAILURE_MODES_20260915.md).

## 8. Permanent D18 / harness lessons

- final commit diff can be too narrow;
- regex import scanning is not module authority;
- complete transitive reachability can be too broad and is not patch authority;
- feature-owned contract and executable/testable support set are different sets;
- hard path namespaces can reject legitimate architecture-owned cross-pillar support;
- dynamically assembled regexes must be runtime-compiled/behavior-smoked during harness prevalidation;
- historical runtime success does not waive current compiler compatibility;
- test-only TypeScript compatibility may be accepted only when exact diagnostic identity, AST target, runtime-erased change, emitted-JavaScript parity, zero production-source adaptation, full regression pass and current build qualification are proven;
- compatibility variants should be resolved in one qualification run, not through repeated operator reruns.

## 9. Routing/orchestration non-regression rules

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

## 10. Full end-to-end qualification policy — active phase

The active phase is full end-to-end qualification on accepted R8 authority.

The user explicitly authorized non-destructive engineering qualification, not live cutover.

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

If required behavior cannot be qualified safely without expanding authorization, fail closed and record the gap rather than silently making live calls.

## 11. Auth Keeper boundary

Auth Keeper is implemented in the private `Zartharas/omniroute-auth-keeper` repository.

Accepted R11 authority:

- commit `b3b0d137369038d22820947729233deaec19e166`;
- tree `9377fe6afe21f098861f32c751f05c8a72882211`;
- 457/457 tests pass.

## 12. Release/live-cutover boundary

Development/qualification authorization does not imply production authorization.

Live cutover requires separate explicit approval after:

- canonical source/tree authority is frozen;
- end-to-end qualification passes;
- production build identity is proven;
- canary/shadow evidence is reviewed;
- rollback image/state is known;
- live health checks and observation criteria are defined.

## 13. Documentation completion rule

A technically passing phase is incomplete if the repo still describes removed providers, stale phases or contradictory sequencing.

Update canonical docs, tracker and the new-chat handoff in the same engineering cycle whenever accepted authority or current phase materially changes.
