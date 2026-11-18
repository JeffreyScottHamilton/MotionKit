import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "status-button",
  name: "Status Button",
  description: "A button that shows a spinner, then a check and confirmation text, then returns to its initial label.",
  category: "buttons",
  tags: ["status", "loading", "success", "button", "cart"],
  animationType: ["state", "loop"],
  complexity: "moderate",
  source: {
    project: "animata",
    projectName: "Animata",
    repoUrl: "https://github.com/codse/animata",
    fileUrl: "https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/button/status-button.tsx",
    commit: "25c27e5a874c60a56dcc1609df3b2c4f5f8456f8",
    author: "Animata (codse)",
    license: "MIT",
    notice: "Copyright (c) Animata. Licensed under the MIT License.",
    modified: "Import path rewritten to @/registry/lib/utils; added \"use client\"; spinner gets motion-reduce:animate-none.",
  },
  dependencies: ["lucide-react", "motion", "clsx", "tailwind-merge"],
  files: ["registry/ui/status-button.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion: "Guard added: the loading spinner uses motion-reduce:animate-none and does not rotate. The short Motion text and icon transitions (75ms and spring) still play.",
  controls: [],
  usage: `import StatusButton from "@/components/ui/status-button"

export function Example() {
  return <StatusButton />
}`,
  addedAt: "2026-11-18",
};
