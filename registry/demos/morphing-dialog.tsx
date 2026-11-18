"use client";

import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/registry/ui/morphing-dialog";

export default function Demo(props: Record<string, unknown>) {
  const duration = Number(props.duration ?? 0.3);

  return (
    <div className="flex min-h-40 items-center justify-center p-6">
      <MorphingDialog transition={{ type: "spring", bounce: 0.05, duration }}>
        <MorphingDialogTrigger className="flex w-56 flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 text-left dark:border-zinc-800 dark:bg-zinc-900">
          <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
            <circle cx="24" cy="24" r="22" className="fill-zinc-100 dark:fill-zinc-800" />
            <path d="M14 31 L24 15 L34 31 Z" className="fill-zinc-400 dark:fill-zinc-500" />
          </svg>
          <MorphingDialogTitle>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Quarterly summary</span>
          </MorphingDialogTitle>
        </MorphingDialogTrigger>
        <MorphingDialogContainer>
          <MorphingDialogContent className="relative mx-4 w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <MorphingDialogTitle>
              <h3 className="pr-8 text-base font-semibold text-zinc-900 dark:text-zinc-100">Quarterly summary</h3>
            </MorphingDialogTitle>
            <MorphingDialogDescription>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                The card expands into this panel and collapses back when you close it.
              </p>
            </MorphingDialogDescription>
            <MorphingDialogClose className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100" />
          </MorphingDialogContent>
        </MorphingDialogContainer>
      </MorphingDialog>
    </div>
  );
}
