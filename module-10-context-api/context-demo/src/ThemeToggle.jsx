import { useTheme } from "./ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
};
