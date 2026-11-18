import type { Metadata } from "next";
import { registry } from "@/registry";
import { Directory } from "@/components/site/directory/directory";

export const metadata: Metadata = {
  title: "Components — MotionKit",
};

export default function ComponentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Components</h1>
        <p className="text-muted-foreground">
          {registry.length} components you can copy into your project, each with its source and license notice.
        </p>
      </div>
      <Directory entries={registry} />
    </div>
  );
}
