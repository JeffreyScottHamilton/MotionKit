"use client";

import { useMemo } from "react";
import { registry } from "@/registry";
import { demos } from "@/registry/demos";
import { defaultValues } from "@/components/site/detail/usage";

export function FeaturedPreview({ id, name }: { id: string; name: string }) {
  const Demo = demos[id];
  const demoProps = useMemo(
    () => defaultValues(registry.find((entry) => entry.id === id)?.controls ?? []),
    [id],
  );

  return (
    <div className="flex h-40 items-center justify-center overflow-hidden rounded-md border border-border bg-muted">
      {Demo ? <Demo {...demoProps} /> : <span className="text-sm text-muted-foreground">Preview for {name} is unavailable.</span>}
    </div>
  );
}
