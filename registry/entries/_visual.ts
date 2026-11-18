/* Category visual: component entries. */

import type { RegistryEntry } from "../schema";
import { entry as cursor } from "./cursor";
import { entry as tilt } from "./tilt";
import { entry as imageComparison } from "./image-comparison";
import { entry as blurFade } from "./blur-fade";
import { entry as inView } from "./in-view";
import { entry as interactiveGridPattern } from "./interactive-grid-pattern";
import { entry as marquee } from "./marquee";
import { entry as spotlight } from "./spotlight";

export const visualEntries: RegistryEntry[] = [
  cursor,
  tilt,
  imageComparison,
  blurFade,
  inView,
  interactiveGridPattern,
  marquee,
  spotlight,
];
