/* Category buttons: components are added by the buttons import worker. */

import type { RegistryEntry } from "../schema";
import { entry as magnetic } from "./magnetic";
import { entry as rippleButton } from "./ripple-button";
import { entry as interactiveHoverButton } from "./interactive-hover-button";
import { entry as animatedSubscribeButton } from "./animated-subscribe-button";
import { entry as toggleSwitch } from "./toggle-switch";
import { entry as statusButton } from "./status-button";

export const buttonsEntries: RegistryEntry[] = [
  magnetic,
  rippleButton,
  interactiveHoverButton,
  animatedSubscribeButton,
  toggleSwitch,
  statusButton,
];
