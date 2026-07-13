/* ⚙️ ENGINE CODE — you don't need to read this file */

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // silently fail if storage is full or unavailable
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
