/* Category loading: demo components are added by the loading import worker. */

import type { ComponentType } from "react";
import dynamic from "next/dynamic";

export const loadingDemos: Record<string, ComponentType<Record<string, unknown>>> = {
  "animated-circular-progress-bar": dynamic(() => import("./animated-circular-progress-bar"), { ssr: false }),
  "scroll-progress": dynamic(() => import("./scroll-progress"), { ssr: false }),
  spinner: dynamic(() => import("./spinner"), { ssr: false }),
  "skeleton-list": dynamic(() => import("./skeleton-list"), { ssr: false }),
};
