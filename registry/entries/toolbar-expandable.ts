import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "toolbar-expandable",
  name: "Toolbar Expandable",
  description: "A floating icon toolbar that expands a panel of content under the selected icon.",
  category: "layout",
  tags: ["toolbar", "menu", "expand", "popover", "icons"],
  animationType: ["state", "layout"],
  complexity: "moderate",
  source: {
    project: "motion-primitives",
    projectName: "motion-primitives",
    repoUrl: "https://github.com/ibelick/motion-primitives",
    fileUrl: "https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/toolbar-expandable.tsx",
    commit: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
    author: "ibelick",
    license: "MIT",
    notice: "Copyright (c) 2024 ibelick. Licensed under the MIT License.",
    modified:
      "Import paths rewritten (@/lib/utils to @/registry/lib/utils; @/hooks/useClickOutside to @/registry/hooks/useClickOutside); 'spring' typed as const in the transition object. Lint-only eslint-disable-next-line comment for react-hooks/set-state-in-effect.",
  },
  dependencies: ["motion", "lucide-react", "react-use-measure", "clsx", "tailwind-merge"],
  files: ["registry/ui/toolbar-expandable.tsx", "registry/hooks/useClickOutside.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion:
    "No built-in guard: the content panel animates height and opacity regardless of prefers-reduced-motion.",
  controls: [],
  usage: `import ToolbarExpandable from "@/components/ui/toolbar-expandable";

// The component is absolutely positioned: place it inside a relative container.
export function Example() {
  return (
    <div className="relative h-72 w-full">
      <ToolbarExpandable />
    </div>
  );
}`,
  addedAt: "2026-11-18",
};
