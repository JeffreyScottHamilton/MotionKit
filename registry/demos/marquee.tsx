"use client";

import { Marquee } from "@/registry/ui/marquee";

const items = ["Fade", "Slide", "Scale", "Blur", "Rotate", "Bounce"];

export default function Demo(props: Record<string, unknown>) {
  const reverse = props.reverse === true;
  const pauseOnHover = props.pauseOnHover === true;
  const vertical = props.vertical === true;
  const repeat = typeof props.repeat === "number" ? props.repeat : 4;
  return (
    <div className="flex h-56 w-full max-w-lg items-center justify-center overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
      <Marquee
        reverse={reverse}
        pauseOnHover={pauseOnHover}
        vertical={vertical}
        repeat={repeat}
        className="h-full w-full"
      >
        {items.map((item) => (
          <span
            key={item}
            className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          >
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
