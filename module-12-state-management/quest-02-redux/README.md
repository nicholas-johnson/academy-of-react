# Quest 2: Redux Battle Tracker

Build a battle tracking system using Redux Toolkit — the industry-standard state management library.

## Why Redux Toolkit?

- Industry standard, huge ecosystem
- Predictable state with actions/reducers
- Excellent DevTools for debugging
- Great for large teams and complex apps
- Built-in Immer for immutable updates

## Requirements

- Set up a Redux store with configureStore
- Create a battles slice with createSlice
- Track battles with name, status, and combatants
- Add and update battle status
- Filter battles by status
- Use selectors for derived state

## Acceptance Criteria

- [ ] Store configured with configureStore
- [ ] Slice created with createSlice
- [ ] Provider wraps the app
- [ ] Can add new battles
- [ ] Can update battle status (pending → active → victory/defeat)
- [ ] Can add combatants to battles
- [ ] Filter by status works
- [ ] Selectors compute derived data

## Hints

```jsx
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

// Create a slice (reducer + actions in one)
const battleSlice = createSlice({
  name: "battles",
  initialState: { list: [] },
  reducers: {
    addBattle: (state, action) => {
      // Immer lets you "mutate" state safely
      state.list.push(action.payload);
    },
    updateStatus: (state, action) => {
      const battle = state.list.find((b) => b.id === action.payload.id);
      if (battle) battle.status = action.payload.status;
    },
  },
});

// Configure the store
const store = configureStore({
  reducer: { battles: battleSlice.reducer },
});

// Use in components
const battles = useSelector((state) => state.battles.list);
const dispatch = useDispatch();
dispatch(battleSlice.actions.addBattle({ name: "Battle 1" }));
```

## Installation

```bash
npm install @reduxjs/toolkit react-redux
```

[Next →](../quest-03-mobx/)
