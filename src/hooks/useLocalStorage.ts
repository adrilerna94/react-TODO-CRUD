"use client";
import {useState} from "react";

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue; // SSR safety
    const stored = localStorage.getItem(key);

    return stored ? JSON.parse(stored) : defaultValue;
  });

  const setLocalStorageStateValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setLocalStorageValue(value);
  };

  return [localStorageValue, setLocalStorageStateValue];
}

/*

📌 <T> es una variable de tipo genérico.
   🤔 Sirve para que tu función trabaje con cualquier tipo de dato, sin perder el tipado estático.

*/
