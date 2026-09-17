# R16.32 D19 — Production-Safe Empirical Orchestration Evidence Readout

Last reviewed: 2026-09-17
Status: Development phase authorized; source implementation has not started; live D19 promotion is not authorized

## 1. Purpose

D19 is the bridge between the accepted D18 hard-gate/live-admission foundation and any future provider-neutral preference intelligence.

D19 must expose bounded empirical evidence from routing/orchestration facts that D18 already computes. It is an **observation-only** phase. It does not change routing authority, candidate ordering, eligibility, fallback, dispatch, provider traffic, credential acquisition, Auth Keeper traffic, persistence, or Operations Floor control semantics.

The goal is to establish a production-safe evidence baseline before any later preference/scoring phase is designed or activated.

## 2. D18 authority carried forward

D19 starts from the accepted frozen D18 live baseline:

- source commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`;
- source tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`;
- live image: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`;
- live container: `mer-omniroute`;
- D18 activation enabled;
- composite O1+O2 post-activation freeze accepted;
- R16.31 rollback holder and original rollback volume retained intact.

D19 development must not mutate that live authority. A later D19 live-observation promotion, if desired, requires a separate explicit live-cutover authorization.

## 3. Objective

D19 should provide a versioned, bounded, secretless aggregate readout derived from existing request-local orchestration evidence.

The exact source-backed vocabulary must be proven in D19-S1 before implementation. Candidate aggregate classes include, only where those semantics already exist in accepted source:

- total observed requests/samples;
- candidate/evaluation counts;
- eligible coverage;
- comparable-proceed coverage;
- mismatch/disagreement observations;
- not-ready observations;
- contained observation/evaluation errors;
- source-defined disposition/reason categories;
- an explicit unknown/unclassified bucket where needed for forward compatibility.

D19 must not invent new meanings for `eligible`, `comparable-proceed`, `mismatch`, `not-ready`, `contained-error`, or any other routing concept. The exact existing predicates/enums/types that own those meanings must be identified first.

Empirical rates are evidence, not pass/fail thresholds. D19 does not establish arbitrary activation percentages.

## 4. Non-goals

D19 does **not**:

- score or rank providers/models/accounts;
- reorder targets;
- filter or re-admit candidates;
- alter explicit pin/request precedence;
- change Auth Keeper eligibility/admission;
- change workload-policy/exclusion behavior;
- change capability/context compatibility;
- change breaker/cooldown/unavailability behavior;
- change quota cutoffs;
- change dispatch/fallback semantics;
- add provider/model probes or requests;
- add credential acquisition;
- add Auth Keeper fetches;
- retain prompts/messages/raw provider responses;
- expose credentials, tokens, cookies, authorization headers, browser/session secrets, or raw sensitive responses;
- introduce request-time external metadata dependencies;
- migrate or write production persistence solely for evidence;
- make Operations Floor a routing authority;
- activate future preference intelligence.

## 5. Required invariants

D19 must prove all of the following relative to its accepted D18 parent/baseline:

1. explicit request/pinning semantics unchanged;
2. Auth Keeper admission/credential eligibility unchanged;
3. workload-policy/exclusion semantics unchanged;
4. capability/context compatibility semantics unchanged;
5. breaker/cooldown/unavailability semantics unchanged;
6. quota cutoff semantics unchanged;
7. target order/filter/selection unchanged;
8. dispatch/fallback semantics unchanged;
9. provider/model call delta caused by D19 = `0`;
10. Auth Keeper fetch delta caused by D19 = `0`;
11. credential-acquisition delta caused by D19 = `0`;
12. D19 evidence is never read back into routing decisions;
13. observation memory is bounded;
14. evidence is secretless and low-cardinality;
15. evidence is non-persistent unless a later separately reviewed design explicitly changes that rule;
16. runtime observation/readout behavior is default-off until separately activated;
17. unexpected evidence input/schema states are contained and may omit/classify the sample, but may not fail or alter the routed request.

## 6. Evidence/data contract

D19 should prefer the existing bounded observability/evidence owner if the S1 source census proves that owner is semantically appropriate. Do not create a parallel telemetry subsystem merely because its location is easier to patch.

The initial readout should be aggregate-only and should avoid high-cardinality provider/account/model/request identity unless a later design proves that a bounded dimension is necessary.

Minimum safety characteristics:

- bounded in-memory counters/state;
- no per-request durable retention;
- no prompt/message/raw-response content;
- no credentials/tokens/session IDs;
- versioned snapshot/readout contract;
- explicit observation start/generation metadata;
- explicit denominators for rates;
- contained unknown/unclassified accounting;
- snapshot/readout access must be read-only;
- observation failures must not propagate into routing.

A concrete schema/contract name and readout transport are chosen only after D19-S1 proves the actual accepted source topology.

## 7. Mutation boundary

### Allowed after D19-S1 proves the exact source owner

- the existing bounded observation/evidence accumulator when semantically correct;
- one thin post-evaluation/post-disposition observation hook at the proven source point;
- a read-only local/operator snapshot/readout surface;
- focused tests, qualification harnesses, and canonical documentation.

### Forbidden for D19

- target resolution/order/filter/selection logic;
- D18 combo-admission decision logic;
- provider credential acquisition;
- Auth Keeper request behavior/call count;
- provider/model dispatch and fallback;
- workload-policy/model-catalog authority;
- protected-native behavior;
- production DB/data-volume schema or migration;
- host-side Codex Unified router behavior;
- Operations Floor routing/control authority.

If the source census shows that an apparently convenient insertion point would cross one of these boundaries, D19 must choose another insertion point or stop.

## 8. Phase gates

### D19-S1 — Exact accepted-object source census — READ ONLY

Before any source mutation:

- prove the accepted D18 commit/tree/parent and protected file hashes from local Git;
- inspect the exact accepted Git object rather than assuming the operator working tree reflects D18;
- locate the real candidate-fact/disposition/compatibility/shadow/observability owners;
- identify the exact source predicates/types/enums for the empirical categories D19 intends to count;
- identify the narrowest safe observation insertion point;
- identify the narrowest safe readout/snapshot owner;
- census protected Auth Keeper/provider/credential-acquisition calls and routing call topology;
- produce a source-backed proposed file allowlist;
- fail closed if ownership or category semantics are ambiguous.

S1 performs no source mutation and no live mutation.

### D19-S2 — Design freeze

Using S1 evidence, freeze:

- exact files/functions/types to change;
- exact aggregate schema and bounds;
- exact readout surface;
- default-off activation control;
- exact mutation allowlist;
- AST/semantic non-readback assertions;
- call-count invariants;
- secret/PII exclusion rules.

### D19-S3 — Isolated implementation

- implement only in an isolated branch/worktree;
- preserve the accepted live D18 runtime;
- keep the operator/baseline worktree non-drifted;
- fail closed on source-shape mismatch.

### D19-S4 — Static/differential qualification

Required evidence includes:

- focused unit/regression tests;
- baseline/candidate type/lint/build comparison as applicable;
- semantic/AST guards proving no D19 readout feeds routing decisions;
- provider/model call-count differential = `0`;
- Auth Keeper fetch-count differential = `0`;
- credential-acquisition differential = `0`;
- target order/filter/selection differential = `0`;
- boundedness tests;
- secret/readout-schema tests;
- unknown/unclassified/contained-error tests;
- changed-file allowlist and parent/object proof.

### D19-S5 — Isolated runtime qualification

Use synthetic/non-live conditions to prove:

- the readout accumulates the exact existing facts;
- routing result/parity is unchanged;
- observation failure is contained;
- no extra Auth Keeper fetch is introduced by observation;
- no extra provider/model request is introduced by observation;
- zero external egress attributable to the qualification harness where `network=none` is used;
- cleanup/non-drift succeeds.

### D19-S6 — Production pre-activation review

If S1-S5 are accepted, review the candidate against the frozen D18 production baseline. This remains non-live and must define the exact future activation/rollback transaction.

### D19-S7 — Production observation activation — SEPARATE AUTHORIZATION REQUIRED

D19 development authorization does not authorize S7.

If later explicitly authorized, activate only the production-safe evidence readout while preserving routing behavior. Retain D18 as the immediate rollback authority for that change. Do not interpret empirical percentages as automatic activation thresholds.

### D19-S8 — Empirical evidence freeze

Freeze the observed production evidence baseline with exact source/runtime provenance. The result should inform the design of a later preference-intelligence phase.

D19 completion means **a trusted empirical evidence baseline exists**. It does not mean preference intelligence is active.

## 9. Rollback model

During development, rollback is source-level: discard/revert the isolated candidate or keep the feature disabled.

If D19 is ever promoted live under separate authorization:

- the pre-D19 frozen D18 runtime becomes the immediate rollback baseline for D19;
- the existing retained R16.31 authority remains a deeper rollback asset until separately cleaned;
- because D19 must not require persistence migration, rollback should not require data conversion;
- disable the D19 observation flag or restore the pre-D19 D18 image/runtime according to the separately reviewed transaction;
- retain D19 evidence for diagnosis even when rollback occurs;
- rollback cleanup remains a separate decision.

## 10. Acceptance criteria

D19 is accepted only when:

- every measured category is tied to an existing source-backed semantic owner;
- the evidence path is bounded and secretless;
- routing semantics are unchanged;
- provider/model-call delta is zero;
- Auth Keeper-fetch delta is zero;
- credential-acquisition delta is zero;
- target order/filter/selection delta is zero;
- the readout is not consumed by routing;
- failure of observation/readout cannot fail the routed request;
- isolated runtime qualification passes;
- all source/live/non-target non-drift requirements pass.

The empirical rates themselves are not acceptance thresholds.

## 11. Authorization boundary

The user's 2026-09-17 continuation authorization authorizes D19 **definition and development work through non-live qualification/pre-activation review**.

It does **not** authorize:

- production D19 activation/promotion;
- modification or replacement of the frozen live D18 runtime;
- removal of R16.31 rollback authority;
- activation of provider-neutral preference scoring;
- Operations Floor routing/control changes.

Those require their own explicit authorization and accepted evidence.

## 12. Immediate next step

The next implementation step is **D19-S1 exact accepted-object source census** against the local accepted D18 Git object. No source mutation should begin until S1 identifies the actual existing evidence owners, category semantics, insertion point, readout owner, protected call counts, and candidate file allowlist.