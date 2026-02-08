import { ZustandAnimation, ReduxAnimation, MobXAnimation } from "./animations";

export const slides = [
  {
    type: "title",
    content: {
      title: "State Management Libraries",
      subtitle: "Module 12: Zustand, Redux, MobX",
      icon: "package",
    },
  },
  {
    type: "standard",
    content: {
      title: "When Context Isn't Enough",
      points: [
        "Many components share complex state",
        "State logic is getting complicated",
        "Need debugging tools (time travel)",
        "Performance issues with frequent updates",
        "Team needs conventions and structure",
      ],
      icon: "help-circle",
    },
  },
  {
    type: "standard",
    content: {
      title: "Three Popular Solutions",
      points: [
        "Zustand — Simple, hooks-based, minimal (~1KB)",
        "Redux Toolkit — Industry standard, great DevTools (~11KB)",
        "MobX — Observable/reactive, automatic tracking (~16KB)",
      ],
      icon: "package",
    },
  },
  {
    type: "custom",
    component: ZustandAnimation,
  },
  {
    type: "code",
    content: {
      title: "Zustand — Simple Stores",
      code: `import { create } from 'zustand'

// Create a store - that's it!
const useStore = create((set) => ({
  spells: [],
  addSpell: (spell) => set((state) => ({
    spells: [...state.spells, spell]
  })),
  removeSpell: (id) => set((state) => ({
    spells: state.spells.filter(s => s.id !== id)
  }))
}))

// Use in any component - no provider needed!
function SpellList() {
  const spells = useStore((state) => state.spells)
  const addSpell = useStore((state) => state.addSpell)
  return <button onClick={() => addSpell({...})}>Add</button>
}`,
      highlights: [
        "No provider needed",
        "Hooks-based API",
        "Minimal boilerplate",
        "Select specific state to avoid re-renders",
      ],
    },
  },
  {
    type: "custom",
    component: ReduxAnimation,
  },
  {
    type: "code",
    content: {
      title: "Redux Toolkit — Slices",
      code: `import { createSlice, configureStore } from '@reduxjs/toolkit'

const spellSlice = createSlice({
  name: 'spells',
  initialState: { list: [] },
  reducers: {
    addSpell: (state, action) => {
      state.list.push(action.payload)  // Immer!
    },
    removeSpell: (state, action) => {
      state.list = state.list.filter(s => s.id !== action.payload)
    }
  }
})

const store = configureStore({
  reducer: { spells: spellSlice.reducer }
})

export const { addSpell, removeSpell } = spellSlice.actions`,
      highlights: [
        "Slice = reducer + actions together",
        'Immer lets you "mutate" safely',
        "configureStore sets up DevTools",
        "Export actions for dispatch",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Redux Toolkit — Usage",
      code: `import { Provider, useSelector, useDispatch } from 'react-redux'
import { addSpell } from './spellSlice'

// Wrap app with Provider
<Provider store={store}>
  <App />
</Provider>

// Use in components
function SpellList() {
  const spells = useSelector((state) => state.spells.list)
  const dispatch = useDispatch()
  
  return (
    <button onClick={() => dispatch(addSpell({ name: 'Fireball' }))}>
      Add Spell
    </button>
  )
}`,
      highlights: [
        "Provider wraps entire app",
        "useSelector reads state",
        "useDispatch gets dispatch function",
        "Actions dispatched to update state",
      ],
    },
  },
  {
    type: "custom",
    component: MobXAnimation,
  },
  {
    type: "code",
    content: {
      title: "MobX — Observable Stores",
      code: `import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'

class SpellStore {
  spells = []
  
  constructor() {
    makeAutoObservable(this)
  }
  
  addSpell(spell) {
    this.spells.push(spell)  // Direct mutation!
  }
  
  get totalPower() {  // Computed value
    return this.spells.reduce((sum, s) => sum + s.power, 0)
  }
}

const store = new SpellStore()

const SpellList = observer(() => {
  return <div>Total: {store.totalPower}</div>
})`,
      highlights: [
        "makeAutoObservable tracks everything",
        "Direct mutations are safe",
        "Getters = computed values",
        "observer() makes components reactive",
      ],
    },
  },
  {
    type: "comparison",
    content: {
      title: "Zustand vs Redux",
      left: {
        label: "Zustand",
        code: `// Create store
const useStore = create((set) => ({
  count: 0,
  inc: () => set(s => ({ count: s.count + 1 }))
}))

// Use it
const count = useStore(s => s.count)

// No provider needed!`,
      },
      right: {
        label: "Redux Toolkit",
        code: `// Create slice + store
const slice = createSlice({...})
const store = configureStore({...})

// Wrap with Provider
<Provider store={store}>

// Use hooks
const count = useSelector(s => s.count)
dispatch(increment())`,
      },
    },
  },
  {
    type: "comparison",
    content: {
      title: "Redux vs MobX",
      left: {
        label: "Redux (Immutable)",
        code: `// State updates must be immutable
addSpell: (state, action) => {
  state.list.push(action.payload)
  // Immer handles immutability
}

// Explicit actions
dispatch(addSpell({ name: 'Fire' }))`,
      },
      right: {
        label: "MobX (Observable)",
        code: `// Direct mutations tracked
addSpell(spell) {
  this.spells.push(spell)
  // MobX tracks the change
}

// Call methods directly
store.addSpell({ name: 'Fire' })`,
      },
    },
  },
  {
    type: "rules",
    content: {
      title: "When to Use Each",
      rules: [
        {
          rule: "Zustand",
          example: "Small-medium apps, want simplicity",
          icon: "package",
        },
        {
          rule: "Redux Toolkit",
          example: "Large apps, teams, need DevTools",
          icon: "disc",
        },
        {
          rule: "MobX",
          example: "Complex computed state, prefer OOP",
          icon: "eye",
        },
        {
          rule: "Context API",
          example: "Simple state, no extra deps",
          icon: "atom",
        },
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Zustand Superpowers",
      points: [
        "No provider — just import and use",
        "Middleware — persist, devtools, immer",
        "Tiny — ~1KB gzipped",
        "Selectors — prevent unnecessary re-renders",
        "Works outside React too",
      ],
      icon: "package",
    },
  },
  {
    type: "code",
    content: {
      title: "Zustand Persistence",
      code: `import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      spells: [],
      addSpell: (spell) => set((state) => ({
        spells: [...state.spells, spell]
      }))
    }),
    {
      name: 'spell-storage', // localStorage key
    }
  )
)

// Data automatically saved and restored!`,
      highlights: [
        "persist() middleware",
        "Saves to localStorage",
        "Restores on page load",
        "Configurable storage",
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Redux DevTools",
      points: [
        "Time-travel debugging — step through actions",
        "State diff — see what changed",
        "Action log — every dispatch recorded",
        "Export/import — share state for debugging",
        "Pause/resume — control updates",
      ],
      icon: "disc",
    },
  },
  {
    type: "standard",
    content: {
      title: "MobX Computed Values",
      points: [
        "Automatically derived from state",
        "Cached until dependencies change",
        "Update automatically when state changes",
        "More efficient than computing in render",
        "Perfect for complex derived data",
      ],
      icon: "eye",
    },
  },
  {
    type: "code",
    content: {
      title: "MobX Computed Example",
      code: `class Store {
  items = []
  filter = 'all'
  
  constructor() {
    makeAutoObservable(this)
  }
  
  // Computed - cached automatically!
  get filteredItems() {
    if (this.filter === 'all') return this.items
    return this.items.filter(i => i.type === this.filter)
  }
  
  get stats() {
    return {
      total: this.items.length,
      completed: this.items.filter(i => i.done).length,
      // Can use other computed values
      filtered: this.filteredItems.length
    }
  }
}`,
      highlights: [
        "Getters become computed values",
        "Cached until dependencies change",
        "Can depend on other computed",
        "Auto-update on state change",
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Library Comparison",
      points: [
        "Bundle: Zustand (~1KB) < Redux (~11KB) < MobX (~16KB)",
        "Boilerplate: Zustand < MobX < Redux",
        "DevTools: Redux > MobX > Zustand",
        "Learning: Zustand < Redux ≈ MobX",
        "Enterprise: Redux > MobX > Zustand",
      ],
      icon: "scale",
    },
  },
  {
    type: "standard",
    content: {
      title: "Module 12 Quests",
      points: [
        "Quest 1: Zustand Spell Inventory — Simple stores with persistence",
        "Quest 2: Redux Battle Tracker — Slices, actions, selectors",
        "Quest 3: MobX Academy Dashboard — Observables & computed",
      ],
      icon: "clipboard",
    },
  },
  {
    type: "title",
    content: {
      title: "Choose Your Weapon!",
      subtitle: "Each library solves the same problem differently",
      icon: "target",
    },
  },
];
