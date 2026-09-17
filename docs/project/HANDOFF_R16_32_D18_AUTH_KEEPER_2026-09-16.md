# R16.32 D18 Auth Keeper Qualification Handoff

Last reviewed: 2026-09-17
Status: D18 qualification/reconciliation/readiness complete; H1 hardening and A1 production activation accepted; D18 is live with R16.31 rollback retained; D19 not authorized

This is the canonical cross-project handoff for continuing D18 OmniRoute/Auth Keeper work. Product intent remains in `ARCHITECTURE_SOURCE_OF_TRUTH.md`; permanent engineering method remains in `ENGINEERING_SOURCE_OF_TRUTH.md`; exact accepted Git/runtime/activation evidence remains more specific than this summary.

## 1. Non-negotiable architecture boundaries

- OmniRoute owns routing/provider/orchestration/model-workforce decisions.
- Auth Keeper owns credential/session/account lifecycle and routing eligibility/admission facts.
- Operations Floor is observer/operator plane only.
- Protected native ChatGPT/OpenAI capacity must not silently become ordinary routed fleet capacity.
- D19 is not authorized by this handoff.
- Do not weaken failed assertions merely to obtain a pass; classify the exact discriminator first.

## 2. Current D18 live authority

Authorized live activation A1 completed successfully on 2026-09-17.

Current live runtime:

- container: `mer-omniroute`;
- container ID: `5e5a904141fb8f17fd8e410f4f57284bc1a4cfbc7318dca46418925a51620efd`;
- source commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`;
- source tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`;
- image tag: `omniroute:d18-r8-r9-candidate-linux-r10`;
- image ID: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`;
- milestone label: `R16.32-D18`;
- D18 activation flag: enabled (`OMNIROUTE_AUTH_KEEPER_COMBO_ADMISSION_ENABLED=1`);
- network: `mer-gateway_default`;
- restart policy: `unless-stopped`;
- runtime user: `node`;
- data volume: `omniroute-d18-live-data-5ae6f97e7322`;
- published ports: 20128/20129/20132 on `127.0.0.1` only;
- Auth Keeper token bind: read-only;
- workload policy bind: read-only;
- health: `healthy`;
- restart count: `0` after the 120-second post-cutover stability gate.

A1 host checks passed `/healthz=200`, `/livez=200`, all three loopback ports reachable, and router/config/catalog/policy host sentinels unchanged.

## 3. R16.31 retained rollback authority

Successful D18 activation deliberately retained the previous production runtime:

- rollback holder: `mer-omniroute-r16-31-rollback-d18-5ae6f97e7322`;
- holder state: `exited`;
- holder image ID: `sha256:370d49896920568bc5adbfe71316879368ec93be0cd020cf1b546fa3ef2640aa`;
- original R16.31 data volume: `omniroute-r16-31-live-data-34bd2fdbb8b0`;
- original volume remains untouched and retained.

Do not remove the rollback holder or original volume until a separately accepted retention/cleanup phase.

## 4. Auth Keeper hardening and live contract

H1 closed the only pre-activation hardening finding:

- LaunchAgent plist path: `$HOME/Library/LaunchAgents/com.omniroute.auth-keeper.plist`;
- mode changed `0644 -> 0600` by chmod-only hardening;
- file size and mtime were unchanged;
- Auth Keeper health remained HTTP 200 before and after;
- no Auth Keeper service restart/runtime mutation occurred.

A1 validated Auth Keeper from the new live D18 container:

- unauthenticated `GET /v1/omniroute/connection-state` = 401;
- authenticated request using the mounted dedicated service token = 200;
- exact contract: `auth-keeper-connection-state/v1`;
- `mode=READ_ONLY`;
- `mutationPerformed=false`;
- `credentialsReturned=false`;
- `rawCredentialIncludedInOutput=false`;
- accounts array present;
- zero unexpected contract keys;
- zero forbidden secret-material keys;
- service token value not printed or hashed.

The activation script itself made zero provider/model calls. This is limited to the activation procedure and is not a statement about unrelated production traffic.

## 5. D18 source/image authority

- branch: `feat/d18-r8-union-lockfix-linux-canary-r9`;
- commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`;
- tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`;
- parent: `13453f6bdf1c9279da3bea0d2382959c92c93d3e`;
- package delta: `package.json`, `package-lock.json`;
- live image ID: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`;
- platform: `linux/amd64`.

D18 source hashes:

- `open-sse/services/combo.ts`: `47028689cb3a372b4afc341f13ba32e01dd006553a38de9f9837369ec5c68742`;
- `src/lib/authKeeper/comboAdmissionActivation.ts`: `062d25bd7e8ea2ac58903e43922821e66c3171e13fe892a779749d10cb1a7239`;
- `src/lib/authKeeper/comboRoutingEligibility.ts`: `adccf245faee216e168b15b3961bea427b9dd73803698f74cb351dc982328294`.

## 6. Accepted qualification/reconciliation lineage

Historical accepted authorities remain:

- R10 retained Linux image freeze;
- R11 flag-OFF isolated runtime qualification;
- R12-R6 first valid isolated flag-ON runtime authority;
- R7 exact-object/AST source/call-topology reconciliation;
- R3 production-path pre-activation transport/topology readiness;
- R4 direct-Docker activation/rollback runbook review;
- H1 Auth Keeper plist hardening;
- A1 authorized production activation.

R12-R6 still explains isolated flag-ON behavior: two distinct Auth Keeper connection-state GETs, `No credentials for openai`, D18 target exclusion, terminal `ALL_TARGETS_SKIPPED`, `attempted:0`, and no target-specific provider dispatch.

R7 remains the source-topology authority explaining GET #1 through availability/credential pre-screen and GET #2 through the separately memoized D18 admission-plan path.

Do not rediscover documented R12/R7/R1-R2 harness/validator failures as product defects.

## 7. A1 transaction evidence

A1 script SHA-256:

`fb48e6ebbac917004000afc87e17b2c35c86498c97db85b2b0560389b3565be3`

H1 script SHA-256:

`f6687bc16bf2b3d454a00a8490322792363f2ad4443a6c110e6b95b4e620bd94`

A1 evidence root:

`$HOME/Library/Application Support/OmniRoute/AuthKeeper/d18-live-activation-a1-20260917T154403Z`

A1 transaction facts:

- exact prestate and host sentinels passed;
- 17 operator overrides reconstructed privately into a temporary `0600` env-file;
- explicit D18 Auth Keeper/activation values validated;
- pre-cutover root clone-helper probe passed;
- R16.31 stopped and retained as rollback holder;
- 3,045 entries / 3,010 files / 503,748,301 bytes cloned into the D18 volume;
- source/destination content digest matched: `1ffd01aee9b89d9ef2d231a721790a87515163f6221b9e4d8413cd2a00975f70`;
- new D18 runtime started with exact image/topology;
- live Auth Keeper secretless contract passed;
- 120-second stability gate passed with health healthy and restart count zero;
- seven evidence-file hashes were written;
- source/Git were not mutated;
- D19 was not started.

A1 result: **PASS_D18_LIVE_ACTIVATION_A1**.

## 8. Current engineering boundary

D18 is now live and accepted. Pre-activation work is closed.

The next safe engineering boundary is post-activation observation/freeze plus a later explicit rollback-retention/cleanup decision. D19 remains out of scope.

Until separately authorized:

- do not remove `mer-omniroute-r16-31-rollback-d18-5ae6f97e7322`;
- do not remove `omniroute-r16-31-live-data-34bd2fdbb8b0`;
- do not silently rebuild/replace the accepted D18 image;
- do not change the Auth Keeper token-file contract;
- do not rerun pre-activation R1-R4 diagnostics unless new contradictory evidence appears;
- do not begin D19.

## 9. New-chat handoff rule

A new session must start from **D18 live/accepted with R16.31 rollback retained**. Historical statements that D18 is not live are superseded by A1. Treat A1 as live-runtime authority, R12-R6 as isolated flag-ON behavioral authority, R7 as source-topology authority, R3 as production-path transport/topology authority, and R4 as the activation/rollback design authority that A1 successfully executed.
