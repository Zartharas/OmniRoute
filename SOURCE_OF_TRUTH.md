# OmniRoute Fork Source of Truth

Last reviewed: 2026-09-15

This file defines the authority order for the `Zartharas/OmniRoute` fork.

## Canonical documents

1. [Architecture Source of Truth](docs/project/ARCHITECTURE_SOURCE_OF_TRUTH.md)
2. [Engineering Source of Truth](docs/project/ENGINEERING_SOURCE_OF_TRUTH.md)
3. [Master Roadmap](docs/project/MASTER_ROADMAP.md)
4. [Current Project Status](docs/project/CURRENT_STATUS.md)
5. [Engineering Tracker](docs/project/ENGINEERING_TRACKER.md)
6. [Engineering Failure-Mode Register](docs/project/FAILURE_MODE_REGISTER.md)
7. [Full E2E New-Chat Handoff](docs/project/CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md)

The upstream README/ROADMAP remain upstream context only.

## Current checkpoint

D18 bounded orchestration/evidence transplant is accepted at local R8 authority:

- commit `58452140ffc8122a26a387638f8a38d7d80f5024`
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`
- evidence ZIP SHA-256 `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`

The active next phase is **full end-to-end qualification**, explicitly authorized for non-destructive engineering qualification only. D18 remains passive/unwired. Live activation/cutover is not authorized.

## Current scope

The five-pillar architecture remains the master goal. OpenCode and TheOldLLM are retired from active product scope. Current workload authority remains 10 routed models (6 personal + 4 MTA/enterprise) plus 3 protected-native models (GPT-5.6 Sol, Terra, Luna); protected-native routeability remains none.

## Authority by question

| Question | Authority |
| --- | --- |
| Product/architecture | Architecture Source of Truth |
| Engineering method/non-regression | Engineering Source of Truth |
| Long-range sequence | Master Roadmap |
| Latest checkpoint | Current Project Status + accepted Git/evidence |
| Detailed work/history | Engineering Tracker |
| Known failures | Failure-Mode Register + D18 appendix |
| New-chat continuation | Full E2E New-Chat Handoff |
| Actual implementation | Accepted Git objects/tests/build/runtime evidence |

## Cross-repository authority

The public fork is product/architecture authority. The private `Zartharas/omniroute-auth-keeper` repository is Auth Keeper implementation/release-engineering authority and may not independently redefine routing policy.

## Non-negotiable alignment

R16.x, provider work, Auth Keeper, Operations Floor, Codex Unified, D18, full E2E qualification and later model-intelligence work are subprojects of the same five-pillar product.

Do not resume D19 automatically. Do not infer live-cutover authorization from development qualification.
