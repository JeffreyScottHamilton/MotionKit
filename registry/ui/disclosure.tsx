/**
 * Disclosure — from motion-primitives (https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/components/core/disclosure.tsx)
 * Original author: ibelick. License: MIT. Copyright (c) 2024 ibelick. Licensed under the MIT License.
 * Modified: Import path rewrite (@/lib/utils -> @/registry/lib/utils); typed the cloned child as ReactElement<Record<string, unknown>> and the className/props casts as ReactElement<{ className?: string }> in DisclosureTrigger (React 19 types child props as unknown). Lint-only: eslint-disable-next-line comments for react-hooks/set-state-in-effect and import/no-anonymous-default-export.
 */
'use client';
import * as React from 'react';
import {
  AnimatePresence,
  motion,
  MotionConfig,
  Transition,
  Variant,
  Variants,
} from 'motion/react';
import { createContext, useContext, useState, useId, useEffect } from 'react';
import { cn } from '@/registry/lib/utils';

export type DisclosureContextType = {
  open: boolean;
  toggle: () => void;
  variants?: { expanded: Variant; collapsed: Variant };
};

const DisclosureContext = createContext<DisclosureContextType | undefined>(
  undefined
);

export type DisclosureProviderProps = {
  children: React.ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  variants?: { expanded: Variant; collapsed: Variant };
};

function DisclosureProvider({
  children,
  open: openProp,
  onOpenChange,
  variants,
}: DisclosureProviderProps) {
  const [internalOpenValue, setInternalOpenValue] = useState<boolean>(openProp);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInternalOpenValue(openProp);
  }, [openProp]);

  const toggle = () => {
    const newOpen = !internalOpenValue;
    setInternalOpenValue(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  return (
    <DisclosureContext.Provider
      value={{
        open: internalOpenValue,
        toggle,
        variants,
      }}
    >
      {children}
    </DisclosureContext.Provider>
  );
}

function useDisclosure() {
  const context = useContext(DisclosureContext);
  if (!context) {
    throw new Error('useDisclosure must be used within a DisclosureProvider');
  }
  return context;
}

export type DisclosureProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  variants?: { expanded: Variant; collapsed: Variant };
  transition?: Transition;
};

export function Disclosure({
  open: openProp = false,
  onOpenChange,
  children,
  className,
  transition,
  variants,
}: DisclosureProps) {
  return (
    <MotionConfig transition={transition}>
      <div className={className}>
        <DisclosureProvider
          open={openProp}
          onOpenChange={onOpenChange}
          variants={variants}
        >
          {React.Children.toArray(children)[0]}
          {React.Children.toArray(children)[1]}
        </DisclosureProvider>
      </div>
    </MotionConfig>
  );
}

export function DisclosureTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { toggle, open } = useDisclosure();

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
              onClick: toggle,
              role: 'button',
              'aria-expanded': open,
              tabIndex: 0,
              onKeyDown: (e: { key: string; preventDefault: () => void }) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle();
                }
              },
              className: cn(
                className,
                (child as React.ReactElement<{ className?: string }>).props.className
              ),
              ...(child as React.ReactElement<{ className?: string }>).props,
            })
          : child;
      })}
    </>
  );
}

export function DisclosureContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, variants } = useDisclosure();
  const uniqueId = useId();

  const BASE_VARIANTS: Variants = {
    expanded: {
      height: 'auto',
      opacity: 1,
    },
    collapsed: {
      height: 0,
      opacity: 0,
    },
  };

  const combinedVariants = {
    expanded: { ...BASE_VARIANTS.expanded, ...variants?.expanded },
    collapsed: { ...BASE_VARIANTS.collapsed, ...variants?.collapsed },
  };

  return (
    <div className={cn('overflow-hidden', className)}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={uniqueId}
            initial='collapsed'
            animate='expanded'
            exit='collapsed'
            variants={combinedVariants}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Disclosure,
  DisclosureProvider,
  DisclosureTrigger,
  DisclosureContent,
};
