# New-Chat Handoff — Full End-to-End Qualification

Date: 2026-09-15
Status: Canonical handoff checkpoint for continuation in a new ChatGPT conversation
Repository: `Zartharas/OmniRoute`
Documentation branch / PR: `docs/engineering-failure-mode-register-20260915` / PR #15

This file exists so a new engineering chat can recover the current OmniRoute state from the repository without depending on prior conversation history.

## 1. Product architecture remains unchanged

The five-pillar product goal is still:

1. Codex Unified Agent
2. Unified OmniRoute AI Workforce
3. Auth Keeper
4. Intelligent Multi-Model Orchestration
5. Operations Floor

Canonical flow:

`User → Codex Unified → OmniRoute → Auth Keeper + AI workforce/protected capacity → orchestration/fallback → response → Operations Floor evidence`

Authority boundaries remain:

- OmniRoute owns routing/provider/orchestration policy.
- Auth Keeper owns credential/session/account lifecycle and may expose eligibility contracts consumed by orchestration.
- Operations Floor is an observer/operator plane, not routing authority.
- GPT-5.6 Sol, Terra and Luna are protected-native and non-routeable in the normal fleet.
- OpenCode and TheOldLLM are retired from active product scope. Historical references/tombstones/negative tests may remain if non-reachable.

## 2. Current program sequence

Completed:

1. Codex Unified repository reintegration.
2. Auth Keeper final contract reconciliation R11.
3. Operations Floor selective reintegration.
4. Production build-policy hardening: Webpack default, Turbopack explicit opt-in.
5. D18 bounded orchestration/evidence foundation transplant: accepted at R8.

Active next phase:

6. Full end-to-end qualification — the user explicitly authorized the next non-destructive engineering qualification phase.

Later only after separate explicit authorization:

7. Live activation/cutover.

Do **not** resume D19 automatically.

## 3. Accepted local authorities

### Current accepted OmniRoute successor — D18 R8

- branch: `feat/d18-orchestration-foundation-transplant-r8`
- commit: `58452140ffc8122a26a387638f8a38d7d80f5024`
- tree: `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`
- parent: `1c4da240883e729d38a356ec83919ad7f6637623`
- commit message: `feat(orchestration): transplant D18 foundation with test type compatibility`
- evidence ZIP SHA-256: `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`

Accepted R8 worktree:

`/Users/zarthras/Documents/Development Projects/omniroute-d18-orchestration-foundation-transplant-r8`

R8 is local accepted engineering authority. Do not claim it is published to the fork release branch unless later Git evidence proves publication.

### Pre-D18 integrated parent / Webpack-default authority

- commit: `1c4da240883e729d38a356ec83919ad7f6637623`
- tree: `569335188af0ec7c20d43b2a9ecc98bca83a1e9b`
- evidence SHA-256: `891bcfab81173eb86d5b9ab478eec6f3108c644f51dbf9440f970b63f5f5efeb`

### Operations Floor authority

- commit: `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c`
- tree: `2dbd97c1a0bfd1d3e1b9ffb1ce02fdc76848fddb`

Operations Floor workstream is closed.

### Auth Keeper R11 authority

Private repo: `Zartharas/omniroute-auth-keeper`

- commit: `b3b0d137369038d22820947729233deaec19e166`
- tree: `9377fe6afe21f098861f32c751f05c8a72882211`
- parent: `9419532db2d37218778343b66f5667ea6e437b43`
- full suite: 457/457 pass
- evidence SHA-256: `fd1be07a3e2eaf76aa6d9190cfc1725e69b34d6e099ff6104725165692808854`

### Frozen D18 historical source authority

- branch: `feat/r16-32d18-bounded-production-evidence-readout`
- commit: `0f13a6d6df0251d9fa39e70aff78c0b58766845d`
- tree: `71e1f60cd349599df0e9c4f800af6e6a3f719fd4`
- parent: `0b42d800a4f6bb1f000a51cb5e93a2be18ea623b`

This historical D18 source is local-only authority and was not resolvable from the fork remote by that SHA during the transplant work.

## 4. Accepted R8 result

R8 closed the D18 transplant workstream.

Accepted transplant facts:

- feature contract: 7 files;
- missing support closure: 9 files;
- total transplant surface: 16 files;
- current-owned files overwritten: 0;
- unresolved project-local imports before tests: 0;
- bounded readout external runtime consumers: 0;
- retired-provider hits: 0;
- protected-native routeability hits: 0;
- DB-write hits: 0;
- network-call hits: 0;
- process/server side-effect hits: 0;
- historical application-path risk hits: 0.

Focused regressions after final compatibility adaptation:

- bounded readout: 10/10 pass;
- computational shadow accumulator: 16/16 pass;
- gate-path observability adapter: 9/9 pass;
- total: 35/35 pass;
- changed-file ESLint: pass;
- changed-file TypeScript diagnostics: 0.

R8 permitted one test-only compatibility adaptation in `tests/unit/combo/computationalShadowObservabilityAccumulator.test.ts`. The historical helper returned an evidence object with `as never`, while a later negative-leakage test spread `...evidence()`. Current TypeScript raised TS2698. R8 selected a runtime-erased `Record<string, unknown>` assertion after proving exact diagnostic identity, AST target identity, byte-identical emitted JavaScript, zero production-source adaptation and full regression compatibility.

Production build qualification:

- plain `npm run build` used Webpack;
- build rc: 0;
- Next.js 16.3.2 Webpack build compiled successfully;
- static generation completed 591/591 pages;
- BUILD_ID present;
- standalone output present;
- output files: 22,645;
- Turbopack panic absent.

Independent evidence review verified the evidence ZIP hash/internals, exact 16-path patch, 35 focused passes and emitted-JavaScript parity.

## 5. D18 failure history that must not be repeated

- R1 `GENUINE_OUTBOUND_DEPENDENCY_CLOSURE_OMISSION`: final two-file diff too narrow.
- R2 `HARNESS_ONLY_REGEX_IMPORT_SCANNER_FALSE_POSITIVE`: regex import scanning created false edges.
- R3 `UNBOUNDED_TRANSITIVE_GRAPH_IS_NOT_D18_PATCH_AUTHORITY`: valid 1,164-file graph was too broad for patch authority.
- R4 `SEVEN_FILE_FEATURE_CONTRACT_REQUIRES_BOUNDED_MISSING_SUPPORT_CLOSURE`: feature contract was not self-contained for execution/tests.
- R5 `HARD_NAMESPACE_BOUNDARY_REJECTED_LEGITIMATE_AUTH_KEEPER_SUPPORT_DEPENDENCY`: path allowlist rejected legitimate Auth Keeper eligibility support.
- R6 `HARNESS_ONLY_PYTHON_REGEX_INLINE_FLAG_PLACEMENT`: correct 16-file closure found; regex catalog runtime bug stopped preflight.
- R7 `HISTORICAL_TEST_TYPESCRIPT_COMPATIBILITY_DIAGNOSTIC`: mechanics/test runtime passed; one historical test TS2698 remained.
- R8 accepted.

Permanent anti-repeat rules:

- derive complete missing-only support closure before mutation;
- stop traversal at current-owned implementations;
- use TypeScript AST/module resolution, not regex, for module authority;
- do not equate full historical reachability with patch ownership;
- do not use path namespace alone as architectural legitimacy;
- runtime-compile and smoke-test regex catalogs;
- require all static project-local imports to resolve before tests;
- classify compiler diagnostics before compatibility edits;
- for test-only typing fixes, require runtime-erased changes and emitted-JavaScript parity;
- resolve compatibility variants inside one qualification run rather than repeated operator reruns;
- production source remains exact unless separately justified.

## 6. Current model/workload authority

Host-side authority remains:

- routed models: 10;
- personal: 6;
- MTA/enterprise: 4;
- protected-native: 3;
- protected-native names: GPT-5.6 Sol, GPT-5.6 Terra, GPT-5.6 Luna;
- protected-native routeability: none.

Host sentinel hashes:

- router `~/Library/Application Support/mer-gateway/codex-unified-router/router.py`: `da5599b7c8cb0c6d755657069e5d2090b9e7d83edd4cbad4af3ed44c8495de97`
- config `~/.codex-unified/config.toml`: `2d731cb44980792ba010e51a865e1b11a99dc50b2c2ca0a50aaf903e5d8ae690`
- catalog `~/.codex-unified/model-catalog.json`: `6e88a9611dbc8978d2795fb14ce4fff0eabb82c2e68609b8c3994da92489250d`
- workload policy `~/.codex-unified/workload-policy.json`: `2bf6ecd48cd4d1e604c71af28dbf4a0606aba34fbd1c33c16762836b45d47a31`

Ingress authority during prior qualification: `127.0.0.1:22129`.

Do not read credential values merely to prove these sentinels.

## 7. Production builder authority

Current acceptance/release builder is Webpack.

- plain `npm run build` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=0` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=1` → explicit Turbopack experiment/requalification only.

Known Turbopack panic: `internal error: entered unreachable code: there must be a path to a root`.

Do not repeatedly rediscover it in ordinary acceptance work.

## 8. Full E2E qualification — current authorized engineering phase

The user explicitly authorized continuation into full end-to-end qualification.

The next engineering deliverable should be **one consolidated, non-destructive, prevalidated E2E qualification harness** starting from accepted R8 authority.

Target path:

`Codex Unified → OmniRoute → Auth Keeper/provider eligibility → orchestration/fallback → response → Operations Floor evidence`

Qualification should cover canonical lineage, host sentinel non-drift, Codex Unified contracts, Auth Keeper eligibility boundary, routing/fallback semantics, quota/cooldown, provider outage, auth-expiry/re-auth boundaries, workload isolation, protected-native preservation, Operations Floor evidence, restart/recovery, rollback readiness, Webpack build identity, evidence continuity and final non-drift.

### Safety boundary

Authorization is for engineering qualification, **not live cutover**. Unless later explicitly expanded, the harness must not make uncontrolled live provider/model calls, read or print secret/token/credential values, mutate live Auth Keeper accounts/sessions, change production routing/provider state, activate D18/preference routing, mutate a live image/container/database, push/deploy or cut over traffic.

Prefer mocks, fixtures, read-only contract probes and deterministic failure injection. Fail closed if qualification cannot be performed safely.

## 9. Operator workflow preference

- evidence-first;
- shortest path symptom → discriminator → fix → targeted validation;
- due diligence before scripts;
- avoid multiple incremental diagnostic/recovery scripts;
- one consolidated script per phase where feasible;
- macOS `/bin/bash` compatibility;
- prevalidate Bash, embedded Python/Node, parser/decision logic and forbidden side effects;
- classify exact failure before any successor;
- no remote push unless explicitly authorized.

## 10. Last local script / evidence to recognize

Last accepted local engineering script:

`omniroute_d18_orchestration_foundation_transplant_candidate_r8.sh`

Accepted result: `PASS_D18_ORCHESTRATION_FOUNDATION_TRANSPLANT_CANDIDATE_R8`.

If its terminal output/evidence is supplied again, verify it against accepted R8 rather than reopening R1-R7. If a newer full-E2E harness output is supplied, identify it from its header/hash and continue from that evidence.

## 11. Immediate next action in a new chat

1. Read this handoff and the canonical docs.
2. Treat R8 as the current local OmniRoute authority.
3. Analyze any supplied local script output/evidence first.
4. If no newer E2E harness has been run, build one consolidated non-destructive full-E2E qualification harness with these safety rules.
5. Do not reactivate D19, OpenCode or TheOldLLM.
6. Do not infer live-cutover authority from E2E development qualification.

## 12. Documentation PR

PR #15: `https://github.com/Zartharas/OmniRoute/pull/15`

It is documentation-only and should remain separate from runtime/source promotion unless explicitly changed later.
