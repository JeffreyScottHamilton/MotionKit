"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { href: "/components", label: "Components" },
  { href: "/docs", label: "Docs" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-base font-semibold tracking-tight">
          MotionKit
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 text-sm">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-md px-3 py-1.5 font-medium text-brand"
                    : "rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground"
                }
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href="https://github.com/jeffreyscotthamilton/motionkit"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground"
          >
            GitHub
          </a>
          <span className="ml-2">
            <ThemeToggle />
          </span>
        </nav>
      </div>
    </header>
  );
}
