import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "cursor",
  name: "Cursor",
  description: "A custom cursor that follows the pointer with optional spring physics; attachToParent limits it to a parent element, and without it the site cursor is hidden globally.",
  category: "visual",
  tags: ["cursor", "pointer", "follow", "custom cursor"],
  animationType: ["pointer"],
  complexity: "moderate",
  source: {
    project: "motion-primitives",
    projectName: "motion-primitives",
    repoUrl: "https://github.com/ibelick/motion-primitives",
    fileUrl: "https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/cursor.tsx",
    commit: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
    author: "ibelick",
    license: "MIT",
    notice: "Copyright (c) 2024 ibelick. Licensed under the MIT License.",
    modified: "Import path rewritten to @/registry/lib/utils; no other code changes.",
  },
  dependencies: ["motion", "clsx", "tailwind-merge"],
  files: ["registry/ui/cursor.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion: "No built-in guard. The cursor follows the pointer position and has no autoplay or looping motion.",
  controls: [
    { type: "text", prop: "label", label: "Label inside the cursor (demo wrapper)", default: "Cursor" },
  ],
  usage: `import { Cursor } from "@/components/ui/cursor";

export function Example() {
  return (
    <div className="relative h-64">
      <Cursor attachToParent>
        <div className="rounded-full bg-black px-3 py-1 text-xs text-white">{"{{label}}"}</div>
      </Cursor>
    </div>
  );
}`,
  addedAt: "2026-11-18",
};
