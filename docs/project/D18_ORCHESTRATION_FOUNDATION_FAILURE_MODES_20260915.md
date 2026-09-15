# D18 Orchestration Foundation Transplant — Failure Modes and Engineering Record

Date: 2026-09-15
Status: Durable fork engineering appendix — D18 transplant accepted at R8

For continuation in a new conversation, use [CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md](CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md).

This document records the engineering failures and decisions discovered while transplanting the frozen D18 bounded production-evidence/orchestration foundation onto the current integrated OmniRoute authority.

It is not activation authority. D18 remains passive/unwired until later evidence explicitly authorizes otherwise.

## 1. Authorities

Current accepted D18 R8 successor:

- branch `feat/d18-orchestration-foundation-transplant-r8`;
- commit `58452140ffc8122a26a387638f8a38d7d80f5024`;
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`;
- parent `1c4da240883e729d38a356ec83919ad7f6637623`;
- evidence ZIP SHA-256 `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`.

Frozen historical D18 source authority:

- branch `feat/r16-32d18-bounded-production-evidence-readout`;
- commit `0f13a6d6df0251d9fa39e70aff78c0b58766845d`;
- tree `71e1f60cd349599df0e9c4f800af6e6a3f719fd4`;
- parent `0b42d800a4f6bb1f000a51cb5e93a2be18ea623b`.

Read-only transplant audit evidence ZIP SHA-256:

`69104b926e96801a17f70d1da2c02d28bc678d0c717d6f200003cefceb1d4c13`

## 2. Final accepted R8 shape

R8 closed the D18 transplant workstream with:

- 7 feature-contract files;
- 9 missing support files;
- 16 total transplanted paths;
- current-owned files overwritten: 0;
- project-local unresolved imports before tests: 0;
- bounded readout external runtime consumers: 0;
- 15 files byte-exact to frozen D18;
- 1 historical test-only TypeScript compatibility adaptation;
- production-source adaptation count: 0.

Selected compatibility adaptation:

`tests/unit/combo/computationalShadowObservabilityAccumulator.test.ts`

The historical helper returned its synthetic evidence object with `as never`; a negative-leakage test later spread `...evidence()`. Current TypeScript raised TS2698 even though runtime behavior was valid. R8 selected a runtime-erased `Record<string, unknown>` assertion after proving exact diagnostic identity, AST target identity and byte-identical emitted JavaScript.

Final focused qualification:

- bounded readout tests: 10/10 pass;
- accumulator tests: 16/16 pass;
- observability-adapter tests: 9/9 pass;
- total: 35/35 pass;
- changed-file ESLint: pass;
- changed-file TypeScript diagnostics: 0;
- 10 routed + 3 protected-native invariants: pass;
- default Webpack production build: pass;
- BUILD_ID: present;
- standalone output: present;
- build output files: 22,645;
- Turbopack panic: absent.

Independent evidence review verified the outer evidence ZIP SHA, all manifest/evidence-hash entries, exact 16-path patch, focused test totals and emitted-JavaScript parity.

## 3. Candidate R1 — final-diff closure omission
Classification: `GENUINE_OUTBOUND_DEPENDENCY_CLOSURE_OMISSION`.

Permanent lesson: final commit diff and feature transplant boundary are different sets.

## 4. Candidate R2 — regex import scanner false positives
Classification: `HARNESS_ONLY_REGEX_IMPORT_SCANNER_FALSE_POSITIVE`.

Permanent lesson: comments/strings/import-looking text are not module-graph authority.

## 5. Candidate R3 — full reachability mistaken for patch authority
Classification: `UNBOUNDED_TRANSITIVE_GRAPH_IS_NOT_D18_PATCH_AUTHORITY`.

The valid TypeScript AST/module graph reached 1,164 files / 2,924 edges / 63 missing files and crossed unrelated historical application surface.

Permanent lesson: a correct dependency graph is evidence, not automatic transplant ownership.

## 6. Seven-file D18 feature contract

The source-backed feature-owned contract was:

1. `open-sse/services/combo/boundedProductionEvidenceReadout.ts`
2. `tests/unit/combo/boundedProductionEvidenceReadout.test.ts`
3. `open-sse/services/combo/gatePathCandidateDispositionShadowObservability.ts`
4. `open-sse/services/combo/executeTargetGates.ts`
5. `open-sse/services/combo/computationalShadowObservabilityAccumulator.ts`
6. `tests/unit/combo/computationalShadowObservabilityAccumulator.test.ts`
7. `tests/unit/combo/gatePathCandidateDispositionShadowObservability.test.ts`

## 7. Candidate R4 — feature contract not self-contained as support set
Classification: `SEVEN_FILE_FEATURE_CONTRACT_REQUIRES_BOUNDED_MISSING_SUPPORT_CLOSURE`.

Permanent lesson: feature-owned contract and minimal executable/testable support set are different sets.

## 8. Candidate R5 — hard namespace boundary rejected legitimate architecture support
Classification: `HARD_NAMESPACE_BOUNDARY_REJECTED_LEGITIMATE_AUTH_KEEPER_SUPPORT_DEPENDENCY`.

Permanent lesson: directory namespaces are not a reliable proxy for architectural legitimacy.

## 9. Candidate R6 — complete missing-only closure, then regex harness failure
Classification: `HARNESS_ONLY_PYTHON_REGEX_INLINE_FLAG_PLACEMENT`.

R6 converged before mutation on 7 feature-contract + 9 support = 16 files with 0 unresolved project-local imports.

Permanent lesson: regex catalogs must be runtime-compiled and behavior-smoked during harness prevalidation.

## 10. Candidate R7 — mechanics pass, historical test typing fails current TypeScript
Classification: `HISTORICAL_TEST_TYPESCRIPT_COMPATIBILITY_DIAGNOSTIC`.

R7 proved copy-set risk, static import resolution, 35/35 focused tests and lint, then stopped on the single line-109 TS2698 in the historical accumulator test.

Permanent lesson: historical runtime success does not waive current compiler compatibility.

## 11. Candidate R8 — accepted compatibility strategy

R8 preserved the R7 16-file closure and zero-unresolved-import result.

Acceptance procedure required:

1. exact pre-adaptation TS2698 classification;
2. AST identity of the `...evidence()` spread;
3. runtime-erased TypeScript type-assertion alternatives only;
4. non-empty, byte-identical emitted JavaScript;
5. exactly one adapted test file;
6. 15 byte-exact transplant files;
7. production-source adaptation count zero;
8. 35/35 focused regressions;
9. changed-file lint/type pass;
10. current 10+3 invariants;
11. default Webpack production build and standalone qualification;
12. commit/evidence/non-drift pass.

Accepted selected variant: runtime-erased `Record<string, unknown>` assertion.

Result: `PASS_D18_ORCHESTRATION_FOUNDATION_TRANSPLANT_CANDIDATE_R8`.

## 12. Permanent anti-repeat engineering rules

Historical feature transplant work must distinguish:

1. final commit diff;
2. feature-owned frozen contract;
3. complete missing-only support closure relative to current authority;
4. complete transitive historical reachability graph;
5. current implementation authority.

Additional rules:

- never add missing dependencies one-by-one when a parser-backed closure can be derived first;
- never treat a directory namespace as architectural authority by itself;
- stop traversal at current-owned implementations;
- compute and safety-classify the whole missing copy set before candidate mutation;
- require assembled-candidate static import resolution before tests;
- runtime-compile and behavior-smoke regex catalogs before use;
- classify changed-file compiler diagnostics before compatibility edits;
- for test-only TypeScript compatibility, require runtime-erased adaptation plus emitted-JavaScript parity;
- production source remains exact unless separately justified;
- compatibility variants should be tested automatically inside one qualification run rather than through repeated operator reruns;
- do not resurrect retired providers or network-capable historical application services merely because they are reachable historically.

## 13. Architecture sanity conclusion

The D18 work remains aligned with the five-pillar architecture.

- OmniRoute remains routing/orchestration authority;
- Auth Keeper remains credential/session/account authority and may expose eligibility contracts consumed by orchestration;
- Operations Floor remains observer/operator plane;
- GPT-5.6 Sol/Terra/Luna remain protected-native and non-routeable in the normal fleet;
- OpenCode and TheOldLLM remain retired from active product scope;
- D18 remains passive/unwired;
- full end-to-end qualification is now the active, user-authorized non-destructive engineering phase;
- live cutover remains separately gated and unauthorized.
