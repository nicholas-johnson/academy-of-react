# Quest 2: Spell Optimizer - Solution Notes

## Overview
Demonstrates React.memo and useCallback working together. Shows side-by-side comparison of optimized vs unoptimized components.

## Key Concepts

### React.memo
```typescript
const OptimizedComponent = memo(({ prop }: Props) => {
  // Only re-renders if props change
  return <div>{prop}</div>
})
```

Shallow comparison of props. Skips render if props haven't changed.

### useCallback
```typescript
const handleClick = useCallback((id: number) => {
  // Stable function reference
}, []) // Dependencies
```

Returns memoized function. Reference only changes when deps change.

### Why Both Are Needed
```typescript
// WITHOUT useCallback:
const handleClick = (id: number) => { } // New function every render
<MemoizedChild onCast={handleClick} /> // Props "changed", memo useless

// WITH useCallback:
const handleClick = useCallback((id: number) => { }, []) // Stable reference
<MemoizedChild onCast={handleClick} /> // Props unchanged, memo works!
```

memo compares by reference. New function = different reference = re-render.

### useCallback with State
```typescript
// BAD - stale closure
const handleClick = useCallback(() => {
  setCount(count + 1) // Uses old count value
}, []) // Missing dependency

// GOOD - updater function
const handleClick = useCallback(() => {
  setCount(prev => prev + 1) // Always has latest value
}, []) // No dependencies needed
```

## Testing
1. Toggle theme - check console
2. Unoptimized components ALL re-render
3. Optimized components DON'T re-render (props unchanged)
4. Click cast spell - only that specific component updates

## What's Next
Quest 3 demonstrates code splitting with React.lazy and Suspense.
