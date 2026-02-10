# Quest 9: Spell Card Measurement with useLayoutEffect

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

"useLayoutEffect is like useEffect," Professor Hooksweasel explains, "but it runs synchronously after DOM updates and before the browser paints. Perfect for measuring elements!"

## Objective

Build a spell card that measures its own dimensions using `useLayoutEffect` before rendering additional elements.

## Technical Concepts

- `useLayoutEffect` hook
- Synchronous effects
- DOM measurements
- Difference from useEffect

## Requirements

Create a measured spell card:

1. **Spell Card** — Display spell information
2. **useRef** — Reference to the card element
3. **useLayoutEffect** — Measure dimensions synchronously
4. **Display Dimensions** — Show width and height
5. **Resize Handler** — Update on window resize

## Implementation Notes

- Use useLayoutEffect for measurements (not useEffect)
- Measure via ref.current.getBoundingClientRect()
- Runs before browser paint (no flash)
- Add window resize listener

## Acceptance Criteria

- [ ] useLayoutEffect measures element dimensions
- [ ] Measurements happen before paint
- [ ] Dimensions displayed to user
- [ ] Updates on window resize
- [ ] No visual flashing

## Solution

Check the `solution/` folder to see a complete implementation.
