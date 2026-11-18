import { textEntries } from "./_text";
import { buttonsEntries } from "./_buttons";
import { layoutEntries } from "./_layout";
import { loadingEntries } from "./_loading";
import { visualEntries } from "./_visual";
import type { RegistryEntry } from "../schema";

export const entries: RegistryEntry[] = [
  ...textEntries,
  ...buttonsEntries,
  ...layoutEntries,
  ...loadingEntries,
  ...visualEntries,
];
