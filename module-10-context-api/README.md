# Module 10: The Context API

So far, every piece of data in your React apps has travelled the same way: down through props. Parent passes to child, child passes to grandchild, and so on. This works beautifully for small component trees, but as your apps grow, you'll hit a frustrating pattern where data has to pass through components that don't even use it — just to reach a deeply nested component that does.

This module introduces the Context API, React's built-in solution for sharing state across your component tree without threading props through every level. By the end, you'll be able to create global state that any component can access directly, no matter how deeply nested it is.

## The Prop Drilling Problem

Imagine you have a theme setting (light or dark mode) that lives at the top of your app. A toggle button to switch it lives five levels deep. With props alone, every component in between has to accept and forward `theme` and `setTheme` — even if those components have nothing to do with theming:

```jsx
function App() {
  const [theme, setTheme] = useState('light')
  return <Layout theme={theme} setTheme={setTheme} />
}

function Layout({ theme, setTheme }) {
  return <Sidebar theme={theme} setTheme={setTheme} />
}

function Sidebar({ theme, setTheme }) {
  return <ThemeToggle theme={theme} setTheme={setTheme} />
}

function ThemeToggle({ theme, setTheme }) {
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
```

`Layout` and `Sidebar` don't care about the theme — they're just passing it along. This is called **prop drilling**, and it creates several problems:

- Adding or removing a prop means updating every component in the chain
- Intermediate components get cluttered with props they don't use
- Refactoring becomes painful because the data flow is rigidly tied to the component structure

Context solves this by letting you "broadcast" data to any component in the tree, skipping the intermediaries entirely.

## Creating a Context

The Context API has three parts: creating the context, providing a value, and consuming it. Let's walk through each.

First, you create a context using `createContext`:

```jsx
import { createContext } from 'react'

const ThemeContext = createContext(undefined)
```

That's it. `ThemeContext` is now a communication channel. It doesn't hold any data yet — it's just the channel itself. Think of it like creating a radio frequency: someone still needs to broadcast on it, and someone else needs to tune in.

The argument to `createContext` is a default value, used only when a component tries to read the context but there's no Provider above it in the tree. We'll pass `undefined` here and handle that case explicitly later.

## Providing a Value

To broadcast data on your context, you wrap part of your component tree in a Provider:

```jsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const value = { theme, toggleTheme }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
```

The Provider is a component that wraps its children and makes the `value` prop available to any descendant. The state lives inside the Provider — it's a normal component with `useState`, just like you've been writing. The difference is that instead of passing state down through props, you're placing it on the context channel.

Any component inside `<ThemeProvider>` can now access `theme` and `toggleTheme` directly.

## Consuming Context with useContext

To read from a context, use the `useContext` hook:

```jsx
import { useContext } from 'react'

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
    </button>
  )
}
```

No props. No drilling. `ThemeToggle` reaches directly into the context and grabs what it needs. When `theme` changes in the Provider, every component that calls `useContext(ThemeContext)` re-renders automatically with the new value.

## The Custom Hook Pattern

In practice, you'll almost always wrap `useContext` in a custom hook. This gives you two benefits: a cleaner API and an error message if someone forgets to add the Provider.

```jsx
function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
```

Now consumers just call `useTheme()` instead of `useContext(ThemeContext)`. They don't need to know about the context object at all, and if they accidentally use it outside a Provider, they get a clear error instead of mysterious `undefined` values.

This three-part recipe — **create the context, build a Provider, export a custom hook** — is the standard pattern you'll use every time.

## Putting It All Together

Here's a complete example. Notice how the consuming components have no idea that context exists — they just call a hook:

```jsx
import { createContext, useContext, useState } from 'react'

// 1. Create
const CounterContext = createContext(undefined)

// 2. Provide
export function CounterProvider({ children }) {
  const [count, setCount] = useState(0)
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  )
}

// 3. Consume (via custom hook)
export function useCounter() {
  const context = useContext(CounterContext)
  if (!context) throw new Error('useCounter must be used within CounterProvider')
  return context
}
```

Using it in your app:

```jsx
function App() {
  return (
    <CounterProvider>
      <CounterDisplay />
      <CounterButtons />
    </CounterProvider>
  )
}

function CounterDisplay() {
  const { count } = useCounter()
  return <p>Count: {count}</p>
}

function CounterButtons() {
  const { increment, decrement } = useCounter()
  return (
    <div>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  )
}
```

`CounterDisplay` and `CounterButtons` are siblings — they share state through context without their parent needing to know or care.

## Multiple Contexts

You're not limited to one context. In fact, it's better to have several focused contexts than one giant one. Each context should manage a single concern:

```jsx
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <MyApp />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
```

Any component inside can pull from whichever contexts it needs:

```jsx
function Header() {
  const { theme } = useTheme()
  const { user } = useAuth()
  const { t } = useLanguage()

  return <h1 className={theme}>{t('welcome')}, {user.name}</h1>
}
```

Keeping contexts separate means that a theme change doesn't re-render components that only care about auth, and vice versa.

## When to Use Context

Context is a great fit for:

- **Theme** (light/dark mode)
- **Authentication** (current user, login/logout)
- **Language/locale** preferences
- **UI state** that many components need (sidebar open/closed, toast notifications)

Context is *not* ideal for:

- **Rapidly changing values** (mouse position, scroll offset) — too many re-renders
- **Complex state with many actions** — consider a state management library instead
- **State used by only one or two components** — just use props, it's simpler

The rule of thumb: if you find yourself drilling a prop through three or more levels and the intermediate components don't use it, context is probably the right call.

## Context with useReducer

For more complex state, you can combine context with `useReducer`. This keeps your Provider clean when you have many actions:

```jsx
function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  const addItem = (item) => dispatch({ type: 'ADD', item })
  const removeItem = (id) => dispatch({ type: 'REMOVE', id })

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  )
}
```

Consumers still get a simple API — `addItem(item)` — without needing to know about dispatching or reducers.

## Common Mistakes

**Forgetting the Provider.** If a component calls `useContext` but there's no Provider above it in the tree, it gets the default value (usually `undefined`). This is why the custom hook pattern with an error throw is so valuable — it catches this immediately.

**Creating a new object every render.** If your Provider re-renders and creates a new `value` object each time, all consumers re-render too — even if the actual data hasn't changed. For performance-sensitive cases, memoize the value:

```jsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light')
  }), [theme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
```

**Putting everything in one context.** If your context holds theme, auth, language, cart, and notifications all in one object, changing *any* of them re-renders *every* consumer. Split into focused, single-purpose contexts.

**Using context when props would do.** If a child component is one or two levels down and directly related to its parent, props are simpler and more explicit. Context shines for deeply nested or widely shared state — don't reach for it prematurely.

## Exercises

Three quests put these patterns into practice:

**Quest 1: Theme Switcher** — Build a ThemeContext that toggles light/dark mode across the app and persists the choice to localStorage. You'll use the full create-provide-consume pattern with a custom `useTheme` hook.

[Start Quest 1 →](./quest-01-theme-context/)

**Quest 2: Language Context** — Create an i18n system with translations for Common, Elvish, and Draconic. A `useLanguage` hook provides a `t(key)` function that components use instead of hardcoded strings.

[Start Quest 2 →](./quest-02-language-context/)

**Quest 3: User Session** — Build an AuthContext with login/logout functionality. The app conditionally renders either a login form or a protected dashboard based on authentication state.

[Start Quest 3 →](./quest-03-context-patterns/)

## Running the Code

The demo shows a shared counter using context — two sibling components reading and updating the same state without any prop drilling:

```bash
cd demo
npm install
npm run dev
```

Slides cover the concepts from this tutorial with visual diagrams:

```bash
cd slides
npm install
npm run dev
```

---

[← Module 9: Custom Hooks](../module-09-custom-hooks/) | [Module 11: React Router →](../module-11-react-router/)
