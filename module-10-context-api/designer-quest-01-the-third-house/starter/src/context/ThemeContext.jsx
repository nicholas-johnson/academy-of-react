import { createContext, useContext, useState } from "react";

// ============================================================
//  🎨 THEME DATA — This is the part you'll edit!
// ============================================================

const THEMES = {
  phoenix: {
    // 🎨 TASK 2 — Try changing some of these colors
    name: "Phoenix",
    colors: {
      bg: "#1a0a0a",
      surface: "#2d1515",
      text: "#fde8e8",
      primary: "#ef4444",
      accent: "#f97316",
      border: "#7f1d1d",
    },
    font: "'Georgia', serif",
  },
  dragon: {
    // 🎨 TASK 2 — Or change some of these colors
    name: "Dragon",
    colors: {
      bg: "#0a1a0a",
      surface: "#152d15",
      text: "#e8fde8",
      primary: "#22c55e",
      accent: "#10b981",
      border: "#14532d",
    },
    font: "'Trebuchet MS', sans-serif",
  },
  // 🎨 TASK 1 — Add your third house theme here!
  // Copy one of the themes above, give it a new key, new name, and new colors.
  // Example structure:
  //
  // yourhouse: {
  //   name: "Your House",
  //   colors: {
  //     bg: "#??????",
  //     surface: "#??????",
  //     text: "#??????",
  //     primary: "#??????",
  //     accent: "#??????",
  //     border: "#??????",
  //   },
  //   font: "'FontName', serif",
  // },
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
