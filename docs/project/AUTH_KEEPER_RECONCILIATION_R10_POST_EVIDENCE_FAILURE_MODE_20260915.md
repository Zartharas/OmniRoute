# Auth Keeper Reconciliation R10 Post-Evidence Failure Mode — 2026-09-15

Status: Durable engineering appendix for the `Zartharas/OmniRoute` fork only.

This document records a post-qualification defect discovered while reviewing the evidence package for Auth Keeper reconciliation Candidate R10. These rules are private fork engineering guidance and must not be submitted to the original upstream OmniRoute repository unless explicitly authorized.

## 1. A green suite does not prove an executable entrypoint can load

Candidate R10 reported a complete qualification pass, including the full Auth Keeper test suite. Evidence-package review then showed that `src/server.mjs` still referenced generic runtime symbols whose imports had been removed by the provider-retirement transform.

The removed generic imports included:

- `AUTH_KEEPER_CONNECTION_STATE_PATH` from `./connectionStateContract.mjs`;
- `createAuthKeeperServerShutdown` from `./serverShutdown.mjs`;
- `URL` from `node:url`;
- `AuthKeeperService` and `defaultDataDir` from `./service.mjs`.

The surviving server continued to use these symbols. The candidate therefore had an entrypoint-level `ReferenceError` risk even though `node --check` and the full unit/regression suite passed.

The direct `OmniRouteClient` import was also removed by the same broad transform, but that direct server ownership belonged to the retired TheOldLLM control plane. It must not be restored unless a surviving direct server use is proven.

## 2. Root cause: import-removal transforms can over-consume adjacent imports

The retirement transform removed provider-specific imports with a broad textual pattern. That pattern consumed adjacent generic imports at the top of `server.mjs` in the same operation.

Prevention:

- never remove ESM imports with a pattern that can span multiple import declarations unless the complete matched span is structurally verified;
- prefer exact import-declaration parsing or exact single-declaration anchors;
- after every import-removal transform, compare surviving identifier uses with surviving import bindings;
- treat adjacent generic imports as protected unless they are independently proven unused;
- never infer that an import is provider-specific merely because it is physically adjacent to provider-specific imports.

## 3. `node --check` is syntax validation, not binding validation

`node --check src/server.mjs` can pass even when top-level symbols such as `AuthKeeperService`, `defaultDataDir`, `URL`, or `createAuthKeeperServerShutdown` are undefined because their imports were removed.

Prevention:

Qualification of an executable entrypoint must include all of the following:

1. syntax validation;
2. explicit import-to-use integrity checks for critical top-level bindings;
3. import/reachability graph reconstruction from the actual transformed entrypoint;
4. a hermetic entrypoint startup smoke using temporary data and loopback-only binding;
5. complete tests.

A green unit suite without an entrypoint smoke is insufficient when the change touches entrypoint imports or bootstrap wiring.

## 4. Reachability can look falsely clean when generic roots are accidentally disconnected

R10's post-transform import graph showed retired provider execution as unreachable. That conclusion was directionally correct, but the graph was incomplete because `service.mjs`, `serverShutdown.mjs`, `connectionStateContract.mjs`, and `omniroute.mjs` had also been disconnected from `server.mjs` by the accidental import deletion.

This creates a dangerous false-clean pattern: a graph can prove that forbidden code is unreachable simply because required generic code was severed too.

Prevention:

- every reachability proof must contain both negative and positive assertions;
- negative assertions: retired provider execution modules are unreachable;
- positive assertions: required generic modules remain reachable;
- for Auth Keeper server qualification, require at minimum the generic service, shutdown, connection-state contract, and OmniRoute client module to remain reachable through legitimate generic paths;
- a graph that loses expected generic nodes must fail even if all forbidden nodes are absent.

## 5. Evidence-package review is a qualification gate, not clerical work

The R10 defect was found only after the candidate had committed and generated an evidence ZIP. The patch and graph artifacts exposed the problem even though the candidate's scripted gates had all passed.

Prevention:

- inspect the final patch after qualification, especially entrypoint import and bootstrap diffs;
- compare the final reachability graph with the pre-change architectural expectations, not only a forbidden-node list;
- verify evidence hashes before accepting the candidate;
- do not promote a candidate solely because its own `RESULT=PASS` marker says it passed;
- post-evidence review can invalidate a candidate and must do so when evidence contradicts runtime viability.

## 6. Narrow successor rule

When a late evidence review finds a defect after a mostly qualified candidate:

- preserve the qualified sibling repository commit when it is unaffected;
- create a narrow successor only in the repository containing the defect;
- use the prior candidate as the exact parent;
- restore only generic behavior that evidence proves was accidentally removed;
- add a permanent regression that would have caught the defect;
- rebuild the import graph with positive required-node assertions;
- run a hermetic startup/shutdown smoke;
- rerun the complete suite before committing the successor.

For R10 specifically, OmniRoute commit `d83912e2f15ce9c16785fef35a1b188b37f3e8bd` is unaffected by this post-evidence defect. The repair belongs only to the Auth Keeper successor of `9419532db2d37218778343b66f5667ea6e437b43`.

## 7. R11 resolution and accepted paired authority

R11 implemented the narrow-successor rule and closed the R10 qualification gap without reopening provider-specific scope.

Accepted paired authority after R11:

- OmniRoute commit: `d83912e2f15ce9c16785fef35a1b188b37f3e8bd`
- OmniRoute tree: `54bbf2ccad5fe450b1629a0064653b5842af6c4a`
- Auth Keeper commit: `b3b0d137369038d22820947729233deaec19e166`
- Auth Keeper tree: `9377fe6afe21f098861f32c751f05c8a72882211`
- Auth Keeper parent: `9419532db2d37218778343b66f5667ea6e437b43`

R11 changed exactly two Auth Keeper files:

- `src/server.mjs`
- `test/server-generic-import-integrity.node.test.mjs`

The repair restored only the four required generic import modules still used by surviving server code:

- `./connectionStateContract.mjs`
- `./serverShutdown.mjs`
- `node:url`
- `./service.mjs`

The direct server `OmniRouteClient` import was not restored because no surviving direct server use remained. Retired provider execution imports were not restored.

R11 qualification established all of the following:

- exact two-file change scope;
- static import integrity: pass;
- server import graph: 20 nodes;
- `service.mjs`: reachable;
- `serverShutdown.mjs`: reachable;
- `connectionStateContract.mjs`: reachable;
- `omniroute.mjs`: reachable transitively through legitimate generic paths;
- `providerTransportRuntime.mjs`: unreachable;
- OpenCode/TheOldLLM provider-execution modules: unreachable;
- targeted server-import regression: 3/3 pass;
- `npm run check`: pass;
- full Auth Keeper suite: 457/457 pass, 0 fail;
- hermetic `src/server.mjs` startup: pass;
- clean SIGTERM shutdown: pass;
- startup stderr: empty;
- smoke data scope: temporary-only;
- credential values read: no;
- provider calls: no;
- OmniRoute calls: no;
- dependency installation: no;
- remote push: not performed.

R11 evidence ZIP authority:

- SHA-256: `fd1be07a3e2eaf76aa6d9190cfc1725e69b34d6e099ff6104725165692808854`
- internal evidence hashes: verified;
- evidence manifest: verified;

## 8. Permanent entrypoint-qualification rule

For future OmniRoute/Auth Keeper changes that touch executable entrypoints, imports, bootstrap wiring, shutdown wiring, or reachability:

1. syntax checks are necessary but insufficient;
2. surviving top-level symbol uses must be matched to actual bindings/imports;
3. the import graph must prove both required generic reachability and forbidden provider-specific unreachability;
4. the executable entrypoint must be launched hermetically with temporary state and loopback-only binding;
5. startup must survive long enough to exercise module initialization;
6. shutdown must be observed cleanly;
7. the full test suite must still pass;
8. the final patch and evidence package must be reviewed before authority is promoted.

A candidate that passes tests but fails any of these entrypoint-integrity checks is not promotable.

## 9. Workstream closure

With R11 accepted, the Auth Keeper final contract reconciliation workstream is closed.

The next engineering phase is `OPERATIONS_FLOOR_SELECTIVE_REINTEGRATION`.

Do not reopen OpenCode or TheOldLLM as active product lanes during that phase. Dormant historical implementation may remain only where it is non-reachable and useful as regression/history evidence.
