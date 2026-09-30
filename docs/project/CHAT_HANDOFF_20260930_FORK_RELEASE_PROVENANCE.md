# OmniRoute New-Chat Handoff — Fork-Owned Release Provenance

Date: 2026-09-30

## Read this first

This file supersedes older handoff wording that treated the original upstream owner's `v3.8.51` tag as a release blocker.

The fork owns its release authority.

Canonical public authority:
`Zartharas/OmniRoute`

Canonical private implementation/release-evidence authority:
`Zartharas/omniroute-auth-keeper`

Upstream remains an optional compatibility/improvement source.

`UPSTREAM_TAG_REQUIRED=NO`

## Completed architecture state

`FIVE_PILLAR_ARCHITECTURE=QUALIFIED_NONLIVE`

`PROVIDER_NEUTRAL_CONVERGENCE=COMPLETE`

`CANONICAL_INTEGRATION=QUALIFIED_NONLIVE_EXACT_LINEAGE`

Qualified provider-neutral chain:

- P5A `bcb0c6914550fddf305861c3b0b37db854d631c9`
- P5B `c700526117ec6b02ac22f540c5163a97b03952f6`
- P5C `2c4ea40d3aadec6911aa4a5ac4a3c8a95b20e1d4`
- P5C2 `bfb6331c73da2ea2b404e554a8b17be26e52f25b`
- P5D `28485d63ada9aa939472a107b85ed90d4732b90b`
- P5E `654dc956ce09bcb7c57995c3c292f663352f2d22`

Definitive P5E:
`PASS_P5E_CROSS_PILLAR_CONVERGENCE_QUALIFICATION_R1`

Canonical integration R2:
`PASS_CANONICAL_FIVE_PILLAR_INTEGRATION_QUALIFICATION_R2`

Canonical integration PR:
private PR #39 — open / draft / unmerged / mergeable.

Canonical base:
`470a9eb5d5014c0df116c9e3c5b6ae3853bda021`

Canonical head:
`654dc956ce09bcb7c57995c3c292f663352f2d22`

Topology:
183 ahead / 0 behind; exact merge base = canonical base.

P4F/P4G/P4G endpoint are not inherited; all diverge at P4E.

## Fork-owned release candidate

Release candidate ref:

`release/five-pillar-qualified-20260930-rc1`

Exact source:

`654dc956ce09bcb7c57995c3c292f663352f2d22`

Exact source tree:

`541e2b6bdfa682bc3d008356e41b34ea72c49248`

Package blob:

`612c15ab2f995152514edebae78c4c0ba1b97063`

Lockfile blob:

`4214aef2e49956e416a013d5c25f574e442b52f2`

Lockfile bytes:

`1387787`

Node policy blob:

`a45fd52cc5891570d6299fab38643103c3955474`

Node policy:

`24`

Inherited package metadata remains:

- name: `omniroute`
- version: `3.8.51`
- repository: `https://github.com/diegosouzapw/OmniRoute`

Do not mutate the qualified source just to change version identity before provenance qualification.

## Active qualification

Private PRM #38 is the active release/provenance tracker.

Historical upstream-tag PRM #19 is closed and superseded as a release blocker.

Product PRM #20 remains open.

Frozen qualification:

- branch: `qualification/fork-owned-release-provenance-r1`
- commit: `7c92fbb13d66216d11c6219917e3ecf9d5596021`
- harness: `scripts/qualification/fork-owned-release-provenance-qualification-r1.sh`
- harness blob: `8c4c1a7746f78122ac587029eb6aeca03ac988f0`
- bytes: `19731`
- SHA-256: `f252228a299920fb197171871bfcdc6bcebf736c2a56a41abc0786ebf6cf5f00`

Qualification branch topology:
exact candidate + one harness file.

Candidate workflow runs:
none.

Harness due diligence:
- quoted heredocs only;
- exact release/integration ref checks;
- source/tree/package/lockfile/Node-policy checks;
- package metadata check;
- network hard-deny self-test;
- node/lock/tracked-artifact/secrets/pack-policy checks;
- P5E→P5A and P2–P4 regression chain;
- core/OpenSSE type gates;
- `npm run build:release`;
- exact `BUILD_SHA` checks;
- `check:pack-artifact`;
- local `npm pack --ignore-scripts` tarball hash/size evidence;
- source nonmutation;
- active worktree nonmutation;
- no dependency install;
- no real provider call;
- no publish;
- no merge;
- no live activation.

## Exact next local run

Run:

```bash
(
cd "/Users/zarthras/Documents/Development Projects/omniroute-auth-keeper-r16-17" || exit 1

QUAL_BRANCH="qualification/fork-owned-release-provenance-r1"
QUAL_COMMIT="7c92fbb13d66216d11c6219917e3ecf9d5596021"
QUAL_PATH="scripts/qualification/fork-owned-release-provenance-qualification-r1.sh"

SCRIPT="$HOME/Downloads/omniroute_fork_owned_release_provenance_qualification_r1.sh"

EXPECTED_BYTES="19731"
EXPECTED_SHA="f252228a299920fb197171871bfcdc6bcebf736c2a56a41abc0786ebf6cf5f00"

git fetch --no-tags origin "$QUAL_BRANCH" || exit 1

ACTUAL_QUAL_COMMIT="$(git rev-parse FETCH_HEAD)"

echo "qualification_expected_commit=$QUAL_COMMIT"
echo "qualification_actual_commit=$ACTUAL_QUAL_COMMIT"

[ "$ACTUAL_QUAL_COMMIT" = "$QUAL_COMMIT" ] || {
  echo "RESULT=FAIL_QUALIFICATION_REF_DRIFT"
  exit 1
}

git show "$QUAL_COMMIT:$QUAL_PATH" > "$SCRIPT" || exit 1

ACTUAL_BYTES="$(wc -c < "$SCRIPT" | tr -d ' ')"
ACTUAL_SHA="$(shasum -a 256 "$SCRIPT" | awk '{print $1}')"

echo "script_expected_bytes=$EXPECTED_BYTES"
echo "script_actual_bytes=$ACTUAL_BYTES"
echo "script_expected_sha256=$EXPECTED_SHA"
echo "script_actual_sha256=$ACTUAL_SHA"

[ "$ACTUAL_BYTES" = "$EXPECTED_BYTES" ] || {
  echo "RESULT=FAIL_SCRIPT_BYTE_MISMATCH"
  exit 1
}

[ "$ACTUAL_SHA" = "$EXPECTED_SHA" ] || {
  echo "RESULT=FAIL_SCRIPT_SHA256_MISMATCH"
  exit 1
}

/bin/bash -n "$SCRIPT" || exit 1
echo "bash_syntax=PASS"

/bin/bash "$SCRIPT"
)
```

Expected clean ending:

`RESULT=PASS_FORK_OWNED_RELEASE_PROVENANCE_QUALIFICATION_R1`

`CANDIDATE=654dc956ce09bcb7c57995c3c292f663352f2d22`

`STATUS=FORK_RELEASE_PROVENANCE_QUALIFIED_NONLIVE`

Also preserve:
- `evidence_root=...`
- `manifest=...`
- `gates=...`
- tarball name/bytes/SHA-256
- release manifest SHA-256.

## Safety / authorization state

`REAL_PROVIDER_CALL_BUDGET=0`

`OPENCODE_LIVE_EXECUTION=HOLD`

`THEOLDLLM_LIVE_EXECUTION=HOLD`

`MERGE=NOT_AUTHORIZED`

`RELEASE_PUBLICATION=NOT_AUTHORIZED`

`LIVE_ACTIVATION=NOT_AUTHORIZED`

Do not merge PR #39, create/publish a release tag, deploy, start live services, or perform provider calls without separate explicit authorization.

## After the local run

If the release-provenance qualification passes:

1. record the exact tarball SHA/size and release-manifest SHA in PRM #38 and PR #39;
2. mark fork release provenance qualified;
3. reassess product PRM #20 for the remaining live/product-acceptance items;
4. keep publication/merge/live activation separately authorized;
5. do not reopen provider-neutral architecture work unless contradictory evidence appears.

If any gate fails, stop at that gate and repair the qualification or release boundary without changing the qualified P5E source unless the evidence proves a source defect.
