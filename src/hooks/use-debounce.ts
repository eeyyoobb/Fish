"use client";

import { useCallback, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => Promise<any>>(
  callback: T,
  delay: number
) {
  // Use ref to store the timeout ID across renders
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      return new Promise<ReturnType<T>>((resolve) => {
        // Clear previous timeout if it exists
        if (timeoutId.current) clearTimeout(timeoutId.current);

        // Set a new timeout
        timeoutId.current = setTimeout(async () => {
          const result = await callback(...args);
          resolve(result as ReturnType<T>);
        }, delay);
      });
    },
    [callback, delay]
  );
}
