# OmniRoute Fork — Project Showcase and Progress

Last reviewed: 2026-09-17
Status: D18 frozen live baseline accepted; D19 production-safe empirical-evidence development active; R16.31 rollback retained intact

This is the human-readable showcase for the `Zartharas/OmniRoute` fork: what we are building, what is live, what has been proven, what is active now, and what remains to complete the original goal.

It is a presentation summary. Exact architecture, engineering, phase, Git, build, runtime, activation and freeze evidence remains authoritative through `SOURCE_OF_TRUTH.md` and `docs/project/`.

## 1. Original goal

Build one Codex-centered AI engineering system in which the user works through a single agent while OmniRoute can marshal a heterogeneous AI workforce, Auth Keeper supplies secure account/session authority, intelligent orchestration decides which eligible workers contribute, protected OpenAI/Codex capacity remains preserved where required, and Operations Floor makes the organization observable in real time.

```text
User
  |
  v
Codex Unified Agent
  |
  v
OmniRoute routing / orchestration
  |-------------------------------|
  v                               v
Auth Keeper                  AI workforce
sessions / auth              free / API / managed /
eligibility / recovery       subscription / web /
                             enterprise / human-verification /
                             protected native capacity
  |                               |
  |-------------------------------|
                  |
                  v
         orchestration / fallback
                  |
                  v
               response
                  |
                  v
           Operations Floor
      evidence / health / workers /
      routing / operator attention
```

The five pillars remain:

1. **Codex Unified Agent**
2. **Unified OmniRoute AI Workforce**
3. **Auth Keeper**
4. **Intelligent Multi-Model Orchestration**
5. **Operations Floor**

OmniRoute owns routing/orchestration. Auth Keeper owns credential/session/account lifecycle and routing-safe eligibility facts. Operations Floor remains observer/operator plane, not a competing router.

## 2. What is live now — D18

R16.32 D18 was authorized, promoted and frozen through the accepted A1 + O1/O2 evidence chain.

Current live authority:

- container: `mer-omniroute`
- container ID: `5e5a904141fb8f17fd8e410f4f57284bc1a4cfbc7318dca46418925a51620efd`
- source commit: `5ae6f97e732263e1029b35aeccf4873ba22d4554`
- source tree: `d016aa08b3e57d2c545f7e351c578610a4b3d2a5`
- image: `sha256:b5c171907288f14e1e1132f427aeeb541508ba02a760534c57fb48fd5d053554`
- data volume: `omniroute-d18-live-data-5ae6f97e7322`
- milestone: `R16.32-D18`
- D18 Auth Keeper combo admission: enabled
- network: `mer-gateway_default`
- restart policy: `unless-stopped`
- runtime user: `node`
- ports 20128/20129/20132: loopback only
- Auth Keeper token/workload-policy mounts: read-only

Accepted live evidence includes:

- health `healthy`;
- restart count `0`;
- `OOMKilled=false`;
- `/healthz=200`, `/livez=200`;
- host sentinels unchanged;
- A1 120-second stability gate passed;
- O1 later observed the same runtime after 3,176 seconds uptime;
- O1 fresh 60-second / 12-sample stability gate passed.

## 3. Auth Keeper production integration

Live D18 has passed the secretless connection-state contract:

- unauthenticated = 401;
- authenticated = 200;
- `contract=auth-keeper-connection-state/v1`;
- `mode=READ_ONLY`;
- `mutationPerformed=false`;
- `credentialsReturned=false`;
- `rawCredentialIncludedInOutput=false`;
- accounts array present;
- zero unexpected contract keys;
- zero forbidden secret-material keys.

The LaunchAgent plist was hardened from `0644` to `0600` with a chmod-only change and no Auth Keeper restart/runtime replacement.

## 4. Rollback authority remains intact

R16.31 is intentionally retained as a deeper production rollback asset:

- holder: `mer-omniroute-r16-31-rollback-d18-5ae6f97e7322`
- state: `exited`
- image: `sha256:370d49896920568bc5adbfe71316879368ec93be0cd020cf1b546fa3ef2640aa`
- original volume: `omniroute-r16-31-live-data-34bd2fdbb8b0`

O2 reproduced the exact A1 cutover-time rollback authority:

- entries `3045`
- files `3010`
- symlinks `0`
- bytes `503748301`
- content digest `1ffd01aee9b89d9ef2d231a721790a87515163f6221b9e4d8413cd2a00975f70`
- link digest `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`

Rollback cleanup is not authorized.

## 5. Major work completed

### Architecture/governance

- Fork-specific Architecture, Engineering, Roadmap, Status and handoff authorities established.
- Evidence precedence and fail-closed promotion rules established.
- Exact Git/source/tree/image/runtime evidence treated as implementation authority.
- Permanent regression rules recorded for Bash 3.2, TypeScript AST ownership, secret handling, clone/integrity helpers and read-only protected-volume auditing.

### Upstream/source/build reconciliation

- Fork-specific architecture reconciled with newer upstream OmniRoute lineage.
- Required upstream/root-layout changes forward-ported without abandoning fork boundaries.
- Exact Linux/amd64 D18 image built and source-bound.
- Production topology/data/host sentinels preserved through direct-Docker promotion.

### R16.32 orchestration foundation

- normalized candidate facts;
- deterministic disposition;
- computational shadowing without additional real provider traffic;
- explainability/evidence taxonomy;
- bounded observation/evidence collection;
- source-backed hard-fact/blocker capture;
- request/context compatibility discovery and provenance;
- corrected three-component context composition;
- execution-key request-local evidence design;
- differential compile/lint/build qualification;
- Auth Keeper-aware combo admission and routing eligibility;
- exact two-path Auth Keeper source/call-topology reconciliation;
- flag-OFF/flag-ON isolated runtime qualification;
- production transport/topology readiness;
- fail-closed activation/automatic rollback design;
- authorized live activation;
- post-activation stability and rollback-integrity freeze.

### Auth Keeper

- dedicated OmniRoute service-token contract;
- real container-to-host transport qualified;
- secretless connection-state contract accepted;
- provider/session authority kept separate from routing authority;
- live D18 integration accepted without Auth Keeper redeployment;
- LaunchAgent hardened to `0600`.

## 6. Active work now — D19

The next phase is no longer undefined.

**R16.32 D19 — Production-Safe Empirical Orchestration Evidence Readout** is now canonically defined and its non-live development/qualification is authorized.

D19 is the bridge from D18's accepted hard-gate/admission foundation to any future preference intelligence. It must measure what the existing system is doing before we let empirical intelligence influence routing.

D19 will only derive bounded aggregate evidence from facts D18 already computes. Candidate empirical categories include exact source-backed forms of:

- eligible coverage;
- comparable-proceed coverage;
- mismatch/disagreement;
- not-ready;
- contained errors;
- existing disposition/reason categories.

D19 may not invent those meanings. The exact accepted source predicates/types/enums must be proven first.

D19 hard boundaries:

- routing result/order/filter/selection unchanged;
- fallback unchanged;
- provider/model-call delta = 0;
- Auth Keeper-fetch delta = 0;
- credential-acquisition delta = 0;
- no readback from evidence into routing;
- bounded in-memory aggregate only;
- secretless/low-cardinality output;
- no persistence migration;
- observation failure cannot fail a routed request.

Development gates:

1. **S1 exact accepted-object source census** — read-only; active next step.
2. S2 design freeze.
3. S3 isolated implementation.
4. S4 static/differential qualification.
5. S5 isolated runtime qualification.
6. S6 production pre-activation review.
7. **S7 production activation — separate explicit authorization required.**
8. S8 empirical evidence freeze if S7 is later authorized.

D19 completion means a trusted empirical evidence baseline exists. It does **not** mean provider-neutral preference scoring is active.

## 7. Five-pillar progress

| Pillar | Current state | Major remaining work |
| --- | --- | --- |
| Codex Unified Agent | Historical foundation exists; reintegration/productization required | Repository-owned control plane, final delegation contract, transparent worker switching, controlled mutation ownership, full-stack tests |
| Unified OmniRoute AI Workforce | Strong routing/provider foundation | Normalize free/API/managed/subscription/web/enterprise/human-verification access modes, finish eligibility contracts, keep absorbing compatible upstream work |
| Auth Keeper | Mature foundation; live D18 integration accepted | Broader managed-provider/session lifecycle coverage, final Codex/Operations Floor integration, preserve explicit human-verification lane |
| Intelligent Multi-Model Orchestration | D18 frozen live; D19 active | Complete D19 empirical baseline, then design/qualify provider-neutral preference intelligence only among hard-gate survivors; model-intelligence enrichment remains soft evidence |
| Operations Floor | Significant historical implementation | Reconcile with D18/D19 evidence model, safely surface Auth Keeper and worker assignment, protected-native/workload isolation, operator controls without routing authority |

## 8. What remains to finish the original goal

The project is complete only when all five pillars operate as one coherent product.

### Codex Unified

- one repository-owned/release-managed user-facing control plane;
- clear Codex → OmniRoute delegation contract;
- multiple reasoning/review workers behind a controlled acting model;
- no manual provider/model session restart for normal switching;
- full end-to-end request/tool ownership tests.

### Unified workforce/access modes

- consistent free/keyless, API, managed session, subscription/coding-plan, web, enterprise, interactive-human-verification and protected-native semantics;
- explicit ownership, eligibility, recovery and routing semantics per lane;
- provider additions isolated from routing core where practical.

### Auth Keeper

- all managed provider/session modes required by the final workforce;
- robust bounded recovery/re-auth lifecycle;
- safe routing/Operations Floor state without secret leakage;
- final Codex Unified end-to-end qualification.

### Intelligent orchestration

- D19 trusted empirical baseline;
- source-backed/provider-neutral preference signals;
- preference only among hard-gate survivors;
- shadow qualification before any preference activation;
- evidence-derived criteria rather than arbitrary thresholds;
- provenance-controlled Unified Model Intelligence Registry where useful.

### Operations Floor

- reconcile historical floor branches with current source/runtime lineage;
- show live workers, routing, fallback, health, auth, quota/cooldown, evidence and operator attention;
- show acting versus reasoning/review workers;
- show protected-native capacity separately;
- preserve personal/enterprise isolation;
- remain observer/operator plane, not router.

### Full product acceptance

The final qualified path must be:

```text
Codex Unified
  -> OmniRoute
  -> Auth Keeper / provider eligibility
  -> orchestration / fallback
  -> provider/model execution
  -> response
  -> Operations Floor evidence
```

Acceptance must cover normal operation plus quota exhaustion, cooldown/breaker, provider outage, auth expiry/re-auth, fallback, workload isolation, protected-capacity preservation, restart/recovery, rollback, build/runtime provenance and evidence continuity.

## 9. Current guardrails

- Keep D18 unchanged while D19 S1-S6 are developed/qualified.
- Do not activate D19 live without a separate explicit S7 authorization.
- Do not remove R16.31 rollback holder/original volume without a separate cleanup decision.
- Do not activate preference intelligence merely because D19 evidence exists.
- Do not let Operations Floor become routing authority.
- Do not let preference override hard-gate rejection.
- Do not force credentials onto free/keyless paths.
- Keep protected-native capacity distinct where policy requires it.

## 10. Read next

- Architecture: `docs/project/ARCHITECTURE_SOURCE_OF_TRUTH.md`
- Engineering governance: `docs/project/ENGINEERING_SOURCE_OF_TRUTH.md`
- Roadmap: `docs/project/MASTER_ROADMAP.md`
- Exact checkpoint: `docs/project/CURRENT_STATUS.md`
- Active phase: `docs/project/R16_32_D19_EMPIRICAL_ORCHESTRATION_EVIDENCE_READOUT.md`
- D18/Auth Keeper continuity: `docs/project/HANDOFF_R16_32_D18_AUTH_KEEPER_2026-09-16.md`
- Authority precedence: `SOURCE_OF_TRUTH.md`

The private `Zartharas/omniroute-auth-keeper` repository remains implementation/release-engineering authority for Auth Keeper itself.