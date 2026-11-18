/**
 * Transition Panel — from motion-primitives (https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/transition-panel.tsx)
 * Original author: ibelick. License: MIT. Copyright (c) 2024 ibelick. Licensed under the MIT License.
 * Modified: Import path rewrite only (@/lib/utils -> @/registry/lib/utils).
 */
'use client';
import {
  AnimatePresence,
  Transition,
  Variant,
  motion,
  MotionProps,
} from 'motion/react';
import { cn } from '@/registry/lib/utils';

export type TransitionPanelProps = {
  children: React.ReactNode[];
  className?: string;
  transition?: Transition;
  activeIndex: number;
  variants?: { enter: Variant; center: Variant; exit: Variant };
} & MotionProps;

export function TransitionPanel({
  children,
  className,
  transition,
  variants,
  activeIndex,
  ...motionProps
}: TransitionPanelProps) {
  return (
    <div className={cn('relative', className)}>
      <AnimatePresence
        initial={false}
        mode='popLayout'
        custom={motionProps.custom}
      >
        <motion.div
          key={activeIndex}
          variants={variants}
          transition={transition}
          initial='enter'
          animate='center'
          exit='exit'
          {...motionProps}
        >
          {children[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
