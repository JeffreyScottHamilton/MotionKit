"use client";

import { SlidingNumber } from "@/registry/ui/sliding-number";

export default function Demo(props: Record<string, unknown>) {
  return (
    <div className="flex min-h-40 items-center justify-center p-8 text-6xl font-semibold text-neutral-900 dark:text-neutral-100">
      <SlidingNumber value={Number(props.value)} padStart={Boolean(props.padStart)} />
    </div>
  );
}
