import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { registry } from "../registry";
import { demos } from "../registry/demos";
import { validateEntry } from "../registry/schema";

const root = resolve(__dirname, "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};
const declared = new Set([...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.devDependencies ?? {})]);

const problems: string[] = [];
const seen = new Set<string>();

for (const entry of registry) {
  const id = entry.id;
  const fail = (msg: string) => problems.push(`[${id}] ${msg}`);

  if (seen.has(id)) fail("duplicate id");
  seen.add(id);

  for (const p of validateEntry(entry)) fail(p);

  for (const file of entry.files) {
    if (!existsSync(join(root, file))) fail(`files[] entry does not exist: ${file}`);
  }

  const uiPath = `registry/ui/${id}.tsx`;
  if (!entry.files.includes(uiPath)) {
    fail(`files[] must include ${uiPath}`);
  }
  const uiFile = join(root, uiPath);
  if (existsSync(uiFile)) {
    const header = readFileSync(uiFile, "utf8").split("*/")[0] ?? "";
    if (!header.includes(entry.source.fileUrl)) fail(`${uiPath} header lacks fileUrl`);
    if (!header.includes(entry.source.author)) fail(`${uiPath} header lacks author`);
    if (!header.includes("License: MIT")) fail(`${uiPath} header lacks "License: MIT"`);
  } else {
    fail(`missing ${uiPath}`);
  }

  if (!(id in demos)) fail(`no demo registered in registry/demos for id`);

  for (const dep of entry.dependencies) {
    if (!declared.has(dep)) fail(`dependency "${dep}" is not listed in package.json`);
  }
}

if (problems.length > 0) {
  console.error(`Registry validation failed with ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log(`Registry valid: ${registry.length} entries.`);
