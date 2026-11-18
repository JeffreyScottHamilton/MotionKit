"use client";

import { AnimatedSubscribeButton } from "@/registry/ui/animated-subscribe-button";

export default function Demo(props: Record<string, unknown>) {
  const initial = typeof props.initialLabel === "string" ? props.initialLabel : "Subscribe";
  const subscribed = typeof props.subscribedLabel === "string" ? props.subscribedLabel : "Subscribed";

  return (
    <div className="flex min-h-[200px] w-full items-center justify-center p-8">
      <AnimatedSubscribeButton>
        <span>{initial}</span>
        <span>{subscribed}</span>
      </AnimatedSubscribeButton>
    </div>
  );
}
