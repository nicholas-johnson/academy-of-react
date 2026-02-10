import { useTheme } from "../context/ThemeContext";

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="footer">
      <p>Theme persists across sessions thanks to localStorage</p>
      <p className="hint">Current: {theme} mode</p>
    </footer>
  );
}
