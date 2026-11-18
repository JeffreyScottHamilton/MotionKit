import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "animated-subscribe-button",
  name: "Animated Subscribe Button",
  description: "A button that toggles between an initial label and a subscribed label with a Motion slide and fade.",
  category: "buttons",
  tags: ["subscribe", "button", "state", "success", "toggle"],
  animationType: ["state"],
  complexity: "moderate",
  source: {
    project: "magicui",
    projectName: "Magic UI",
    repoUrl: "https://github.com/magicuidesign/magicui",
    fileUrl: "https://github.com/magicuidesign/magicui/blob/b0b2e4974b1b68cd5278277c6837a27736e20c3a/apps/www/registry/magicui/animated-subscribe-button.tsx",
    commit: "b0b2e4974b1b68cd5278277c6837a27736e20c3a",
    author: "Magic UI",
    license: "MIT",
    notice: "Copyright (c) Magic UI. Licensed under the MIT License.",
    modified: "Import path rewritten to @/registry/lib/utils.",
  },
  dependencies: ["motion", "clsx", "tailwind-merge"],
  files: ["registry/ui/animated-subscribe-button.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion: "Relies on Motion's MotionConfig; no built-in guard. Without a MotionConfig reducedMotion setting, the one-shot slide and fade on toggle still play.",
  controls: [
    { type: "text", prop: "initialLabel", label: "Initial label", default: "Subscribe" },
    { type: "text", prop: "subscribedLabel", label: "Subscribed label", default: "Subscribed" },
  ],
  usage: `import { AnimatedSubscribeButton } from "@/components/ui/animated-subscribe-button"

export function Example() {
  return (
    <AnimatedSubscribeButton>
      <span>{{initialLabel}}</span>
      <span>{{subscribedLabel}}</span>
    </AnimatedSubscribeButton>
  )
}`,
  addedAt: "2026-11-18",
};
