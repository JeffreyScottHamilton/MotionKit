"use client";

import { Magnetic } from "@/registry/ui/magnetic";

const AREAS = ["self", "parent", "global"] as const;

export default function Demo(props: Record<string, unknown>) {
  const actionArea = AREAS.find((area) => area === props.actionArea) ?? "self";
  const intensity = typeof props.intensity === "number" ? props.intensity : 0.6;
  const range = typeof props.range === "number" ? props.range : 100;
  const label = typeof props.children === "string" ? props.children : "Magnetic";

  return (
    <div className="flex min-h-[240px] w-full items-center justify-center p-8">
      <Magnetic intensity={intensity} range={range} actionArea={actionArea}>
        <button
          type="button"
          className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground"
        >
          {label}
        </button>
      </Magnetic>
    </div>
  );
}
