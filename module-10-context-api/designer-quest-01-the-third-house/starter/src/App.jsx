// ⚙️ ENGINE CODE — This file is fully wired. You don't need to edit it!

import { useTheme } from "./context/ThemeContext.jsx";
import "./App.css";

export default function App() {
  const { theme, themeKey, setThemeKey, availableThemes } = useTheme();

  const themeVars = {
    "--bg": theme.colors.bg,
    "--surface": theme.colors.surface,
    "--text": theme.colors.text,
    "--primary": theme.colors.primary,
    "--accent": theme.colors.accent,
    "--border": theme.colors.border,
    "--font": theme.font,
  };

  return (
    <div className="app" style={themeVars}>
      <header className="header">
        <h1 className="title">The Academy of React</h1>
        <p className="subtitle">
          House <span className="house-name">{theme.name}</span>
        </p>
      </header>

      <nav className="theme-picker">
        <span className="picker-label">Choose your house:</span>
        <div className="picker-buttons">
          {availableThemes.map(({ key, name }) => (
            <button
              key={key}
              className={`theme-btn ${key === themeKey ? "active" : ""}`}
              onClick={() => setThemeKey(key)}
            >
              {name}
            </button>
          ))}
        </div>
      </nav>

      <section className="demo-section">
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-number">42</span>
            <span className="stat-label">Students</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">7</span>
            <span className="stat-label">Quests</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">∞</span>
            <span className="stat-label">Potential</span>
          </div>
        </div>

        <blockquote className="quote-block">
          <p>
            "Every great house begins with a single color — the one that speaks
            to its founder's soul."
          </p>
          <cite>— Professor Hooksweasel</cite>
        </blockquote>

        <div className="action-row">
          <button className="btn btn-primary">Enroll Now</button>
          <button className="btn btn-outline">View Curriculum</button>
        </div>
      </section>

      <footer className="footer">
        <p>
          Current theme: <strong>{theme.name}</strong> — Font:{" "}
          <span style={{ fontFamily: theme.font }}>{theme.font}</span>
        </p>
      </footer>
    </div>
  );
}
