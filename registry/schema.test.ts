import { describe, expect, it } from "vitest";
import { validateEntry, type RegistryEntry } from "./schema";

const validEntry: RegistryEntry = {
  id: "word-rotate",
  name: "Word Rotate",
  description: "Rotates through a list of words with an animated transition.",
  category: "text",
  tags: ["text", "loop"],
  animationType: ["loop"],
  complexity: "simple",
  source: {
    project: "magicui",
    projectName: "Magic UI",
    repoUrl: "https://github.com/magicuidesign/magicui",
    fileUrl:
      "https://github.com/magicuidesign/magicui/blob/b0b2e4974b1b68cd5278277c6837a27736e20c3a/apps/www/registry/magicui/word-rotate.tsx",
    commit: "b0b2e4974b1b68cd5278277c6837a27736e20c3a",
    author: "Magic UI",
    license: "MIT",
    notice: "Copyright (c) Magic UI. Licensed under the MIT License.",
    modified: "Unmodified",
  },
  dependencies: ["motion"],
  files: ["registry/ui/word-rotate.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion: "Words change without animation.",
  controls: [{ type: "number", prop: "duration", label: "Duration (ms)", min: 500, max: 5000, step: 100, default: 2500 }],
  usage: "<WordRotate words={{words}} />",
  addedAt: "2026-11-18",
};

describe("validateEntry", () => {
  it("accepts a valid entry", () => {
    expect(validateEntry(validEntry)).toEqual([]);
  });

  it("reports a missing source.fileUrl", () => {
    const broken = {
      ...validEntry,
      source: { ...validEntry.source, fileUrl: "" },
    };
    expect(validateEntry(broken).length).toBeGreaterThan(0);
  });

  it("reports an invalid id", () => {
    expect(validateEntry({ ...validEntry, id: "Word Rotate" }).length).toBeGreaterThan(0);
  });
});
