"use client";

import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "@/registry/ui/disclosure";

export default function Demo(props: Record<string, unknown>) {
  const open = Boolean(props.open);

  return (
    <div className="flex min-h-40 w-full items-center justify-center p-6">
      <Disclosure
        open={open}
        className="w-full max-w-sm rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
      >
        <DisclosureTrigger>
          <button
            type="button"
            className="flex w-full items-center justify-between text-left text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            Shipping details
            <span aria-hidden="true">+</span>
          </button>
        </DisclosureTrigger>
        <DisclosureContent className="text-sm text-zinc-600 dark:text-zinc-400">
          <p className="pt-3">Orders ship within two business days and arrive in three to five.</p>
        </DisclosureContent>
      </Disclosure>
    </div>
  );
}
