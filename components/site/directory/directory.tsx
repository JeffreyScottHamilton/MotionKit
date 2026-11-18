"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, Suspense, type ComponentType } from "react";
import { Star } from "lucide-react";
import type { RegistryEntry, SourceId } from "@/registry/schema";
import { demos } from "@/registry/demos";
import { cn } from "@/registry/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { filterEntries } from "./filter";
import { ANIMATION_TYPE_OPTIONS, CATEGORY_OPTIONS, COMPLEXITY_OPTIONS } from "./options";
import { useFavorites } from "./use-favorites";
import { useMediaQuery } from "./use-media-query";
import {
  buildUrlQuery,
  emptyUrlState,
  parseUrlState,
  reconcilePendingWrites,
  type UrlState,
} from "./url-state";

/** Share of a card that must be visible before it starts its live preview on touch devices. */
const AUTO_PREVIEW_RATIO = 0.6;

type ListKey = "categories" | "animationTypes" | "complexities" | "sources" | "dependencies";

interface Option {
  value: string;
  label: string;
}

function toggleIn(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function countActive(state: UrlState): number {
  return (
    state.categories.length +
    state.animationTypes.length +
    state.complexities.length +
    state.sources.length +
    state.dependencies.length +
    (state.favoritesOnly ? 1 : 0)
  );
}

export function Directory({ entries }: { entries: RegistryEntry[] }) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading components…</p>}>
      <DirectoryView entries={entries} />
    </Suspense>
  );
}

function DirectoryView({ entries }: { entries: RegistryEntry[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchId = useId();
  const listRef = useRef<HTMLUListElement>(null);

  const dependencyOptions = useMemo(
    () => Array.from(new Set(entries.flatMap((entry) => entry.dependencies))).sort(),
    [entries],
  );
  const sourceOptions = useMemo<Option[]>(() => {
    const byId = new Map<SourceId, string>();
    for (const entry of entries) byId.set(entry.source.project, entry.source.projectName);
    return Array.from(byId, ([value, label]) => ({ value, label }));
  }, [entries]);

  // Canonical query for the current URL. Changes on back/forward and client navigations, not only on our own writes.
  const paramsKey = searchParams.toString();
  const urlQuery = useMemo(
    () => buildUrlQuery(parseUrlState(new URLSearchParams(paramsKey), dependencyOptions)),
    [paramsKey, dependencyOptions],
  );

  const [state, setState] = useState<UrlState>(() => parseUrlState(searchParams, dependencyOptions));
  const stateRef = useRef(state);
  const pendingWrites = useRef<string[]>([]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Re-derive the facet state when the URL changes from outside this page. Our own router.replace echoes are ignored
  // so typing is not overwritten by a stale URL.
  useEffect(() => {
    const { isEcho, pending } = reconcilePendingWrites(pendingWrites.current, urlQuery);
    pendingWrites.current = pending;
    if (isEcho || urlQuery === buildUrlQuery(stateRef.current)) return;
    setState(parseUrlState(new URLSearchParams(urlQuery), dependencyOptions));
  }, [urlQuery, dependencyOptions]);

  const [previewId, setPreviewId] = useState<string | null>(null);
  const [autoPreviewId, setAutoPreviewId] = useState<string | null>(null);
  const coarsePointer = useMediaQuery("(hover: none)");
  // At most one live preview: a hover/focus preview wins, otherwise the touch auto-preview.
  const activePreviewId = previewId ?? (coarsePointer ? autoPreviewId : null);

  const { favorites, loaded: favoritesLoaded, isFavorite, toggle } = useFavorites();
  const favoritesPending = state.favoritesOnly && !favoritesLoaded;

  const results = useMemo(
    () => filterEntries(entries, { ...state, favorites }),
    [entries, state, favorites],
  );

  // Touch devices have no hover: start the preview of the card that is most in view, one card at a time.
  useEffect(() => {
    const list = listRef.current;
    if (!coarsePointer || !list) return;
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          const id = (record.target as HTMLElement).dataset.entryId;
          if (id === undefined) continue;
          if (record.isIntersecting && record.intersectionRatio >= AUTO_PREVIEW_RATIO) {
            setAutoPreviewId(id);
          } else {
            setAutoPreviewId((current) => (current === id ? null : current));
          }
        }
      },
      { threshold: AUTO_PREVIEW_RATIO },
    );
    for (const card of list.querySelectorAll<HTMLElement>("[data-entry-id]")) observer.observe(card);
    return () => observer.disconnect();
  }, [coarsePointer, results]);

  const hasActive = buildUrlQuery(state) !== "";
  const activeCount = countActive(state);

  function update(next: UrlState) {
    setState(next);
    const query = buildUrlQuery(next);
    const pending = pendingWrites.current;
    const latest = pending.length > 0 ? pending[pending.length - 1] : urlQuery;
    if (query === latest) return;
    pendingWrites.current = [...pending, query];
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function toggleFacet(key: ListKey, value: string) {
    update({ ...state, [key]: toggleIn(state[key], value) } as UrlState);
  }

  function clear() {
    update(emptyUrlState());
  }

  const facets = (
    <FacetPanel
      state={state}
      sourceOptions={sourceOptions}
      dependencyOptions={dependencyOptions.map((value) => ({ value, label: value }))}
      onToggle={toggleFacet}
      onFavoritesOnly={(checked) => update({ ...state, favoritesOnly: checked })}
    />
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <label htmlFor={searchId} className="sr-only">
            Search components
          </label>
          <Input
            id={searchId}
            type="search"
            placeholder="Search by name, description, or tag"
            value={state.query}
            onChange={(event) => update({ ...state, query: event.target.value })}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button type="button" variant="outline" className="md:hidden">
              Filters{activeCount > 0 ? ` (${activeCount})` : ""}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Narrow the component list.</SheetDescription>
            </SheetHeader>
            <div className="px-4">{facets}</div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="button">
                  {favoritesPending
                    ? "Loading favorites…"
                    : `Show ${results.length} ${results.length === 1 ? "component" : "components"}`}
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-8">
        <aside aria-label="Filters" className="hidden w-56 shrink-0 md:block">
          {facets}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex items-center justify-between gap-4 text-sm">
            <p aria-live="polite" className="text-muted-foreground">
              {favoritesPending
                ? "Loading favorites…"
                : hasActive
                  ? `${results.length} of ${entries.length} components`
                  : `${entries.length} components`}
            </p>
            <Button type="button" variant="ghost" size="sm" onClick={clear} disabled={!hasActive}>
              Clear filters
            </Button>
          </div>

          {favoritesPending ? (
            <p className="text-sm text-muted-foreground">Loading favorites…</p>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-start gap-3 rounded-md border border-border p-6">
              <p className="text-sm text-muted-foreground">No components match these filters.</p>
              <Button type="button" variant="outline" size="sm" onClick={clear}>
                Clear filters
              </Button>
            </div>
          ) : (
            <ul ref={listRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((entry) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  favorite={isFavorite(entry.id)}
                  previewing={activePreviewId === entry.id}
                  onPreview={setPreviewId}
                  onToggleFavorite={() => toggle(entry.id)}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

interface FacetPanelProps {
  state: UrlState;
  sourceOptions: Option[];
  dependencyOptions: Option[];
  onToggle: (key: ListKey, value: string) => void;
  onFavoritesOnly: (checked: boolean) => void;
}

function FacetPanel({ state, sourceOptions, dependencyOptions, onToggle, onFavoritesOnly }: FacetPanelProps) {
  const prefix = useId();
  return (
    <div className="flex flex-col gap-6">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={state.favoritesOnly}
          onChange={(event) => onFavoritesOnly(event.target.checked)}
          className="size-4 accent-brand"
        />
        Favorites only
      </label>
      <FacetGroup
        id={`${prefix}-category`}
        legend="Category"
        options={CATEGORY_OPTIONS}
        selected={state.categories}
        onToggle={(value) => onToggle("categories", value)}
      />
      <FacetGroup
        id={`${prefix}-animation`}
        legend="Animation type"
        options={ANIMATION_TYPE_OPTIONS}
        selected={state.animationTypes}
        onToggle={(value) => onToggle("animationTypes", value)}
      />
      <FacetGroup
        id={`${prefix}-complexity`}
        legend="Complexity"
        options={COMPLEXITY_OPTIONS}
        selected={state.complexities}
        onToggle={(value) => onToggle("complexities", value)}
      />
      <FacetGroup
        id={`${prefix}-source`}
        legend="Source project"
        options={sourceOptions}
        selected={state.sources}
        onToggle={(value) => onToggle("sources", value)}
      />
      <FacetGroup
        id={`${prefix}-dependency`}
        legend="Dependency"
        options={dependencyOptions}
        selected={state.dependencies}
        onToggle={(value) => onToggle("dependencies", value)}
        className="max-h-56 overflow-y-auto pr-1"
      />
    </div>
  );
}

interface FacetGroupProps {
  id: string;
  legend: string;
  options: readonly Option[];
  selected: readonly string[];
  onToggle: (value: string) => void;
  className?: string;
}

function FacetGroup({ id, legend, options, selected, onToggle, className }: FacetGroupProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-sm font-medium">{legend}</legend>
      <div className={cn("flex flex-col gap-2", className)}>
        {options.map((option, index) => {
          const inputId = `${id}-${index}`;
          return (
            <div key={option.value} className="flex items-center gap-2">
              <input
                id={inputId}
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={() => onToggle(option.value)}
                className="size-4 accent-brand"
              />
              <label htmlFor={inputId} className="text-sm">
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

interface EntryCardProps {
  entry: RegistryEntry;
  favorite: boolean;
  previewing: boolean;
  onPreview: (id: string | null) => void;
  onToggleFavorite: () => void;
}

function EntryCard({ entry, favorite, previewing, onPreview, onToggleFavorite }: EntryCardProps) {
  const Demo: ComponentType<Record<string, unknown>> | undefined = demos[entry.id];
  const demoProps = useMemo(
    () => Object.fromEntries(entry.controls.map((control) => [control.prop, control.default])),
    [entry.controls],
  );
  const categoryLabel = CATEGORY_OPTIONS.find((o) => o.value === entry.category)?.label ?? entry.category;
  const complexityLabel = COMPLEXITY_OPTIONS.find((o) => o.value === entry.complexity)?.label ?? entry.complexity;

  return (
    <li
      data-entry-id={entry.id}
      className="relative flex flex-col overflow-hidden rounded-md border border-border bg-background"
      onMouseEnter={() => onPreview(entry.id)}
      onMouseLeave={() => onPreview(null)}
      onFocus={() => onPreview(entry.id)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onPreview(null);
      }}
    >
      <div
        className={cn(
          "flex h-40 items-center justify-center overflow-hidden border-b border-border bg-muted/40",
          previewing ? "relative z-10" : "pointer-events-none",
        )}
      >
        {previewing && Demo ? (
          <Demo {...demoProps} />
        ) : (
          <span aria-hidden="true" className="line-clamp-2 px-4 text-center text-2xl font-semibold tracking-tight text-muted-foreground">
            {entry.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/components/${entry.id}`}
            className="rounded-sm font-medium tracking-tight after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {entry.name}
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-pressed={favorite}
            aria-label={favorite ? `Remove ${entry.name} from favorites` : `Add ${entry.name} to favorites`}
            onClick={onToggleFavorite}
            className="relative z-10 shrink-0"
          >
            <Star aria-hidden="true" className={cn("size-4", favorite && "fill-brand text-brand")} />
          </Button>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">{entry.description}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          <Badge variant="outline">{categoryLabel}</Badge>
          <Badge variant="outline">{entry.source.projectName}</Badge>
          <Badge variant="outline">{complexityLabel}</Badge>
        </div>
      </div>
    </li>
  );
}
