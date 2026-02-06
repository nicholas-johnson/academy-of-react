# Quest 2: War Intelligence - Solution Notes

## Overview
Fetch intelligence data on mount, display with loading/error states, and provide refresh functionality. Demonstrates useEffect for data fetching patterns.

## Key Concepts

### Data Fetching on Mount
```javascript
useEffect(() => {
  fetchData()
}, []) // Empty array = run once on mount
```

### Async in useEffect
```javascript
useEffect(() => {
  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await fetch(url)
      setData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [])
```

Note: Can't make useEffect callback itself async. Create async function inside.

### Three-State Pattern
```javascript
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
```

Essential for good UX with async operations.

### Conditional Rendering
```javascript
if (loading) return <Loading />
if (error) return <Error />
return <Data />
```

## Common Pitfalls

❌ **Making useEffect async**
```javascript
useEffect(async () => {  // Wrong!
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

## Testing
1. Page loads - should show loading spinner
2. After 1 second - should display intelligence cards
3. Click refresh - should reload
4. Check console - no warnings

## What's Next
Quest 3 teaches debouncing with useEffect - preventing excessive operations.
