# Quest 13: Spell Power Slider with useDeferredValue

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

"useDeferredValue is like useTransition," Professor Hooksweasel explains, "but for values instead of state updates. It defers updating expensive parts of your UI."

## Objective

Build a power slider that uses `useDeferredValue` to keep the slider smooth while rendering expensive visualizations.

## Technical Concepts

- `useDeferredValue` hook
- Deferred values
- Concurrent rendering
- Performance optimization

## Requirements

Create an optimized slider:

1. **Power Slider** — Input range 0-100
2. **Expensive Visual** — Render many spell particles
3. **useDeferredValue** — Defer the expensive render
4. **Smooth Slider** — Slider moves without lag
5. **Delayed Update** — Visual updates slightly after slider

## Implementation Notes

- const deferredPower = useDeferredValue(power)
- Use deferred value for expensive component
- Slider uses immediate value
- Expensive render uses deferred value

## Acceptance Criteria

- [ ] useDeferredValue creates deferred value
- [ ] Slider remains responsive
- [ ] Expensive component uses deferred value
- [ ] Visual updates slightly delayed
- [ ] Overall experience is smooth

## Solution

Check the `solution/` folder to see a complete implementation.
