# OmniRoute Fork — Project Documentation Index

Last reviewed: 2026-09-17

This directory contains the canonical fork-specific architecture, engineering, roadmap, current-status, phase-definition, and continuity documents for `Zartharas/OmniRoute`.

For a concise human-readable overview of what has been built, what is live, what is in progress, and what remains, start with:

- [`PROJECT_SHOWCASE.md`](../../PROJECT_SHOWCASE.md)

## Canonical documents

1. [`ARCHITECTURE_SOURCE_OF_TRUTH.md`](ARCHITECTURE_SOURCE_OF_TRUTH.md) — product goal, five pillars, authority boundaries, protected-capacity rules, workload isolation, and intended end-state topology.
2. [`ENGINEERING_SOURCE_OF_TRUTH.md`](ENGINEERING_SOURCE_OF_TRUTH.md) — implementation, qualification, promotion and fail-closed engineering rules.
3. [`MASTER_ROADMAP.md`](MASTER_ROADMAP.md) — long-range sequencing across Codex Unified, OmniRoute workforce, Auth Keeper, intelligent orchestration, Operations Floor and final acceptance.
4. [`CURRENT_STATUS.md`](CURRENT_STATUS.md) — exact latest accepted engineering checkpoint and current live/rollback/development authority.
5. [`R16_32_D19_EMPIRICAL_ORCHESTRATION_EVIDENCE_READOUT.md`](R16_32_D19_EMPIRICAL_ORCHESTRATION_EVIDENCE_READOUT.md) — canonical D19 objective, invariants, evidence gates, mutation boundary, rollback model and authorization boundary.
6. [`HANDOFF_R16_32_D18_AUTH_KEEPER_2026-09-16.md`](HANDOFF_R16_32_D18_AUTH_KEEPER_2026-09-16.md) — detailed D18/Auth Keeper qualification, activation, freeze and rollback continuity.

## Current checkpoint

As of 2026-09-17:

- D18 is the accepted live OmniRoute production baseline.
- D18 is frozen post-activation through composite O1+O2 authority.
- R16.31 remains retained intact as rollback authority.
- Auth Keeper live secretless connection-state integration is accepted.
- Auth Keeper LaunchAgent hardening to `0600` is complete.
- rollback cleanup is not authorized.
- D19 is now canonically defined as **Production-Safe Empirical Orchestration Evidence Readout**.
- D19 definition and non-live development/qualification through S6 are authorized.
- production D19 activation (S7) is not authorized and requires a separate explicit live-cutover decision.
- immediate implementation step: D19-S1 exact accepted-object source census, read-only.

## Supporting checkpoint documents

Files such as `PREACTIVATION_R3_CHECKPOINT_2026-09-17.md` preserve historical phase evidence. They are supporting records, not replacements for `CURRENT_STATUS.md`, the D19 phase definition, or accepted machine/runtime evidence.

## Authority rule

When information conflicts, follow `../../SOURCE_OF_TRUTH.md` and the precedence it defines. Accepted Git objects, tests, build evidence, runtime evidence, activation evidence and freeze evidence remain more specific implementation authority than prose summaries.