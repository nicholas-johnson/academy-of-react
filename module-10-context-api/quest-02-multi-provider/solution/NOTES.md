# Quest 2 Solution: Language Context

## Key Concepts

### 1. Translation Object Structure

```javascript
const translations = {
  common: {
    title: 'Battle Academy',
    welcome: 'Welcome, Adventurer!',
    // ... more keys
  },
  elvish: {
    title: 'Magor Academy',
    welcome: 'Mae govannen, Roquen!',
    // ... same keys, different values
  },
  draconic: {
    title: 'Kepesk Arcaniss',
    welcome: 'Thric, Munthrek!',
    // ... same keys, different values
  },
}
```

All languages must have the same keys for the translation function to work consistently.

### 2. Language Context Provider

```javascript
const LanguageContext = createContext(undefined)

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('common')

  // Translation function - the key feature!
  const t = (key) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLang: setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
```

### 3. Using the Translation Function

```javascript
function SpellList() {
  const { t } = useLanguage()

  return (
    <div>
      <h2>{t('spells')}</h2>
      <div>{t('fireball')}</div>
    </div>
  )
}
```

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
