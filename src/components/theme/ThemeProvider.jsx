import { createContext, useContext, useEffect, useState } from "react";

const initialState = {
  theme: { mode: "light", color: "zinc" },
  setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({
  children,
  defaultTheme = { mode: "light", color: "zinc" },
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem(storageKey);
    try {
      return storedTheme ? JSON.parse(storedTheme) : defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    const mode = theme?.mode;

    if (mode === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(mode);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (themeObj) => {
      localStorage.setItem(storageKey, JSON.stringify(themeObj));
      setTheme(themeObj);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};