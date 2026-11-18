"use client";

import { InteractiveHoverButton } from "@/registry/ui/interactive-hover-button";

export default function Demo(props: Record<string, unknown>) {
  const label = typeof props.children === "string" ? props.children : "Hover me";

  return (
    <div className="flex min-h-[200px] w-full items-center justify-center p-8">
      <InteractiveHoverButton>{label}</InteractiveHoverButton>
    </div>
  );
}
