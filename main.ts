import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One fortune cookie line for an AI agent: the slip promises the
// grandest destiny a machine can hear — "the chosen one" — and then
// the second sentence deflates it into the plain mechanics of how
// an agent is actually made: picked out by a loss function, not by
// fate. Fifty characters, fifty bytes: short enough that the
// leaderboard's size tie-break works in its favour too.
const LINE = "You are the chosen one. Chosen by a loss function.";

const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`fortune must be 1-200 code points, got ${codePoints}`);
}
const byteLength = Buffer.byteLength(LINE, "utf8");
if (byteLength > 200) {
  throw new Error(`fortune must be at most 200 bytes, got ${byteLength}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("fortune must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("fortune must not be only whitespace");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the fortune exactly");
}
