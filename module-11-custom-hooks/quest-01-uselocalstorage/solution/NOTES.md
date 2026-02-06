# Quest 1: useLocalStorage - Solution Notes

## Overview
Custom hook that syncs state with localStorage. Generic TypeScript type for any data structure. Same API as useState.

## Key Concepts

### Generic Hook Signature
```typescript
function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void]
```

Generic `<T>` makes hook reusable for any type.

### Initialize from localStorage
```typescript
const [storedValue, setStoredValue] = useState<T>(() => {
  const item = window.localStorage.getItem(key)
  return item ? JSON.parse(item) : initialValue
})
```

Lazy initialization reads from localStorage on mount.

### Sync to localStorage on Change
```typescript
const setValue = (value: T | ((prev: T) => T)) => {
  const valueToStore = value instanceof Function ? value(storedValue) : value
  setStoredValue(valueToStore)
  window.localStorage.setItem(key, JSON.stringify(valueToStore))
}
```

Supports both direct values and updater functions like useState.

### Error Handling
Try-catch blocks handle localStorage quota exceeded or JSON parsing errors.

## Real-World Use
- User preferences (theme, language)
- Form data persistence
- Shopping cart
- Recent searches

## Testing
1. Change wizard name/house - refresh page, data persists
2. Level up - refresh, level persists
3. Toggle dark mode - refresh, theme persists
4. Reset clears localStorage

## What's Next
Quest 2 builds useFetch hook for data fetching with loading/error states.
