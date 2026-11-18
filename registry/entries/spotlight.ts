import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "spotlight",
  name: "Spotlight",
  description: "A soft glow that follows the pointer inside its parent element and appears while the pointer is over it.",
  category: "visual",
  tags: ["spotlight", "glow", "pointer", "hover", "background"],
  animationType: ["pointer"],
  complexity: "moderate",
  source: {
    project: "motion-primitives",
    projectName: "motion-primitives",
    repoUrl: "https://github.com/ibelick/motion-primitives",
    fileUrl: "https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/spotlight.tsx",
    commit: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
    author: "ibelick",
    license: "MIT",
    notice: "Copyright (c) 2024 ibelick. Licensed under the MIT License.",
    modified: "Import path rewritten to @/registry/lib/utils; no other code changes.",
  },
  dependencies: ["motion", "clsx", "tailwind-merge"],
  files: ["registry/ui/spotlight.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion: "No built-in guard. The glow follows the pointer with a spring (bounce 0) only while the pointer is over the parent; there is no autoplay.",
  controls: [
    { type: "number", prop: "size", label: "Size in px", min: 80, max: 600, step: 10, default: 200 },
  ],
  usage: `import { Spotlight } from "@/components/ui/spotlight";

export function Example() {
  return (
    <div className="relative h-64 overflow-hidden">
      <Spotlight size={ {{size}} } />
    </div>
  );
}`,
  addedAt: "2026-11-18",
};
