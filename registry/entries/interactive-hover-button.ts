import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "interactive-hover-button",
  name: "Interactive Hover Button",
  description: "A pill button whose label slides out on hover to reveal an arrow and a filled dot that expands to fill the button.",
  category: "buttons",
  tags: ["hover", "button", "arrow", "cta"],
  animationType: ["hover"],
  complexity: "simple",
  source: {
    project: "magicui",
    projectName: "Magic UI",
    repoUrl: "https://github.com/magicuidesign/magicui",
    fileUrl: "https://github.com/magicuidesign/magicui/blob/b0b2e4974b1b68cd5278277c6837a27736e20c3a/apps/www/registry/magicui/interactive-hover-button.tsx",
    commit: "b0b2e4974b1b68cd5278277c6837a27736e20c3a",
    author: "Magic UI",
    license: "MIT",
    notice: "Copyright (c) Magic UI. Licensed under the MIT License.",
    modified: "Import path rewritten to @/registry/lib/utils.",
  },
  dependencies: ["lucide-react", "clsx", "tailwind-merge"],
  files: ["registry/ui/interactive-hover-button.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion: "No guard: hover transitions (300ms translate, scale and opacity) still play.",
  controls: [
    { type: "text", prop: "children", label: "Label (children)", default: "Hover me" },
  ],
  usage: `import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

export function Example() {
  return <InteractiveHoverButton>{{children}}</InteractiveHoverButton>
}`,
  addedAt: "2026-11-18",
};
