import { useLanguage } from "../context/LanguageContext";

export function Header() {
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
