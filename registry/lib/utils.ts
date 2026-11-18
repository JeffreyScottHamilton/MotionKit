// From shadcn/ui (https://github.com/shadcn-ui/ui/blob/968d8cb9dc42ae5d52e8fd356cf84596ec832a26/apps/v4/public/r/styles/new-york/utils.json) — MIT, Copyright (c) 2023 shadcn
// Modified: semicolons added to match the repo's Prettier style; no code changes
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
