# OmniRoute Fork Source of Truth

Last reviewed: 2026-09-15

This file defines the authority order for the `Zartharas/OmniRoute` fork.

## Canonical documents

For the fork's product goal, architecture, engineering method and current checkpoint, the canonical authority is:

1. [Architecture Source of Truth](docs/project/ARCHITECTURE_SOURCE_OF_TRUTH.md)
2. [Engineering Source of Truth](docs/project/ENGINEERING_SOURCE_OF_TRUTH.md)
3. [Master Roadmap](docs/project/MASTER_ROADMAP.md)
4. [Current Project Status](docs/project/CURRENT_STATUS.md)

Supporting durable project-control documents are:

5. [Engineering Tracker](docs/project/ENGINEERING_TRACKER.md) — completed/current/pending engineering work and exact accepted authorities.
6. [Engineering Failure-Mode Register](docs/project/FAILURE_MODE_REGISTER.md) — permanent harness, authority, build and transplant lessons.
7. [Full E2E New-Chat Handoff](docs/project/CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md) — exact continuation checkpoint for a new engineering conversation, including accepted R8 authority, safety boundaries and immediate next action.

The upstream OmniRoute README and `ROADMAP.md` remain useful upstream references, but they do **not** define this fork's end goal.

## Authority by question

| Question | Authority |
| --- | --- |
| What are we building? | Architecture Source of Truth |
| What must never regress? | Architecture + Engineering Source of Truth |
| How do we implement and qualify changes? | Engineering Source of Truth |
| What is the long-range implementation plan? | Master Roadmap |
| What is the latest accepted checkpoint and next phase? | Current Project Status + accepted Git/evidence state |
| What work has completed, failed safely, or remains pending? | Engineering Tracker |
| What known engineering failures must not be rediscovered? | Failure-Mode Register + D18 appendix |
| How should a new chat resume the current work? | Full E2E New-Chat Handoff |
| What does the software actually do now? | Accepted Git objects, tests, build evidence and runtime evidence |
| What does upstream OmniRoute plan? | Upstream `README.md` and `ROADMAP.md` |

The Current Project Status, Engineering Tracker and chat handoff are subordinate to accepted Git/test/build/runtime evidence when a more specific accepted artifact exists.

## Current accepted checkpoint

D18 bounded orchestration/evidence transplant is accepted at local R8 authority:

- commit `58452140ffc8122a26a387638f8a38d7d80f5024`;
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`;
- evidence ZIP SHA-256 `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`.

The active next phase is **full end-to-end qualification**, and the user explicitly authorized the non-destructive engineering qualification phase. D18 remains passive/unwired. Live activation/cutover is not authorized.

## Current scope clarification

The five-pillar architecture remains the master product goal. OpenCode and TheOldLLM are retired from active product scope unless the Architecture Source of Truth is explicitly revised. Historical references, tombstones and negative tests do not by themselves reactivate a provider.

Current workload authority remains 10 routed models (6 personal + 4 MTA/enterprise) plus 3 protected-native models (GPT-5.6 Sol, Terra, Luna). Protected-native models remain non-routeable in the normal fleet.

## Stale-information policy

Chat messages, old branch notes, issue comments, temporary scripts, screenshots and historical design drafts are not authoritative if they conflict with the canonical documents above.

A decision is not considered changed merely because it disappears from a newer conversation or branch. Retirement/deprecation or reactivation must be explicit in canonical architecture/status documentation or accepted implementation authority.

When implementation changes architecture, engineering invariants, roadmap status, provider scope or the accepted checkpoint, the relevant canonical documents, tracker and current handoff must be updated in the same engineering cycle before the change is considered documentation-complete.

## Cross-repository authority

The public fork is the canonical product/architecture authority.

The private `Zartharas/omniroute-auth-keeper` repository is the canonical implementation and release-engineering authority for Auth Keeper. It may add private operational detail but must remain aligned with public architecture and may not independently redefine routing policy.

## Non-negotiable alignment rule

R16.x phases, provider integrations, Auth Keeper work, Operations Floor work, Codex Unified work, D18 orchestration/evidence work, full E2E qualification and external model-intelligence enrichment are subprojects of the same five-pillar goal. No single subproject is the product by itself.

Do not resume D19 automatically. Do not infer live-cutover authorization from successful development qualification.
