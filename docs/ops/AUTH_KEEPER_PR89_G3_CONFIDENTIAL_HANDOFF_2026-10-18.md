# Auth Keeper PR #89 — Confidential G3 readiness handoff (2026-10-18)

> **Tracking-only, draft documentation. NO-GO for production release.**
> The production/source authority is [the owned Auth Keeper fork](https://github.com/Zartharas/omniroute-auth-keeper), not a merged parent product change. This file does not authorize deployment, secret access, live Codex verification or PR merges.

## Authoritative records

- **[Auth Keeper PRM #90](https://github.com/Zartharas/omniroute-auth-keeper/issues/90)**: owner-Mac G3 current blocker, exact R4 script hashes/commands, passed tests and mandatory holds.
- **[Auth Keeper draft PR #89](https://github.com/Zartharas/omniroute-auth-keeper/pull/89)**: hardened operator-gated secretless Codex decryption attestation, head `e6600964f5997b3958854844af4e19d0a98f35a5`, stacked on [draft PR #88](https://github.com/Zartharas/omniroute-auth-keeper/pull/88) head `37e87aefa3fd4f4dd3b2e1e4d274c665562f2ebd`.
- [Auth Keeper umbrella PRM #45](https://github.com/Zartharas/omniroute-auth-keeper/issues/45): coordinated release, P2B/P2C/P2D preservation and broader four-pillar/four-provider orchestration. PRs #51/#87/#88/#89 are still draft and unmerged as last checked.

## Frozen engineering qualification (complete; do not repeat)

| Gate | Actual accepted result |
|---|---|
| PR89 operator guard unit | 11/11 PASS |
| Offline app staging | 10/10 PASS |
| Immutable isolated Linux/AMD64 production-mode candidate image build | PASS |
| Network-none synthetic production HTTP | 16/16 PASS |
| Production use / live provider credentials | **NOT AUTHORIZED** |

Candidate image SHA `sha256:3c1ac3edf60ab7afa3d02a48178c7cb8f4c730fa1ceabe6167023a1de6499951`, size 3,050,118,792 bytes. Previous PR88 image `sha256:40f22411a71f6db435263e3c79af6d32f09b280bad651d8e2b1e5762d821e2c6` remains preserved as last owner observation. The PR89 candidate is deliberately not running.

The original production container is a single SQLite writer. Its historical owner-Mac Docker census verified one named RW SQLite volume, **three sensitive auxiliary RO `/run` binds**, original automatic restart policy, loopback-only app host port 20128 and another Docker-network peer whose access has not been ruled out.

## G3 exact evidence boundary

- **G3 structured Docker metadata R1**: owner Mac PASS (effective 4 mounts, original container and image identity/health, original single writer, original/no-candidate/worktree nonmutation). **Mount metadata does not prove bind-target socket capabilities**.
- **R2 confidential config verification**: pre-decryption mount-contract script failure on optional writable-volume `ReadOnly` shape; does NOT establish actual source/target drift. Corrected in R3.
- **R3**: script SHA256 `b133da143f78f6c02b7f32aa9241ae54cabd5d1131136a3813b0d3eb22a74add`; 16/16 fabricated fixtures PASS; original live/candidate pins and existing **encrypted P2B config manifest/SHA256 PASS**; stops at `G3_FIXED_FAILURE_CLASS=P2B_GPG_CONFIDENTIAL_DECRYPT_FAILED_OR_OVERSIZE`. No historical/current decrypted configuration comparison occurred; **ciphertext corruption not established**.
- **R4**: *prepared, not owner-executed*. Download package from ongoing ChatGPT session; `omniroute-pr89-g3-confidential-reconstruction-r4.zip` ZIP SHA256 `def595efde2e3f9cc35fb7bef52593ffe204a95903759d24e2b1aed0e19a6be8`; runner SHA256 `84e307f62ad6d3f1844800437212670c5450be6fcd21de2a3a6f4beaf6a4b031`; 23,967 bytes, 26/26 fabricated offline fixtures PASS and syntax PASS. R4 safely classifies local GPG status failures, empty plaintext and oversize without exposing raw stderr/plaintext/key identifiers. One owner-local `--verify` run is pending after checksum/fixture verification.

**R4 command-only handoff** (owner Mac, ZIP in `~/Downloads`):
```bash
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17"
unzip -o "$HOME/Downloads/omniroute-pr89-g3-confidential-reconstruction-r4.zip" -d "$HOME/Downloads"
shasum -a 256 "$HOME/Downloads/omniroute-pr89-g3-confidential-reconstruction-r4.py"
python3 -B "$HOME/Downloads/omniroute-pr89-g3-confidential-reconstruction-r4.py" --self-test
python3 -B "$HOME/Downloads/omniroute-pr89-g3-confidential-reconstruction-r4.py" --verify
```

Never request/share raw decrypted config, GPG diagnostics, passphrases, secrets, mounted file contents or full Docker inspect. A GPG agent prompt is local-only; no key regeneration/import or repeated repair attempts without separate owner authorization. If a fixed GPG failure remains, stop and classify only that error.

Even a possible `PASS_G3_CONFIDENTIAL_SNAPSHOT_MATCH_R4_RECREATION_PENDING` proves historic/current config agreement, **not** actual rollback ability or production readiness.

## Owner governance and mandatory holds

Owner is the sole accountable operator, accepted an internal solo-review exception, with AI as a technical assistant **not** an independent approver. Planning targets **RPO 0 minutes, RTO 60 minutes (from rollback decision), maximum maintenance 120 minutes** accepted; **NOT proven feasible**.

Before any production action separately establish management actor/operator-token custody; ingress and Docker-peer path-specific denies; confidential mount/actual recreate and startup behavior; coherent *current* encrypted data preservation and schema-safe zero-loss rollback; exclusive SQLite writer/auto-restart containment; a signed-off change window. The Oct 05–06 P2B/P2C/P2D encrypted backup and detached restore PASS is historical recovery evidence only.

**No production deployment, real Codex OAuth decryption/provider request, merge, fresh backup, network change or four-provider activation.**

## New-chat continuation

Start by checking the linked Auth Keeper PRM #90, PR #89 and umbrella PRM #45, then review the **owner's R4 sanitized Mac output**. Take only the narrow next diagnostic/approval action supported by those results. Do not rebuild or re-run already qualified source/image tests absent changed pins, and do not bypass security gates to expedite release.
