import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "in-view",
  name: "In View",
  description: "Animates its children between hidden and visible variants when they enter the viewport, optionally only once.",
  category: "visual",
  tags: ["in view", "scroll", "intersection", "reveal", "entrance"],
  animationType: ["scroll", "entrance"],
  complexity: "simple",
  source: {
    project: "motion-primitives",
    projectName: "motion-primitives",
    repoUrl: "https://github.com/ibelick/motion-primitives",
    fileUrl: "https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/in-view.tsx",
    commit: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
    author: "ibelick",
    license: "MIT",
    notice: "Copyright (c) 2024 ibelick. Licensed under the MIT License.",
    modified: "Unmodified",
  },
  dependencies: ["motion"],
  files: ["registry/ui/in-view.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion: "Relies on Motion's MotionConfig; no built-in guard. The fade plays when scrolled into view unless the app sets reducedMotion on MotionConfig.",
  controls: [
    { type: "select", prop: "as", label: "Element (as prop)", options: ["div", "section", "p"], default: "div" },
    { type: "boolean", prop: "once", label: "Animate once (once prop)", default: false },
  ],
  usage: `import { InView } from "@/components/ui/in-view";

export function Example() {
  return (
    <InView as="{{as}}" once={ {{once}} }>
      <p>Fades in when scrolled into view</p>
    </InView>
  );
}`,
  addedAt: "2026-11-18",
};
