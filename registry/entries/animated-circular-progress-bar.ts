import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "animated-circular-progress-bar",
  name: "Animated Circular Progress Bar",
  description: "A circular gauge whose stroke and percentage label animate to a value between min and max.",
  category: "loading",
  tags: ["progress", "gauge", "circular", "percentage", "loading"],
  animationType: ["state"],
  complexity: "simple",
  source: {
    project: "magicui",
    projectName: "Magic UI",
    repoUrl: "https://github.com/magicuidesign/magicui",
    fileUrl: "https://github.com/magicuidesign/magicui/blob/b0b2e4974b1b68cd5278277c6837a27736e20c3a/apps/www/registry/magicui/animated-circular-progress-bar.tsx",
    commit: "b0b2e4974b1b68cd5278277c6837a27736e20c3a",
    author: "Magic UI",
    license: "MIT",
    notice: "Copyright (c) Magic UI. Licensed under the MIT License.",
    modified: "Import path rewritten from @/lib/utils to @/registry/lib/utils. No other changes.",
  },
  dependencies: ["clsx", "tailwind-merge"],
  files: ["registry/ui/animated-circular-progress-bar.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion:
    "No reduced-motion guard. The stroke animates over 1s when the value changes and the label fades in via tw-animate-css animate-in; neither moves content, so the animation still plays under prefers-reduced-motion.",
  controls: [
    { type: "number", prop: "value", label: "Value (%)", min: 0, max: 100, step: 1, default: 72 },
    { type: "color", prop: "gaugePrimaryColor", label: "Primary gauge color", default: "#d97706" },
    { type: "color", prop: "gaugeSecondaryColor", label: "Secondary gauge color", default: "#e4e4e7" },
  ],
  usage: `import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";

export function Example() {
  return (
    <AnimatedCircularProgressBar
      value={{value}}
      gaugePrimaryColor="{{gaugePrimaryColor}}"
      gaugeSecondaryColor="{{gaugeSecondaryColor}}"
    />
  );
}`,
  addedAt: "2026-11-18",
};
