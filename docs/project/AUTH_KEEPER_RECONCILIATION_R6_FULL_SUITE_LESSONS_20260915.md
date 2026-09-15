# Auth Keeper Reconciliation R6 Full-Suite Lessons — 2026-09-15

Status: Durable engineering appendix for the `Zartharas/OmniRoute` fork only. Do not submit upstream unless explicitly authorized.

## Context

Candidate R6 completed source transformation, exact change-scope validation, static qualification, active import/reachability proof, dependency reuse, OmniRoute targeted tests, OmniRoute package validation, and Auth Keeper targeted tests. The full Auth Keeper suite then exposed two additional stale tests whose expectations still assumed OpenCode remained active.

## Failure 1: stale live-provider registration assertion

`test/r16-17-opencode-live-provider-registration-source.node.test.mjs` still expected the active Auth Keeper server to contain `createProviderServerRuntime("opencode", ...)`.

That expectation conflicts with the accepted product scope where OpenCode is retired from active Auth Keeper routing/bootstrap authority.

Prevention:

- when retiring a provider, search the entire test suite for positive assertions about active bootstrap, registration, HTTP ingress, policy-table membership, or server imports;
- source-wiring tests must evolve with product scope just like runtime code;
- require the stale positive assertion to exist before rewriting it;
- rewrite it into a negative retirement assertion rather than deleting coverage.

## Failure 2: stale provider-adapter skeleton execution assertion

`test/r16-17-provider-adapter-skeletons.node.test.mjs` still exercised OpenCode through the active provider-bound dispatcher. After retirement, the dispatcher correctly rejects the request with `AUTH_KEEPER_PROVIDER_NOT_ALLOWED`.

The error is the desired runtime behavior, not a product regression.

Prevention:

- distinguish direct dormant-module unit tests from tests that enter through active transport/dispatcher authority;
- dormant provider implementation may remain directly testable, but active transport must reject retired providers;
- tests of active dispatch should assert fail-closed `AUTH_KEEPER_PROVIDER_NOT_ALLOWED` for retired providers;
- do not weaken provider policy just to preserve a legacy adapter-skeleton test.

## General rule

Targeted tests are necessary but not sufficient for provider-retirement work. A full-suite run can reveal stale positive assumptions outside the initially identified source-wiring set. Successor candidates should migrate only evidence-backed stale assertions, keep the runtime retirement boundary unchanged, and rerun the complete suite.

## R7 qualification requirement

R7 must keep all R6 runtime/source changes intact and change only the additional stale tests required by full-suite evidence. It must:

1. prove the R6 failure signatures before mutation;
2. rewrite the live-registration test to assert retired providers are absent from active server bootstrap;
3. rewrite the adapter-skeleton test to assert retired providers fail closed through active provider-bound transport;
4. add both migrated tests to targeted validation;
5. preserve dormant implementation modules;
6. keep active import/reachability checks fail-closed;
7. run the complete Auth Keeper suite before commit;
8. surface a bounded full-suite failure tail if any further stale expectation remains.
