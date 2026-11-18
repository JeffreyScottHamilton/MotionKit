import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "transition-panel",
  name: "Transition Panel",
  description: "Swaps between panels with a slide and fade transition driven by the active index.",
  category: "layout",
  tags: ["panels", "wizard", "steps", "transition", "slide"],
  animationType: ["state"],
  complexity: "simple",
  source: {
    project: "motion-primitives",
    projectName: "motion-primitives",
    repoUrl: "https://github.com/ibelick/motion-primitives",
    fileUrl: "https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/transition-panel.tsx",
    commit: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
    author: "ibelick",
    license: "MIT",
    notice: "Copyright (c) 2024 ibelick. Licensed under the MIT License.",
    modified: "Import path rewritten from @/lib/utils to @/registry/lib/utils.",
  },
  dependencies: ["motion", "clsx", "tailwind-merge"],
  files: ["registry/ui/transition-panel.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion:
    "No built-in guard: the slide and fade run regardless of prefers-reduced-motion; the variants passed in define the motion.",
  controls: [
    {
      type: "number",
      prop: "activeIndex",
      label: "Initial panel index",
      min: 0,
      max: 2,
      step: 1,
      default: 0,
    },
  ],
  usage: `import { useState } from "react";
import { TransitionPanel } from "@/components/ui/transition-panel";

export function Example() {
  const activeIndex = {{activeIndex}};
  return (
    <TransitionPanel
      activeIndex={activeIndex}
      variants={{ enter: { opacity: 0, x: 24 }, center: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 } }}
    >
      <p>Step one</p>
      <p>Step two</p>
    </TransitionPanel>
  );
}`,
  addedAt: "2026-11-18",
};
