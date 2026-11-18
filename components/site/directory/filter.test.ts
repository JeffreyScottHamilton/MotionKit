import { describe, expect, it } from "vitest";
import type { RegistryEntry } from "../../../registry/schema";
import { filterEntries, emptyFilterState, type FilterState } from "./filter";

function entry(overrides: Partial<RegistryEntry> & Pick<RegistryEntry, "id">): RegistryEntry {
  return {
    name: overrides.id,
    description: "A component.",
    category: "text",
    tags: [],
    animationType: ["entrance"],
    complexity: "simple",
    source: {
      project: "magicui",
      projectName: "Magic UI",
      repoUrl: "https://example.com/repo",
      fileUrl: "https://example.com/file",
      commit: "abc",
      author: "Author",
      license: "MIT",
      notice: "Notice",
      modified: "Unmodified",
    },
    dependencies: [],
    files: ["registry/ui/x.tsx"],
    installation: "copy",
    frameworks: ["next"],
    reducedMotion: "Disabled.",
    controls: [],
    usage: "",
    addedAt: "2026-11-18",
    ...overrides,
  };
}

const entries: RegistryEntry[] = [
  entry({
    id: "word-rotate",
    name: "Word Rotate",
    description: "Rotates through words.",
    category: "text",
    tags: ["text", "loop"],
    animationType: ["loop"],
    complexity: "simple",
    dependencies: ["motion"],
  }),
  entry({
    id: "ripple-button",
    name: "Ripple Button",
    description: "A button with a ripple on press.",
    category: "buttons",
    tags: ["button"],
    animationType: ["press", "hover"],
    complexity: "moderate",
    dependencies: ["motion", "clsx"],
    source: {
      ...entry({ id: "x" }).source,
      project: "animata",
      projectName: "Animata",
    },
  }),
  entry({
    id: "marquee",
    name: "Marquee",
    description: "Scrolls content horizontally.",
    category: "layout",
    tags: ["scroll"],
    animationType: ["scroll", "loop"],
    complexity: "advanced",
    dependencies: ["tailwind-merge"],
    source: {
      ...entry({ id: "x" }).source,
      project: "motion-primitives",
      projectName: "motion-primitives",
    },
  }),
];

const ids = (list: RegistryEntry[]) => list.map((e) => e.id);

function state(overrides: Partial<FilterState> = {}): FilterState {
  return { ...emptyFilterState(), ...overrides };
}

describe("filterEntries", () => {
  it("returns everything when no constraint is set", () => {
    expect(ids(filterEntries(entries, emptyFilterState()))).toEqual(["word-rotate", "ripple-button", "marquee"]);
  });

  it("matches the query against name, case-insensitively", () => {
    expect(ids(filterEntries(entries, state({ query: "RIPPLE" })))).toEqual(["ripple-button"]);
  });

  it("matches the query against description", () => {
    expect(ids(filterEntries(entries, state({ query: "horizontally" })))).toEqual(["marquee"]);
  });

  it("matches the query against tags", () => {
    expect(ids(filterEntries(entries, state({ query: "loop" })))).toEqual(["word-rotate"]);
  });

  it("matches the query against id", () => {
    expect(ids(filterEntries(entries, state({ query: "word-r" })))).toEqual(["word-rotate"]);
  });

  it("ignores surrounding whitespace in the query", () => {
    expect(ids(filterEntries(entries, state({ query: "  marquee  " })))).toEqual(["marquee"]);
  });

  it("returns nothing when the query matches no field", () => {
    expect(filterEntries(entries, state({ query: "zzz-no-match" }))).toEqual([]);
  });

  it("filters by category with OR within the facet", () => {
    expect(ids(filterEntries(entries, state({ categories: ["text", "layout"] })))).toEqual(["word-rotate", "marquee"]);
  });

  it("filters by animation type with OR within the facet", () => {
    expect(ids(filterEntries(entries, state({ animationTypes: ["press"] })))).toEqual(["ripple-button"]);
    expect(ids(filterEntries(entries, state({ animationTypes: ["loop", "hover"] })))).toEqual([
      "word-rotate",
      "ripple-button",
      "marquee",
    ]);
  });

  it("filters by complexity", () => {
    expect(ids(filterEntries(entries, state({ complexities: ["advanced"] })))).toEqual(["marquee"]);
  });

  it("filters by source project", () => {
    expect(ids(filterEntries(entries, state({ sources: ["animata", "motion-primitives"] })))).toEqual([
      "ripple-button",
      "marquee",
    ]);
  });

  it("filters by dependency with OR within the facet", () => {
    expect(ids(filterEntries(entries, state({ dependencies: ["clsx"] })))).toEqual(["ripple-button"]);
    expect(ids(filterEntries(entries, state({ dependencies: ["motion"] })))).toEqual(["word-rotate", "ripple-button"]);
  });

  it("combines facets with AND", () => {
    expect(
      ids(filterEntries(entries, state({ categories: ["buttons", "text"], dependencies: ["motion"] }))),
    ).toEqual(["word-rotate", "ripple-button"]);
    expect(
      ids(filterEntries(entries, state({ categories: ["buttons"], complexities: ["simple"] }))),
    ).toEqual([]);
  });

  it("combines query with facets using AND", () => {
    expect(ids(filterEntries(entries, state({ query: "button", animationTypes: ["hover"] })))).toEqual([
      "ripple-button",
    ]);
    expect(ids(filterEntries(entries, state({ query: "button", categories: ["text"] })))).toEqual([]);
  });

  it("keeps only favorites when favoritesOnly is set", () => {
    const result = filterEntries(entries, state({ favoritesOnly: true, favorites: ["marquee", "unknown"] }));
    expect(ids(result)).toEqual(["marquee"]);
  });

  it("ignores favorites when favoritesOnly is off", () => {
    expect(filterEntries(entries, state({ favoritesOnly: false, favorites: ["marquee"] }))).toHaveLength(3);
  });

  it("returns nothing when favoritesOnly is set and there are no favorites", () => {
    expect(filterEntries(entries, state({ favoritesOnly: true, favorites: [] }))).toEqual([]);
  });

  it("does not mutate the input array", () => {
    const copy = [...entries];
    filterEntries(entries, state({ query: "word" }));
    expect(entries).toEqual(copy);
  });
});
