"use client";

import ToggleSwitch from "@/registry/ui/toggle-switch";

export default function Demo(props: Record<string, unknown>) {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center p-8">
      <ToggleSwitch defaultChecked={props.defaultChecked === true} />
    </div>
  );
}
