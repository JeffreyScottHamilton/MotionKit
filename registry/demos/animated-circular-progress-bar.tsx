"use client";

import { AnimatedCircularProgressBar } from "@/registry/ui/animated-circular-progress-bar";

export default function Demo(props: Record<string, unknown>) {
  return (
    <div className="flex min-h-56 items-center justify-center">
      <AnimatedCircularProgressBar
        value={Number(props.value ?? 0)}
        gaugePrimaryColor={String(props.gaugePrimaryColor ?? "#d97706")}
        gaugeSecondaryColor={String(props.gaugeSecondaryColor ?? "#e4e4e7")}
      />
    </div>
  );
}
