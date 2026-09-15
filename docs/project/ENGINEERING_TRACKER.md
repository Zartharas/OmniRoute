# Engineering Tracker

Last reviewed: 2026-09-15
Status: Durable work tracker for the `Zartharas/OmniRoute` fork

This tracker records completed, active and pending engineering work across the five-pillar product. It is subordinate to accepted Git/test/build/runtime evidence and the canonical architecture/engineering documents.

## 1. Current product sequence

| Order | Workstream | Status | Current authority / next action |
| --- | --- | --- | --- |
| 1 | Codex Unified repository reintegration | Complete | Current integrated host/repository authority preserved through later phases |
| 2 | Auth Keeper final contract reconciliation | Complete | R11 `b3b0d137369038d22820947729233deaec19e166` |
| 3 | Operations Floor selective reintegration | Complete | `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c` |
| 4 | Production build-policy hardening | Complete | Webpack-default successor `1c4da240883e729d38a356ec83919ad7f6637623` |
| 5 | D18 bounded orchestration/evidence foundation transplant | Active | R4 exact seven-file frozen-contract candidate |
| 6 | Full end-to-end qualification | Pending | Begins only after D18 acceptance |
| 7 | Live activation / cutover | Not authorized | Separate explicit gate after full E2E/canary/rollback review |

Do **not** resume D19 automatically.

## 2. Current workload/provider authority

- routed models: 10;
- personal lane: 6;
- MTA/enterprise lane: 4;
- protected-native: GPT-5.6 Sol, Terra, Luna;
- protected-native routeability: none;
- OpenCode: retired from active product scope;
- TheOldLLM: retired from active product scope.

Historical references/tombstones/negative tests may remain if non-reachable.

## 3. Codex Unified work

### Completed

- repository reintegration completed for the current integration lineage;
- host configuration/catalog/workload policy/router preserved as qualification sentinels;
- current 10-routed + 3-protected-native authority established;
- personal versus MTA/enterprise workload split preserved;
- protected-native Sol/Terra/Luna kept outside normal routed IDs.

### Remaining

- full integrated end-to-end qualification after D18 acceptance;
- live promotion only after explicit authorization.

## 4. Auth Keeper work

### R10/R11 final reconciliation — complete

Accepted private-repo R11 authority:

- commit `b3b0d137369038d22820947729233deaec19e166`;
- tree `9377fe6afe21f098861f32c751f05c8a72882211`;
- parent `9419532db2d37218778343b66f5667ea6e437b43`;
- full suite 457/457 pass;
- evidence ZIP SHA-256 `fd1be07a3e2eaf76aa6d9190cfc1725e69b34d6e099ff6104725165692808854`.

### Permanent boundary

- OmniRoute owns routing/provider policy;
- Auth Keeper owns credential/session/account lifecycle;
- `providerId + connectionId` is the accepted wire identity model; do not invent extra required wire fields without source authority.

## 5. Operations Floor work

### Audit R1 — failed safely

Classification: `HARNESS_ONLY_HISTORICAL_CHECKOUT_PATH_ASSUMPTION`.

Lesson: historical Git authority is commit/tree/branch authority, not an old local checkout path.

### Audit R2 — failed safely

Classification: `HARNESS_ONLY_ACCEPTED_R10_OBJECT_DB_DID_NOT_CONTAIN_HISTORICAL_COMMITS`.

Lesson: remote historical authority and local object-database availability are separate facts.

### Audit R3 — accepted

- historical selective union: 27 files;
- missing: 23;
- divergent shared files: 4;
- identical: 0;
- retired-provider hits: 0;
- protected-native routeability hits: 0;
- legacy hard-coded model-count hits: 0;
- decision: selective port required;
- evidence ZIP SHA-256 `1942377bc4a8a3a81faaad0933824117779b6ece3e7435729c5e03978ecef512`.

### Candidate R1 — failed safely

Real compatibility diagnostics:

- Inspector `workloads` missing from main client;
- TiledOffice `systemSignals` missing from pixel preview;
- Inspector `workloads` missing from pixel preview;
- Header retained obsolete `settings` parent description key.

Additional lesson: linewise TypeScript comparison split a wrapped baseline diagnostic and produced one false candidate-only line.

### Candidate R2 — failed safely

- bounded prop adaptations succeeded;
- Header still used `HideableSidebarItemId` for a map that legitimately included always-visible `proxy`;
- one unrelated Playwright/AxeBuilder message changed rendering/type-path and exposed the weakness of full-message comparison.

Lesson: compare TypeScript diagnostic identity and independently forbid diagnostics on changed files.

### Candidate R3 / accepted Operations Floor authority — complete

Accepted local authority:

- commit `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c`;
- tree `2dbd97c1a0bfd1d3e1b9ffb1ce02fdc76848fddb`.

Accepted outcomes:

- 27-file selective reintegration;
- bounded current-contract adaptations only;
- Header uses semantic `SidebarItemId` domain while obsolete `settings` parent mapping is removed;
- 10 routed / 6 personal / 4 MTA / 3 protected-native preserved;
- protected-native routeability zero;
- OpenCode/TheOldLLM not reactivated;
- targeted tests/lint/type differential passed;
- Operations Floor remains observer/operator plane.

## 6. Turbopack / production-build issue

### Recurring symptom

Production qualification repeatedly stalled/failed inside the Turbopack build path with a deterministic internal invariant panic while accepted source/type/test gates were otherwise clean.

### Discriminator

The exact accepted Operations Floor source tree built successfully with Webpack.

Webpack qualification evidence:

- ZIP SHA-256 `bf3c658cd0590d49cdc54b77ec671560701ffdd2f25aab3caa5d3fa4cefebbad`;
- build rc 0;
- valid BUILD_ID;
- standalone output present;
- Turbopack panic absent.

### Permanent mitigation — complete

Webpack-default successor:

- commit `1c4da240883e729d38a356ec83919ad7f6637623`;
- tree `569335188af0ec7c20d43b2a9ecc98bca83a1e9b`;
- parent `c0a5f2c624fc2370fbc959e91a58bddf60f51a5c`.

Policy:

- plain `npm run build` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=0` → Webpack;
- `OMNIROUTE_USE_TURBOPACK=1` → explicit Turbopack opt-in.

Standardization evidence ZIP SHA-256: `891bcfab81173eb86d5b9ab478eec6f3108c644f51dbf9440f970b63f5f5efeb`.

## 7. D18 bounded orchestration/evidence foundation

Frozen local D18 authority:

- branch `feat/r16-32d18-bounded-production-evidence-readout`;
- commit `0f13a6d6df0251d9fa39e70aff78c0b58766845d`;
- tree `71e1f60cd349599df0e9c4f800af6e6a3f719fd4`;
- parent `0b42d800a4f6bb1f000a51cb5e93a2be18ea623b`.

D18 is local-only authority and should not be described as published to the fork remote by that SHA.

### Read-only transplant audit R1 — accepted

- final D18 diff: 2 files;
- current missing: 2;
- current divergent: 0;
- deletions: 0;
- external runtime inbound edges: 0;
- safety blockers: 0;
- review flags: 0;
- decision: selective transplant required;
- audit ZIP SHA-256 `69104b926e96801a17f70d1da2c02d28bc678d0c717d6f200003cefceb1d4c13`.

### Candidate R1 — failed safely

Classification: `GENUINE_OUTBOUND_DEPENDENCY_CLOSURE_OMISSION`.

The two-file final commit diff was not sufficient because the bounded readout test depended on earlier D18 foundation code, including `computationalShadowObservabilityAccumulator.ts`.

### Candidate R2 — failed safely

Classification: `HARNESS_ONLY_REGEX_IMPORT_SCANNER_FALSE_POSITIVE`.

Regex import discovery falsely treated import-looking text as real module edges. Two confirmed false candidates were:

- `publicCreds.ts` → `./open-sse/utils/publicCreds.ts`;
- `autoStrategy.ts` → `../services/combo`.

Lesson: real module questions require the TypeScript AST/module resolver.

### Candidate R3 — failed safely

Classification: `UNBOUNDED_TRANSITIVE_GRAPH_IS_NOT_D18_PATCH_AUTHORITY`.

TypeScript AST/module resolution succeeded and discovered:

- closure files: 1,164;
- graph edges: 2,924;
- missing current files: 63;
- identical current files: 841;
- divergent existing files: 260;
- unresolved internal imports: 0.

However the historical graph reached retired OpenCode inventory and network-capable provider/runtime services. That graph is useful reachability evidence but is not valid D18 transplant authority.

### Candidate R4 — active

Strategy: exact source-backed **seven-file frozen D18 contract boundary**.

Contract files:

1. `boundedProductionEvidenceReadout.ts`
2. `boundedProductionEvidenceReadout.test.ts`
3. `gatePathCandidateDispositionShadowObservability.ts`
4. `executeTargetGates.ts`
5. `computationalShadowObservabilityAccumulator.ts`
6. `computationalShadowObservabilityAccumulator.test.ts`
7. `gatePathCandidateDispositionShadowObservability.test.ts`

R4 rules:

- classify each contract file as missing/identical/divergent-existing;
- copy missing files byte-exact only;
- preserve divergent current implementations;
- reject the 1,164-file transitive graph as patch authority;
- reject retired-provider/network/DB/protected-routeability hits in transplanted production files;
- require zero external production consumers of the bounded readout;
- run all three bounded contract tests;
- require changed-file lint pass and zero changed-file TypeScript diagnostics;
- preserve 10+3 workload authority;
- run default Webpack production build;
- no live/provider/credential/dependency-install/push side effects.

## 8. Full end-to-end qualification — pending

Begins only after D18 R4 or a later accepted bounded D18 candidate succeeds.

Target integrated path:

`Codex Unified → OmniRoute → Auth Keeper/provider → orchestration/fallback → response → Operations Floor evidence`

Must include negative/failure-path qualification for quota, cooldown, provider outage, auth expiry/re-auth, fallback, workload isolation, protected-native preservation, restart/recovery and rollback readiness.

## 9. Live activation — not authorized

No current local acceptance authorizes production cutover, D18 readout activation or preference-routing activation.

## 10. Repository documentation / PR tracker

### PR #15 — engineering failure-mode register

Status: open, documentation-only, fork-local.

This branch now also carries the current architecture/status/roadmap/tracker alignment so the repo does not continue advertising stale D15/D16 sequencing or retired-provider scope.

### PR #10 — Kimi rotated-token persistence verification

Status: open legacy verification PR. It is not the current master product workstream and should be reviewed/closed separately rather than being allowed to drive the five-pillar roadmap.

## 11. Update rule

After every accepted phase:

- update this tracker with exact commit/tree/evidence authority;
- update Current Status and Roadmap when the checkpoint/sequence changes;
- update Architecture when provider/product/authority scope changes;
- update Engineering Source of Truth / Failure-Mode Register for permanent lessons;
- do not call a phase documentation-complete while the repo still tells the next engineer to follow a stale sequence.
