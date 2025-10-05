import { useEffect, useState } from "react";

const STORAGE_KEY = "site-theme"; // "dark" | "light"

export function useSiteTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved === "dark";
    } catch (e) {
      // ignore
    }
    // fallback to OS preference
    return typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;
  });

  useEffect(() => {
    const className = isDark ? "theme-dark" : "theme-light";
    document.documentElement.classList.remove("theme-dark", "theme-light");
    document.documentElement.classList.add(className);

    try {
      localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    } catch (e) {
      // ignore
    }
  }, [isDark]);

  return { isDark, setIsDark };
}
