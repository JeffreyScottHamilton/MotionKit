import Link from "next/link";
import { registry } from "@/registry";

export default function ComponentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Components</h1>
      {registry.length === 0 ? (
        <p className="text-muted-foreground">No components yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {registry.map((entry) => (
            <li key={entry.id}>
              <Link href={`/components/${entry.id}`} className="text-brand">
                {entry.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
