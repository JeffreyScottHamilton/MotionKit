"use client";

import { NumberTicker } from "@/registry/ui/number-ticker";

export default function Demo(props: Record<string, unknown>) {
  const direction = props.direction === "down" ? "down" : "up";
  return (
    <div className="flex min-h-40 items-center justify-center p-8">
      <NumberTicker
        value={Number(props.value)}
        startValue={Number(props.startValue)}
        direction={direction}
        delay={Number(props.delay)}
        decimalPlaces={Number(props.decimalPlaces)}
        className="text-6xl font-semibold text-neutral-900 dark:text-neutral-100"
      />
    </div>
  );
}
