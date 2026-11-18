import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "skeleton-list",
  name: "Skeleton List",
  description: "A static placeholder card with six rows and two action buttons, shown while list content loads.",
  category: "loading",
  tags: ["skeleton", "placeholder", "list", "loading"],
  animationType: ["hover"],
  complexity: "simple",
  source: {
    project: "animata",
    projectName: "Animata",
    repoUrl: "https://github.com/codse/animata",
    fileUrl: "https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/skeleton/list.tsx",
    commit: "25c27e5a874c60a56dcc1609df3b2c4f5f8456f8",
    author: "Animata (codse)",
    license: "MIT",
    notice: "Copyright (c) Animata. Licensed under the MIT License.",
    modified: "Unmodified",
  },
  dependencies: [],
  files: ["registry/ui/skeleton-list.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion:
    "No animation. The only transition is the card's box-shadow on hover, which does not move content.",
  controls: [],
  usage: `import List from "@/components/ui/skeleton-list";

export function Example() {
  return <List />;
}`,
  addedAt: "2026-11-18",
};
