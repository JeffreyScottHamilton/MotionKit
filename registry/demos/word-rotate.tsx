"use client";

import { useMemo } from "react";
import { WordRotate } from "@/registry/ui/word-rotate";

export default function Demo(props: Record<string, unknown>) {
  const rawWords = String(props.words ?? "");
  const words = useMemo(
    () =>
      rawWords
        .split(",")
        .map((word) => word.trim())
        .filter((word) => word.length > 0),
    [rawWords]
  );

  return (
    <div className="flex min-h-40 items-center justify-center p-8">
      <WordRotate
        words={words.length > 0 ? words : [""]}
        duration={Number(props.duration)}
        className="text-4xl font-semibold text-neutral-900 dark:text-neutral-100"
      />
    </div>
  );
}
