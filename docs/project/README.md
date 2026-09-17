# OmniRoute Fork — Project Documentation Index

Last reviewed: 2026-09-17

This directory contains the canonical fork-specific architecture, engineering, roadmap, current-status, and continuity documents for `Zartharas/OmniRoute`.

For a concise human-readable overview of what has been built, what is live, what is in progress, and what remains, start with:

- [`PROJECT_SHOWCASE.md`](../../PROJECT_SHOWCASE.md)

## Canonical documents

1. [`ARCHITECTURE_SOURCE_OF_TRUTH.md`](ARCHITECTURE_SOURCE_OF_TRUTH.md) — what the product is, the five pillars, authority boundaries, protected-capacity rules, workload isolation, and the intended end-state topology.
2. [`ENGINEERING_SOURCE_OF_TRUTH.md`](ENGINEERING_SOURCE_OF_TRUTH.md) — how source/runtime changes are implemented, qualified, promoted, and kept fail-closed.
3. [`MASTER_ROADMAP.md`](MASTER_ROADMAP.md) — long-range sequencing across Codex Unified, OmniRoute workforce, Auth Keeper, intelligent orchestration, Operations Floor, and final acceptance.
4. [`CURRENT_STATUS.md`](CURRENT_STATUS.md) — exact latest accepted engineering checkpoint and current live/rollback authority.
5. [`HANDOFF_R16_32_D18_AUTH_KEEPER_2026-09-16.md`](HANDOFF_R16_32_D18_AUTH_KEEPER_2026-09-16.md) — detailed R16.32/D18/Auth Keeper continuity, accepted evidence lineage, live activation, and rollback state.

## Current checkpoint

As of 2026-09-17:

- D18 is the accepted live OmniRoute production baseline.
- D18 is frozen post-activation through the accepted composite O1+O2 checkpoint.
- R16.31 remains retained intact as rollback authority.
- Auth Keeper live secretless connection-state integration is accepted.
- Auth Keeper LaunchAgent hardening to `0600` is complete.
- rollback cleanup is not authorized.
- D19 does not yet have an authoritative scope and must not be invented or started implicitly.

## Supporting checkpoint documents

Files such as `PREACTIVATION_R3_CHECKPOINT_2026-09-17.md` preserve historical phase evidence. They are supporting records, not a replacement for `CURRENT_STATUS.md` or the accepted runtime evidence.

## Authority rule

When information conflicts, follow `../../SOURCE_OF_TRUTH.md` and the precedence it defines. Accepted Git objects, tests, build evidence, runtime evidence, activation evidence, and freeze evidence remain more specific implementation authority than prose summaries.