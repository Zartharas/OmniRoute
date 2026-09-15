# Auth Keeper Reconciliation R7-R9 Lessons — 2026-09-15

Status: Fork-only engineering record for `Zartharas/OmniRoute`. Do not publish upstream without explicit authorization.

## 1. Mutation plans must include every explicit rewrite target

Observed during Candidate R7: the transform intentionally rewrote `test/r16-17-opencode-live-provider-registration-source.node.test.mjs`, but the exact expected Auth Keeper changeset omitted that file. The transform was correct and fail-closed plan validation stopped the candidate before static qualification.

Prevention:

- build an explicit set of mutation targets before applying rewrites;
- mechanically compare every explicit rewrite target with the exact expected changeset;
- require exact equality between the post-transform Git status and the source-backed plan;
- never maintain mutation code and expected-file lists independently without a consistency assertion;
- a plan mismatch is a harness failure until evidence proves an unexpected source mutation.

## 2. Word-boundary provider regexes can miss CamelCase retired-provider symbols

Observed during Candidate R8: `r16-17-opencode-binding-readiness-wiring-source.node.test.mjs` still asserted active retired-provider service and HTTP wiring, but the generic stale-source-wiring detector did not rewrite it. The detector used `\bopencode\b`, while the relevant source used CamelCase symbols such as `checkOpenCodeBindingReadiness`, `createOpenCodeAccountBindingResolver`, `OPENCODE_BINDING_READINESS_PATH`, and `OPENCODE_API_KEY_ACCEPTANCE_PATH`.

Prevention:

- do not use a single bounded provider-name regex as the sole classifier for provider-specific source wiring;
- combine filename/role semantics with symbol-level checks;
- classify `*-wiring-source*`, `*-activation-source*`, and `*-live-provider-registration-source*` tests separately from direct dormant-module tests;
- search for provider-specific symbol families, constants, imports, service methods, and route names;
- keep bounded token matching for avoiding false positives such as short aliases inside unrelated identifiers, but supplement it with structural/name-aware checks.

## 3. Mixed tests need surgical migration

The binding-readiness source test mixed three concerns:

1. a valid direct regression on dormant `opencodeApiKeyAcceptance.mjs` ordering;
2. an obsolete assertion that active `service.mjs` exposes OpenCode binding-readiness methods;
3. an obsolete assertion that active `server.mjs` exposes OpenCode binding-readiness and API-key HTTP routes.

Prevention:

- preserve direct dormant implementation regression tests when the implementation is intentionally retained;
- invert only the active service/server wiring assertions so they prove retirement;
- do not replace a mixed test wholesale with a generic tombstone if that would erase useful low-level historical coverage;
- targeted validation must include the surgically migrated test before the full suite.

## 4. Full-suite failure output should drive the next candidate directly

Candidate R8 printed a bounded full-suite tail that exposed both stale assertions in the same file. That avoided a separate diagnostic rerun.

Prevention:

- keep `set -e` fail-closed behavior, but print a bounded test-log tail before exit;
- classify every failure visible in that tail before changing code;
- when all failures belong to one source-wiring file, migrate the complete stale assertion family in one successor candidate;
- do not change runtime code when the runtime already satisfies the accepted retirement contract.

## 5. Pre-delivery R9 checklist additions

Before delivering a successor reconciliation script:

- enumerate explicit test rewrite targets;
- prove every rewrite target is present in the exact expected plan;
- verify exact expected-file count against the transformed fixture/source model;
- scan provider-specific source-wiring filenames for CamelCase/constant-based active-wiring assertions;
- separate direct dormant-module coverage from active service/server wiring assertions;
- syntax-check every generated test body;
- include each migrated source-wiring test in targeted validation;
- retain full active import/reachability proof and full-suite validation;
- keep all changes inside the fork/private repositories unless upstream publication is explicitly authorized.
