# OmniRoute Fork Source of Truth

Last reviewed: 2026-09-13

This file defines the authority order for the `Zartharas/OmniRoute` fork.

## Canonical documents

For the fork's product goal and architecture, the canonical authority is:

1. [Architecture Source of Truth](docs/project/ARCHITECTURE_SOURCE_OF_TRUTH.md)
2. [Engineering Source of Truth](docs/project/ENGINEERING_SOURCE_OF_TRUTH.md)
3. [Master Roadmap](docs/project/MASTER_ROADMAP.md)

These documents describe the fork-specific system. The upstream OmniRoute README and `ROADMAP.md` remain useful upstream references, but they do **not** define this fork's end goal.

## Authority by question

| Question | Authority |
| --- | --- |
| What are we building? | Architecture Source of Truth |
| What must never regress? | Architecture + Engineering Source of Truth |
| How do we implement and qualify changes? | Engineering Source of Truth |
| What is finished, active, or planned? | Master Roadmap + accepted Git/evidence state |
| What does the software actually do now? | Accepted Git objects, tests, build evidence, and runtime evidence |
| What does upstream OmniRoute plan? | Upstream `README.md` and `ROADMAP.md` |

## Stale-information policy

Chat messages, old branch notes, issue comments, temporary scripts, screenshots, and historical design drafts are not authoritative if they conflict with the canonical documents above.

A decision is not considered retired merely because it disappears from a newer conversation or branch. Retirement/deprecation must be explicit in the Architecture Source of Truth or in an accepted decision recorded there.

When implementation changes the architecture, the architecture and engineering source-of-truth documents must be updated in the same engineering cycle before the change is considered complete.

## Cross-repository authority

The public fork is the canonical product/architecture authority.

The private `Zartharas/omniroute-auth-keeper` repository is the canonical implementation and release-engineering authority for Auth Keeper. It must remain aligned with this fork's architecture and may add private operational detail, but it must not redefine the product goal independently.

## Non-negotiable alignment rule

R16.x phases, provider integrations, Auth Keeper work, Operations Floor work, and Codex Unified work are subprojects of the same product goal. No single subproject is the product by itself.
