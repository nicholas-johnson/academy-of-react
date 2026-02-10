# Quest 7: Spell Input Focus with useRef

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

"Sometimes you need direct DOM access," Professor Hooksweasel teaches. "useRef gives you a reference that persists across renders without causing re-renders."

## Objective

Build a spell name input that automatically focuses when a button is clicked using `useRef`.

## Technical Concepts

- `useRef` hook
- DOM element references
- Imperative DOM manipulation
- .current property

## Requirements

Create an input with focus control:

1. **Spell Name Input** — Text input for spell name
2. **Focus Button** — Button to focus the input
3. **useRef** — Create ref for input element
4. **ref Attribute** — Attach ref to input
5. **Imperative Call** — Use inputRef.current.focus()

## Implementation Notes

- Create ref with useRef(null)
- Attach ref to input via ref attribute
- Access DOM node via ref.current
- Call .focus() method on button click

## Acceptance Criteria

- [ ] useRef creates an input ref
- [ ] ref attached to input element
- [ ] Button click focuses the input
- [ ] No re-renders when ref changes
- [ ] Works reliably on button click

## Solution

Check the `solution/` folder to see a complete implementation.
