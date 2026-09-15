# D18 Orchestration Foundation Transplant — Failure Modes and Engineering Record

Date: 2026-09-15
Status: D18 transplant accepted at R8

Current accepted authority: commit `58452140ffc8122a26a387638f8a38d7d80f5024`, tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`, evidence `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`.

R8 closed D18 with 16 paths (7 contract + 9 support), current-owned overwrite 0, unresolved local imports 0, bounded readout runtime consumers 0, 15 byte-exact files + one test-only runtime-erased TypeScript adaptation, production-source adaptation 0, 35/35 focused tests, lint/type pass, 10+3 preservation and Webpack/BUILD_ID/standalone pass. D18 remains passive/unwired.

Failure sequence:

- R1 `GENUINE_OUTBOUND_DEPENDENCY_CLOSURE_OMISSION`: final diff too narrow.
- R2 `HARNESS_ONLY_REGEX_IMPORT_SCANNER_FALSE_POSITIVE`: regex import scanning created false module edges.
- R3 `UNBOUNDED_TRANSITIVE_GRAPH_IS_NOT_D18_PATCH_AUTHORITY`: valid 1,164-file historical graph too broad for patch ownership.
- R4 `SEVEN_FILE_FEATURE_CONTRACT_REQUIRES_BOUNDED_MISSING_SUPPORT_CLOSURE`: feature contract not self-contained for tests.
- R5 `HARD_NAMESPACE_BOUNDARY_REJECTED_LEGITIMATE_AUTH_KEEPER_SUPPORT_DEPENDENCY`: path allowlist rejected legitimate Auth Keeper support.
- R6 `HARNESS_ONLY_PYTHON_REGEX_INLINE_FLAG_PLACEMENT`: correct 16-file closure found, then regex runtime bug.
- R7 `HISTORICAL_TEST_TYPESCRIPT_COMPATIBILITY_DIAGNOSTIC`: mechanics/35 tests/lint passed, current compiler rejected one historical test TS2698.
- R8 accepted after exact TS2698/AST identity, runtime-erased type-only adaptation trials, emitted-JavaScript parity, zero production-source adaptation, full tests/lint/type/10+3/Webpack/evidence gates.

Permanent rules: distinguish final diff, feature contract, missing support closure, full reachability and current implementation authority; derive missing-only closure first; stop at current-owned code; use TypeScript parser/module resolution for module authority; do not use path namespace as architecture authority; safety-classify the whole copy set; resolve static imports before tests; runtime-smoke regex catalogs; classify compiler diagnostics before compatibility edits; require emitted-JS parity for test-only typing fixes; resolve variants in one run; keep production source exact unless separately justified.

Architecture remains aligned: OmniRoute routing/orchestration authority; Auth Keeper credential/session/account authority; Operations Floor observer plane; GPT-5.6 Sol/Terra/Luna protected-native/non-routeable; OpenCode/TheOldLLM retired; full E2E qualification active and user-authorized for non-destructive engineering only; live cutover unauthorized.

For continuation, read `CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md`.
