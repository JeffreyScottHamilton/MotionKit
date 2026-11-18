import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "disclosure",
  name: "Disclosure",
  description: "A trigger that shows and hides content with an animated height and opacity change.",
  category: "layout",
  tags: ["disclosure", "collapse", "show more", "expand", "toggle"],
  animationType: ["state"],
  complexity: "simple",
  source: {
    project: "motion-primitives",
    projectName: "motion-primitives",
    repoUrl: "https://github.com/ibelick/motion-primitives",
    fileUrl: "https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/disclosure.tsx",
    commit: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
    author: "ibelick",
    license: "MIT",
    notice: "Copyright (c) 2024 ibelick. Licensed under the MIT License.",
    modified:
      "Import path rewritten from @/lib/utils to @/registry/lib/utils; child casts typed for React 19 types. Lint-only eslint-disable-next-line comments for react-hooks/set-state-in-effect and import/no-anonymous-default-export.",
  },
  dependencies: ["motion", "clsx", "tailwind-merge"],
  files: ["registry/ui/disclosure.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion:
    "No built-in guard: height and opacity animate regardless of prefers-reduced-motion.",
  controls: [
    { type: "boolean", prop: "open", label: "Open on mount", default: false },
  ],
  usage: `import { Disclosure, DisclosureTrigger, DisclosureContent } from "@/components/ui/disclosure";

export function Example() {
  return (
    <Disclosure open={{open}}>
      <DisclosureTrigger>
        <button type="button">Shipping details</button>
      </DisclosureTrigger>
      <DisclosureContent>
        <p>Orders ship within two business days.</p>
      </DisclosureContent>
    </Disclosure>
  );
}`,
  addedAt: "2026-11-18",
};
