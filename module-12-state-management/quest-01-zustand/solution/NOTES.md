# Quest 1: Zustand - Solution Notes

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

### 2. Using the Store

```jsx
// Select specific state (recommended - prevents unnecessary re-renders)
const items = useStore((state) => state.items);
const addItem = useStore((state) => state.addItem);

// Or destructure (re-renders on any state change)
const { items, addItem } = useStore();
```

### 3. Persistence with localStorage

```jsx
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
    }),
    {
      name: "my-storage-key", // localStorage key
    },
  ),
);
```

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

- **No Provider needed** — Just import and use
- **Minimal API** — `create`, `set`, `get` is all you need
- **Tiny bundle** — ~1KB gzipped
- **Great DX** — Simple debugging, easy to understand
- **Flexible** — Works outside React too

### When to Use

- Small to medium applications
- When you want minimal boilerplate
- When you need something simpler than Redux
- For shared state across unrelated components

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
