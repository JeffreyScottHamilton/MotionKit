"use client";

import { InteractiveGridPattern } from "@/registry/ui/interactive-grid-pattern";

export default function Demo(props: Record<string, unknown>) {
  const columns = typeof props.columns === "number" ? props.columns : 12;
  const rows = typeof props.rows === "number" ? props.rows : 8;
  const cellSize = typeof props.cellSize === "number" ? props.cellSize : 40;
  return (
    <div className="flex w-full justify-center">
      <div
        className="relative overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800"
        style={{ width: columns * cellSize, height: rows * cellSize, maxWidth: "100%" }}
      >
        <InteractiveGridPattern width={cellSize} height={cellSize} squares={[columns, rows]} />
      </div>
    </div>
  );
}
