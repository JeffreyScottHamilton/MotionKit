import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "interactive-grid-pattern",
  name: "Interactive Grid Pattern",
  description: "An SVG grid of squares whose hovered square fills with a color, sized by cell width, height and square counts.",
  category: "visual",
  tags: ["grid", "pattern", "background", "hover", "svg"],
  animationType: ["hover"],
  complexity: "simple",
  source: {
    project: "magicui",
    projectName: "Magic UI",
    repoUrl: "https://github.com/magicuidesign/magicui",
    fileUrl: "https://github.com/magicuidesign/magicui/blob/b0b2e4974b1b68cd5278277c6837a27736e20c3a/apps/www/registry/magicui/interactive-grid-pattern.tsx",
    commit: "b0b2e4974b1b68cd5278277c6837a27736e20c3a",
    author: "Magic UI",
    license: "MIT",
    notice: "Copyright (c) Magic UI. Licensed under the MIT License.",
    modified: "Import path rewritten to @/registry/lib/utils; no other code changes.",
  },
  dependencies: ["clsx", "tailwind-merge"],
  files: ["registry/ui/interactive-grid-pattern.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion: "No motion. Hover only changes a square's fill color, using a CSS color transition.",
  controls: [
    { type: "number", prop: "columns", label: "Columns (demo maps to squares[0])", min: 4, max: 40, step: 1, default: 12 },
    { type: "number", prop: "rows", label: "Rows (demo maps to squares[1])", min: 4, max: 30, step: 1, default: 8 },
    { type: "number", prop: "cellSize", label: "Cell size in px (width and height)", min: 16, max: 80, step: 1, default: 40 },
  ],
  usage: `import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

export function Example() {
  return (
    <div className="relative h-96 w-full">
      <InteractiveGridPattern
        width={ {{cellSize}} }
        height={ {{cellSize}} }
        squares={[ {{columns}}, {{rows}} ]}
      />
    </div>
  );
}`,
  addedAt: "2026-11-18",
};
