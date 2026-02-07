# Quest 1: Training System - Solution Notes

## Key Concept: useState Hook

```jsx
const [value, setValue] = useState(initialValue);
```

- **value**: Current state value
- **setValue**: Function to update state
- **initialValue**: Starting value

## Multiple State Variables

```jsx
const [strength, setStrength] = useState(50);
const [intelligence, setIntelligence] = useState(50);
const [level, setLevel] = useState(1);
```

Each piece of state is independent!

## Updating State

```jsx
function train() {
  // ❌ Wrong: Don't mutate directly
  strength = strength + 5;
  
  // ✅ Right: Use setter function
  setStrength(strength + 5);
}
```

**Always use the setter function to update state!**

## State Triggers Re-render

When state changes → component re-renders → UI updates automatically!

```jsx
// Click button
<button onClick={() => setStrength(strength + 5)}>
  Train
</button>

// State updates → Component re-renders → New value displays
```

## Computed Values

```jsx
const totalPower = strength + intelligence + dexterity + stamina;
```

Recalculated every render based on current state!

## Best Practices

✅ One state variable per piece of data
✅ Use descriptive names (`strength` not `s`)
✅ Keep state at appropriate level
✅ Don't duplicate state (compute instead)

**Next**: Module 3 Quest 2 handles complex state!






