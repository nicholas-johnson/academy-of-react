import { useLocalStorage } from "./hooks/useLocalStorage";
import ThemeToggle from "./components/ThemeToggle";
import { stats, recentSpells } from "./data";
import "./App.css";

export default function App() {
  // ⚙️ Custom hook — saves theme choice to localStorage automatically
  const [theme, setTheme] = useLocalStorage("academy-theme", "dark");

  return (
    <div className="app" data-theme={theme}>
      <header className="header">
        <h1 className="title">Academy Dashboard</h1>
        <ThemeToggle
          theme={theme}
          onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      </header>

      <section className="stats-grid">
        {stats.map((stat) => (
          <div className="card" key={stat.label}>
            <span className="card-icon">{stat.icon}</span>
            <span className="card-value">{stat.value}</span>
            <span className="card-label">{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="spells-section">
        <h2 className="section-title">Recent Spells</h2>
        <ul className="spell-list">
          {recentSpells.map((spell) => (
            <li className="spell-item" key={spell.name}>
              <span className="spell-name">{spell.name}</span>
              <span className="spell-meta">
                by {spell.caster} · {spell.element}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
