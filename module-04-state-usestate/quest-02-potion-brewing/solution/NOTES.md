# Quest 2: Potion Brewing - Solution Notes

## Key Concepts

### 1. Multiple Related State Variables

```jsx
const [currentStep, setCurrentStep] = useState(0);
const [timeLeft, setTimeLeft] = useState(5);
const [isActive, setIsActive] = useState(false);
const [success, setSuccess] = useState(null);
```

Multiple pieces of state working together!

### 2. State-Based Rendering

```jsx
if (success !== null) {
  return <SuccessScreen />;
}

return <BrewingScreen />;
```

Conditional rendering based on state.

### 3. Computed Values from State

```jsx
const progress = (currentStep / steps.length) * 100;
```

Calculate display values from current state.

### 4. useEffect for Timer (Bonus)

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft(t => t - 1);
  }, 1000);
  
  return () => clearInterval(interval);
}, [isActive]);
```

Side effects for timers, subscriptions, etc.

## State Management Patterns

**Sequential State**: Current step determines what displays  
**Timed State**: Countdown affects progression  
**Success/Failure**: Final result affects UI

## Best Practices

✅ Keep related state together
✅ Use boolean flags for UI states
✅ Compute derived values (don't store)
✅ Clear intervals/timers in cleanup

**Next**: Module 4 Quest 3 handles array state!






