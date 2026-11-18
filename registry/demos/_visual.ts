/* Category visual: demo wrappers, loaded client-side only. */

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const visualDemos: Record<string, ComponentType<Record<string, unknown>>> = {
  cursor: dynamic(() => import("./cursor"), { ssr: false }),
  tilt: dynamic(() => import("./tilt"), { ssr: false }),
  "image-comparison": dynamic(() => import("./image-comparison"), { ssr: false }),
  "blur-fade": dynamic(() => import("./blur-fade"), { ssr: false }),
  "in-view": dynamic(() => import("./in-view"), { ssr: false }),
  "interactive-grid-pattern": dynamic(() => import("./interactive-grid-pattern"), { ssr: false }),
  marquee: dynamic(() => import("./marquee"), { ssr: false }),
  spotlight: dynamic(() => import("./spotlight"), { ssr: false }),
};
