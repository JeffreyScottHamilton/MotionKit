/* Category layout: demo components are added by the layout import worker. */

import type { ComponentType } from "react";
import dynamic from "next/dynamic";

export const layoutDemos: Record<string, ComponentType<Record<string, unknown>>> = {
  "animated-background": dynamic(() => import("./animated-background"), { ssr: false }),
  "fluid-tabs": dynamic(() => import("./fluid-tabs"), { ssr: false }),
  "toolbar-expandable": dynamic(() => import("./toolbar-expandable"), { ssr: false }),
  accordion: dynamic(() => import("./accordion"), { ssr: false }),
  dialog: dynamic(() => import("./dialog"), { ssr: false }),
  "morphing-dialog": dynamic(() => import("./morphing-dialog"), { ssr: false }),
  "transition-panel": dynamic(() => import("./transition-panel"), { ssr: false }),
  disclosure: dynamic(() => import("./disclosure"), { ssr: false }),
};
