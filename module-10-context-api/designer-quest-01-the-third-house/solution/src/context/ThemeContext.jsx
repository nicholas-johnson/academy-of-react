import { createContext, useContext, useState } from "react";

// ============================================================
//  🎨 THEME DATA — This is the part you'll edit!
// ============================================================

const THEMES = {
  phoenix: {
    name: "Phoenix",
    colors: {
      bg: "#1a0a0a",
      surface: "#2d1515",
      text: "#fde8e8",
      primary: "#ef4444",
      accent: "#fb923c",
      border: "#7f1d1d",
    },
    font: "'Georgia', serif",
  },
  dragon: {
    name: "Dragon",
    colors: {
      bg: "#0a1a0a",
      surface: "#152d15",
      text: "#e8fde8",
      primary: "#22c55e",
      accent: "#10b981",
      border: "#166534",
    },
    font: "'Trebuchet MS', sans-serif",
  },
  serpent: {
    name: "Serpent",
    colors: {
      bg: "#0a0a1a",
      surface: "#15152d",
      text: "#e8e8fd",
      primary: "#8b5cf6",
      accent: "#6366f1",
      border: "#312e81",
    },
    font: "'Palatino', serif",
  },
};

// ============================================================
//  ⚙️ ENGINE CODE — Everything below powers the theme system.
//     You don't need to edit anything here!
// ============================================================

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState("phoenix");
  const theme = THEMES[themeKey];

  const availableThemes = Object.entries(THEMES).map(([key, t]) => ({
    key,
    name: t.name,
  }));

  const value = {
    theme,
    themeKey,
    setThemeKey,
    availableThemes,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
