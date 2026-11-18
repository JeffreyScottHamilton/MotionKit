"use client";

import { BlurFade } from "@/registry/ui/blur-fade";

type Direction = "up" | "down" | "left" | "right";

export default function Demo(props: Record<string, unknown>) {
  const duration = typeof props.duration === "number" ? props.duration : 0.4;
  const delay = typeof props.delay === "number" ? props.delay : 0;
  const offset = typeof props.offset === "number" ? props.offset : 6;
  const direction = (typeof props.direction === "string" ? props.direction : "down") as Direction;
  const blur = typeof props.blur === "string" ? props.blur : "6px";
  return (
    <div className="flex h-64 w-full items-center justify-center">
      <BlurFade
        key={[duration, delay, offset, direction, blur].join("|")}
        duration={duration}
        delay={delay}
        offset={offset}
        direction={direction}
        blur={blur}
        className="w-64 rounded-xl border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
      >
        Blur fade entrance
      </BlurFade>
    </div>
  );
}
