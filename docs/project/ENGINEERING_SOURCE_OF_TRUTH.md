# Engineering Source of Truth

Last reviewed: 2026-09-15
Status: Canonical engineering governance for the `Zartharas/OmniRoute` fork

For new-chat continuation, read [CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md).

## Objective

Advance the five-pillar architecture while preserving explicit, testable contracts among Codex Unified, OmniRoute, Auth Keeper and Operations Floor.

## Authority precedence

Architecture Source of Truth → Engineering Source of Truth → Master Roadmap → Current Status → Engineering Tracker → Full E2E Handoff → accepted Git/test/build/runtime evidence.

Implementation evidence remains authoritative for concrete implementation facts.

## Evidence-first method

Before mutation: pin exact authority; separate repo authority from live sentinels; inspect exact contracts/side effects; create isolated candidates; prevalidate macOS `/bin/bash`, embedded Python/Node and high-risk parser/regex logic; use AST/semantic guards; derive complete missing-only support before historical transplant mutation; require local static import resolution before tests; fail closed on drift.

After mutation: prove exact scope; parent/source authority; semantic/focused regressions; candidate-only diagnostics; changed-file lint/type; canonical Webpack production build; host/non-target non-drift; commit/tree/evidence recording; never infer push/deploy/cutover authority from development qualification.

## Current invariants

- OpenCode/TheOldLLM retired from active scope.
- GPT-5.6 Sol/Terra/Luna protected-native/non-routeable.
- Workload authority: 10 routed (6 personal + 4 MTA) + 3 protected-native.
- Operations Floor not routing authority.
- Auth Keeper owns credential/session/account lifecycle; OmniRoute owns routing/provider/orchestration.
- preference ranks only survivors of harder gates.

## Build policy

Webpack is the acceptance path. Turbopack is explicit requalification only. Do not repeatedly rediscover the known Turbopack invariant panic during ordinary qualification.

## Accepted D18 R8 authority

- branch `feat/d18-orchestration-foundation-transplant-r8`
- commit `58452140ffc8122a26a387638f8a38d7d80f5024`
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`
- parent `1c4da240883e729d38a356ec83919ad7f6637623`
- evidence `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`

Accepted facts: 16 paths (7 contract + 9 support), current-owned overwrite 0, unresolved local imports 0, bounded readout runtime consumers 0, 15 byte-exact files + 1 test-only runtime-erased adaptation, production-source adaptation 0, 35/35 focused tests, lint/type pass, 10+3 preserved, Webpack/BUILD_ID/standalone pass.

D18 remains passive/unwired.

## Permanent historical-transplant rules

Distinguish final diff, feature contract, missing support closure, full historical reachability and current implementation authority. Use parser/module authority rather than regex for module edges. Stop at current-owned implementations. Do not use path namespace as architecture authority. Safety-classify complete copy sets before mutation. Require static import resolution before tests. Runtime-smoke qualification regexes. Classify compiler diagnostics before compatibility edits. Test-only typing adaptations require runtime-erased changes and emitted-JS parity. Resolve variants in one run. Keep production source exact unless separately justified.

## Active full E2E qualification

User authorization: non-destructive engineering qualification only, not live cutover.

Preferred model: one consolidated harness with complete read-only preflight, fail-closed authority/safety guards, mocks/fixtures/deterministic failure injection, evidence packaging and final non-drift.

Target:

`Codex Unified → OmniRoute → Auth Keeper/provider eligibility → orchestration/fallback → response → Operations Floor evidence`

Cover lineage, host sentinels, workload isolation, protected-native preservation, eligibility boundaries, routing/fallback/error behavior, quota/cooldown, provider outage, auth-expiry/re-auth semantics, Operations Floor evidence, restart/recovery, rollback readiness, evidence continuity and Webpack identity.

Do not make uncontrolled live provider/model calls, read/print secrets or credential values, mutate live Auth Keeper state, mutate production routing/provider state, activate D18/preference routing, mutate live image/container/database state, push/deploy or cut over traffic unless later explicitly authorized.

If a behavior cannot be qualified safely, fail closed and record the gap.

## Release boundary

Live cutover requires separate explicit approval after full E2E, production identity, canary/shadow evidence, rollback readiness and live health criteria are reviewed.

## Documentation rule

Update canonical docs, tracker and handoff in the same engineering cycle whenever accepted authority or current phase materially changes.
