#!/usr/bin/env node

import { spawn, spawnSync } from "node:child_process";
import {
  closeSync,
  existsSync,
  mkdtempSync,
  openSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import net from "node:net";

const root = process.cwd();
const action = process.argv[2] || "start";
const defaultHttpPort = 21128;
const defaultWsPort = 21132;
const password = process.env.OPS_FLOOR_PASSWORD || "OpsFloorPreview2026";
const logPath = path.join(os.tmpdir(), "omniroute-operations-floor-v2.log");
const pidPath = path.join(os.tmpdir(), "omniroute-operations-floor-v2.pid");
const dataPathFile = path.join(os.tmpdir(), "omniroute-operations-floor-v2.datadir");
const statePath = path.join(os.tmpdir(), "omniroute-operations-floor-v2.state.json");
const expectedBranch = "feat/operations-floor-openai-preservation";

function parsePort(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 65535 ? parsed : fallback;
}

function readPid() {
  const state = readState();
  if (state?.pid) return state.pid;
  if (!existsSync(pidPath)) return null;
  const pid = Number.parseInt(readFileSync(pidPath, "utf8").trim(), 10);
  return Number.isFinite(pid) && pid > 0 ? pid : null;
}

function readState() {
  if (!existsSync(statePath)) return null;
  try {
    const parsed = JSON.parse(readFileSync(statePath, "utf8"));
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function writeState(state) {
  writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  writeFileSync(pidPath, `${state.pid}\n`, "utf8");
  writeFileSync(dataPathFile, `${state.previewData}\n`, "utf8");
}

function clearState() {
  rmSync(statePath, { force: true });
  rmSync(pidPath, { force: true });
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
    [
      "inspect",
      "mer-omniroute",
      "--format",
      "{{.Config.Image}}|{{.Image}}|{{.State.Running}}|{{.State.Status}}",
    ],
    { encoding: "utf8" }
  );
  if (result.status !== 0) {
    throw new Error(
      `Unable to inspect live mer-omniroute container: ${result.stderr || result.stdout}`
    );
  }
  const [image, imageId, running, status] = result.stdout.trim().split("|");
  return { image, imageId, running, status };
}

function assertCleanFeatureBranch() {
  const branch = git(["branch", "--show-current"]);
  if (branch.status !== 0) throw new Error(branch.stderr || "Unable to read branch");
  if (branch.stdout.trim() !== expectedBranch) {
    throw new Error(
      `Expected ${expectedBranch}, found ${branch.stdout.trim() || "detached HEAD"}`
    );
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

function portOwner(port) {
  if (process.platform === "win32") return "";
  const result = spawnSync("lsof", ["-nP", `-iTCP:${port}`, "-sTCP:LISTEN"], {
    encoding: "utf8",
  });
  return result.status === 0 ? result.stdout.trim() : "";
}

async function choosePorts() {
  const explicitHttp = Boolean(process.env.OPS_FLOOR_HTTP_PORT);
  const explicitWs = Boolean(process.env.OPS_FLOOR_WS_PORT);
  const requestedHttp = parsePort(process.env.OPS_FLOOR_HTTP_PORT, defaultHttpPort);
  const requestedWs = parsePort(process.env.OPS_FLOOR_WS_PORT, defaultWsPort);

  if (explicitHttp || explicitWs) {
    const [httpFree, wsFree] = await Promise.all([
      checkPortFree(requestedHttp),
      checkPortFree(requestedWs),
    ]);
    if (!httpFree || !wsFree) {
      const details = [
        !httpFree ? portOwner(requestedHttp) : "",
        !wsFree ? portOwner(requestedWs) : "",
      ]
        .filter(Boolean)
        .join("\n");
      throw new Error(
        `Explicit preview port conflict: HTTP ${requestedHttp} free=${httpFree}, WS ${requestedWs} free=${wsFree}${details ? `\n${details}` : ""}`
      );
    }
    return { httpPort: requestedHttp, wsPort: requestedWs, offset: 0 };
  }

  // Default mode is deliberately self-healing: preserve the HTTP/WS offset and
  // walk upward until both loopback ports are free. This avoids brittle failures
  // from stale dev servers or unrelated local processes without killing anything.
  for (let offset = 0; offset <= 128; offset += 1) {
    const httpPort = defaultHttpPort + offset;
    const wsPort = defaultWsPort + offset;
    if (wsPort > 65535) break;
    const [httpFree, wsFree] = await Promise.all([
      checkPortFree(httpPort),
      checkPortFree(wsPort),
    ]);
    if (httpFree && wsFree) return { httpPort, wsPort, offset };
  }

  throw new Error(
    `Unable to find a free preview port pair starting at HTTP ${defaultHttpPort} / WS ${defaultWsPort}`
  );
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

function verifyPreviewLogin(port) {
  return new Promise((resolve) => {
    const body = JSON.stringify({ password });
    const request = http.request(
      {
        hostname: "127.0.0.1",
        port,
        path: "/api/auth/login",
        method: "POST",
        timeout: 5000,
        headers: {
          "content-type": "application/json",
          "content-length": Buffer.byteLength(body),
        },
      },
      (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          const responseBody = Buffer.concat(chunks).toString("utf8");
          resolve({ statusCode: response.statusCode || 0, body: responseBody });
        });
      }
    );
    request.on("timeout", () => request.destroy(new Error("login verification timed out")));
    request.on("error", (error) => resolve({ statusCode: 0, body: error.message }));
    request.end(body);
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

  const existingState = readState();
  const existingPid = readPid();
  if (existingPid && processAlive(existingPid)) {
    const existingUrl =
      existingState?.url ||
      `http://127.0.0.1:${existingState?.httpPort || defaultHttpPort}/dashboard/operations-floor`;
    console.log(`OPERATIONS_FLOOR_PREVIEW_ALREADY_RUNNING pid=${existingPid}`);
    console.log(`URL=${existingUrl}`);
    return;
  }

  clearState();

  const liveBefore = dockerState();
  if (liveBefore.running !== "true") {
    throw new Error(`Live mer-omniroute is not running (status=${liveBefore.status})`);
  }

  const { httpPort, wsPort, offset } = await choosePorts();
  const url = `http://127.0.0.1:${httpPort}/dashboard/operations-floor`;
  if (offset > 0) {
    console.log(
      `default_ports_busy=true selected_http_port=${httpPort} selected_ws_port=${wsPort}`
    );
  }

  const previewData = mkdtempSync(path.join(os.tmpdir(), "omniroute-operations-floor-v2."));

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

  writeState({
    pid: child.pid,
    httpPort,
    wsPort,
    previewData,
    url,
    logPath,
    root,
    branch: expectedBranch,
    startedAt: new Date().toISOString(),
    liveImage: liveBefore.image,
    liveImageId: liveBefore.imageId,
  });

  let ready = false;
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (!processAlive(child.pid)) {
      clearState();
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
    clearState();
    throw new Error(`Preview did not become ready within 120 seconds.\n\n${tailLog()}`);
  }

  // A reachable login page is not sufficient evidence that the seeded password
  // actually works. Verify the exact credential before we advertise PASS or open
  // the browser. The login route persists the INITIAL_PASSWORD as a bcrypt hash
  // on first successful authentication, which is exactly the normal runtime path.
  const authCheck = await verifyPreviewLogin(httpPort);
  if (authCheck.statusCode !== 200) {
    stopProcessGroup(child.pid);
    clearState();
    throw new Error(
      `Preview login verification failed: HTTP ${authCheck.statusCode}. Response: ${authCheck.body || "(empty)"}\n\n${tailLog()}`
    );
  }

  const liveAfter = dockerState();
  if (
    liveAfter.running !== "true" ||
    liveAfter.imageId !== liveBefore.imageId ||
    liveAfter.image !== liveBefore.image
  ) {
    stopProcessGroup(child.pid);
    clearState();
    throw new Error("Live mer-omniroute container changed during preview startup");
  }

  assertCleanFeatureBranch();

  if (process.platform === "darwin") {
    const opener = spawn("open", [url], { detached: true, stdio: "ignore" });
    opener.unref();
  }

  console.log(`preview_pid=${child.pid}`);
  console.log(`preview_data=${previewData}`);
  console.log(`http_port=${httpPort}`);
  console.log(`ws_port=${wsPort}`);
  console.log(`live_image=${liveAfter.image}`);
  console.log(`live_image_id=${liveAfter.imageId}`);
  console.log(`URL=${url}`);
  console.log(`PASSWORD=${password}`);
  console.log("login_verification=PASS");
  console.log(`LOG=${logPath}`);
  console.log("OPERATIONS_FLOOR_V2_VISUAL_PREVIEW=PASS");
}

function stop() {
  const state = readState();
  const pid = readPid();
  if (!pid) {
    console.log("OPERATIONS_FLOOR_PREVIEW_NOT_RUNNING");
    return;
  }
  if (processAlive(pid)) stopProcessGroup(pid);
  clearState();
  console.log(`OPERATIONS_FLOOR_PREVIEW_STOPPED pid=${pid}`);
  if (state?.previewData) console.log(`preview_data_preserved=${state.previewData}`);
}

function status() {
  const state = readState();
  const pid = readPid();
  const running = Boolean(pid && processAlive(pid));
  console.log(`running=${running}`);
  if (pid) console.log(`pid=${pid}`);
  if (state?.httpPort) console.log(`http_port=${state.httpPort}`);
  if (state?.wsPort) console.log(`ws_port=${state.wsPort}`);
  if (state?.previewData) console.log(`preview_data=${state.previewData}`);
  else if (existsSync(dataPathFile)) {
    console.log(`preview_data=${readFileSync(dataPathFile, "utf8").trim()}`);
  }
  console.log(
    `URL=${state?.url || `http://127.0.0.1:${defaultHttpPort}/dashboard/operations-floor`}`
  );
  console.log(`LOG=${logPath}`);
}

function diagnose() {
  const state = readState();
  status();
  const ports = new Set([
    defaultHttpPort,
    defaultWsPort,
    state?.httpPort,
    state?.wsPort,
  ].filter((value) => Number.isFinite(value)));
  for (const port of ports) {
    const owner = portOwner(port);
    if (owner) {
      console.log(`\nLISTENER ${port}`);
      console.log(owner);
    }
  }
}

try {
  if (action === "start") await start();
  else if (action === "stop") stop();
  else if (action === "status") status();
  else if (action === "diagnose") diagnose();
  else {
    throw new Error(
      "Usage: node scripts/dev/operations-floor-preview.mjs [start|stop|status|diagnose]"
    );
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
