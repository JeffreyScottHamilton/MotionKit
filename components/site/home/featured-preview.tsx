"use client";

import { demos } from "@/registry/demos";

export function FeaturedPreview({ id, name }: { id: string; name: string }) {
  const Demo = demos[id];

  return (
    <div className="flex h-40 items-center justify-center overflow-hidden rounded-md border border-border bg-muted">
      {Demo ? <Demo /> : <span className="text-sm text-muted-foreground">Preview for {name} is unavailable.</span>}
    </div>
  );
}
