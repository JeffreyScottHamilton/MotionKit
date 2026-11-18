import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "marquee",
  name: "Marquee",
  description: "An infinite horizontal or vertical loop that repeats its children, with options to reverse, pause on hover and set the repeat count.",
  category: "visual",
  tags: ["marquee", "loop", "ticker", "infinite scroll", "carousel"],
  animationType: ["loop"],
  complexity: "simple",
  source: {
    project: "magicui",
    projectName: "Magic UI",
    repoUrl: "https://github.com/magicuidesign/magicui",
    fileUrl: "https://github.com/magicuidesign/magicui/blob/b0b2e4974b1b68cd5278277c6837a27736e20c3a/apps/www/registry/magicui/marquee.tsx",
    commit: "b0b2e4974b1b68cd5278277c6837a27736e20c3a",
    author: "Magic UI",
    license: "MIT",
    notice: "Copyright (c) Magic UI. Licensed under the MIT License.",
    modified: "Import path rewritten to @/registry/lib/utils; added motion-reduce:animate-none to the looping track (no other code changes).",
  },
  dependencies: ["clsx", "tailwind-merge"],
  files: ["registry/ui/marquee.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion: "Under prefers-reduced-motion the loop is disabled (motion-reduce:animate-none): content stays static and is clipped by the container. Needs the marquee keyframes from registry/styles/visual.css.",
  controls: [
    { type: "boolean", prop: "reverse", label: "Reverse direction", default: false },
    { type: "boolean", prop: "pauseOnHover", label: "Pause on hover", default: false },
    { type: "boolean", prop: "vertical", label: "Vertical", default: false },
    { type: "number", prop: "repeat", label: "Repeat count", min: 1, max: 8, step: 1, default: 4 },
  ],
  usage: `import { Marquee } from "@/components/ui/marquee";

export function Example() {
  return (
    <Marquee reverse={ {{reverse}} } pauseOnHover={ {{pauseOnHover}} } vertical={ {{vertical}} } repeat={ {{repeat}} } className="[--duration:20s]">
      <span className="rounded-md border px-3 py-1.5">Item</span>
    </Marquee>
  );
}`,
  addedAt: "2026-11-18",
};
