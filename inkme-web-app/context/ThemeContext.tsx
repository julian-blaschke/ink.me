//credit: https://jeffjadulco.com/blog/dark-mode-react-tailwind/
import { createContext, FC, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({ theme: "light", setTheme: () => null });

function getInitialTheme() {
  if (typeof window !== undefined && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      if (storedPrefs === "light" || storedPrefs === "dark") {
        return storedPrefs as Theme;
      }
    }
    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return "dark" as Theme;
    }
  }
  //default
  return "light" as Theme;
}

export const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const rawSetTheme = (theme: Theme) => {
    const root = window.document.documentElement;
    const isDark = theme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add("color-theme", theme);

    localStorage.setItem("color-theme", theme);
  };

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  //listen for changes
  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
