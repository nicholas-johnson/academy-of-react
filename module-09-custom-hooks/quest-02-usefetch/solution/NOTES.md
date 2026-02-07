# Quest 2: useFetch - Solution Notes

## Overview

Reusable data fetching hook with loading, error, and data states. Generic TypeScript for any response type. Includes refetch functionality.

## Key Concepts

### Generic Fetch Hook

```typescript
function useFetch<T>(url: string): FetchState<T> & { refetch: () => void };
```

Generic `<T>` allows type-safe responses for any API shape.

### Three-State Pattern

```typescript
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}
```

Standard pattern for async operations.

### Refetch Trigger

```typescript
const [refetchTrigger, setRefetchTrigger] = useState(0);
const refetch = () => setRefetchTrigger((prev) => prev + 1);

useEffect(() => {
  fetchData();
}, [url, refetchTrigger]);
```

Increment counter to trigger useEffect without changing dependencies.

### Error Handling

```typescript
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  // ...
} catch (e) {
  setError(e as Error);
}
```

Check response.ok and catch network/parsing errors.

## Real-World Extensions

- Abort controller for cleanup
- Request options (method, headers, body)
- Caching responses
- Retry logic

## Testing

1. Page loads - shows loading spinner
2. Data loads - displays spell cards
3. Click refetch - reloads data
4. If API fails - shows error and fallback

## What's Next

Quest 3 implements useDebounce for input optimization.
