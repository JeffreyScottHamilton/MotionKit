import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>MotionKit is released under the MIT License.</p>
        <Link href="/notices" className="text-brand">
          Third-party notices
        </Link>
      </div>
    </footer>
  );
}
