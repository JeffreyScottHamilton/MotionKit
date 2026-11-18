"use client";

import { Spotlight } from "@/registry/ui/spotlight";

export default function Demo(props: Record<string, unknown>) {
  const size = typeof props.size === "number" ? props.size : 200;
  return (
    <div className="relative flex h-64 w-full max-w-lg items-center justify-center overflow-hidden rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <Spotlight size={size} />
      <p className="relative z-10 text-sm text-zinc-500 dark:text-zinc-400">Move the pointer over this box</p>
    </div>
  );
}
