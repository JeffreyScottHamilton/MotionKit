/* Category layout: components are added by the layout import worker. */

import type { RegistryEntry } from "../schema";
import { entry as animatedBackground } from "./animated-background";
import { entry as fluidTabs } from "./fluid-tabs";
import { entry as toolbarExpandable } from "./toolbar-expandable";
import { entry as accordion } from "./accordion";
import { entry as dialog } from "./dialog";
import { entry as morphingDialog } from "./morphing-dialog";
import { entry as transitionPanel } from "./transition-panel";
import { entry as disclosure } from "./disclosure";

export const layoutEntries: RegistryEntry[] = [
  animatedBackground,
  fluidTabs,
  toolbarExpandable,
  accordion,
  dialog,
  morphingDialog,
  transitionPanel,
  disclosure,
];
