import { useState, createContext, useContext } from "react";
import "./App.css";

// TODO: Create ThemeContext

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    // TODO: Wrap in ThemeContext.Provider
    <div className={`app theme-${theme}`}>
      <Header />
      <Content />
      <Footer />
      
      <div className="info-box">
        <h3>Your Task</h3>
        <ul>
          <li>Create ThemeContext with createContext()</li>
          <li>Wrap app in ThemeContext.Provider</li>
          <li>Pass theme and toggleTheme as value</li>
          <li>Use useContext in Header, Content, Footer</li>
        </ul>
      </div>
    </div>
  );
}

function Header() {
  // TODO: Use useContext to access theme and toggleTheme
  return (
    <header className="header">
      <h1>Theme Switcher</h1>
      <button className="btn btn-primary">
        Toggle Theme
      </button>
    </header>
  );
}

function Content() {
  // TODO: Use useContext to access theme
  return (
    <main className="content">
      <h2>Main Content</h2>
      <p>Current theme: ???</p>
    </main>
  );
}

function Footer() {
  // TODO: Use useContext to access theme
  return (
    <footer className="footer">
      <p>Footer - Theme: ???</p>
    </footer>
  );
}

export default App;
