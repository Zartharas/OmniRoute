# Engineering Source of Truth

Last reviewed: 2026-09-17
Status: Canonical engineering governance for the `Zartharas/OmniRoute` fork

This document governs how architecture changes are implemented, qualified and promoted.

## 1. Engineering objective

Engineering work must advance the [Architecture Source of Truth](ARCHITECTURE_SOURCE_OF_TRUTH.md) without silently narrowing the product into a single provider, single model, single branch or single R16.x subproject.

The engineering system should make it possible to improve OmniRoute, Auth Keeper, Codex Unified and Operations Floor independently while preserving their shared contracts.

## 2. Source-of-truth precedence

Use the following precedence when facts conflict:

1. [Architecture Source of Truth](ARCHITECTURE_SOURCE_OF_TRUTH.md) for product intent and architecture invariants.
2. This document for engineering method and non-regression rules.
3. [Master Roadmap](MASTER_ROADMAP.md) for long-range implementation sequencing.
4. [Current Project Status](CURRENT_STATUS.md) for the latest accepted checkpoint summary.
5. Accepted Git objects, tests, build evidence and runtime evidence for implementation reality.
6. Upstream README/ROADMAP for upstream OmniRoute direction only.
7. Historical chats, issue comments, temporary scripts and branch notes as supporting evidence only.

If implementation reality contradicts architecture, the contradiction must be surfaced. Do not silently reinterpret the architecture to match an accidental implementation state.

## 3. Evidence-first workflow

Before mutating source:

- identify the exact accepted source commit/tree/branch or upstream authority;
- inspect the exact declaration/function/type shapes being changed;
- identify protected call counts and side effects;
- generate candidate changes in an isolated preview where practical;
- parse/compile embedded Bash, Python, Node and TypeScript used by the harness;
- validate harnesses against the actual operator runtime, including macOS `/bin/bash` 3.2 where applicable;
- run semantic/AST guards rather than brittle raw occurrence-count, brace-ownership or line-proximity assumptions;
- run focused tests before creating an implementation worktree when feasible;
- fail closed on unexpected source shape.

After mutation:

- prove the changed-file scope;
- prove parent/source authority;
- rerun semantic guards and focused regressions;
- run type/lint/build differential qualification;
- prove operator/live/non-target worktrees were not mutated;
- record commit/tree/file hashes for accepted phases;
- do not push/deploy/live-cutover merely because a development phase passed.

## 4. Harness regression register

The following bug classes are permanent lessons and must remain covered by future validators where relevant:

- unset `legacyOutcome` sentinel is `null`, not `undefined`;
- trailing whitespace and final-newline hygiene must be checked before worktree mutation;
- nested callbacks may belong to an outer lexical semantic owner; nearest-function ownership is not automatically semantic ownership;
- wrapper types such as `Readonly<T>` must be resolved before generic identifier aliases in AST type resolvers;
- identical declaration suffixes in multiple interfaces/types must be patched by exact declaration scope, not global text replacement;
- callback-binding completeness must be proven when inserted code references values such as `target`; a nearby lexical value is not evidence that the callback actually binds it;
- outer factory returns must be located by semantic ownership, not by the first textual `return Object.freeze(...)` or similar surface pattern;
- a hypothesized ambiguity must not be turned into a required invariant; semantic locators should work whether irrelevant neighboring/nested syntax exists or not;
- runtime imports and type-only imports must be distinguished;
- snapshot calls with different semantic roles must be classified, not globally counted as interchangeable;
- positive hard facts may only be captured in the applicability scope in which the corresponding blocker/check was actually evaluated;
- candidate presence is never sufficient compatibility proof;
- object identity must not be assumed when a stable request-local key such as `executionKey` already exists;
- JavaScript/ESM config files and the dependency tree used to load them are one toolchain authority; do not combine a historical config with unrelated current dependencies without an explicit compatibility model;
- historical baselines may carry inherited lint/type diagnostics under a newer toolchain; compare baseline and candidate under the same toolchain and reject candidate-only drift instead of requiring an artificial zero-diagnostic baseline or silently editing unrelated debt;
- named TypeScript contracts must have their exact declaration shape proven before member assertions; a semantic contract name does not imply `interface` rather than `type` alias, wrapper, intersection or other shape;
- Bash scripts delivered for macOS `/bin/bash` must not rely on Bash 4+ features such as `mapfile/readarray` unless the runtime is explicitly changed and qualified;
- ordinary `const` assignments must not be misclassified as function declarations by generic source regexes;
- arbitrary line distance is not proof of callback/call-expression ownership;
- inline TypeScript object parameter types must not be mistaken for function bodies;
- destructured TypeScript defaults belong to `BindingElement` nodes and must not be assumed to live on `Parameter.initializer`;
- Markdown prose is explanatory unless explicitly designated as machine authority; exact JSON/source/Git evidence should carry machine semantics.

## 5. Routing and orchestration non-regression rules

Unless an explicitly reviewed architecture change says otherwise:

- explicit request/pinning wins where contractually applicable;
- Auth Keeper admission and credential eligibility are harder gates than preference;
- exclusion/workload-policy restrictions are harder gates than preference;
- capability/context compatibility is a harder gate than preference;
- breaker/cooldown/unavailability is a harder gate than preference;
- preference intelligence may only rank survivors;
- preference intelligence may not re-admit a rejected candidate;
- compatibility evidence should be retained from existing evaluations rather than recomputed merely for shadow/scoring;
- no extra Auth Keeper/provider/model/credential acquisition should be introduced solely for scoring when existing request-local evidence is available;
- routing experiments begin as computational shadow/observation and only activate after evidence;
- external model-architecture or benchmark metadata is enrichment only and must not override harder routing facts.

## 6. R16.32 position and accepted D18 checkpoint

R16.32 is an implementation program under Pillar 4: Intelligent Multi-Model Orchestration.

Earlier accepted work includes normalized candidate hard facts, deterministic disposition evaluation, computational shadowing, explainability reason taxonomy, bounded observability, request-local gate-path evidence, compatibility-source discovery, request/context compatibility provenance, the corrected three-component context model, executionKey-keyed request-local sidecars, D14 R6 isolated implementation, and D15 R2 compile/lint/build differential qualification.

The current accepted D18 source authority is:

- branch `feat/d18-r8-union-lockfix-linux-canary-r9`;
- commit `5ae6f97e732263e1029b35aeccf4873ba22d4554`;
- tree `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`;
- parent `13453f6bdf1c9279da3bea0d2382959c92c93d3e`.

The retained Linux image authority is `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`.

R11 isolated flag-OFF qualification is accepted. R12-R6 remains the runtime authority for the first fully executed isolated D18 flag-ON observation. It established two authorized Auth Keeper connection-state GETs, terminal `ALL_TARGETS_SKIPPED`, `attempted:0`, no target-specific provider dispatch, zero successful external egress under Docker `network=none`, cleanup, and live/non-target non-drift.

Formal R7 source/call-topology reconciliation is accepted and closed. Exact-object and TypeScript-AST analysis proved the two R12-R6 GETs belong to two distinct source paths:

1. availability/credential pre-screen:
   `preScreenTargets -> isModelAvailable/checkModelAvailable -> getProviderCredentialsWithQuotaPreflight -> getProviderCredentials -> applyAuthKeeperConnectionStateRoutingEligibility -> requestConnectionState`;
2. separately memoized D18 admission-plan preparation:
   `planPromise -> prepareAuthKeeperComboAdmissionPlan -> defaultApplyEligibility -> applyAuthKeeperConnectionStateRoutingEligibility -> requestConnectionState -> applyAuthKeeperComboAdmission`.

The runtime event count was not altered to fit the evidence; the exact candidate topology explains the two observed requests.

The active next boundary is **pre-activation readiness**. Production activation is not authorized by this checkpoint. Do not rerun R12/R7 diagnostics unless new contradictory evidence appears.

Any live promotion must be a separately authorized phase after a fresh live baseline proves exact source/image/runtime identity, production build identity, health gates, rollback image/state, activation mechanism, rollback mechanism, and post-change validation boundaries.

The exact accepted checkpoint is summarized in [Current Project Status](CURRENT_STATUS.md) and the D18 handoff.

## 7. Model-intelligence enrichment engineering policy

A future Unified Model Intelligence Registry may combine verified OmniRoute/provider facts with external architecture metadata.

Sebastian Raschka's LLM Architecture Gallery is a useful candidate enrichment reference:

- <https://sebastianraschka.com/llm-architecture-gallery/>

External enrichment must follow these rules:

- no request-time dependency on an external gallery/site for routing;
- pin/version the imported source and record a hash or immutable revision where practical;
- validate any imported schema before use;
- reconcile provider/model aliases explicitly rather than by fuzzy identity assumptions;
- preserve provenance for every external field;
- treat architecture metadata and benchmark scores as soft evidence classes, not hard capability/eligibility truth;
- official provider/API facts, verified OmniRoute catalog data and request-local runtime evidence take precedence over external metadata;
- external metadata may inform preference among already-eligible survivors but may not re-admit a hard-gate rejection;
- Operations Floor may display enrichment with provenance, but copied external diagrams/assets require separate licensing review.

## 8. Operations Floor engineering authority

Historical branches containing significant Operations Floor implementation include:

- `feat/operations-floor-openai-preservation`
- `feat/operations-floor-protected-native`

Operations Floor implementation concepts that remain architecturally live include routed workload fleet visibility, protected-native/OpenAI presentation, personal versus isolated MTA/enterprise visibility, provider/request inspection, routing/fallback animation, operator attention queues, auth/compression/system telemetry evidence, zero-call simulation/testing paths, provider test actions, and pixel-office representation of worker state.

Absence from the current upstream release branch does not deprecate these concepts.

## 9. Codex Unified engineering authority

The intended Codex-facing control plane historically used host-side artifacts under `.codex-unified` and a `codex-unified-router` implementation.

Engineering changes must preserve the single-agent goal: Codex is the user-facing working agent while OmniRoute can delegate analysis/review/synthesis to multiple eligible workers behind it.

Multiple reasoning workers do not imply uncontrolled multi-writer execution. Repository/tool mutation should remain owned by an explicitly selected acting model/agent unless a reviewed architecture change says otherwise.

## 10. Auth Keeper engineering boundary

Auth Keeper is developed in the private `Zartharas/omniroute-auth-keeper` repository.

The private repository is authoritative for Auth Keeper implementation, service/recovery mechanics, secret handling and release evidence. It must not redefine routing policy independently of the public architecture source of truth.

## 11. Upstream integration policy

The fork should continue to ingest compatible upstream OmniRoute changes.

When upstream changes overlap custom architecture:

1. preserve upstream behavior unless a fork invariant requires a controlled override;
2. prove whether the custom behavior can be expressed as an extension rather than a fork-only rewrite;
3. re-run architectural non-regression tests after reconciliation;
4. keep Operations Floor, Auth Keeper and Codex Unified contracts intact;
5. document deliberate divergence.

## 12. Release and live-cutover boundary

Development/qualification authorization does not imply production authorization.

A live cutover requires a separate explicit decision after:

- canonical source/tree authority is frozen;
- production build identity is proven;
- tests/type/lint/build gates pass;
- canary/shadow evidence is reviewed;
- rollback image/state is known and tested or otherwise proven recoverable within the accepted release contract;
- live health checks are defined;
- production activation and rollback steps have been pre-audited fail-closed without mutating live state.

The accepted D18 work has not changed the frozen live production runtime and must not be described as deployed until a later authorized publication/promotion phase proves that fact.

## 13. Documentation completion rule

A phase that materially changes architecture, authority boundaries, provider access modes, workload policy, Operations Floor semantics, Codex Unified behavior, accepted engineering checkpoint or permanent harness rule is incomplete until the canonical docs are updated.

If a later engineer or assistant can read the repo and reasonably infer the wrong product goal or wrong current phase, the documentation work is not complete.
