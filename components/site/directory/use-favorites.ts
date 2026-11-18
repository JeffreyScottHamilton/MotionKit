"use client";

import { useCallback, useEffect, useState } from "react";

export const FAVORITES_STORAGE_KEY = "motionkit:favorites";

function readFavorites(): string[] {
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (raw === null) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeFavorites(favorites: string[]): void {
  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Storage may be unavailable (private mode, quota, disabled); favorites then last for this page view only.
  }
}

export interface UseFavorites {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
}

/** Favorite component ids persisted in localStorage. Starts empty so server and first client render match. */
export function useFavorites(): UseFavorites {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Intentional: favorites live in localStorage, which is unreadable during SSR and hydration.
    // Loading once after mount keeps the first render identical to the server HTML.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavorites(readFavorites());
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggle = useCallback((id: string) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      writeFavorites(next);
      return next;
    });
  }, []);

  return { favorites, isFavorite, toggle };
}
