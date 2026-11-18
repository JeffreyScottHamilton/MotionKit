import { readFileSync } from "node:fs";
import path from "node:path";
import type { Page } from "@playwright/test";

export interface ProvenanceRow {
  id: string;
  name: string;
  files: string[];
}

/** Reads provenance.json at the repo root (one row per registry component). */
export function loadProvenance(): ProvenanceRow[] {
  const file = path.resolve(__dirname, "..", "provenance.json");
  return JSON.parse(readFileSync(file, "utf8")) as ProvenanceRow[];
}

/** Absolute path of a repo-relative file (e.g. a registry file from provenance `files`). */
export function repoFile(relative: string): string {
  return path.resolve(__dirname, "..", relative);
}

/**
 * Collects console errors and uncaught page errors. Attach before navigating.
 * No messages are ignored by default; add narrow filters here only if a
 * message is clearly a known third-party/framework warning (list them in the report).
 */
export function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  return errors;
}

/** The live preview region inside the Playground section (data-testid="playground-preview"). */
export function playgroundPreview(page: Page) {
  return page.getByTestId("playground-preview");
}

/** The generated usage snippet inside the Playground section. */
export function playgroundUsage(page: Page) {
  return page.locator('section[aria-labelledby="playground-heading"] pre code');
}
