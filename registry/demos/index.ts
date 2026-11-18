import type { ComponentType } from "react";
import { textDemos } from "./_text";
import { buttonsDemos } from "./_buttons";
import { layoutDemos } from "./_layout";
import { loadingDemos } from "./_loading";
import { visualDemos } from "./_visual";

export const demos: Record<string, ComponentType<Record<string, unknown>>> = {
  ...textDemos,
  ...buttonsDemos,
  ...layoutDemos,
  ...loadingDemos,
  ...visualDemos,
};
