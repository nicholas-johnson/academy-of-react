# Quest 4: Spell Inventory with useReducer

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

The Academy's Spell Inventory system is getting complex! Students can learn new spells, forget old ones, upgrade spell power, and mark favorites. Managing all these actions with multiple `useState` calls is becoming unwieldy. Professor Hooksweasel suggests using `useReducer` — a more structured approach that handles complex state through actions.

"When your state has many related values and multiple ways to update them," she explains, "useReducer brings order to the chaos."

## Objective

Build a Spell Inventory manager using `useReducer` to handle multiple actions: add spells, remove spells, upgrade power, and toggle favorites.

## Technical Concepts

- `useReducer` hook
- Reducer functions: `(state, action) => newState`
- Action types and payloads
- When to use useReducer vs useState

## Requirements

Create a spell inventory with these features:

1. **Display spell list** showing name, power level, and favorite status
2. **Add Spell** — Add a new spell to the inventory
3. **Remove Spell** — Delete a spell from the inventory
4. **Upgrade Spell** — Increase a spell's power by 10
5. **Toggle Favorite** — Mark/unmark a spell as favorite
6. **Show Stats** — Display total spells and total power

## Actions to Implement

```javascript
// Action types to handle:
{ type: 'ADD_SPELL', spell: { id, name, power, isFavorite } }
{ type: 'REMOVE_SPELL', id: number }
{ type: 'UPGRADE_SPELL', id: number }
{ type: 'TOGGLE_FAVORITE', id: number }
```

## Acceptance Criteria

- [ ] useReducer manages the spell inventory state
- [ ] Reducer handles all four action types
- [ ] New spells can be added with a form
- [ ] Spells can be removed from the list
- [ ] Spell power can be upgraded (+10)
- [ ] Favorite status can be toggled
- [ ] Stats display total spells and combined power
- [ ] No console errors

## Hints

<details>
<summary>Click to reveal hints</summary>

**Hint 1**: Define your initial state:

```javascript
const initialState = {
  spells: [
    { id: 1, name: "Fireball", power: 50, isFavorite: true },
    { id: 2, name: "Ice Shard", power: 35, isFavorite: false },
  ],
};
```

**Hint 2**: Basic reducer structure:

```javascript
function spellReducer(state, action) {
  switch (action.type) {
    case "ADD_SPELL":
      return { ...state, spells: [...state.spells, action.spell] };
    case "REMOVE_SPELL":
      return {
        ...state,
        spells: state.spells.filter((s) => s.id !== action.id),
      };
    // ... other cases
    default:
      return state;
  }
}
```

**Hint 3**: Using the reducer:

```javascript
const [state, dispatch] = useReducer(spellReducer, { spells: initialSpells });

// Dispatch actions
dispatch({ type: "ADD_SPELL", spell: newSpell });
dispatch({ type: "UPGRADE_SPELL", id: 123 });
```

**Hint 4**: Upgrade spell action:

```javascript
case 'UPGRADE_SPELL':
  return {
    ...state,
    spells: state.spells.map(spell =>
      spell.id === action.id
        ? { ...spell, power: spell.power + 10 }
        : spell
    )
  }
```

</details>

## Bonus Challenge

1. **Add a RESET action** to restore initial spells
2. **Add spell categories** (Fire, Ice, Lightning) with filtering
3. **Persist to localStorage** using useEffect
4. **Add undo functionality** by tracking action history
5. **Create a useSpellInventory custom hook** that wraps the reducer

## When to Use useReducer

| useState            | useReducer             |
| ------------------- | ---------------------- |
| Simple values       | Complex objects/arrays |
| Independent updates | Related state values   |
| Few update patterns | Many action types      |
| Quick prototyping   | Predictable updates    |

---

**Back to Module**: [Module 8: Built-in React Hooks](../)
