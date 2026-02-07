# Quest 1: Meditation Timer - Solution Notes

## Overview

Countdown timer with start/pause/reset controls, real-time display, progress bar, and alert on completion. Demonstrates useEffect with intervals and proper cleanup.

## Key Concepts

### Timer with useEffect

```javascript
useEffect(() => {
  if (!isRunning) return;

  const intervalId = setInterval(() => {
    setSecondsRemaining((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(intervalId); // Cleanup!
}, [isRunning]);
```

### Cleanup Function

The `return` statement in useEffect runs when:

- Component unmounts
- Effect re-runs (before next execution)
- Dependencies change

**Critical for intervals/timers to prevent memory leaks!**

### Time Formatting

```javascript
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};
```

### Progress Calculation

```javascript
const progress = ((totalSeconds - secondsRemaining) / totalSeconds) * 100;
```

## Common Pitfalls

❌ **Forgetting cleanup**

```javascript
useEffect(() => {
  setInterval(() => {...}, 1000)
  // Memory leak - interval never cleared!
}, [])
```

✅ **Always cleanup**

```javascript
useEffect(() => {
  const id = setInterval(() => {...}, 1000)
  return () => clearInterval(id)
}, [])
```

## Testing

1. Start timer - should countdown
2. Pause - should stop
3. Resume - should continue from where it stopped
4. Reset - should clear timer
5. Let timer reach 0 - should alert
6. Navigate away - no console errors (cleanup working)

## What's Next

Quest 2 teaches data fetching with useEffect - essential for real-world apps.
