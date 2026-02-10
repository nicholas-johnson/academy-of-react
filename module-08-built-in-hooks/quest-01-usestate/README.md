# Quest 1: Spell Counter with useState

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

Welcome to your first lesson at the Academy! Professor Hooksweasel begins with the fundamentals: `useState`, the most essential hook for managing component state.

"Every spell you cast, every potion you brew, every score you track," she explains, "begins with useState. Master this, and you've mastered the foundation of React interactivity."

## Objective

Build a simple spell counter that tracks how many spells a student has successfully cast today.

## Technical Concepts

- `useState` hook
- State updates
- Event handlers
- Immutable state updates

## Requirements

Create a spell casting tracker with these features:

1. **Display current spell count** — Show the number of spells cast
2. **Cast Spell button** — Increment the counter by 1
3. **Reset button** — Reset the counter to 0
4. **Spell milestone messages** — Show different messages at 5, 10, and 20 spells

## Acceptance Criteria

- [ ] useState manages the spell count
- [ ] Cast Spell button increments the count
- [ ] Reset button sets count back to 0
- [ ] Display shows appropriate milestone messages
- [ ] Counter never goes below 0

## Hints

- Start with `const [count, setCount] = useState(0)`
- Use `setCount(count + 1)` to increment
- Consider conditional rendering for milestone messages

## Testing Your Solution

- Click "Cast Spell" multiple times - count should increase
- Reach 5 spells - should see "Getting the hang of it!"
- Reach 10 spells - should see "Spell Master!"
- Reach 20 spells - should see "Legendary Wizard!"
- Click Reset - count returns to 0

## Solution

Check the `solution/` folder to see a complete implementation.
