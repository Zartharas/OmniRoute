# Engineering Source of Truth

Last reviewed: 2026-09-13
Status: Canonical engineering governance for the `Zartharas/OmniRoute` fork

This document governs how architecture changes are implemented, qualified and promoted.

## 1. Engineering objective

Engineering work must advance the [Architecture Source of Truth](ARCHITECTURE_SOURCE_OF_TRUTH.md) without silently narrowing the product into a single provider, single model, single branch or single R16.x subproject.

The engineering system should make it possible to improve OmniRoute, Auth Keeper, Codex Unified and Operations Floor independently while preserving their shared contracts.

## 2. Source-of-truth precedence

Use the following precedence when facts conflict:

1. [Architecture Source of Truth](ARCHITECTURE_SOURCE_OF_TRUTH.md) for product intent and architecture invariants.
2. This document for engineering method and non-regression rules.
3. [Master Roadmap](MASTER_ROADMAP.md) for current implementation status and next work.
4. Accepted Git objects, tests, build evidence and runtime evidence for implementation reality.
5. Upstream README/ROADMAP for upstream OmniRoute direction only.
6. Historical chats, issue comments, temporary scripts and branch notes as supporting evidence only.

If implementation reality contradicts architecture, the contradiction must be surfaced. Do not silently reinterpret the architecture to match an accidental implementation state.

## 3. Evidence-first workflow

Before mutating source:

- identify the exact accepted source commit/tree/branch or upstream authority;
- inspect the exact declaration/function/type shapes being changed;
- identify protected call counts and side effects;
- generate candidate changes in an isolated preview where practical;
- parse/compile embedded Bash, Python, Node and TypeScript used by the harness;
- run semantic/AST guards rather than brittle raw occurrence-count assumptions;
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
- runtime imports and type-only imports must be distinguished;
- snapshot calls with different semantic roles must be classified, not globally counted as interchangeable;
- positive hard facts may only be captured in the applicability scope in which the corresponding blocker/check was actually evaluated;
- candidate presence is never sufficient compatibility proof;
- object identity must not be assumed when a stable request-local key such as `executionKey` already exists;
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
- routing experiments begin as computational shadow/observation and only activate after evidence.

## 6. R16.32 position

R16.32 is an implementation program under Pillar 4: Intelligent Multi-Model Orchestration.

Accepted work to date includes, at a high level:

- normalized candidate hard facts;
- deterministic disposition evaluation;
- computational shadowing that does not send additional traffic;
- explainability reason taxonomy;
- bounded in-memory observability;
- request-local gate-path blocker and positive-fact capture;
- compatibility source discovery;
- request/context compatibility provenance contract;
- corrected three-component context model: `generic_request_context`, `configured_context`, `auto_estimated_input_context`;
- executionKey-keyed request-local sidecar design.

Current implementation work is the isolated request/context compatibility-provenance implementation/qualification path (D14/D15 lineage). The exact current checkpoint must be read from accepted Git/evidence state, not inferred from this prose if later commits have advanced it.

After compatibility provenance is qualified, remaining R16.32 work includes safe evidence/readout, empirical shadow qualification and conservative provider-neutral preference intelligence before any routing activation.

## 7. Operations Floor engineering authority

Historical branches containing significant Operations Floor implementation include:

- `feat/operations-floor-openai-preservation`
- `feat/operations-floor-protected-native`

Operations Floor implementation concepts that remain architecturally live include:

- routed workload fleet visibility;
- protected-native/OpenAI presentation;
- personal versus isolated MTA/enterprise visibility;
- provider/request inspection;
- routing/fallback animation;
- operator attention queues;
- auth/compression/system telemetry evidence;
- zero-call simulation/testing paths;
- provider test actions;
- pixel-office representation of worker state.

Absence from the current upstream release branch does not deprecate these concepts.

## 8. Codex Unified engineering authority

The intended Codex-facing control plane historically used host-side artifacts under `.codex-unified` and a `codex-unified-router` implementation.

Engineering changes must preserve the single-agent goal: Codex is the user-facing working agent while OmniRoute can delegate analysis/review/synthesis to multiple eligible workers behind it.

Multiple reasoning workers do not imply uncontrolled multi-writer execution. Repository/tool mutation should remain owned by an explicitly selected acting model/agent unless a reviewed architecture change says otherwise.

## 9. Auth Keeper engineering boundary

Auth Keeper is developed in the private `Zartharas/omniroute-auth-keeper` repository.

The private repository is authoritative for Auth Keeper implementation, service/recovery mechanics, secret handling and release evidence. It must not redefine routing policy independently of the public architecture source of truth.

## 10. Upstream integration policy

The fork should continue to ingest compatible upstream OmniRoute changes.

When upstream changes overlap custom architecture:

1. preserve upstream behavior unless a fork invariant requires a controlled override;
2. prove whether the custom behavior can be expressed as an extension rather than a fork-only rewrite;
3. re-run architectural non-regression tests after reconciliation;
4. keep Operations Floor, Auth Keeper and Codex Unified contracts intact;
5. document deliberate divergence.

## 11. Release and live-cutover boundary

Development/qualification authorization does not imply production authorization.

A live cutover requires a separate explicit decision after:

- canonical source/tree authority is frozen;
- production build identity is proven;
- tests/type/lint/build gates pass;
- canary/shadow evidence is reviewed;
- rollback image/state is known and tested;
- live health checks are defined.

## 12. Documentation completion rule

A phase that materially changes architecture, authority boundaries, provider access modes, workload policy, Operations Floor semantics or Codex Unified behavior is incomplete until the canonical docs are updated.

If a later engineer or assistant can read the repo and reasonably infer the wrong product goal, the documentation work is not complete.
