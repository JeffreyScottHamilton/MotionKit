import type { ReactNode } from "react";

/** Shared article wrapper for docs pages. Styles child headings, lists, code and links with plain Tailwind selectors. */
export function DocPage({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 text-sm leading-6 [&_a]:text-brand [&_a]:underline-offset-4 [&_a]:hover:underline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-ring [&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-tight [&_li]:text-muted-foreground [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:text-muted-foreground [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted [&_pre]:p-3 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:space-y-2">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-base text-muted-foreground">{description}</p>
      </header>
      {children}
    </div>
  );
}
