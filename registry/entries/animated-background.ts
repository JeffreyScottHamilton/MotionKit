import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "animated-background",
  name: "Animated Background",
  description: "A shared background that slides between items to mark the active one, using a Motion layout animation.",
  category: "layout",
  tags: ["navigation", "indicator", "tabs", "layout", "shared layout"],
  animationType: ["layout", "state"],
  complexity: "simple",
  source: {
    project: "motion-primitives",
    projectName: "motion-primitives",
    repoUrl: "https://github.com/ibelick/motion-primitives",
    fileUrl: "https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/animated-background.tsx",
    commit: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
    author: "ibelick",
    license: "MIT",
    notice: "Copyright (c) 2024 ibelick. Licensed under the MIT License.",
    modified: "Import path rewritten from @/lib/utils to @/registry/lib/utils. Lint-only eslint-disable-next-line comments for react-hooks/set-state-in-effect and no-explicit-any.",
  },
  dependencies: ["motion", "clsx", "tailwind-merge"],
  files: ["registry/ui/animated-background.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion:
    "No built-in guard. The sliding indicator is a Motion layout animation and runs under prefers-reduced-motion unless the app sets MotionConfig reducedMotion.",
  controls: [
    { type: "boolean", prop: "enableHover", label: "Follow hover instead of click", default: false },
  ],
  usage: `import { AnimatedBackground } from "@/components/ui/animated-background";

export function Example() {
  return (
    <AnimatedBackground enableHover={{{enableHover}}} defaultValue="Home" className="rounded-md bg-zinc-200">
      <button type="button" data-id="Home">Home</button>
      <button type="button" data-id="About">About</button>
    </AnimatedBackground>
  );
}`,
  addedAt: "2026-11-18",
  featured: true,
};
