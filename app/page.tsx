import Link from "next/link";
import { registry } from "@/registry";
import type { Category, RegistryEntry } from "@/registry/schema";
import { SOURCES } from "@/scripts/sources";
import { Button } from "@/components/ui/button";
import { FeaturedPreview } from "@/components/site/home/featured-preview";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "text", label: "Text" },
  { id: "buttons", label: "Buttons" },
  { id: "layout", label: "Layout" },
  { id: "loading", label: "Loading" },
  { id: "visual", label: "Visual" },
];

const INSTALL_STEPS = [
  "Install the dependencies listed on the component page, for example motion, clsx and tailwind-merge.",
  "Copy the file or files listed under Files on the component page into your project.",
  "Adjust the import paths: point the cn import at your own helper and fix any relative imports.",
];

function bySourceProject(entry: RegistryEntry, id: string) {
  return entry.source.project === id;
}

export default function HomePage() {
  const featured = registry.filter((entry) => entry.featured === true);
  const recent = [...registry]
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt) || a.name.localeCompare(b.name))
    .slice(0, 6);
  const sources = SOURCES.filter((source) => source.id !== "shadcn").map((source) => ({
    ...source,
    count: registry.filter((entry) => bySourceProject(entry, source.id)).length,
  }));

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">MotionKit</h1>
        <p className="text-xl text-muted-foreground">The best of motion, in one place.</p>
        <p className="max-w-2xl text-muted-foreground">
          A free, open-source collection of animation components for React and Next.js, curated from permissively licensed
          projects (Magic UI, motion-primitives, Animata) with attribution. Copy the code, no account.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/components">Browse components</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/docs">How it works</Link>
          </Button>
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="flex flex-col gap-4">
        <h2 id="featured-heading" className="text-xl font-semibold tracking-tight">
          Featured
        </h2>
        {featured.length === 0 ? (
          <p className="text-muted-foreground">No featured components yet.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {featured.map((entry) => (
              <li key={entry.id} className="flex flex-col gap-3 rounded-md border border-border p-3">
                <FeaturedPreview id={entry.id} name={entry.name} />
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/components/${entry.id}`}
                    className="font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {entry.name}
                  </Link>
                  <span className="text-sm text-muted-foreground">Source: {entry.source.projectName}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="categories-heading" className="flex flex-col gap-4">
        <h2 id="categories-heading" className="text-xl font-semibold tracking-tight">
          Categories
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const count = registry.filter((entry) => entry.category === category.id).length;
            return (
              <li key={category.id}>
                <Link
                  href={`/components?category=${category.id}`}
                  className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="font-medium">{category.label}</span>
                  <span className="text-muted-foreground">{count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="recent-heading" className="flex flex-col gap-4">
        <h2 id="recent-heading" className="text-xl font-semibold tracking-tight">
          Recently added
        </h2>
        {recent.length === 0 ? (
          <p className="text-muted-foreground">No components yet.</p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((entry) => (
              <li key={entry.id}>
                <Link
                  href={`/components/${entry.id}`}
                  className="flex flex-col gap-1 rounded-md border border-border px-3 py-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span className="font-medium">{entry.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {entry.source.projectName} · added {entry.addedAt}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="install-heading" className="flex flex-col gap-4">
        <h2 id="install-heading" className="text-xl font-semibold tracking-tight">
          How installation works
        </h2>
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-muted-foreground">
          {INSTALL_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="text-sm">
          <Link href="/docs/installation" className="text-brand underline-offset-4 hover:underline">
            Read the installation guide
          </Link>
        </p>
      </section>

      <section aria-labelledby="sources-heading" className="flex flex-col gap-4">
        <h2 id="sources-heading" className="text-xl font-semibold tracking-tight">
          Sources
        </h2>
        <ul className="flex flex-col divide-y divide-border rounded-md border border-border text-sm">
          {sources.map((source) => (
            <li key={source.id} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2">
              <a
                href={source.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {source.projectName}
              </a>
              <span className="text-muted-foreground">
                License: MIT · {source.count} {source.count === 1 ? "component" : "components"}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
