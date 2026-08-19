#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import open from "open";

const statePath = path.join(os.tmpdir(), "omniroute-operations-floor-v2.state.json");

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!existsSync(statePath)) {
  fail("Operations Floor preview is not running. Start it first with: node scripts/dev/operations-floor-preview.mjs start");
}

let state;
try {
  state = JSON.parse(readFileSync(statePath, "utf8"));
} catch {
  fail("Operations Floor preview state is unreadable. Run the preview status command before retrying.");
}

const pid = Number(state?.pid);
const httpPort = Number(state?.httpPort);
if (!Number.isFinite(pid) || !Number.isFinite(httpPort)) {
  fail("Operations Floor preview state is incomplete.");
}

try {
  process.kill(pid, 0);
} catch {
  fail("Operations Floor preview process is no longer running.");
}

const url = `http://127.0.0.1:${httpPort}/dashboard/operations-floor/pixel`;
console.log(`PIXEL_OFFICE_URL=${url}`);
await open(url);
console.log("OPERATIONS_FLOOR_PIXEL_OFFICE_OPEN=PASS");
