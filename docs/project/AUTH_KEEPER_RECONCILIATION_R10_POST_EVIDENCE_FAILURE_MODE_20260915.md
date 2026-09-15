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
