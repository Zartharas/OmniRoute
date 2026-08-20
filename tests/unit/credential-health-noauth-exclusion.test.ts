import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-credential-health-noauth-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK = "true";

const originalFetch = globalThis.fetch;
let externalProviderRequests = 0;

globalThis.fetch = (async () => {
  externalProviderRequests += 1;
  throw new Error("credential health must not issue a provider request for no-auth providers");
}) as typeof fetch;

const core = await import("../../src/lib/db/core.ts");
const { sweep } = await import("../../src/lib/credentialHealth/scheduler.ts");

const schedulerGlobal = globalThis as typeof globalThis & {
  __omnirouteCredentialHC?: unknown;
};

test.after(() => {
  globalThis.fetch = originalFetch;
  schedulerGlobal.__omnirouteCredentialHC = undefined;

  core.resetDbInstance();

  fs.rmSync(TEST_DATA_DIR, {
    recursive: true,
    force: true,
  });
});

test("credential-health sweep excludes a stored MiMoCode no-auth connection", async () => {
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
    "mimocode-noauth-health-test",
    "mimocode",
    "MiMoCode no-auth scheduler test",
    "synthetic-storage-value",
    timestamp,
    timestamp
  );

  schedulerGlobal.__omnirouteCredentialHC = undefined;

  await sweep();

  assert.equal(externalProviderRequests, 0, "MiMoCode must be removed before credential probing");

  const row = db
    .prepare(
      `SELECT
           test_status,
           last_tested,
           last_error,
           last_error_at,
           updated_at
         FROM provider_connections
         WHERE id = ?`
    )
    .get("mimocode-noauth-health-test") as {
    test_status: string | null;
    last_tested: string | null;
    last_error: string | null;
    last_error_at: string | null;
    updated_at: string;
  };

  assert.equal(row.test_status, "active");
  assert.equal(row.last_tested, null);
  assert.equal(row.last_error, null);
  assert.equal(row.last_error_at, null);
  assert.equal(row.updated_at, timestamp);

  const callLog = db
    .prepare(
      `SELECT COUNT(*) AS count
         FROM call_logs
         WHERE provider = ?`
    )
    .get("mimocode") as {
    count: number;
  };

  assert.equal(
    callLog.count,
    0,
    "excluded MiMoCode sweep must not create a connection-test call log"
  );
});
