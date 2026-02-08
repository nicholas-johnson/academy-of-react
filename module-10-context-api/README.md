# Module 10: Context API for Global State

## Story Context

The Academy's battle system needs **global coordination**! When one wizard casts a spell, all others should know. Context API enables global state without prop drilling.

## Learning Objectives

- Create and use React Context
- Provide context to component tree
- Consume context with useContext
- Understand the prop drilling problem
- Custom hooks for context consumption
- Context vs Redux/Zustand

## React Concepts

- Context creation with `createContext()`
- Context provider patterns
- `useContext` hook
- Custom hooks wrapping context
- Default context values
- Multiple contexts

## Setup

Run `npm install` then `npm run dev`.

## Quests

1. **Theme Switcher** - Global theme context with localStorage persistence
2. **Language Support** - i18n with translation context (Common, Elvish, Draconic)
3. **User Session** - Authentication context pattern

---

**Previous Module**: [Module 9: Custom Hooks](../module-09-custom-hooks/)

**Next Module**: [Module 11: React Router](../module-11-react-router/)