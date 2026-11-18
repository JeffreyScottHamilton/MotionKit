"use client";

import Spinner from "@/registry/ui/spinner";

export default function Demo(props: Record<string, unknown>) {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <Spinner
        outerSize={String(props.outerSize ?? "")}
        childSize={String(props.childSize ?? "")}
      />
    </div>
  );
}
