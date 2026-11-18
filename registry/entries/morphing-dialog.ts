import type { RegistryEntry } from "../schema";

export const entry: RegistryEntry = {
  id: "morphing-dialog",
  name: "Morphing Dialog",
  description: "A card that morphs into a full-screen dialog with a shared layout transition, closing on Escape or outside click.",
  category: "layout",
  tags: ["dialog", "modal", "morph", "shared layout", "card", "expand"],
  animationType: ["layout", "state"],
  complexity: "advanced",
  source: {
    project: "motion-primitives",
    projectName: "motion-primitives",
    repoUrl: "https://github.com/ibelick/motion-primitives",
    fileUrl: "https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/morphing-dialog.tsx",
    commit: "120f64f6ca60348e251f929e9c81f11ccbe45eda",
    author: "ibelick",
    license: "MIT",
    notice: "Copyright (c) 2024 ibelick. Licensed under the MIT License.",
    modified:
      "Import paths rewritten (@/lib/utils to @/registry/lib/utils; @/hooks/useClickOutside to @/registry/hooks/useClickOutside); reducedMotion=\"user\" added to the root MotionConfig in MorphingDialog so the morph is disabled under prefers-reduced-motion. Lint-only eslint-disable-next-line comment for react-hooks/set-state-in-effect.",
  },
  dependencies: ["motion", "lucide-react", "react-dom", "clsx", "tailwind-merge"],
  files: ["registry/ui/morphing-dialog.tsx", "registry/hooks/useClickOutside.tsx"],
  installation: "copy",
  frameworks: ["next", "react"],
  reducedMotion:
    "Under prefers-reduced-motion, MotionConfig reducedMotion=\"user\" disables the transform and layout morph; opacity fades still run.",
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
  usage: `import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogDescription,
  MorphingDialogClose,
} from "@/components/ui/morphing-dialog";

export function Example() {
  return (
    <MorphingDialog transition={{ type: "spring", bounce: 0.05, duration: {{duration}} }}>
      <MorphingDialogTrigger className="rounded-xl bg-white p-4">
        <MorphingDialogTitle>
          <span>Quarterly summary</span>
        </MorphingDialogTitle>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="w-full max-w-sm rounded-2xl bg-white p-6">
          <MorphingDialogTitle>
            <h3>Quarterly summary</h3>
          </MorphingDialogTitle>
          <MorphingDialogDescription>
            <p>Details go here.</p>
          </MorphingDialogDescription>
          <MorphingDialogClose />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}`,
  addedAt: "2026-11-18",
  featured: true,
};
