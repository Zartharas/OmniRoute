# R16.32 D18 Pre-Activation R3 Checkpoint

Date: 2026-09-17
Status: Core technical pre-activation readiness accepted; live activation not authorized

This checkpoint follows the accepted D18 isolated qualification and formal R7 source/runtime reconciliation. It records the accepted outcome of the R1-R3 pre-activation readiness sequence. It does not authorize production activation, deployment, cutover, live Auth Keeper mutation, or D19.

## Accepted authorities

- D18 source commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`
- D18 source tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`
- retained R10 image: `omniroute:d18-r8-r9-candidate-linux-r10`
- retained R10 image ID: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`
- frozen live R16.31 snapshot: `279211b86f31339171caadac41aca3a928b5356cf696eb98a076486a97f52df3|sha256:370d49896920568bc5adbfe71316879368ec93be0cd020cf1b546fa3ef2640aa|running|0|2026-09-15T16:51:28.109833871Z`

## R3 accepted technical findings

R3 completed with `technical_blocker_count=0` and `R3_RESULT=PASS_CORE_TECHNICAL_READINESS_WITH_HARDENING_REMEDIATION_REQUIRED`.

Accepted facts:

- current live container remains the exact frozen R16.31 runtime, healthy with restart count zero;
- live container source labels prove the direct-Docker R16.31 deployment authority: milestone `R16.31`, source commit `34bd2fdbb8b04d848a0157d763c70ec241468e1c`, source tree `7d7b256d92036093535063fb930fe79bb3df4535`;
- missing Docker Compose provenance labels are expected for the R16.31 direct-Docker deployment and are not a blocker;
- live topology is frozen as network `mer-gateway_default`, restart policy `unless-stopped`, runtime user `node`, working directory `/app`, `/app/data` named volume, read-only Auth Keeper service-token bind, read-only workload-policy bind, and loopback-only ports 20128/20129/20132;
- the exact retained R10 image successfully reached the live host Auth Keeper from a disposable container on the production Docker network;
- unauthenticated `GET /v1/omniroute/connection-state` returned 401;
- authenticated request returned 200 with exact `auth-keeper-connection-state/v1` contract, `mode=READ_ONLY`, `mutationPerformed=false`, `credentialsReturned=false`, `rawCredentialIncludedInOutput=false`, and zero unexpected or forbidden secret-material keys;
- the disposable canary was removed, no provider calls occurred, and live OmniRoute/Auth Keeper/source state remained unchanged.

## Retired R1/R2 false blockers

The following are classified as audit/harness authority mistakes rather than product defects:

- candidate image source-label mismatch from an incorrect R1 label assumption;
- treating Auth Keeper R11 source checkpoint as the live runtime authority instead of the frozen `1b4859a...` runtime;
- comparing deployed `server.mjs`/`service.mjs` against the wrong Auth Keeper baseline;
- generic R2 secret-key-name scanning that falsely rejected safe indicator fields `credentialsReturned` and `rawCredentialIncludedInOutput`;
- requiring Docker Compose provenance labels for a runtime that was promoted by the accepted R16.31 direct-Docker transaction.

## Remaining hardening item

Auth Keeper LaunchAgent plist mode is currently `0644`; the accepted installer hardening target is `0600`. The service is otherwise loaded, healthy, loopback-bound, and the dedicated service-token file remains mode `0600` with the accepted metadata contract.

This is a separate hardening/remediation item. It must not be silently folded into D18 activation.

## Active next boundary

Prepare and review a fail-closed direct-Docker D18 activation/automatic-rollback runbook derived from the proven R16.31 transaction model. The review must remain non-live until explicit production activation authorization is separately provided.

Do not rerun broad R12/R7 or pre-activation topology diagnostics unless new contradictory evidence appears.
