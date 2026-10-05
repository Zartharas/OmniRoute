# OmniRoute — L1C-C Full-Chain Continuity Handoff

**Handoff date:** 2026-10-01 (America/Chicago).  
**Project authority:** owner-controlled private fork `Zartharas/omniroute-auth-keeper`; public governance repository `Zartharas/OmniRoute`, branch `release/v3.8.50`. This is a continuity record, not release/deployment permission.

## 1. Established non-live baselines

Canonical private parent used for this phase: `565130449450ebf33489fab768edee3a19eccb15`; accepted non-live productization RC3 remains distinct from running FreeLLMAPI. Do not wait for the original upstream owner; the owned fork is authoritative.

| Gate | Private draft PR | Frozen accepted source HEAD | Operator regression |
| --- | --- | --- | --- |
| L1 sequencer | #46 | `f2f459813ef8d7f0acc06a39c7e0f75e5dce898c` | 20/20 PASS |
| L1B restricted server boundary | #47 | `16b0f398df685afb5c02b1f6e478e12838687773` | combined 32/32 PASS |
| L1C-A trusted auth/policy/catalog readiness | #48 | `d499a30cbcc5b86fc5e8767811c40bb1ebfe6ef0` | combined 44/44 PASS |
| L1C-B1 exact pinned one-fetch adapter | #49 | `f2b30b722ff30717899f028ccb4d4f853752271d` | combined 59/59 PASS |
| L1C-B2 credential / native Codex HTTP contract | #50 | `0bb67b190ca8c65c5f0ca0134ddc3b2aaf6f19ce` | combined 79/79 PASS |

All five predecessor PRs remain **draft, unmerged, non-live**. Do not rerun those accepted independent qualifications unless a source change specifically invalidates them.

## 2. L1C-C new work — in the private repository

Draft dependency PR **#51**: `https://github.com/Zartharas/omniroute-auth-keeper/pull/51`. Base is exactly accepted #50 head `0bb67b190ca8c65c5f0ca0134ddc3b2aaf6f19ce`. Implementation branch `implementation/activated-orchestration-l1cc-full-chain-r1`, frozen head `c3ea109b629ab20184b1515afc94e7be96f44cc8`, tree `9ba0614a31b09795de4f3a69e73b29ba13ed169b`; ahead 4, behind 0, **exactly eight changed files**:

```
src/app/api/v1/responses/route.ts
src/lib/orchestrationPatterns/l1ccContributorOneAttempt.ts
src/lib/orchestrationPatterns/l1ccFullChain.ts
src/lib/orchestrationPatterns/l1ccProductionBinding.ts
src/lib/orchestrationPatterns/l1ccServerSelection.ts
tests/unit/orchestration-l1cc-contributor-one-attempt.test.ts
tests/unit/orchestration-l1cc-full-chain.test.ts
tests/unit/orchestration-l1cc-server-selection.test.ts
```

Functional design: compose qualified E1 Codex Unified authority, authenticated L1C-A readiness, L1B restricted/tool-less boundary and L1 four-stage sequencer. Specialist -> independent critique -> independent structured judge -> Codex acting-owner synthesis. Three contributors have mutation disabled; judge advisory; answer fusion not adopted; OmniRoute keeps route and final policy ownership. Four distinct server-only model and connection pins preflight before a stage attempts dispatch. Production binding uses actual API-key metadata/model policy, existing pinned credential selection and postselection connection-identity validation. Generic chatCore/handleSingleModelChat retry/fallback is not used. Contributor wire must match the exact registry: `format=openai`, `executor=default`, `authType=apikey`, `authHeader=bearer` and listed model; otherwise fail closed. In particular, current DeepSeek registry is **openai-responses**, so do not force it through a chat-completions adapter. Native Codex acting owner only uses the B2 HTTP Responses/SSE profile; WS/app-server remain denied.

The edited `/v1/responses` route is **SOURCE-ONLY / default OFF**. The server-side opt-in requires both `OMNIROUTE_L1CC_FULL_CHAIN_ENABLED=true` and `OMNIROUTE_L1C_CANARY_ENABLED=true`, exact `OMNIROUTE_L1CC_OWNER_MODEL_ID`, and the authenticated bearer metadata ID matching server `OMNIROUTE_L1C_CANARY_API_KEY_ID`. Server pins come only from `OMNIROUTE_L1CC_SERVER_PIN_SET`. It admits only a strict nonstream, tool-less canary body and returns 502 without generic fallback on stage failure. **Never enable these flags in the running container on source evidence alone.**

## 3. L1C-C R1 qualification: script FINISHED, local run PENDING

Qualification branch: `qualification/activated-orchestration-l1cc-full-chain-r1`.  
Exact commit: `d1f8ca02f531ad200c90309ced88f249ab721862`.  
Exact tree: `2eab9486c563a937f593b37d5d1f0341e0131809`.  
Repository path: `scripts/qualification/activated-orchestration-l1cc-full-chain-r1.sh`.  
Git blob: `01c60080969b4b27717c37d8b2e8774e66335722`.  
UTF-8 size: **8464 bytes**. The file is executable (`100755`), complete, newline-terminated, no placeholder tokens. Qualification branch is exactly **one qualification-only commit** ahead of implementation head and adds only the script.

The script verifies the exact candidate/ancestry/tree and 8-file blob allowlist; excludes generic retry executor import; requires default-off and fail-closed route markers; clones existing dependencies with macOS APFS `cp -cR` (no npm install); runs **expected 99 combined tests** (79 predecessor + 20 new), targeted TypeScript compilation of route/production binder and core typecheck under `sandbox-exec` OS network denial plus `fetch` denial; checks original linked-worktree HEAD/status nonmutation and prints the final result. There have been **zero real provider calls and no Docker mutation from the preparation of this phase**. The script has NOT YET been executed on the user's local Mac; never infer PASS from static inspection.

### Exact one-command local continuation

```bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1
REF="qualification/activated-orchestration-l1cc-full-chain-r1"
COMMIT="d1f8ca02f531ad200c90309ced88f249ab721862"
PATH_IN_REPO="scripts/qualification/activated-orchestration-l1cc-full-chain-r1.sh"
SCRIPT="$HOME/Downloads/omniroute_l1cc_full_chain_r1.sh"
git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_QUALIFICATION_REF_DRIFT; exit 1; }
git show "$COMMIT:$PATH_IN_REPO" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "8464" ] || { echo FAIL_SCRIPT_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "01c60080969b4b27717c37d8b2e8774e66335722" ] || { echo FAIL_SCRIPT_BLOB; exit 1; }
/bin/bash -n "$SCRIPT" || { echo FAIL_BASH_SYNTAX; exit 1; }
echo "script_integrity_and_bash_syntax=PASS"
shasum -a 256 "$SCRIPT"
/bin/bash "$SCRIPT"
)
```

If successful, terminal should include:
```text
RESULT=PASS_ACTIVATED_ORCHESTRATION_L1CC_ISOLATED_FULL_CHAIN_R1
CANDIDATE=c3ea109b629ab20184b1515afc94e7be96f44cc8
STATUS=FULL_CHAIN_SOURCE_QUALIFIED_DEFAULT_OFF_NOT_LIVE_DEPLOYED
```
The user should paste/upload **the entire local output**, including any error marker and `EVIDENCE_ROOT`. If failure, inspect only the failed gate's saved log; create minimal source/harness R2 on new refs. Do not amend any accepted old commit, silently weaken the network sandbox, rerun old standalone qualification or enable live traffic.

## 4. Live baseline and independent hard gates

Last operator read-only Docker inventory: active `mer-omniroute`, healthy, restart 0; immutable image `sha256:873977ab3cc6b1e4a25c88a0afb00dfee6cda1f90fb855f5d9aa32c28d424d49`, tag `omniroute:r16-32-freellmapi-preactivation-f8bc751312da`; current RW `/app/data` volume `omniroute-r16-32-freellmapi-live-f8bc751312da-20260923T053117Z`. Network `mer-gateway_default`; host-loopback ports 20128/20129/20132; read-only bind mounts include service/internal token destinations and workload policy. Do not expose token contents. Local active linked worktree last verified at `470a9eb5d5014c0df116c9e3c5b6ae3853bda021`.

Historical exited D19 holders/images exist but do **not** represent a consistent rollback of the current FreeLLMAPI data volume; old D18 rollback holder/image is absent. Before any live Docker replacement: preserve exact current image/config and create and validate a **SQLite/WAL-aware, consistency-checked snapshot of the actually running current /app/data volume**, with restoration proof. Hot raw tar without consistency coordination is insufficient. This remains PENDING.

Even an isolated 99/99 PASS will not prove actual Auth Keeper live credential/lease/quota, provider physical single-attempt count, DNS/egress integrity, native Codex HTTP upstream wire, controlled provider canary, full Answers/Responses compatibility, or rollback readiness. Those are independent fail-closed gates. No merge/release/deployment without proof and appropriate authorization.

## 5. First actions in the next chat

1. Open LIVE private PRM #45 completely: `https://github.com/Zartharas/omniroute-auth-keeper/issues/45`; inspect PR #51 and its dependency PRs #46–#50, then the frozen qualification commit/file. Use GitHub connector; don't rely on summarized stale heads. Public governance authority is `Zartharas/OmniRoute` branch `release/v3.8.50`; read this handoff and `docs/project/CURRENT_STATUS.md`.
2. Ask user only to share the script output if not already provided; do not regenerate the script or rerun predecessor suites separately.
3. Review 99-test result and targeted/core typecheck. On PASS, append actual evidence/decision to PR #51, PRM #45 and both public docs; retain status **qualified non-live**.
4. On FAIL, diagnose exact failed gate from `EVIDENCE_ROOT`, patch narrow issue into R2, preserve fail-closed and don't rewrite entire payload.
5. Continue independent current-live consistent rollback-preservation design and controlled provider/egress qualification. No live mutation until permitted and ready.

**PRM:** `https://github.com/Zartharas/omniroute-auth-keeper/issues/45`.  
**PR:** `https://github.com/Zartharas/omniroute-auth-keeper/pull/51`.  
**NEXT_GATE=LOCAL_L1C_C_FULL_CHAIN_R1_QUALIFICATION**.

## 6. 2026-10-01 late checkpoint: R1 operator TypeScript failure; R2 published

This supersedes the earlier *R1 local execution pending* line, without changing historical frozen provenance.

R1 original at qualification commit **d1f8ca02f531ad200c90309ced88f249ab721862**: script 8464 bytes, Git blob **01c60080969b4b27717c37d8b2e8774e66335722**, Bash syntax and local script integrity PASS; operator SHA-256 **706ed167bdec003e81d086754e2cb682c188bf3f3d53b59b7c5f1d999a42c1d5**. Source allowlist, no generic retries, default-off/fail-closed ingress and APFS dependency clone PASS. Combined regression **99/99 PASS** and rc=0.

**R1 FAILED targeted TypeScript rc=2**, with eight diagnostics in unchanged shared files: open-sse progressTracker/sseHeartbeat/stream (TS2353 Transformer.cancel) and src/lib/guardrails/videoBridgeHelpers.ts (TS2488, TS2365, TS2322, TS2345 for unknown values). These files are outside the eight-file L1C-C change set. R1 first introduced the complete Responses route into the targeted TS roots, but it is not yet proven that all eight diagnostics are inherited from the old route. The script stopped at FAIL_GATE=l1cc_targeted_typecheck; core typecheck and final active-worktree nonmutation were NOT REACHED. Local evidence root: /Users/zarthras/Downloads/omniroute_l1cc_full_chain_r1_20261002T033725Z. RESULT=FAIL_L1CC_FULL_CHAIN_R1.

### R2 qualification artifact — new script, implementation unchanged

- Private branch: qualification/activated-orchestration-l1cc-full-chain-r2.
- Exact HEAD: **5a3adf93f59865d7e59340c682e3805be8ed7922**; one new qualification-script-only commit above R1.
- Script: scripts/qualification/activated-orchestration-l1cc-full-chain-r2.sh.
- Blob: **da0acaf04ab90eacde19e47076c4f62c75d5fe93**; exact size **12096 UTF-8 bytes**.
- Frozen source candidate: **c3ea109b629ab20184b1515afc94e7be96f44cc8**, private PR #51, still DRAFT/UNMERGED.
- Previous accepted PRs #46–#50 remain unchanged.

R2 retains the 99-test combined regression and hard source/lineage/no-retry/default-off/network-denial/nonmutation/core-tsc gates. Its strict targeted TypeScript gate covers the new integration modules and predecessor files. Its separate route differential compiles the **old B2 route** and **new L1C-C route** under the same TypeScript options, exact dependency clone and OS network denial. Exit status and full diagnostic log must match exactly. If the prior eight known diagnostics reproduce unchanged, R2 explicitly labels them **unresolved baseline route type debt, not a clean TypeScript PASS**. Any additional/changed error fails the gate. This R2 artifact has NOT YET BEEN RUN locally.

#### Exact local download/integrity/syntax/run command

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1
REF="qualification/activated-orchestration-l1cc-full-chain-r2"
COMMIT="5a3adf93f59865d7e59340c682e3805be8ed7922"
FILE="scripts/qualification/activated-orchestration-l1cc-full-chain-r2.sh"
SCRIPT="$HOME/Downloads/omniroute_l1cc_full_chain_r2.sh"
git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_R2_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "12096" ] || { echo FAIL_R2_SCRIPT_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "da0acaf04ab90eacde19e47076c4f62c75d5fe93" ] || { echo FAIL_R2_SCRIPT_BLOB; exit 1; }
/bin/bash -n "$SCRIPT" || { echo FAIL_R2_BASH_SYNTAX; exit 1; }
echo "r2_script_integrity_and_bash_syntax=PASS"
shasum -a 256 "$SCRIPT"
/bin/bash "$SCRIPT"
)
~~~

Please provide entire R2 local output. If FAIL, inspect only the named gate and the corresponding log under EVIDENCE_ROOT; create a narrow R3 without amending accepted refs. A prepared R2 script alone is never a qualification PASS.

No live canary enablement, provider calls, merge or Docker replacement. Current live FreeLLMAPI exact image/config and SQLite/WAL-consistent current /app/data snapshot with restoration proof remain mandatory, independent of source qualification. Native Codex real HTTP compatibility, credential/lease/quota, egress/DNS/physical network attempt and bounded real-provider evidence are pending.

**NEXT_GATE=LOCAL_L1C_C_FULL_CHAIN_R2_QUALIFICATION**.

## 7. 2026-10-02 R2 OPERATOR RESULT — ACCEPTED NON-LIVE FULL-CHAIN SOURCE

Supersedes §6's R2 local pending status. Exact frozen R2 script (12096 bytes, blob **da0acaf04ab90eacde19e47076c4f62c75d5fe93**) downloaded and syntax-verified from commit **5a3adf93f59865d7e59340c682e3805be8ed7922**; operator SHA-256 **b6333d679bb7c51e193088332dcee7b41c7b65c27f81c73f78161f028f0cbb07**.

Full combined regression **99/99 PASS** (zero fails/skips/cancels), strict module targeted TypeScript **rc=0**. Identical old B2 and new L1C-C Responses route compiler error logs: both rc=2 and the same eight baseline diagnostics; differential **PASS_ZERO_NEW_DIAGNOSTICS_BASELINE_EIGHT_RETAINED**. The eight inherited open-sse/videoBridgeHelpers errors are still **unresolved route type debt**, not a clean global/Responses-route TypeScript PASS. Core TypeScript **rc=0**; source-integrity, fail-closed/default-off, no-generic-retry, cloned dependencies/no install and active linked-worktree nonmutation PASS. Network sandbox denied actual fetch; script recorded provider_calls=0 and docker_mutation=NO. Evidence root:

/Users/zarthras/Downloads/omniroute_l1cc_full_chain_r2_20261002T040724Z

Exact operator success markers:

~~~
RESULT=PASS_ACTIVATED_ORCHESTRATION_L1CC_ISOLATED_FULL_CHAIN_R2
CANDIDATE=c3ea109b629ab20184b1515afc94e7be96f44cc8
STATUS=FULL_CHAIN_SOURCE_QUALIFIED_ROUTE_BASELINE_DIFFERENTIAL_DEFAULT_OFF_NOT_LIVE_DEPLOYED
~~~

**Decision:** ACCEPT L1C-C isolated full-chain source at unchanged draft PR #51 candidate **c3ea109b629ab20184b1515afc94e7be96f44cc8**, default OFF, NOT DEPLOYED. Frozen draft/unmerged predecessors #46–#50 unchanged. No new functional implementation commit was necessary to pass R2.

### Next hard gate: current FreeLLMAPI rollback preservation PRECHECK

A historical D19 holder is not a substitute for a snapshot of the actually running **/app/data** volume. Start with an explicitly read-only current-state verification of running image ID and availability, health/restarts, mapped volume, loopback ports, network, read-only bind-mount destinations and names-only configuration; never persist raw Docker inspect output with potentially sensitive environment values. Establish SQLite DB/WAL/SHM inventory and a safe online-backup strategy before creating any new snapshot. For snapshot creation later, use a SQLite/WAL-aware consistency method coordinated with the writer, verify backup and isolated restoration, preserve image/config, and document atomicity/rollback/retention. The last known image identity is **sha256:873977ab3cc6b1e4a25c88a0afb00dfee6cda1f90fb855f5d9aa32c28d424d49** and volume is **omniroute-r16-32-freellmapi-live-f8bc751312da-20260923T053117Z**; re-read live state rather than treating old inventory as current. **Do not stop/restart/redeploy the container, read token values, launch real provider calls, or enable canary env switches at precheck.**

Further independent gates: actual credential/lease/quota/connection behavior; provider physical network-attempt measurement, proxy/DNS/egress integrity, native Codex HTTP upstream interoperability, bounded explicitly authorized real-provider canary, and rollback rehearsal.

**NEXT_GATE=CURRENT_FREELLMAPI_ROLLBACK_PRESERVATION_PRECHECK**.

## 8. New 2026-10-02 independent next gate: current-live FreeLLMAPI READ-ONLY rollback precheck

Source-qualified L1C-C R2 is accepted non-live (§7); implementation PR #51 and predecessors #46–#50 unchanged. New private **DRAFT PR #52** is a script-only, source-separated first rollback-preservation step. Branch **qualification/current-freellmapi-rollback-preservation-precheck-r1**, HEAD **55bfbf227e180377dbbb7d7d4d1cb82831088fc2**, based on qualification R2 **5a3adf93f59865d7e59340c682e3805be8ed7922** (ahead 2, behind 0, exactly one ADDED file). File **scripts/qualification/current-freellmapi-rollback-preservation-precheck-r1.sh**; blob **b566b974cebe50645cc5a4f7079b025b92f936c3**, exact UTF-8 **6570 bytes**.

This script captures only sanitized live Docker topology: expected current image and volume identity/presence, health/restarts/OOM, loopback host ports, existing attached network, read-only bind destinations, restart policy, nonprivileged status, canary flags not true and active Git worktree nonmutation. The Docker --format Go template emits selected fields and exact true-canary marker(s), not raw environment values or mount sources to disk or Python. It does NOT docker exec, read live data files, create backup/snapshot, preserve full image/config, restart/replace any container or contact providers. Do not mistake its successful result for rollback-ready. Its exact expected Docker identity matches the last observed current FreeLLMAPI baseline; any drift is a read-only stop/review event, never an instruction to restore a historical D19 holder.

### One-command local precheck continuation (R1 PENDING OPERATOR EXECUTION)

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1
REF="qualification/current-freellmapi-rollback-preservation-precheck-r1"
COMMIT="55bfbf227e180377dbbb7d7d4d1cb82831088fc2"
FILE="scripts/qualification/current-freellmapi-rollback-preservation-precheck-r1.sh"
SCRIPT="$HOME/Downloads/omniroute_current_live_rollback_precheck_r1.sh"
git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_ROLLBACK_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "6570" ] || { echo FAIL_ROLLBACK_SCRIPT_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "b566b974cebe50645cc5a4f7079b025b92f936c3" ] || { echo FAIL_ROLLBACK_SCRIPT_BLOB; exit 1; }
/bin/bash -n "$SCRIPT" || { echo FAIL_ROLLBACK_BASH_SYNTAX; exit 1; }
echo "rollback_precheck_script_integrity_and_syntax=PASS"
shasum -a 256 "$SCRIPT"
/bin/bash "$SCRIPT"
)
~~~

If script syntax, Docker Go template, or a live identity gate fails, review only the precise marker and sanitized EVIDENCE_ROOT; create narrow R2 while retaining source and existing data. On PASS expect RESULT=PASS_CURRENT_FREELLMAPI_ROLLBACK_PRESERVATION_READ_ONLY_PRECHECK_R1 and explicit snapshot_created=NO / consistent_current_data_snapshot=NOT_CREATED. Do not claim any local PASS until terminal output provided.

Next independent step after an accepted precheck: review SQLite file layout/online backup coordination in the current /app/data volume without exposing data/credentials; design and explicitly gate image/config preservation, SQLite/WAL-consistent online backup, backup-integrity verification, isolated restoration proof and rollback transaction, all before any deployment/canary work.

**NEXT_GATE=LOCAL_CURRENT_FREELLMAPI_ROLLBACK_READ_ONLY_PRECHECK_R1**.

## 9. 2026-10-02 rollback precheck R1 operator failure — R2 replacement PENDING

Supersedes §8's R1 *execution pending* state. Operator's exact 6570-byte Git-verified R1 script (commit 55bfbf227e180377dbbb7d7d4d1cb82831088fc2, blob b566b974cebe50645cc5a4f7079b025b92f936c3, local SHA-256 4f89676be48c64fe86bb295be63bb455de66c00695a65da0b623de4c77964c44) passed fetch/integrity/Bash syntax, then stopped at the read-only Docker template:

~~~
template parsing error: template: :1:561: executing "" at <$m.Name>: map has no entry for key "Name"
json.decoder.JSONDecodeError: Expecting value
FAIL_CURRENT_LIVE_SANITIZED_INSPECT
RESULT=FAIL_CURRENT_FREELLMAPI_ROLLBACK_PRECHECK_R1
EVIDENCE_ROOT=/Users/zarthras/Downloads/omniroute_current_live_rollback_precheck_r1_B7dmA1WK
~~~

Classification: **R1 harness defect**, not evidence of current live-image, volume or security-topology drift. Docker bind mounts do not carry a Name field. The Docker template unconditionally accessed $m.Name before Python validation, giving the secondary JSON error. R1 did not reach complete sanitized topology checks, image/volume presence, final worktree nonmutation or backup. Its output explicitly records snapshot_created=NO, docker_exec=NO, docker_mutation=NO, credential_values_emitted=NO and provider_calls=0.

### Narrow replacement R2

Owner-controlled private branch: **qualification/current-freellmapi-rollback-preservation-precheck-r2**.
Exact HEAD **4bc42ea3aca1d5cacfcd72990011ce7ddd6980f4**. This is ONE added script-only commit above immutable R1 HEAD. Existing draft PR #52 head branch was advanced via fast-forward to the same commit, preserving original R1 history and source. Added file: **scripts/qualification/current-freellmapi-rollback-preservation-precheck-r2.sh**, exact Git blob **9f7e8ed6f53a996b149199bf7b8a7e9e1772599d**, **6845 UTF-8 bytes**. The change emits mount Name only where mount Type is volume; bind mounts receive JSON null. Exact current /app/data named-volume comparison, all drift/fail-closed checks and no-mutation limits remain.

The corrected expression passed an offline Go standard text/template mock with missingkey=error, representative mixed bind and named-volume entries, parsed JSON and no emitted mount Source. This is NOT real Docker execution and is not R2 qualification PASS.

### Exact next local command — run only R2

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-rollback-preservation-precheck-r2"
COMMIT="4bc42ea3aca1d5cacfcd72990011ce7ddd6980f4"
FILE="scripts/qualification/current-freellmapi-rollback-preservation-precheck-r2.sh"
SCRIPT="$HOME/Downloads/omniroute_current_live_rollback_precheck_r2.sh"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_R2_REF_DRIFT; exit 1; }

git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "6845" ] || { echo FAIL_R2_SCRIPT_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "9f7e8ed6f53a996b149199bf7b8a7e9e1772599d" ] || { echo FAIL_R2_SCRIPT_BLOB; exit 1; }
/bin/bash -n "$SCRIPT" || { echo FAIL_R2_BASH_SYNTAX; exit 1; }

echo "rollback_precheck_r2_integrity_and_syntax=PASS"
shasum -a 256 "$SCRIPT"
/bin/bash "$SCRIPT"
)
~~~

Expected ONLY AFTER real operator run: RESULT=PASS_CURRENT_FREELLMAPI_ROLLBACK_PRESERVATION_READ_ONLY_PRECHECK_R2, together with unchanged current image/volume, sanitized live topology, active worktree nonmutation and explicit no snapshot/restore. If it fails, inspect precise marker/evidence path and make narrow R3; never repeat historical R1.

**Rollback remains NOT READY** even if the read-only precheck passes: actual current FreeLLMAPI image/config preservation, SQLite/WAL-consistent actual /app/data backup and isolated restoration, controlled credential/egress/physical attempt/provider canary all remain independent hard gates. L1C-C PR #51 remains non-live/default-OFF/draft/unmerged.

**NEXT_GATE=LOCAL_CURRENT_FREELLMAPI_ROLLBACK_READ_ONLY_PRECHECK_R2**.

## 10. 2026-10-02 R2 current-live read-only precheck ACCEPTED; backup plan stage

Supersedes §9's pending R2 execution. Operator fetched exact R2 commit `4bc42ea3aca1d5cacfcd72990011ce7ddd6980f4`, original Git blob `9f7e8ed6f53a996b149199bf7b8a7e9e1772599d`, 6845 bytes; Bash syntax and integrity PASS; local SHA-256 `1015071a2a5851a5beb6d5bcc29df03b30e3ee3a8784a1e5cd6e2b21e19eb3bd`. Corrected bind/volume mount template passed actual sanitized Docker inspection: exact expected current running healthy `mer-omniroute` immutable image and live RW `/app/data` named volume, zero restarts/OOM, no privilege, exact loopback ports 20128/20129/20132, network `mer-gateway_default`, three token/policy bind destinations RO, restart policy unless-stopped, canary marker false; local image and volume presence PASS; original Git worktree nonmutation PASS. No database file access, Docker exec/mutation, raw Config.Env values, snapshot or provider calls.

**Exact operator terminal:** `RESULT=PASS_CURRENT_FREELLMAPI_ROLLBACK_PRESERVATION_READ_ONLY_PRECHECK_R2`
**Evidence:** `/Users/zarthras/Downloads/omniroute_current_live_rollback_precheck_r2_dD3UTrJB`.

Interpretation: accepted current-state topology, *not* SQLite backup/restoration. `consistent_current_data_snapshot=NOT_CREATED`, `image_config_backup=NOT_CREATED`, `restoration_rehearsal=NOT_PERFORMED`.

Source inspection establishes WAL-enabled `DATA_DIR/storage.sqlite`, distinct file-based `DATA_DIR/call_logs`, `DATA_DIR/db_backups` and an ordinary manual/automatic DB backup wrapper that returns before asynchronous `db.backup()` completes. Full current rollback requires a coordinated, durable image/config and **complete /app/data** snapshot preserving WAL sidecars and non-DB artifacts, followed by isolated integrity/restore evidence. Hot live tar and a returned ordinary backup filename alone are not accepted.

**Detailed private design published, execution NOT AUTHORIZED:** Draft PR #53 in owner fork, branch `qualification/current-freellmapi-snapshot-plan-r1`, head `a04ee41640632defef25f6b6022cc2b320369453`, one-file record `docs/qualification/CURRENT_FREELLMAPI_ROLLBACK_SNAPSHOT_PLAN_20261002.md`, Git blob `e4ce781b8862e2862f2efcd64664229e7d72b174`. It defines P0 read-only actual-volume layout/space/helper inventory (any helper-container invocation requires approval), P1 synthetic/offline WAL+external-artifact fixture rehearsal, P2 explicitly separately authorized source quiescence plus secure encrypted exact image/config and full current data preservation, P3 new isolated-volume restore/integrity/hash proof and P4 original live service health/non-drift. No Docker execution or data/secret reads occurred in preparation of the design. PR #51 remains default OFF, qualified source only, draft/unmerged; #46–#50 frozen. No original-upstream owner dependency.

**NEXT_GATE=P0_SNAPSHOT_LAYOUT_AND_STORAGE_PREEXECUTION_INVENTORY_PLAN_REVIEW**. Do not ask the operator to rerun precheck R1 or R2. Before any live file/volume access or helper-container creation, specify exact bounded script, evidence redaction, no-network and original-volume read-only constraints and obtain separate authorization. No deployment or provider-call budget authorized on offline/source evidence.

## 11. 2026-10-02 P0 production volume METADATA-ONLY helper explicitly authorized — exact next command

The user authorized ONE temporary helper container only: network NONE, production named /app/data mounted READ-ONLY, metadata-only size/layout/SQLite-WAL-sidecar presence. No full-data backup, SQLite open/checkpoint, credentials/file payloads, container interruption/replacement, canary or provider calls. Existing read-only FreeLLMAPI baseline R2 remains accepted. Snapshot plan remains private **draft PR #53**, design-only and unexecuted.

Private **draft PR #54** (dependent on PR #53) frozen branch `qualification/current-freellmapi-p0-metadata-inventory-r1`, HEAD **8e205a9436a443e89ea550d9e0d112e7d6ab7661**; one ADDED script file over the plan, two narrow commits, no source/deployment changes:
- path `scripts/qualification/current-freellmapi-p0-metadata-inventory-r1.sh`
- Git blob **1f8d24975297fd64baa57054501e284721a40587**
- UTF-8 size **8455 bytes**
- local output name: `~/Downloads/omniroute_current_live_p0_metadata_r1.sh`.

The script verifies the exact known live container/image/volume and disabled server canary flags again. It reuses the **already-local immutable live image**, overrides entrypoint to /bin/sh, and never pulls an image; if shell or metadata tools are missing, it fails instead of installing a substitute. Its sole Docker run uses --rm, --network none, --read-only, --mount existing-volume:readonly:volume-nocopy, --cap-drop ALL, no-new-privileges, matching live-configured user, CPU/memory/PID limits, no ports, no other bind mounts and no Docker socket. Metadata is collected with stat/du/find for a fixed allowlist of expected DB/sidecar filenames plus aggregated full-volume/known-artifact-directory allocated KiB and approximate DB/WAL/symlink counts. No unknown file names or contents are printed. It confirms helper auto-removal, unchanged live identity and unchanged active Git worktree. Any helper stderr remains restricted in the LOCAL evidence root; only the sanitized terminal/metadata output should be shared. A live writer may modify sizes during inspection: these observations are non-atomic and NEVER qualify a snapshot.

### Exact one-command local execution — operator run still PENDING

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p0-metadata-inventory-r1"
COMMIT="8e205a9436a443e89ea550d9e0d112e7d6ab7661"
FILE="scripts/qualification/current-freellmapi-p0-metadata-inventory-r1.sh"
SCRIPT="$HOME/Downloads/omniroute_current_live_p0_metadata_r1.sh"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P0_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "8455" ] || { echo FAIL_P0_SCRIPT_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "1f8d24975297fd64baa57054501e284721a40587" ] || { echo FAIL_P0_SCRIPT_BLOB; exit 1; }
/bin/bash -n "$SCRIPT" || { echo FAIL_P0_BASH_SYNTAX; exit 1; }
echo "p0_metadata_script_integrity_and_syntax=PASS"
shasum -a 256 "$SCRIPT"
/bin/bash "$SCRIPT"
)
~~~

If the real operator run succeeds it must print:
`RESULT=PASS_CURRENT_FREELLMAPI_P0_METADATA_INVENTORY_R1`, followed by `EVIDENCE_ROOT` from the local machine. Do NOT claim PASS from GitHub preparation. If it fails, inspect the specific marker and redact private local helper diagnostics; use a narrow correction. Do not rerun accepted R2 precheck.

**Next after reviewed P0:** offline/synthetic WAL+sidecar+call_log backup/restore rehearsal with no live-volume writes; production image/config export, full current-data snapshot, service quiescence and isolated restoration require distinct approval. PR #51 remains source-qualified, non-live/default OFF/draft/unmerged.

**NEXT_GATE=LOCAL_CURRENT_FREELLMAPI_P0_METADATA_INVENTORY_R1**.

## 12. 2026-10-02 P0 metadata PASS; P1 offline synthetic WAL/artifact rehearsal next

Supersedes §11's P0 run PENDING status. Operator fetched exact 8455-byte P0 script at commit **8e205a9436a443e89ea550d9e0d112e7d6ab7661**, blob **1f8d24975297fd64baa57054501e284721a40587**, operator SHA-256 **3c46f2d0c822d449849f040b048fc212621a33059152ac1c770bb4000afb2c01**; syntax/integrity PASS. Authorized sole network-none source-volume-RO helper exited 0 and auto-removed; current original image/volume/container ID and Git worktree unchanged. Metadata-only P0: main storage.sqlite **67,764,224 bytes**, live storage.sqlite-wal **4,148,872 bytes**, storage.sqlite-shm **32,768 bytes**; journal/db.json absent; call_logs **404 allocated KiB**; db_backups **306,108 allocated KiB**; entire /app/data **462,196 allocated KiB**; recursive estimates **10 SQLite**, **2 WAL**, **0 symlinks**. Downloads available 2,160,010,120 KiB; existing local immutable image size 3,049,822,395 bytes; Docker VM free space still not assessed. This is a non-atomic metadata observation, NEVER a hot snapshot.

Terminal:
~~~
RESULT=PASS_CURRENT_FREELLMAPI_P0_METADATA_INVENTORY_R1
EVIDENCE_ROOT=/Users/zarthras/Downloads/omniroute_p0_metadata_inventory_r1_XWu7S56g
~~~

Private draft **PR #55** is the independent next gate, built exactly on frozen PR #54 P0 at **8e205a9436a443e89ea550d9e0d112e7d6ab7661**. Branch **qualification/current-freellmapi-p1-synthetic-rehearsal-r1**; frozen HEAD **f7fab94fc422c5a1de768748d00b404f4da0a0f8**; one ADDED script path **scripts/qualification/current-freellmapi-p1-offline-synthetic-rehearsal-r1.py**, exact Git blob **6fa944374eb5c4d733f1d3459db5fed27810dc1a**, UTF-8 **12863 bytes**, SHA-256 **c43b0f96ee72211ebfe0ae57f312ecbb70f5d6f45bdaab97eef647252f44ffd4** (from independently tested identical bytes). A standalone Python stdlib fixture generates WAL-backed SQLite and external fabricated call_log and simulated db_backups, captures into local scratch, validates manifest and safe new-directory restore, checks SQLite integrity on copied fixture and restores WAL-backed row/artifact reference. Eight negative cases must be rejected. Python networking is denied; the script neither references production volume nor invokes Docker or provider. A separate isolated test environment executed the exact same script successfully, but **the Mac operator run is still pending**.

### Next exact ONE command: synthetic-only P1 (no Docker)

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p1-synthetic-rehearsal-r1"
COMMIT="f7fab94fc422c5a1de768748d00b404f4da0a0f8"
FILE="scripts/qualification/current-freellmapi-p1-offline-synthetic-rehearsal-r1.py"
SCRIPT="$HOME/Downloads/omniroute_current_live_p1_synthetic_r1.py"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P1_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "12863" ] || { echo FAIL_P1_SCRIPT_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "6fa944374eb5c4d733f1d3459db5fed27810dc1a" ] || { echo FAIL_P1_SCRIPT_BLOB; exit 1; }
[ "$(shasum -a 256 "$SCRIPT" | awk '{print $1}')" = "c43b0f96ee72211ebfe0ae57f312ecbb70f5d6f45bdaab97eef647252f44ffd4" ] || { echo FAIL_P1_SCRIPT_SHA256; exit 1; }
python3 -B -c 'import ast, pathlib, sys; ast.parse(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8")); print("p1_python_syntax=PASS")' "$SCRIPT" || exit 1
echo "p1_source_integrity=PASS"
python3 -B "$SCRIPT"
)
~~~

Only synthetic files in a fresh protected ~/Downloads/omniroute_p1_synthetic_* folder are created; contents are fabricated and not production secrets. It does not inspect/mount/modify Docker or production, and cannot authorize snapshot/stop/deployment. Exact success only after real operator execution:

\`RESULT=PASS_P1_OFFLINE_SYNTHETIC_WAL_ARTIFACT_REHEARSAL_R1\`, \`synthetic_negative_cases_passed=8\`, \`isolated_restored_sqlite_integrity=PASS\`, \`wal_backed_row_and_external_artifact_link=PASS\`. Synthetic archive digest may differ between runs. The prior test emitted \`production_snapshot_created=NO\`, \`production_service_changed=NO\`, \`production_restore_test=NOT_PERFORMED\`.

After Mac P1 result, separately design current immutable image/config durable preservation and writer-quiescence/full-volume archival under another explicit approval; no live Docker or real provider execution is currently authorized. Keep implementation PR #51 default OFF/draft/unmerged, original live FreeLLMAPI unchanged, accepted PRs #46–#54 frozen.

**NEXT_GATE=LOCAL_P1_OFFLINE_SYNTHETIC_WAL_ARTIFACT_REHEARSAL_R1**.

## 13. 2026-10-02 operator P1 synthetic-only WAL/artifact rehearsal ACCEPTED

Supersedes §12's P1 Mac run pending status. Exact private GitHub source at PR #55 frozen commit **f7fab94fc422c5a1de768748d00b404f4da0a0f8**, one-file blob **6fa944374eb5c4d733f1d3459db5fed27810dc1a**, 12863 UTF-8 bytes; operator fetch/integrity/expected SHA-256 guard **c43b0f96ee72211ebfe0ae57f312ecbb70f5d6f45bdaab97eef647252f44ffd4** and Python AST syntax PASS. Actual Mac output reports all operations confined to new synthetic `~/Downloads/omniroute_p1_synthetic_phcn45dh`, Python network-socket creation DENIED, Docker commands NONE, production paths/volumes NOT accessed, original production service UNCHANGED.

The local synthetic WAL/SHM/main database + existing fake backup + separate fabricated call-log artifact full-family archive/isolated restore completed, `isolated_restored_sqlite_integrity=PASS`, `wal_backed_row_and_external_artifact_link=PASS`, **synthetic_negative_cases_passed=8** (unproven quiescence, tampered archive, missing WAL, corrupt WAL, path traversal, symlink, insufficient capacity and changing fixture during archive each PASS_REJECTED). Synthetic archive SHA-256 **9244b4eebd00519caf375209ee7d41c151a117c1b299ece11e4f288e98c17382** is a disposable fixture digest only. Missing/corrupt WAL tests are caught by expected manifest/hash validation before SQLite recovery; no separate low-level WAL corruption-recovery guarantee. Exact operator evidence:

~~~
RESULT=PASS_P1_OFFLINE_SYNTHETIC_WAL_ARTIFACT_REHEARSAL_R1
EVIDENCE_ROOT=/Users/zarthras/Downloads/omniroute_p1_synthetic_phcn45dh
production_snapshot_created=NO
production_service_changed=NO
production_restore_test=NOT_PERFORMED
~~~

PR #55 body and private PRM #45 have the accepted result. PR #54 P0 metadata qualification remains PASS. Draft PR #53 is the controlled full-volume preservation plan; implementation PR #51 remains source-qualified non-live, default OFF, draft/unmerged. No production durable image/config package, current SQLite/WAL or complete /app/data backup, full-state consistency or isolated real-data restoration exists yet.

**NEXT_GATE=P2_CURRENT_IMAGE_CONFIG_PRESERVATION_APPROVAL_PACKET_AND_PREEXECUTION_CHECKS**. First establish read-only host/Docker storage and encryption/tool capability, then prepare an exact preservation transaction with secret-safe handling and obtain separately scoped operator consent to any image archive, sensitive configuration export/encryption, production stop/writer quiescence, data copying and isolated restore. Earlier authorization was limited to the **single P0 temporary read-only helper** and does not carry over. Do not propose hot live tar, auto-backup return metadata as proof, Docker replacement, canary activation or provider calls.

## 14. 2026-10-02 P1 Mac OPERATOR PASS — P2A read-only preservation-preflight command

Supersedes §13's P2 next-gate preparation status. Operator's exact private PR #55 Git-verified Python (commit **f7fab94fc422c5a1de768748d00b404f4da0a0f8**, blob **6fa944374eb5c4d733f1d3459db5fed27810dc1a**, 12863 bytes, guard SHA-256 **c43b0f96ee72211ebfe0ae57f312ecbb70f5d6f45bdaab97eef647252f44ffd4**) passed syntax/source integrity and full Mac synthetic-only fixture rehearsal. All eight negative checks PASS_REJECTED, copied SQLite integrity PASS, WAL-backed row and external artifact restoration PASS, synthetic manifest six regular files, ephemeral synthetic tar SHA-256 **9244b4eebd00519caf375209ee7d41c151a117c1b299ece11e4f288e98c17382**. No production file, volume, Docker command, network or provider operation. Terminal:

~~~
RESULT=PASS_P1_OFFLINE_SYNTHETIC_WAL_ARTIFACT_REHEARSAL_R1
EVIDENCE_ROOT=/Users/zarthras/Downloads/omniroute_p1_synthetic_phcn45dh
production_snapshot_created=NO
production_service_changed=NO
production_restore_test=NOT_PERFORMED
~~~

Private PR #55 / controlling PRM #45 record the acceptance. PR #51 frozen source-qualified non-live/default OFF/draft-unmerged; earlier predecessor and P0 work remain untouched.

### P2A next: read-only current-image/storage/tools readiness only

Private new **DRAFT PR #56**, branch **qualification/current-freellmapi-p2a-preservation-preflight-r1**, HEAD **be20701dfb81cff8738263c45bdbf26fdf29546a**, exactly two new files above frozen accepted P1. Script: **scripts/qualification/current-freellmapi-p2a-readonly-preservation-preflight-r1.sh**, Git blob **25300196175804ce97f004cf2d6c23451c03a9d7**, **4997 UTF-8 bytes**. Confidential approval-boundary document: **docs/qualification/CURRENT_FREELLMAPI_P2_PRESERVATION_APPROVAL_BOUNDARIES_20261002.md**, blob **2cdbf06a1fc064ccd5bf4ccfc84ea12bd8aa9324**.

P2A uses only selected formatted metadata from already existing Docker image/container/volume; host Downloads available-space estimate, tool presence census, disabled server canary and original container/Git worktree nonmutation checks. No raw Docker inspect/secret values, no production file reads, no new helper container, Docker mutation, image save, network/provider call, DB open/checkpoint, archive, snapshot, deployment or service stop/restart. Its rough planning floor is **NOT a measured real backup/encryption size**. Docker VM free capacity remains unknown. The existing P0 helper authorization was one-time; no new helper or P2B–P2E write action is authorized by this step. Actual Mac run/syntax still pending.

### Exact one-command P2A continuation

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2a-preservation-preflight-r1"
COMMIT="be20701dfb81cff8738263c45bdbf26fdf29546a"
FILE="scripts/qualification/current-freellmapi-p2a-readonly-preservation-preflight-r1.sh"
SCRIPT="$HOME/Downloads/omniroute_p2a_readonly_preservation_preflight_r1.sh"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2A_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "4997" ] || { echo FAIL_P2A_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "25300196175804ce97f004cf2d6c23451c03a9d7" ] || { echo FAIL_P2A_BLOB; exit 1; }
/bin/bash -n "$SCRIPT" || { echo FAIL_P2A_BASH_SYNTAX; exit 1; }
echo "p2a_script_integrity_and_syntax=PASS"
shasum -a 256 "$SCRIPT"
/bin/bash "$SCRIPT"
)
~~~

Expected only **after** actual operator execution: `RESULT=PASS_P2A_READ_ONLY_HOST_STORAGE_TOOL_PREFLIGHT_R1`. This would establish host-only/preexisting-image planning/tool readiness, not durable rollback or permission for preservation. On drift, STOP and read-only reconcile. Do not rerun P0/P1 just to reach P2A. No live stop/snapshot/encrypted config export/canary activation is approved yet.

**NEXT_GATE=LOCAL_P2A_READ_ONLY_HOST_STORAGE_TOOL_PREFLIGHT_R1**. After that, review exact available encryption tooling/key workflow and seek separately scoped owner consent for P2B confidential current-image + exact container-config preservation, then distinct P2C writer-quiescence/full-volume archive, P2D isolated real-data restoration proof, P2E return-to-service.

## 15. 2026-10-02 P2A Mac operator PASS — P2B encrypted image/config approval packet next

Supersedes §14's pending P2A local-run state. Operator fetched exact P2A draft PR #56 HEAD **be20701dfb81cff8738263c45bdbf26fdf29546a**; script blob **25300196175804ce97f004cf2d6c23451c03a9d7**, 4997 UTF-8 bytes; local SHA-256 **67652f681fada9595bd85a20eb67bc308fa92fa6aa23b4639ceea5ec3612df1a**. Git size/blob and Bash syntax PASS. The read-only Mac run verified original current container/image/volume and canary OFF, no original container/Git mutation, no Docker helper, no raw environment/config exposure, no DB volume file reads, no archive or service interruption. Host Downloads free **2,159,858,240 KiB**, local immutable image reported **3,049,822,395 bytes**, P0 prior live volume allocation **462,196 KiB**, rough host planning floor **5,875,703 KiB** estimate-only PASS. Docker Desktop VM free bytes and actual compressed/encrypted archive sizes NOT measured. Present tar/gzip/openssl/gpg/sqlite3/python3/shasum; age absent. Recipient/key and encryption method not qualified.

~~~text
RESULT=PASS_P2A_READ_ONLY_HOST_STORAGE_TOOL_PREFLIGHT_R1
EVIDENCE_ROOT=/Users/zarthras/Downloads/omniroute_p2a_preservation_preflight_r1_IdTqLNY0
~~~

Private [draft PR #57](https://github.com/Zartharas/omniroute-auth-keeper/pull/57) proposes *design/consent only* P2B confidential current image + exact configuration preservation. New branch **qualification/current-freellmapi-p2b-confidential-preservation-approval-r1**, immutable HEAD **577b3e0fe29363c0819b63d148f40dbc2a0b9e35**, one new documentation file **docs/qualification/CURRENT_FREELLMAPI_P2B_CONFIDENTIAL_EXPORT_APPROVAL_PACKET_20261002.md**, Git blob **1d25f7f4e1e85cfe8454f6b3fc5cca3084e32d07**, 8573 UTF-8 bytes. Source lineage: exactly 1 ahead / 0 behind PR #56; no scripts, Docker operations, keyring scans, data reads or live changes executed to produce this packet.

**Candidate P2B method** (NOT YET AUTHORIZED): owner-controlled already-existing GPG public-key recipient whose full fingerprint and corresponding local decryption ability are qualified first by a synthetic challenge; an access-controlled local 0700 destination and 0600 ciphertext files; the existing exact immutable image saved through a secret-safe stream directly into GPG encryption, and the exact potentially secret-bearing container recreation configuration directly into separate encrypted storage, never to a plaintext file, stdout, GitHub, chat or debug log. Verify streaming exit status/crypto integrity, ciphertext byte lengths and checksums, decryption/image tar-readback without restoring/printing payloads, and unchanged original deployment and disabled L1C-C canary. No current production /app/data contents, live writer quiescence, service stop/restart, new helper, port publication, real provider calls or activation at P2B. **A new specific owner authorization is required before any live image or secret-bearing configuration export, even if the image is already local.** If there is no usable GPG recipient, stop; do not auto-generate/import keys, run software installation or silently substitute an unauthenticated encryption workflow.

P2C coherent current full-volume backup with explicit writer quiescence and maintenance-window stop, P2D isolated new-volume production-data recovery and P2E original-service return are each separately approval-gated. No production snapshot exists. PR #51 L1C-C remains source-qualified NON-LIVE/default OFF/draft/unmerged; prior frozen PRs untouched.

**NEXT_GATE=OWNER_CONSENT_FOR_P2B_CONFIDENTIAL_IMAGE_AND_CONFIG_PRESERVATION**. On consent, implement and freeze an exact GitHub script after reviewing local GPG challenge handling; then give bounded Git blob/size/integrity local command. Do not assume recipient selection, key presence, archive validity or live backup from P2A alone.

## 16. 2026-10-02 P2B owner authorization received; exact synthetic GPG recipient qualification

The owner explicitly authorized confidential P2B preservation of the current immutable image and secret-bearing exact container-recreation config under PR #57. This consent does NOT extend to production data-volume copying, service interruption, writer quiescence, any restore/launch, provider/network canary, or activation of default-OFF L1C-C PR #51. Installed GPG does not prove an existing encryption key, recipient selection or local decryption. Therefore the immediate executable gate is a **synthetic-only GPG recipient qualification**, before Docker image/config export. Exact prior P2A operator PASS remains unchanged.

Private draft **PR #58** branch `qualification/current-freellmapi-p2b-key-qualification-r1`, HEAD **a3b1389399065b9bb831aaf8d6bd60ca006b5390**, exactly one added script above frozen PR #57:
`scripts/qualification/current-freellmapi-p2b-key-qualification-r1.sh`; Git blob **6c1cb968c81050156c90ea0991f9a5f816f3225e**, UTF-8 size **3794 bytes**.

The standalone Bash script inspects only local GPG *secret-key metadata* privately. It either selects exactly one eligible already-existing GPG encryption candidate, or matches an operator-supplied full fingerprint in local `OMNIROUTE_P2B_RECIPIENT_FPR`. Ambiguous/absent recipients FAIL with no identities printed. It encrypts a newly generated synthetic random challenge to that candidate, decrypts with its corresponding existing local secret key, verifies an exact match, and saves a private candidate fingerprint in `recipient_candidate.private` (0600) under newly created restricted `~/Downloads/omniroute_p2b_key_qualification_r1_*`. It does not print recipient fingerprint, UID/email, GPG diagnostics, credentials or key material; do not paste/upload `recipient_candidate.private` or `gpg_private_diagnostic.txt`. It neither generates/imports a key nor invokes Docker, reads current production config/data, saves an image, backs up data or executes network commands. The candidate fingerprint still requires local owner approval of the **intended** production recipient before any real secret-bearing encryption.

### Exact next operator command — P2B-K ONLY

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2b-key-qualification-r1"
COMMIT="a3b1389399065b9bb831aaf8d6bd60ca006b5390"
FILE="scripts/qualification/current-freellmapi-p2b-key-qualification-r1.sh"
SCRIPT="$HOME/Downloads/omniroute_p2b_existing_gpg_key_qualification_r1.sh"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2B_K_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "3794" ] || { echo FAIL_P2B_K_SCRIPT_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "6c1cb968c81050156c90ea0991f9a5f816f3225e" ] || { echo FAIL_P2B_K_SCRIPT_BLOB; exit 1; }
/bin/bash -n "$SCRIPT" || { echo FAIL_P2B_K_BASH_SYNTAX; exit 1; }
echo "p2b_k_integrity_and_syntax=PASS"
shasum -a 256 "$SCRIPT"
/bin/bash "$SCRIPT"
)
~~~

Expected only after a real Mac run: `RESULT=PASS_P2B_K_EXISTING_GPG_RECIPIENT_QUALIFICATION_R1`, `synthetic_recipient_encryption=PASS`, `synthetic_corresponding_secret_key_decryption=PASS`, `EVIDENCE_ROOT=...`. If the script reports `FAIL_NO_ELIGIBLE_EXISTING_SECRET_KEY`, do not auto-generate/import a key or substitute OpenSSL plaintext/symmetric fallback. If it reports `FAIL_MULTIPLE_KEYS_SELECT_PRIVATELY`, the owner must select a known preexisting eligible key locally via the full fingerprint (e.g., look up GPG fingerprints in a SEPARATE local terminal; never send key IDs/credentials in chat) and set `OMNIROUTE_P2B_RECIPIENT_FPR` for a controlled rerun. Do not claim actual production image/config has been saved from a synthetic PASS.

**NEXT_GATE=LOCAL_P2B_K_EXISTING_GPG_RECIPIENT_QUALIFICATION_R1**. Once that qualifies, implement a separately pinned direct-to-GPG image/config export that rechecks real identity, obtains local owner approval of intended recipient, never persists plaintext, validates ciphertext decryption/structure, and leaves the original deployment unchanged. P2C–P2E remain distinct owner authorization gates.

## 17. 2026-10-02 P2B-K R1 operator fail-closed — next read-only local GPG metadata census

Supersedes §16's P2B-K R1 pending status. Exact R1 script at frozen PR #58 HEAD **a3b1389399065b9bb831aaf8d6bd60ca006b5390**, Git blob **6c1cb968c81050156c90ea0991f9a5f816f3225e**, 3794 bytes, operator local SHA-256 **8ff3b3403d1805ebddaac1fedeef4544cde9aaad2a562dc6b90b164a947e9aa6** passed source integrity and Bash syntax, but yielded:

~~~
FAIL_NO_ELIGIBLE_EXISTING_SECRET_KEY
RESULT=FAIL_P2B_K_EXISTING_GPG_RECIPIENT_QUALIFICATION_R1
EVIDENCE_ROOT=/Users/zarthras/Downloads/omniroute_p2b_key_qualification_r1_r13IKIBy
~~~

**Correct scope:** no eligible primary secret key found by R1's aggregate uppercase `E` and immediate `fpr` selector. Do NOT extrapolate to "the keyring is empty" or assume lack of encryption subkeys. No synthetic challenge began, no Docker/image/config/current volume access, key generation/import or network execution took place. This is a preserved FAIL-CLOSED prerequisite, not a regression in accepted P0/P1/P2A. Existing owner P2B confidential-export authorization remains contingent on confirming a genuine recipient. P2B image save/raw config export is BLOCKED.

Independent private **draft PR #59** branch **qualification/current-freellmapi-p2b-keyring-census-r1** at frozen HEAD **7a303411945854581847513512da92f13b181512**, exactly one new Python script based on original frozen PR #58 source:
- `scripts/qualification/current-freellmapi-p2b-gpg-metadata-census-r1.py`
- Git blob **b2c2350f7e4060caf46c74408ef3c8f3a0ce4480**
- **7425 UTF-8 bytes**
- fixed-size, in-memory aggregate keyring *metadata-only* public and secret records via local GPG; NO IDs, fingerprints, UIDs, email, raw GPG listing or stderr printed or persisted. No Docker/app-volume/config access, recipient encrypt/decrypt attempt, key generation/import/export or external auto key retrieval. Reports separate public primary/subkey and secret primary/subkey encryption declarations, unavailable stubs and count matching original R1 selector. This is a diagnosis, NOT recipient qualification. Its embedded synthetic parser fixture self-test is executable without GPG/keyring access. Mac execution still PENDING.

### Exact next Mac command: P2B GPG identity-free aggregate census

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2b-keyring-census-r1"
COMMIT="7a303411945854581847513512da92f13b181512"
FILE="scripts/qualification/current-freellmapi-p2b-gpg-metadata-census-r1.py"
SCRIPT="$HOME/Downloads/omniroute_p2b_gpg_metadata_census_r1.py"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2B_CENSUS_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "7425" ] || { echo FAIL_P2B_CENSUS_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "b2c2350f7e4060caf46c74408ef3c8f3a0ce4480" ] || { echo FAIL_P2B_CENSUS_BLOB; exit 1; }

python3 -B -c 'import ast, pathlib, sys; ast.parse(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8")); print("p2b_census_python_syntax=PASS")' "$SCRIPT" || exit 1
python3 -B "$SCRIPT" --self-test || { echo FAIL_P2B_CENSUS_PARSER_SELFTEST; exit 1; }
echo "p2b_census_source_and_fixture=PASS"
shasum -a 256 "$SCRIPT"
python3 -B "$SCRIPT"
)
~~~

Expected success **of the census only**: `RESULT=PASS_P2B_GPG_AGGREGATE_METADATA_CENSUS_R1`; it should include `aggregate_classification=` and the aggregate counts. Even a clean census that finds zero keys is NOT a recipient qualified PASS; `recipient_encryption_and_decryption_qualified=NO`, production export remains BLOCKED.

If no local secret keys, do not auto-generate/import a key, switch to plaintext or bypass synthetic recipient qualification: obtain separate owner approval for an explicit owner-held key creation/recovery plan or a qualified existing external public recipient with separately proven decryption. If the census finds an encryption-capable secret subkey excluded by R1, narrowly repair only the selector, then repeat owner-confirmed synthetic encrypt/decrypt. Keep `recipient_candidate.private` and `gpg_private_diagnostic.txt` from the prior failed attempt private and local. No production volume backup, service stop, restore, provider calls or activation are authorized.

**NEXT_GATE=LOCAL_P2B_GPG_METADATA_CENSUS_R1**.

## 18. 2026-10-02 P2B GPG census actual operator PASS — dedicated recoverable recipient decision

Supersedes §17's pending census. User fetched exact private PR #59 HEAD **7a303411945854581847513512da92f13b181512**, Git blob **b2c2350f7e4060caf46c74408ef3c8f3a0ce4480**, 7425 bytes; operator local SHA-256 **3090b1821523990cde5728016b24ffdb685c6124e804e2a5cb341f3943a2cac8**. Ref/size/blob verification, Python AST parse and fixture self-test PASS. Actual Mac census returned every public and secret key/subkey count zero (including encryption capabilities and R1 matching primary fingerprints), `aggregate_classification=NO_SECRET_PRIMARY_RECORDS_IN_ACTIVE_LOCAL_GPG_HOME`. There were NO fingerprints/emails/key identities printed or raw GPG listings persisted, no Docker/image/config/live-volume commands, no keys created/imported/exported and no network retrieval:

~~~
public_primary_records=0
public_subkey_records=0
secret_primary_records=0
secret_subkey_records=0
r1_filter_matching_primary_fingerprint_records=0
recipient_encryption_and_decryption_qualified=NO
production_image_and_config_export=BLOCKED_NOT_EXECUTED
RESULT=PASS_P2B_GPG_AGGREGATE_METADATA_CENSUS_R1
~~~

The historic PR #58 `FAIL_NO_ELIGIBLE_EXISTING_SECRET_KEY` is now fully explained **within the active GPG home**: empty public and secret keyrings; no parser patch or unchanged rerun indicated. The census does NOT exclude separately configured GNUPGHOME locations or externally held recoverable keys. Existing owner consent for confidential immutable image/exact potentially secret-bearing configuration preservation under draft PR #57 is still blocked on a verified intended recipient. Do not generate/import a key as an implicit continuation or use plaintext/symmetric fallback.

Private new **DRAFT PR #60** is *design/owner-consent only*:
- branch `qualification/current-freellmapi-p2b-recoverable-recipient-approval-r1`
- HEAD **79704a71ad30731d5dc3a219f977408d1e93bf6e**
- exactly one documentation file `docs/qualification/CURRENT_FREELLMAPI_P2B_K2_RECOVERABLE_GPG_RECIPIENT_APPROVAL_20261002.md`
- Git blob **33e19fddc62db4f1b815d04535bb5226441965b7**, **6962 UTF-8 bytes**.
- Request a **new explicit owner authorization** to establish a recoverable owner-controlled GPG public-key recipient in a fresh private GNUPGHOME, with interactive protected passphrase, independent protected/off-device recovery copy and independently recovered-key decrypt of fabricated challenge; no passphrase/fingerprint/private-key bytes in chat or GitHub. Or separately nominate a previously owned external recipient with demonstrated corresponding decryption. PR #60 makes NO keys/recovery artifacts or production exports.
- Proposed next implementation only *after* consent: freeze an exact script/procedure that privately checks installed GPG algorithm support, guides interactive key setup and secure recovery custody, tests synthetic encryption/decryption under a separately recovered key home, then privately confirms exact intended recipient. If these fail, P2B remains blocked. Only afterwards prepare a separate pinned direct-to-encryption image/config export (without reading /app/data and without service disruption).

**CURRENT:** P0 metadata=PASS, P1 synthetic WAL/artifact=PASS, P2A host/tool preflight=PASS, GPG aggregate census=PASS (active home empty), usable recipient=NONE QUALIFIED, P2B production image/config archives=NOT CREATED, P2C full production data backup and P2D real-data restore=NOT AUTHORIZED, PR #51 source-qualified default OFF/draft/unmerged, `ROLLBACK_READY=NO`.

**NEXT_GATE=OWNER_AUTHORIZATION_P2B_K2_RECOVERABLE_GPG_RECIPIENT**. Prior consent to encrypt existing artifacts does not permit unattended key creation, secret-key export or recovery media writes. On owner authorization, keep any key and recovery data exclusively local/off-device; never ask for secret values, private fingerprints or passwords in chat.

## 19. 2026-10-02 P2B-K2 owner authorizes dedicated protected GPG key and local encrypted-recovery proof

The owner explicitly approved P2B-K2 key provisioning, an encrypted private-key recovery copy and independent restoration verification. This is separate from older PR #57 authorization for FUTURE confidential current image/config archival, which remains blocked until recipient and recovery custody qualify. P2C full production-volume snapshot/writer quiescence, P2D isolated real-data restore, P2E interruption/return and provider/canary activation are NOT AUTHORIZED. Frozen implementation PR #51 remains non-live/default OFF/draft/unmerged.

Private draft **PR #61**, branch `qualification/current-freellmapi-p2b-k2-dedicated-gpg-provisioning-r1`, final HEAD **a8eb56dfcf0d50f5cfc5f3403834a16abf6d20ce**, parent PR #60 `79704a71ad30731d5dc3a219f977408d1e93bf6e`. Exactly four narrow source-only commits, ONE ADDED script:
- `scripts/qualification/current-freellmapi-p2b-k2-dedicated-recoverable-gpg-r1.sh`
- immutable Git blob **455a4e1679aa37def95bca560bb7634c308d02fb**
- exact UTF-8 size **9816 bytes**.
- The subsequent review head `4fbfef3a7746ca11318e213d41d01a897066fa68` / 9811 bytes is also SUPERSEDED: final packet inspection invokes `gpg_main` scoped to the new dedicated GNUPGHOME, not a bare GPG call into the default home. Earlier PR #61 draft head `bd549fafe9d491513cfd3bc38e96dbd340de98e9` and 8764-byte blob are SUPERSEDED. Use FINAL pin above ONLY.

### P2B-K2 exact operator scope

The Bash script disables shell tracing and core dumps, requires interactive Mac TTY and local **PROVISION** confirmation, creates NEW mode-0700 hidden `$HOME/.omniroute_p2b_k2_recoverable_gpg_r1_*` root and dedicated GNUPGHOMEs, leaves the default GPG home untouched, and creates a new Ed25519 certification primary + Cv25519 encryption subkey with 2y expiry via normal local GPG pinentry. No passphrases, fingerprints/UIDs, private-key bytes or raw diagnostics are printed to terminal, GitHub or chat.

With a freshly generated synthetic challenge it verifies public-recipient encryption and original-key decryption; it streams a protected private-key export only through an **in-memory pipe** into a separately passphrase-protected OpenPGP AES256/SHA512 iterated-S2K ciphertext `secret_key_recovery.gpg` (0600), never to a plaintext file. Additional hard guards verify both exported secret packets have salted+iterated S2K protection and a deliberately empty recovery-wrapper passphrase CANNOT decrypt the archive. It streams recovery ciphertext decrypt directly to `gpg --import` under a DIFFERENT new isolated GNUPGHOME, checks matching recovered primary and encryption subkey, and tests decryption of the synthetic challenge with the restored key. It removes only the disposable second test GNUPGHOME afterward. The ORIGINAL protected key home, separate AES256 recovery ciphertext, private `recipient_candidate.private` and restricted diagnostics remain in the hidden owner local folder. Two different owner-held strong passphrases must be preserved: original secret-key passphrase and encrypted recovery-wrapper passphrase.

**Boundary:** The secondary test-home is on the SAME Mac and is not off-device disaster-recovery custody. A locally successful P2B-K2 ends with `encrypted_recovery_off_device_custody=PENDING_OWNER_ACTION` and actual image/config export `BLOCKED_NOT_EXECUTED`. Owner must make/verify a private, independently stored encrypted recovery copy and custody of BOTH passphrases before authorizing the separately pinned image/config export. A synthetic/disposable separate-environment GPG fixture confirmed Ed25519/Cv25519 and wrapper/restore operations plus 2/2 protected packets and literal-empty passphrase fail; it cannot substitute for actual owner Mac interactive result.

### Exact next one-command Mac invocation (operator run PENDING)

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2b-k2-dedicated-gpg-provisioning-r1"
COMMIT="a8eb56dfcf0d50f5cfc5f3403834a16abf6d20ce"
FILE="scripts/qualification/current-freellmapi-p2b-k2-dedicated-recoverable-gpg-r1.sh"
SCRIPT="$HOME/Downloads/omniroute_p2b_k2_dedicated_recoverable_gpg_r1.sh"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2B_K2_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "9816" ] || { echo FAIL_P2B_K2_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "455a4e1679aa37def95bca560bb7634c308d02fb" ] || { echo FAIL_P2B_K2_BLOB; exit 1; }
/bin/bash -n "$SCRIPT" || { echo FAIL_P2B_K2_BASH_SYNTAX; exit 1; }
echo "p2b_k2_source_integrity_and_syntax=PASS"
shasum -a 256 "$SCRIPT"
/bin/bash "$SCRIPT"
)
~~~

Before typing PROVISION, confirm you have an interactive working local GPG pinentry and can privately preserve TWO distinct strong passphrases. The script will prompt for key-generation and encryption-wrapper passphrases through normal GPG pinentry; do not enter them in the chat. If any step fails, retain private root and share only redacted normal terminal markers, **never** files from the root (it contains actual private key and encrypted recovery artifacts), wrapper passphrase, `recipient_candidate.private` or `gpg_diagnostics_PRIVATE.txt`. Do not auto-run the old failed key-discovery R1 or change the default keyring.

Expected on genuine success:
`both_secret_key_packets_passphrase_protected=PASS`
`empty_recovery_wrapper_passphrase_rejected=PASS`
`separate_keyhome_restored_primary_and_encryption_subkey=PASS`
`separate_keyhome_synthetic_challenge_decrypt=PASS`
`RESULT=PASS_P2B_K2_LOCAL_KEY_AND_ENCRYPTED_RECOVERY_REHEARSAL_R1`

**NEXT_GATE=LOCAL_P2B_K2_DEDICATED_GPG_PROVISIONING_AND_RECOVERY_R1**. Following local PASS, obtain and verify independent/off-device encrypted recovery custody and intended recipient approval before constructing any sensitive production image/config export; P2C–P2E still require separate owner authorization.

## 20. 2026-10-02 P2B-K2 operator PARTIAL: retain real protected key and encrypted wrapper; recovery-only R2

Supersedes §19's pending original provisioning script. Owner fetched exact private PR #61 `a8eb56dfcf0d50f5cfc5f3403834a16abf6d20ce`, script blob `455a4e1679aa37def95bca560bb7634c308d02fb` / 9816 bytes, operator local SHA-256 `57feae429b8277f1c907702569308f1ab19287443cddb646db8f194486aa596b`; source integrity/Bash syntax PASS and operator explicitly typed PROVISION. Actual owner key created: Ed25519 primary + Cv25519 encryption subkey; 2/2 protected secret packets PASS; original key synthetic encryption/decryption PASS; `secret_key_recovery.gpg` AES256/SHA512-S2K protected wrapper CREATED mode 0600; intentional empty-wrapper passphrase properly rejected. Recovery attempt FAILED at the combined two-process stage:

~~~
independent_gnupghome_recovery_import=START_PINENTRY
FAIL_ENCRYPTED_RECOVERY_DECRYPT_OR_ISOLATED_IMPORT
EVIDENCE_ROOT=/Users/zarthras/.omniroute_p2b_k2_recoverable_gpg_r1_RvVHj22r
RESULT=FAIL_P2B_K2_DEDICATED_GPG_RECOVERABLE_RECIPIENT_R1
production_image_config_export=BLOCKED_NOT_EXECUTED
~~~

Critical interpretation: real key plus encrypted recovery wrapper were created, but **neither wrapper decryption nor separate-home key import was proven individually**, and restored-key decryption was never reached. Original R1's import used `--batch`, which may prevent protected-secret import pinentry. Do not assume this is the confirmed root cause without separated process exit evidence. **NEVER rerun PR #61 provisioning**: that would create an unwanted second key. Preserve the ENTIRE existing private root and both independently held owner passphrases. Do not paste/upload its `gpg_diagnostics_PRIVATE.txt`, original protected GPG keyhome, recovery wrapper, private candidate file or key identities. No Docker/production volume/image/config access or original service mutation happened.

### Private draft PR #62 — exact recovery-only continuation, NOT key provisioning

- Branch: `qualification/current-freellmapi-p2b-k2-recovery-only-r2`
- Source HEAD **ad88725e82ebd8fa1814f35d68df528e9fb9cab4**
- Based directly on unchanged PR #61 HEAD **a8eb56dfcf0d50f5cfc5f3403834a16abf6d20ce**
- ONE new Bash file: `scripts/qualification/current-freellmapi-p2b-k2-existing-ciphertext-recovery-only-r2.sh`
- Git blob **01e3baf58f93eca56d01eb15cfdc548627a89b0e** / **7122 UTF-8 bytes**.

R2 asserts the exact known private root, ownership/mode/type of keyhome, existing protected wrapper and original synthetic ciphertext. It computes existing wrapper SHA-256 before and after, determines existing original primary fingerprint privately, creates one distinct disposable 0700 test GNUPGHOME without touching the R1 partial test home, then requests local TTY and RECOVER confirmation. It streams decryption of the EXISTING wrapped secret directly into `gpg_test --quiet --import` **without the R1 `--batch` import flag**, retaining separate numeric `recovery_wrapper_decrypt_rc` and `isolated_secret_key_import_rc` from Bash PIPESTATUS. No plaintext export file or key generation/reexport. Any GPG stderr is kept in newly restricted `gpg_recovery_retry_r2_PRIVATE.txt`, never shared. On both process success, verify recovered primary and encryption subkey, encrypt a brand-new fabricated random challenge to existing owner public key and prove decrypt by recovered second-home key. Compare wrapper SHA unchanged, write private 0600 recipient candidate if needed and remove ONLY the successful disposable R2 home; leave previous R1 partial test home for private follow-up. If either process fails, STOP with its own marker and preserve original key/wrapper/ciphertext.

### Exact next Mac command — R2 RECOVERY ONLY

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2b-k2-recovery-only-r2"
COMMIT="ad88725e82ebd8fa1814f35d68df528e9fb9cab4"
FILE="scripts/qualification/current-freellmapi-p2b-k2-existing-ciphertext-recovery-only-r2.sh"
SCRIPT="$HOME/Downloads/omniroute_p2b_k2_existing_ciphertext_recovery_only_r2.sh"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2B_K2_R2_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "7122" ] || { echo FAIL_P2B_K2_R2_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "01e3baf58f93eca56d01eb15cfdc548627a89b0e" ] || { echo FAIL_P2B_K2_R2_BLOB; exit 1; }
/bin/bash -n "$SCRIPT" || { echo FAIL_P2B_K2_R2_BASH_SYNTAX; exit 1; }
echo "p2b_k2_r2_source_integrity_and_syntax=PASS"
shasum -a 256 "$SCRIPT"
/bin/bash "$SCRIPT"
)
~~~

Expected ONLY after actual Mac run:
- `recovery_wrapper_decrypt_rc=0` and `isolated_secret_key_import_rc=0`
- `isolated_recovered_primary_and_encryption_subkey=PASS`
- `independent_recovered_key_synthetic_decrypt=PASS`
- `existing_recovery_ciphertext_sha_nonmutation=PASS`
- `RESULT=PASS_P2B_K2_EXISTING_CIPHERTEXT_RECOVERY_ONLY_R2`.

If a GPG GUI prompt appears, enter the existing recovery-wrapper passphrase; protected-key import or the final decrypt may additionally require the ORIGINAL separate key passphrase. Never provide either to ChatGPT or through script argv/flags. If the wrapper/import process fails, share only the separately printed exit codes and terminal FAIL marker, not the private GPG diagnostic file. This local recovered-home PASS does not prove off-device custody. Keep production image/config export BLOCKED until recovery and off-device ownership/copy are verified; P2C–P2E remain separately unapproved. PR #51 default OFF/draft/unmerged.

**NEXT_GATE=LOCAL_P2B_K2_EXISTING_CIPHERTEXT_RECOVERY_ONLY_R2**.

## 21. 2026-10-03 operator R2 pin PASS; wrapper decrypt rc0, isolated protected-key import rc2 — PR #63 diagnostic

Supersedes §20's pending R2 run. Owner fetched exact immutable private PR #62 head **ad88725e82ebd8fa1814f35d68df528e9fb9cab4**, blob **01e3baf58f93eca56d01eb15cfdc548627a89b0e**, **7122 bytes** and local SHA-256 **ced9387e7dba989ac2fd0a21b1ceed9669a4bea6471579dda88a00a08041cf69**; source integrity and Bash syntax PASS. The ORIGINAL dedicated private owner key and encrypted wrapper remained present under `/Users/zarthras/.omniroute_p2b_k2_recoverable_gpg_r1_RvVHj22r`; private structure PASS. R2 printed existing encrypted wrapper preattempt SHA-256 **59cd8704137c342266a5685cbea2bbd976950ffa223225f1e5e12a136f1061c3**. Owner typed RECOVER and R2 separated the previously combined fault:

~~~
recovery_wrapper_decrypt_rc=0
isolated_secret_key_import_rc=2
FAIL_PROTECTED_SECRET_KEY_IMPORT_SIDE
RESULT=FAIL_P2B_K2_RECOVERY_ONLY_R2
existing_original_key_and_ciphertext=PRESERVED
production_image_config_export=BLOCKED_NOT_EXECUTED
~~~

Interpretation: existing wrapper decrypted successfully (rc0), but isolated recovered PROTECTED secret-key import failed (rc2). GPG diagnostics from both processes were appended to private `gpg_recovery_retry_r2_PRIVATE.txt` and cannot be disclosed raw. Import rc2 does not prove it left zero partial records; the original R2 after-attempt SHA and new synthetic recovered-key challenge were NOT reached. **Never rerun original provisioning R1 (PR #61), do not rerun same recovery R2 unmodified, do not create/import another new owner key.** Preserve the entire hidden root and BOTH distinct owner passphrases; no plaintext private export, key IDs, diagnostics or credential material in chat/GitHub. No Docker, production image/config/volume read, source service interruption, provider/canary or production archive.

### New draft PR #63: safe import-failure aggregate classifier (operator run PENDING)

- Branch: **qualification/current-freellmapi-p2b-k2-import-diagnostic-r1**
- Frozen HEAD: **4c3243b94da8b0a663e0300d8fb13ada97db9fc1**
- Parent PR #62 HEAD: **ad88725e82ebd8fa1814f35d68df528e9fb9cab4**
- ONE new Python script: **scripts/qualification/current-freellmapi-p2b-k2-import-failure-diagnostic-r1.py**
- Git blob: **aa3ff9eb53cb468ac3c66673dc5c401a2ab7f60c**
- Exact UTF-8 bytes: **9819**.

No decrypt/import/export or key mutation; script validates exact private directory/file owner/type/mode and rechecks existing ciphertext SHA against R2 preattempt SHA; parses *only* the protected R2 diagnostic log in memory into bounded fixed Boolean error-pattern categories (pinentry/TTY, agent, passphrase/cancellation, packet/input, permissions, secret-import summary), NEVER prints raw errors/UID/fingerprint/recipient/secret; discovers exactly one previous R2 disposable test key home and asks GPG for only aggregate counts of existing public/secret primary/subkey/stub/encryption records, without importing any keys, exposing identities or auto-retrieving remote keys. This may refresh disposable metadata internally; it does not alter the original dedicated keyhome or wrapper. Fixture `--self-test` uses fabricated patterns, no real GPG access. Error categories are indicators, not independently proved root cause. Exact Mac execution still PENDING.

### Exact next operator command — diagnostic ONLY

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2b-k2-import-diagnostic-r1"
COMMIT="4c3243b94da8b0a663e0300d8fb13ada97db9fc1"
FILE="scripts/qualification/current-freellmapi-p2b-k2-import-failure-diagnostic-r1.py"
SCRIPT="$HOME/Downloads/omniroute_p2b_k2_import_diagnostic_r1.py"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2B_IMPORT_DIAGNOSTIC_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "9819" ] || { echo FAIL_P2B_IMPORT_DIAGNOSTIC_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "aa3ff9eb53cb468ac3c66673dc5c401a2ab7f60c" ] || { echo FAIL_P2B_IMPORT_DIAGNOSTIC_BLOB; exit 1; }
python3 -B -c 'import ast,pathlib,sys;ast.parse(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"));print("p2b_import_diagnostic_syntax=PASS")' "$SCRIPT" || exit 1
python3 -B "$SCRIPT" --self-test || { echo FAIL_P2B_IMPORT_DIAGNOSTIC_SELFTEST; exit 1; }
echo "p2b_import_diagnostic_source_and_fixture=PASS"
shasum -a 256 "$SCRIPT"
python3 -B "$SCRIPT"
)
~~~

Expected **only after actual operator execution**: `encrypted_recovery_wrapper_matches_R2_preattempt_sha256=PASS`; `diagnostic_pattern_*=` YES/NO; `existing_R2_disposable_home_count=1`; aggregate `R2_failed_home_*_records`; `RESULT=PASS_P2B_K2_IMPORT_FAILURE_AGGREGATE_DIAGNOSTIC_R1`. If it reports SHA mismatch or missing/ambiguous failed test home, stop and review rather than overwriting or fabricating evidence.

On actual diagnostic evidence, build a precisely scoped R3 import correction (not another blind provisioning/decrypt/import retry), then independently establish off-device encrypted wrapper custody before current image/config preservation. **P2B export remains blocked**; P2C current production writer stop/full-volume backup, P2D isolated real-data restore and L1C-C activation remain unapproved.

**NEXT_GATE=LOCAL_P2B_K2_IMPORT_FAILURE_AGGREGATE_DIAGNOSTIC_R1**.

## 22. 2026-10-03 P2B-K2 PR #63 forensic result PARTIAL; next PR #64 GPG-free existing-home filesystem metadata check

Supersedes §21's pending PR #63. Operator Git-verified PR #63 commit **4c3243b94da8b0a663e0300d8fb13ada97db9fc1**, one-file blob **aa3ff9eb53cb468ac3c66673dc5c401a2ab7f60c**, 9819 bytes, local SHA-256 **a5924cebaf1921c11880a7c98ca734b6fcee3fce624fabc5479bb21ce02ab7eb**; Python AST and internal synthetic fixture PASS. Existing `secret_key_recovery.gpg` SHA-256 matched ORIGINAL PRE-R2 `59cd8704137c342266a5685cbea2bbd976950ffa223225f1e5e12a136f1061c3` on this newer diagnostic, so it was unchanged by the prior R2 failure. Private R2 GPG stderr contains *some* agent secret-key-transfer error class marker, but the fixed pinentry, passphrase/cancel, invalid-packet and storage patterns were NO. Do not assert confirmed root cause from regex matching. ONE prior failed R2 disposable test home owner/permissions PASS; public GPG metadata listing **rc0**, secret GPG metadata listing **rc2**, so PR #63's strict both-rc0 condition terminated before printing any aggregate key counts:

~~~
encrypted_recovery_wrapper_matches_R2_preattempt_sha256=PASS
diagnostic_pattern_agent_secret_key_transfer=YES
R2_test_home_public_metadata_listing_rc=0
R2_test_home_secret_metadata_listing_rc=2
fixed_error_category=FAIL_R2_HOME_AGGREGATE_GPG_LISTING
RESULT=FAIL_P2B_K2_IMPORT_FAILURE_AGGREGATE_DIAGNOSTIC_R1
~~~

This is a **PARTIAL diagnostic** on a failed import, not evidence that no protected key records exist or that actual recovery succeeded. Historical separate-process R2 remains `recovery_wrapper_decrypt_rc=0`, `isolated_secret_key_import_rc=2`. Existing dedicated key, AES256 wrapper, two distinct owner-held passphrases, failed R1/R2 disposable test homes and PRIVATE diagnostic files must remain intact under `/Users/zarthras/.omniroute_p2b_k2_recoverable_gpg_r1_RvVHj22r`. DO NOT rerun PR #61 provisioning, same PR #62 recovery, or failed PR #63 listing script unchanged; do not upload GPG diagnostic output/raw key/home/wrapper/credentials.

### Private new draft PR #64 — no GPG commands, no repeated import/listing

- Branch `qualification/current-freellmapi-p2b-k2-import-forensics-r2`
- Frozen HEAD **05609719941d1b45a9c641f9c8867ece27cf03ae**
- Direct parent PR #63 **4c3243b94da8b0a663e0300d8fb13ada97db9fc1**
- Exactly one new Python script `scripts/qualification/current-freellmapi-p2b-k2-import-filesystem-forensics-r2.py`
- Git blob **4f7be08284f9f0ed8fc1e9ff00391bac5957a945**, **10365 UTF-8 bytes**, one ahead/zero behind PR #63.
- Validates expected private original root, current encrypted wrapper SHA and bounded R2 PRIVATE error-log owner/type/modes/sizes; classifies raw log **privately** into finer fixed Boolean categories (e.g. agent send/receive, protected packet array, import error, agent storage, pinentry, passphrase, IO). Prints neither raw error text nor fingerprint/UID/name/key/secret.
- Discovers exactly one R2 failed disposable test home and reads **filesystem metadata only**: `pubring.kbx`, `pubring.db`, `trustdb.gpg` presence/nonempty, plus protected `private-keys-v1.d` regular 40-character hex keygrip `.key` files COUNT and unusual entries COUNT; never names or key file payloads. Does not invoke GPG at all, including the broken secret-key listing, and does not decrypt/import/export/generate keys or use Docker/network/production.
- A physical regular private `.key` file is **NOT** sufficient proof of a usable recovered key. Script includes only synthetic pattern fixture `--self-test`, operator Mac syntax/test/actual forensic run still PENDING. The result is diagnostic, not recovery authorization.

### Exact next one-command operator continuation — PR #64

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2b-k2-import-forensics-r2"
COMMIT="05609719941d1b45a9c641f9c8867ece27cf03ae"
FILE="scripts/qualification/current-freellmapi-p2b-k2-import-filesystem-forensics-r2.py"
SCRIPT="$HOME/Downloads/omniroute_p2b_k2_import_filesystem_forensics_r2.py"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2B_K2_FORENSICS_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "10365" ] || { echo FAIL_P2B_K2_FORENSICS_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "4f7be08284f9f0ed8fc1e9ff00391bac5957a945" ] || { echo FAIL_P2B_K2_FORENSICS_BLOB; exit 1; }
python3 -B -c 'import ast,pathlib,sys;ast.parse(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"));print("p2b_k2_forensics_syntax=PASS")' "$SCRIPT" || exit 1
python3 -B "$SCRIPT" --self-test || { echo FAIL_P2B_K2_FORENSICS_SYNTHETIC_SELFTEST; exit 1; }
echo "p2b_k2_forensics_source_and_fixture=PASS"
shasum -a 256 "$SCRIPT"
python3 -B "$SCRIPT"
)
~~~

Expected only on actual Mac execution: `encrypted_recovery_wrapper_matches_original_R2_sha256=PASS`, refined `private_diagnostic_*=YES/NO`, `failed_R2_private_key_store_dir_present`, `failed_R2_regular_keygrip_packet_file_count`, `RESULT=PASS_P2B_K2_IMPORT_FILESYSTEM_FORENSICS_R2`. The bounded script must fail on wrapper drift, unexpected symlink/permissions or missing/ambiguous previous R2 test home; don't bypass any such safety guard. Never paste PRIVATE GPG diagnostic file itself or original wrapped/secret-key contents, passwords, fingerprint or filename list.

**NEXT_GATE=LOCAL_P2B_K2_IMPORT_FILESYSTEM_FORENSICS_R2**. Following real result, design a strictly targeted R3 isolated secret-key import or owner-local GPG agent correction and preserve original key/wrapper. It must eventually prove recovered-key synthetic decrypt and independent off-device encrypted recovery custody BEFORE existing scoped P2B image/config export. P2C full current live-volume archival/writer quiescence, P2D isolated real-data restore and L1C-C activation remain separately unapproved.

## 23. 2026-10-03 PR #64 Mac PASS; agent socket path preflight PR #65 next

Operator first repeated old PR #63 failing output (not independent evidence). Then fetched pinned PR #64 HEAD **05609719941d1b45a9c641f9c8867ece27cf03ae**, script Git blob **4f7be08284f9f0ed8fc1e9ff00391bac5957a945**, 10365 bytes, local SHA-256 **66340a1671afaef6c4e4ba57450eddedf21dcf711a4f912d0f189869d6134e0c**, all ref/size/blob/Python syntax/synthetic classifier PASS. Real Mac **`RESULT=PASS_P2B_K2_IMPORT_FILESYSTEM_FORENSICS_R2`**:
- `encrypted_recovery_wrapper_matches_original_R2_sha256=PASS` against original PRE-R2 SHA `59cd8704137c342266a5685cbea2bbd976950ffa223225f1e5e12a136f1061c3`.
- Of refined private R2 GPG diagnostic finite regex flags, ONLY `private_diagnostic_broken_pipe_or_input_error=YES`; agent send/receive/key-transfer, secret packet array, agent refusal/storage, import-summary, pinentry/TTY/agent socket, passphrase/cancel, invalid material, filesystem, crypto, success summary markers NO. Historic broader PR #63 agent-secret-transfer YES overlaps the phrase “error reading stdin” and is not separately conclusive agent fault.
- Exactly one failed R2 disposable test home permissions PASS, public keybox present+nonempty, trustdb present+nonempty, private-keys-v1.d directory present but **0 regular 40hex .key keygrip packet files** and 0 other entries. NO GPG commands, secret-key payload reads, Docker or production access in PR #64. A public keybox cannot establish restored private-key custody.
- Original R2 `recovery_wrapper_decrypt_rc=0` / `isolated_secret_key_import_rc=2` still unresolved. Do NOT rerun P2B-K2 R1 generation or blind R2 import. Preserve exact owner private root `/Users/zarthras/.omniroute_p2b_k2_recoverable_gpg_r1_RvVHj22r`, existing original GPG keyhome, AES256 `secret_key_recovery.gpg`, both owner-held distinct passphrases, R1/R2 failed disposable keyhomes and private diagnostics.

Private **draft PR #65** is source-only GPG agent socket/path preflight designed to test, NOT presume, a possible deep-GNUPGHOME Unix socket length issue on owner Mac:
- Branch `qualification/current-freellmapi-p2b-k2-socket-preflight-r1`
- FROZEN HEAD **1aaeb3a877ac22ad57ab526a322c5b8c020b357f**, parent frozen PR #64 **05609719941d1b45a9c641f9c8867ece27cf03ae**
- ONE new script `scripts/qualification/current-freellmapi-p2b-k2-agent-socket-preflight-r1.py`, Git blob **3935e8ffe1d2fcbeb2790c9fe565435974380e37**, **8353 UTF-8 bytes**.
- Validates original owner root/keyhome/secret-key recovery ciphertext SHA and existing failed R2 test-home permissions. Uses `gpgconf --homedir ... --list-dirs agent-socket` to capture ACTUAL derived socket path byte lengths for original dedicated, previous failed deeply nested R2, and one freshly created EMPTY private short `/tmp/okg_*` comparison home. Only numeric lengths, expected macOS 104-byte nominal Unix sun_path risk flags, and existing socket presence/type emitted; never actual paths, PID or raw GPG output. Optionally `gpg-connect-agent --no-autostart 'GETINFO pid'` only for an existing user-owned R2 socket, capturing only coarse return status, no agent auto-start. Empty comparison folder removed only by `rmdir` if empty; no other cleanup. Uses no GPG key list/decrypt/import/export/generation, secret packets, Docker, live volume, current image/config, external network/provider or original service change. GPG can choose hashed/redirected socket paths; path lengths and current socket status ALONE are not root cause proof.
- Source Git readback verified one additional file/commit; **Mac AST/selftest and preflight execution PENDING**. This is diagnostic, not private-key recovery or an authorization to bypass custody.

### Exact next operator command — PR #65 socket preflight only

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2b-k2-socket-preflight-r1"
COMMIT="1aaeb3a877ac22ad57ab526a322c5b8c020b357f"
FILE="scripts/qualification/current-freellmapi-p2b-k2-agent-socket-preflight-r1.py"
SCRIPT="$HOME/Downloads/omniroute_p2b_k2_agent_socket_preflight_r1.py"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2B_K2_SOCKET_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "8353" ] || { echo FAIL_P2B_K2_SOCKET_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "3935e8ffe1d2fcbeb2790c9fe565435974380e37" ] || { echo FAIL_P2B_K2_SOCKET_BLOB; exit 1; }
python3 -B -c 'import ast,pathlib,sys;ast.parse(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"));print("p2b_k2_socket_preflight_syntax=PASS")' "$SCRIPT" || exit 1
python3 -B "$SCRIPT" --self-test || { echo FAIL_P2B_K2_SOCKET_SELFTEST; exit 1; }
echo "p2b_k2_socket_source_and_fixture=PASS"
shasum -a 256 "$SCRIPT"
python3 -B "$SCRIPT"
)
~~~

On Mac `RESULT=PASS_P2B_K2_GPG_AGENT_SOCKET_PREFLIGHT_R1` is a diagnostic-only PASS. It should return `*_gpgconf_reported_socket_path_bytes`, `*_reported_socket_status`, `failed_R2_existing_agent_no_autostart_probe` and `existing_encrypted_recovery_wrapper_sha256_nonmutation=PASS`. If GPGCONF fails, preserve/fail-closed; never derive a guessed socket location as established. No production archive has been created; no recovered-key decrypt qualified; no off-device backup custody proven. PR #51 remains source-qualified default OFF/draft/unmerged, and P2C–P2E remain unapproved.

**NEXT_GATE=LOCAL_P2B_K2_GPG_AGENT_SOCKET_PREFLIGHT_R1**.

## 24. 2026-10-03 PR65 owner Mac PASS; short-path agent-qualified recovery R3 (PR #66)

Owner fetched correct PR #65 pin `1aaeb3a877ac22ad57ab526a322c5b8c020b357f` / `3935e8ffe1d2fcbeb2790c9fe565435974380e37` / 8353 bytes; local SHA256 `949d8165551ebdf47d2ec26d6c7e95d3230e2a8e74c5d8e876dd3477cb887bd3`; Git checks/Python AST/synthetic selftest and actual owner Mac terminal `RESULT=PASS_P2B_K2_GPG_AGENT_SOCKET_PREFLIGHT_R1`. Original exact AES256 encrypted recovery-wrapper SHA unchanged. Previous R2 failed test home present/permissions PASS. GPGCONF agent-socket reported/resolved byte lengths: original owner home **89/89** and PRESENT_SOCKET; failed nested R2 home **103/103**, socket presently ABSENT, no-autostart check not performed; new empty short comparison home **29/37**, socket absent (expected), removed. None >= nominal macOS 104 bytes, but 103 bytes is very close including required string termination. This suggests, but DOES NOT PROVE, an agent/socket-address constraint behind R2 import rc2 and PR64 broken-pipe classification; GnuPG can use hashed/redirected paths. No actual recovered-key import was attempted by PR65.

Private **DRAFT PR #66** HEAD **17d9e4a4e802bd61af4fb164bd0b522723426676** based directly on PR65 head `1aaeb3a877ac22ad57ab526a322c5b8c020b357f`; branch `qualification/current-freellmapi-p2b-k2-shortpath-recovery-r3`. Exactly ONE new Bash source file `scripts/qualification/current-freellmapi-p2b-k2-shortpath-recovery-r3.sh`, Git blob **3be748535a8e77482233762141614215abd1a1ce**, **10130 UTF-8 bytes**. Source readback confirmed one ahead/zero behind, no original-key generation/export, wrapper replacement, Docker or network. **Mac Bash syntax/actual owner recovery PENDING**.

### R3 one-shot scope and controls

R3 is the previously consented P2B-K2 **local recovered-key qualification only**, not live P2B archive or deployment. It:
- Verifies EXACT original protected root `/Users/zarthras/.omniroute_p2b_k2_recoverable_gpg_r1_RvVHj22r`, original dedicated key home and `secret_key_recovery.gpg` owner/type/modes/size and encrypted ciphertext baseline SHA `59cd8704137c342266a5685cbea2bbd976950ffa223225f1e5e12a136f1061c3`. No new original key generation or private-key reexport.
- Creates only ONE fresh mode0700 short `/tmp/okr3_XXXXXXXX` disposable GNUPGHOME, validates GPGCONF-derived reported AND physically resolved agent socket lengths each <=80 bytes, explicitly launches **that isolated test home's agent**, requires an existing user-owned socket and actual successful `gpg-connect-agent --homedir SHORT --no-autostart 'GETINFO pid' /bye`, with no path/PID/raw error emitted.
- Only after agent readiness asks operator to type local **RECOVER_R3** (never enter passphrases in chat); writes a 0600 private once-only attempt marker to BLOCK unchanged repeat after protected data flow begins. Decrypts the existing AES256 wrapper directly through an anonymous pipe into the NEW short-home protected-key import. Two subprocess exit codes printed distinctly as `R3_existing_wrapper_decrypt_rc` and `R3_shortpath_secret_import_rc`; if both are 0, privately verifies matching restored primary and encryption subkey and tests recovered private-key decrypt of a NEW fabricated random challenge encrypted to original public recipient.
- Exit trap validates original encrypted wrapper SHA even on failure, kills ONLY the new short-home agent and deletes ONLY the guarded freshly created temporary R3 test directory. It preserves original key/wrapper, protected local diagnostics, both owner passphrases and the historical failed R1/R2 disposable homes. On success only the intended-recipient fingerprint candidate file is held privately mode0600. Do not upload `gpg_shortpath_recovery_r3_PRIVATE.txt`, original keyring, encrypted recovery wrapper, private fingerprint or passphrases.
- SAME Mac independently restored test home is NOT off-device custody. P2B actual confidential current immutable image/exact config export remains BLOCKED pending successful restored-key proof AND separately verified owner-controlled/off-device encrypted recovery-copy custody (including both separate owner passphrases). P2C current live volume writer-quiesced backup, P2D isolated real-data restoration, P2E original service actions and L1C-C default-off PR #51 activation remain unapproved.

### Exact next Mac command — ONLY final PR66 source

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2b-k2-shortpath-recovery-r3"
COMMIT="17d9e4a4e802bd61af4fb164bd0b522723426676"
FILE="scripts/qualification/current-freellmapi-p2b-k2-shortpath-recovery-r3.sh"
SCRIPT="$HOME/Downloads/omniroute_p2b_k2_shortpath_recovery_r3.sh"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2B_K2_R3_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "10130" ] || { echo FAIL_P2B_K2_R3_SCRIPT_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "3be748535a8e77482233762141614215abd1a1ce" ] || { echo FAIL_P2B_K2_R3_SCRIPT_BLOB; exit 1; }
/bin/bash -n "$SCRIPT" || { echo FAIL_P2B_K2_R3_BASH_SYNTAX; exit 1; }
echo "p2b_k2_r3_source_integrity_and_syntax=PASS"
shasum -a 256 "$SCRIPT"
/bin/bash "$SCRIPT"
)
~~~

Owner interaction only: type `RECOVER_R3` after the new isolated agent has PASSED its socket/contact checks. Any GPG pinentry uses the **existing AES256 recovery-wrapper passphrase**, possibly later the distinct original private-key passphrase. Never paste either value, raw diagnostic file or private recipient identity. **The private R3 attempt marker forbids automatic/unchanged rerun**, whether the import succeeds or fails; if it fails after confirmation, preserve the fixed failure and review before any new iteration.

Expected ONLY if owner Mac really passes:
`new_shortpath_agent_socket_and_contact=PASS`;
`R3_existing_wrapper_decrypt_rc=0`;
`R3_shortpath_secret_import_rc=0`;
`R3_independent_recovered_primary_and_encryption_subkey=PASS`;
`R3_independent_shortpath_synthetic_decryption=PASS`;
`original_encrypted_recovery_wrapper_sha_nonmutation=PASS`;
`RESULT=PASS_P2B_K2_SHORTPATH_ISOLATED_RECOVERY_R3`.

**NEXT_GATE=LOCAL_P2B_K2_SHORTPATH_AGENT_QUALIFIED_RECOVERY_R3**. If successful, next gate is separately retained/off-device owner-controlled encrypted-wrapper copy and intended-recipient confirmation, NOT an automatic image/config export. ROLLBACK_READY=NO.

## 25. 2026-10-03 owner Mac R3 PASS; external encrypted recovery ciphertext custody PR #67 next

Actual PR #66 operator evidence supersedes §24's PENDING marker. Owner fetched pinned PR #66 `17d9e4a4e802bd61af4fb164bd0b522723426676`, Git blob `3be748535a8e77482233762141614215abd1a1ce`, exactly 10130 bytes, Mac local SHA-256 `db168660b16e579a13920dc625e2b38a707e1bfb3e7833f616cdab8d382a0f2c`; Git ref/size/blob and Bash -n PASS. Real `RESULT=PASS_P2B_K2_SHORTPATH_ISOLATED_RECOVERY_R3`. Existing original owner key+wrapper owner/type/modes and original AES256 wrapper SHA `59cd8704137c342266a5685cbea2bbd976950ffa223225f1e5e12a136f1061c3` unchanged. New /tmp R3 disposable GNUPGHOME gpgconf agent socket length **30 reported / 38 resolved** bytes; agent launched and contacted via existing socket BEFORE protected key transfer. Owner typed RECOVER_R3 and a private one-time marker was written. Old wrapper decrypted **rc0**, recovered private-key import into independently agent-qualified short home **rc0**, recovered primary and Cv25519 encryption subkey PASS, fresh synthetic public-recipient challenge decrypted successfully by restored isolated secret key PASS; original wrapper SHA nonmutation PASS; private recipient selector saved mode0600; ONLY temporary short R3 home removed. All prior historical failed R1/R2 roots, original dedicated key+wrapper and both private owner-held passphrases retained. No Docker, production volume/image/configuration read/export, service change, network/provider/canary or original key generation.

Interpretation: **local separate-GNUPGHOME private-key recoverability PROVEN**. It is not off-device or independent physical custody, and it does not prove original failed R2 root cause, only that new separately prepared short-path agent successfully overcame prior import failure. Do not rerun one-shot R3 unchanged. No secret file or credential is to be uploaded/shared in chat/GitHub.

### New draft PR #67 — owner-controlled external ciphertext-only copy (PENDING Mac execution)

Branch `qualification/current-freellmapi-p2b-k2-offdevice-custody-r1`; based directly on frozen PR #66 HEAD `17d9e4a4e802bd61af4fb164bd0b522723426676`. Final PR #67 source HEAD **15350b37d2644de04526dbd191346ff097c6600a**, exactly ONE new Python script/commit above PR66:
`scripts/qualification/current-freellmapi-p2b-k2-offdevice-ciphertext-copy-r1.py`
Git blob **f77b0c0b90c50e05b7b89c894c1cc40573194116**, **10912 UTF-8 bytes**. Mac AST/synthetic selftest/copy still PENDING.

Script performs NO GPG/secret-key packet operations, key generation, decryption, Docker, production image/config/volume, provider/network or original-app service changes. It first checks original private root `/Users/zarthras/.omniroute_p2b_k2_recoverable_gpg_r1_RvVHj22r` and its **already AES256 encrypted** only recovery ciphertext `secret_key_recovery.gpg` for owner/type/mode/size+fixed SHA `59cd8704137c342266a5685cbea2bbd976950ffa223225f1e5e12a136f1061c3`. Real owner interactive macOS terminal required. Plug in a trusted independent external volume (prefer an encrypted APFS external volume). The script privately requests exact mounted volume ROOT directly under `/Volumes` using hidden (not echoing) terminal input; diskutil info -plist must establish mount root, physical `Internal=false`, External if DeviceLocation available, matching mount identifier and writable. Owner must explicitly type `COPY_ENCRYPTED_RECOVERY` locally. Only then create new, non-overwritten directory `OmniRoute_P2B_K2_Recovery` (0700) and `secret_key_recovery.gpg` (0600, O_EXCL/O_NOFOLLOW) on the external volume; stream/copy only ciphertext, fsync, independently re-open and verify external bytes/SHA, rehash original source and confirm target device identity unchanged. No original keyring, raw diagnostics, private fingerprint/UID, passphrase or plaintext export is transferred. External volume path is NOT emitted, only directory and fixed file name. Any failed partial copy requires private owner review, never overwrite or claim success.

### Exact next macOS command — PR #67 COPY-ONLY

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2b-k2-offdevice-custody-r1"
COMMIT="15350b37d2644de04526dbd191346ff097c6600a"
FILE="scripts/qualification/current-freellmapi-p2b-k2-offdevice-ciphertext-copy-r1.py"
SCRIPT="$HOME/Downloads/omniroute_p2b_k2_offdevice_ciphertext_copy_r1.py"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2B_K2_EXTERNAL_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "10912" ] || { echo FAIL_P2B_K2_EXTERNAL_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "f77b0c0b90c50e05b7b89c894c1cc40573194116" ] || { echo FAIL_P2B_K2_EXTERNAL_BLOB; exit 1; }
python3 -B -c 'import ast,pathlib,sys;ast.parse(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"));print("p2b_k2_external_python_syntax=PASS")' "$SCRIPT" || exit 1
python3 -B "$SCRIPT" --self-test || { echo FAIL_P2B_K2_EXTERNAL_SYNTHETIC_SELFTEST; exit 1; }
echo "p2b_k2_external_source_and_fixture=PASS"
shasum -a 256 "$SCRIPT"
python3 -B "$SCRIPT"
)
~~~

**On owner Mac:** ensure external disk is MOUNTED before running. Enter only its volume ROOT at script's hidden local prompt, never type it into chat. Confirm `COPY_ENCRYPTED_RECOVERY` on-screen. If `Internal=false` or POSIX owner/mode controls cannot be established, script fails closed; select a suitable owner-controlled independent external encrypted medium, do not bypass. Script creates ciphertext-only external `OmniRoute_P2B_K2_Recovery/secret_key_recovery.gpg`, never a plaintext private-key file.

Expected after actual Mac copy success:
`external_encrypted_copy_independent_readback_sha256=PASS`;
`external_encrypted_copy_sha256=59cd8704137c342266a5685cbea2bbd976950ffa223225f1e5e12a136f1061c3`;
`original_encrypted_wrapper_checksum_nonmutation=PASS`;
`encrypted_recovery_copy_is_on_os_reported_EXTERNAL_media=PASS`;
`RESULT=PASS_P2B_K2_EXTERNAL_CIPHERTEXT_COPY_AND_SHA_R1`.

**Final human custody action remains separate:** Safely EJECT the external drive and RETAIN it physically apart from the original Mac. Privately preserve BOTH distinct owner key passphrase and AES256 wrapper passphrase and recovery notes. User should then confirm only that independent custody/ejection and two-passphrase recoverability exist, WITHOUT providing actual passphrases, drive path, recipient identifier or protected backup file in chat. A script PASS shows byte-identical encrypted artifact on mounted physically external media, NOT actual ejection or later custody.

Existing previously scoped P2B exact original immutable image and potentially credential-bearing Docker config direct-to-encryption preservation stays BLOCKED until BOTH successful external copy evidence and user custody confirmation + local intended-recipient approval. P2C coherent writer-quiesced complete production volume backup, P2D real-data isolated restoration, P2E original live service changes, and activation of default-OFF/frozen PR #51 remain separate unapproved gates. `ROLLBACK_READY=NO`.

**NEXT_GATE=OWNER_EXECUTE_EXTERNAL_CIPHERTEXT_ONLY_COPY_AND_VERIFY_R1**.

## 26. 2026-10-03 P2B-K2 external ciphertext copy actual Mac PASS; safe ejection and separate custody next

Supersedes §25's PR #67 Mac execution pending marker. Operator fetched exact private draft PR #67 HEAD **15350b37d2644de04526dbd191346ff097c6600a**, Git blob **f77b0c0b90c50e05b7b89c894c1cc40573194116**, exactly **10912 bytes**, local script SHA-256 **2ed8fc938737a28f47037adca6d85dd93e8f0f1ede4d21b1588f947b98901a4d**. Ref/size/blob, Python AST and embedded synthetic external-volume fixture PASS. Exact Mac result **`RESULT=PASS_P2B_K2_EXTERNAL_CIPHERTEXT_COPY_AND_SHA_R1`**.

Operator selected an actual externally mounted writable macOS disk privately via the hidden prompt (the drive's name, actual path, identity and UUID were NOT given to ChatGPT/GitHub) and explicitly entered local `COPY_ENCRYPTED_RECOVERY`. Script copied ONLY existing already-AES256-encrypted `secret_key_recovery.gpg`, **732 bytes**. Destination fresh directory `OmniRoute_P2B_K2_Recovery` mode0700, encrypted copy mode0600. macOS `diskutil` external device check and writable matching mountpoint PASS; external device identity stable during transfer; independent external re-read SHA256 **59cd8704137c342266a5685cbea2bbd976950ffa223225f1e5e12a136f1061c3** matched original PRE/POST; source encrypted wrapper SHA nonmutation PASS. No GPG key operation, wrapper decrypt, original private keyhome/raw private-key packet export, Docker/current production image/configuration/data-volume access, service mutation, provider/network action or L1C-C activation.

PR #66 preceding owner Mac R3: independently imported the SAME existing protected recovery into a separate fresh short-path GNUPGHOME (wrapper decrypt rc0; secret import rc0; primary/Cv25519 encryption subkey match; new synthetic decrypt PASS), original ciphertext unchanged, disposable test home removed. Combined qualification:
`LOCAL_RECOVERED_KEY_CRYPTOGRAPHIC_PROOF=PASS`
`EXTERNALLY_MOUNTED_MEDIA_ENCRYPTED_RECOVERY_COPY_AND_READBACK=PASS_732_BYTES`.

**Exact outstanding gate, NOT yet passed:** Actual PR #67 operator output explicitly states:
~~~
owner_physical_ejection_and_separate_custody=STILL_PENDING
owner_two_passphrase_recovery_custody=NOT_VERIFIABLE_BY_SCRIPT
production_image_config_export=BLOCKED_NOT_EXECUTED
next_gate=OWNER_CONFIRM_EXTERNAL_MEDIA_SEPARATION_AND_TWO_PASSPHRASE_CUSTODY
~~~

Owner should SAFELY EJECT external drive through macOS and physically retain it away from original Mac. Independently preserve/reconfirm access to BOTH distinct original GPG private-key passphrase AND AES256 recovery-wrapper passphrase and concise private recovery instructions (never paste either, local drive path, UUID, original key fingerprint, private diagnostics, recipient_candidate.private or recovery artifact to ChatGPT/GitHub). Owner may attest ONLY simple nonsensitive booleans: external media was safely ejected, drive is separately held, original private-key passphrase remains available, AES256 wrapper passphrase remains available. If any is uncertain, keep corresponding gate PENDING; do not infer from PR #67's file-copy PASS. The exact intended recipient must also be locally confirmed using the private selector before any production-secret-bearing export.

After affirmative owner custody/recipient confirmation, stage a new single-purpose pinned current immutable Docker IMAGE and exact potentially secret-bearing Docker recreation CONFIG preservation script under the previously authorized narrow PR #57, streaming directly into encryption with zero plaintext persistent writes and original app-volume/service nonmutation. This does NOT automatically execute export, authorize P2C production `/app/data` backup/writer quiescence, P2D real-data isolated restore, P2E service action, live model/provider calls or default-OFF PR #51 L1C-C merge/activation. `ROLLBACK_READY=NO`.

Private GitHub records: PR #66 accepted same-Mac recovered-key PASS, draft PR #67 now recorded external encrypted recovery copy PASS; controlling PRM #45 updated. Public `docs/project/CURRENT_STATUS.md` §54 records same scope. Frozen PR #67 HEAD remains **15350b37d2644de04526dbd191346ff097c6600a**, blob **f77b0c0b90c50e05b7b89c894c1cc40573194116**; no need to rerun it, and it deliberately refuses overwriting the new external recovery folder.

**NEXT_GATE=OWNER_CONFIRM_EXTERNAL_MEDIA_SEPARATION_AND_TWO_PASSPHRASE_CUSTODY**.

## 27. 2026-10-03 owner authorizes continued P2B staging, NOT automatic physical custody — PR #68 next

Immediately after accepted PR #67 external encrypted recovery-copy PASS, owner said **"Yes, I authorize, and keep on working."** Treat as permission to continue source-only P2B qualification/preparation in user's OWN private fork, not as a factual assertion that drive has since been safely EJECTED/physically separated, or that both actual distinct passphrases are available. PRIOR real PR #67 operator result still `owner_physical_ejection_and_separate_custody=STILL_PENDING`, `owner_two_passphrase_recovery_custody=NOT_VERIFIABLE_BY_SCRIPT`. Do not overstate. No P2B production image/config export has occurred and `ROLLBACK_READY=NO`.

Previously accepted:
- PR #66 local R3: original exact pre-existing protected key was independently imported in a separate newly agent-qualified short-path GNUPGHOME; wrapper decrypt rc0, isolated secret import rc0, matching recovered primary/Cv25519 encryption subkey and fresh synthetic decrypt PASS. Preserved original keyhome and encrypted recovery wrapper.
- PR #67 real Mac: exact immutable head `15350b37d2644de04526dbd191346ff097c6600a`; script blob `f77b0c0b90c50e05b7b89c894c1cc40573194116` / 10912 bytes; local SHA `2ed8fc938737a28f47037adca6d85dd93e8f0f1ede4d21b1588f947b98901a4d`. Mounted external drive check and COPY_ENCRYPTED_RECOVERY confirmation PASS; copied ONLY existing already encrypted `secret_key_recovery.gpg` 732 bytes to new 0700/0600 external folder/file and reread independent SHA `59cd8704137c342266a5685cbea2bbd976950ffa223225f1e5e12a136f1061c3` matching source; original wrapper unchanged and destination device identity stable.

Private NEW **DRAFT PR #68** `qualification/current-freellmapi-p2b-k2-custody-recipient-admission-r1`, exactly THREE source/doc-only commits / TWO newly added files directly on frozen PR #67. HEAD **e3ce8e478d29c7bda7bd996c276bdc0b41bb82e2**.
1. `scripts/qualification/current-freellmapi-p2b-k2-owner-custody-recipient-admission-r1.py`; Git blob **a763e56d95686162c91b45b640b10671ea59b452**, **9767 UTF-8 bytes**. This script does NOT copy/decrypt/import/export any keys or use Docker/provider/network/production data/config/image. It verifies existing protected root/dedicated GPG home, 0600 private local `recipient_candidate.private` from R3, original encrypted wrapper SHA, EXACT single public+secret dedicated primary full fingerprint match and at least one SAME matching live public+secret encryption subkey key ID. All GPG listing text remains captured privately in memory; no UID, key ID, fingerprint, passphrase, external drive name/path or raw GPG errors ever printed. Then asks owner to attest ONLY four nonsecret explicit conditions in interactive terminal:
   - type `EJECTED` iff external recovery drive actually safely ejected by macOS,
   - type `SEPARATED` iff that drive is physically kept separately from the Mac,
   - type `BOTH_RETAINED` iff original GPG-key passphrase and different AES256 recovery-wrapper passphrase remain separately and privately available (NEVER paste actual values),
   - type `INTENDED` iff existing dedicated owner recipient is correct for P2B.
   Any declined/unanswered is `RESULT=PENDING_P2B_K2_OWNER_CUSTODY_AND_INTENDED_RECIPIENT_ADMISSION_R1`, never a fabricated PASS. Even positive answers are OWNER factual attestation, not independently observed physical proof. Mac syntax/synthetic fixtures and owner execution PENDING.
2. `docs/qualification/CURRENT_FREELLMAPI_P2B_K2_OWNER_CUSTODY_AND_NEXT_IMAGE_EXPORT_PLAN_20261003.md`; blob **172533f768e67601432f117b991e9da354f80f64**, **8296 UTF-8 bytes**. This is DESIGN ONLY for next separate pinned exact original immutable Docker image and potentially secret-bearing exact Docker recreation config direct-to-qualified-GPG encryption. Require fresh image/container/volume identity and canary-OFF/restarted-state checks, current host/Docker storage budget, 0700 local ciphertext destination, no plaintext image tar or raw inspect JSON disk files, pipefail + encrypted .partial atomic promote, confidential decrypt verification, sanitized manifest and before/after original deployment nonmutation. Current source secret/policy RO bind FILE CONTENTS are external dependencies, NOT collected in P2B. Full data-volume rollback remains impossible until separate P2C/P2D and P2E gates.

### EXACT next owner Mac command — R1 local factual custody and intended recipient admission only

This does not copy/modify external media or production Docker. Safely eject and independently secure the external drive BEFORE making an affirmative attestation; if not done, leave it pending.

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2b-k2-custody-recipient-admission-r1"
COMMIT="e3ce8e478d29c7bda7bd996c276bdc0b41bb82e2"
FILE="scripts/qualification/current-freellmapi-p2b-k2-owner-custody-recipient-admission-r1.py"
SCRIPT="$HOME/Downloads/omniroute_p2b_k2_owner_custody_recipient_admission_r1.py"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2B_K2_ADMISSION_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "9767" ] || { echo FAIL_P2B_K2_ADMISSION_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "a763e56d95686162c91b45b640b10671ea59b452" ] || { echo FAIL_P2B_K2_ADMISSION_BLOB; exit 1; }
python3 -B -c 'import ast,pathlib,sys;ast.parse(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"));print("p2b_k2_admission_python_syntax=PASS")' "$SCRIPT" || exit 1
python3 -B "$SCRIPT" --self-test || { echo FAIL_P2B_K2_ADMISSION_SYNTHETIC_SELFTEST; exit 1; }
echo "p2b_k2_admission_source_and_fixture=PASS"
shasum -a 256 "$SCRIPT"
python3 -B "$SCRIPT"
)
~~~

Expected ONLY after genuine owner answers and source/metadata checks PASS:
`existing_private_candidate_matches_single_dedicated_public_and_secret_primary=PASS`;
`unexpired_public_and_secret_encryption_subkey_metadata=PASS`;
`external_media_safe_ejection=OWNER_ATTESTED`;
`external_media_independent_physical_custody=OWNER_ATTESTED`;
`two_distinct_recovery_passphrase_custody=OWNER_ATTESTED`;
`owner_intended_encryption_recipient=OWNER_ATTESTED`;
`RESULT=PASS_P2B_K2_OWNER_CUSTODY_AND_INTENDED_RECIPIENT_ADMISSION_R1`.

NEVER provide external-drive name/path/serial, key recipient ID/FPR, both passphrases, original encrypted recovery file or private diagnostic contents. If one factual condition isn't met, script should produce PENDING and no export. The owner's "yes authorize" is not the missing attestation. On real PASS, next action is creating/reviewing ONE separately pinned confidential P2B original image+exact config direct-to-encryption implementation under prior scoped PR #57 authorization; do not treat this as P2C current RW /app/data volume backup, P2D isolated real-data restore, P2E original service action or L1C-C default-OFF PR #51 merge/activation.

`ROLLBACK_READY=NO`.
**NEXT_GATE=LOCAL_P2B_K2_OWNER_CUSTODY_AND_INTENDED_RECIPIENT_ADMISSION_R1**.

## 28. 2026-10-03 PR68 owner custody + intended recipient actual MAC PASS; PR69 exact-live P2B export read-only preflight

Supersedes §27's PR68 pending admission. Owner actually executed pinned PR #68 frozen HEAD **e3ce8e478d29c7bda7bd996c276bdc0b41bb82e2**, script blob **a763e56d95686162c91b45b640b10671ea59b452**, 9767 bytes; original local Mac SHA256 **88e72b0c6c3a975ef1f5b5e2fa4b1936b233e4aea4c69fed80a88fc22a1d5f11**; Git ref/size/blob/Python AST/fixture PASS. Real result **`RESULT=PASS_P2B_K2_OWNER_CUSTODY_AND_INTENDED_RECIPIENT_ADMISSION_R1`**. Existing original wrapped recovery SHA unchanged and private candidate matches the SINGLE dedicated existing public/secret primary and live matching encryption-subkey metadata. The owner explicitly typed four truthful LOCAL NON-SECRET tokens `EJECTED`, `SEPARATED`, `BOTH_RETAINED`, `INTENDED`; each was printed OWNER_ATTESTED. Thus ejection, physical custody separate from Mac, access to BOTH distinct original private-key and AES256 wrapper passphrases and owner choice of dedicated encryption recipient are now **owner-attested** (not independently physically audited). Do not ask for any actual passphrase, fingerprint, private recipient file, external media path, UUID or raw encrypted recovery file.

Preceding accepted PR #66: owner R3 independent same-Mac separate-home recovery of encrypted private key and new random synthetic decryption PASS. PR #67: owner created and independently reread existing AES256 ciphertext-only wrapper on macOS-external media 732B, SHA **59cd8704137c342266a5685cbea2bbd976950ffa223225f1e5e12a136f1061c3**, preserved original source. Prior narrowly scoped P2B original image + confidential exact Docker recreation config owner permission was recorded in PR #57; no current production archive has yet been created. PR #51 is still default OFF/source-qualified/draft/unmerged.

### NEXT private draft PR #69 — selected-metadata export preflight ONLY, Mac PENDING

- Branch: `qualification/current-freellmapi-p2b-exact-export-preflight-r1`
- Exact HEAD **6a9b959ced014f23c9b759ebe0df43e9ff7ba003**, one added commit/file based directly on frozen PR68 `e3ce8e478d29c7bda7bd996c276bdc0b41bb82e2`, zero behind
- ONE source: `scripts/qualification/current-freellmapi-p2b-exact-export-readonly-preflight-r1.sh`
- Git blob **b23430c4f03c769445dfb609eea3303ea2a02775**, exactly **10776 UTF-8 bytes**. GitHub source/diff readback complete; Mac Bash syntax and actual execution PENDING.

The R1 script uses ONLY tightly selected Docker Go template metadata and aborts on drift in original immutable running container ID **1f42509a5cd8dc8cb317797d7e8fc120325aaf23009c4b87ef59c8f5e73214a2**, running IMAGE **sha256:873977ab3cc6b1e4a25c88a0afb00dfee6cda1f90fb855f5d9aa32c28d424d49**, health healthy, no restarts/OOM, canary-on strings absent, attached current named RW /app/data volume, expected mount DESTINATIONS/type/RW including exactly three external RO secret/policy binds (never prints SOURCE paths/values), loopback published 20128/20129/20132 ports, exact original Docker network `mer-gateway_default`. The original local repo HEAD **470a9eb5d5014c0df116c9e3c5b6ae3853bda021** and status fingerprint must remain unchanged. Rechecks protected keyhome/candidate/wrapper and original wrapper SHA, performs one private **fabricated-only** GPG encryption/decryption roundtrip with the locally intended owner public recipient, preserves GPG private stderr in new chmod0700 evidence root without printing private identities/passphrases. Estimates fresh host Downloads free KiB vs 2*reported immutable image size+1GiB; Docker VM capacity and actual saved image/encrypted output lengths remain UNKNOWN and are NOT claimed. Source reads NO current production volume data or full potentially sensitive Docker inspect JSON and writes NO protected image/config export, does NOT stop/start containers, create helpers, load images, call provider/network or enable canary. Rechecks original Docker selected identity and original Git worktree nonmutation at exit.

### Exact next owner Mac command — PR69 read-only P2B export PREFLIGHT, not actual export

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2b-exact-export-preflight-r1"
COMMIT="6a9b959ced014f23c9b759ebe0df43e9ff7ba003"
FILE="scripts/qualification/current-freellmapi-p2b-exact-export-readonly-preflight-r1.sh"
SCRIPT="$HOME/Downloads/omniroute_p2b_exact_export_readonly_preflight_r1.sh"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2B_PREFLIGHT_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "10776" ] || { echo FAIL_P2B_PREFLIGHT_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "b23430c4f03c769445dfb609eea3303ea2a02775" ] || { echo FAIL_P2B_PREFLIGHT_BLOB; exit 1; }
/bin/bash -n "$SCRIPT" || { echo FAIL_P2B_PREFLIGHT_BASH_SYNTAX; exit 1; }
echo "p2b_exact_export_preflight_source_integrity_and_syntax=PASS"
shasum -a 256 "$SCRIPT"
/bin/bash "$SCRIPT"
)
~~~

If an original live identity, mounts, network, loopback ports, original repository HEAD/status, GPG roundtrip or storage rough-floor check fails, STOP; do not relax a guard or try the actual export. Expect ONLY after owner Mac execution `RESULT=PASS_P2B_EXACT_IMAGE_CONFIG_EXPORT_PREFLIGHT_R1`, while output still says `production_image_export=NOT_EXECUTED`, `production_exact_config_export=NOT_EXECUTED` and `rollback_ready=NO`. Private GPG diagnostic/evidence root should remain local; never share raw diagnostic files, passwords, fingerprints or sensitive Docker info.

Once actual fresh preflight PASS, create a NEW SOURCE-PINNED separate owner-scoped P2B production **exact immutable image** and **secret-bearing exact container-recreation inspect JSON** direct-to-public-recipient GPG ciphertext export: no plaintext archive/inspect persistent file, pipefail, atomic success-only ciphertext promotion, confidential non-extracting TAR and JSON decrypt validation, pre/post original live identity check and sanitized ciphertext size/SHA manifest. Existing policy/token RO bind file CONTENTS are separate external dependencies, not copied in P2B. Even this future image+config PASS is NOT complete current-service rollback: P2C coherent full current RW /app/data volume backup (writer quiescence), P2D isolated real-data restoration and P2E service return are separate unapproved gates; L1C-C activation remains separately unapproved, PR51 default OFF.

`P2B_K2_OWNER_CUSTODY_RECIPIENT_ADMISSION=OWNER_MAC_PASS`; `P2B_EXACT_IMAGE_ARCHIVE=NOT_CREATED`; `P2B_CONFIDENTIAL_EXACT_CONFIG_ARCHIVE=NOT_CREATED`; `ROLLBACK_READY=NO`.

**NEXT_GATE=LOCAL_P2B_EXACT_IMAGE_CONFIG_EXPORT_READONLY_PREFLIGHT_R1**.

## 29. 2026-10-03 actual PR69 P2B preflight FAIL at original-home synthetic decryption; PR70 private read-only diagnosis

Supersedes §28's pending PR69 execution. Owner fetched frozen PR #69 HEAD **6a9b959ced014f23c9b759ebe0df43e9ff7ba003**, Git blob **b23430c4f03c769445dfb609eea3303ea2a02775**, **10776 bytes**, operator Mac SHA256 **f1e9b63e55cca850372e281378ffdee766f37673f3578031c2c09e4bb1b612e4**. Ref/size/blob and Bash -n PASS. Real execution selected-only read-only checks PASS: original local worktree HEAD; current running healthy exact original container + immutable image, restart0/OOMfalse/canary-OFF; current named RW /app/data volume metadata; three external token/policy RO bind DESTINATION/type/RW; loopback host ports and `mer-gateway_default`; restricted original private GNUPGHOME/recipient selector/AES256 wrapper fixed SHA. No raw secret-bearing Docker inspect JSON, token source paths or contents printed/read. Synthetic GPG encrypt to intended dedicated public recipient PASSED (a nonempty synthetic ciphertext file was created), but synthetic decrypt using ORIGINAL dedicated GNUPGHOME failed:
~~~
FAIL_OWNER_GPG_SYNTHETIC_DECRYPT
original_live_identity_nonmutation=PASS
original_worktree_head_and_status_nonmutation=PASS
private_synthetic_evidence_root=/Users/zarthras/Downloads/omniroute_p2b_export_preflight_r1_LvKhBK64
private_GPG_diagnostic_do_not_share=YES
production_image_export=NOT_EXECUTED
production_exact_config_export=NOT_EXECUTED
production_volume_read_or_backup=NO
original_live_service_mutation=NO
rollback_ready=NO
RESULT=FAIL_P2B_EXACT_IMAGE_CONFIG_EXPORT_PREFLIGHT_R1
~~~

IMPORTANT: PR69 host free-space planning check was AFTER the failed decrypt and NOT REACHED. Actual original-image/config export NEVER started; prior accepted PR #66 R3 SAME protected key independently imported to separately agent-qualified SHORT test GNUPGHOME and correctly decrypted fabricated data, and PR68 original dedicated public/secret key metadata still PASS. Do NOT invent GPG decrypt root cause or invalidate the separate-home proof, and do NOT run PR69 unchanged a second time. The exact previous 0700 local evidence directory contains `synthetic_only.gpg` and mode0600 `private_gpg_diagnostic.txt` with both successful ENCRYPT and failed DECRYPT stderr concatenated. These must remain PRIVATE; DO NOT paste raw GPG messages, GPG key IDs, fingerprints, UID, personal volume paths, private passphrases, original GNUPGHOME or actual wrapped secret file into chat/GitHub.

### New PRIVATE DRAFT PR #70: fixed-category original-home decrypt error classifier (owner Mac PENDING)

- Branch: `qualification/current-freellmapi-p2b-original-gpg-decrypt-diagnostic-r1`
- Frozen HEAD **fb78db3ef7575b3984b286501d4b3dc0a791a934** directly above unchanged PR #69 **6a9b959ced014f23c9b759ebe0df43e9ff7ba003**
- Exactly ONE added Python source: `scripts/qualification/current-freellmapi-p2b-original-gpg-decrypt-diagnostic-r1.py`
- Git blob **97b7c698767bf7db234b0cdd00b9e617304ffbc0**, **11783 UTF-8 bytes**, one commit ahead/zero behind parent, source/diff readback verified.
- Script reads ONLY bounded existing prior private PR69 GPG error file locally into memory, checks exact private evidence dir and prior synthetic ciphertext file's owner/type/mode/size/PRESENCE only (does not decrypt synthetic file), rechecks original existing AES256 private-key recovery-wrapper SHA **59cd8704137c342266a5685cbea2bbd976950ffa223225f1e5e12a136f1061c3** before/after; emits only fixed YES/NO indicators for missing private secret key, general decrypt, pinentry/TTY, GPG agent socket/start/transfer/broken pipe, passphrase/cancel, key-material/format, file/permission, agent storage or missing public key. These are overlap-prone indicators from combined ENCRYPT+DECRYPT stderr, not a conclusive RCA.
- Queries local `gpgconf --homedir ORIGINAL --list-dirs agent-socket` for original socket **path length only**, socket presence/type/owner (never string), optionally `gpg-connect-agent --homedir ORIGINAL --no-autostart 'GETINFO pid' /bye` ONLY for a present owner-owned socket. Captures stdout/PID/stderr PRIVATELY, emits only fixed contact result, does NOT autostart an agent or call GPG decryption/import/export/key-list/generation. No Docker, production file, external network/provider or live app action. `--self-test` uses synthetic strings only.

### Exact next owner Mac one-command continuation — PR #70 diagnostic ONLY

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2b-original-gpg-decrypt-diagnostic-r1"
COMMIT="fb78db3ef7575b3984b286501d4b3dc0a791a934"
FILE="scripts/qualification/current-freellmapi-p2b-original-gpg-decrypt-diagnostic-r1.py"
SCRIPT="$HOME/Downloads/omniroute_p2b_original_gpg_decrypt_diagnostic_r1.py"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2B_GPG_DIAGNOSTIC_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "11783" ] || { echo FAIL_P2B_GPG_DIAGNOSTIC_SCRIPT_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "97b7c698767bf7db234b0cdd00b9e617304ffbc0" ] || { echo FAIL_P2B_GPG_DIAGNOSTIC_SCRIPT_BLOB; exit 1; }
python3 -B -c 'import ast,pathlib,sys;ast.parse(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"));print("p2b_gpg_diagnostic_python_syntax=PASS")' "$SCRIPT" || exit 1
python3 -B "$SCRIPT" --self-test || { echo FAIL_P2B_GPG_DIAGNOSTIC_SYNTHETIC_SELFTEST; exit 1; }
echo "p2b_gpg_diagnostic_source_and_fixture=PASS"
shasum -a 256 "$SCRIPT"
python3 -B "$SCRIPT"
)
~~~

Expected ONLY after actual owner Mac execution: `original_AES256_recovery_wrapper_sha_nonmutation=PASS`, `prior_PR69_synthetic_ciphertext_nonempty=PASS`, fixed `original_gpg_private_diagnostic_*=YES/NO` categories, `original_current_agent_socket_state`, `original_current_agent_no_autostart_contact`, `existing_encrypted_wrapper_postcheck=PASS`, and terminal `RESULT=PASS_P2B_ORIGINAL_GPG_DECRYPT_FAILURE_DIAGNOSTIC_R1`. This would pass the **diagnostic**, NOT the previously failed original GPG private-key decryption or current P2B image/config export. If expected PRIVATE files are missing/permissions drift, STOP rather than lowering bounds or printing raw GPG output. On real output, stage a minimal cause-specific original GPG-agent/pinentry correction and separately rerun NEW synthetic-only P2B preflight; only after that PASS contemplate a separately PINNED confidential P2B export under existing narrow PR57 consent.

Current immutable exact original image not saved; raw secret-bearing original Docker config not preserved; current live RW volume no coherent snapshot; no P2C/P2D/P2E owner consent; PR51 default OFF/draft/unmerged; ROLLBACK_READY=NO.

**NEXT_GATE=LOCAL_P2B_ORIGINAL_GPG_DECRYPT_DIAGNOSTIC_R1**.

## 30. 2026-10-03 PR70 Mac diagnosis PASS; original GPG decrypt unresolved; PR71 one-shot synthetic terminal refresh

Supersedes §29's diagnostic-pending statement. Operator executed frozen PR70 HEAD **fb78db3ef7575b3984b286501d4b3dc0a791a934**, Git blob **97b7c698767bf7db234b0cdd00b9e617304ffbc0**, 11783 bytes; local script SHA256 **29ce1203c1800697b9217179a50fa1e32572ac40fcb4d7c4e89e9ebb1f4ab6f9**; source/ref/size/blob, Python AST and synthetic fixture PASS. Actual `RESULT=PASS_P2B_ORIGINAL_GPG_DECRYPT_FAILURE_DIAGNOSTIC_R1` is **DIAGNOSTIC ONLY, NOT the original private-key decryption**. Existing owner encrypted recovery wrapper still matches original SHA `59cd8704137c342266a5685cbea2bbd976950ffa223225f1e5e12a136f1061c3` (pre and post); existing prior PR69 synthetic ciphertext and restricted private combined encrypt/decrypt error log nonempty. Sanitized boolean error taxonomy: `public_key_decryption_reported_failed=YES`, `general_decryption_failed=YES`, but `no_secret_key=NO`, `pinentry_or_tty=NO`, `agent_socket_or_start=NO`, `agent_transport_or_broken_pipe=NO`, `passphrase_or_unlock=NO`, `cancelled_or_declined=NO`, `key_material_or_format=NO`, `filesystem_or_permissions=NO`, `agent_key_storage=NO`, `missing_public_key=NO`. Overlapping regex/combined stderr does NOT prove cause or conclusively rule out a problem absent from patterns. Original current gpgconf agent socket **89/89 bytes reported/resolved**, `PRESENT_OWNED_SOCKET`, `gpg-connect-agent --no-autostart GETINFO pid` `CONTACT_PASS`; this is agent responsiveness, NOT proof of usable private-key decrypt. Original PR69 dedicated-home new synthetic decrypt remains FAILED. PR66 R3 separate-home protected-key recovery + new synthetic decrypt PASS and PR67/PR68 independently kept external encrypted wrapper/custody/owner-recipient admission remain valid. No actual Docker production image/config export, current RW volume archive or live service mutation has happened.

### Private DRAFT PR #71 — one reviewed original-agent terminal update, ONE new fabricated roundtrip

- Branch: `qualification/current-freellmapi-p2b-original-agent-tty-synthetic-r1`
- Frozen final HEAD **8cdb7aa04567d7a98846ce065d464fe27cb33577**; base frozen PR70 HEAD **fb78db3ef7575b3984b286501d4b3dc0a791a934**
- Exactly ONE ADDED Python standard-library script: `scripts/qualification/current-freellmapi-p2b-original-agent-tty-synthetic-roundtrip-r1.py`
- Git blob **a50024bce859cce795d8939e9d2414e0bb276368**, exactly **15501 UTF-8 bytes**, three narrow commits ahead/zero behind, GitHub source readback verified.
- First privately reads existing old PR69 GPG stderr into bounded memory and maps the exact `public key decryption failed:` suffix to ONE finite nonsecret error category (never raw error), checks protected original dedicated private owner GPG home/recipient candidate and immutable AES256 secret-recovery wrapper SHA. Real interactive TTY plus actual current owned agent socket and path <=95 reported/resolved bytes and `gpg-connect-agent --no-autostart GETINFO pid` PASS are required. No production Docker, network, provider or RW-volume access.
- Owner must explicitly type `TEST_SYNTHETIC`; then creates a UNIQUE new owner-private chmod0700 local Downloads synthetic-evidence directory (existing directory blocks unchanged rerun). Refreshes only the EXISTING original local agent's terminal/display routing using documented `gpg-connect-agent --homedir ORIGINAL --no-autostart UPDATESTARTUPTTY`, with no agent kill/restart, persistent config edit or original key modification. The refresh is a testable hypothesis, **NOT** a confirmed historical cause.
- Generates a new fabricated 64-byte random challenge in process memory, encrypts it to the owner-qualified existing recipient, then does exactly ONE original-home decrypt using normal local GPG pinentry (NO passphrase argv/env, NO loopback). All raw GPG status/identities/errors saved ONLY inside private 0600 local `encrypt_gpg_PRIVATE.txt` and `decrypt_gpg_PRIVATE.txt`; terminal prints only fixed status CODE boolean markers and exact synthetic-match result. Private original AES256 recovery-wrapper SHA rechecked on test failure or success. Does NOT decrypt original wrapped secret, recreate/reexport key, copy external drive or create protected production image/config. If this fails, DON'T run unchanged again or proceed to export.
- Note source bug fix before final HEAD: Python `subprocess.run(input=...)` now does not specify a duplicate `stdin` argument; synthetic fixture test exercises /bin/cat on fabricated input. Agent Assuan protocol checks reject any `ERR` even when `/bye` returns `OK`.
- Only after actual Mac synthetic roundtrip PASS: stage a NEW pinned original-live identity+HOST-capacity P2B preflight R2; prior PR69 stopped before free-space stage, so its capacity must NEVER be claimed PASS. Subsequent actual image/config direct-to-encryption under PR57 narrow consent will be a separate review. P2C/P2D/P2E and PR51 default-OFF L1C-C activation remain separately unapproved; ROLLBACK_READY=NO.

### Exact next Mac command — PR71 original-home synthetic test ONLY

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2b-original-agent-tty-synthetic-r1"
COMMIT="8cdb7aa04567d7a98846ce065d464fe27cb33577"
FILE="scripts/qualification/current-freellmapi-p2b-original-agent-tty-synthetic-roundtrip-r1.py"
SCRIPT="$HOME/Downloads/omniroute_p2b_original_agent_tty_synthetic_roundtrip_r1.py"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2B_TTY_SYNTH_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "15501" ] || { echo FAIL_P2B_TTY_SYNTH_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "a50024bce859cce795d8939e9d2414e0bb276368" ] || { echo FAIL_P2B_TTY_SYNTH_BLOB; exit 1; }
python3 -B -c 'import ast,pathlib,sys;ast.parse(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"));print("p2b_tty_synthetic_python_syntax=PASS")' "$SCRIPT" || exit 1
python3 -B "$SCRIPT" --self-test || { echo FAIL_P2B_TTY_SYNTH_SELFTEST; exit 1; }
echo "p2b_tty_synthetic_source_and_fixture=PASS"
shasum -a 256 "$SCRIPT"
python3 -B "$SCRIPT"
)
~~~

At the owner confirmation prompt type ONLY `TEST_SYNTHETIC` if authorizing the single original local GPG-agent startup-TTY update and one synthetic decrypt. Existing original secret-key passphrase, **if** GPG pinentry requests it, is entered LOCALLY only. No actual passphrase or fingerprint, private diagnostic file or original encrypted key wrapper is to be pasted/uploaded. Conditional PASS markers:
`original_existing_AES256_recovery_wrapper_sha_before=PASS`;
`original_existing_agent_contact_before_refresh=PASS`;
`existing_original_agent_startup_tty_update=PASS`;
`new_synthetic_encryption_exit_zero=YES`;
`new_synthetic_original_home_decryption_exit_zero=YES`;
`original_dedicated_home_new_synthetic_exact_decryption=PASS`;
`original_AES256_recovery_wrapper_sha_postcheck=PASS`;
`RESULT=PASS_P2B_ORIGINAL_AGENT_TTY_SYNTHETIC_ROUNDTRIP_R1`.
A script PASS is SYNTHETIC-only qualification, NOT P2B image/config export or full rollback. On FAIL, keep raw logs private and review only safe summary; no blind repeat or bypass.

**NEXT_GATE=LOCAL_P2B_ORIGINAL_AGENT_TTY_SYNTHETIC_ROUNDTRIP_R1**.

**FINAL PIN CORRECTION:** A third script-only commit hardens Python subprocess GPG output using `os.umask(0o077)` before any fabricated ciphertext is created. The previous provisional PR71 HEAD `bb563e05884d6304fa10bac6496f332594fa2272` is **SUPERSEDED** and must NOT be fetched or run. Frozen FINAL HEAD **8cdb7aa04567d7a98846ce065d464fe27cb33577**, Git blob **a50024bce859cce795d8939e9d2414e0bb276368**, **15501 UTF-8 bytes**. The exact command above already reflects these final pins. Operator Mac run still PENDING.

## 31. 2026-10-03 actual PR71 original GPG roundtrip PASS; PR72 exact-live and host capacity preflight

Supersedes §30's PR71 Mac PENDING. Owner first repeated old PR70 diagnostic output (identical prior evidence; not a new test) then fetched frozen FINAL PR71 HEAD **8cdb7aa04567d7a98846ce065d464fe27cb33577**, blob **a50024bce859cce795d8939e9d2414e0bb276368**, 15501 UTF-8 bytes, local Mac script SHA256 **d0fce521ace9cf6ada987dde47c4b0c3e21c3f1471d39353eb1117a50186efdb**; Git pin/size/blob, Python AST and fabricated-only selftest PASS. Real Mac PR71:
~~~
original_existing_AES256_recovery_wrapper_sha_before=PASS
prior_PR69_public_key_decrypt_subreason_category=TIMEOUT
original_agent_socket_reported_bytes=89
original_agent_socket_resolved_socket_bytes=89
original_existing_agent_contact_before_refresh=PASS
existing_original_agent_startup_tty_update=PASS
new_synthetic_encryption_exit_zero=YES
new_fabricated_ciphertext_private_mode0600=PASS
new_synthetic_gpg_status_decryption_okay=YES
new_synthetic_gpg_status_decryption_failed=NO
new_synthetic_gpg_status_pinentry_launched=YES
new_synthetic_gpg_status_no_seckey=NO
new_synthetic_gpg_status_error=NO
new_synthetic_gpg_status_failure=NO
new_synthetic_original_home_decryption_exit_zero=YES
original_dedicated_home_new_synthetic_exact_decryption=PASS
original_AES256_recovery_wrapper_sha_postcheck=PASS
original_agent_terminated=NO
Docker_production_export=NOT_EXECUTED
current_RW_volume_backup=NOT_EXECUTED
rollback_ready=NO
RESULT=PASS_P2B_ORIGINAL_AGENT_TTY_SYNTHETIC_ROUNDTRIP_R1
~~~
Operator explicitly entered `TEST_SYNTHETIC`, performed a single no-autostart UPDATESTARTUPTTY on current original agent (no agent kill/restart/key reexport), and exactly decrypted a NEW fabricated challenge through the ORIGINAL dedicated existing keyhome. Earlier PR69 synthetic decrypt FAILED, prior private `public key decryption failed:` subreason categorized **TIMEOUT**; PR71 successful GPG pinentry after refresh supports a possible stale terminal routing issue but DOES NOT retrospectively establish cause. Original real AES256 recovery key wrapper ciphertext SHA **59cd8704137c342266a5685cbea2bbd976950ffa223225f1e5e12a136f1061c3** intact. PR66 independent recovered-key separate GNUPGHOME proof, PR67 owner-mounted external encrypted 732-byte backup matching source, PR68 owner attested safe ejection/separate storage/two different passphrases/correct recipient remain PASS. Do not upload PR69 private GPG error file, PR71 private log/status/UID/FPR/key material or any passphrase. No production Docker image/config/RW data volume preservation has taken place.

### Private DRAFT PR #72 — fresh P2B original metadata plus previously unreached host capacity check

- Branch `qualification/current-freellmapi-p2b-exact-metadata-capacity-preflight-r2`, exact frozen HEAD **7ba63303fcd28cfc3f7297111b3a4c254439f1fc**, child of frozen PR71 **8cdb7aa04567d7a98846ce065d464fe27cb33577**.
- Exactly **ONE new Bash script** across two narrow commits/zero behind: `scripts/qualification/current-freellmapi-p2b-exact-metadata-capacity-preflight-r2.sh`, Git blob **1b9e9d2e4cfdaa97a431520afaae2a03350db2e6**, **12814 UTF-8 bytes**. GitHub source readback and one-file compare verified, actual Mac Bash syntax/run PENDING.
- Revalidates original source worktree HEAD `470a9eb5d5014c0df116c9e3c5b6ae3853bda021`, exact ORIGINAL running healthy FreeLLMAPI container ID `1f42509a5cd8dc8cb317797d7e8fc120325aaf23009c4b87ef59c8f5e73214a2`, original immutable image ID `sha256:873977ab3cc6b1e4a25c88a0afb00dfee6cda1f90fb855f5d9aa32c28d424d49`, current attached production RW named /app/data volume `omniroute-r16-32-freellmapi-live-f8bc751312da-20260923T053117Z` METADATA ONLY, health/restart/OOM/OFF canary and THREE external token/policy RO bind DESTINATIONS/type/RW without original source path/secret bytes. Verify loopback host port 20128/20129/20132 and Docker network `mer-gateway_default`. No raw possibly secret-bearing inspect JSON output, provider/network, actual volume read, Docker helper/container stop/restart or image save.
- Checks existing protected dedicated GPG keyhome, original mode0600 recipient selector full FPR **privately within a short-lived Python process**, original AES256 recovery ciphertext SHA above. Looks only at existing PR71 `~/Downloads/omniroute_p2b_original_agent_tty_synthetic_r1_PRIVATE` synthetic-only encrypted fixture and 0600 saved status-file owner/type/mode/size, confirms bounded saved `[GNUPG:] DECRYPTION_OKAY` and no failure status **without printing raw status or RETRYING the GPG decrypt**. Actual operator PR71 PASS is authoritative for the synthetic roundtrip.
- Host Downloads free KiB and immutable image Docker-inspected size are checked against conservative host planning floor **2 × 3049822395 bytes in KiB + 1GiB**; actual `docker image save` output and Docker Desktop VM capacity NOT measured. Postcheck original selected Docker/container identity, original repo worktree HEAD/status and recovery-wrapper fixed SHA unchanged. No actual production IMAGE/CONFIG ciphertext is created here.
- If any drift or insufficient estimated host capacity, fail closed and do NOT run export. Even PASS is metadata/host planning preflight, NOT full rollback or proof Docker VM capacity.

### EXACT next Mac command — PR72 read-only selected metadata and host capacity, NOT image export

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2b-exact-metadata-capacity-preflight-r2"
COMMIT="7ba63303fcd28cfc3f7297111b3a4c254439f1fc"
FILE="scripts/qualification/current-freellmapi-p2b-exact-metadata-capacity-preflight-r2.sh"
SCRIPT="$HOME/Downloads/omniroute_p2b_exact_metadata_capacity_preflight_r2.sh"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2B_PREFLIGHT_R2_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "12814" ] || { echo FAIL_P2B_PREFLIGHT_R2_SCRIPT_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "1b9e9d2e4cfdaa97a431520afaae2a03350db2e6" ] || { echo FAIL_P2B_PREFLIGHT_R2_SCRIPT_BLOB; exit 1; }
/bin/bash -n "$SCRIPT" || { echo FAIL_P2B_PREFLIGHT_R2_BASH_SYNTAX; exit 1; }
echo "p2b_metadata_capacity_r2_source_integrity_and_syntax=PASS"
shasum -a 256 "$SCRIPT"
/bin/bash "$SCRIPT"
)
~~~

Expected ONLY after real Mac proof:
`PR71_existing_original_home_decryption_okay_status=PASS_RECORDED_NOT_RETRIED`;
`original_active_worktree_head=PASS_EXPECTED`;
`exact_original_live_container_image_health_restart_and_OFF_canary=PASS`;
`original_loopback_host_ports_and_network_metadata=PASS`;
`host_space=PASS_ESTIMATE_ONLY`;
`original_live_identity_nonmutation=PASS`;
`original_worktree_head_and_status_nonmutation=PASS`;
`original_encrypted_recovery_wrapper_sha_nonmutation=PASS`;
`RESULT=PASS_P2B_EXACT_METADATA_AND_HOST_CAPACITY_PREFLIGHT_R2`.
All status and numeric host free-space markers are safe to share. Do NOT upload private GPG status/error files, original protected wrapper, original keyhome, exact raw credential-bearing Docker container inspect JSON, policy/token source paths or passphrases.

Only after R2 actual PASS: review and publish a separately PINNED narrowly consented PR57 direct-to-EXISTING-GPG-recipient encrypted preservation of exact immutable original Docker image and confidential exact container recreation configuration. Still **NO P2C current writer-quiesced /app/data full WAL snapshot, P2D real-data isolated restore, P2E service action, no L1C-C PR51 activation**. PR51 remains draft/default OFF/unmerged; `ROLLBACK_READY=NO`.

**NEXT_GATE=LOCAL_P2B_EXACT_METADATA_AND_HOST_CAPACITY_PREFLIGHT_R2**.

## 32. 2026-10-03 actual PR72 read-only original identity/host capacity PASS; PR73 scoped exact protected P2B export next

Supersedes §31's PR72 Mac pending. User fetched exact frozen private PR72 HEAD **7ba63303fcd28cfc3f7297111b3a4c254439f1fc**, script blob **1b9e9d2e4cfdaa97a431520afaae2a03350db2e6**, **12814 UTF-8 bytes**; ref/size/blob/Mac Bash -n PASS. Operator SHA256 **7437cc0d4e4d59cbd01593e57be38e9406d23ad9991195d1a505e8b198209dec**. Actual **`RESULT=PASS_P2B_EXACT_METADATA_AND_HOST_CAPACITY_PREFLIGHT_R2`**: original source HEAD, original running healthy full CID and image ID, canary OFF/restart0/OOM false, original current RW named /app/data VOLUME METADATA ONLY, three external RO token/policy mount DESTINATION/type/RW, three 127.0.0.1 host ports, network; qualified original GPG recipient and AES256 wrapper SHA nonmutation; PR71 existing private synthetic GPG DECRYPTION_OKAY check; Docker/source/wrapper post nonmutation all PASS. Available host Downloads **2155976224 KiB**, original image inspection .Size **3049822395 bytes**, conservative host planning floor **7005262 KiB**: `host_space=PASS_ESTIMATE_ONLY`. Exact Docker VM available bytes and actual image save tar/ciphertext size NOT measured. No image/config export yet. Prior independently recovered protected recipient PR66, 732B encrypted external recovery ciphertext SHA PR67, explicit owner ejection/separate custody/two private passphrases/intended recipient PR68, and original dedicated GPG keyhome NEW synthetic decrypt PR71 remain accepted. Preserve historic PR69 TIMEOUT failure as evidence but DO NOT add another blind GPG research gate.

### Private DRAFT PR #73 — one direct-to-owner-recipient encrypted P2B implementation, execution PENDING

- Branch `qualification/current-freellmapi-p2b-exact-image-config-encrypted-export-r1`
- Frozen FINAL HEAD **1e16c953626f76f20493dabb45aede9f47c53bef**, directly atop frozen PR72 HEAD **7ba63303fcd28cfc3f7297111b3a4c254439f1fc**; two small commits, ONE new Python stdlib file, zero behind.
- Source `scripts/qualification/current-freellmapi-p2b-exact-image-config-direct-encrypted-export-r1.py`
- Git blob **08ad722d06ef30a87da71fe1f0aff78ee2241631**, exactly **29300 UTF-8 bytes**, 616 source lines. Connector fetch/lineage + static trust/secrecy markers checked; **Mac Python AST and --self-test NOT YET RUN; original-image/config EXPORT NOT EXECUTED**.
- Authorized scope was explicitly and narrowly granted in private PR57: exact ORIGINAL immutable image and potentially credential-bearing exact original Docker container recreation inspect JSON encrypted locally. NOT current live /app/data SQLite/WAL data volume contents, external RO policy/token SOURCE FILE CONTENTS, provider/AI calls, new/live container, shutdown/restart, image load, deploying candidate, merging PR51 or enabling L1C-C.
- Before source stream: exact original live original container `1f42509a5cd8dc8cb317797d7e8fc120325aaf23009c4b87ef59c8f5e73214a2` and immutable image `sha256:873977ab3cc6b1e4a25c88a0afb00dfee6cda1f90fb855f5d9aa32c28d424d49`, original TAG `omniroute:r16-32-freellmapi-preactivation-f8bc751312da` pinned to ID/size, exact live RW /app/data volume name metadata, external 3 RO bind destinations/type/RW, local host ports/network/canary OFF, original repo HEAD `470a9eb5d5014c0df116c9e3c5b6ae3853bda021`, unchanged recovery-wrapper SHA **59cd8704137c342266a5685cbea2bbd976950ffa223225f1e5e12a136f1061c3**, valid protected owner FPR selector privately and fresh estimated host capacity.
- Owner enters local **`EXPORT_P2B_IMAGE_CONFIG`** before any export. Script creates ONE NEW, nonoverwritable 0700 private Downloads root `~/Downloads/omniroute_p2b_original_image_config_export_r1_PRIVATE`. Streams `docker image save` exact original validated TAG *ONLY* via anonymous plaintext pipe into GPG recipient-encrypted 0600 .partial file, producer/encrypter both exit0 required for atomic cipher rename. Confidentially decrypts ciphertext ONLY through anonymous pipe into a FULLY CONSUMED non-extracting streaming TAR validator: original manifest RepoTag + referenced layers, config JSON SHA-256 exactly equals pinned image ID, GPG rc0 and validator rc0. No TAR listing/extraction/plaintext file or secret debug text emitted/persisted. Separately streams potentially secret-bearing exact `docker container inspect ORIGINAL_CID` JSON straight into a second qualified owner-GPG ciphertext via anonymous pipe (NEVER raw inspect JSON printed or saved); verifies GPG decrypt to bounded in-memory JSON parser for original CID/image/name/current named volume, RO bind destination/type/RW, host loopback/network and canary OFF. Captures private Docker/GPG/validator stderr ONLY mode0600 locally, outputs sanitized ciphertext SHA/byte sizes and private mode0600 manifest, original full selected live/image/worktree/wrapper post nonmutation before emitting PASS. Failed partial artifacts retained privately (no silent overwrite).
- Synthesized `--self-test` fabricates tiny TAR, image config SHA/tag/layer manifest and safe synthetic inspect JSON; does NOT access owner keyring, Docker, current data or provider. AST and synthetic selftest MUST succeed before owner token and actual export.
- A possible PASS is LOCAL P2B IMAGE and encrypted CONFIDENTIAL CONFIG only. No off-device custody of these large artifacts claimed, current live /app/data RW volume NOT preserved. P2C coherent writer-quiesced WAL-aware current-volume backup, P2D isolated actual-data restore, P2E live service return and PR51 L1C-C activation are separate owner authorization gates. `ROLLBACK_READY=NO`.

### EXACT next owner Mac command — PR73 integrity + fabricated fixture; owner-confirmed scoped P2B execution

**Do not share actual local recipient identifier, passphrase, plaintext Docker inspect/env/host RO bind SOURCE, raw private GPG stderr, or private manifest contents. The encrypted Docker inspect config itself is confidential.** Run ONLY this final pinned source, not prior provisional commits:

~~~bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

REF="qualification/current-freellmapi-p2b-exact-image-config-encrypted-export-r1"
COMMIT="1e16c953626f76f20493dabb45aede9f47c53bef"
FILE="scripts/qualification/current-freellmapi-p2b-exact-image-config-direct-encrypted-export-r1.py"
SCRIPT="$HOME/Downloads/omniroute_p2b_exact_image_config_direct_encrypted_export_r1.py"

git fetch --no-tags origin "$REF" || exit 1
[ "$(git rev-parse FETCH_HEAD)" = "$COMMIT" ] || { echo FAIL_P2B_EXPORT_REF_DRIFT; exit 1; }
git show "$COMMIT:$FILE" > "$SCRIPT" || exit 1
[ "$(wc -c < "$SCRIPT" | tr -d ' ')" = "29300" ] || { echo FAIL_P2B_EXPORT_SIZE; exit 1; }
[ "$(git hash-object "$SCRIPT")" = "08ad722d06ef30a87da71fe1f0aff78ee2241631" ] || { echo FAIL_P2B_EXPORT_BLOB; exit 1; }

python3 -B -c 'import ast,pathlib,sys;ast.parse(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"));print("p2b_exact_export_python_syntax=PASS")' "$SCRIPT" || exit 1
python3 -B "$SCRIPT" --self-test || { echo FAIL_P2B_EXPORT_SYNTHETIC_FIXTURE; exit 1; }
echo "p2b_exact_export_source_and_synthetic_fixture=PASS"
shasum -a 256 "$SCRIPT"

python3 -B "$SCRIPT"
)
~~~

At owner confirmation prompt type **`EXPORT_P2B_IMAGE_CONFIG`** ONLY if approving the existing narrow P2B export now. If the qualified original GPG key is privately requested through pinentry during confidential decrypt verification, enter its existing passphrase locally only. This operation may write large ENCRYPTED ciphertext files; DO NOT upload them or the private diagnostics. Expected success ONLY after actual owner Mac run with BOTH artifacts created and their full confidential decrypt validators accepted:
`original_immutable_image_encrypted_stream=PASS`
`original_image_ciphertext_decrypt_full_tar_and_image_config_SHA=PASS`
`exact_original_container_config_encrypted_stream=PASS`
`confidential_exact_container_inspect_JSON_decrypt_and_semantics=PASS`
`original_live_identity_source_worktree_and_recovery_wrapper_nonmutation=PASS`
`original_live_identity_postcheck=PASS`, `original_git_worktree_postcheck=PASS`, `encrypted_recovery_wrapper_postcheck=PASS`
`RESULT=PASS_P2B_EXACT_IMAGE_AND_CONFIDENTIAL_CONFIG_ENCRYPTED_EXPORT_R1`.

If any step fails, STOP. Do not bypass integrity checks, retry unchanged, access current /app/data or assume full rollback. Keep private partial ciphertext/log locally and report only normal sanitized terminal markers. Once P2B accepted, return to bounded live release path; request distinct P2C authorization before coherent current live-volume capture, P2D actual-data restore and P2E interruption.

**NEXT_GATE=LOCAL_P2B_EXACT_IMAGE_AND_CONFIDENTIAL_CONFIG_DIRECT_ENCRYPTED_EXPORT_R1**.


## 33. 2026-10-03 FINAL continuity checkpoint: PR73 exists, final source pin verified; operator Mac still pending

Continue the SINGLE original Five-Pillar OmniRoute system: Codex Unified Agent interface, OmniRoute multi-provider workforce/routing authority, Auth Keeper independent credential/session authority, Intelligent Multi-Model Orchestration governed delegation/critique/synthesis, and Operations Floor visibility (not an independent router). PR51 L1C-C source-qualified 99/99, default-OFF/draft/unmerged. Own fork is authoritative; no upstream-owner wait.

Accepted history: PR66 separate-home protected-key recovery and synthetic decrypt PASS; PR67 external 732-byte AES256 recovery copy independent SHA PASS; PR68 safe external eject/separate custody/both distinct passphrases and original recipient OWNER-ATTESTED; PR69 exact selected live topology PASS but historical original-home GPG decrypt TIMEOUT; PR70 bounded diagnosis PASS; PR71 owner-approved UPDATESTARTUPTTY and NEW original dedicated-home fabricated encryption/decryption PASS; PR72 actual owner Mac exact selected-only original Docker identity, host capacity and nonmutation PASS, **not** an archive/export.

PR72 actual Mac: original immutable image inspected size 3049822395 bytes; host Downloads free 2155976224 KiB; host conservative planning floor 7005262 KiB, PASS_ESTIMATE_ONLY. Docker VM available space and actual docker image save/tar/ciphertext sizes NOT MEASURED. PR72 original container identity, attached current /app/data RW-volume NAME metadata, RO bind DESTINATIONS, loopback network, OFF canary, protected GPG recipient and encrypted recovery SHA, original repo/worktree/runtime exit nonmutation all PASS. No production archive, raw Docker configuration output, service action or /app/data FILE CONTENTS read.

**NEXT draft PRIVATE PR #73 already exists — DO NOT CREATE DUPLICATE** in Zartharas/omniroute-auth-keeper, branch qualification/current-freellmapi-p2b-exact-image-config-encrypted-export-r1, base PR72 head 7ba63303fcd28cfc3f7297111b3a4c254439f1fc; FINAL exact HEAD **1e16c953626f76f20493dabb45aede9f47c53bef**, ONE new Python file across THREE narrow commits/zero behind: scripts/qualification/current-freellmapi-p2b-exact-image-config-direct-encrypted-export-r1.py, FINAL Git blob **08ad722d06ef30a87da71fe1f0aff78ee2241631**, exactly **29300 UTF-8 bytes**. Earlier source HEAD bda77430ab2f947206b31cc64005c09e00a6ebac (29276 bytes) is SUPERSEDED. Final third source-only commit removes unnecessary read-only FD fsync; encrypted producer writable-FD fsync, SHA reread, confidential decrypt validation and final original-runtime/source/wrapper nonmutation remain enforced. Private PR73/PRM45 and public CURRENT_STATUS.md section60 updated to these FINAL pins. Connector source/lineage and static guard review PASS; Mac AST, fabricated self-test and actual one-time image/config P2B export still PENDING.

**EXACT next Mac operator command** is the existing command in section32 ABOVE after the final-head/blob/byte pins have been corrected there. It must first pass Git ref/size/blob, Python AST and synthetic --self-test; if any fails do NOT proceed. Scope uses prior narrow PR57 owner authorization. Owner locally enters only EXPORT_P2B_IMAGE_CONFIG. Script creates new private local Downloads mode0700 directory and two mode0600 ciphertext artifacts: exact immutable original Docker image save via anonymous pipe directly to existing protected-recipient GPG; separately raw potentially secret-bearing original Docker inspect JSON directly to GPG ciphertext through an anonymous pipe. No plaintext TAR/inspect JSON persisted or stdout emitted. Full private decrypt-and-consume streaming non-extracting image-TAR validation checks original manifest tag/layers and config SHA256 matching immutable ID; bounded private confidential JSON parser checks exact original container config. Encrypted outputs SHA/byte reread, producer/encrypter/decrypter/validators rc0, original live/service/worktree/wrapper final nonmutation required before PASS. Never paste private GPG/producer logs, encrypted confidential config, private manifest, GPG recipient/key fingerprint, passphrases, RO bind source contents or actual backup files into chat/GitHub.

Only after owner Mac actually prints RESULT=PASS_P2B_EXACT_IMAGE_AND_CONFIDENTIAL_CONFIG_ENCRYPTED_EXPORT_R1, record sanitized output in PR73/PRM45 and public docs and separately verify custody of new large encrypted artifacts. P2B alone does NOT back up current /app/data RW SQLite WAL contents or guarantee rollback. Request NEW explicit owner approval before P2C coherent writer-quiesced current full RW volume backup, P2D isolated actual-data restore, P2E service/rollback/canary, and later original five-pillar L1C-C product acceptance. Keep PR51 DRAFT/UNMERGED/default OFF. ROLLBACK_READY=NO. Treat P2B as a FINITE prerequisite, not a new project; avoid repetitive GPG discovery when existing proofs remain valid.

NEXT_GATE=LOCAL_P2B_EXACT_IMAGE_AND_CONFIDENTIAL_CONFIG_DIRECT_ENCRYPTED_EXPORT_R1.

## 34. 2026-10-05 P2B exact image + confidential config COMPLETE locally

Supersedes sections 32-33 execution-pending state. Private draft PR #73 remains the authoritative preservation record and no duplicate PR was created. The owner completed the corrected R3 resume on the existing PR73 branch. The already-created encrypted original image was reused rather than regenerated; corrected OCI descriptor-chain validation passed, the exact confidential container recreation configuration was encrypted and privately validated, and final original live identity/worktree/recovery-wrapper/image nonmutation checks all passed.

Exact owner terminal result: **`RESULT=PASS_P2B_EXACT_IMAGE_AND_CONFIDENTIAL_CONFIG_ENCRYPTED_EXPORT_R3_RESUME`**.

P2B is therefore complete for the exact original immutable image and confidential container recreation configuration. The encrypted artifacts remain local owner-private and off-device custody for these newly created artifacts is not yet confirmed. No plaintext TAR or inspect JSON was persisted, no current live RW `/app/data` contents were read or backed up, and no container stop/restart/load/helper/provider/canary operation was performed.

Do not repeat the image export, prior GPG discovery, OCI diagnosis or P2B validation absent new contradictory evidence. P2C coherent writer-quiesced current-volume preservation, P2D isolated real-data restore and P2E service return remain separate gates. PR51 L1C-C remains DRAFT/UNMERGED/default OFF.

`P2B_EXACT_IMAGE_AND_CONFIDENTIAL_CONFIG=OWNER_MAC_PASS`  
`P2B_ARTIFACTS=LOCAL_OWNER_PRIVATE_VALIDATED`  
`P2B_OFF_DEVICE_CUSTODY=NOT_YET_CONFIRMED`  
`P2C_CURRENT_LIVE_RW_VOLUME_BACKUP=NOT_AUTHORIZED_NOT_CREATED`  
`ROLLBACK_READY=NO`

**NEXT_GATE=OWNER_CUSTODY_REVIEW_FOR_P2B_ARTIFACTS_THEN_SEPARATE_P2C_AUTHORIZATION**. After the bounded rollback prerequisites are complete, return directly to the original five-pillar Codex Unified / controlled L1C-C production-acceptance roadmap.

## 35. 2026-10-05 P2B off-device copy integrity PASS; physical custody attestation still pending

Owner completed the bounded off-device copy for the two already validated P2B ciphertext artifacts. The destination was reported by macOS as External and was verified as a separate filesystem. External copies of both encrypted artifacts were re-read and matched their accepted byte-size and SHA-256 baselines. No plaintext artifacts were copied; current live RW `/app/data` was not accessed or preserved.

Exact result: **`RESULT=PASS_P2B_OFF_DEVICE_ENCRYPTED_ARTIFACT_CUSTODY_COPY_R1`**.

Do not record the external volume/device name in repository evidence. This proves external-copy integrity only. Safe ejection and physically separate storage remain an owner-attested custody step. P2C writer-quiesced coherent current-volume preservation, P2D isolated real-data restore and P2E service return remain separate authorization gates. PR51 stays DRAFT/UNMERGED/default OFF; `ROLLBACK_READY=NO`.

**NEXT_GATE=OWNER_ATTEST_SAFE_EJECTION_AND_SEPARATE_STORAGE_THEN_SEPARATELY_AUTHORIZE_P2C**.

## 36. 2026-10-05 safe ejection owner-attested; P2C readiness preflight is the active gate

P2B image/config preservation and off-device encrypted-copy integrity remain accepted. Owner now explicitly attests the removable copy was safely ejected. Do not infer separate physical storage unless separately stated.

New private **DRAFT PR #74** is the only next execution target and is read-only readiness only:
- branch `qualification/current-freellmapi-p2c-readiness-preflight-r1`;
- HEAD **8602981e88bf3e2c0d7bcfd529b2560c1c59c708**;
- base current PR73 HEAD **b4ef3f892c31fa6f124ca874eb1d9f74713f207a**;
- script blob **f2b642078369320f66c524a34d17976a4427fa96**, **7632 bytes**, SHA-256 **27581c30b91c43aa65fcb3a7708b5db458c34a66283426e5131b060d3e82b3fb**;
- approval-boundary doc blob **ebf25ee8166cbae8487f33685a536790bb2e8080**.

The PR74 preflight does NOT stop/restart production, create a helper, read `/app/data` file contents, open SQLite, create a snapshot, run GPG encryption/decryption, call providers or activate L1C-C. It only refreshes current exact topology/sole running volume-writer state, verifies accepted local P2B ciphertext baselines and protected recovery metadata, checks a conservative host planning floor and proves nonmutation.

After a clean PR74 Mac PASS, actual P2C still requires explicit owner maintenance-window authorization. The accepted P2A contract remains controlling: graceful stop, exclusive writer quiescence, **entire-tree** read-only capture and encryption, no hot tar/live checkpoint, immediate safe return of the original service; P2D disconnected restore proof remains separate. PR51 stays DRAFT/UNMERGED/default OFF and `ROLLBACK_READY=NO`.

**NEXT_GATE=LOCAL_P2C_READ_ONLY_READINESS_PREFLIGHT_R1**.

## 37. 2026-10-05 PR74 actual readiness PASS; PR75 P2C execution source prepared but NOT authorized

PR74 owner Mac result is accepted: **`PASS_P2C_READ_ONLY_READINESS_PREFLIGHT_R1`**. The gate was strictly non-mutating: no service interruption, helper, production-data content read, SQLite operation, backup/snapshot, GPG operation, provider call or L1C-C activation. Current exact live topology/sole running volume use, P2B local ciphertext baselines, protected recovery metadata, conservative host capacity and final nonmutation all passed.

New private **DRAFT PR #75** is stacked directly on PR74:
- branch `qualification/current-freellmapi-p2c-coordinated-backup-r1`;
- current HEAD **6edb526dab57df6b50534fac7018314dc3d1038a**;
- source `scripts/qualification/current-freellmapi-p2c-coordinated-current-volume-backup-r1.py`;
- Git blob **48353233e351eaf83fa0b778f83b4db36c37bcdd**;
- **34497 bytes**;
- SHA-256 **eca8995404e8f1b44bf3d577d91fca8b68a980885ba9e649589ecdd691875ba8**;
- offline self-test: positive complete-tree validation plus four fail-closed negative cases PASS.

The production path is deliberately interactive and inert until the owner types **`AUTHORIZE_P2C_CURRENT_LIVE_RW_VOLUME_PRESERVATION`**. Only after that token does it create a network-none helper, gracefully stop the exact original service, prove no running writer remains, scan/capture the complete current data tree read-only, stream it directly into qualified GPG ciphertext, confidentially validate archive membership/content hashes, prove source nonmutation and return the same original service. No plaintext archive or live-source SQLite checkpoint/repair. P2D remains separately unauthorized.

The user's PR74 result is evidence of readiness, not implicit permission to interrupt the live service. Keep PR51 DRAFT/UNMERGED/default OFF and `ROLLBACK_READY=NO`.

**NEXT_GATE=EXPLICIT_OWNER_P2C_MAINTENANCE_WINDOW_AUTHORIZATION**.

## 38. 2026-10-05 P2C owner authorization granted; use only final force-kill-free PR75 source

Owner has explicitly authorized the P2C maintenance-window transaction. P2D remains separately unauthorized.

Use only final PR75 HEAD **d4991c27eae60f9304b1a8013a3708f16376ab8e**, source blob **ea2c3a1e6925995932a87b77f6a58f9864ca066d**, **36022 bytes**, SHA-256 **733ba08833fcf5fa793e898c6da6d69848848022c0aa6e3e6d749793c00b8b1f**. Earlier PR75 heads are superseded.

Final safety semantics: no finite `docker stop` and no automatic SIGKILL. The source sends SIGTERM only, polls for clean exit, aborts if writer quiescence is not achieved, rejects exit code 137, and attempts to return/verify the original service on every post-signal path. The rest of the bounded transaction remains complete-tree RO source scan, direct tar-to-GPG ciphertext, confidential full membership/hash validation, quiesced source re-scan/nonmutation and original-service topology/health return.

At runtime the owner must still type exactly `AUTHORIZE_P2C_CURRENT_LIVE_RW_VOLUME_PRESERVATION`. If any failure marker occurs, do not retry unchanged or manually alter the private evidence root until service-return status is reviewed. P2D remains separate and `ROLLBACK_READY=NO`.

**NEXT_GATE=LOCAL_P2C_COORDINATED_CURRENT_VOLUME_ENCRYPTED_BACKUP_R1**.

