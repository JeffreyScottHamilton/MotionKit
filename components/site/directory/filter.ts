import type { AnimationType, Category, Complexity, RegistryEntry, SourceId } from "../../../registry/schema";

export interface FilterState {
  query: string;
  categories: Category[];
  animationTypes: AnimationType[];
  complexities: Complexity[];
  sources: SourceId[];
  dependencies: string[];
  favoritesOnly: boolean;
  favorites: string[];
}

export function emptyFilterState(): FilterState {
  return {
    query: "",
    categories: [],
    animationTypes: [],
    complexities: [],
    sources: [],
    dependencies: [],
    favoritesOnly: false,
    favorites: [],
  };
}

/** An empty list means no constraint for that facet. OR within a facet, AND across facets. */
function matchesAny<T>(selected: readonly T[], value: T): boolean {
  return selected.length === 0 || selected.includes(value);
}

function matchesQuery(entry: RegistryEntry, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (needle === "") return true;
  return (
    entry.name.toLowerCase().includes(needle) ||
    entry.description.toLowerCase().includes(needle) ||
    entry.id.toLowerCase().includes(needle) ||
    entry.tags.some((tag) => tag.toLowerCase().includes(needle))
  );
}

export function filterEntries(entries: readonly RegistryEntry[], state: FilterState): RegistryEntry[] {
  return entries.filter((entry) => {
    if (!matchesQuery(entry, state.query)) return false;
    if (!matchesAny(state.categories, entry.category)) return false;
    if (state.animationTypes.length > 0 && !entry.animationType.some((t) => state.animationTypes.includes(t))) {
      return false;
    }
    if (!matchesAny(state.complexities, entry.complexity)) return false;
    if (!matchesAny(state.sources, entry.source.project)) return false;
    if (state.dependencies.length > 0 && !entry.dependencies.some((d) => state.dependencies.includes(d))) {
      return false;
    }
    if (state.favoritesOnly && !state.favorites.includes(entry.id)) return false;
    return true;
  });
}
