# Engineering Source of Truth

Last reviewed: 2026-09-15
Status: Canonical engineering governance for `Zartharas/OmniRoute`

New-chat continuation: [CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md).

Evidence-first engineering: pin exact authority; separate repo authority from live sentinels; inspect contracts/side effects; use isolated candidates; prevalidate macOS `/bin/bash`, embedded Python/Node and high-risk parser/regex logic; use AST/module resolution for module authority; derive complete missing-only support and stop at current-owned code; require static import resolution before tests; fail closed on drift. After mutation prove exact scope/parent/source, run focused regressions and changed-file lint/type, qualify with Webpack, prove non-drift, record commit/tree/evidence, and never infer deploy/cutover authority from development qualification.

Invariants: OpenCode/TheOldLLM retired; GPT-5.6 Sol/Terra/Luna protected-native/non-routeable; workload 10 routed (6 personal + 4 MTA) + 3 protected-native; Operations Floor not routing authority; Auth Keeper owns credential/session/account lifecycle while OmniRoute owns routing/provider/orchestration.

Accepted D18 R8: commit `58452140ffc8122a26a387638f8a38d7d80f5024`, tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`, evidence `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`. Accepted 16 paths, overwrite 0, unresolved local imports 0, bounded readout runtime consumers 0, 15 byte-exact + one test-only runtime-erased adaptation, production-source adaptation 0, 35/35 tests, lint/type pass, 10+3 preserved, Webpack/BUILD_ID/standalone pass. D18 remains passive/unwired.

Permanent transplant rules: distinguish final diff, feature contract, missing support closure, full reachability and current implementation authority; TypeScript parser/module authority over regex text; path namespace is not architecture authority; safety-classify whole copy sets; resolve static imports before tests; runtime-smoke regex catalogs; classify diagnostics before compatibility edits; test-only typing fixes require emitted-JS parity; resolve variants in one run; production source stays exact unless separately justified.

Active full E2E: user authorized non-destructive engineering qualification, not live cutover. Use one consolidated harness with read-only preflight, fail-closed guards, mocks/fixtures/deterministic failure injection, evidence packaging and final non-drift. Target `Codex Unified → OmniRoute → Auth Keeper/provider eligibility → orchestration/fallback → response → Operations Floor evidence`. Cover lineage, host sentinels, workload isolation, protected-native preservation, eligibility, routing/fallback/error behavior, quota/cooldown, provider outage, auth-expiry/re-auth semantics, Operations Floor evidence, restart/recovery, rollback readiness, evidence continuity and Webpack identity.

Safety: no uncontrolled live provider/model calls, credential-value reads, live Auth Keeper mutation, production routing/provider mutation, D18/preference activation, live image/container/database mutation, remote push/deploy/cutover unless later explicitly authorized. Fail closed if safe qualification is impossible.

Live cutover requires separate explicit approval after full E2E, production identity, canary/shadow evidence, rollback readiness and live health criteria.
