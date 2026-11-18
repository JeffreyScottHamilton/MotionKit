"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_LINKS } from "@/components/site/docs/links";

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Docs" className="md:w-48 md:shrink-0">
      <ul className="flex flex-wrap gap-1 text-sm md:sticky md:top-6 md:flex-col">
        <li>
          <Link
            href="/docs"
            aria-current={pathname === "/docs" ? "page" : undefined}
            className={
              pathname === "/docs"
                ? "block rounded-md px-3 py-1.5 font-medium text-brand"
                : "block rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground"
            }
          >
            Overview
          </Link>
        </li>
        {DOCS_LINKS.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "block rounded-md px-3 py-1.5 font-medium text-brand"
                    : "block rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground"
                }
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
