"use client";

import { TextScramble } from "@/registry/ui/text-scramble";

export default function Demo(props: Record<string, unknown>) {
  return (
    <div className="flex min-h-40 items-center justify-center p-8">
      <TextScramble
        duration={Number(props.duration)}
        speed={Number(props.speed)}
        className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100"
      >
        {String(props.children ?? "")}
      </TextScramble>
    </div>
  );
}
