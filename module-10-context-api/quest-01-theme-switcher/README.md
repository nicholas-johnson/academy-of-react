# Quest 1: Theme Switcher

## Story

The Academy needs light/dark mode! Students study at all hours. Use Context API to provide global theme state accessible throughout the app.

## Your Mission

Build a theme system that:
- Has ThemeProvider wrapping the app
- Provides theme ('light' or 'dark') and toggle function
- Multiple components consume theme without props
- Persists to localStorage
- TypeScript types for theme context

## Requirements

1. Create ThemeContext with TypeScript
2. ThemeProvider component managing theme state
3. Custom `useTheme()` hook
4. Theme toggle button accessible anywhere
5. Different styles for light/dark
6. Save theme to localStorage

## Learning Objectives

- Create typed context
- Build provider component
- Custom hooks for context
- localStorage with context
- Avoid prop drilling

## Hints

- Type: `'light' | 'dark'`
- Context: `createContext<ThemeContextType | undefined>(undefined)`
- Load from localStorage in provider useState initializer
- Save to localStorage in toggle function

---
[Solution](./solution/) | [Back to Module](../../)
