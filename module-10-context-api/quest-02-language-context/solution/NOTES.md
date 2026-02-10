# Quest 2: Language Context - Solution Notes

## Overview

Internationalization (i18n) system with context. Supports multiple languages (Common, Elvish, Draconic) with instant switching across all components.

## File Structure

```
src/
├── context/
│   └── LanguageContext.jsx    # Context, Provider, and useLanguage hook
├── components/
│   ├── Header.jsx             # Title and language selector
│   ├── Navigation.jsx         # Translated nav buttons
│   ├── WelcomeMessage.jsx     # Translated welcome text
│   └── SpellList.jsx          # Translated spell names
├── data/
│   └── translations.js        # Translation dictionaries
└── App.jsx                    # Wraps app in LanguageProvider
```

## Key Concepts

### 1. Translation Object Structure

```javascript
const translations = {
  common: {
    title: "Battle Academy",
    welcome: "Welcome, Adventurer!",
    // ... more keys
  },
  elvish: {
    title: "Magor Academy",
    welcome: "Mae govannen, Roquen!",
    // ... same keys, different values
  },
  draconic: {
    title: "Kepesk Arcaniss",
    welcome: "Thric, Munthrek!",
    // ... same keys, different values
  },
};
```

All languages must have the same keys for the translation function to work consistently.

### 2. Language Context Provider

The provider manages language state and provides the translation function:

```javascript
const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("common");

  // Translation function - the key feature!
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
```

### 3. Using the Translation Function

Components import and use the custom hook to access translations:

```javascript
import { useLanguage } from "../context/LanguageContext";

function SpellList() {
  const { t } = useLanguage();

  return (
    <div>
      <h2>{t("spells")}</h2>
      <div>{t("fireball")}</div>
      <div>{t("heal")}</div>
    </div>
  );
}
```

The `t(key)` function automatically uses the current language.

## Benefits of This Pattern

1. **Centralized translations** - All text in one place
2. **No prop drilling** - Any component can access translations
3. **Instant updates** - Changing language re-renders all translated text
4. **Type-safe keys** - Easy to track which keys exist
5. **Scalable** - Adding new languages is just adding new objects

## Common i18n Libraries

For production apps, consider:

- **react-i18next** - Full-featured i18n
- **FormatJS (react-intl)** - Internationalization with formatting
- **LinguiJS** - Compile-time extraction

These add features like:

- Pluralization rules
- Date/number formatting
- Missing translation warnings
- Translation extraction tools
