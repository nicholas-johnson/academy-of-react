# Quest 2: Redux Toolkit - Solution Notes

## Key Concepts

### 1. Store Configuration

```jsx
import { configureStore } from '@reduxjs/toolkit'
import battleReducer from './battleSlice'

const store = configureStore({
  reducer: {
    battles: battleReducer
  }
})
```

### 2. Creating Slices

```jsx
import { createSlice } from '@reduxjs/toolkit'

const battleSlice = createSlice({
  name: 'battles',
  initialState: { list: [] },
  reducers: {
    addBattle: (state, action) => {
      // Immer makes this "mutation" safe!
      state.list.push(action.payload)
    },
    updateStatus: (state, action) => {
      const battle = state.list.find(b => b.id === action.payload.id)
      if (battle) battle.status = action.payload.status
    }
  }
})

export const { addBattle, updateStatus } = battleSlice.actions
export default battleSlice.reducer
```

### 3. Provider Setup

```jsx
import { Provider } from 'react-redux'
import store from './store'

<Provider store={store}>
  <App />
</Provider>
```

### 4. Using in Components

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { addBattle, selectAllBattles } from './battleSlice'

function Component() {
  const battles = useSelector(selectAllBattles)
  const dispatch = useDispatch()
  
  const handleAdd = () => {
    dispatch(addBattle({ name: 'New Battle' }))
  }
}
```

## Selectors

```jsx
// Simple selector
export const selectAllBattles = (state) => state.battles.list

// Derived/computed selector
export const selectFilteredBattles = (state) => {
  const filter = state.battles.filter
  if (filter === 'all') return state.battles.list
  return state.battles.list.filter(b => b.status === filter)
}

// For complex selectors, use createSelector from reselect (built into RTK)
import { createSelector } from '@reduxjs/toolkit'

export const selectBattleStats = createSelector(
  [selectAllBattles],
  (battles) => ({
    total: battles.length,
    victories: battles.filter(b => b.status === 'victory').length
  })
)
```

## Immer in Redux Toolkit

Redux Toolkit uses Immer under the hood, so you can write "mutating" logic:

```jsx
// This looks like mutation but is actually immutable!
addBattle: (state, action) => {
  state.list.push(action.payload)
}

// Same as writing:
addBattle: (state, action) => {
  return {
    ...state,
    list: [...state.list, action.payload]
  }
}
```

## Why Redux Toolkit?

### Advantages
- **Industry Standard** — Most popular, huge ecosystem
- **Excellent DevTools** — Time-travel debugging
- **Predictable** — All changes via actions
- **Middleware** — Async logic, logging, etc.
- **Immer Built-in** — Simple immutable updates

### When to Use
- Large applications
- Teams that need conventions
- Complex state with many interactions
- When you need powerful DevTools
- Async logic (createAsyncThunk)

## DevTools

Install Redux DevTools browser extension to:
- See all dispatched actions
- Inspect state at any point
- Time-travel through state changes
- Export/import state for debugging

## Async Actions

```jsx
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchBattles = createAsyncThunk(
  'battles/fetchBattles',
  async () => {
    const response = await fetch('/api/battles')
    return response.json()
  }
)

// In slice
extraReducers: (builder) => {
  builder
    .addCase(fetchBattles.pending, (state) => {
      state.loading = true
    })
    .addCase(fetchBattles.fulfilled, (state, action) => {
      state.loading = false
      state.list = action.payload
    })
}
```
