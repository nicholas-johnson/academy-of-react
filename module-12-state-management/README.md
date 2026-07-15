# Module 12: State Management Libraries

React's built-in tools — `useState`, `useReducer`, and Context — handle state well for many applications. But as apps grow, you may find that Context re-renders too broadly, state logic gets tangled across components, or your team needs better debugging tools and conventions. That's when external state management libraries earn their place.

This module introduces three popular libraries, each with a distinct philosophy. You'll get hands-on with all three so you can make an informed choice for your own projects.

## When Do You Need a Library?

Stick with Context and built-in hooks when:
- State is relatively simple
- Only a few components share it
- Updates are infrequent
- You want zero extra dependencies

Reach for a library when:
- Many components across the tree share complex state
- You need time-travel debugging (undo/redo, replaying actions)
- State logic is sprawling and needs structure
- Performance matters — frequent updates are causing unnecessary re-renders
- Your team needs conventions that scale

## Zustand — Minimal and Modern

Zustand (German for "state") is the simplest option. You define a store as a function, and any component can access it via a hook. No Provider needed, no boilerplate ceremony:

```jsx
import { create } from 'zustand'

const useSpellStore = create((set) => ({
  spells: [],
  addSpell: (spell) => set((state) => ({
    spells: [...state.spells, spell]
  })),
  removeSpell: (id) => set((state) => ({
    spells: state.spells.filter(s => s.id !== id)
  }))
}))
```

Use it in any component — just call the hook:

```jsx
function SpellList() {
  const spells = useSpellStore((state) => state.spells)
  const addSpell = useSpellStore((state) => state.addSpell)

  return (
    <div>
      {spells.map(s => <div key={s.id}>{s.name}</div>)}
      <button onClick={() => addSpell({ id: Date.now(), name: 'Fireball' })}>
        Add Spell
      </button>
    </div>
  )
}
```

The selector function `(state) => state.spells` means this component only re-renders when `spells` changes — not when other parts of the store update. This built-in selectivity makes Zustand performant by default.

Zustand also offers middleware for persistence (saving to localStorage), devtools integration, and Immer for mutable-style updates:

```jsx
import { persist } from 'zustand/middleware'

const useSpellStore = create(
  persist(
    (set) => ({
      spells: [],
      addSpell: (spell) => set((state) => ({
        spells: [...state.spells, spell]
      }))
    }),
    { name: 'spell-storage' }
  )
)
```

State automatically saves to localStorage and restores on page load.

**Zustand is best for:** Small to medium apps, when you want the simplest possible API, or when you're tired of boilerplate.

## Redux Toolkit — The Industry Standard

Redux has been around since 2015 and is the most widely used state management library in production React apps. Redux Toolkit (RTK) is the modern, official way to write Redux — it eliminates the boilerplate that made Redux infamous.

The core concept: state lives in a **store**, changes happen through **actions**, and a **reducer** determines how state updates in response to each action. RTK's `createSlice` bundles these together:

```jsx
import { createSlice, configureStore } from '@reduxjs/toolkit'

const spellSlice = createSlice({
  name: 'spells',
  initialState: { list: [] },
  reducers: {
    addSpell: (state, action) => {
      state.list.push(action.payload)  // Safe mutation thanks to Immer
    },
    removeSpell: (state, action) => {
      state.list = state.list.filter(s => s.id !== action.payload)
    }
  }
})

const store = configureStore({
  reducer: { spells: spellSlice.reducer }
})

export const { addSpell, removeSpell } = spellSlice.actions
```

Unlike Zustand, Redux requires a Provider wrapping your app:

```jsx
import { Provider, useSelector, useDispatch } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <SpellList />
    </Provider>
  )
}

function SpellList() {
  const spells = useSelector((state) => state.spells.list)
  const dispatch = useDispatch()

  return (
    <div>
      {spells.map(s => <div key={s.id}>{s.name}</div>)}
      <button onClick={() => dispatch(addSpell({ id: 1, name: 'Fireball' }))}>
        Add
      </button>
    </div>
  )
}
```

The `state.list.push()` in the reducer looks like mutation, but RTK uses Immer under the hood to produce immutable updates safely. You write intuitive code and get correct behaviour.

Redux's killer feature is its **DevTools** — a browser extension that lets you inspect every action dispatched, see the state diff, time-travel through history, and even export/import state for debugging. For large teams, this observability is invaluable.

**Redux is best for:** Large applications, teams that need conventions and debugging tools, or apps where traceability of state changes matters.

## MobX — Observable and Reactive

MobX takes an entirely different approach. Instead of actions and reducers, you create **observable** classes where mutations are tracked automatically. Change a property, and any component observing it re-renders — no dispatch, no action creators:

```jsx
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'

class SpellStore {
  spells = []

  constructor() {
    makeAutoObservable(this)
  }

  addSpell(spell) {
    this.spells.push(spell)  // Direct mutation — MobX tracks it
  }

  removeSpell(id) {
    this.spells = this.spells.filter(s => s.id !== id)
  }

  get totalPower() {
    return this.spells.reduce((sum, s) => sum + s.power, 0)
  }
}

const spellStore = new SpellStore()
```

Components must be wrapped with `observer` to react to changes:

```jsx
const SpellList = observer(() => {
  return (
    <div>
      {spellStore.spells.map(s => <div key={s.id}>{s.name}</div>)}
      <p>Total power: {spellStore.totalPower}</p>
      <button onClick={() => spellStore.addSpell({ id: 1, name: 'Fireball', power: 40 })}>
        Add
      </button>
    </div>
  )
})
```

The `get totalPower()` getter is a **computed value** — MobX caches it and only recalculates when the underlying data (`spells`) changes. This is powerful for derived state that would otherwise be expensive to compute on every render.

**MobX is best for:** Apps with lots of derived/computed state, teams comfortable with OOP patterns, or when you want the least ceremony around state updates.

## Choosing Between Them

| | Zustand | Redux Toolkit | MobX |
|---|---|---|---|
| Bundle size | ~1 KB | ~11 KB | ~16 KB |
| Boilerplate | Minimal | Moderate | Minimal |
| Learning curve | Easy | Moderate | Moderate |
| DevTools | Basic | Excellent | Good |
| Best for | Small-medium apps | Large apps, teams | Complex derived state |

All three solve the same fundamental problem — sharing and managing state across components. The differences are in philosophy and developer experience. If you're unsure, start with Zustand (simplest), and move to Redux if you need its tooling.

## Common Mistakes

**Reaching for a library too early.** Context + `useReducer` handles a surprising amount. Don't add a dependency until you feel the pain it solves.

**Not using selectors.** In both Zustand and Redux, selecting the entire store (`useStore()` or `useSelector(state => state)`) means every state change re-renders the component. Always select only what you need.

**Mixing patterns.** Pick one library per project. Using Zustand for some state and Redux for other state creates confusion. It's fine to keep some local component state in `useState` — that's expected — but global state should go through one system.

**Forgetting `observer` in MobX.** If a component reads from a MobX store but isn't wrapped in `observer`, it won't re-render when the store changes. This is the #1 MobX debugging issue.

## Exercises

Each quest uses a different library so you experience all three:

**Quest 1: Zustand Spell Inventory** — Build a spell inventory with add/remove/filter using Zustand. Practice selectors and the persist middleware.

[Start Quest 1 →](./quest-01-zustand/)

**Quest 2: Redux Battle Tracker** — Create a battle tracking system with Redux Toolkit. Manage battles, combatants, and history with slices and actions.

[Start Quest 2 →](./quest-02-redux/)

**Quest 3: MobX Academy Dashboard** — Build a dashboard with observables and computed values. Track students, courses, and derived statistics.

[Start Quest 3 →](./quest-03-mobx/)

**Quest 4: The Potion Ledger (TypeScript)** — Build a typed Zustand store from scratch. Define store interfaces, use the curried `create<T>()()` pattern, type the `persist` middleware, and consume typed state in components.

[Start Quest 4 →](./quest-04-typescript-zustand/)

## Running the Code

```bash
cd demo
npm install
npm run dev
```

A TypeScript version of the same demo is available in `demo-ts`:

```bash
cd demo-ts
npm install
npm run dev
```

Slides compare all three libraries with animated architecture diagrams:

```bash
cd slides
npm install
npm run dev
```

---

[← Module 11: React Router](../module-11-react-router/) | [Module 13: Server Rendering →](../module-13-server-rendering/)
