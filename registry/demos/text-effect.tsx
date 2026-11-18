"use client";

import { TextEffect, type PerType, type PresetType } from "@/registry/ui/text-effect";

export default function Demo(props: Record<string, unknown>) {
  const per = props.per as PerType;
  const preset = props.preset as PresetType;
  return (
    <div className="flex min-h-40 items-center justify-center p-8">
      <TextEffect
        per={per}
        preset={preset}
        delay={Number(props.delay)}
        speedReveal={Number(props.speedReveal)}
        trigger={Boolean(props.trigger)}
        className="text-center text-3xl font-semibold text-neutral-900 dark:text-neutral-100"
      >
        {String(props.children ?? "")}
      </TextEffect>
    </div>
  );
}
