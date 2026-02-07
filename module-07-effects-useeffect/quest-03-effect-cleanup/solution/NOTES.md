# Quest 3: Auto-Save - Solution Notes

## Overview
Auto-save text to localStorage with 1-second debounce. Load saved data on mount. Display save status and timestamp. Demonstrates debouncing pattern with useEffect.

## Key Concepts

### Debouncing with useEffect
```javascript
useEffect(() => {
  const timeoutId = setTimeout(() => {
    // Save after 1 second of no changes
    saveToLocalStorage()
  }, 1000)
  
  return () => clearTimeout(timeoutId) // Cancel if user types again
}, [data])
```

Every keystroke:
1. Sets new timeout
2. Cleanup cancels previous timeout
3. Only last timeout executes (after user stops typing)

### localStorage Pattern
```javascript
// Save
localStorage.setItem('key', value)

// Load on mount
useEffect(() => {
  const saved = localStorage.getItem('key')
  if (saved) setSavedData(saved)
}, [])

// Clear
localStorage.removeItem('key')
```

### Load on Mount Pattern
```javascript
useEffect(() => {
  // Load saved data
  const saved = localStorage.getItem('incantation')
  if (saved) setIncantation(saved)
}, []) // Empty array = run once
```

## Common Pitfalls

❌ **Saving on every keystroke**
```javascript
useEffect(() => {
  localStorage.setItem('text', text) // Too frequent!
}, [text])
```

✅ **Debounced save**
```javascript
useEffect(() => {
  const id = setTimeout(() => {
    localStorage.setItem('text', text)
  }, 1000)
  return () => clearTimeout(id)
}, [text])
```

## Testing
1. Type in textarea - should see "Saving..." status
2. Stop typing for 1 second - should see "Saved!" 
3. Refresh page - text should persist
4. Clear button - should remove saved data
5. Check browser DevTools > Application > localStorage

## What's Next
Module 8 teaches managing multiple pieces of state together - essential for complex UIs.
