# Engineering Source of Truth

Last reviewed: 2026-09-15
Status: Canonical engineering governance for `Zartharas/OmniRoute`

For continuation, read [CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md).

## Method

Evidence-first. Pin exact authority before mutation. Separate repo authority from live sentinels. Inspect exact contracts/side effects. Use isolated candidates. Prevalidate macOS `/bin/bash`, embedded Python/Node and high-risk parser/regex logic. Use AST/module resolution for module authority. Derive complete missing-only historical support before mutation and stop at current-owned code. Require project-local static imports to resolve before tests. Fail closed on drift.

After mutation, prove exact scope/parent/source, run focused semantic regressions, independently gate candidate diagnostics, run changed-file lint/type, qualify with canonical Webpack, prove non-drift, record commit/tree/evidence and never infer push/deploy/cutover authority from development qualification.

## Invariants

OpenCode/TheOldLLM retired. GPT-5.6 Sol/Terra/Luna protected-native/non-routeable. Workload authority 10 routed (6 personal + 4 MTA) + 3 protected-native. Operations Floor not routing authority. Auth Keeper owns credential/session/account lifecycle; OmniRoute owns routing/provider/orchestration.

## Accepted D18 R8

- commit `58452140ffc8122a26a387638f8a38d7d80f5024`
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`
- evidence `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`

Accepted: 16 paths (7 contract + 9 support); current-owned overwrite 0; unresolved local imports 0; bounded readout runtime consumers 0; 15 byte-exact files + one test-only runtime-erased adaptation; production-source adaptation 0; 35/35 focused tests; lint/type pass; 10+3 preserved; Webpack/BUILD_ID/standalone pass. D18 remains passive/unwired.

## Permanent D18/harness rules

Distinguish final diff, feature contract, missing support closure, full reachability and current implementation authority. Parser/module authority beats regex text for imports. Path namespace is not architecture authority. Safety-classify whole copy sets. Resolve static imports before tests. Runtime-smoke qualification regexes. Classify compiler diagnostics before compatibility edits. Test-only typing fixes require runtime-erased changes and emitted-JS parity. Resolve compatibility variants in one run. Production source stays exact unless separately justified.

## Active full E2E qualification

User authorized non-destructive engineering qualification, not live cutover.

Preferred model: one consolidated harness with read-only preflight, fail-closed guards, mocks/fixtures/deterministic failure injection where possible, evidence packaging and final non-drift.

Target: `Codex Unified → OmniRoute → Auth Keeper/provider eligibility → orchestration/fallback → response → Operations Floor evidence`.

Cover lineage, host sentinels, workload isolation, protected-native preservation, eligibility boundary, routing/fallback/error behavior, quota/cooldown, provider outage, auth-expiry/re-auth semantics, Operations Floor evidence, restart/recovery, rollback readiness, evidence continuity and Webpack identity.

Safety: no uncontrolled live provider/model calls, credential-value reads, live Auth Keeper mutation, production routing/provider mutation, D18/preference activation, live image/container/database mutation, remote push/deploy/cutover unless later explicitly authorized. If safe qualification is impossible, fail closed and record the gap.

## Release boundary

Live cutover requires separate explicit approval after full E2E, production identity, canary/shadow evidence, rollback readiness and live health criteria are reviewed.

## Documentation rule

Update canonical docs, tracker and handoff whenever accepted authority or phase changes materially.
