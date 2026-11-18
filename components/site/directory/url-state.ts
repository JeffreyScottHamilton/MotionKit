import type { AnimationType, Category, Complexity, SourceId } from "../../../registry/schema";
import { ANIMATION_TYPE_OPTIONS, CATEGORY_OPTIONS, COMPLEXITY_OPTIONS } from "./options";
import type { FilterState } from "./filter";

/** Facet state that is mirrored into the URL (favorites are stored locally, only the favorites-only flag is in the URL). */
export type UrlState = Omit<FilterState, "favorites">;

const SOURCE_IDS: readonly SourceId[] = ["magicui", "motion-primitives", "animata"];

function pick<T extends string>(values: string[], allowed: readonly T[]): T[] {
  return Array.from(new Set(values)).filter((value): value is T => (allowed as readonly string[]).includes(value));
}

export function emptyUrlState(): UrlState {
  return {
    query: "",
    categories: [],
    animationTypes: [],
    complexities: [],
    sources: [],
    dependencies: [],
    favoritesOnly: false,
  };
}

/** Reads ?q=&category=&animation=&complexity=&source=&dep=&fav=1. Unknown values are dropped. */
export function parseUrlState(params: URLSearchParams, knownDependencies: readonly string[]): UrlState {
  return {
    query: params.get("q") ?? "",
    categories: pick<Category>(
      params.getAll("category"),
      CATEGORY_OPTIONS.map((o) => o.value),
    ),
    animationTypes: pick<AnimationType>(
      params.getAll("animation"),
      ANIMATION_TYPE_OPTIONS.map((o) => o.value),
    ),
    complexities: pick<Complexity>(
      params.getAll("complexity"),
      COMPLEXITY_OPTIONS.map((o) => o.value),
    ),
    sources: pick<SourceId>(params.getAll("source"), SOURCE_IDS),
    dependencies: pick<string>(params.getAll("dep"), knownDependencies),
    favoritesOnly: params.get("fav") === "1",
  };
}

/** Writes the facet state back to a query string (without the leading "?"). */
export function buildUrlQuery(state: UrlState): string {
  const params = new URLSearchParams();
  const query = state.query.trim();
  if (query !== "") params.set("q", query);
  for (const value of state.categories) params.append("category", value);
  for (const value of state.animationTypes) params.append("animation", value);
  for (const value of state.complexities) params.append("complexity", value);
  for (const value of state.sources) params.append("source", value);
  for (const value of state.dependencies) params.append("dep", value);
  if (state.favoritesOnly) params.set("fav", "1");
  return params.toString();
}
