"use client";

import FluidTabs from "@/registry/ui/fluid-tabs";

const TABS = ["Overview", "Activity", "Settings"];

export default function Demo(props: Record<string, unknown>) {
  const defaultActiveIndex = Number(props.defaultActiveIndex ?? 0);

  return (
    <div className="flex min-h-40 w-full items-center justify-center p-6">
      <FluidTabs key={defaultActiveIndex} defaultActiveIndex={defaultActiveIndex} className="max-w-sm">
        <FluidTabs.List aria-label="Example tabs">
          {TABS.map((tab) => (
            <FluidTabs.Tab key={tab} label={tab}>
              {tab}
            </FluidTabs.Tab>
          ))}
        </FluidTabs.List>
      </FluidTabs>
    </div>
  );
}
