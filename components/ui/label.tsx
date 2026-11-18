// From shadcn/ui (https://github.com/shadcn-ui/ui/blob/968d8cb9dc42ae5d52e8fd356cf84596ec832a26/apps/v4/registry/new-york-v4/ui/label.tsx) — MIT, Copyright (c) 2023 shadcn
// Modified: cn imported from @/registry/lib/utils (upstream uses a registry placeholder)
"use client"

import * as React from "react"
import { cn } from "@/registry/lib/utils"
import { Label as LabelPrimitive } from "radix-ui"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
