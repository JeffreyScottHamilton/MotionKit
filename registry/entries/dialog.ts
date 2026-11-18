import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "dialog",
  name: "Dialog",
  description: "A modal dialog that scales and fades in, rendered in a portal with a backdrop and scroll lock.",
  category: "layout",
  tags: ["dialog", "modal", "overlay", "portal", "scale"],
  animationType: ["entrance", "state"],
  complexity: "moderate",
  source: {
    project: "motion-primitives",
    projectName: "motion-primitives",
    repoUrl: "https://github.com/ibelick/motion-primitives",
    fileUrl: "https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/dialog.tsx",
    commit: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
    author: "ibelick",
    license: "MIT",
    notice: "Copyright (c) 2024 ibelick. Licensed under the MIT License.",
    modified:
      "Import paths rewritten (@/lib/utils to @/registry/lib/utils; @/hooks/usePreventScroll to @/registry/hooks/usePreventScroll). Lint-only eslint-disable-next-line comment for react-hooks/set-state-in-effect.",
  },
  dependencies: ["motion", "lucide-react", "react-dom", "clsx", "tailwind-merge"],
  files: ["registry/ui/dialog.tsx", "registry/hooks/usePreventScroll.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion:
    "No built-in guard: the dialog scales and fades in and out regardless of prefers-reduced-motion.",
  controls: [
    { type: "boolean", prop: "defaultOpen", label: "Open on mount", default: false },
  ],
  usage: `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export function Example() {
  return (
    <Dialog defaultOpen={{defaultOpen}}>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent className="w-80 bg-white p-6">
        <DialogHeader>
          <DialogTitle>Example dialog</DialogTitle>
          <DialogDescription>Press Escape, click the backdrop, or use the close button.</DialogDescription>
        </DialogHeader>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}`,
  addedAt: "2026-11-18",
};
