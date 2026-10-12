import process from "node:process";
import {
  mkdtempSync,
  mkdirSync,
  copyFileSync,
  existsSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
const root = resolve(import.meta.dirname, "..");
const executable = process.env.GITLEAKS_PATH ?? "gitleaks";
const exported = mkdtempSync(join(tmpdir(), "portfolio-scan-"));
try {
  const files = execFileSync(
    "git",
    ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
    { cwd: root },
  )
    .toString()
    .split("\0");
  for (const file of new Set(files)) {
    const source = join(root, file);
    if (!file || !existsSync(source)) continue;
    const destination = join(exported, file);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(source, destination);
  }
  for (const [mode, source] of [
    ["git", root],
    ["dir", exported],
  ]) {
    const result = spawnSync(
      executable,
      [mode, source, "--redact", "--no-banner"],
      { stdio: "inherit" },
    );
    if (result.error)
      throw new Error(
        "Install Gitleaks or set GITLEAKS_PATH to its executable.",
      );
    if (result.status !== 0) process.exitCode = 1;
  }
} finally {
  rmSync(exported, { recursive: true, force: true });
}
