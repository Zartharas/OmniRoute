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
4. [Current Project Status](CURRENT_STATUS.md) and an explicitly canonical active phase definition, such as [D19](R16_32_D19_EMPIRICAL_ORCHESTRATION_EVIDENCE_READOUT.md), for the latest checkpoint/phase contract.
5. Accepted Git objects, tests, build evidence, runtime evidence, activation evidence and freeze evidence for implementation reality.
6. Upstream README/ROADMAP for upstream OmniRoute direction only.
7. Historical chats, issue comments, temporary scripts and branch notes as supporting evidence only.

If implementation reality contradicts architecture, surface the contradiction. Do not silently reinterpret architecture to match accidental implementation state.

## 3. Evidence-first workflow

Before mutating source or live state:

- identify the exact accepted source commit/tree/branch or upstream authority;
- inspect exact declaration/function/type shapes;
- identify protected call counts and side effects;
- generate candidate changes in an isolated preview where practical;
- parse/compile embedded Bash, Python, Node and TypeScript used by the harness;
- validate harnesses against the actual operator runtime, including macOS `/bin/bash` 3.2 where applicable;
- use semantic/AST guards instead of brittle occurrence-count, brace-ownership or line-proximity assumptions;
- run focused tests before creating implementation worktrees when feasible;
- fail closed on unexpected source/runtime shape.

After mutation or promotion:

- prove changed-file/runtime scope;
- prove parent/source/image authority;
- rerun semantic guards and focused regressions;
- run type/lint/build differential qualification where applicable;
- prove operator/non-target/live state non-drift where required;
- record commit/tree/file/image/evidence hashes for accepted phases;
- separate development acceptance, activation authorization, post-cutover freeze and rollback cleanup authorization.

## 4. Harness regression register

Permanent lessons include:

- unset `legacyOutcome` sentinel is `null`, not `undefined`;
- trailing whitespace and final-newline hygiene must be checked before worktree mutation;
- nested callbacks may belong to an outer lexical semantic owner;
- wrapper types such as `Readonly<T>` must be resolved before generic identifier aliases in AST type resolvers;
- declaration-specific edits must be scoped to the exact declaration;
- callback values referenced by inserted code must be proven bound in that exact callback;
- outer factory returns must be located by semantic ownership, not first textual match;
- a hypothesized ambiguity must not be turned into a required invariant;
- runtime imports and type-only imports must be distinguished;
- snapshot calls with different semantic roles must be classified;
- positive hard facts may only be captured in the applicability scope in which the corresponding check was evaluated;
- candidate presence is never sufficient compatibility proof;
- object identity must not be assumed when a stable request-local key such as `executionKey` exists;
- JavaScript/ESM config plus the dependency tree that loads it are one toolchain authority;
- historical baselines may carry inherited lint/type diagnostics under a newer toolchain; reject candidate-only drift instead of rewriting unrelated debt;
- named TypeScript contracts must have exact declaration shape proven before member assertions;
- macOS `/bin/bash` scripts must not rely on Bash 4+ features such as `mapfile/readarray` unless that runtime is explicitly changed and qualified;
- ordinary `const` assignments must not be misclassified as function declarations;
- line distance is not callback/call-expression ownership;
- inline TypeScript object parameter types must not be mistaken for function bodies;
- destructured TypeScript defaults belong to `BindingElement` nodes, not necessarily `Parameter.initializer`;
- Markdown prose is explanatory unless explicitly designated as machine authority;
- a read-only helper running as UID 0 can still lose access to protected files when `--cap-drop ALL` removes DAC-bypass capabilities; an `EACCES` under that boundary is a harness-permission discriminator, not proof of data drift;
- when read-only integrity auditing genuinely requires protected-file traversal, preserve `network=none`, a read-only root filesystem, read-only volume mounts and `no-new-privileges`, and add only the minimum capability required (`DAC_READ_SEARCH` in the accepted O2 case);
- never emit secondary count/digest drift assertions when the primary helper exited before producing complete output; validate helper success/output completeness before comparing fields.

## 5. Routing and orchestration non-regression rules

Unless an explicitly reviewed architecture change says otherwise:

- explicit request/pinning wins where contractually applicable;
- Auth Keeper admission and credential eligibility are harder gates than preference;
- exclusion/workload-policy restrictions are harder gates than preference;
- capability/context compatibility is a harder gate than preference;
- breaker/cooldown/unavailability is a harder gate than preference;
- preference intelligence may only rank survivors;
- preference intelligence may not re-admit a rejected candidate;
- compatibility evidence should be retained from existing evaluations rather than recomputed solely for shadow/scoring;
- no extra Auth Keeper/provider/model/credential acquisition should be introduced solely for scoring or observation when request-local evidence exists;
- routing experiments begin as computational shadow/observation and activate only after evidence;
- external architecture/benchmark metadata is enrichment only and must not override harder routing facts;
- observation/readout failures must be contained and must never become routing failures;
- an evidence accumulator/readout must not become a routing input unless a later separately reviewed architecture phase explicitly authorizes that transition.

## 6. R16.32 position, accepted D18 live checkpoint and active D19 phase

R16.32 is an implementation program under Pillar 4: Intelligent Multi-Model Orchestration.

Accepted lineage includes normalized candidate hard facts, deterministic disposition, computational shadowing, explainability taxonomy, bounded observability, request-local gate evidence, request/context compatibility provenance, executionKey-keyed sidecars, D14/D15 qualification, later completeness/readiness work, D18 Auth Keeper-aware admission, and formal source/runtime reconciliation.

Current D18 live authority:

- source commit `5ae6f97e732263e1029b35aeccf4873ba22d4554`;
- tree `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`;
- live image `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`;
- live container `mer-omniroute` / ID `5e5a904141fb8f17fd8e410f4f57284bc1a4cfbc7318dca46418925a51620efd`;
- D18 combo-admission activation enabled;
- R16.31 rollback holder and original data volume retained intact.

Accepted authority chain:

1. R12-R6 — first valid isolated D18 flag-ON runtime behavior;
2. R7 — exact-object/AST reconciliation of the availability/pre-screen and memoized admission-plan paths;
3. R3 — production-path transport/topology readiness;
4. R4 — fail-closed direct-Docker activation/rollback runbook;
5. H1 — Auth Keeper plist hardening;
6. A1 — authorized D18 production activation;
7. O1+O2 — composite post-activation freeze and rollback-integrity authority.

O1 is accepted for live/runtime/topology/Auth Keeper/host/evidence/stability gates. O2 is accepted for rollback-volume integrity. O1's apparent rollback drift was a harness-only DAC-read failure and must not be rediscovered as a product/data defect.

D18 is therefore **live, accepted and frozen post-activation**.

The active next phase is now canonically defined as **R16.32 D19 — Production-Safe Empirical Orchestration Evidence Readout**.

D19's engineering role is deliberately narrow: derive bounded aggregate empirical evidence from source-backed facts that D18 already computes, without changing routing or adding traffic/acquisition. The exact contract is maintained in `R16_32_D19_EMPIRICAL_ORCHESTRATION_EVIDENCE_READOUT.md`.

D19 development/non-live qualification through S6 is authorized. Production D19 activation (S7) remains separately unauthorized.

D19 permanent engineering constraints include:

- every empirical category must resolve to an exact existing source predicate/type/enum before it is counted;
- S1 must inspect the exact accepted local D18 Git object before any source mutation;
- target order/filter/selection/fallback semantics must remain unchanged;
- provider/model call differential must remain zero;
- Auth Keeper fetch differential must remain zero;
- credential-acquisition differential must remain zero;
- the D19 aggregate/readout must have no routing readback;
- evidence must be bounded, secretless, low-cardinality and non-persistent;
- runtime observation/readout must remain default-off until separately activated;
- unexpected evidence/schema state must be contained and may not fail a routed request;
- prefer the existing bounded evidence/observation owner where source census proves it semantically appropriate; do not build a parallel telemetry subsystem merely for patch convenience.

The immediate engineering step is D19-S1: exact accepted-object source census, read-only. No implementation worktree/source mutation should begin until S1 identifies exact source owners, category semantics, safe insertion/readout points, protected call counts and a candidate file allowlist.

## 7. Model-intelligence enrichment engineering policy

A future Unified Model Intelligence Registry may combine verified OmniRoute/provider facts with external architecture metadata.

Sebastian Raschka's LLM Architecture Gallery is a useful candidate enrichment reference:

- <https://sebastianraschka.com/llm-architecture-gallery/>

External enrichment must:

- have no request-time external dependency for routing;
- be pinned/versioned with provenance;
- validate imported schemas;
- reconcile aliases explicitly;
- remain a soft evidence class;
- never override official provider/API facts, request-local runtime evidence, Auth Keeper admission, workload policy, explicit pins, context compatibility, quota cutoffs or breaker/cooldown state;
- receive separate licensing review for copied diagrams/assets.

## 8. Operations Floor engineering authority

Historical branches containing significant Operations Floor work include:

- `feat/operations-floor-openai-preservation`
- `feat/operations-floor-protected-native`

Architecturally live concepts include routed workforce visibility, protected-native/OpenAI presentation, personal versus isolated MTA visibility, provider/request inspection, routing/fallback animation, attention queues, auth/compression/system telemetry, zero-call simulation/testing paths, provider test actions and pixel-office worker representation.

Operations Floor remains an operator/observer plane and must not become routing authority.

## 9. Codex Unified engineering authority

The intended Codex-facing control plane historically used host-side artifacts under `.codex-unified` and `codex-unified-router`.

The goal remains a single user-facing Codex agent with OmniRoute able to delegate analysis/review/synthesis to multiple eligible workers while mutation ownership remains explicitly controlled.

## 10. Auth Keeper engineering boundary

Auth Keeper is developed in the private `Zartharas/omniroute-auth-keeper` repository.

The private repository is authoritative for Auth Keeper implementation, service/recovery mechanics, secret handling and release evidence. It must not redefine routing policy or D19 evidence semantics independently of the public architecture/phase authority.

## 11. Upstream integration policy

Continue ingesting compatible upstream OmniRoute changes. When upstream overlaps custom architecture:

1. preserve upstream behavior unless a fork invariant requires a controlled override;
2. prefer extension over fork-only rewrite;
3. rerun architectural non-regression tests;
4. preserve Operations Floor, Auth Keeper and Codex Unified contracts;
5. document deliberate divergence.

## 12. Release, live-cutover and rollback-retention boundary

Development/qualification authorization does not imply production authorization. Production activation does not imply rollback cleanup authorization.

A live cutover requires:

- frozen canonical source/tree/image authority;
- tests/type/lint/build gates as applicable;
- reviewed canary/shadow evidence;
- explicit rollback runtime/state authority;
- defined health and validation gates;
- a pre-audited fail-closed activation/rollback transaction;
- explicit live-cutover authorization.

After cutover, do not remove rollback runtime/data until post-activation observation and rollback-integrity evidence are accepted and a separate cleanup decision is explicitly made.

D18 A1 fulfilled the activation boundary; composite O1+O2 fulfilled the immediate post-activation freeze boundary. R16.31 rollback cleanup remains unauthorized.

D19 S1-S6 may proceed under the current development authorization. D19 S7 production activation may not proceed without a separate explicit authorization after S1-S6 are accepted.

## 13. Documentation completion rule

A phase that materially changes architecture, authority boundaries, provider access modes, workload policy, Operations Floor semantics, Codex Unified behavior, accepted engineering checkpoint or permanent harness rules is incomplete until canonical docs are updated.

If a later engineer or assistant can read the repository and reasonably infer the wrong product goal, wrong live authority or wrong current phase, the documentation work is incomplete.