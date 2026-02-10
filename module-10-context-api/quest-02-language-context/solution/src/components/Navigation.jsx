import { useLanguage } from "../context/LanguageContext";

export function Navigation() {
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
