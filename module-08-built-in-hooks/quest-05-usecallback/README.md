# Quest 5: Spell Caster with useCallback

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

"Every time your component re-renders," Professor Hooksweasel warns, "new function instances are created. useCallback memoizes functions to prevent unnecessary child re-renders."

## Objective

Build a spell casting app that uses `useCallback` to optimize function passing to child components.

## Technical Concepts

- `useCallback` hook
- Memoizing functions
- Preventing unnecessary re-renders
- Referential equality

## Requirements

Create an optimized spell caster with these features:

1. **Parent Component** — Manages spell count
2. **Child Component** — Receives callback function
3. **useCallback** — Memoize the cast spell function
4. **React.memo** — Prevent child re-renders
5. **Console Logs** — Demonstrate render optimization

## Implementation Notes

- Wrap callback in useCallback with dependencies
- Use React.memo on child component
- Add console.logs to show renders
- Compare with/without optimization

## Acceptance Criteria

- [ ] useCallback wraps the callback function
- [ ] Child component wrapped in React.memo
- [ ] Child doesn't re-render when parent does (unless needed)
- [ ] Console logs demonstrate optimization
- [ ] Dependency array correctly specified

## Solution

Check the `solution/` folder to see a complete implementation.
