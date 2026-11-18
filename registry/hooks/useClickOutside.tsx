/**
 * useClickOutside — from motion-primitives (https://github.com/ibelick/motion-primitives/blob/120f64f6ca60348e251f929e9c81f11ccbe45eda/hooks/useClickOutside.tsx)
 * Original author: ibelick. License: MIT. Copyright (c) 2024 ibelick. Licensed under the MIT License.
 * Modified: Type-only compat fix: ref parameter typed RefObject<T | null> (React 19 refs are nullable).
 */
import { RefObject, useEffect } from 'react';

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref || !ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler]);
}

export default useClickOutside;
