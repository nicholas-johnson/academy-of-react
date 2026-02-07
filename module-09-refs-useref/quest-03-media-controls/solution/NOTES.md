# Quest 3: Replay Controls - Solution Notes

## Overview
Video-like replay controls using refs to store interval ID. Demonstrates when to use refs vs state for side effects.

## Key Concepts

### Ref for Interval ID
```typescript
const intervalRef = useRef<number | null>(null)
```

Storing interval ID in state would cause unnecessary re-renders.

### Starting Interval
```typescript
intervalRef.current = window.setInterval(() => {
  setCurrentTime(prev => prev + 1)
}, 1000)
```

Store interval ID in ref, update time in state to trigger UI updates.

### Cleanup
```typescript
const pause = () => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }
  setIsPlaying(false)
}
```

Clear interval and nullify ref.

### TypeScript with Timers
```typescript
useRef<number | null>(null)
```

`window.setInterval` returns `number` type in browser.

## When to Use Ref vs State

**Use State**:
- Values that affect rendering
- UI-related data (currentTime, isPlaying)

**Use Ref**:
- Side effect IDs (intervals, timeouts)
- Previous values
- DOM elements

## Testing
1. Click Play - time should increment
2. Click Pause - time stops
3. Click Restart - time resets to 0
4. Events appear as time progresses
5. Buttons disable appropriately

## What's Next
Module 10 introduces Context API for global state management with TypeScript.
