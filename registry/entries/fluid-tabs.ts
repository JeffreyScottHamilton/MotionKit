import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "fluid-tabs",
  name: "Fluid Tabs",
  description: "Segmented tabs whose selected pill slides between tabs with a spring, with arrow-key navigation.",
  category: "layout",
  tags: ["tabs", "navigation", "segmented", "spring", "keyboard"],
  animationType: ["layout", "state"],
  complexity: "moderate",
  source: {
    project: "animata",
    projectName: "Animata",
    repoUrl: "https://github.com/codse/animata",
    fileUrl: "https://github.com/codse/animata/blob/25c27e5a874c60a56dcc1609df3b2c4f5f8456f8/animata/tabs/fluid-tabs.tsx",
    commit: "25c27e5a874c60a56dcc1609df3b2c4f5f8456f8",
    author: "Animata (codse)",
    license: "MIT",
    notice: "Copyright (c) Animata. Licensed under the MIT License.",
    modified:
      "Import paths rewritten (@/lib/utils to @/registry/lib/utils; ./shared to @/registry/ui/fluid-tabs-shared). shared.ts copied as registry/ui/fluid-tabs-shared.ts.",
  },
  dependencies: ["motion", "clsx", "tailwind-merge"],
  files: ["registry/ui/fluid-tabs.tsx", "registry/ui/fluid-tabs-shared.ts"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion:
    "No Motion guard: the indicator spring and label scale still run. Only the tab button's CSS transition is disabled (motion-reduce:transition-none).",
  controls: [
    {
      type: "number",
      prop: "defaultActiveIndex",
      label: "Initially active tab (defaultActiveIndex)",
      min: 0,
      max: 2,
      step: 1,
      default: 0,
    },
  ],
  usage: `// Also copy fluid-tabs-shared.ts next to fluid-tabs.tsx.
import FluidTabs from "@/components/ui/fluid-tabs";

export function Example() {
  return (
    <FluidTabs defaultActiveIndex={{{defaultActiveIndex}}}>
      <FluidTabs.List aria-label="Example tabs">
        <FluidTabs.Tab label="Overview">Overview</FluidTabs.Tab>
        <FluidTabs.Tab label="Settings">Settings</FluidTabs.Tab>
      </FluidTabs.List>
    </FluidTabs>
  );
}`,
  addedAt: "2026-11-18",
};
