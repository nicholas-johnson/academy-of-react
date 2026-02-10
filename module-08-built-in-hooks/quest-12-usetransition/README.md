# Quest 12: Spell Search with useTransition

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

"Not all updates are equally urgent," Professor Hooksweasel teaches. "useTransition lets you mark updates as non-urgent, keeping the UI responsive during heavy operations."

## Objective

Build a spell search that uses `useTransition` to keep the input responsive while filtering a large list.

## Technical Concepts

- `useTransition` hook
- Concurrent rendering
- Urgent vs non-urgent updates
- isPending state

## Requirements

Create a responsive search:

1. **Large Spell List** — 1000+ spells to filter
2. **Search Input** — Filter spells by name
3. **useTransition** — Mark filtering as non-urgent
4. **isPending** — Show loading indicator during transition
5. **Responsive Input** — Input never lags

## Implementation Notes

- const [isPending, startTransition] = useTransition()
- Wrap setState call in startTransition()
- Input updates immediately (urgent)
- Filter updates are non-urgent
- Show loading UI during isPending

## Acceptance Criteria

- [ ] useTransition wraps expensive state update
- [ ] Input remains responsive during filtering
- [ ] isPending shows loading state
- [ ] Large list filters without blocking input
- [ ] User sees smooth experience

## Solution

Check the `solution/` folder to see a complete implementation.
