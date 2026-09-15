# D18 Orchestration Foundation Transplant — Failure Modes and Engineering Record

Date: 2026-09-15
Status: D18 transplant accepted at R8

For continuation, use [CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md).

## Accepted R8 authority

- branch `feat/d18-orchestration-foundation-transplant-r8`
- commit `58452140ffc8122a26a387638f8a38d7d80f5024`
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`
- parent `1c4da240883e729d38a356ec83919ad7f6637623`
- evidence `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`

R8 closed D18 with 16 paths (7 contract + 9 support), current-owned overwrite 0, unresolved local imports 0, bounded readout runtime consumers 0, 15 byte-exact files, one test-only runtime-erased TypeScript adaptation, production-source adaptation 0, 35/35 focused tests, lint/type pass, 10+3 preservation and Webpack/BUILD_ID/standalone qualification.

D18 remains passive/unwired.

## Failure sequence

### R1 — `GENUINE_OUTBOUND_DEPENDENCY_CLOSURE_OMISSION`
Final commit diff was too narrow.

### R2 — `HARNESS_ONLY_REGEX_IMPORT_SCANNER_FALSE_POSITIVE`
Regex import scanning produced false module edges.

### R3 — `UNBOUNDED_TRANSITIVE_GRAPH_IS_NOT_D18_PATCH_AUTHORITY`
The valid TypeScript graph reached 1,164 files / 2,924 edges / 63 missing files and crossed unrelated retired-provider/network-capable surface. Reachability was not patch ownership.

### R4 — `SEVEN_FILE_FEATURE_CONTRACT_REQUIRES_BOUNDED_MISSING_SUPPORT_CLOSURE`
The feature contract was source-correct but not self-contained for execution/tests.

### R5 — `HARD_NAMESPACE_BOUNDARY_REJECTED_LEGITIMATE_AUTH_KEEPER_SUPPORT_DEPENDENCY`
A hard path allowlist rejected legitimate Auth Keeper eligibility support.

### R6 — `HARNESS_ONLY_PYTHON_REGEX_INLINE_FLAG_PLACEMENT`
The correct 7 + 9 = 16 missing-only closure was found with zero unresolved project imports; a Python regex catalog runtime defect stopped preflight.

### R7 — `HISTORICAL_TEST_TYPESCRIPT_COMPATIBILITY_DIAGNOSTIC`
Transplant mechanics, 35/35 focused tests and lint passed; current TypeScript rejected one historical test spread with TS2698.

### R8 — accepted
R8 required exact TS2698/AST identity, runtime-erased type-only alternatives, non-empty byte-identical emitted JavaScript, exactly one adapted test file, 15 byte-exact files, production-source adaptation 0, full focused regressions, lint/type pass, 10+3 preservation, Webpack build and evidence/non-drift gates.

Selected variant: `Record<string, unknown>` assertion around `evidence()` in `tests/unit/combo/computationalShadowObservabilityAccumulator.test.ts`.

## Permanent anti-repeat rules

- distinguish final diff, feature contract, missing support closure, full historical reachability and current implementation authority;
- derive complete missing-only support before mutation;
- stop at current-owned implementations;
- use TypeScript parser/module resolution for module authority;
- do not use path namespace as architecture authority;
- safety-classify the full copy set before mutation;
- require static local import resolution before tests;
- runtime-compile/smoke qualification regexes;
- classify compiler diagnostics before compatibility edits;
- test-only typing adaptations require runtime-erased changes and emitted-JS parity;
- production source stays exact unless separately justified;
- resolve compatibility variants within one qualification run rather than repeated operator reruns;
- do not resurrect retired providers or unrelated network-capable historical application services.

## Architecture conclusion

D18 remains aligned with the five pillars. OmniRoute owns routing/orchestration; Auth Keeper owns credential/session/account lifecycle; Operations Floor remains observer/operator plane; GPT-5.6 Sol/Terra/Luna remain protected-native/non-routeable; OpenCode/TheOldLLM remain retired; full E2E qualification is now the active, user-authorized non-destructive engineering phase; live cutover remains unauthorized.
