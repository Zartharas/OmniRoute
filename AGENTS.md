# OmniRoute Agent Guide

This file is the mandatory entry point for AI/coding agents working in the `Zartharas/OmniRoute` fork.

## Read these canonical documents first

1. [Fork Source of Truth](SOURCE_OF_TRUTH.md)
2. [Architecture Source of Truth](docs/project/ARCHITECTURE_SOURCE_OF_TRUTH.md)
3. [Engineering Source of Truth](docs/project/ENGINEERING_SOURCE_OF_TRUTH.md)
4. [Master Roadmap](docs/project/MASTER_ROADMAP.md)

Those documents are authoritative for the fork's product goal, architecture, engineering method and roadmap.

The historical/upstream agent guide has been preserved at [Upstream Agent Guide](docs/upstream/AGENTS_UPSTREAM.md). Read it for repository-local commands, code conventions, quality gates, file placement, security rules and upstream workflow details. Where it conflicts with the canonical fork documents above about product intent or architecture authority, the canonical fork documents win.

## Five-pillar project goal

Do not infer the project from only the currently active branch or R16.x phase. The product has five pillars:

1. **Codex Unified Agent** — one user-facing engineering agent/session.
2. **Unified OmniRoute AI Workforce** — free, API, subscription, web, IBM/enterprise, managed-auth and other policy-allowed workers behind OmniRoute.
3. **Auth Keeper** — credential/session/account lifecycle authority.
4. **Intelligent Multi-Model Orchestration** — workload, capability, quota, health, fallback, Fusion/Pipeline and provider-neutral preference intelligence.
5. **Operations Floor** — the Dunder-Mifflin-inspired live office/operator plane showing the AI workforce, routing, auth, fallback, quota, evidence and attention state.

R16.32 is a subproject under Pillar 4. It is not the overall product.

OpenCode is one provider/access lane. It is not the overall product.

Auth Keeper is one subsystem. It is not the overall product.

Operations Floor is a first-class product pillar, not a disposable dashboard experiment.

Interactive-human-verification access is not considered retired merely because it is absent from the current branch. Deprecation must be explicit in the Architecture Source of Truth.

## Authority boundaries

- OmniRoute owns routing/provider/orchestration decisions.
- Auth Keeper owns credential/session/account lifecycle for managed-auth modes.
- Operations Floor observes/explains/operates within those boundaries; it is not a router.
- Codex Unified is the intended single user-facing engineering agent/workspace.
- Protected native/OpenAI capacity remains separate where policy requires preservation.
- Workload isolation remains a harder gate than preference intelligence.

## Engineering behavior

Use evidence-first, fail-closed engineering.

- Inspect exact accepted Git/source/type/function shapes before mutation.
- Prefer one consolidated, prevalidated script per phase where feasible.
- Validate embedded Bash/Python/Node/TypeScript before delivery.
- Use AST/compiler/runtime semantic guards instead of brittle global text counts for semantic assertions.
- Patch exact declaration/function scopes when source contains repeated text shapes.
- Do not weaken safety guards merely to make a script pass.
- Do not add extra Auth Keeper/provider/model/credential acquisition merely for scoring when request-local evidence already exists.
- Keep routing, Auth Keeper, Operations Floor and Codex Unified authority boundaries intact.
- Do not push, deploy or perform live cutover solely because a development phase passed.
- Update the canonical documents when architecture, authority, roadmap or permanent engineering rules change.

## Upstream relationship

This fork should continue to ingest compatible upstream OmniRoute improvements. Upstream `README.md`, upstream `ROADMAP.md`, and the archived upstream agent guide describe upstream/project-local behavior, but they do not supersede the fork-specific canonical documents above.

## Stale information

Chats, temporary scripts, old branch notes, screenshots, issue comments and historical design drafts are supporting evidence only. If they conflict with the canonical documents, treat them as stale until explicitly reconciled.
