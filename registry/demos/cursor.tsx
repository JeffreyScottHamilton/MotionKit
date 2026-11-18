"use client";

import { Cursor } from "@/registry/ui/cursor";

export default function Demo(props: Record<string, unknown>) {
  const label = typeof props.label === "string" ? props.label : "Cursor";
  return (
    <div className="relative flex h-64 w-full max-w-lg items-center justify-center overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      <Cursor attachToParent>
        <div className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white shadow dark:bg-zinc-50 dark:text-zinc-900">
          {label}
        </div>
      </Cursor>
      <span>Move the pointer over this box</span>
    </div>
  );
}
