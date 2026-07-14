import "./ThemeToggle.css";

function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="toggle-btn" onClick={onToggle}>
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default ThemeToggle;
