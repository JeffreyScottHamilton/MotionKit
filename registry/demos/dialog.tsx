"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";

export default function Demo(props: Record<string, unknown>) {
  const defaultOpen = Boolean(props.defaultOpen);

  return (
    <div className="flex min-h-40 items-center justify-center p-6">
      <Dialog key={String(defaultOpen)} defaultOpen={defaultOpen}>
        <DialogTrigger className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
          Open dialog
        </DialogTrigger>
        <DialogContent className="w-80 bg-white p-6 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
          <DialogHeader>
            <DialogTitle>Example dialog</DialogTitle>
            <DialogDescription>
              Press Escape, click the backdrop, or use the close button.
            </DialogDescription>
          </DialogHeader>
          <DialogClose />
        </DialogContent>
      </Dialog>
    </div>
  );
}
