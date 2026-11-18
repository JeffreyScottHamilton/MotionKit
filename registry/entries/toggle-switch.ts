import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "toggle-switch",
  name: "Toggle Switch",
  description: "A switch built on a visually hidden checkbox, with the knob sliding between off and on.",
  category: "buttons",
  tags: ["toggle", "switch", "checkbox", "form", "state"],
  animationType: ["state"],
  complexity: "simple",
  source: {
    project: "animata",
    projectName: "Animata",
    repoUrl: "https://github.com/codse/animata",
    fileUrl: "https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/button/toggle-switch.tsx",
    commit: "25c27e5a874c60a56dcc1609df3b2c4f5f8456f8",
    author: "Animata (codse)",
    license: "MIT",
    notice: "Copyright (c) Animata. Licensed under the MIT License.",
    modified: "Unmodified",
  },
  dependencies: [],
  files: ["registry/ui/toggle-switch.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion: "No guard: the knob slides with a Tailwind transition (transition-all, default 150ms) that still plays under reduced motion.",
  controls: [
    { type: "boolean", prop: "defaultChecked", label: "Default checked", default: false },
  ],
  usage: `import ToggleSwitch from "@/components/ui/toggle-switch"

export function Example() {
  return <ToggleSwitch defaultChecked={{{defaultChecked}}} />
}`,
  addedAt: "2026-11-18",
};
