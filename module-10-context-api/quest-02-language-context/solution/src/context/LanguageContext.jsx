import { createContext, useContext, useState } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
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

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
