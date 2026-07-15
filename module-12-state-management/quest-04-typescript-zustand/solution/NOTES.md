# Quest 4: The Potion Ledger — Solution Notes

## Overview

A typed potion-brewing tracker built with Zustand and TypeScript. Demonstrates how to define store interfaces, use the curried `create<T>()()` pattern, type the `persist` middleware, and consume typed state in components.

## File Structure

```
src/
├── types/
│   └── potion.ts              # PotionCategory, Potion, PotionState
├── store/
│   └── potionStore.ts         # Typed Zustand store with persist
├── data/
│   └── categories.ts          # Category constants
├── components/
│   ├── AddPotionForm.tsx      # Typed form handling
│   ├── PotionList.tsx         # Filtered list with typed selectors
│   └── StatsBar.tsx           # Narrow selectors for derived data
└── App.tsx                    # Composition
```

## Key Concepts

### 1. Defining the Store Interface

The `PotionState` interface describes everything the store contains — both state and actions:

```tsx
export interface PotionState {
  potions: Potion[]
  categoryFilter: PotionCategory | "all"

  addPotion: (potion: Omit<Potion, "id">) => void
  removePotion: (id: number) => void
  setCategoryFilter: (category: PotionCategory | "all") => void
  getTotalValue: () => number
}
```

This is the single source of truth. Every selector and action call is checked against this interface.

### 2. The Curried `create<T>()()` Pattern

Zustand's TypeScript API requires a curried call:

```tsx
const useStore = create<PotionState>()((set, get) => ({
  // ...implementation
}))
```

The first `()` passes the type parameter. The second `()` passes the store function. This is needed because TypeScript can't partially infer generic parameters — the curried form lets you specify the state type while still inferring everything else.

### 3. Typing `persist`

When using `persist`, the type goes on `create` and `persist` wraps the inner function:

```tsx
const useStore = create<PotionState>()(
  persist(
    (set, get) => ({ ... }),
    { name: "potion-ledger" }
  )
)
```

TypeScript infers the persisted state shape from `PotionState`. The `name` option is the localStorage key.

### 4. Typed Selectors

Each component selects only what it needs:

```tsx
// Narrow selector — only re-renders when potions change
const potions = usePotionStore((state) => state.potions)

// Action selector — stable reference, never causes re-renders
const addPotion = usePotionStore((state) => state.addPotion)

// Computed value — recalculated on every call to the selector
const totalValue = usePotionStore((state) => state.getTotalValue())
```

### 5. Typed Form Events

React form events need explicit types:

```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
}

const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setCategoryFilter(e.target.value as PotionCategory | "all")
}
```

The `as PotionCategory` cast is safe here because the `<select>` options are constrained to valid values.

## Common Gotchas

**Forgetting the double parentheses.** `create<T>((set) => ...)` won't compile. You need `create<T>()((set) => ...)`.

**Using `any` for form events.** TypeScript has specific event types (`React.FormEvent`, `React.ChangeEvent`) — use them instead of `any`.

**Putting the type on `persist` instead of `create`.** The generic goes on `create`, not `persist`. Zustand infers the persist shape from the outer type.
