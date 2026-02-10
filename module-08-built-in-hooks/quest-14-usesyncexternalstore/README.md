# Quest 14: Spell Counter with useSyncExternalStore

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

"Sometimes data lives outside React," Professor Hooksweasel explains. "useSyncExternalStore safely subscribes to external data sources like browser APIs or global stores."

## Objective

Build a spell counter that uses `useSyncExternalStore` to subscribe to an external store (a simple custom store).

## Technical Concepts

- `useSyncExternalStore` hook
- External stores
- Subscribe pattern
- Snapshot function

## Requirements

Create an external store integration:

1. **External Store** — Simple JavaScript object with state
2. **Subscribe Function** — Listen to store changes
3. **Snapshot Function** — Get current state
4. **useSyncExternalStore** — Connect React to store
5. **Multiple Components** — Show store updates all subscribers

## Implementation Notes

- Create store with {subscribe, getSnapshot}
- subscribe(callback) returns unsubscribe function
- getSnapshot() returns current state
- useSyncExternalStore(subscribe, getSnapshot)

## Acceptance Criteria

- [ ] External store created outside React
- [ ] Subscribe function implemented
- [ ] Snapshot function implemented
- [ ] useSyncExternalStore connects to store
- [ ] Multiple components sync correctly

## Solution

Check the `solution/` folder to see a complete implementation.
