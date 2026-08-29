import test from "node:test";
import assert from "node:assert/strict";
import { killByPort } from "../../bin/cli/commands/stop.mjs";

type Signal = { pid: number; signal: string };
const lsofFor = (...pids: number[]) => async (command: string) => {
  assert.equal(command, "lsof");
  return { stdout: `${pids.join("\n")}\n`, stderr: "" };
};

test("port fallback never signals a foreign Docker Desktop listener", async () => {
  const signals: Signal[] = [];
  const result = await killByPort(20128, {
    platform: "darwin",
    execFileAsync: lsofFor(4242),
    getProcessCommand: async () => "/Applications/Docker.app/Contents/MacOS/com.docker.backend services",
    processKill: (pid: number, signal: string) => { signals.push({ pid, signal }); return true; },
    isPidRunning: () => true,
    sleep: async () => {},
  });
  assert.equal(result, false);
  assert.deepEqual(signals, [], "foreign listener must receive zero signals");
});

test("unknown listener ownership fails closed with zero signals", async () => {
  const signals: Signal[] = [];
  const result = await killByPort(20128, {
    platform: "darwin", execFileAsync: lsofFor(4343), getProcessCommand: async () => "",
    processKill: (pid: number, signal: string) => { signals.push({ pid, signal }); return true; },
    isPidRunning: () => true, sleep: async () => {},
  });
  assert.equal(result, false); assert.deepEqual(signals, []);
});

test("positively identified OmniRoute listener still stops", async () => {
  const signals: Signal[] = []; let alive = true;
  const result = await killByPort(20128, {
    platform: "darwin", execFileAsync: lsofFor(4444),
    getProcessCommand: async () => "node --max-old-space-size=4096 /tmp/OmniRoute/server-ws.mjs",
    processKill: (pid: number, signal: string) => { signals.push({ pid, signal }); if (signal === "SIGTERM") alive = false; return true; },
    isPidRunning: () => alive, sleep: async () => {},
  });
  assert.equal(result, true); assert.deepEqual(signals, [{ pid: 4444, signal: "SIGTERM" }]);
});

test("mixed owned and foreign listeners signal nobody", async () => {
  const signals: Signal[] = [];
  const commands = new Map([[4545, "node /tmp/OmniRoute/server-ws.mjs"], [4646, "/Applications/Docker.app/Contents/MacOS/com.docker.backend services"]]);
  const result = await killByPort(20128, {
    platform: "darwin", execFileAsync: lsofFor(4545, 4646),
    getProcessCommand: async (pid: number) => commands.get(pid) || "",
    processKill: (pid: number, signal: string) => { signals.push({ pid, signal }); return true; },
    isPidRunning: () => true, sleep: async () => {},
  });
  assert.equal(result, false); assert.deepEqual(signals, []);
});
