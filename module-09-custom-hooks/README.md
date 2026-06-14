# Module 9: Custom Hooks

At some point, you'll notice a pattern in your React code: the same combination of `useState` and `useEffect` appearing in multiple components. Maybe two different pages both fetch data from an API. Maybe three components all sync something to localStorage. The logic is identical — only the specific values differ.

Custom hooks let you extract that repeated logic into a reusable function. It's one of the most elegant ideas in React: since hooks are just function calls, you can pull them out into your own functions and call them from any component. This module teaches you how to spot opportunities for extraction, write clean custom hooks, and compose them together.

## What Makes a Custom Hook?

A custom hook is a JavaScript function whose name starts with `use` and that calls other hooks inside it. That's genuinely it. There's no special API, no registration, no magic — just a naming convention and the fact that it uses React hooks internally.

Here's the simplest possible custom hook:

```jsx
import { useState } from 'react'

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  const toggle = () => setValue(v => !v)
  return [value, toggle]
}
```

And using it:

```jsx
function App() {
  const [isOpen, toggleOpen] = useToggle(false)
  const [isDark, toggleDark] = useToggle(true)

  return (
    <div>
      <button onClick={toggleOpen}>{isOpen ? 'Close' : 'Open'}</button>
      <button onClick={toggleDark}>{isDark ? 'Light Mode' : 'Dark Mode'}</button>
    </div>
  )
}
```

Each call to `useToggle` creates its own independent state — just like calling `useState` multiple times. The hook encapsulates the "boolean that flips" logic so you never have to write it out again.

## Why Bother?

Consider a component that fetches data from an API:

```jsx
function SpellList() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/spells')
      .then(r => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return <ul>{data.map(s => <li key={s.id}>{s.name}</li>)}</ul>
}
```

Now imagine `StudentList`, `PotionList`, and `BattleHistory` all doing the same dance — three state variables, a useEffect with fetch, and the same loading/error pattern. That's a custom hook waiting to happen.

## Building useFetch

Let's extract that pattern:

```jsx
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const json = await response.json()
        setData(json)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { data, loading, error }
}
```

Now any component can fetch data in one line:

```jsx
function SpellList() {
  const { data, loading, error } = useFetch('/api/spells')

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return <ul>{data.map(s => <li key={s.id}>{s.name}</li>)}</ul>
}
```

The component focuses purely on *rendering*. The fetching logic lives in the hook, tested and maintained in one place.

## Building useLocalStorage

Another common need: state that survives page refreshes. This hook wraps `useState` so it reads from and writes to localStorage automatically:

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
```

The lazy initializer (`() => { ... }` passed to useState) only runs on first render, reading from localStorage. The effect syncs changes back whenever the value updates. The API is identical to `useState` — consumers don't need to know that persistence is happening:

```jsx
const [theme, setTheme] = useLocalStorage('theme', 'light')
const [user, setUser] = useLocalStorage('user', null)
```

## Building useDebounce

When users type in a search box, you don't want to fire an API call on every keystroke. Debouncing waits until the user stops typing for a specified delay, then updates:

```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
```

The cleanup function is the key: every time `value` changes, the previous timer gets cleared and a new one starts. Only when `value` stops changing for `delay` milliseconds does the debounced value actually update:

```jsx
function SearchPage() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const { data } = useFetch(
    debouncedQuery ? `/api/search?q=${debouncedQuery}` : null
  )

  return <input value={query} onChange={e => setQuery(e.target.value)} />
}
```

## Composing Hooks Together

Custom hooks can call other custom hooks. This is where things get powerful — you build small, focused hooks and compose them into higher-level abstractions:

```jsx
function useSearchWithDebounce(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery)
  const debouncedQuery = useDebounce(query, 300)
  const { data, loading } = useFetch(
    debouncedQuery ? `/api/search?q=${debouncedQuery}` : null
  )

  return { query, setQuery, results: data, isSearching: loading }
}
```

Three hooks composed into one clean interface. The component using this doesn't need to know about debouncing or fetching mechanics — it just gets `query`, `setQuery`, `results`, and `isSearching`.

## Return Patterns

You'll notice two return patterns in these examples:

**Array return** — best when the hook returns a value and a setter, like `useState`. Lets consumers choose their own names:

```jsx
const [isOpen, toggleOpen] = useToggle()
const [name, setName] = useLocalStorage('name', '')
```

**Object return** — best when the hook returns multiple related values. Names are fixed but self-documenting:

```jsx
const { count, increment, decrement, reset } = useCounter(0)
const { data, loading, error } = useFetch('/api/spells')
```

Use arrays for simple value-setter pairs, objects for richer interfaces with many properties.

## When to Extract a Hook

Not everything needs to be a custom hook. Here are good signals that it's time to extract:

- The same useState + useEffect combo appears in two or more components
- A component is getting hard to read because logic and rendering are tangled
- You want to test stateful logic independently of any UI
- You see a clear concept ("fetching", "debouncing", "window tracking") that could be named

Don't extract prematurely. If the logic only exists in one component and the component is still readable, leave it inline. You can always extract later.

## The Rules

Custom hooks follow the same rules as built-in hooks:

1. **Name starts with "use"** — this tells React (and the linter) it's a hook
2. **Call hooks at the top level** — never inside loops, conditions, or nested functions
3. **Only call from React functions** — either components or other custom hooks

## Hook Libraries

Once you're comfortable writing your own hooks, you'll appreciate knowing that excellent libraries already exist for common needs:

- **React Query / TanStack Query** — data fetching with caching, background refresh, and pagination
- **React Hook Form** — performant forms with minimal re-renders
- **react-use** — a collection of 100+ utility hooks
- **usehooks-ts** — TypeScript-first hook recipes

These libraries are worth studying even if you use them directly — they're masterclasses in hook design.

## Common Mistakes

**Forgetting cleanup.** If your hook sets up a timer, event listener, or subscription, it needs a cleanup function. Without it, you'll get memory leaks and "can't update state on unmounted component" warnings.

**Not including dependencies.** If your hook reads a prop or state value inside `useEffect`, that value belongs in the dependency array. The ESLint `react-hooks/exhaustive-deps` rule will catch this — trust it.

**Breaking the rules of hooks.** Calling `useState` or `useEffect` inside a condition within your custom hook will cause bugs. The hooks must always execute in the same order on every render.

**Extracting too early.** If you extract a hook that's only used once and the component was already clear, you've just moved code to another file for no benefit. Wait until you actually need the reuse.

## Exercises

Three quests, each building a practical custom hook from scratch:

**Quest 1: useLocalStorage** — Build a hook that syncs state with localStorage, supporting the same API as useState. Use it to persist a wizard profile across page refreshes.

[Start Quest 1 →](./quest-01-uselocalstorage/)

**Quest 2: useFetch** — Create a data-fetching hook with loading and error states, plus a manual refetch function. Use it to load spell data from an API.

[Start Quest 2 →](./quest-02-usefetch/)

**Quest 3: useDebounce** — Build a debouncing hook that delays value updates. Use it to optimise a search input so it doesn't fire on every keystroke.

[Start Quest 3 →](./quest-03-usedebounce/)

## Running the Code

The demo showcases three custom hooks in action — `useWindowSize`, `useToggle`, and `useCounter`:

```bash
cd demo
npm install
npm run dev
```

Slides walk through the concepts with visual comparisons:

```bash
cd slides
npm install
npm run dev
```

---

[← Module 8: Built-in Hooks](../module-08-built-in-hooks/) | [Module 10: Context API →](../module-10-context-api/)
