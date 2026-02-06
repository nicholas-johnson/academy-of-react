# Quest 2: Animation Trigger

## Story

Battle spells need visual flair! When wizards cast powerful spells, dramatic animations should trigger. Use refs to start CSS animations imperatively.

## Your Mission

Create a spell casting interface that:
- Has multiple spell cards
- Each card has a different animation effect
- Clicking triggers the animation via ref
- Animations reset after completing

## Requirements

1. Display 3+ spell cards with different effects
2. Use refs to trigger CSS animations imperatively
3. Each spell triggers its own animation
4. Animations should complete and reset
5. TypeScript types for all refs

## Learning Objectives

- Store multiple refs (one per element)
- Add/remove CSS classes via refs
- Time animation completion
- Use `useRef` with arrays or objects

## Starter Code

Starter includes spell data and basic layout. Add:
- Refs for each spell card
- Click handlers to trigger animations
- CSS animation classes
- Reset logic

## Hints

- Multiple refs: `useRef<(HTMLDivElement | null)[]>([])`
- Or: Create separate refs for each
- classList.add('animating') to start
- setTimeout to remove class after animation

---
[Solution](./solution/) | [Back to Module](../../)
