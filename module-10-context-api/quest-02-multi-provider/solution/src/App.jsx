import { createContext, useContext, useState } from "react";
import { Flame, Snowflake, Heart, Shield } from "lucide-react";
import "./App.css";

// Translation data for each language
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

// Create the Language Context
const LanguageContext = createContext(undefined);

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("common");

  const t = (key) => {
    return translations[language][key] || key;
  };

  const setLang = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

// Header component
function Header() {
  const { t, language, setLang } = useLanguage();

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

// Spell list component
function SpellList() {
  const { t } = useLanguage();

  const spells = [
    { key: "fireball", Icon: Flame, power: 45, mana: 30 },
    { key: "iceBlast", Icon: Snowflake, power: 35, mana: 25 },
    { key: "heal", Icon: Heart, power: 40, mana: 35 },
    { key: "shield", Icon: Shield, power: 0, mana: 20 },
  ];

  return (
    <div className="section">
      <h2>{t("spells")}</h2>
      <div className="spell-grid">
        {spells.map((spell) => (
          <div key={spell.key} className="spell-card">
            <spell.Icon className="spell-icon" size={32} />
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

// Navigation component
function Navigation() {
  const { t } = useLanguage();

  return (
    <nav className="navigation">
      <button className="nav-btn active">{t("spells")}</button>
      <button className="nav-btn">{t("inventory")}</button>
      <button className="nav-btn">{t("quests")}</button>
      <button className="nav-btn">{t("settings")}</button>
    </nav>
  );
}

// Welcome message component
function WelcomeMessage() {
  const { t, language } = useLanguage();

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

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <Header />
        <Navigation />
        <main className="main-content">
          <WelcomeMessage />
          <SpellList />
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
    </LanguageProvider>
  );
}

export default App;
