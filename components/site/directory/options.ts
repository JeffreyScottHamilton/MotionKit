import type { AnimationType, Category, Complexity } from "../../../registry/schema";

export const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "buttons", label: "Buttons" },
  { value: "layout", label: "Layout" },
  { value: "loading", label: "Loading" },
  { value: "visual", label: "Visual" },
];

export const ANIMATION_TYPE_OPTIONS: { value: AnimationType; label: string }[] = [
  { value: "entrance", label: "Entrance" },
  { value: "hover", label: "Hover" },
  { value: "press", label: "Press" },
  { value: "scroll", label: "Scroll" },
  { value: "loop", label: "Loop" },
  { value: "state", label: "State" },
  { value: "pointer", label: "Pointer" },
  { value: "layout", label: "Layout" },
];

export const COMPLEXITY_OPTIONS: { value: Complexity; label: string }[] = [
  { value: "simple", label: "Simple" },
  { value: "moderate", label: "Moderate" },
  { value: "advanced", label: "Advanced" },
];
