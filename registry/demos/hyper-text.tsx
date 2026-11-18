"use client";

import { HyperText } from "@/registry/ui/hyper-text";

export default function Demo(props: Record<string, unknown>) {
  return (
    <div className="flex min-h-40 items-center justify-center p-8">
      <HyperText
        duration={Number(props.duration)}
        startOnView={Boolean(props.startOnView)}
        animateOnHover={Boolean(props.animateOnHover)}
        className="text-4xl font-bold text-neutral-900 dark:text-neutral-100"
      >
        {String(props.children ?? "")}
      </HyperText>
    </div>
  );
}
