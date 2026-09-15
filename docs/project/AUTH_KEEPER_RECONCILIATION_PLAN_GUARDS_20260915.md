# Auth Keeper Reconciliation Plan Guards — 2026-09-15

Status: Durable engineering note for the `Zartharas/OmniRoute` fork only. Do not share upstream unless explicitly authorized.

## R7 exact-plan omission

Candidate R7 intentionally rewrote two stale tests discovered by the R6 full-suite failure:

- `test/r16-17-opencode-live-provider-registration-source.node.test.mjs`
- `test/r16-17-provider-adapter-skeletons.node.test.mjs`

The transforms themselves were correct. R7 then failed before static qualification because its exact expected Auth Keeper changeset omitted the first migrated file even though the actual mutation set contained it. The actual/expected delta was exactly one path:

`test/r16-17-opencode-live-provider-registration-source.node.test.mjs`

Classification:

`HARNESS_ONLY_SOURCE_BACKED_PLAN_OMITTED_KNOWN_MIGRATED_LIVE_REGISTRATION_TEST`

## Prevention rule

A generated reconciliation harness must not maintain its mutation implementation and exact-plan authority as two independent hand-written inventories without a consistency proof.

Before delivery:

1. collect every explicit mutation target produced by the transform;
2. require every migration target to appear in the exact expected changeset;
3. assert the expected changeset count when the source-backed set is frozen;
4. fail before candidate execution if any explicit migration target is absent from the exact-plan authority;
5. continue to fail on any unexpected extra changed file;
6. distinguish invariant-only files from mutation-required files;
7. preserve previous failed-candidate cleanup as a separate transaction guard.

For the R8 successor, the frozen Auth Keeper expected mutation set is 26 files and the three explicit stale-test migrations are mechanically cross-checked against that set:

- `test/r16-17-theoldllm-operator-takedown.node.test.mjs`
- `test/r16-17-opencode-live-provider-registration-source.node.test.mjs`
- `test/r16-17-provider-adapter-skeletons.node.test.mjs`

This guard exists to prevent a correct transform from being rejected solely because bookkeeping failed to acknowledge a file the same harness deliberately rewrote.
