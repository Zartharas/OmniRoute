# Engineering Source of Truth

Last reviewed: 2026-09-15
Status: Canonical engineering governance for the `Zartharas/OmniRoute` fork

For continuation in a new conversation, read [CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md).

## Engineering objective

Advance the five-pillar architecture without silently narrowing the product into a provider, model, branch or R16.x subproject. OmniRoute, Auth Keeper, Codex Unified and Operations Floor may evolve independently, but their contracts and authority boundaries must remain explicit and testable.

## Source-of-truth precedence

1. Architecture Source of Truth — product intent/invariants.
2. Engineering Source of Truth — engineering method/non-regression.
3. Master Roadmap — sequencing.
4. Current Project Status — latest accepted checkpoint.
5. Engineering Tracker — detailed work/history.
6. Full E2E Chat Handoff — new-conversation continuation.
7. Accepted Git objects/tests/build/runtime evidence — implementation reality.

If implementation reality contradicts architecture, surface the contradiction.

## Evidence-first workflow

Before mutation:

- pin exact branch/head/tree/evidence authority;
- separate repository authority from live/runtime sentinels;
- inspect exact source/type contracts and side effects;
- create isolated candidates where practical;
- prevalidate macOS `/bin/bash` syntax;
- compile and execute high-risk embedded parser/regex/decision self-tests;
- use AST/semantic guards where structure matters;
- derive complete missing-only support closure before historical transplant mutation;
- require static project-local imports to resolve before feature tests;
- fail closed on unexpected source shape or authority drift.

After mutation:

- prove exact changed scope including untracked files;
- prove parent/source authority;
- rerun semantic/focused regressions;
- distinguish baseline diagnostics from candidate-only diagnostics;
- independently gate changed-file diagnostics;
- run changed-file lint/type gates;
- use current canonical production builder;
- prove host/non-target non-drift;
- record commit/tree/evidence hashes;
- do not push/deploy/cutover merely because qualification passes.

## Current invariants

- OpenCode and TheOldLLM are retired from active product scope.
- GPT-5.6 Sol, Terra and Luna are protected-native/non-routeable in the normal fleet.
- Workload authority: 10 routed (6 personal + 4 MTA) + 3 protected-native.
- Operations Floor is not a router.
- Auth Keeper owns credential/session/account lifecycle and may expose eligibility contracts; OmniRoute owns routing/provider/orchestration policy.
- preference ranks only candidates surviving harder gates.

## Builder policy

- plain `npm run build` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=0` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=1` → explicit Turbopack requalification.

Do not repeatedly rediscover the known Turbopack invariant panic during ordinary qualification.

## Historical reintegration rules

Keep separate:

1. final commit diff;
2. feature-owned contract;
3. minimal missing support closure relative to current authority;
4. full historical reachability graph;
5. current implementation authority.

Use parser/module authority rather than regex text for module edges; stop traversal at current-owned implementations; do not use path namespace as architectural legitimacy; safety-classify the complete copy set before mutation; require static import resolution before tests; do not resurrect retired provider/runtime surface because it is historically reachable.

## Accepted D18 R8 authority

- branch `feat/d18-orchestration-foundation-transplant-r8`
- commit `58452140ffc8122a26a387638f8a38d7d80f5024`
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`
- parent `1c4da240883e729d38a356ec83919ad7f6637623`
- evidence `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`

Accepted facts: 16-path bounded transplant (7 contract + 9 support), current-owned overwrite 0, unresolved local imports 0, bounded readout runtime consumers 0, 15 byte-exact files + one test-only runtime-erased typing adaptation, production-source adaptation 0, 35/35 focused tests, lint/type pass, 10+3 preserved, default Webpack/BUILD_ID/standalone pass.

D18 remains passive/unwired.

## Permanent D18 / harness lessons

- final diff may be too narrow;
- regex import scanning is not module authority;
- full transitive reachability may be too broad and is not patch authority;
- feature contract and executable support set differ;
- hard path namespaces can reject legitimate cross-pillar support;
- dynamically assembled regexes require runtime compile/smoke prevalidation;
- historical runtime success does not waive current compiler compatibility;
- test-only typing fixes require exact diagnostic/AST identity, runtime-erased change, emitted-JS parity, zero production-source adaptation, full regression and current build qualification;
- compatibility variants should resolve in one qualification run rather than repeated operator reruns.

## Active full E2E qualification policy

The user explicitly authorized non-destructive engineering qualification on accepted R8. This is not live-cutover authorization.

Preferred model:

- one consolidated harness;
- complete read-only preflight;
- fail-closed authority/safety guards;
- mocks/fixtures/deterministic failure injection for quota/cooldown/outage/auth-expiry where possible;
- evidence packaging and final non-drift.

Target path:

`Codex Unified → OmniRoute → Auth Keeper/provider eligibility → orchestration/fallback → response → Operations Floor evidence`

Cover source/tree lineage, host sentinels, workload isolation, protected-native preservation, eligibility boundary, routing/fallback/error behavior, quota/cooldown, provider outage, auth-expiry/re-auth semantics, Operations Floor evidence, restart/recovery, rollback readiness, evidence continuity and Webpack production identity.

Do not make uncontrolled live provider/model calls, read/print secret/token/credential values, mutate live Auth Keeper state, mutate production routing/provider state, activate D18/preference routing, mutate live image/container/database state, push/deploy or cut over traffic unless later explicitly authorized.

If a behavior cannot be qualified safely, fail closed and record the gap.

## Release/live-cutover boundary

Development qualification does not imply production authorization. Live cutover requires separate explicit approval after full E2E, production identity, canary/shadow evidence, rollback state and live health criteria are reviewed.

## Documentation completion rule

A technically passing phase is incomplete if canonical docs, tracker and new-chat handoff are stale. Update them in the same engineering cycle whenever authority or current phase changes materially.
