/**
 * Scroll Progress — from motion-primitives (https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/scroll-progress.tsx)
 * Original author: ibelick. License: MIT. Copyright (c) 2024 ibelick. Licensed under the MIT License.
 * Modified: import path rewritten from @/lib/utils to @/registry/lib/utils; removed the layoutEffect option from useScroll (not in motion 12 types, and it read a ref during render).
 */
'use client';

import { motion, SpringOptions, useScroll, useSpring } from 'motion/react';
import { cn } from '@/registry/lib/utils';
import { RefObject } from 'react';

export type ScrollProgressProps = {
  className?: string;
  springOptions?: SpringOptions;
  containerRef?: RefObject<HTMLDivElement>;
};

const DEFAULT_SPRING_OPTIONS: SpringOptions = {
  stiffness: 200,
  damping: 50,
  restDelta: 0.001,
};

export function ScrollProgress({
  className,
  springOptions,
  containerRef,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    ...DEFAULT_SPRING_OPTIONS,
    ...(springOptions ?? {}),
  });

  return (
    <motion.div
      className={cn('inset-x-0 top-0 h-1 origin-left', className)}
      style={{
        scaleX,
      }}
    />
  );
}
