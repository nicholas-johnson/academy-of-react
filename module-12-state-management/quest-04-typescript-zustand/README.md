# Quest 4: The Potion Ledger (TypeScript)

Build a typed potion-brewing tracker using Zustand and TypeScript. The focus here is on typing — defining interfaces for your store, using the curried `create<T>()()` pattern, and consuming typed state in components.

## Why TypeScript with Zustand?

- Zustand's `create<StoreType>()()` pattern gives you full type inference across selectors and actions
- TypeScript catches bugs at compile time — misspelled action names, wrong payload shapes, missing properties
- Typed selectors make refactoring safe — rename a field and the compiler tells you everywhere it's used
- The `persist` middleware has its own typing pattern worth learning

## Requirements

- Define types in `src/types/potion.ts`: a `PotionCategory` union type, a `Potion` interface, and a `PotionState` interface that describes the full store shape (state + actions)
- Implement the store in `src/store/potionStore.ts` using the typed `create<PotionState>()(...)` curried pattern
- The store should support: `addPotion`, `removePotion`, `setCategoryFilter`, and a `getTotalValue` computed getter
- Wrap the store with the `persist` middleware for localStorage
- Build typed components: `AddPotionForm`, `PotionList`, and `StatsBar`

## Acceptance Criteria

- [ ] `PotionCategory` union type defined (at least: `"healing"`, `"buff"`, `"damage"`, `"utility"`)
- [ ] `Potion` interface defined with `id`, `name`, `value`, and `category` fields
- [ ] `PotionState` interface describes the entire store: state fields and action signatures
- [ ] Store created with `create<PotionState>()(...)` — the curried form
- [ ] `persist` middleware wraps the store for localStorage
- [ ] `AddPotionForm` uses typed form handling to add potions
- [ ] `PotionList` filters by the selected category
- [ ] `StatsBar` shows potion count and total value using narrow selectors
- [ ] No `any` types — everything is explicitly or inferrably typed
- [ ] Project compiles with `tsc -b` (no type errors)

## Hints

Zustand's TypeScript API uses a curried call — the first `()` passes the type, the second passes the store function:

```tsx
interface MyState {
  count: number
  increment: () => void
}

const useStore = create<MyState>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}))
```

When adding `persist`, the type goes on `create` and `persist` wraps the inner function:

```tsx
import { persist } from "zustand/middleware"

const useStore = create<MyState>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }))
    }),
    { name: "my-storage-key" }
  )
)
```

For typed form events:

```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  // ...
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value)
}
```

## Installation

```bash
cd starter
npm install
npm run dev
```

[← Previous](../quest-03-mobx/)
