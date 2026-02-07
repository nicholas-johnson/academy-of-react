# Quest 1: Zustand Spell Inventory

Build a spell inventory system using Zustand — the simplest state management library.

## Why Zustand?

- No providers needed
- Minimal boilerplate
- Hooks-based API
- ~1KB bundle size
- Great TypeScript support

## Requirements

- Create a Zustand store for spells
- Add spells with name, power, and element
- Remove spells from inventory
- Filter spells by element
- Show total power (computed from spells)
- Persist inventory to localStorage

## Acceptance Criteria

- [ ] Store created with `create()` from Zustand
- [ ] Can add new spells to inventory
- [ ] Can remove spells by ID
- [ ] Filter dropdown filters by element
- [ ] Total power updates automatically
- [ ] Data persists across page refresh (localStorage)

## Hints

```jsx
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Basic store
const useStore = create((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
}));

// With localStorage persistence
const useStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
    }),
    { name: "my-storage-key" },
  ),
);

// Selecting specific state (prevents unnecessary re-renders)
const items = useStore((state) => state.items);
const addItem = useStore((state) => state.addItem);
```

## Installation

```bash
npm install zustand
```

[Next →](../quest-02-redux/)
