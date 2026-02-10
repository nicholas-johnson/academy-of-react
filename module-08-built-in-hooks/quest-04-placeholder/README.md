# Quest 4: Simple Spell Manager with useReducer

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

"When state gets complex with many related updates," Professor Hooksweasel teaches, "useReducer brings clarity through actions and reducers."

## Objective

Build a simple spell list manager using `useReducer` to handle adding and removing spells.

## Technical Concepts

- `useReducer` hook
- Reducer function: `(state, action) => newState`
- Action types and dispatch
- When to choose useReducer over useState

## Requirements

Create a spell manager with these features:

1. **Spell List Display** — Show current spells
2. **Add Spell** — Add new spell to the list
3. **Remove Spell** — Delete spell by id
4. **Reducer Function** — Handle ADD and REMOVE actions
5. **Dispatch Pattern** — Use dispatch to trigger actions

## Implementation Notes

- Define reducer function outside component
- Use useReducer(reducer, initialState)
- Dispatch actions with type and payload
- Reducer returns new state (immutable)

## Acceptance Criteria

- [ ] useReducer manages spell list state
- [ ] Reducer handles ADD_SPELL action
- [ ] Reducer handles REMOVE_SPELL action
- [ ] dispatch used to trigger state changes
- [ ] State updates are immutable

## Solution

Check the `solution/` folder to see a complete implementation.
