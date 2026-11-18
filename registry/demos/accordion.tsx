"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion";

const ITEMS = [
  { value: "shipping", title: "Shipping", body: "Orders leave the warehouse within two business days." },
  { value: "returns", title: "Returns", body: "Items can be returned within thirty days of delivery." },
  { value: "support", title: "Support", body: "Replies usually arrive within one working day." },
];

export default function Demo(props: Record<string, unknown>) {
  const duration = Number(props.duration ?? 0.3);

  return (
    <div className="flex min-h-40 w-full items-center justify-center p-6">
      <Accordion
        transition={{ duration }}
        className="w-full max-w-sm divide-y divide-zinc-200 rounded-lg border border-zinc-200 px-4 dark:divide-zinc-800 dark:border-zinc-800"
      >
        {ITEMS.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className="flex w-full items-center justify-between py-3 text-left text-sm font-medium">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="pb-3 text-sm text-zinc-600 dark:text-zinc-400">
              {item.body}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
