# OmniRoute Fork Source of Truth

Last reviewed: 2026-09-17

This file defines the authority order for the `Zartharas/OmniRoute` fork.

## Start here

For a human-readable view of what has been built, what is live now, what is currently being worked on, and what remains to complete the original five-pillar goal, read:

- [Project Showcase and Progress](PROJECT_SHOWCASE.md)
- [Project Documentation Index](docs/project/README.md)

The showcase is a presentation summary. It is intentionally subordinate to the canonical documents and accepted Git/test/build/runtime evidence below.

## Canonical documents

For the fork's product goal, architecture, engineering method and current checkpoint, the canonical authority is:

1. [Architecture Source of Truth](docs/project/ARCHITECTURE_SOURCE_OF_TRUTH.md)
2. [Engineering Source of Truth](docs/project/ENGINEERING_SOURCE_OF_TRUTH.md)
3. [Master Roadmap](docs/project/MASTER_ROADMAP.md)
4. [Current Project Status](docs/project/CURRENT_STATUS.md)
5. [R16.32 D19 — Production-Safe Empirical Orchestration Evidence Readout](docs/project/R16_32_D19_EMPIRICAL_ORCHESTRATION_EVIDENCE_READOUT.md) for the active D19 phase contract

These documents describe the fork-specific system. The upstream OmniRoute README and `ROADMAP.md` remain useful upstream references, but they do **not** define this fork's end goal.

## Current accepted checkpoint and active phase

As of 2026-09-17, D18 is the accepted live OmniRoute baseline and is frozen post-activation through composite O1+O2 authority. R16.31 remains retained intact as rollback authority. Auth Keeper live secretless connection-state integration is accepted and its LaunchAgent plist is hardened to `0600`.

R16.32 D19 is now canonically defined as **Production-Safe Empirical Orchestration Evidence Readout**. D19 definition and non-live development/qualification through S6 are authorized. D19 production activation (S7) is **not** authorized by that development authorization and requires a separate explicit live-cutover decision.

The exact current live identifiers, rollback state, evidence lineage, D19 scope, guardrails, and continuation boundary are recorded in [Current Project Status](docs/project/CURRENT_STATUS.md) and the D19 phase definition.

## Authority by question

| Question | Authority |
| --- | --- |
| What are we building? | Architecture Source of Truth |
| What must never regress? | Architecture + Engineering Source of Truth |
| How do we implement and qualify changes? | Engineering Source of Truth |
| What is the long-range implementation plan? | Master Roadmap |
| What is the latest accepted checkpoint and active phase? | Current Project Status + D19 phase definition + accepted Git/evidence state |
| What has been accomplished and what remains? | Project Showcase, constrained by canonical docs/evidence |
| What does the software actually do now? | Accepted Git objects, tests, build evidence, runtime evidence, activation evidence and freeze evidence |
| What does upstream OmniRoute plan? | Upstream `README.md` and `ROADMAP.md` |

Current Project Status and phase documents are deliberately subordinate to accepted Git/test/build/runtime evidence when a more specific accepted artifact exists. They summarize authority; they do not replace machine evidence.

## Stale-information policy

Chat messages, old branch notes, issue comments, temporary scripts, screenshots, and historical design drafts are not authoritative if they conflict with the canonical documents above.

A decision is not considered retired merely because it disappears from a newer conversation or branch. Retirement/deprecation must be explicit in the Architecture Source of Truth or in an accepted canonical decision.

Historical statements that D18 is not live are superseded by accepted A1 production activation and composite O1+O2 freeze. Historical statements that D19 is undefined or unauthorized are superseded by the canonical D19 phase definition and the 2026-09-17 development authorization; they remain correct only with respect to **live D19 promotion**, which is still not authorized.

When implementation changes architecture, engineering invariants, roadmap status, accepted project checkpoint or phase authorization, the relevant canonical documents must be updated in the same engineering cycle before the change is considered complete.

## Cross-repository authority

The public fork is the canonical product/architecture/routing authority.

The private `Zartharas/omniroute-auth-keeper` repository is the canonical implementation and release-engineering authority for Auth Keeper. It must remain aligned with this fork's architecture and may add private operational detail, but it must not redefine the product goal or D19 routing/evidence semantics independently.

## Non-negotiable alignment rule

R16.x phases, provider integrations, Auth Keeper work, Operations Floor work, Codex Unified work, and external model-intelligence enrichment are subprojects of the same product goal. No single subproject is the product by itself.