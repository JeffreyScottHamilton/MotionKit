import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "blur-fade",
  name: "Blur Fade",
  description: "Fades, blurs and offsets its children into place once on mount, with configurable direction, offset, delay and duration.",
  category: "visual",
  tags: ["blur", "fade", "entrance", "reveal", "motion"],
  animationType: ["entrance"],
  complexity: "simple",
  source: {
    project: "magicui",
    projectName: "Magic UI",
    repoUrl: "https://github.com/magicuidesign/magicui",
    fileUrl: "https://github.com/magicuidesign/magicui/blob/b0b2e4974b1b68cd5278277c6837a27736e20c3a/apps/www/registry/magicui/blur-fade.tsx",
    commit: "b0b2e4974b1b68cd5278277c6837a27736e20c3a",
    author: "Magic UI",
    license: "MIT",
    notice: "Copyright (c) Magic UI. Licensed under the MIT License.",
    modified: "Unmodified",
  },
  dependencies: ["motion"],
  files: ["registry/ui/blur-fade.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion: "Relies on Motion's MotionConfig; no built-in guard. The one-time entrance plays unless the app sets reducedMotion on MotionConfig.",
  controls: [
    { type: "number", prop: "duration", label: "Duration (seconds)", min: 0.1, max: 2, step: 0.1, default: 0.4 },
    { type: "number", prop: "delay", label: "Delay (seconds)", min: 0, max: 2, step: 0.1, default: 0 },
    { type: "number", prop: "offset", label: "Offset (px)", min: 0, max: 30, step: 1, default: 6 },
    { type: "select", prop: "direction", label: "Direction", options: ["up", "down", "left", "right"], default: "down" },
    { type: "text", prop: "blur", label: "Blur (CSS length)", default: "6px" },
  ],
  usage: `import { BlurFade } from "@/components/ui/blur-fade";

export function Example() {
  return (
    <BlurFade duration={ {{duration}} } delay={ {{delay}} } offset={ {{offset}} } direction="{{direction}}" blur="{{blur}}">
      <h1>Hello</h1>
    </BlurFade>
  );
}`,
  addedAt: "2026-11-18",
};
