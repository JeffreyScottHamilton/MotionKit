import { notFound } from "next/navigation";
import Link from "next/link";
import { readFile } from "fs/promises";
import path from "path";
import type { Metadata } from "next";
import { registry } from "@/registry";
import type { RegistryEntry } from "@/registry/schema";
import { Badge } from "@/components/ui/badge";
import { Playground } from "@/components/site/detail/playground";
import { CodeBlock, CodeFiles, type SourceFile } from "@/components/site/detail/code-block";
import { defaultValues, fillUsage } from "@/components/site/detail/usage";
import { rewriteRegistryImports, usesCn } from "@/components/site/detail/install";

export function generateStaticParams() {
  return registry.map((entry) => ({ id: entry.id }));
}

function findEntry(id: string): RegistryEntry | undefined {
  return registry.find((e) => e.id === id);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const entry = findEntry(id);
  if (!entry) {
    return { title: "Component not found — MotionKit" };
  }
  return {
    title: `${entry.name} — MotionKit`,
    description: entry.description,
  };
}

/** Reads a file under registry/ only, so the build does not trace the whole project. */
async function readRepoFile(repoPath: string): Promise<string> {
  if (!repoPath.startsWith("registry/") || repoPath.includes("..")) {
    throw new Error(`Refusing to read registry path: ${repoPath}`);
  }
  const rest = repoPath.slice("registry/".length);
  return readFile(path.join(process.cwd(), "registry", rest), "utf8");
}

/** Like readRepoFile, but a missing file (ENOENT only) resolves to null. */
async function readOptionalRepoFile(repoPath: string): Promise<string | null> {
  try {
    return await readRepoFile(repoPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

/** Where a registry file lands in a consumer project (see the import note in Installation). */
function installPath(repoPath: string): string {
  if (repoPath.startsWith("registry/ui/")) return `components/ui/${repoPath.slice("registry/ui/".length)}`;
  if (repoPath.startsWith("registry/hooks/")) return `hooks/${repoPath.slice("registry/hooks/".length)}`;
  return repoPath;
}

const FRAMEWORK_LABELS: Record<RegistryEntry["frameworks"][number], string> = {
  next: "Next.js",
  react: "React",
};

const CATEGORY_LABELS: Record<RegistryEntry["category"], string> = {
  text: "Text",
  buttons: "Buttons",
  layout: "Layout",
  loading: "Loading",
  visual: "Visual",
};

export default async function ComponentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = findEntry(id);
  if (!entry) {
    notFound();
  }

  const rawFiles = await Promise.all(
    entry.files.map(async (file) => ({ path: file, raw: await readRepoFile(file) })),
  );
  const files: SourceFile[] = rawFiles.map((file) => ({ path: file.path, code: rewriteRegistryImports(file.raw) }));

  const needsCn = rawFiles.some((file) => usesCn(file.raw));
  const cnHelper = needsCn ? await readRepoFile("registry/lib/utils.ts") : null;

  const stylesCss = await readOptionalRepoFile(`registry/styles/${entry.category}.css`);
  const keyframesCss = stylesCss?.includes("@keyframes") ? stylesCss : null;

  const stepKeys = [
    entry.dependencies.length > 0 ? "dependencies" : null,
    "copy",
    cnHelper ? "cn" : null,
    keyframesCss ? "keyframes" : null,
  ].filter((key): key is string => key !== null);
  const stepNumber = (key: string) => stepKeys.indexOf(key) + 1;

  const defaults = defaultValues(entry.controls);
  const usage = fillUsage(entry.usage, defaults);
  const installCommand = entry.dependencies.length > 0 ? `npm install ${entry.dependencies.join(" ")}` : null;
  const shortCommit = entry.source.commit.slice(0, 7);

  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/components" className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                Components
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground" aria-current="page">
              {entry.name}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{entry.name}</h1>
          <p className="text-muted-foreground">{entry.description}</p>
        </div>

        <ul className="flex flex-wrap gap-2" aria-label="Attributes">
          <li>
            <Badge variant="outline">{CATEGORY_LABELS[entry.category]}</Badge>
          </li>
          <li>
            <Badge variant="outline">Complexity: {entry.complexity}</Badge>
          </li>
          {entry.animationType.map((type) => (
            <li key={type}>
              <Badge variant="secondary">{type}</Badge>
            </li>
          ))}
        </ul>
      </header>

      <section aria-labelledby="playground-heading" className="flex flex-col gap-4">
        <h2 id="playground-heading" className="text-lg font-semibold tracking-tight">
          Playground
        </h2>
        <Playground entry={entry} />
      </section>

      <section aria-labelledby="installation-heading" className="flex flex-col gap-4">
        <h2 id="installation-heading" className="text-lg font-semibold tracking-tight">
          Installation
        </h2>
        <ol className="flex flex-col gap-6">
          {installCommand ? (
            <li className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">{stepNumber("dependencies")}. Install the dependencies</h3>
              <CodeBlock code={installCommand} label="terminal" />
            </li>
          ) : null}
          <li className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">{stepNumber("copy")}. Copy each file into your project</h3>
            <ul className="flex flex-col gap-1 font-mono text-sm">
              {entry.files.map((file) => (
                <li key={file}>
                  <span className="text-muted-foreground">{file}</span>
                  <span aria-hidden="true"> → </span>
                  <span>{installPath(file)}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">
              Imports were rewritten to the shadcn-style <code className="font-mono">@/components/ui</code>,{" "}
              <code className="font-mono">@/hooks</code> and <code className="font-mono">@/lib/utils</code> aliases. The
              original file is linked under Source.
            </p>
          </li>
          {cnHelper ? (
            <li className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">
                {stepNumber("cn")}. Add the cn helper to <code className="font-mono">lib/utils.ts</code> (skip if your project
                already has it, e.g. from shadcn/ui)
              </h3>
              <p className="text-sm text-muted-foreground">
                It needs <code className="font-mono">clsx</code> and <code className="font-mono">tailwind-merge</code>:
              </p>
              <CodeBlock code="npm install clsx tailwind-merge" label="terminal" />
              <CodeBlock code={cnHelper} label="lib/utils.ts" />
            </li>
          ) : null}
          {keyframesCss ? (
            <li className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">{stepNumber("keyframes")}. Add the keyframes</h3>
              <p className="text-sm text-muted-foreground">
                This component uses <code className="font-mono">@keyframes</code> from its category stylesheet.
              </p>
              <CodeBlock code={keyframesCss} label="Add to your global CSS" />
            </li>
          ) : null}
        </ol>
      </section>

      <section aria-labelledby="usage-heading" className="flex flex-col gap-4">
        <h2 id="usage-heading" className="text-lg font-semibold tracking-tight">
          Usage
        </h2>
        <CodeBlock code={usage} label="usage.tsx" />
      </section>

      <section aria-labelledby="code-heading" className="flex flex-col gap-4">
        <h2 id="code-heading" className="text-lg font-semibold tracking-tight">
          Code
        </h2>
        <CodeFiles files={files} />
      </section>

      <section aria-labelledby="dependencies-heading" className="flex flex-col gap-4">
        <h2 id="dependencies-heading" className="text-lg font-semibold tracking-tight">
          Dependencies
        </h2>
        {entry.dependencies.length > 0 ? (
          <ul className="flex flex-col gap-1 text-sm">
            {entry.dependencies.map((dep) => (
              <li key={dep}>
                <a
                  href={`https://www.npmjs.com/package/${dep}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-foreground underline underline-offset-4 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
                >
                  {dep}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No npm dependencies.</p>
        )}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Frameworks</h3>
          <ul className="flex flex-wrap gap-2 text-sm">
            {entry.frameworks.map((framework) => (
              <li key={framework}>
                <Badge variant="outline">{FRAMEWORK_LABELS[framework]}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="a11y-heading" className="flex flex-col gap-4">
        <h2 id="a11y-heading" className="text-lg font-semibold tracking-tight">
          Accessibility &amp; reduced motion
        </h2>
        <p className="text-sm text-muted-foreground">{entry.reducedMotion}</p>
      </section>

      <section aria-labelledby="source-heading" className="flex flex-col gap-4">
        <h2 id="source-heading" className="text-lg font-semibold tracking-tight">
          Source &amp; license
        </h2>
        <p className="text-sm">
          Originally created by {entry.source.author} for{" "}
          <a
            href={entry.source.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
          >
            {entry.source.projectName}
          </a>
          . MotionKit redistributes it under the MIT License with this notice.
        </p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-muted-foreground">Commit</dt>
          <dd className="font-mono">{shortCommit}</dd>
          <dt className="text-muted-foreground">Author</dt>
          <dd>{entry.source.author}</dd>
          <dt className="text-muted-foreground">License</dt>
          <dd>MIT</dd>
          <dt className="text-muted-foreground">Notice</dt>
          <dd>{entry.source.notice}</dd>
          <dt className="text-muted-foreground">Modifications</dt>
          <dd>{entry.source.modified}</dd>
        </dl>
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href={entry.source.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
          >
            View original file
          </a>
          <Link
            href="/notices"
            className="underline underline-offset-4 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
          >
            Third-party notices
          </Link>
        </div>
      </section>
    </article>
  );
}
