# Module 8: Built-in React Hooks

React ships with about fifteen built-in hooks. You've already met `useState` and `useEffect` — this module introduces the rest, giving you the complete toolkit. You won't use all of them regularly (most apps lean heavily on five or six), but understanding what's available helps you pick the right tool when a problem arises.

This tutorial groups hooks by purpose, starting with the ones you'll reach for most often and working towards the more specialised ones.

## How Hooks Work Under the Hood

Before diving in, it's worth understanding a key implementation detail that explains React's most important rule about hooks.

When your component renders, React creates a "Fiber node" for it. Each hook call stores its data in a linked list attached to that Fiber — the first hook call goes in the first slot, the second hook call in the second slot, and so on:

```jsx
function Counter() {
  const [count, setCount] = useState(0)    // Slot 1
  const [name, setName] = useState('')     // Slot 2
  const ref = useRef(null)                 // Slot 3
}
```

React identifies hooks by their *position*, not by any name or key. This is why you can never call hooks inside conditions or loops — if a hook is skipped on some renders, every subsequent hook reads from the wrong slot and state gets corrupted.

The rule is simple: **call all hooks at the top level of your component, in the same order every render.** Put conditions *inside* your hooks, not around them.

## State Hooks

### useState

You know this one — it declares a piece of state and returns a setter:

```jsx
const [count, setCount] = useState(0)
const [user, setUser] = useState({ name: '', level: 1 })
```

Two patterns worth highlighting. First, **functional updates** when new state depends on old state:

```jsx
setCount(prev => prev + 1)
setItems(prev => [...prev, newItem])
```

Second, **lazy initialisation** when the initial value is expensive to compute:

```jsx
const [data, setData] = useState(() => parseHugeJSON(raw))
```

The function runs only on the first render.

### useReducer

When state logic gets complex — multiple related values, several action types, or state transitions that depend on each other — `useReducer` provides more structure:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'decrement': return { count: state.count - 1 }
    case 'reset':     return { count: 0 }
    default:          return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  )
}
```

The reducer is a pure function: `(currentState, action) => newState`. Actions describe *what happened* ("the user clicked increment"), and the reducer decides how state changes in response. This makes complex state transitions predictable and testable.

**When to choose which:** Use `useState` for simple, independent values. Use `useReducer` when you have multiple related state values, complex update logic, or when the next state depends on the previous one in non-trivial ways.

## Ref Hooks

### useRef

A ref is a mutable container that persists across renders without triggering re-renders when changed. It has two main uses:

**Accessing DOM elements:**

```jsx
function AutoFocusInput() {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return <input ref={inputRef} placeholder="I focus automatically" />
}
```

**Storing mutable values that shouldn't trigger re-renders:**

```jsx
function StopWatch() {
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef(null)

  const start = () => {
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
  }

  const stop = () => clearInterval(intervalRef.current)

  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}
```

The interval ID is stored in a ref because we need to access it in the `stop` function, but changing it shouldn't re-render the component.

### useImperativeHandle

Rarely needed, but useful when building component libraries. It customises what a parent component sees when it attaches a ref to your component:

```jsx
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = '' }
  }))

  return <input ref={inputRef} {...props} />
})
```

The parent gets a ref with only `focus()` and `clear()` — not the raw DOM node. This lets you control and limit the API you expose.

## Performance Hooks

### useMemo

Caches the result of an expensive calculation so it's not recomputed on every render:

```jsx
const sortedList = useMemo(() => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name))
}, [items])
```

The sorted list only recalculates when `items` changes. If the component re-renders for other reasons (a parent's state changed, for example), the cached value is returned instantly.

Don't overuse this — simple arithmetic or string concatenation doesn't need memoisation. Reserve it for genuinely expensive operations like sorting large arrays, complex filtering, or creating objects that would otherwise trigger unnecessary child re-renders.

### useCallback

Same idea, but for functions. Returns a stable function reference that only changes when its dependencies change:

```jsx
const handleSubmit = useCallback((data) => {
  submitForm(userId, data)
}, [userId])
```

This matters when passing callbacks to child components wrapped in `React.memo` — a new function reference every render defeats the memo. Without that situation, `useCallback` adds complexity for no benefit.

### useTransition

Marks a state update as non-urgent, keeping the UI responsive during heavy work:

```jsx
const [isPending, startTransition] = useTransition()

function handleSearch(query) {
  setQuery(query)  // Urgent: update input immediately

  startTransition(() => {
    setFilteredResults(filterLargeList(query))  // Non-urgent: can wait
  })
}
```

React will interrupt the filtering work if the user types again, keeping the input responsive. `isPending` tells you whether the transition is still in progress, letting you show a loading indicator.

### useDeferredValue

A simpler alternative when you can't easily wrap the update in `startTransition`. It returns a "stale" version of a value that lags behind:

```jsx
const deferredQuery = useDeferredValue(query)

const results = useMemo(() => {
  return items.filter(i => i.name.includes(deferredQuery))
}, [deferredQuery, items])
```

The input updates immediately with `query`, while the expensive filter uses `deferredQuery` which catches up when React has idle time.

## Effect Hooks

### useEffect

Runs side effects after render — covered in depth in Module 6. Quick recap:

```jsx
useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)  // Cleanup
}, [])  // Empty array = run once on mount
```

### useLayoutEffect

Identical API to `useEffect`, but runs *synchronously* after DOM mutations and *before* the browser paints. Use it when you need to measure DOM elements or adjust layout to prevent visual flicker:

```jsx
useLayoutEffect(() => {
  const rect = tooltipRef.current.getBoundingClientRect()
  setPosition({ x: rect.left, y: rect.top })
}, [])
```

Prefer `useEffect` by default — `useLayoutEffect` blocks painting and can hurt performance if overused.

## Other Hooks

### useContext

Reads from a React Context — covered in depth in Module 10:

```jsx
const theme = useContext(ThemeContext)
```

### useId

Generates a unique, stable ID that's consistent between server and client rendering. Essential for accessible forms:

```jsx
function FormField({ label }) {
  const id = useId()
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  )
}
```

### useSyncExternalStore

For subscribing to external data sources (non-React state). Primarily used by library authors:

```jsx
const isOnline = useSyncExternalStore(
  (callback) => {
    window.addEventListener('online', callback)
    window.addEventListener('offline', callback)
    return () => {
      window.removeEventListener('online', callback)
      window.removeEventListener('offline', callback)
    }
  },
  () => navigator.onLine
)
```

### useDebugValue

Adds a label to custom hooks in React DevTools:

```jsx
function useOnlineStatus() {
  const isOnline = /* ... */
  useDebugValue(isOnline ? 'Online' : 'Offline')
  return isOnline
}
```

### useInsertionEffect

For CSS-in-JS libraries to inject styles before any DOM mutations. You'll almost certainly never call this directly — it exists for library internals.

## Common Mistakes

**Putting hooks inside conditions.** This breaks React's positional tracking:

```jsx
// BAD
if (loggedIn) {
  const [name, setName] = useState('')
}
```

Instead, always call the hook and put conditions inside:

```jsx
const [name, setName] = useState('')
useEffect(() => {
  if (loggedIn) setName(user.name)
}, [loggedIn])
```

**Overusing useMemo and useCallback.** Memoisation has a cost — the comparison itself takes time and memory. Only memoize when you've identified an actual performance problem or when preventing re-renders of expensive child components.

**Confusing useRef with useState.** Ref changes don't trigger re-renders. If your UI should update when a value changes, use state. If the value is "behind the scenes" (timer IDs, previous values, render counts), use a ref.

## Exercises

The quests focus on the hooks that benefit most from hands-on practice:

**Quests 1-3: useRef** — Focus management, tracking values without re-renders, and building media player controls.

**Quest 4: useReducer** — Manage a complex spell inventory with multiple action types.

[Browse all quests →](./quest-01-usestate/)

## Running the Code

The demo showcases eight hooks with interactive examples:

```bash
cd demo
npm install
npm run dev
```

Slides cover hook internals (Fiber linked lists, algebraic effects) and comparisons:

```bash
cd slides
npm install
npm run dev
```

---

[← Module 7: The Children Prop](../module-07-children-prop/) | [Module 9: Custom Hooks →](../module-09-custom-hooks/)
