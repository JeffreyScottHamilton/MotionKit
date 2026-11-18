import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "magnetic",
  name: "Magnetic",
  description: "A wrapper that pulls its child toward the pointer with a spring while the pointer is within range.",
  category: "buttons",
  tags: ["magnetic", "cursor", "hover", "spring", "button"],
  animationType: ["pointer"],
  complexity: "moderate",
  source: {
    project: "motion-primitives",
    projectName: "motion-primitives",
    repoUrl: "https://github.com/ibelick/motion-primitives",
    fileUrl: "https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/magnetic.tsx",
    commit: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
    author: "ibelick",
    license: "MIT",
    notice: "Copyright (c) 2024 ibelick. Licensed under the MIT License.",
    modified: "Added reduced-motion guard: useReducedMotion() pins x/y to 0 when prefers-reduced-motion is set. Added an eslint-disable comment for react-hooks/set-state-in-effect on one setIsHovered(true) line.",
  },
  dependencies: ["motion"],
  files: ["registry/ui/magnetic.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion: "Guard added: with prefers-reduced-motion set, the wrapper stays at its resting position and does not follow the pointer.",
  controls: [
    { type: "number", prop: "intensity", label: "Intensity", min: 0, max: 1, step: 0.05, default: 0.6 },
    { type: "number", prop: "range", label: "Range (px)", min: 20, max: 300, step: 10, default: 100 },
    { type: "select", prop: "actionArea", label: "Action area", options: ["self", "parent", "global"], default: "self" },
    { type: "text", prop: "children", label: "Label (children)", default: "Magnetic" },
  ],
  usage: `import { Magnetic } from "@/components/ui/magnetic"

export function Example() {
  return (
    <Magnetic intensity={{{intensity}}} range={{{range}}} actionArea="{{actionArea}}">
      <button type="button" className="rounded-md border px-5 py-2.5 text-sm font-medium">
        {{children}}
      </button>
    </Magnetic>
  )
}`,
  addedAt: "2026-11-18",
  featured: true,
};
