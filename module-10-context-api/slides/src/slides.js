export const slides = [
  {
    type: "title",
    content: {
      title: "Context API",
      subtitle: "Module 10: Global State Without Prop Drilling",
      icon: "globe",
    },
  },
  {
    type: "standard",
    content: {
      title: "The Prop Drilling Problem",
      icon: "frown",
      points: [
        "Props must pass through every component in the tree",
        "Intermediate components don't need the data",
        "Changes require updating multiple components",
        "Makes refactoring difficult",
        "Code becomes hard to maintain",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Prop Drilling Example",
      code: `// Without Context - props pass through every level
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
  // Finally use it here!
  return <button onClick={() => setTheme(/*...*/)}>
    {theme}
  </button>
}`,
      highlights: [
        "Props travel through Layout → Sidebar → ThemeToggle",
        "Layout and Sidebar don't use theme - just pass it",
        "Adding new props means updating every component",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Creating Context",
      code: `import { createContext } from 'react'

// 1. Create the context
const ThemeContext = createContext(undefined)

// The default value is used when there's no Provider above
// Usually undefined, then we check in our hook

// Context is just a "communication channel"
// - Provider: sends data down
// - useContext: receives data`,
      highlights: [
        "createContext() creates a new context",
        "Default value used when no Provider exists",
        "Think of it as a broadcast channel",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Creating a Provider",
      code: `function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // Package up the value to share
  const value = { theme, toggleTheme }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}`,
      highlights: [
        "Provider wraps children components",
        "value prop contains shared state",
        "All descendants can access this value",
        "State changes trigger re-renders in consumers",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Consuming Context",
      code: `import { useContext } from 'react'

function ThemeToggle() {
  // Access context value directly!
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  )
}

// No props needed - data comes from context`,
      highlights: [
        "useContext reads from nearest Provider",
        "Component re-renders when context value changes",
        "No props passed through intermediate components!",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Custom Hook Pattern",
      code: `// Always wrap useContext in a custom hook!
function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error(
      'useTheme must be used within a ThemeProvider'
    )
  }

  return context
}

// Usage - cleaner and safer
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  // ...
}`,
      highlights: [
        "Custom hook provides better error messages",
        "Catches missing Provider immediately",
        "Cleaner API for consumers",
        "Hides implementation details",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Complete Pattern",
      code: `// 1. Create context
const CounterContext = createContext(undefined)

// 2. Create provider
function CounterProvider({ children }) {
  const [count, setCount] = useState(0)
  const increment = () => setCount(c => c + 1)

  return (
    <CounterContext.Provider value={{ count, increment }}>
      {children}
    </CounterContext.Provider>
  )
}

// 3. Create custom hook
function useCounter() {
  const context = useContext(CounterContext)
  if (!context) throw new Error('Missing CounterProvider')
  return context
}`,
      highlights: [
        "3-part pattern: Context, Provider, Hook",
        "Provider manages state",
        "Hook provides safe access",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Using the Pattern",
      code: `// Wrap your app (or part of it)
function App() {
  return (
    <CounterProvider>
      <Header />
      <Content />
      <Footer />
    </CounterProvider>
  )
}

// Any descendant can access
function Header() {
  const { count } = useCounter()
  return <h1>Count: {count}</h1>
}

function Content() {
  const { increment } = useCounter()
  return <button onClick={increment}>Add</button>
}`,
      highlights: [
        "Provider at the top wraps consumers",
        "Header and Content access same state",
        "No props passed through App!",
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "When to Use Context",
      icon: "check-circle",
      points: [
        "Theme (dark/light mode)",
        "User authentication state",
        "Language/locale preferences",
        "UI state (sidebar open/closed)",
        "Shopping cart (small apps)",
        "Feature flags",
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "When NOT to Use Context",
      icon: "alert-triangle",
      points: [
        "Data that changes very frequently",
        "Complex state with many actions",
        "State needed by only 1-2 components",
        "Server-fetched data (use React Query)",
        "Large applications (use Redux/Zustand)",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Multiple Contexts",
      code: `// You can have multiple contexts!
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

// Each context is independent
function Header() {
  const { theme } = useTheme()
  const { user } = useAuth()
  const { t } = useLanguage()

  return <h1>{t('welcome')}, {user.name}</h1>
}`,
      highlights: [
        "Nest multiple providers",
        "Each manages its own state",
        "Components can use any/all contexts",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Context with Reducer",
      code: `function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0
  })

  const addItem = (item) => dispatch({ type: 'ADD', item })
  const removeItem = (id) => dispatch({ type: 'REMOVE', id })

  return (
    <CartContext.Provider value={{
      items: state.items,
      total: state.total,
      addItem,
      removeItem
    }}>
      {children}
    </CartContext.Provider>
  )
}`,
      highlights: [
        "useReducer for complex state logic",
        "Actions wrapped in helper functions",
        "Clean API for consumers",
      ],
    },
  },
  {
    type: "comparison",
    content: {
      title: "Props vs Context",
      left: {
        title: "Props",
        items: [
          "Explicit data flow",
          "Easy to trace",
          "Good for direct parent-child",
          "Component is self-contained",
          "Better for reusable components",
        ],
      },
      right: {
        title: "Context",
        items: [
          "Implicit data flow",
          "Harder to trace",
          "Good for deeply nested",
          "Component depends on context",
          "Better for app-wide state",
        ],
      },
    },
  },
  {
    type: "standard",
    content: {
      title: "Context Best Practices",
      icon: "lightbulb",
      points: [
        "Keep context focused (one concern per context)",
        "Always use custom hooks for consumption",
        "Memoize context values if they contain objects",
        "Split frequently updating state from static state",
        "Place Provider as close to consumers as needed",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Optimizing Context",
      code: `function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  // Memoize to prevent unnecessary re-renders
  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(t => 
      t === 'light' ? 'dark' : 'light'
    )
  }), [theme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}`,
      highlights: [
        "useMemo prevents new object on every render",
        "Only creates new value when theme changes",
        "Important for performance with many consumers",
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Module 10 Quests",
      icon: "clipboard",
      points: [
        "Quest 1: Theme Switcher - Light/dark mode with persistence",
        "Quest 2: Language Support - i18n with translation context",
        "Quest 3: User Session - Authentication context pattern",
      ],
    },
  },
];
