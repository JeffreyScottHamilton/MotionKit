/* Category buttons: demo components are added by the buttons import worker. */

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const buttonsDemos: Record<string, ComponentType<Record<string, unknown>>> = {
  "magnetic": dynamic(() => import("./magnetic"), { ssr: false }),
  "ripple-button": dynamic(() => import("./ripple-button"), { ssr: false }),
  "interactive-hover-button": dynamic(() => import("./interactive-hover-button"), { ssr: false }),
  "animated-subscribe-button": dynamic(() => import("./animated-subscribe-button"), { ssr: false }),
  "toggle-switch": dynamic(() => import("./toggle-switch"), { ssr: false }),
  "status-button": dynamic(() => import("./status-button"), { ssr: false }),
};
