import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold tracking-tight">MotionKit</h1>
      <p className="text-muted-foreground">The best of motion, in one place.</p>
      <div className="flex gap-3 text-sm">
        <Link href="/components" className="rounded-md border border-border px-3 py-1.5">
          Browse components
        </Link>
        <Link href="/docs" className="rounded-md border border-border px-3 py-1.5">
          Read the docs
        </Link>
      </div>
    </div>
  );
}
