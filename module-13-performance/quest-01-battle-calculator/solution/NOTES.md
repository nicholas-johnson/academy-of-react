# Quest 1: Battle Calculator - Solution Notes

## Overview
Demonstrates useMemo for expensive calculations. Battle simulation runs only when dependencies change, not on every render.

## Key Concepts

### useMemo Syntax
```typescript
const result = useMemo(() => {
  // Expensive calculation
  return calculateSomething()
}, [dependency1, dependency2])
```

Only recalculates when dependencies change.

### Multiple useMemo Chains
```typescript
const filteredStudents = useMemo(() => {
  return STUDENTS.filter(s => s.level >= minLevel)
}, [minLevel])

const battleResult = useMemo(() => {
  return calculateBattleOutcome(filteredStudents, powerMultiplier)
}, [filteredStudents, powerMultiplier])
```

Second useMemo depends on first useMemo's result.

### When to Use useMemo
**Use for**:
- Expensive calculations (loops, complex math)
- Filtering/sorting large arrays
- Object/array creation passed to child components

**Don't use for**:
- Simple operations (addition, string concat)
- Operations already fast (<10ms)
- Premature optimization

### Profiling First
```typescript
console.log('Calculating...')
// Run operation
// If fast in console, useMemo not needed
```

Measure before optimizing.

## Testing
1. Change power multiplier - console shows recalculation
2. Change level filter - console shows recalculation
3. Click force re-render - NO recalculation (useMemo working!)
4. All three scenarios show different memoization behavior

## What's Next
Quest 2 combines React.memo with useCallback for component optimization.
