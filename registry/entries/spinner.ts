import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "spinner",
  name: "Spinner",
  description: "A gradient ring that rotates continuously to indicate loading.",
  category: "loading",
  tags: ["spinner", "loading", "rotate", "indicator"],
  animationType: ["loop"],
  complexity: "simple",
  source: {
    project: "animata",
    projectName: "Animata",
    repoUrl: "https://github.com/codse/animata",
    fileUrl: "https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/progress/spinner.tsx",
    commit: "25c27e5a874c60a56dcc1609df3b2c4f5f8456f8",
    author: "Animata (codse)",
    license: "MIT",
    notice: "Copyright (c) Animata. Licensed under the MIT License.",
    modified:
      "Import path rewritten from @/lib/utils to @/registry/lib/utils; added motion-reduce:animate-none to the outer element so the continuous spin stops under prefers-reduced-motion.",
  },
  dependencies: ["clsx", "tailwind-merge"],
  files: ["registry/ui/spinner.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion:
    "The outer ring stops rotating (motion-reduce:animate-none) and stays as a static gradient ring.",
  controls: [
    { type: "text", prop: "outerSize", label: "Outer size classes (outerSize)", default: "h-12 w-12" },
    { type: "text", prop: "childSize", label: "Inner circle size classes (childSize)", default: "h-10 w-10" },
  ],
  usage: `import Spinner from "@/components/ui/spinner";

export function Example() {
  return <Spinner outerSize="{{outerSize}}" childSize="{{childSize}}" />;
}`,
  addedAt: "2026-11-18",
};
