import { useTheme } from "../context/ThemeContext";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1>Battle Academy</h1>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </header>
  );
}
