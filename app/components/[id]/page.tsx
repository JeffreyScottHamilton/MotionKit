import { notFound } from "next/navigation";
import { registry } from "@/registry";

export function generateStaticParams() {
  return registry.map((entry) => ({ id: entry.id }));
}

export default async function ComponentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = registry.find((e) => e.id === id);
  if (!entry) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">{entry.name}</h1>
      <p className="text-muted-foreground">{entry.description}</p>
    </div>
  );
}
