# Quest 6: Spell Power Calculator with useMemo

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

"Some calculations are expensive," Professor Hooksweasel explains. "useMemo caches the result so we don't recalculate on every render."

## Objective

Build a spell power calculator that uses `useMemo` to optimize expensive calculations.

## Technical Concepts

- `useMemo` hook
- Memoizing computed values
- Expensive operations
- Dependency arrays

## Requirements

Create a power calculator with these features:

1. **Spell List** — Display multiple spells with power levels
2. **Filter Control** — Filter spells by element type
3. **Total Power** — Calculate sum of all displayed spells
4. **useMemo** — Memoize the filtered list and total
5. **Performance** — Show calculation only runs when needed

## Implementation Notes

- Use useMemo for filtering operation
- Use useMemo for total calculation
- Add console.log to show when calculations run
- Include other state that doesn't affect calculation

## Acceptance Criteria

- [ ] useMemo memoizes the filtered spell list
- [ ] useMemo memoizes the total power calculation
- [ ] Calculations only run when dependencies change
- [ ] Console logs demonstrate optimization
- [ ] Non-dependent state changes don't trigger recalculation

## Solution

Check the `solution/` folder to see a complete implementation.
