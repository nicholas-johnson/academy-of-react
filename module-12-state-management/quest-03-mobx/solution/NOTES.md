# Quest 3: MobX - Solution Notes

## Overview

Academy dashboard with MobX. Demonstrates observable stores, computed values, direct mutations, and automatic dependency tracking.

## File Structure

```
src/
├── store.js                   # MobX store class
├── data/
│   └── houses.js              # House constants and colors
├── components/
│   ├── StatsCards.jsx         # Overall stats (observer)
│   ├── HouseStats.jsx         # House-specific stats (observer)
│   ├── AddStudentForm.jsx     # Form to add students
│   └── StudentRoster.jsx      # Student list (observer)
└── App.jsx                    # Composition
```

## Key Concepts

### 1. Creating an Observable Store

```jsx
import { makeAutoObservable } from "mobx";

class Store {
  items = [];
  filter = "all";

  constructor() {
    makeAutoObservable(this);
  }

  // Actions - direct mutations!
  addItem(item) {
    this.items.push(item);
  }

  // Computed values - automatically cached
  get filteredItems() {
    if (this.filter === "all") return this.items;
    return this.items.filter((i) => i.type === this.filter);
  }
}

export const store = new Store();
```

### 2. Observer Components

Components that read from the store must be wrapped with `observer()`:

```jsx
// StatsCards.jsx - Observed component
import { observer } from "mobx-react-lite";
import { academyStore } from "../store";

export const StatsCards = observer(() => {
  return (
    <div>
      <span>{academyStore.studentCount}</span>
      <span>{academyStore.totalPower}</span>
      <span>{academyStore.averagePower}</span>
    </div>
  );
});

// AddStudentForm.jsx - Regular component (no observation needed)
import { academyStore } from "../store";

export function AddStudentForm() {
  const handleSubmit = () => {
    academyStore.addStudent({ name, house, power });
  };
  // ... doesn't read from store, just calls actions
}

// StudentRoster.jsx - Observed component
export const StudentRoster = observer(() => {
  return (
    <div>
      {/* Uses computed values and calls actions */}
      {academyStore.sortedStudents.map(student => (
        <div key={student.id}>
          {student.name}
          <button onClick={() => academyStore.removeStudent(student.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
});
```

**Rule**: Only wrap components that **read** from the store. Components that only **write** don't need `observer`.

### 3. Computed Values (Getters)

```jsx
class Store {
  items = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Computed - automatically cached and updated
  get totalCount() {
    return this.items.length;
  }

  get totalValue() {
    return this.items.reduce((sum, i) => sum + i.value, 0);
  }

  // Computed can use other computed
  get average() {
    if (this.totalCount === 0) return 0;
    return this.totalValue / this.totalCount;
  }
}
```

### 4. Direct Mutations

MobX tracks changes automatically — no need for immutable updates:

```jsx
// This is fine in MobX!
addItem(item) {
  this.items.push(item)  // Direct push
}

updateItem(id, changes) {
  const item = this.items.find(i => i.id === id)
  Object.assign(item, changes)  // Direct mutation
}

removeItem(id) {
  const index = this.items.findIndex(i => i.id === id)
  this.items.splice(index, 1)  // Direct splice
}
```

## Why MobX?

### Advantages

- **Minimal Boilerplate** — Just classes and decorators
- **Direct Mutations** — Write natural JavaScript
- **Automatic Tracking** — MobX figures out dependencies
- **Computed Caching** — Derived values are cached
- **Fine-grained Updates** — Only affected components re-render

### When to Use

- Complex derived/computed state
- When you prefer OOP style
- Apps with lots of interdependent data
- When you want minimal boilerplate
- Real-time/reactive applications

## makeAutoObservable

```jsx
constructor() {
  makeAutoObservable(this)
}
```

This automatically makes:

- Properties → **observables**
- Getters → **computed**
- Methods → **actions**
- Async methods → **flows** (if using generators)

## Reactions (Side Effects)

```jsx
import { autorun, reaction } from "mobx";

// Runs whenever any accessed observable changes
autorun(() => {
  console.log("Items changed:", store.items.length);
});

// Runs when specific data changes
reaction(
  () => store.filter,
  (filter) => {
    console.log("Filter changed to:", filter);
  },
);
```

## Component Organization

```jsx
// App.jsx - Pure composition
import { StatsCards } from "./components/StatsCards";
import { HouseStats } from "./components/HouseStats";
import { AddStudentForm } from "./components/AddStudentForm";
import { StudentRoster } from "./components/StudentRoster";

function App() {
  return (
    <div>
      <StatsCards />      {/* observer - reads computed values */}
      <HouseStats />      {/* observer - reads computed values */}
      <AddStudentForm />  {/* regular - only calls actions */}
      <StudentRoster />   {/* observer - reads and writes */}
    </div>
  );
}
```

Three types of components:
1. **Observer + Read** - Display computed/observable data
2. **Regular + Write** - Forms that only call actions
3. **Observer + Read/Write** - Lists that display and modify

## MobX vs Redux vs Zustand

| Aspect         | MobX       | Redux            | Zustand   |
| -------------- | ---------- | ---------------- | --------- |
| Mental Model   | Observable | Actions/Reducers | Hooks     |
| Mutations      | Direct     | Immutable        | Immutable |
| Computed       | Built-in   | Selectors        | Manual    |
| Boilerplate    | Low        | Medium           | Low       |
| Learning Curve | Medium     | Medium           | Low       |

## Best Practices

1. **Keep stores focused** — One store per domain
2. **Use computed for derived data** — Don't compute in render
3. **Always wrap with observer** — Or components won't update
4. **Don't destructure observables** — `store.items` not `const { items } = store`
