import { useState, createContext, useContext } from "react";
import "./App.css";

// Create the context
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app theme-${theme}`}>
        <Header />
        <Content />
        <Footer />
        
        <div className="info-box">
          <h3>useContext Benefits</h3>
          <ul>
            <li>No prop drilling through intermediate components</li>
            <li>Any component can access context directly</li>
            <li>Context updates trigger re-renders</li>
            <li>Great for global state like themes, auth, language</li>
          </ul>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <header className="header">
      <h1>Theme Switcher</h1>
      <button className="btn btn-primary" onClick={toggleTheme}>
        Toggle to {theme === "light" ? "Dark" : "Light"}
      </button>
    </header>
  );
}

function Content() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <main className="content">
      <h2>Main Content</h2>
      <p>Current theme: <strong>{theme}</strong></p>
      <p>This component gets theme from context without props!</p>
    </main>
  );
}

function Footer() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <footer className="footer">
      <p>Footer - Theme: <strong>{theme}</strong></p>
    </footer>
  );
}

export default App;
