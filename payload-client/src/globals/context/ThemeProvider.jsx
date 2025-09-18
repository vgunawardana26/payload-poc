import React, { useContext, createContext, useEffect, useState } from "react";

export const THEMES = {
  FALCO: "brand--blue",
  GABRIEL: "brand--teal",
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(THEMES.GABRIEL);

  const value = { theme, setTheme };
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...Object.values(THEMES));
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "Theme context must be used within a Theme context provider"
    );
  } else {
    return context;
  }
};
