#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const expectedBranch = "feat/operations-floor-openai-preservation";

function fail(message) {
  console.error(message);
  process.exit(1);
}

function run(command, args, label, options = {}) {
  console.log(`\n============================================================`);
  console.log(label);
  console.log(`============================================================`);
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    stdio: "inherit",
    env: process.env,
    ...options,
  });
  if (result.status !== 0) fail(`${label}=FAIL status=${result.status}`);
  console.log(`${label}=PASS`);
}

const branch = spawnSync("git", ["branch", "--show-current"], { encoding: "utf8" }).stdout.trim();
if (branch !== expectedBranch) fail(`Wrong branch: ${branch || "unknown"}`);

const statusBefore = spawnSync("git", ["status", "--porcelain"], { encoding: "utf8" }).stdout.trim();
if (statusBefore) fail(`Worktree must be clean before validation:\n${statusBefore}`);

run(
  "node",
  [
    "--import",
    "tsx/esm",
    "--import",
    "./open-sse/utils/setupPolyfill.ts",
    "--import",
    "./tests/_setup/isolateDataDir.ts",
    "--test",
    "--test-force-exit",
    "tests/unit/operations-floor-openai-preservation.test.ts",
    "tests/unit/operations-floor-sidebar.test.ts",
  ],
  "OPERATIONS_FLOOR_TESTS"
);

run(
  "npx",
  [
    "eslint",
    "src/app/(dashboard)/dashboard/operations-floor/**/*.{ts,tsx}",
    "src/shared/constants/sidebarVisibility/types.ts",
    "src/shared/constants/sidebarVisibility/sections.ts",
    "src/shared/components/Header.tsx",
    "src/server/ws/liveServerAllowList.ts",
    "tests/unit/operations-floor-openai-preservation.test.ts",
    "tests/unit/operations-floor-sidebar.test.ts",
  ],
  "OPERATIONS_FLOOR_LINT"
);

run("npm", ["run", "build"], "OPERATIONS_FLOOR_BUILD");

const statusAfter = spawnSync("git", ["status", "--porcelain"], { encoding: "utf8" }).stdout.trim();
if (statusAfter) fail(`Validation changed tracked files:\n${statusAfter}`);

console.log(`\n============================================================`);
console.log("OPERATIONS_FLOOR_VALIDATION=PASS");
console.log("============================================================");
