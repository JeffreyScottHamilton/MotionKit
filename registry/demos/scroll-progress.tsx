"use client";

import { useRef } from "react";
import { ScrollProgress } from "@/registry/ui/scroll-progress";

const paragraphs = [
  "Scroll inside this panel to move the progress bar at its top edge.",
  "The bar belongs to this scroll container, so it does not follow the page.",
  "Its scale is driven by how far this panel has been scrolled.",
  "Adjust the spring stiffness and bar color with the controls.",
  "Keep scrolling to reach the end of the panel.",
  "The bar reaches full width when the bottom of the panel is in view.",
];

export default function Demo(props: Record<string, unknown>) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const stiffness = Number(props.stiffness ?? 200);
  const color = String(props.color ?? "#d97706");

  return (
    <div className="w-full max-w-md">
      <div
        ref={containerRef}
        className="relative h-56 overflow-y-auto rounded-md border border-zinc-200 bg-white p-4 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
      >
        <div className="sticky top-0 z-10 h-1" style={{ color }}>
          <ScrollProgress
            containerRef={containerRef}
            springOptions={{ stiffness }}
            className="absolute inset-x-0 top-0 h-1 bg-current"
          />
        </div>
        {paragraphs.map((text, i) => (
          <p key={`p-${i}`} className="mb-4">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
