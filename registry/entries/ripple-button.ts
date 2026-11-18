import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "ripple-button",
  name: "Ripple Button",
  description: "A button that spawns a scale-and-fade ripple at the click position.",
  category: "buttons",
  tags: ["ripple", "button", "click", "press", "feedback"],
  animationType: ["press"],
  complexity: "simple",
  source: {
    project: "magicui",
    projectName: "Magic UI",
    repoUrl: "https://github.com/magicuidesign/magicui",
    fileUrl: "https://github.com/magicuidesign/magicui/blob/b0b2e4974b1b68cd5278277c6837a27736e20c3a/apps/www/registry/magicui/ripple-button.tsx",
    commit: "b0b2e4974b1b68cd5278277c6837a27736e20c3a",
    author: "Magic UI",
    license: "MIT",
    notice: "Copyright (c) Magic UI. Licensed under the MIT License.",
    modified: "Import path rewritten to @/registry/lib/utils. The animate-rippling keyframes live in registry/styles/buttons.css.",
  },
  dependencies: ["clsx", "tailwind-merge"],
  files: ["registry/ui/ripple-button.tsx", "registry/styles/buttons.css"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion: "No guard: each click plays a one-shot 600ms ripple (scale to 2x and fade). It does not loop and no reduced-motion check is made.",
  controls: [
    { type: "text", prop: "children", label: "Label (children)", default: "Click me" },
    { type: "color", prop: "rippleColor", label: "Ripple color", default: "#ffffff" },
    { type: "text", prop: "duration", label: "Duration (e.g. 600ms)", default: "600ms" },
  ],
  usage: `import { RippleButton } from "@/components/ui/ripple-button"

export function Example() {
  return (
    <RippleButton rippleColor="{{rippleColor}}" duration="{{duration}}">
      {{children}}
    </RippleButton>
  )
}`,
  addedAt: "2026-11-18",
};
