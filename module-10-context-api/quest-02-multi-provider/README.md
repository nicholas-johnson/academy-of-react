# Quest 2: Language Support

Create a LanguageContext for Common, Elvish, and Draconic languages. Add a toggle button in the header. Multiple components show translated text (spell names, UI labels).

## Requirements

- LanguageContext with current language state
- Translation objects for each language
- Toggle/select function to switch languages
- useLanguage custom hook
- 3+ components use translations
- No hardcoded strings in components

## Acceptance Criteria

- [ ] Context stores current language
- [ ] Selector switches between languages
- [ ] Translations display correctly
- [ ] Multiple components update when language changes
- [ ] Custom hook provides `t(key)` translation function
- [ ] All UI text comes from translation objects

## Hints

- Create a translations object with nested language objects
- The `t(key)` function looks up `translations[language][key]`
- Fall back to the key itself if translation is missing

[Next →](../quest-03-context-patterns/)
