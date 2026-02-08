# Module 12: State Management Libraries

## Story Context

The Academy has grown massive! Managing state across dozens of components with Context alone is becoming unwieldy. Professor Hooksweasel introduces **external state management libraries** — powerful tools that help organize complex application state outside of React's component tree.

"When your application grows," she explains, "you need specialized tools. Each library has its philosophy — choose the one that fits your battle style."

## Learning Objectives

By the end of this module, you will:

- Understand when to use external state management
- Build stores with **Zustand** (simple, modern)
- Manage state with **Redux Toolkit** (industry standard)
- Use **MobX** (observable/reactive pattern)
- Compare tradeoffs between libraries
- Choose the right tool for your project

## State Management Libraries

### Zustand

- Minimal API, hooks-based
- No boilerplate, no providers
- Great for small-to-medium apps
- ~1KB bundle size

### Redux Toolkit

- Industry standard, large ecosystem
- Predictable state with actions/reducers
- DevTools for time-travel debugging
- Great for large teams and complex apps

### MobX

- Observable/reactive pattern
- Automatic tracking of dependencies
- Mutable-style syntax (made safe)
- Great for complex derived state

## JavaScript Concepts

- Store patterns
- Immutable vs mutable updates
- Selectors and derived state
- Middleware and side effects
- DevTools integration

## Setup Instructions

Each quest uses **Vite + React** with the respective library.

```bash
cd module-12-state-management/demo
npm install
npm run dev
```

## Core Concepts

### Zustand — Simple Stores

```jsx
import { create } from "zustand";

// Create a store
const useStore = create((set) => ({
  wizards: [],
  addWizard: (wizard) =>
    set((state) => ({
      wizards: [...state.wizards, wizard],
    })),
  removeWizard: (id) =>
    set((state) => ({
      wizards: state.wizards.filter((w) => w.id !== id),
    })),
}));

// Use in any component — no provider needed!
function WizardList() {
  const wizards = useStore((state) => state.wizards);
  const addWizard = useStore((state) => state.addWizard);

  return (
    <div>
      {wizards.map((w) => (
        <div key={w.id}>{w.name}</div>
      ))}
      <button onClick={() => addWizard({ id: 1, name: "Harry" })}>
        Add Wizard
      </button>
    </div>
  );
}
```

### Redux Toolkit — Slices and Actions

```jsx
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

// Create a slice
const wizardSlice = createSlice({
  name: "wizards",
  initialState: { list: [] },
  reducers: {
    addWizard: (state, action) => {
      state.list.push(action.payload); // Immer makes this safe!
    },
    removeWizard: (state, action) => {
      state.list = state.list.filter((w) => w.id !== action.payload);
    },
  },
});

// Create store
const store = configureStore({
  reducer: { wizards: wizardSlice.reducer },
});

// Use in components
function WizardList() {
  const wizards = useSelector((state) => state.wizards.list);
  const dispatch = useDispatch();

  return (
    <div>
      {wizards.map((w) => (
        <div key={w.id}>{w.name}</div>
      ))}
      <button
        onClick={() =>
          dispatch(wizardSlice.actions.addWizard({ id: 1, name: "Harry" }))
        }
      >
        Add Wizard
      </button>
    </div>
  );
}

// Wrap app with Provider
<Provider store={store}>
  <App />
</Provider>;
```

### MobX — Observables

```jsx
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

// Create a store class
class WizardStore {
  wizards = [];

  constructor() {
    makeAutoObservable(this);
  }

  addWizard(wizard) {
    this.wizards.push(wizard); // Direct mutation is tracked!
  }

  removeWizard(id) {
    this.wizards = this.wizards.filter((w) => w.id !== id);
  }

  get totalPower() {
    return this.wizards.reduce((sum, w) => sum + w.power, 0);
  }
}

const store = new WizardStore();

// Components must be wrapped with observer
const WizardList = observer(() => {
  return (
    <div>
      {store.wizards.map((w) => (
        <div key={w.id}>{w.name}</div>
      ))}
      <button
        onClick={() => store.addWizard({ id: 1, name: "Harry", power: 100 })}
      >
        Add Wizard
      </button>
      <p>Total Power: {store.totalPower}</p>
    </div>
  );
});
```

## When to Use External State Management

### Use Context API when:

- State is relatively simple
- Few components need the state
- You want zero dependencies
- State doesn't change frequently

### Use External Libraries when:

- Many components share state
- Complex state logic
- Need DevTools/debugging
- State changes frequently
- Large team needs conventions

## Quests

### Quest 1: Zustand Spell Inventory

**Difficulty**: Intermediate

Build a spell inventory system using Zustand. Add, remove, and filter spells with a minimal, hooks-based store.

[Start Quest →](./quest-01-zustand/)

### Quest 2: Redux Battle Tracker

**Difficulty**: Advanced

Create a battle tracking system using Redux Toolkit. Manage battles, combatants, and battle history with slices and actions.

[Start Quest →](./quest-02-redux/)

### Quest 3: MobX Academy Dashboard

**Difficulty**: Advanced

Build an Academy dashboard with MobX. Track students, courses, and computed statistics using observables.

[Start Quest →](./quest-03-mobx/)

## Library Comparison

| Feature        | Zustand           | Redux Toolkit     | MobX                  |
| -------------- | ----------------- | ----------------- | --------------------- |
| Bundle Size    | ~1KB              | ~11KB             | ~16KB                 |
| Boilerplate    | Minimal           | Moderate          | Minimal               |
| Learning Curve | Easy              | Moderate          | Moderate              |
| DevTools       | Basic             | Excellent         | Good                  |
| TypeScript     | Great             | Great             | Good                  |
| Best For       | Small-medium apps | Large apps, teams | Complex derived state |

## Key Takeaways

- **Zustand**: Simplest API, no providers, great DX
- **Redux Toolkit**: Industry standard, great tooling, predictable
- **MobX**: Reactive/observable, automatic tracking, computed values
- All three solve the same problem differently
- Choose based on team size, app complexity, and preferences
- You can often start with Context and migrate later

---

**Previous Module**: [Module 11: React Router](../module-11-react-router/)

**Next Module**: [Module 13: Server Rendering](../module-13-server-rendering/)
