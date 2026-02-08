import { useState, useEffect } from "react";
import "./App.css";

// TODO: Create ThemeContext using createContext()

// TODO: Create ThemeProvider component that:
// - Manages theme state ('light' or 'dark')
// - Loads initial theme from localStorage
// - Saves theme changes to localStorage
// - Provides { theme, toggleTheme } to children

// TODO: Create useTheme custom hook that:
// - Uses useContext to access ThemeContext
// - Throws an error if used outside ThemeProvider

function Header() {
  // TODO: Replace props with useTheme() hook
  const theme = "light"; // Remove this - get from context
  const toggleTheme = () => {}; // Remove this - get from context

  return (
    <header className="header">
      <h1>Battle Academy</h1>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </header>
  );
}

function Content() {
  // TODO: Replace props with useTheme() hook
  const theme = "light"; // Remove this - get from context

  return (
    <div className="content">
      <h2>Welcome, Wizard!</h2>
      <p>
        Current theme: <strong>{theme}</strong>
      </p>
      <p>This component accesses theme without prop drilling!</p>

      <div className="stats">
        <div className="stat-card">
          <span className="stat-icon">Spells</span>
          <div>
            <div className="stat-value">250</div>
            <div className="stat-label">Spells Cast</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">XP</span>
          <div>
            <div className="stat-value">1,420</div>
            <div className="stat-label">Experience</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">Wins</span>
          <div>
            <div className="stat-value">15</div>
            <div className="stat-label">Victories</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  // TODO: Replace props with useTheme() hook
  const theme = "light"; // Remove this - get from context

  return (
    <footer className="footer">
      <p>Theme persists across sessions thanks to localStorage</p>
      <p className="hint">Current: {theme} mode</p>
    </footer>
  );
}

function App() {
  // This state management should move into ThemeProvider
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // TODO: Wrap with ThemeProvider instead of passing props
  // The child components should use useTheme() to access state
  return (
    <div className="app">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Content theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}

export default App;
