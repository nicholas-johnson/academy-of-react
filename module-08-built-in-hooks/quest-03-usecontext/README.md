# Quest 3: Theme Switcher with useContext

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

"Context is like the Academy's messaging system," Professor Hooksweasel explains. "Instead of passing props through every level, useContext lets you broadcast values to any component that needs them."

## Objective

Build a theme switcher that uses `useContext` to share theme state across multiple components without prop drilling.

## Technical Concepts

- `useContext` hook
- Context Provider pattern
- Avoiding prop drilling
- Global state management

## Requirements

Create a theme system with these features:

1. **ThemeContext** — Create a context for theme state
2. **Theme Provider** — Wrap app in provider with theme state
3. **Theme Toggle** — Button to switch between light/dark
4. **Multiple Components** — Show theme affects header, content, and footer
5. **No Prop Drilling** — Components access theme via useContext

## Implementation Notes

- Create ThemeContext with createContext()
- Provider holds useState for current theme
- Child components use useContext(ThemeContext)
- Apply theme classes to change appearance

## Acceptance Criteria

- [ ] ThemeContext created with createContext
- [ ] Provider component manages theme state
- [ ] Multiple components consume context with useContext
- [ ] Toggle button switches between themes
- [ ] No props passed for theme data

## Solution

Check the `solution/` folder to see a complete implementation.
