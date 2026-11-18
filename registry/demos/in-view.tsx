"use client";

import { InView } from "@/registry/ui/in-view";

type Tag = "div" | "section" | "p";

export default function Demo(props: Record<string, unknown>) {
  const as = (typeof props.as === "string" ? props.as : "div") as Tag;
  const once = props.once === true;
  return (
    <div className="flex h-72 w-full max-w-md flex-col overflow-y-auto rounded-md border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex h-48 shrink-0 items-end justify-center text-xs text-zinc-400">Scroll down</div>
      <InView
        as={as}
        once={once}
        variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      >
        <span className="my-4 block rounded-md border border-zinc-200 bg-white p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
          Fades in when it enters the viewport
        </span>
      </InView>
      <div className="h-48 shrink-0" />
    </div>
  );
}
