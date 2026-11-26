import { useEffect, useState } from "react";

import type { ReactNode } from "react";

import { ThemeContext } from "./ThemeContext";

import type { Theme } from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

function getInitialTheme(): Theme {
  try {
    const savedTheme = localStorage.getItem(
      "mdms-theme"
    );

    if (
      savedTheme === "light" ||
      savedTheme === "dark"
    ) {
      return savedTheme;
    }
  } catch {
    // Storage may be unavailable.
  }

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return prefersDark ? "dark" : "light";
}

function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    getInitialTheme
  );

  useEffect(() => {
    document.documentElement.dataset.theme =
      theme;

    try {
      localStorage.setItem("mdms-theme", theme);
    } catch {
      // Theme still works without persistence.
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((previousTheme) =>
      previousTheme === "light"
        ? "dark"
        : "light"
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;