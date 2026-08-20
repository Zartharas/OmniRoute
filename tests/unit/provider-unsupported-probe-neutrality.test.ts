import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-provider-unsupported-neutral-")
);

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";

let externalCalls = 0;

const originalFetch = globalThis.fetch;

globalThis.fetch = (async () => {
  externalCalls += 1;
  throw new Error("unexpected external provider request");
}) as typeof fetch;

const core = await import("../../src/lib/db/core.ts");
const { testSingleConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();

  fs.rmSync(TEST_DATA_DIR, {
    recursive: true,
    force: true,
  });
});

test("unsupported provider validation leaves persisted health unchanged", async () => {
  const db = core.getDbInstance();

  const timestamp = "2026-08-20T00:00:00.000Z";

  db.prepare(
    `INSERT INTO provider_connections
       (
         id,
         provider,
         auth_type,
         name,
         api_key,
         is_active,
         test_status,
         created_at,
         updated_at
       )
       VALUES (?, ?, 'apikey', ?, ?, 1, 'active', ?, ?)`
  ).run(
    "unsupported-neutral-test",
    "definitely-unknown-provider",
    "unsupported neutral test",
    "synthetic-key",
    timestamp,
    timestamp
  );

  const result = await testSingleConnection("unsupported-neutral-test");

  assert.equal(result.valid, false);
  assert.equal(result.skipped, true);
  assert.equal(result.error, "Provider test not supported");
  assert.equal(result.diagnosis?.type, "unsupported");
  assert.equal(result.diagnosis?.code, "unsupported");

  assert.equal(externalCalls, 0, "unsupported validation must not require an external request");

  const row = db
    .prepare(
      `SELECT
           test_status,
           last_tested,
           last_error,
           last_error_at,
           last_error_type,
           last_error_source,
           error_code,
           updated_at
         FROM provider_connections
         WHERE id = ?`
    )
    .get("unsupported-neutral-test") as {
    test_status: string | null;
    last_tested: string | null;
    last_error: string | null;
    last_error_at: string | null;
    last_error_type: string | null;
    last_error_source: string | null;
    error_code: string | null;
    updated_at: string;
  };

  assert.equal(row.test_status, "active");
  assert.equal(row.last_tested, null);
  assert.equal(row.last_error, null);
  assert.equal(row.last_error_at, null);
  assert.equal(row.last_error_type, null);
  assert.equal(row.last_error_source, null);
  assert.equal(row.error_code, null);
  assert.equal(row.updated_at, timestamp);
});
