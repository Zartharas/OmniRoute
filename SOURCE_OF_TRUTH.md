# OmniRoute Fork Source of Truth

Last reviewed: 2026-09-15

Canonical docs:

1. `docs/project/ARCHITECTURE_SOURCE_OF_TRUTH.md`
2. `docs/project/ENGINEERING_SOURCE_OF_TRUTH.md`
3. `docs/project/MASTER_ROADMAP.md`
4. `docs/project/CURRENT_STATUS.md`
5. `docs/project/ENGINEERING_TRACKER.md`
6. `docs/project/FAILURE_MODE_REGISTER.md`
7. `docs/project/CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md`

Accepted Git/test/build/runtime evidence remains implementation authority when more specific than docs.

Current checkpoint: D18 accepted at local R8 commit `58452140ffc8122a26a387638f8a38d7d80f5024`, tree `2c4ae9cd707b38130333581e0a9e1b7af9e6745d`, evidence `89d1377c4ced9611516d076a8ef1126d1f78b472925dfe63e80f97df42826005`.

Active phase: full end-to-end qualification, explicitly authorized for non-destructive engineering qualification only. D18 remains passive/unwired. Live activation/cutover is not authorized. Do not resume D19 automatically.

Scope: five-pillar architecture unchanged; OpenCode/TheOldLLM retired; workload authority 10 routed (6 personal + 4 MTA) plus GPT-5.6 Sol/Terra/Luna protected-native/non-routeable.

Public fork is product/architecture authority. Private `Zartharas/omniroute-auth-keeper` is Auth Keeper implementation/release authority and may not redefine routing policy.

For a new chat, read `docs/project/CHAT_HANDOFF_20260915_FULL_E2E_QUALIFICATION.md` first. Chat history is not a substitute for repo state.
