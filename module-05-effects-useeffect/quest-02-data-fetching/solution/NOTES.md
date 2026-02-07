# Quest 2: War Intelligence - Solution Notes

## Overview

Fetch intelligence data from a local JSON file on mount, display with loading/error states, and provide refresh functionality. Demonstrates useEffect for real data fetching patterns.

## Local JSON API Pattern

This quest uses a JSON file in the `public/` folder:

```
public/
  api/
    intelligence.json
```

Vite serves files from `public/` at the root URL, so we can fetch `/api/intelligence.json`.

**Why this approach?**
- Uses real `fetch()` - not mocked data
- Works offline (no external API dependency)
- Students see the actual fetch/response pattern
- Easy to modify the data for testing

## Key Concepts

### Data Fetching on Mount

```javascript
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/intelligence.json')
    const data = await response.json()
    setIntel(data.reports)
  }
  fetchData()
}, []) // Empty array = run once on mount
```

### The Fetch Pattern

```javascript
useEffect(() => {
  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/intelligence.json')
      
      // Always check response.ok!
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setIntel(data.reports)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)  // Always runs, success or error
    }
  }
  
  fetchData()
}, [])
```

**Note**: Can't make useEffect callback itself async. Create async function inside.

### Three-State Pattern

```javascript
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
```

Essential for good UX with async operations:
- `loading`: Show spinner while fetching
- `error`: Show error message if fetch fails
- `data`: Render the actual content

### Conditional Rendering

```javascript
if (loading) return <Loading />
if (error) return <Error />
return <Data />
```

## Common Pitfalls

❌ **Making useEffect async**

```javascript
useEffect(async () => {  // WRONG!
  await fetch(...)
}, [])
```

✅ **Async function inside**

```javascript
useEffect(() => {
  const fetchData = async () => {
    await fetch(...)
  }
  fetchData()
}, [])
```

❌ **Forgetting to check response.ok**

```javascript
const response = await fetch(url)
const data = await response.json()  // Might fail silently!
```

✅ **Always check the response**

```javascript
const response = await fetch(url)
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`)
}
const data = await response.json()
```

## Testing

1. Page loads → should show loading spinner
2. After fetch completes → should display intelligence cards
3. Click refresh → should show loading, then reload data
4. Rename the JSON file → should show error state
5. Check console → no warnings

## Real-World Extensions

- **AbortController**: Cancel fetch on unmount (Quest 3 covers cleanup)
- **Caching**: Store fetched data to avoid refetching
- **Polling**: Refresh data on an interval
- **Optimistic updates**: Update UI before server confirms

## What's Next

Quest 3 teaches effect cleanup and debouncing - essential for preventing memory leaks and excessive operations.
