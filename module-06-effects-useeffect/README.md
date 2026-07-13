# Module 6: Side Effects with useEffect

React components have one job: take data (props and state) and return JSX describing what should appear on screen. They're meant to be pure — given the same inputs, they produce the same output, with no reaching out to the wider world.

But real applications *need* to reach out. They fetch data from servers, start timers, listen for window resizes, save to localStorage, and update the document title. These are all **side effects** — things that happen outside React's rendering system. The `useEffect` hook is React's designated place for this kind of code.

By the end of this module, you'll know how to run effects at the right time, control when they re-run, and clean them up properly to avoid memory leaks.

## The Basic Shape

`useEffect` takes a function that contains your side effect code. React runs this function *after* the component renders:

```jsx
import { useEffect } from 'react'

function MyComponent() {
  useEffect(() => {
    document.title = 'Hello from React!'
  })

  return <div>Hello</div>
}
```

After React puts the `<div>` on screen, it calls your effect function. The rendering isn't blocked — effects run *after* the browser has painted, so they don't slow down the UI.

## Controlling When Effects Run

Without any further configuration, your effect runs after *every* render. That's usually too often. The second argument to `useEffect` — the **dependency array** — gives you control:

**No array** — runs after every render:
```jsx
useEffect(() => {
  console.log('I run after every single render')
})
```

**Empty array `[]`** — runs once, when the component first appears:
```jsx
useEffect(() => {
  console.log('I run once on mount')
}, [])
```

**Array with values `[a, b]`** — runs when any listed value changes:
```jsx
useEffect(() => {
  console.log(`Query changed to: ${query}`)
}, [query])
```

The empty array is by far the most common pattern — it's how you run setup code once when a component mounts. The dependency array with values is for effects that need to react to changes.

## Fetching Data

The most common use of `useEffect` is loading data when a component appears. Here's the pattern you'll use constantly:

```jsx
function SpellList() {
  const [spells, setSpells] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/spells')
      .then(res => res.json())
      .then(data => setSpells(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error}</p>
  return <ul>{spells.map(s => <li key={s.id}>{s.name}</li>)}</ul>
}
```

Three pieces of state — `data`, `loading`, and `error` — cover all the situations your UI needs to handle. Start with `loading: true`, set it to `false` in `.finally()` regardless of success or failure, and conditionally render based on which state is active.

### Async Functions in Effects

You can't make the effect callback itself `async` (React doesn't expect it to return a Promise). Instead, define an async function inside and call it immediately:

```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch('/api/spells')
      const data = await res.json()
      setSpells(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [])
```

### Re-fetching When Something Changes

If your fetch depends on a prop or state value, include it in the dependency array. The effect will re-run whenever that value changes:

```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(data => setResults(data))
  }, [query])

  return <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>
}
```

Every time `query` changes, the effect fires again with the new value.

## Cleanup Functions

Some effects set things up that need to be torn down later. A timer keeps ticking. An event listener keeps listening. If the component unmounts (or the effect re-runs), you need to clean up the previous setup.

You do this by returning a function from your effect:

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    setSeconds(s => s + 1)
  }, 1000)

  return () => clearInterval(timer)
}, [])
```

React calls your cleanup function in two situations:
1. Before re-running the effect (if dependencies changed)
2. When the component unmounts

This prevents memory leaks. Without the cleanup, that interval would keep running forever — even after the component is gone.

### A Countdown Timer

Here's a practical example — a countdown that cleans up properly:

```jsx
function Countdown({ seconds }) {
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(r => r - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return <p>{remaining} seconds left</p>
}
```

When `Countdown` unmounts (say the user navigates away), `clearInterval` fires and the timer stops cleanly.

### Event Listeners

The same pattern works for window or document events:

```jsx
useEffect(() => {
  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])
```

Add the listener on mount, remove it on unmount. Always clean up global listeners — they survive longer than your component does.

## Syncing with localStorage

Effects are perfect for keeping external storage in sync with your state:

```jsx
function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    Toggle Theme
  </button>
}
```

The state initializes *from* localStorage (using a lazy initializer), and the effect syncs *to* localStorage whenever the theme changes. This two-way sync is a pattern you'll use often enough that Module 9 shows you how to extract it into a custom hook.

## Common Mistakes

**The infinite loop.** If your effect updates state without a dependency array, it triggers a re-render, which runs the effect again, which updates state again... forever:

```jsx
// BAD — infinite loop!
useEffect(() => {
  setCount(count + 1)
})
```

Always include a dependency array. If you genuinely want the effect to run once, use `[]`.

**Missing dependencies.** If your effect uses a value from props or state but doesn't list it in the dependency array, the effect won't re-run when that value changes. Your UI gets stale:

```jsx
// BAD — won't refetch when id changes
useEffect(() => {
  fetch(`/api/spells/${id}`)
    .then(res => res.json())
    .then(setSpell)
}, [])  // id is missing!

// GOOD
useEffect(() => {
  fetch(`/api/spells/${id}`)
    .then(res => res.json())
    .then(setSpell)
}, [id])
```

The ESLint `react-hooks/exhaustive-deps` rule catches this automatically — trust it.

**Forgetting cleanup.** Every `setInterval`, `setTimeout`, `addEventListener`, or subscription needs a corresponding cleanup. If you find yourself seeing "Can't perform a React state update on an unmounted component" warnings, you've forgotten a cleanup somewhere.

**Making the callback async.** This doesn't work:

```jsx
// BAD — useEffect doesn't expect a Promise
useEffect(async () => {
  const data = await fetch(url)
}, [])
```

Define the async function inside and call it, as shown earlier.

## Exercises

Two quests to practice these patterns:

**Quest 1: War Intelligence** — Fetch data from an API on mount. Display the results as cards with proper loading and error states, plus a refresh button to re-fetch.

[Start Quest 1 →](./quest-01-data-fetching/)

**Quest 2: Meditation Timer** — Build a countdown timer with start, stop, and reset controls. Use `setInterval` with proper cleanup to prevent memory leaks.

[Start Quest 2 →](./quest-02-timers-intervals/)

## Running the Code

The demo shows three effects in action — document title updates, a live clock, and data fetching:

```bash
cd demo
npm install
npm run dev
```

Slides cover the concepts with visual comparisons of dependency array behaviour:

```bash
cd slides
npm install
npm run dev
```

---

[← Module 5: Styling in React](../module-05-styling/) | [Module 7: The Children Prop →](../module-07-children-prop/)
