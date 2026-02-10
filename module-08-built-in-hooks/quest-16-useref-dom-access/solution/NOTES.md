# Quest 1: Battle Prompt - Solution Notes

## Overview

Command-line style interface with auto-focus and imperative focus control using refs. TypeScript provides type safety for refs.

## Key Concepts

### useRef with TypeScript

```typescript
const inputRef = useRef<HTMLInputElement>(null);
```

Must specify element type for type safety.

### Auto-Focus on Mount

```typescript
useEffect(() => {
  inputRef.current?.focus();
}, []);
```

Optional chaining (`?.`) handles null case safely.

### Imperative Focus

```typescript
const handleClearAndFocus = () => {
  setSpellInput("");
  inputRef.current?.focus();
};
```

Direct DOM manipulation - can't do this with state alone.

### When to Use Refs vs State

- **State**: Data that affects what renders
- **Refs**: Direct DOM access, values that don't trigger re-renders

## TypeScript Benefits

- Type checking prevents wrong element types
- Autocomplete for DOM methods
- Safer null handling with `?`

## Testing

1. Page loads - input should be focused
2. Type and submit - input refocuses
3. Click "Clear & Focus" - clears and refocuses
4. History shows submitted spells

## What's Next

Quest 2 uses refs to trigger CSS animations imperatively.
