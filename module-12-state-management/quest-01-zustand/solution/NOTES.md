# Quest 1: Zustand - Solution Notes

## Overview

Simple spell inventory with Zustand for state management. Demonstrates stores, selectors, persistence, and minimal boilerplate.

## File Structure

```
src/
├── store/
│   └── spellStore.js          # Zustand store with persistence
├── data/
│   └── elements.js            # Element constants
├── components/
│   ├── AddSpellForm.jsx       # Form to add spells
│   └── SpellInventory.jsx     # Inventory list with filtering
└── App.jsx                    # Composition
```

## Key Concepts

### 1. Creating a Store

```jsx
import { create } from "zustand";

const useStore = create((set, get) => ({
  // State
  items: [],

  // Actions
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  // Computed values using get()
  getTotal: () => get().items.length,
}));
```

### 2. Using the Store in Components

```jsx
// In AddSpellForm.jsx
import { useSpellStore } from "../store/spellStore";

function AddSpellForm() {
  const addSpell = useSpellStore((state) => state.addSpell);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addSpell({ name, power, element });
  };
}

// In SpellInventory.jsx
function SpellInventory() {
  // Select specific state (recommended - prevents unnecessary re-renders)
  const spells = useSpellStore((state) => state.spells);
  const removeSpell = useSpellStore((state) => state.removeSpell);
  const clearAll = useSpellStore((state) => state.clearAll);
  const totalPower = useSpellStore((state) => state.getTotalPower());
}
```

**Important**: Selecting specific state prevents unnecessary re-renders. The component only re-renders when the selected slice changes.

### 3. Persistence with localStorage

The store uses the `persist` middleware for automatic localStorage persistence:

```jsx
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSpellStore = create(
  persist(
    (set, get) => ({
      spells: [],
      addSpell: (spell) =>
        set((state) => ({
          spells: [...state.spells, { ...spell, id: Date.now() }],
        })),
      // ... other actions
    }),
    {
      name: "spell-inventory", // localStorage key
    },
  ),
);
```

State is automatically saved to localStorage and restored on page load.

### 4. Immer Integration (Optional)

```jsx
import { immer } from "zustand/middleware/immer";

const useStore = create(
  immer((set) => ({
    items: [],
    addItem: (item) =>
      set((state) => {
        state.items.push(item); // Direct mutation with Immer!
      }),
  })),
);
```

## Why Zustand?

### Advantages

- **No Provider needed** — Just import and use the store hook
- **Minimal API** — `create`, `set`, `get` is all you need
- **Tiny bundle** — ~1KB gzipped
- **Great DX** — Simple debugging, easy to understand
- **Flexible** — Works outside React too
- **TypeScript friendly** — Great inference out of the box

### When to Use

- Small to medium applications
- When you want minimal boilerplate vs Redux
- When you need something simpler than Redux
- For shared state across unrelated components
- When you don't need time-travel debugging

## Component Organization

```jsx
// App.jsx - Composition only
import { AddSpellForm } from "./components/AddSpellForm";
import { SpellInventory } from "./components/SpellInventory";

function App() {
  return (
    <div className="app">
      <AddSpellForm />
      <SpellInventory />
    </div>
  );
}
```

Each component imports the store directly and selects only what it needs.

## Selectors for Performance

```jsx
// Bad: Re-renders on any state change
const { items, filter } = useStore();

// Good: Only re-renders when items changes
const items = useStore((state) => state.items);

// Good: Computed selector
const filteredItems = useStore((state) => state.items.filter((i) => i.active));
```

## Common Patterns

### Async Actions

```jsx
const useStore = create((set) => ({
  data: null,
  loading: false,
  fetchData: async () => {
    set({ loading: true });
    const data = await fetch("/api/data").then((r) => r.json());
    set({ data, loading: false });
  },
}));
```

### Combining Multiple Stores

```jsx
const useUserStore = create(...)
const useCartStore = create(...)

// Use both in a component
function App() {
  const user = useUserStore(s => s.user)
  const cart = useCartStore(s => s.items)
}
```
