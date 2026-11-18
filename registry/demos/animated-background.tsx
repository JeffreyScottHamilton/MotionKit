"use client";

import { AnimatedBackground } from "@/registry/ui/animated-background";

const ITEMS = ["Home", "Projects", "Notes", "About"];

export default function Demo(props: Record<string, unknown>) {
  const enableHover = Boolean(props.enableHover);

  return (
    <div className="flex min-h-40 items-center justify-center p-6">
      <AnimatedBackground
        enableHover={enableHover}
        defaultValue="Home"
        className="rounded-md bg-zinc-200 dark:bg-zinc-800"
        transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
      >
        {ITEMS.map((item) => (
          <button
            key={item}
            type="button"
            data-id={item}
            className="rounded-md px-3 py-1.5 text-sm text-zinc-600 dark:text-zinc-300"
          >
            {item}
          </button>
        ))}
      </AnimatedBackground>
    </div>
  );
}
