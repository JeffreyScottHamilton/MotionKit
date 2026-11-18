"use client";

import { TextShimmer } from "@/registry/ui/text-shimmer";

export default function Demo(props: Record<string, unknown>) {
  return (
    <div className="flex min-h-40 items-center justify-center p-8">
      <TextShimmer
        duration={Number(props.duration)}
        spread={Number(props.spread)}
        className="text-3xl font-semibold"
      >
        {String(props.children ?? "")}
      </TextShimmer>
    </div>
  );
}
