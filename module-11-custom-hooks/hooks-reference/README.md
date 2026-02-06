# React Hooks Reference - Complete Guide

A comprehensive interactive reference for **all 16 built-in React hooks**. Navigate through each hook in order, with live demos, syntax examples, and practical guidance.

## Quick Start

```bash
cd module-11-custom-hooks/hooks-reference
npm install
npm run dev
```

Open http://localhost:5173 and use the sidebar to navigate through each hook.

---

## Hooks Overview

### State Hooks

| Hook | Purpose | When to Use |
|------|---------|-------------|
| **useState** | Add state to components | Simple values, toggles, form inputs |
| **useReducer** | Complex state logic | Multiple sub-values, state machines, Redux-like patterns |

### Context Hooks

| Hook | Purpose | When to Use |
|------|---------|-------------|
| **useContext** | Access context values | Theme, auth, locale — avoiding prop drilling |

### Ref Hooks

| Hook | Purpose | When to Use |
|------|---------|-------------|
| **useRef** | Mutable ref, DOM access | Focus, scroll, timers, values that don't trigger re-render |
| **useImperativeHandle** | Customize ref exposure | Library components, limited API exposure |

### Effect Hooks

| Hook | Purpose | When to Use |
|------|---------|-------------|
| **useEffect** | Side effects after render | Data fetching, subscriptions, DOM updates |
| **useLayoutEffect** | Sync effects before paint | DOM measurements, preventing flicker |
| **useInsertionEffect** | Insert styles before DOM | CSS-in-JS libraries only |

### Performance Hooks

| Hook | Purpose | When to Use |
|------|---------|-------------|
| **useMemo** | Memoize expensive values | Expensive calculations, stable references |
| **useCallback** | Memoize functions | Callbacks passed to memoized children |
| **useTransition** | Mark updates as non-urgent | Keep UI responsive during heavy updates |
| **useDeferredValue** | Defer value updates | Show stale content while computing new |

### Other Hooks

| Hook | Purpose | When to Use |
|------|---------|-------------|
| **useId** | Generate unique IDs | Accessibility attributes (htmlFor, aria-*) |
| **useSyncExternalStore** | Subscribe to external stores | Redux, browser APIs, custom stores |
| **useDebugValue** | DevTools labels | Shared library hooks |
| **useActionState** | Form action state (React 19) | Form submissions with server actions |

---

## Detailed Reference

### 1. useState

```typescript
const [state, setState] = useState<T>(initialValue)
```

**Returns:** `[currentValue, setterFunction]`

**Key Points:**
- Setter can take value or updater function: `setState(prev => prev + 1)`
- State updates are async and batched
- Never mutate state directly — always use setter
- Creates new reference for objects/arrays to trigger re-render

**Example:**
```tsx
const [count, setCount] = useState(0)
const [user, setUser] = useState<User | null>(null)

// Functional update
setCount(prev => prev + 1)

// Object state
setUser(prev => ({ ...prev, name: 'New Name' }))
```

---

### 2. useReducer

```typescript
const [state, dispatch] = useReducer(reducer, initialState)
```

**Returns:** `[currentState, dispatchFunction]`

**Key Points:**
- Reducer is pure function: `(state, action) => newState`
- Better for complex state with many update patterns
- Actions describe "what happened", reducer decides "how state changes"
- Easier to test than useState

**Example:**
```tsx
type Action = 
  | { type: 'INCREMENT' }
  | { type: 'SET'; payload: number }

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREMENT': return state + 1
    case 'SET': return action.payload
    default: return state
  }
}

const [count, dispatch] = useReducer(reducer, 0)
dispatch({ type: 'INCREMENT' })
```

---

### 3. useContext

```typescript
const value = useContext(SomeContext)
```

**Returns:** Current context value

**Key Points:**
- Must be used within a Provider
- Re-renders when context value changes
- Create custom hooks for type-safe access
- Split contexts to avoid unnecessary re-renders

**Example:**
```tsx
const ThemeContext = createContext<Theme | null>(null)

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('Must be within ThemeProvider')
  return context
}
```

---

### 4. useRef

```typescript
const ref = useRef<T>(initialValue)
```

**Returns:** `{ current: T }` — mutable ref object

**Key Points:**
- `.current` changes don't trigger re-renders
- Persists across renders
- Two uses: DOM access and mutable values
- Common for timers, previous values, DOM elements

**Example:**
```tsx
// DOM reference
const inputRef = useRef<HTMLInputElement>(null)
inputRef.current?.focus()

// Mutable value
const intervalRef = useRef<number | null>(null)
intervalRef.current = setInterval(tick, 1000)
```

---

### 5. useImperativeHandle

```typescript
useImperativeHandle(ref, createHandle, dependencies?)
```

**Key Points:**
- Always used with `forwardRef`
- Exposes limited API instead of full DOM node
- Use sparingly — prefer declarative patterns

**Example:**
```tsx
const Input = forwardRef<InputHandle, Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => { /* custom logic */ }
  }), [])
  
  return <input ref={inputRef} />
})
```

---

### 6. useEffect

```typescript
useEffect(() => {
  // Effect
  return () => { /* Cleanup */ }
}, [dependencies])
```

**Key Points:**
- Runs after render (async, non-blocking)
- Empty deps `[]` = runs once on mount
- Cleanup runs before next effect or unmount
- Don't call hooks inside effects

**Example:**
```tsx
useEffect(() => {
  const controller = new AbortController()
  fetch('/api', { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
  
  return () => controller.abort()
}, [url])
```

---

### 7. useLayoutEffect

```typescript
useLayoutEffect(() => {
  // Sync effect before paint
  return () => { /* Cleanup */ }
}, [dependencies])
```

**Key Points:**
- Same API as useEffect
- Runs synchronously after DOM mutations, before paint
- Use for DOM measurements to prevent flicker
- Blocks painting — keep it fast!

**Example:**
```tsx
useLayoutEffect(() => {
  const rect = element.getBoundingClientRect()
  setPosition({ top: rect.top, left: rect.left })
}, [])
```

---

### 8. useInsertionEffect

```typescript
useInsertionEffect(() => {
  // Inject styles
}, [dependencies])
```

**Key Points:**
- Fires before DOM mutations
- For CSS-in-JS libraries only
- Cannot access refs
- You probably don't need this

---

### 9. useMemo

```typescript
const memoizedValue = useMemo(() => computeValue(a, b), [a, b])
```

**Returns:** Memoized computation result

**Key Points:**
- Only recomputes when dependencies change
- Use for expensive calculations
- Also creates stable references for objects/arrays
- Don't overuse — has its own overhead

**Example:**
```tsx
const sortedList = useMemo(() => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name))
}, [items])
```

---

### 10. useCallback

```typescript
const memoizedFn = useCallback((arg) => { /* ... */ }, [dependencies])
```

**Returns:** Memoized function

**Key Points:**
- Same function reference across renders
- Essential when passing to memoized children
- `useCallback(fn, deps)` = `useMemo(() => fn, deps)`
- Include all values used inside the callback in deps

**Example:**
```tsx
const handleClick = useCallback((id: string) => {
  setSelectedId(id)
}, [])

// Child won't re-render when parent re-renders
<MemoizedChild onClick={handleClick} />
```

---

### 11. useTransition

```typescript
const [isPending, startTransition] = useTransition()
```

**Returns:** `[boolean, (callback) => void]`

**Key Points:**
- Marks state updates as non-urgent
- Keeps UI responsive during expensive renders
- isPending indicates transition in progress
- Transitions can be interrupted

**Example:**
```tsx
const [isPending, startTransition] = useTransition()

function handleChange(e) {
  setInput(e.target.value) // Urgent
  startTransition(() => {
    setFilteredList(expensiveFilter(e.target.value)) // Can wait
  })
}
```

---

### 12. useDeferredValue

```typescript
const deferredValue = useDeferredValue(value)
```

**Returns:** Deferred version of value

**Key Points:**
- Value "lags behind" during rapid updates
- React shows stale UI while computing new
- Alternative to debouncing
- Use when you don't control the state update

**Example:**
```tsx
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query)
  const isStale = query !== deferredQuery
  
  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      <ExpensiveList filter={deferredQuery} />
    </div>
  )
}
```

---

### 13. useId

```typescript
const id = useId()
```

**Returns:** Unique string ID

**Key Points:**
- Stable across server and client
- Use for accessibility attributes
- Don't use for list keys
- Create related IDs with template strings: `` `${id}-label` ``

**Example:**
```tsx
function FormField({ label }) {
  const id = useId()
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-describedby={`${id}-help`} />
      <span id={`${id}-help`}>Help text</span>
    </>
  )
}
```

---

### 14. useSyncExternalStore

```typescript
const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

**Returns:** Current store value

**Key Points:**
- For external state sources (Redux, browser APIs)
- subscribe returns cleanup function
- getSnapshot must return immutable data
- getServerSnapshot for SSR

**Example:**
```tsx
const isOnline = useSyncExternalStore(
  (callback) => {
    window.addEventListener('online', callback)
    window.addEventListener('offline', callback)
    return () => {
      window.removeEventListener('online', callback)
      window.removeEventListener('offline', callback)
    }
  },
  () => navigator.onLine,
  () => true // Server snapshot
)
```

---

### 15. useDebugValue

```typescript
useDebugValue(value, format?)
```

**Key Points:**
- Shows label in React DevTools
- Only for shared library hooks
- Use format function for expensive formatting
- Has no runtime effect — for debugging only

**Example:**
```tsx
function useOnlineStatus() {
  const isOnline = /* ... */
  useDebugValue(isOnline ? 'Online' : 'Offline')
  return isOnline
}
```

---

### 16. useActionState (React 19)

```typescript
const [state, formAction, isPending] = useActionState(action, initialState)
```

**Returns:** `[actionResult, wrappedAction, boolean]`

**Key Points:**
- Manages form submission state
- Automatic pending state
- Works with server actions
- Progressive enhancement ready

**Example:**
```tsx
async function submitForm(prevState, formData) {
  const name = formData.get('name')
  if (!name) return { error: 'Name required' }
  await saveToServer(name)
  return { success: true }
}

function Form() {
  const [state, action, pending] = useActionState(submitForm, null)
  
  return (
    <form action={action}>
      <input name="name" />
      <button disabled={pending}>
        {pending ? 'Saving...' : 'Submit'}
      </button>
      {state?.error && <p>{state.error}</p>}
    </form>
  )
}
```

---

## Decision Guide

### Which State Hook?

| Scenario | Use |
|----------|-----|
| Simple value (number, string, boolean) | useState |
| Toggle, counter | useState |
| Form with few fields | useState |
| Complex object with many update patterns | useReducer |
| State machine logic | useReducer |
| Need predictable state transitions | useReducer |

### Which Effect Hook?

| Scenario | Use |
|----------|-----|
| Data fetching | useEffect |
| Subscriptions | useEffect |
| DOM measurements (avoiding flicker) | useLayoutEffect |
| Tooltip/popover positioning | useLayoutEffect |
| CSS injection (library authors) | useInsertionEffect |
| Default choice | useEffect |

### When to Optimize?

| Scenario | Use |
|----------|-----|
| Expensive calculation | useMemo |
| Callback to memoized child | useCallback |
| Keep typing responsive | useTransition or useDeferredValue |
| You control the state | useTransition |
| You receive the value | useDeferredValue |

---

## Resources

- [React Docs: Hooks Reference](https://react.dev/reference/react/hooks)
- [React 19 Release Notes](https://react.dev/blog/2024/04/25/react-19)

---

*"May your hooks be well-memoized and your effects properly cleaned up."* — Academy Wisdom
