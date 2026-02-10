# Quest 3: useDebounce - Solution Notes

## Overview

Generic debounce hook that delays value updates. Perfect for search inputs, auto-save, window resize handlers. Drastically reduces API calls.

## Key Concepts

### Generic Debounce Hook

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

Generic `<T>` works with strings, numbers, objects, arrays.

### How It Works

1. User types - `value` changes instantly
2. useEffect sets timeout
3. If user types again before timeout - cleanup clears old timeout
4. After delay without changes - `debouncedValue` updates

### Cleanup Function Critical

```typescript
return () => clearTimeout(handler);
```

Prevents memory leaks and stale updates.

### Usage Pattern

```typescript
const [searchTerm, setSearchTerm] = useState("");
const debouncedSearch = useDebounce(searchTerm, 500);

// Optimize filtering with useMemo
const filteredSpells = useMemo(() => {
  return SPELLS.filter(
    (spell) =>
      spell.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      spell.type.toLowerCase().includes(debouncedSearch.toLowerCase())
  );
}, [debouncedSearch]);
```

API only called after user stops typing for 500ms. Filtering only runs when debouncedSearch changes.

## Performance Optimization

Combining `useDebounce` with `useMemo`:
- `useDebounce` reduces when filtering happens
- `useMemo` ensures filtering only runs when necessary
- Component can re-render without re-filtering
- Check console to see when "Filtering spells" logs

## Real-World Use Cases

- Search autocomplete
- Form auto-save
- Window resize handlers
- Scroll position tracking
- API rate limiting

## Testing

1. Type quickly - "Typing" updates instantly
2. "Searching for" updates after 500ms pause
3. API Calls counter shows reduced requests
4. Results filter based on debounced value

## What's Next

Module 8 covers useMemo in detail. This quest demonstrates combining custom hooks with built-in performance hooks for optimal results.
