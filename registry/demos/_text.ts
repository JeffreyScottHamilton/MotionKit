/* Category text: demo components, loaded lazily per contract. */

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const textDemos: Record<string, ComponentType<Record<string, unknown>>> = {
  "typing-animation": dynamic(() => import("./typing-animation"), { ssr: false }),
  "text-reveal": dynamic(() => import("./text-reveal"), { ssr: false }),
  "word-rotate": dynamic(() => import("./word-rotate"), { ssr: false }),
  "number-ticker": dynamic(() => import("./number-ticker"), { ssr: false }),
  "hyper-text": dynamic(() => import("./hyper-text"), { ssr: false }),
  "text-effect": dynamic(() => import("./text-effect"), { ssr: false }),
  "sliding-number": dynamic(() => import("./sliding-number"), { ssr: false }),
  "text-scramble": dynamic(() => import("./text-scramble"), { ssr: false }),
  "text-shimmer": dynamic(() => import("./text-shimmer"), { ssr: false }),
};
