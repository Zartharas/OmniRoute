#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const action = process.argv[2] || "status";
const accepted = process.argv.includes("--accept-noncommercial-license");
const targetRoot = path.join(root, "public", "local-assets", "operations-floor");
const manifestPath = path.join(targetRoot, "manifest.json");
const pinnedCommit = "cdec9de8173e24f7d8843776da06b7d501929e4c";
const sourceRepo = "chaitanyagiri/munder-difflin";
const rawBase = `https://raw.githubusercontent.com/${sourceRepo}/${pinnedCommit}/src/renderer/src/assets`;

const assets = [
  ["ATTRIBUTION.md", "ATTRIBUTION.md"],
  ["characters/Adam_walk.png", "characters/Adam_walk.png"],
  ["characters/Alex_walk.png", "characters/Alex_walk.png"],
  ["characters/Amelia_walk.png", "characters/Amelia_walk.png"],
  ["characters/Bob_walk.png", "characters/Bob_walk.png"],
  ["maps/office.tmj", "maps/office.tmj"],
  ["tilesets/A2 Office Floors.png", "tilesets/A2 Office Floors.png"],
  ["tilesets/A4 Office Walls.png", "tilesets/A4 Office Walls.png"],
  ["tilesets/a5-office-floors-walls.png", "tilesets/a5-office-floors-walls.png"],
  ["tilesets/interiors.png", "tilesets/interiors.png"],
  ["tilesets/office-tileset.png", "tilesets/office-tileset.png"],
  ["tilesets/room-builder.png", "tilesets/room-builder.png"],
  ["tilesets/LIMEZUASSETS-LICENSE.txt", "tilesets/LIMEZUASSETS-LICENSE.txt"],
];

function fail(message) {
  console.error(message);
  process.exit(1);
}

function git(args) {
  return spawnSync("git", args, { cwd: root, encoding: "utf8" });
}

function assertIgnored() {
  const result = git(["check-ignore", "-q", "public/local-assets/operations-floor/manifest.json"]);
  if (result.status !== 0) {
    fail(
      "Local asset directory is not ignored by Git. Refusing to download third-party assets into the repository."
    );
  }
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function readManifest() {
  if (!existsSync(manifestPath)) return null;
  try {
    return JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch {
    return null;
  }
}

function status() {
  const manifest = readManifest();
  if (!manifest) {
    console.log("installed=false");
    console.log(`target=${targetRoot}`);
    return;
  }

  console.log("installed=true");
  console.log(`target=${targetRoot}`);
  console.log(`source_repo=${manifest.sourceRepo || sourceRepo}`);
  console.log(`source_commit=${manifest.sourceCommit || "unknown"}`);
  console.log(`asset_count=${Array.isArray(manifest.files) ? manifest.files.length : 0}`);
  console.log(`license=${manifest.license || "unknown"}`);
}

async function install() {
  if (!accepted) {
    fail(
      [
        "This optional asset pack contains LimeZu FREE VERSION artwork used by Munder Difflin.",
        "The bundled license permits non-commercial projects only.",
        "Re-run with --accept-noncommercial-license only for your personal/non-commercial OmniRoute installation.",
        "",
        "Example:",
        "node scripts/dev/operations-floor-local-assets.mjs install --accept-noncommercial-license",
      ].join("\n")
    );
  }

  assertIgnored();
  mkdirSync(targetRoot, { recursive: true });

  const files = [];
  for (const [sourcePath, destinationPath] of assets) {
    const url = `${rawBase}/${sourcePath.split("/").map(encodeURIComponent).join("/")}`;
    const response = await fetch(url, {
      headers: {
        "user-agent": "OmniRoute-Operations-Floor-Local-Asset-Installer",
      },
    });
    if (!response.ok) {
      fail(`Download failed: ${response.status} ${response.statusText} ${url}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const destination = path.join(targetRoot, destinationPath);
    mkdirSync(path.dirname(destination), { recursive: true });
    writeFileSync(destination, buffer);

    files.push({
      path: destinationPath,
      bytes: buffer.length,
      sha256: sha256(buffer),
      source: url,
    });
    console.log(`downloaded=${destinationPath} bytes=${buffer.length}`);
  }

  const manifest = {
    schemaVersion: 1,
    installedAt: new Date().toISOString(),
    sourceRepo,
    sourceCommit: pinnedCommit,
    license: "LimeZu FREE VERSION — non-commercial projects only",
    usage: "Local personal OmniRoute Operations Floor visual pack",
    files,
  };
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  const statusAfter = git(["status", "--porcelain", "--", "public/local-assets/operations-floor"]);
  if (statusAfter.status !== 0) fail(statusAfter.stderr || "Unable to verify Git status");
  const trackedUnexpected = statusAfter.stdout
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((line) => !line.endsWith("public/local-assets/operations-floor/.gitignore"));
  if (trackedUnexpected.length > 0) {
    fail(`Third-party assets unexpectedly visible to Git:\n${trackedUnexpected.join("\n")}`);
  }

  console.log(`manifest=${manifestPath}`);
  console.log(`source_commit=${pinnedCommit}`);
  console.log(`asset_count=${files.length}`);
  console.log("git_isolation=PASS");
  console.log("OPERATIONS_FLOOR_LOCAL_PIXEL_PACK=PASS");
}

function remove() {
  if (!existsSync(targetRoot)) {
    console.log("OPERATIONS_FLOOR_LOCAL_PIXEL_PACK_NOT_INSTALLED");
    return;
  }

  for (const entry of ["characters", "maps", "tilesets", "ATTRIBUTION.md", "manifest.json"]) {
    rmSync(path.join(targetRoot, entry), { recursive: true, force: true });
  }
  console.log("OPERATIONS_FLOOR_LOCAL_PIXEL_PACK_REMOVED");
}

if (action === "status") status();
else if (action === "install") await install();
else if (action === "remove") remove();
else {
  fail(
    "Usage: node scripts/dev/operations-floor-local-assets.mjs [status|install|remove] [--accept-noncommercial-license]"
  );
}
