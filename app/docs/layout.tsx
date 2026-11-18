import type { ReactNode } from "react";
import { DocsNav } from "@/components/site/docs/docs-nav";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:gap-10">
      <DocsNav />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
