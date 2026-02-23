#!/usr/bin/env node
/**
 * legacy-build.js
 *
 * Runs `npm run build` inside legacy/astro-prototype.
 * Skips gracefully on Android/Termux because @astrojs/cloudflare depends on
 * workerd, which does not support android arm64 LE.
 */

import { execSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Detect Android via platform flag or uname output.
function isAndroidPlatform() {
  if (process.platform === "android") return true;
  try {
    const unameOutput = execSync("uname -a", { encoding: "utf8" });
    return unameOutput.includes("Android");
  } catch {
    return false;
  }
}

if (isAndroidPlatform()) {
  console.log(
    "⚠️  Skipping legacy build: @astrojs/cloudflare (workerd) does not support Android/Termux arm64.\n" +
      "   Use GitHub Actions (Ubuntu) to verify the legacy build instead."
  );
  process.exit(0);
}

const legacyDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "legacy",
  "astro-prototype"
);

const result = spawnSync("npm", ["run", "build"], {
  cwd: legacyDir,
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 1);
