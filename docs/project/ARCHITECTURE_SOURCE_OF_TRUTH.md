# Architecture Source of Truth

Last reviewed: 2026-09-15
Status: Canonical for the `Zartharas/OmniRoute` fork

## 1. Product goal

Build one Codex-centered AI engineering agent that can transparently marshal a heterogeneous AI workforce through OmniRoute, with Auth Keeper owning credential/session/account lifecycle, provider-neutral orchestration deciding which eligible worker contributes, protected OpenAI/Codex capacity preserved separately where policy requires it, and Operations Floor making the organization observable without becoming a competing router.

The office metaphor is an operations metaphor only: workers, queues, desks, routing, failures, recovery and operator attention. The product must not depend on copyrighted characters or assets.

## 2. Five product pillars

The product architecture remains five pillars:

1. **Codex Unified Agent** — one user-facing engineering agent/workspace.
2. **Unified OmniRoute AI Workforce** — OmniRoute owns routing/provider orchestration across the eligible fleet.
3. **Auth Keeper** — credential/session/account lifecycle authority.
4. **Intelligent Multi-Model Orchestration** — conservative provider-neutral hard gates, shadow evidence, later preference intelligence among survivors only.
5. **Operations Floor** — observability/operator plane for workers, routing, auth, health, evidence and attention.

The unified topology remains:

```text
USER
  |
  v
CODEX UNIFIED
  |
  v
OMNIROUTE --------------------> AUTH KEEPER
  |                               |
  +-------------------------------+
  |
  v
AI WORKFORCE
  |
  v
OPERATIONS FLOOR
```

Operations Floor observes and explains the organization. It does not become a second router.

## 3. Current provider/workload authority

The current accepted workload authority is **10 routed models plus 3 protected-native ChatGPT models**:

- routed: 10 total;
- personal lane: 6;
- isolated MTA/enterprise lane: 4;
- protected-native: GPT-5.6 Sol, GPT-5.6 Terra, GPT-5.6 Luna.

Protected-native Sol/Terra/Luna are intentionally **not members of the normal routed fleet**. Their presence in Operations Floor or policy metadata must not make them routeable.

Personal and MTA/enterprise lanes remain distinguishable. Cross-lane routing fails closed unless explicitly allowed by policy.

## 4. Active provider scope and retired lanes

OpenCode and TheOldLLM are **retired from active OmniRoute product scope** as of this review.

They must not be reintroduced into active:

- provider/model routing tables;
- workload policy;
- bootstrap or registry authority;
- Operations Floor workers;
- orchestration/fallback candidates;
- Auth Keeper activation;
- product roadmap commitments.

Historical references, tombstones, negative regression tests, changelog entries and unreachable dormant source may remain when useful for provenance. Such references do not reactivate a provider.

This explicit retirement supersedes earlier wording that treated OpenCode or TheOldLLM/human-verification as currently active product lanes.

The architecture may still support access-mode concepts such as anonymous/keyless, API credential, managed external session, subscription/coding-plan, web-backed access, interactive human verification and protected-native access. An access-mode concept does not imply that every historical provider using that mode remains active.

## 5. Authority boundaries

### OmniRoute

OmniRoute remains the routing/orchestration authority. It owns candidate selection, workload policy, provider capability/health/quota/fallback behavior and later preference intelligence.

### Auth Keeper

Auth Keeper remains the credential/session/account-lifecycle authority. It owns isolated profiles, exact account/connection binding, re-authentication/recovery and secret isolation. `connectionId` is an opaque binding/routing identifier, not a credential.

### Codex Unified

Codex Unified remains the single intended user-facing engineering agent. Multiple models may reason, critique, judge or synthesize behind it, while repository/tool mutation remains under controlled acting-model ownership unless a later reviewed architecture explicitly changes that rule.

### Operations Floor

Operations Floor remains an operator/observability surface. It may show worker state, routing/fallback, auth/re-auth, quota/cooldown, workload assignment, protected-native preservation, evidence and operator-attention items, but it may not bypass OmniRoute or Auth Keeper authority.

## 6. Intelligent orchestration hard-gate order

Unless explicitly revised, orchestration respects this precedence:

1. explicit request/pinning where contractually applicable;
2. Auth Keeper/admission eligibility;
3. exclusion and workload-policy restrictions;
4. capability/context compatibility;
5. breaker/cooldown/known-unavailable state;
6. provider-neutral preference intelligence among survivors only;
7. existing dispatch/fallback semantics unless separately qualified and activated.

Preference intelligence must never re-admit a candidate rejected by a harder gate.

R16.32 is an implementation program under this pillar, not the product itself.

## 7. Current integration state

The architecture remains unchanged while implementation has advanced materially:

- Codex Unified repository reintegration is complete for the current integration lineage;
- Auth Keeper final contract reconciliation is complete at R11 in the private repository;
- Operations Floor selective reintegration is complete and qualified in the current local integration lineage;
- production build policy now defaults to Webpack, with Turbopack retained only as explicit opt-in while the recurring Turbopack invariant failure remains unresolved upstream/toolchain-side;
- D18 bounded production-evidence/orchestration foundation work is the current phase;
- D18 must remain passive/unwired during transplant/qualification;
- full end-to-end qualification follows D18 acceptance;
- live activation/cutover remains a later explicit gate.

Exact current authorities and phase status are recorded in [Current Project Status](CURRENT_STATUS.md) and [Engineering Tracker](ENGINEERING_TRACKER.md).

## 8. D18 bounded-foundation boundary

D18 is an orchestration/evidence foundation, not permission to import arbitrary historical application reachability.

The accepted engineering direction is bounded:

- restore only the source-backed D18 contract required for the passive evidence/readout foundation;
- preserve newer current implementations when historical dependencies already exist but differ;
- do not resurrect retired providers merely because they appear in a historical transitive import graph;
- do not introduce provider calls, credential acquisition, DB writes or production routing activation as part of the passive transplant;
- require zero external production consumers of the bounded readout until a later activation decision.

## 9. Build authority

For current production qualification:

- `npm run build` defaults to **Webpack**;
- `OMNIROUTE_USE_TURBOPACK=0` remains Webpack for backward compatibility;
- `OMNIROUTE_USE_TURBOPACK=1` is explicit Turbopack opt-in/testing only.

This is a build qualification policy, not a permanent claim that Turbopack can never be used. Turbopack may be re-evaluated after source/toolchain changes with evidence.

## 10. Upstream relationship

This repository remains a fork of upstream OmniRoute and should continue to absorb compatible upstream improvements. Fork-specific architecture should be expressed as bounded extensions/adaptations where practical rather than unnecessary wholesale rewrites.

Upstream README/ROADMAP describe upstream direction but do not supersede this five-pillar architecture.

## 11. Model-intelligence enrichment

A future Unified Model Intelligence Registry may enrich orchestration and Operations Floor with provenance-labeled model architecture metadata. External architecture or benchmark data is soft enrichment only and may not override provider/account availability, official provider/API capability, verified OmniRoute catalog facts, request-local compatibility/health/quota evidence, workload policy, Auth Keeper denial, breaker/cooldown state or explicit pinning.

## 12. Non-negotiable invariants

- OmniRoute remains routing/orchestration authority.
- Auth Keeper remains credential/session lifecycle authority.
- Operations Floor remains observability/operator plane, not router.
- Codex Unified remains the intended single user-facing engineering agent.
- free/keyless operation must not be broken by managed-auth support.
- hard-gate rejection cannot be undone by soft preference.
- protected-native Sol/Terra/Luna remain separate from the normal routed fleet.
- workload isolation remains authoritative.
- OpenCode/TheOldLLM remain retired from active product scope unless this document is explicitly revised.
- secret material must not become routing telemetry.
- no extra provider/model/Auth Keeper probes are added merely for scoring when existing request-local evidence is available.
- upstream-compatible improvement remains a continuing goal.

## 13. Change control

Any proposal that changes the five pillars, routing authority, Auth Keeper authority, active-provider retirement status, protected-native policy, workload isolation, single-agent goal, Operations Floor role, D18 passive boundary or model-intelligence evidence precedence requires an explicit update to this document.

A chat message, temporary script, branch omission or historical comment is not sufficient to redefine the architecture.
