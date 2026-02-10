import { useLanguage } from "../context/LanguageContext";

export function WelcomeMessage() {
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
