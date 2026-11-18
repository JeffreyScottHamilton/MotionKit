import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "tilt",
  name: "Tilt",
  description: "Wraps children in a 3D perspective container that rotates toward the pointer, with a configurable rotation factor.",
  category: "visual",
  tags: ["tilt", "3d", "pointer", "hover", "card"],
  animationType: ["pointer"],
  complexity: "simple",
  source: {
    project: "motion-primitives",
    projectName: "motion-primitives",
    repoUrl: "https://github.com/ibelick/motion-primitives",
    fileUrl: "https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/tilt.tsx",
    commit: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
    author: "ibelick",
    license: "MIT",
    notice: "Copyright (c) 2024 ibelick. Licensed under the MIT License.",
    modified: "Unmodified",
  },
  dependencies: ["motion"],
  files: ["registry/ui/tilt.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion: "No built-in guard. Rotation is driven only by pointer position over the element (no autoplay), capped at rotationFactor degrees.",
  controls: [
    { type: "number", prop: "rotationFactor", label: "Rotation factor (degrees)", min: 0, max: 45, step: 1, default: 15 },
    { type: "boolean", prop: "isRevese", label: "Reverse direction (isRevese prop)", default: false },
  ],
  usage: `import { Tilt } from "@/components/ui/tilt";

export function Example() {
  return (
    <Tilt rotationFactor={ {{rotationFactor}} } isRevese={ {{isRevese}} }>
      <div className="h-40 w-64 rounded-xl border bg-white p-5">Hover to tilt</div>
    </Tilt>
  );
}`,
  addedAt: "2026-11-18",
  featured: true,
};
