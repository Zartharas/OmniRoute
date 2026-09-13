# Architecture Source of Truth

Last reviewed: 2026-09-13
Status: Canonical for the `Zartharas/OmniRoute` fork

## 1. Product goal

Build one Codex-centered AI engineering agent that can transparently marshal a heterogeneous fleet of models/providers through OmniRoute, with Auth Keeper supplying secure browser/session/account access, workload-aware and quota/health/capability-aware orchestration choosing which AI does each part of the work, protected OpenAI/Codex capacity reserved appropriately, and a Dunder-Mifflin-inspired Operations Floor showing the AI organization working in real time.

The office inspiration is an operations metaphor only. It represents workers, queues, desks, status, routing, failures, recovery and operator attention. The product must not depend on copyrighted characters or assets.

## 2. Five product pillars

### Pillar 1 — Codex Unified Agent

The user works through one Codex-centered session/interface rather than manually switching among provider-specific tools for each task.

The unified agent should be able to consume the combined model fleet behind OmniRoute without requiring a restart just to change which model/provider contributes to the work.

Canonical host-side artifacts historically used for this plane include:

- `~/.codex-unified/config.toml`
- `~/.codex-unified/model-catalog.json`
- `~/.codex-unified/workload-policy.json`
- `~/Library/Application Support/mer-gateway/codex-unified-router/router.py`

Those host artifacts are implementation state, not a substitute for repository architecture documents.

### Pillar 2 — Unified OmniRoute AI workforce

OmniRoute is the routing and orchestration authority for a heterogeneous fleet that can include, where supported and policy-allowed:

- free and keyless providers;
- API-key providers;
- subscription/coding-plan providers;
- managed browser/session providers;
- IBM/enterprise models;
- web-backed providers;
- interactive-human-verification providers;
- protected native/OpenAI capacity.

OpenCode is one provider/access lane, not the end goal of the project.

Free/keyless provider behavior must remain free/keyless. Adding managed authentication must not force credentials onto an anonymous path that already works.

### Pillar 3 — Auth Keeper

Auth Keeper is the credential/session/account-lifecycle authority. OmniRoute remains the routing/provider authority.

Auth Keeper responsibilities include, where the provider mode requires them:

- isolated account/browser profiles;
- credential/session ownership;
- refresh/re-authentication workflows;
- exact provider/account/connection binding;
- eligibility and recovery state;
- safe handoff to OmniRoute transport;
- secret isolation and non-leaking operational state.

The routing core must not become the long-term owner of browser credentials or session secrets.

A `connectionId` is an opaque routing/binding identifier, not the credential itself.

### Pillar 4 — Intelligent multi-model orchestration

OmniRoute should make conservative, provider-neutral decisions about which eligible model/account should contribute to a workload.

The intended decision hierarchy is:

1. explicit request/pinning where contractually applicable;
2. Auth Keeper credential/admission eligibility;
3. explicit exclusion and workload-policy restrictions;
4. capability/context compatibility;
5. breaker/cooldown/known-unavailable state;
6. provider-neutral preference intelligence among survivors only;
7. existing dispatch/fallback semantics unless separately proven and activated.

Preference intelligence must never reintroduce a candidate rejected by a harder gate.

The system may use multi-model orchestration patterns such as Fusion, Pipeline, critique, judging, synthesis and specialist review, but tool execution should remain controlled. Multiple models may reason or critique while a designated acting model owns repository/tool mutation unless a later architecture decision explicitly authorizes a different execution model.

R16.32 belongs under this pillar. It is a subproject that builds provider-neutral candidate facts, deterministic disposition, computational shadowing, observability, compatibility provenance and later preference intelligence. R16.32 is not the product by itself.

### Pillar 5 — Operations Floor

Operations Floor is the visual/operator representation of the AI workforce.

It should make the system understandable in real time by exposing, without leaking secrets:

- which worker/model/provider is active, idle, waiting, blocked or recovering;
- primary versus fallback routing;
- provider/account health;
- auth/re-auth state;
- quota/cooldown/availability state;
- compression/optimization state where applicable;
- request/workload assignments;
- operator-attention items;
- evidence supporting routing/fallback decisions;
- protected-native/OpenAI preservation state;
- personal versus isolated enterprise/MTA workload visibility where applicable.

Historical implementation branches include:

- `feat/operations-floor-openai-preservation`
- `feat/operations-floor-protected-native`

Those branches are architectural evidence and implementation history. Their ideas are not considered retired merely because they are absent from the current upstream release branch.

## 3. Unified end-state topology

```text
                           USER
                            |
                            v
                 +---------------------+
                 |   CODEX UNIFIED     |
                 |     AI AGENT        |
                 +----------+----------+
                            |
                            v
                 +---------------------+
                 |      OMNIROUTE      |
                 | routing/orchestration|
                 | capability/quota     |
                 | health/fallback      |
                 | workload policy      |
                 +-----+-----------+---+
                       |           |
                       |           v
                       |   +----------------+
                       |   |  AUTH KEEPER   |
                       |   | sessions/auth  |
                       |   | reauth/recovery|
                       |   +--------+-------+
                       |            |
                       +------------+
                            |
                            v
          +-------------------------------------------+
          |              AI WORKFORCE                 |
          | free | API | subscription | web | IBM    |
          | keyless | managed | human-verification   |
          | protected OpenAI/Codex capacity           |
          +--------------------+----------------------+
                               |
                               v
                 +----------------------------+
                 |      OPERATIONS FLOOR      |
                 | live office / evidence /   |
                 | health / routing / attention|
                 +----------------------------+
```

Operations Floor observes and explains the organization. It does not become a competing router.

## 4. Provider/access-mode model

Credential ownership and upstream access are separate concepts.

A provider can require one access mode without implying that OmniRoute or Auth Keeper owns a credential.

Examples of supported architectural distinctions include:

- anonymous/keyless access;
- OmniRoute-optional credentialed access;
- external credential/session ownership;
- interactive human verification;
- protected native access.

Interactive-human-verification providers are not automatically considered retired. If a lane such as TheOldLLM requires human verification and owns no reusable credential, it remains a distinct access mode unless this document explicitly records a later deprecation decision.

## 5. Protected OpenAI/Codex capacity

Protected native/OpenAI capacity is intentionally distinct from the normal routed fleet when policy requires preservation.

Historical Operations Floor work included a separate protected-native presentation for GPT-5.6 Sol, Terra and Luna while preserving the routed-model boundary.

The architecture goal is to avoid burning premium/protected capacity on every routine task when other eligible workers can do the job, while retaining protected capacity for harder work, native use and final fallback according to policy.

No component may invent token savings or preservation claims without evidence.

## 6. Workload isolation

Personal and enterprise/MTA work must remain distinguishable where policy requires it.

A model/provider that is allowed for personal workloads is not automatically allowed for an isolated enterprise/MTA workload. Workload policy is a harder gate than preference scoring.

Cross-lane routing must fail closed unless explicitly permitted by policy.

## 7. Non-negotiable boundaries

The following are architecture invariants unless this document is deliberately revised:

- OmniRoute remains the routing/orchestration authority.
- Auth Keeper remains the credential/session lifecycle authority.
- Operations Floor remains an observability/operator plane, not a router.
- Codex Unified remains the intended single user-facing engineering agent/workspace.
- free/keyless operation must not be broken by managed-auth support;
- hard-gate rejection cannot be undone by preference intelligence;
- no extra provider/model probes are added merely for scoring when existing evidence is available;
- no extra Auth Keeper fetch is added merely for scoring when request-local evidence is available;
- secret material must not become routing telemetry;
- protected native/OpenAI lanes remain separate where policy requires it;
- workload isolation remains authoritative;
- upstream OmniRoute improvements should continue to be incorporated rather than abandoning the upstream project architecture.

## 8. Relationship to upstream OmniRoute

This repository is a fork of OmniRoute and should continue to absorb compatible upstream improvements.

The upstream README and upstream `ROADMAP.md` describe the upstream project's product and release direction. They are useful references but do not supersede this fork's five-pillar goal.

Fork-specific architecture should be implemented in a way that minimizes unnecessary divergence and remains compatible with upstream modularization where practical.

## 9. What is not the product goal

The following statements are explicitly stale or incomplete if presented as the whole goal:

- "R16.32 is the product."
- "Auth Keeper is the product."
- "OpenCode is the product."
- "Operations Floor is only a dashboard."
- "The project is only a multi-provider proxy."
- "TheOldLLM/human-verification is retired because it is absent from a newer branch."
- "Codex must manually switch models/providers for every task."

Each is either a subproject, provider lane, operator surface or implementation detail within the larger architecture.

## 10. Change control

Any proposal that changes the five pillars, routing authority, Auth Keeper authority, protected-native policy, workload isolation, single-agent goal or Operations Floor role requires an explicit update to this document.

A chat message, temporary branch, issue comment or omitted feature is not sufficient to redefine the architecture.
