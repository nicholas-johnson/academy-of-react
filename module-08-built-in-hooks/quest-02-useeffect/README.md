# Quest 2: Mana Regeneration with useEffect

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

"Magic isn't just about casting spells," Professor Hooksweasel explains. "It's about managing your resources. Mana regenerates over time, and `useEffect` is how we handle these time-based side effects."

## Objective

Build a mana regeneration system that automatically restores mana every second using `useEffect`.

## Technical Concepts

- `useEffect` hook
- Side effects and cleanup
- setInterval and clearInterval
- Dependency arrays

## Requirements

Create a mana tracker with these features:

1. **Display current mana** — Show mana as a percentage (0-100%)
2. **Cast Spell button** — Reduces mana by 20%
3. **Auto-regeneration** — Mana increases by 5% every second
4. **Stop at 100%** — Mana doesn't exceed maximum
5. **Cleanup** — Clear interval when component unmounts

## Acceptance Criteria

- [ ] useState manages current mana level
- [ ] useEffect sets up interval for regeneration
- [ ] Interval is cleaned up on unmount
- [ ] Cast Spell reduces mana by 20%
- [ ] Mana regenerates 5% per second
- [ ] Mana stops at 100% (doesn't overflow)

## Hints

- Use `useEffect(() => { ... }, [])` for setup
- Return a cleanup function to clear the interval
- Check mana level before incrementing

## Testing Your Solution

- Click "Cast Spell" to reduce mana
- Watch mana regenerate automatically
- Mana should stop at 100%
- Open console to verify cleanup on unmount

## Solution

Check the `solution/` folder to see a complete implementation.
