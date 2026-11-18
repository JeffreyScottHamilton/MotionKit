import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "image-comparison",
  name: "Image Comparison",
  description: "A before/after slider that reveals two stacked panels, moved by dragging or, with enableHover, by pointer position.",
  category: "visual",
  tags: ["comparison", "slider", "before after", "drag", "reveal"],
  animationType: ["pointer"],
  complexity: "moderate",
  source: {
    project: "motion-primitives",
    projectName: "motion-primitives",
    repoUrl: "https://github.com/ibelick/motion-primitives",
    fileUrl: "https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/image-comparison.tsx",
    commit: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
    author: "ibelick",
    license: "MIT",
    notice: "Copyright (c) 2024 ibelick. Licensed under the MIT License.",
    modified: "Import path rewritten to @/registry/lib/utils; no other code changes.",
  },
  dependencies: ["motion", "clsx", "tailwind-merge"],
  files: ["registry/ui/image-comparison.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion: "No built-in guard. The slider moves only when the user drags or hovers; there is no autoplay.",
  controls: [
    { type: "boolean", prop: "enableHover", label: "Follow pointer hover", default: false },
  ],
  usage: `import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/image-comparison";

export function Example() {
  return (
    <ImageComparison enableHover={ {{enableHover}} } className="h-64 w-full">
      <ImageComparisonImage position="left" src="/before.jpg" alt="Before" />
      <ImageComparisonImage position="right" src="/after.jpg" alt="After" />
      <ImageComparisonSlider className="bg-white" />
    </ImageComparison>
  );
}`,
  addedAt: "2026-11-18",
};
