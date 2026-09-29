# Five-Pillar Architecture Convergence Audit — 2026-09-28

## Purpose

Return OmniRoute engineering to the original five-pillar product objective and prevent provider-specific qualification work from becoming the program goal.

This audit is architecture/project-management only. It does not authorize or perform provider calls, credential reads, Docker/live mutation, deployment, merge, release cutover or rollback cleanup.

## Canonical product goal

1. Codex Unified Agent
2. Unified OmniRoute AI Workforce
3. Auth Keeper
4. Intelligent Multi-Model Orchestration
5. Operations Floor

Target path:

`User → Codex Unified → OmniRoute → Auth Keeper + eligible AI workforce → orchestration/fallback → response → Operations Floor evidence`

## 2026-09-28 provider-specific execution decision

The program must distinguish architecture capability from provider-specific live use.

### OpenCode

OpenCode remains useful as implementation and qualification evidence for API-key access and the Auth Keeper provider-bound credential-isolation seam.

It is **not** the current live-execution target.

Current decision:

- preserve OpenCode adapter, tests and qualified non-live P4G endpoint evidence;
- do not spend another real-provider call merely to prove OpenCode;
- keep OpenCode live execution on HOLD;
- keep provider-call authorization at zero unless a later product decision explicitly changes the selected workforce and supplies a justified live acceptance contract;
- do not interpret a free-priced model as proof of anonymous/keyless access.

### TheOldLLM

TheOldLLM remains historical evidence for the interactive-human-verification access-mode concept.

Current decision:

- preserve the architectural concept;
- do not revive TheOldLLM as an active engineering target;
- keep TheOldLLM redevelopment/live execution on HOLD;
- future human-verification work must be provider-neutral unless a later explicit product decision selects a concrete implementation.

### Consequence

The qualified P4G endpoint is retained as architecture evidence, not as authorization to continue OpenCode-specific execution work.

Formal boundary:

`PROVIDER_SPECIFIC_EXECUTION_HOLD_PROVIDER_NEUTRAL_CONVERGENCE_ACTIVE`

## Current convergence audit

| Pillar | Current classification | Accepted foundation | Remaining product gap |
| --- | --- | --- | --- |
| Codex Unified Agent | INCOMPLETE / PARTIALLY_REINTEGRATED | historical control-plane, catalog, workload-policy and router lineage exists | make maintained repository/release authority explicit; finalize one-agent delegation; prove model/provider switching without manual session restart; current E2E ingress acceptance |
| Unified OmniRoute AI Workforce | STRONG_FOUNDATION / INCOMPLETE | broad provider/catalog/routing/fallback foundation and canonical access-mode taxonomy | normalize free/keyless, API, managed session, subscription/coding-plan, web, interactive-human-verification and protected-native contracts without provider-specific coupling |
| Auth Keeper | MATURE_FOUNDATION / QUALIFIED_NONLIVE_EXTENSION | credential/session/account authority; secretless admission; exact binding; qualified non-live provider-bound transport seam | generalize provider-bound execution contract beyond an OpenCode-specific qualification target; finish only lifecycle modes required by the selected workforce |
| Intelligent Multi-Model Orchestration | LIVE_ACCEPTED_FOUNDATION / INCOMPLETE_CONVERGENCE | D18 admission/orchestration foundation, D19 hard-gate/evidence authority, FreeLLMAPI advisory-only integration, rollback/non-drift discipline | provider-neutral preference among survivors, specialist/critique/judge/synthesis/fusion patterns where adopted, and cross-pillar worker delegation acceptance |
| Operations Floor | HISTORICAL_NEEDS_REINTEGRATION | prior provider/workload floor, protected-native presentation and routing/evidence concepts | reconnect to current request-local evidence and worker assignment while remaining observer-only |

## Cross-cutting status

### Provider/access-mode normalization

Canonical access modes remain:

- free/keyless;
- API key;
- managed session;
- subscription/coding-plan;
- web-backed;
- interactive human verification;
- protected native.

The next engineering contract must describe these modes independently of any one provider.

### Auth Keeper provider-bound transport

Private engineering evidence now includes a qualified non-provider P4G endpoint:

- parent Phase 4G candidate: `e8a4f25dd7c5ed7af8301355cac2cb3a28dc8a4a`;
- endpoint candidate: `c750da9aad019120ff7dfeb00f637254d8cedf74`;
- qualification: `PASS_P4G_AUTH_KEEPER_TRANSPORT_ENDPOINT_QUALIFICATION_R3`;
- status: `ENDPOINT_REPAIRED_QUALIFIED_NONLIVE_PROVIDER_CALL_NOT_AUTHORIZED`;
- focused regressions: 197 passed / 0 failed;
- real provider calls during endpoint qualification: zero.

This establishes a reusable security/transport seam:

`opaque connection reference → Auth Keeper-owned credential resolution → bounded single-attempt provider transport → secretless response boundary`

It does **not** establish OpenCode as a selected live provider.

### Protected native and workload isolation

Protected-native/OpenAI capacity and workload isolation remain harder policy gates. They must not be overridden by preference intelligence or provider availability.

Final cross-pillar acceptance remains incomplete.

### Release lane

The immutable upstream `v3.8.51` tag gate remains separate. It blocks final tag-bound release reconciliation only. It does not block the provider-neutral product-convergence work defined here.

## Next bounded engineering phase

The next implementation phase must be **Provider-Neutral Workforce Contract Convergence**, not another provider-specific live qualification.

### Gate A — read-only authority inventory

Inventory exact current source authority for:

- Codex Unified control-plane/catalog/workload-policy artifacts;
- provider/access-mode adapters;
- Auth Keeper connection/admission/transport contracts;
- hard-gate and preference evidence contracts;
- Operations Floor request-local evidence consumers;
- protected-native and workload-isolation enforcement.

No source or runtime mutation.

### Gate B — normalized access-mode contract

Define one provider-neutral contract that represents:

- access mode;
- routing eligibility;
- credential/session ownership;
- anonymous availability;
- execution readiness;
- quota/cooldown/breaker facts;
- context/capability compatibility;
- opaque connection/session reference when required;
- secretless failure/disposition state.

Provider-specific adapters may populate this contract, but they must not redefine routing authority.

### Gate C — provider-neutral execution seam

Refactor or wrap the qualified P4G provider-bound transport so its architectural contract is provider-neutral.

Requirements:

- no provider name is required by the core evaluator;
- provider-specific URL/auth/response handling remains adapter-local;
- Auth Keeper retains credential/session ownership;
- OmniRoute retains selection/fallback/dispatch authority;
- no raw secret crosses Auth Keeper → OmniRoute;
- one-attempt/budget semantics remain enforceable;
- provider-specific live activation remains separately gated.

No real provider call is required to qualify this contract.

### Gate D — synthetic multi-mode qualification

Use deterministic synthetic fixtures/adapters to prove:

- free/keyless path remains credential-free;
- API-key path uses only opaque Auth Keeper references;
- managed-session path does not leak reusable session material;
- subscription/coding-plan semantics remain distinct from API-key semantics;
- interactive-human-verification cannot be silently converted into credential ownership;
- protected-native remains separate;
- hard-gate rejection cannot be reversed by preference;
- fallback cannot bypass auth/workload/protected-native denial.

### Gate E — cross-pillar convergence

After the normalized contract is qualified:

1. bind Codex Unified task/delegation input to OmniRoute;
2. expose provider-neutral worker/evidence state to Operations Floor;
3. add shadow-only provider-neutral preference among hard-gate survivors;
4. qualify cross-pillar behavior without changing live routing;
5. request separate authorization only when a concrete live activation step is justified.

## Explicit non-goals

Do not:

- perform the planned OpenCode P4G real request;
- recharge/enable billing merely to keep a qualification chain moving;
- revive TheOldLLM as a provider-specific project;
- make OpenCode, Auth Keeper, R16.32 or Operations Floor the product goal;
- add live probes merely for scoring;
- expose provider credentials to OmniRoute;
- let Operations Floor become a router;
- bypass workload isolation or protected-native policy;
- merge/deploy/cut over without separate authorization.

## Immediate engineering status

`FIVE_PILLAR_CONVERGENCE_ACTIVE`

`PROVIDER_SPECIFIC_EXECUTION_HOLD=OPENCODE,THEOLDLLM`

`P4G_ENDPOINT=QUALIFIED_NONLIVE_ARCHITECTURE_EVIDENCE`

`REAL_PROVIDER_CALL_BUDGET=0`

`NEXT_PHASE=PROVIDER_NEUTRAL_WORKFORCE_CONTRACT_CONVERGENCE`
