import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "accordion",
  name: "Accordion",
  description: "Expandable sections where each item animates its height and opacity open and closed.",
  category: "layout",
  tags: ["accordion", "collapse", "faq", "expand", "disclosure"],
  animationType: ["state"],
  complexity: "simple",
  source: {
    project: "motion-primitives",
    projectName: "motion-primitives",
    repoUrl: "https://github.com/ibelick/motion-primitives",
    fileUrl: "https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/accordion.tsx",
    commit: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
    author: "ibelick",
    license: "MIT",
    notice: "Copyright (c) 2024 ibelick. Licensed under the MIT License.",
    modified:
      "Import path rewritten from @/lib/utils to @/registry/lib/utils; child cast typed as ReactElement<Record<string, unknown>> for React 19 types.",
  },
  dependencies: ["motion", "clsx", "tailwind-merge"],
  files: ["registry/ui/accordion.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion:
    "No built-in guard: items animate height and opacity regardless of prefers-reduced-motion.",
  controls: [
    {
      type: "number",
      prop: "duration",
      label: "Transition duration (s)",
      min: 0.1,
      max: 1,
      step: 0.05,
      default: 0.3,
    },
  ],
  usage: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function Example() {
  return (
    <Accordion transition={{ duration: {{duration}} }}>
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>Orders leave the warehouse within two business days.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  addedAt: "2026-11-18",
};
