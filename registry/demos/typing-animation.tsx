"use client";

import { TypingAnimation } from "@/registry/ui/typing-animation";

export default function Demo(props: Record<string, unknown>) {
  const cursorStyle = props.cursorStyle as "line" | "block" | "underscore";
  return (
    <div className="flex min-h-40 items-center justify-center p-8">
      <TypingAnimation
        className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100"
        typeSpeed={Number(props.typeSpeed)}
        loop={Boolean(props.loop)}
        cursorStyle={cursorStyle}
      >
        {String(props.children ?? "")}
      </TypingAnimation>
    </div>
  );
}
