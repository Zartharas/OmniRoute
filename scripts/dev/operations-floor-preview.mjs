#!/usr/bin/env node

import { spawn, spawnSync } from "node:child_process";
import { closeSync, existsSync, mkdtempSync, openSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import net from "node:net";

const root = process.cwd();
const action = process.argv[2] || "start";
const httpPort = Number.parseInt(process.env.OPS_FLOOR_HTTP_PORT || "21128", 10);
const wsPort = Number.parseInt(process.env.OPS_FLOOR_WS_PORT || "21132", 10);
const password = process.env.OPS_FLOOR_PASSWORD || "OpsFloorPreview2026";
const logPath = path.join(os.tmpdir(), "omniroute-operations-floor-v2.log");
const pidPath = path.join(os.tmpdir(), "omniroute-operations-floor-v2.pid");
const dataPathFile = path.join(os.tmpdir(), "omniroute-operations-floor-v2.datadir");
const url = `http://127.0.0.1:${httpPort}/dashboard/operations-floor`;

function readPid() {
  if (!existsSync(pidPath)) return null;
  const pid = Number.parseInt(readFileSync(pidPath, "utf8").trim(), 10);
  return Number.isFinite(pid) && pid > 0 ? pid : null;
}

function processAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function stopProcessGroup(pid) {
  try {
    process.kill(-pid, "SIGTERM");
  } catch {
    try {
      process.kill(pid, "SIGTERM");
    } catch {
      // Already gone.
    }
  }
}

function git(args) {
  return spawnSync("git", args, { cwd: root, encoding: "utf8" });
}

function dockerState() {
  const result = spawnSync(
    "docker",
    ["inspect", "mer-omniroute", "--format", "{{.Config.Image}}|{{.Image}}|{{.State.Running}}|{{.State.Status}}"],
    { encoding: "utf8" }
  );
  if (result.status !== 0) {
    throw new Error(`Unable to inspect live mer-omniroute container: ${result.stderr || result.stdout}`);
  }
  const [image, imageId, running, status] = result.stdout.trim().split("|");
  return { image, imageId, running, status };
}

function assertCleanFeatureBranch() {
  const branch = git(["branch", "--show-current"]);
  if (branch.status !== 0) throw new Error(branch.stderr || "Unable to read branch");
  if (branch.stdout.trim() !== "feat/operations-floor-openai-preservation") {
    throw new Error(`Expected feat/operations-floor-openai-preservation, found ${branch.stdout.trim() || "detached HEAD"}`);
  }

  const status = git(["status", "--porcelain"]);
  if (status.status !== 0) throw new Error(status.stderr || "Unable to read worktree status");
  if (status.stdout.trim()) {
    throw new Error(`Worktree is not clean:\n${status.stdout}`);
  }
}

function checkPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => server.close(() => resolve(true)));
    server.listen(port, "127.0.0.1");
  });
}

function httpCode(port) {
  return new Promise((resolve) => {
    const request = http.get(
      { hostname: "127.0.0.1", port, path: "/login", timeout: 1000 },
      (response) => {
        response.resume();
        resolve(response.statusCode || 0);
      }
    );
    request.on("timeout", () => request.destroy());
    request.on("error", () => resolve(0));
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function tailLog(lines = 80) {
  if (!existsSync(logPath)) return "(log not created)";
  return readFileSync(logPath, "utf8").split(/\r?\n/).slice(-lines).join("\n");
}

async function start() {
  assertCleanFeatureBranch();

  const existingPid = readPid();
  if (existingPid && processAlive(existingPid)) {
    console.log(`OPERATIONS_FLOOR_PREVIEW_ALREADY_RUNNING pid=${existingPid}`);
    console.log(`URL=${url}`);
    return;
  }

  rmSync(pidPath, { force: true });

  const [httpFree, wsFree] = await Promise.all([checkPortFree(httpPort), checkPortFree(wsPort)]);
  if (!httpFree || !wsFree) {
    throw new Error(`Preview port conflict: HTTP ${httpPort} free=${httpFree}, WS ${wsPort} free=${wsFree}`);
  }

  const liveBefore = dockerState();
  if (liveBefore.running !== "true") {
    throw new Error(`Live mer-omniroute is not running (status=${liveBefore.status})`);
  }

  const previewData = mkdtempSync(path.join(os.tmpdir(), "omniroute-operations-floor-v2."));
  writeFileSync(dataPathFile, `${previewData}\n`, "utf8");

  const outFd = openSync(logPath, "w");
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  const child = spawn(command, ["run", "dev"], {
    cwd: root,
    env: {
      ...process.env,
      DATA_DIR: previewData,
      HOST: "127.0.0.1",
      PORT: String(httpPort),
      DASHBOARD_PORT: String(httpPort),
      API_PORT: String(httpPort),
      LIVE_WS_PORT: String(wsPort),
      LIVE_WS_HOST: "127.0.0.1",
      OMNIROUTE_ENABLE_LIVE_WS: "1",
      NEXT_PUBLIC_LIVE_WS_PUBLIC_URL: `ws://127.0.0.1:${wsPort}/live-ws`,
      INITIAL_PASSWORD: password,
    },
    detached: true,
    stdio: ["ignore", outFd, outFd],
  });
  closeSync(outFd);

  if (!child.pid) throw new Error("Preview process did not return a PID");
  child.unref();
  writeFileSync(pidPath, `${child.pid}\n`, "utf8");

  let ready = false;
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (!processAlive(child.pid)) {
      throw new Error(`Preview process exited before readiness.\n\n${tailLog()}`);
    }
    const code = await httpCode(httpPort);
    if ([200, 302, 307, 308].includes(code)) {
      ready = true;
      break;
    }
    await sleep(1000);
  }

  if (!ready) {
    stopProcessGroup(child.pid);
    throw new Error(`Preview did not become ready within 120 seconds.\n\n${tailLog()}`);
  }

  const liveAfter = dockerState();
  if (
    liveAfter.running !== "true" ||
    liveAfter.imageId !== liveBefore.imageId ||
    liveAfter.image !== liveBefore.image
  ) {
    stopProcessGroup(child.pid);
    throw new Error("Live mer-omniroute container changed during preview startup");
  }

  assertCleanFeatureBranch();

  if (process.platform === "darwin") {
    const opener = spawn("open", [url], { detached: true, stdio: "ignore" });
    opener.unref();
  }

  console.log(`preview_pid=${child.pid}`);
  console.log(`preview_data=${previewData}`);
  console.log(`live_image=${liveAfter.image}`);
  console.log(`live_image_id=${liveAfter.imageId}`);
  console.log(`URL=${url}`);
  console.log(`PASSWORD=${password}`);
  console.log(`LOG=${logPath}`);
  console.log("OPERATIONS_FLOOR_V2_VISUAL_PREVIEW=PASS");
}

function stop() {
  const pid = readPid();
  if (!pid) {
    console.log("OPERATIONS_FLOOR_PREVIEW_NOT_RUNNING");
    return;
  }
  if (processAlive(pid)) stopProcessGroup(pid);
  rmSync(pidPath, { force: true });
  console.log(`OPERATIONS_FLOOR_PREVIEW_STOPPED pid=${pid}`);
}

function status() {
  const pid = readPid();
  const running = Boolean(pid && processAlive(pid));
  console.log(`running=${running}`);
  if (pid) console.log(`pid=${pid}`);
  if (existsSync(dataPathFile)) console.log(`preview_data=${readFileSync(dataPathFile, "utf8").trim()}`);
  console.log(`URL=${url}`);
  console.log(`LOG=${logPath}`);
}

try {
  if (action === "start") await start();
  else if (action === "stop") stop();
  else if (action === "status") status();
  else throw new Error("Usage: node scripts/dev/operations-floor-preview.mjs [start|stop|status]");
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
