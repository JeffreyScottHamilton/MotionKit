"use client";

import { Tilt } from "@/registry/ui/tilt";

export default function Demo(props: Record<string, unknown>) {
  const rotationFactor = typeof props.rotationFactor === "number" ? props.rotationFactor : 15;
  const isRevese = props.isRevese === true;
  return (
    <div className="flex h-72 w-full items-center justify-center">
      <Tilt rotationFactor={rotationFactor} isRevese={isRevese} className="w-64 rounded-xl">
        <div className="flex h-40 flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="h-2 w-12 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <p className="text-sm text-zinc-600 dark:text-zinc-300">Hover to tilt</p>
        </div>
      </Tilt>
    </div>
  );
}
