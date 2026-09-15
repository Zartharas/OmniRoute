# OmniRoute Fork Source of Truth

Last reviewed: 2026-09-15

## Canonical documents

1. [Architecture Source of Truth](docs/project/ARCHITECTURE_SOURCE_OF_TRUTH.md)
2. [Engineering Source of Truth](docs/project/ENGINEERING_SOURCE_OF_TRUTH.md)
3. [Master Roadmap](docs/project/MASTER_ROADMAP.md)
4. [Current Project Status](docs/project/CURRENT_STATUS.md)
5. [Engineering Tracker](docs/project/ENGINEERING_TRACKER.md)
6. [Engineering Failure-Mode Register](docs/project/FAILURE_MODE_REGISTER.md)
7. [Full E2E New-Chat Handoff](docs/project/CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md)

Accepted Git/test/build/runtime evidence remains implementation reality when more specific than documentation.

## Current checkpoint

D18 is accepted at local R8 authority:

- commit `58452140ffc8122a26a387638f8a38d7d80f5024`
- tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`
- evidence `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`

Active next phase: **full end-to-end qualification**, explicitly authorized for non-destructive engineering qualification only.

D18 remains passive/unwired. Live activation/cutover is not authorized. Do not resume D19 automatically.

## Current scope

Five-pillar architecture remains authoritative. OpenCode and TheOldLLM are retired from active scope. Workload authority remains 10 routed models (6 personal + 4 MTA/enterprise) plus GPT-5.6 Sol/Terra/Luna as 3 protected-native/non-routeable models.

## Cross-repository authority

The public fork is product/architecture authority. The private `Zartharas/omniroute-auth-keeper` repository is Auth Keeper implementation/release-engineering authority and may not redefine routing policy independently.

## New-chat rule

A new conversation should read the Full E2E New-Chat Handoff first, then the canonical documents above. Chat history is not a substitute for repo state.
