import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, time = 250) {
  const [debounceValue, setDebounceValue] = useState<T>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, [value, time]);

  return debounceValue;
}
