"use client";

import { TextReveal } from "@/registry/ui/text-reveal";

export default function Demo(props: Record<string, unknown>) {
  return (
    <div className="flex items-center justify-center">
      <TextReveal>{String(props.children ?? "")}</TextReveal>
    </div>
  );
}
