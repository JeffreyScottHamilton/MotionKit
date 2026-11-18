"use client";

import { RippleButton } from "@/registry/ui/ripple-button";

export default function Demo(props: Record<string, unknown>) {
  const label = typeof props.children === "string" ? props.children : "Click me";
  const rippleColor = typeof props.rippleColor === "string" ? props.rippleColor : "#ffffff";
  const duration = typeof props.duration === "string" ? props.duration : "600ms";

  return (
    <div className="flex min-h-[200px] w-full items-center justify-center p-8">
      <RippleButton rippleColor={rippleColor} duration={duration}>
        {label}
      </RippleButton>
    </div>
  );
}
