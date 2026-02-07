# Quest 4 Solution: Spell Inventory with useReducer

## Key Concepts Demonstrated

### 1. Reducer Function

A reducer is a pure function that takes the current state and an action, and returns the new state:

```javascript
function spellReducer(state, action) {
  switch (action.type) {
    case "ADD_SPELL":
      return { ...state, spells: [...state.spells, action.spell] };
    // ... other cases
    default:
      return state;
  }
}
```

**Rules for reducers:**

- Must be pure (no side effects)
- Must return new state object (don't mutate!)
- Should handle unknown actions by returning current state

### 2. Dispatching Actions

Instead of calling setters directly, dispatch action objects:

```javascript
// With useState
setSpells(spells.filter((s) => s.id !== id));

// With useReducer
dispatch({ type: "REMOVE_SPELL", id });
```

Actions describe **what happened**, not how to update the state.

### 3. Immutable Updates

Always return new objects/arrays:

```javascript
// Update one item in array
case 'UPGRADE_SPELL':
  return {
    ...state,
    spells: state.spells.map(spell =>
      spell.id === action.id
        ? { ...spell, power: spell.power + 10 }  // New object
        : spell
    )
  }
```

## When to Use useReducer

| useState                      | useReducer                      |
| ----------------------------- | ------------------------------- |
| Simple state (number, string) | Complex state (objects, arrays) |
| 1-2 update patterns           | Many action types               |
| Quick prototyping             | Predictable, testable updates   |
| Independent values            | Related state values            |

## Benefits of useReducer

1. **Centralized logic** — All state updates in one place
2. **Predictable** — Same action always produces same result
3. **Testable** — Easy to unit test reducers
4. **Scalable** — Easy to add new action types
5. **DevTools** — Works with Redux DevTools (with middleware)

## Common Patterns

### Adding to an array

```javascript
return { ...state, items: [...state.items, newItem] };
```

### Removing from an array

```javascript
return { ...state, items: state.items.filter((i) => i.id !== action.id) };
```

### Updating an item in an array

```javascript
return {
  ...state,
  items: state.items.map((item) =>
    item.id === action.id ? { ...item, ...updates } : item,
  ),
};
```
