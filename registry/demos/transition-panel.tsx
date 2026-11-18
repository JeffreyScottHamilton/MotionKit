"use client";

import { useState } from "react";
import { TransitionPanel } from "@/registry/ui/transition-panel";

const PANELS = [
  { title: "Step one", body: "Choose the plan that fits your team." },
  { title: "Step two", body: "Invite collaborators and set their permissions." },
  { title: "Step three", body: "Review the summary and confirm." },
];

function PanelStepper({ initialIndex }: { initialIndex: number }) {
  const [index, setIndex] = useState(initialIndex);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <TransitionPanel
        activeIndex={index}
        className="w-full"
        transition={{ duration: 0.25, ease: "easeInOut" }}
        variants={{
          enter: { opacity: 0, x: 24 },
          center: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -24 },
        }}
      >
        {PANELS.map((panel) => (
          <div
            key={panel.title}
            className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{panel.title}</p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{panel.body}</p>
          </div>
        ))}
      </TransitionPanel>
      <button
        type="button"
        onClick={() => setIndex((current) => (current + 1) % PANELS.length)}
        className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
      >
        Next
      </button>
    </div>
  );
}

export default function Demo(props: Record<string, unknown>) {
  const activeIndex = Number(props.activeIndex ?? 0);

  return (
    <div className="flex min-h-40 items-center justify-center p-6">
      <PanelStepper key={activeIndex} initialIndex={activeIndex} />
    </div>
  );
}
