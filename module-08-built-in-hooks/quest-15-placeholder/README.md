# Quest 15: Spell Styles with useInsertionEffect

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

"useInsertionEffect is specialized," Professor Hooksweasel warns. "It's designed for CSS-in-JS libraries to inject styles before layout effects. Most wizards will never need it!"

## Objective

Build a simple dynamic style injector using `useInsertionEffect` to understand when and why this hook exists.

## Technical Concepts

- `useInsertionEffect` hook
- Style injection timing
- CSS-in-JS libraries
- Effect ordering

## Requirements

Create a dynamic style system:

1. **Dynamic Class** — Generate unique class names
2. **Style Injection** — Insert CSS rules dynamically
3. **useInsertionEffect** — Inject before layout reads
4. **Applied Styles** — Component uses generated classes
5. **Timing** — Happens before useLayoutEffect

## Implementation Notes

- Use useInsertionEffect to insert <style> tags
- Runs before all useLayoutEffect hooks
- Prevents layout thrashing
- Rarely needed outside CSS-in-JS libraries

## Acceptance Criteria

- [ ] useInsertionEffect injects style tags
- [ ] Styles applied before layout measurements
- [ ] No layout thrashing
- [ ] Console logs show effect ordering
- [ ] Understand when to use (rarely!)

## Solution

Check the `solution/` folder to see a complete implementation.

Note: This is an advanced hook. In practice, you'll likely never use it unless building a CSS-in-JS library!
