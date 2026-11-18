import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "scroll-progress",
  name: "Scroll Progress",
  description: "A bar whose horizontal scale follows scroll progress of the window or a given container, smoothed by a spring.",
  category: "loading",
  tags: ["progress", "scroll", "reading", "bar", "container"],
  animationType: ["scroll"],
  complexity: "simple",
  source: {
    project: "motion-primitives",
    projectName: "motion-primitives",
    repoUrl: "https://github.com/ibelick/motion-primitives",
    fileUrl: "https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/scroll-progress.tsx",
    commit: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
    author: "ibelick",
    license: "MIT",
    notice: "Copyright (c) 2024 ibelick. Licensed under the MIT License.",
    modified:
      "Import path rewritten from @/lib/utils to @/registry/lib/utils; removed the layoutEffect option from useScroll (not in motion 12 types, and it read a ref during render).",
  },
  dependencies: ["motion", "clsx", "tailwind-merge"],
  files: ["registry/ui/scroll-progress.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion:
    "No reduced-motion guard. The bar scales with scroll position through a spring, so it still moves with scrolling under prefers-reduced-motion.",
  controls: [
    { type: "number", prop: "stiffness", label: "Spring stiffness (springOptions.stiffness)", min: 50, max: 400, step: 10, default: 200 },
    { type: "color", prop: "color", label: "Bar color (demo wrapper; sets currentColor)", default: "#d97706" },
  ],
  usage: `"use client";

import { useRef } from "react";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export function Example() {
  const containerRef = useRef<HTMLDivElement>(null!);

  return (
    <div ref={containerRef} className="relative h-56 overflow-y-auto">
      <div className="sticky top-0 z-10 h-1">
        <ScrollProgress
          containerRef={containerRef}
          springOptions={{ stiffness: {{stiffness}} }}
          className="absolute inset-x-0 top-0 h-1 bg-foreground"
        />
      </div>
      {/* scrollable content */}
    </div>
  );
}`,
  addedAt: "2026-11-18",
};
