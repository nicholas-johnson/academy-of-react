# Quest 2: Potion Brewing - Solution Notes

## Key Concepts

### 1. State as an Object

```jsx
const [brewing, setBrewing] = useState({
  currentStep: 0,
  isComplete: false,
  success: null,
});
```

Group related state into a single object when values change together!

### 2. Updating Object State (Spread Operator)

```jsx
setBrewing({
  ...brewing,
  currentStep: brewing.currentStep + 1,
});
```

Always spread the existing state, then override the properties you want to change.

### 3. State-Based Rendering

```jsx
if (brewing.isComplete) {
  return <SuccessScreen />;
}

return <BrewingScreen />;
```

Conditional rendering based on state properties.

### 4. Computed Values from State

```jsx
const progress = (brewing.currentStep / steps.length) * 100;
```

Calculate display values from current state - don't store computed values.

## When to Use Object State

**Use an object when:**

- Values are conceptually related (all describe one "thing")
- Values often change together
- You want to reset multiple values at once

**Use separate useState calls when:**

- Values are independent
- They change at different times
- They're used in different parts of the component

## Best Practices

- Always create a NEW object when updating (immutability)
- Use spread operator: `{ ...oldState, newProp: value }`
- Never mutate state directly: `brewing.currentStep++` is WRONG
- Compute derived values, don't store them

**Next**: Module 4 covers forms and events! (Array state is in Module 4's bonus quest)
