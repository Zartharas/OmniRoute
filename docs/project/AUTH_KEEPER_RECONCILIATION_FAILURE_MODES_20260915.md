# Auth Keeper Reconciliation Failure Modes — 2026-09-15

Status: Durable engineering appendix for the `Zartharas/OmniRoute` fork only.

This appendix records additional source-shape and reachability failures discovered while reconciling Auth Keeper against the accepted Codex Unified authority. These are prevention rules for future fork engineering. They are not upstream contribution material unless explicitly authorized.

## 1. Wire identity must be source-backed

Observed failure: a reconciliation harness required `accountId` on the OmniRoute/Auth Keeper wire request even though the actual contract is `providerId + connectionId`, with account identity resolved server-side through the unique connection binding.

Prevention:

- derive required wire fields from the exact accepted contract;
- distinguish caller-supplied identity from server-resolved identity;
- prove uniqueness and provider mismatch guards instead of inventing convenience fields.

## 2. Route identity extraction must be structural

Observed failure: a regex counted nine Codex routes because the first `ROUTES` dictionary key appeared on the same line as the assignment.

Prevention:

- use AST extraction for Python dictionaries and other structural source authority;
- do not make semantic counts depend on pretty-print/newline layout.

## 3. Test transforms must not depend on display titles

Observed failure: a candidate stopped because it expected the exact historical test title `TheOldLLM requires managed same-browser-context policy`.

Prevention:

- identify tests by semantic body/contract behavior where transformation is unavoidable;
- exact human-readable test names are not stable source authority;
- after a semantic rewrite, prove that the old positive behavior is absent.

## 4. Retired-provider checks must distinguish executable authority from history

Observed failure: a guard rejected any textual occurrence of a retired provider name in a transport source file even when the executable provider policy had already been emptied.

Prevention:

- block retired identities in executable policy tables, registries, bootstrap calls and active imports;
- allow historical comments, tombstones and negative regression assertions;
- use bounded token matching so short aliases cannot accidentally match unrelated identifiers.

## 5. Removing HTTP routes is not sufficient retirement

Observed failure: direct OpenCode HTTP ingress and runtime bootstrap were removed, but the active module graph still reached `opencodeApiKeyAcceptance.mjs` through `server.mjs -> service.mjs`.

A second active path existed through dashboard lifecycle wiring, and the active browser module imported the retired TheOldLLM visible-browser policy.

Prevention:

- retirement qualification must traverse the active import graph, not only inspect route declarations;
- root reachability at the real active entrypoint (`server.mjs` for Auth Keeper) is authoritative;
- service, dashboard and browser modules loaded by the server are part of active provider ownership even if their provider-specific HTTP endpoints are gone;
- fail if any active path reaches retired provider-execution modules.

## 6. Generic security rules must not remain housed in retired-provider modules

Observed failure class: `assertInteractiveAcquisitionAllowed` expressed a generic security invariant (API-key-only providers cannot use interactive browser acquisition) but lived inside an OpenCode-specific acceptance module. Keeping the generic rule active therefore kept the retired provider module reachable.

Prevention:

- move genuinely generic policy into provider-neutral modules;
- preserve the behavior and error contract while removing the retired-provider ownership edge;
- dormant provider modules may keep their local copy for direct historical regression tests when needed, but active generic code must not import them.

## 7. Dormant implementation means unreachable, not merely unrouted

A provider implementation is not dormant merely because no router route points to it.

Required proof for retirement:

1. no active provider policy admits it;
2. no exposed provider registry advertises it;
3. no active server/bootstrap path instantiates it;
4. no active service/dashboard/browser import graph reaches it;
5. direct implementation files may remain only as unreachable historical/upstream code;
6. exact observed dormant files should remain byte-identical unless a separate deletion phase is explicitly authorized.

Do not resurrect implementation families that an earlier accepted takedown already removed simply to satisfy a guessed inventory.

## 8. Reachability guards must remain fail-closed

When a reachability validator finds a retired module reachable from an active root, classify the exact parent edge before changing the validator.

Do not weaken a graph guard just to obtain a green result. Refine the validator only when the reported path is proven non-active or semantically misclassified.

The Auth Keeper reconciliation sequence demonstrated the correct behavior: the graph finding `server.mjs -> service.mjs -> opencodeApiKeyAcceptance.mjs` was treated as a genuine source gap and expanded the repair boundary instead of being suppressed.

## 9. Pre-delivery reconciliation checklist

Before delivering another provider-retirement/reconciliation script:

- hash-lock the accepted source/tree and evidence package;
- inspect the complete active module graph from real entrypoints;
- inventory executable policy tables and exposed provider registries;
- distinguish direct/dormant unit tests from source-wiring tests;
- preserve generic security behavior in provider-neutral modules;
- preserve exact observed dormant implementation bytes;
- run positive synthetic transformation/reachability fixtures;
- run a negative fixture that deliberately reintroduces a retired active import and confirm fail-closed behavior;
- compile every embedded Python block and syntax-check Bash/Node artifacts;
- prove transactional cleanup of uncommitted worktrees/branches;
- never install dependencies merely to validate an isolated worktree when an exact copy-on-write dependency authority is available;
- do not push, deploy or contact provider services as part of source qualification.
