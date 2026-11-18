/* Category text: entries for the text components. */

import type { RegistryEntry } from "../schema";
import { entry as typingAnimationEntry } from "./typing-animation";
import { entry as textRevealEntry } from "./text-reveal";
import { entry as wordRotateEntry } from "./word-rotate";
import { entry as numberTickerEntry } from "./number-ticker";
import { entry as hyperTextEntry } from "./hyper-text";
import { entry as textEffectEntry } from "./text-effect";
import { entry as slidingNumberEntry } from "./sliding-number";
import { entry as textScrambleEntry } from "./text-scramble";
import { entry as textShimmerEntry } from "./text-shimmer";

export const textEntries: RegistryEntry[] = [
  typingAnimationEntry,
  textRevealEntry,
  wordRotateEntry,
  numberTickerEntry,
  hyperTextEntry,
  textEffectEntry,
  slidingNumberEntry,
  textScrambleEntry,
  textShimmerEntry,
];
