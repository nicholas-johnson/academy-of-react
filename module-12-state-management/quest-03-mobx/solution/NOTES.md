# Quest 3: MobX - Solution Notes

## Key Concepts

### 1. Creating an Observable Store

```jsx
import { makeAutoObservable } from 'mobx'

class Store {
  items = []
  filter = 'all'
  
  constructor() {
    makeAutoObservable(this)
  }
  
  // Actions - direct mutations!
  addItem(item) {
    this.items.push(item)
  }
  
  // Computed values - automatically cached
  get filteredItems() {
    if (this.filter === 'all') return this.items
    return this.items.filter(i => i.type === this.filter)
  }
}

export const store = new Store()
```

### 2. Observer Components

```jsx
import { observer } from 'mobx-react-lite'
import { store } from './store'

// Wrap component with observer()
const MyComponent = observer(() => {
  return (
    <div>
      {store.items.map(item => <Item key={item.id} item={item} />)}
      <button onClick={() => store.addItem({ id: 1 })}>Add</button>
    </div>
  )
})
```

### 3. Computed Values (Getters)

```jsx
class Store {
  items = []
  
  constructor() {
    makeAutoObservable(this)
  }
  
  // Computed - automatically cached and updated
  get totalCount() {
    return this.items.length
  }
  
  get totalValue() {
    return this.items.reduce((sum, i) => sum + i.value, 0)
  }
  
  // Computed can use other computed
  get average() {
    if (this.totalCount === 0) return 0
    return this.totalValue / this.totalCount
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
import { autorun, reaction } from 'mobx'

// Runs whenever any accessed observable changes
autorun(() => {
  console.log('Items changed:', store.items.length)
})

// Runs when specific data changes
reaction(
  () => store.filter,
  (filter) => {
    console.log('Filter changed to:', filter)
  }
)
```

## MobX vs Redux vs Zustand

| Aspect | MobX | Redux | Zustand |
|--------|------|-------|---------|
| Mental Model | Observable | Actions/Reducers | Hooks |
| Mutations | Direct | Immutable | Immutable |
| Computed | Built-in | Selectors | Manual |
| Boilerplate | Low | Medium | Low |
| Learning Curve | Medium | Medium | Low |

## Best Practices

1. **Keep stores focused** — One store per domain
2. **Use computed for derived data** — Don't compute in render
3. **Always wrap with observer** — Or components won't update
4. **Don't destructure observables** — `store.items` not `const { items } = store`
