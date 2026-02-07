import { useState } from "react";
import "./App.css";

// Translation data - already provided
const translations = {
  common: {
    title: "Battle Academy",
    welcome: "Welcome, Adventurer!",
    spells: "Spells",
    inventory: "Inventory",
    quests: "Quests",
    fireball: "Fireball",
    iceBlast: "Ice Blast",
    heal: "Heal",
    shield: "Shield",
    settings: "Settings",
    language: "Language",
    power: "Power",
    mana: "Mana Cost",
  },
  elvish: {
    title: "Magor Academy",
    welcome: "Mae govannen, Roquen!",
    spells: "Lúthien",
    inventory: "Parma",
    quests: "Tirion",
    fireball: "Nárië Rocco",
    iceBlast: "Helcë Surë",
    heal: "Envinyatar",
    shield: "Turma",
    settings: "Samnar",
    language: "Lambe",
    power: "Túrë",
    mana: "Curu Tyel",
  },
  draconic: {
    title: "Kepesk Arcaniss",
    welcome: "Thric, Munthrek!",
    spells: "Arcaniss",
    inventory: "Hesi",
    quests: "Svaklar",
    fireball: "Ixen Svent",
    iceBlast: "Vignar Ulhar",
    heal: "Irlym",
    shield: "Vivex",
    settings: "Rigluin",
    language: "Aryte",
    power: "Versel",
    mana: "Svent Thurkear",
  },
};

// TODO: Create LanguageContext using createContext()

// TODO: Create LanguageProvider component that:
// - Manages language state ('common', 'elvish', or 'draconic')
// - Provides a t(key) translation function
// - Provides setLang function to change language
// - value = { language, setLang, t }

// TODO: Create useLanguage custom hook that:
// - Uses useContext to access LanguageContext
// - Throws an error if used outside LanguageProvider

// Header component - currently using props
function Header({ language, setLang, t }) {
  return (
    <header className="header">
      <h1>⚔️ {t("title")}</h1>
      <div className="language-selector">
        <label>{t("language")}:</label>
        <select value={language} onChange={(e) => setLang(e.target.value)}>
          <option value="common">Common</option>
          <option value="elvish">Elvish</option>
          <option value="draconic">Draconic</option>
        </select>
      </div>
    </header>
  );
}

// Navigation component - currently using props
function Navigation({ t }) {
  return (
    <nav className="navigation">
      <button className="nav-btn active">📜 {t("spells")}</button>
      <button className="nav-btn">🎒 {t("inventory")}</button>
      <button className="nav-btn">⚔️ {t("quests")}</button>
      <button className="nav-btn">⚙️ {t("settings")}</button>
    </nav>
  );
}

// Welcome component - currently using props
function WelcomeMessage({ t, language }) {
  return (
    <div className="welcome">
      <h2>{t("welcome")}</h2>
      <p className="language-hint">
        Currently speaking:{" "}
        <strong>{language.charAt(0).toUpperCase() + language.slice(1)}</strong>
      </p>
    </div>
  );
}

// Spell list component - currently using props
function SpellList({ t }) {
  const spells = [
    { key: "fireball", icon: "🔥", power: 45, mana: 30 },
    { key: "iceBlast", icon: "❄️", power: 35, mana: 25 },
    { key: "heal", icon: "💚", power: 40, mana: 35 },
    { key: "shield", icon: "🛡️", power: 0, mana: 20 },
  ];

  return (
    <div className="section">
      <h2>📜 {t("spells")}</h2>
      <div className="spell-grid">
        {spells.map((spell) => (
          <div key={spell.key} className="spell-card">
            <span className="spell-icon">{spell.icon}</span>
            <div className="spell-info">
              <div className="spell-name">{t(spell.key)}</div>
              <div className="spell-stats">
                <span>
                  {t("power")}: {spell.power}
                </span>
                <span>
                  {t("mana")}: {spell.mana}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  // This state management should move into LanguageProvider
  const [language, setLanguage] = useState("common");

  // Translation function - move this into the provider
  const t = (key) => {
    return translations[language][key] || key;
  };

  // TODO: Wrap with LanguageProvider instead of passing props
  // Child components should use useLanguage() to access { language, setLang, t }
  return (
    <div className="app">
      <Header language={language} setLang={setLanguage} t={t} />
      <Navigation t={t} />
      <main className="main-content">
        <WelcomeMessage t={t} language={language} />
        <SpellList t={t} />
      </main>
      <div className="info-box">
        <h3>🌐 Language Context Pattern</h3>
        <ul>
          <li>
            Translation function <code>t(key)</code> available globally
          </li>
          <li>Language switch updates all components instantly</li>
          <li>No props needed - components access translations directly</li>
          <li>Easy to add new languages or translations</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
