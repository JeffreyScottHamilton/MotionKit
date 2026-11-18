/* Category loading: components are added by the loading import worker. */

import type { RegistryEntry } from "../schema";
import { entry as animatedCircularProgressBar } from "./animated-circular-progress-bar";
import { entry as scrollProgress } from "./scroll-progress";
import { entry as spinner } from "./spinner";
import { entry as skeletonList } from "./skeleton-list";

export const loadingEntries: RegistryEntry[] = [
  animatedCircularProgressBar,
  scrollProgress,
  spinner,
  skeletonList,
];
