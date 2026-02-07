export const slides = [
  {
    type: "title",
    content: {
      title: "Built-in React Hooks",
      subtitle: "Module 8: The Complete Hook Reference",
      emoji: "🪝",
    },
  },
  {
    type: "standard",
    content: {
      title: "What Are Hooks?",
      points: [
        'Functions that let you "hook into" React features',
        "Use state and lifecycle in function components",
        'Always start with "use" prefix',
        "Must be called at the top level (not in loops/conditions)",
        "React has ~15 built-in hooks",
      ],
      emoji: "🎣",
    },
  },
  {
    type: "standard",
    content: {
      title: "Hook Categories",
      points: [
        "📦 State Hooks — useState, useReducer",
        "🔗 Context Hooks — useContext",
        "🎯 Ref Hooks — useRef, useImperativeHandle",
        "⚡ Effect Hooks — useEffect, useLayoutEffect",
        "🚀 Performance Hooks — useMemo, useCallback, useTransition",
        "🔧 Other Hooks — useId, useSyncExternalStore",
      ],
      emoji: "📚",
    },
  },

  // HOW HOOKS WORK UNDER THE HOOD
  {
    type: "title",
    content: {
      title: "How Hooks Work",
      subtitle: "Under the Hood",
      emoji: "🔬",
    },
  },
  {
    type: "code",
    content: {
      title: "Where Is Hook Data Stored?",
      code: `// Your component
function Counter() {
  const [count, setCount] = useState(0)    // Hook 1
  const [name, setName] = useState('')     // Hook 2
  const ref = useRef(null)                 // Hook 3
  // ...
}

// React creates a "Fiber node" for each component
// Each Fiber has a linked list of hook data:

Fiber {
  memoizedState: {
    value: 0,           // useState #1
    next: {
      value: '',        // useState #2  
      next: {
        value: null,    // useRef #3
        next: null
      }
    }
  }
}`,
      highlights: [
        "Each component instance has a Fiber node",
        "Fiber stores hooks as a linked list",
        "Hooks are identified by POSITION, not name",
        "React walks the list on each render",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Why Call Order Matters",
      code: `// ❌ BAD: Conditional hook call
function Profile({ user }) {
  if (user) {
    const [name, setName] = useState(user.name)  // Sometimes Hook 1
  }
  const [age, setAge] = useState(0)              // Sometimes Hook 1 or 2!
}

// First render (user exists):
//   Hook 1 → name state
//   Hook 2 → age state

// Second render (user is null):
//   Hook 1 → age state  ← WRONG! React expects name here
//   💥 State is now corrupted!`,
      highlights: [
        "React matches hooks by call ORDER",
        "No names or keys — just position in the list",
        "Changing order corrupts state mapping",
        "This is why hooks can't be conditional",
      ],
    },
  },
  {
    type: "rules",
    content: {
      title: "The Rules of Hooks",
      rules: [
        {
          rule: "Only call at top level",
          example: "Not in loops, conditions, or nested functions",
          icon: "1️⃣",
        },
        {
          rule: "Only call from React functions",
          example: "Components or custom hooks, not regular JS",
          icon: "2️⃣",
        },
        {
          rule: "Same order every render",
          example: "React relies on consistent call sequence",
          icon: "3️⃣",
        },
        {
          rule: 'Start with "use"',
          example: "Convention that enables lint rules",
          icon: "4️⃣",
        },
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Correct Patterns",
      code: `// ✅ GOOD: Unconditional hooks, conditional logic inside
function Profile({ user }) {
  const [name, setName] = useState('')  // Always called
  const [age, setAge] = useState(0)     // Always called
  
  useEffect(() => {
    if (user) {              // Condition INSIDE the hook
      setName(user.name)
    }
  }, [user])
  
  return user ? <div>{name}</div> : <div>Loading...</div>
}

// ✅ GOOD: Early return AFTER all hooks
function Profile({ user }) {
  const [data, setData] = useState(null)
  
  if (!user) return <Loading />  // After hooks is OK
  
  return <div>{data}</div>
}`,
      highlights: [
        "Call ALL hooks before any early returns",
        "Put conditions INSIDE hooks, not around them",
        "Hooks must run every render, in same order",
      ],
    },
  },
  {
    type: "title",
    content: {
      title: "The Math Behind Hooks",
      subtitle: "Algebraic Effects",
      emoji: "📐",
    },
  },
  {
    type: "standard",
    content: {
      title: "Algebraic Effects",
      points: [
        "Hooks are inspired by algebraic effects from programming language theory",
        "An effect is an operation that 'escapes' normal function execution",
        "Examples: reading state, writing to DOM, fetching data",
        "The key insight: separate WHAT you want from HOW it happens",
        "Your component describes effects; React handles execution",
      ],
      emoji: "🧮",
    },
  },
  {
    type: "code",
    content: {
      title: "Effects as 'Capabilities'",
      code: `// Traditional approach: function does everything
function fetchUser() {
  const response = fetch('/api/user')  // Side effect!
  return response.json()
}

// Algebraic effects approach: declare what you need
function UserProfile() {
  // "I need state" — React provides it
  const [user, setUser] = useState(null)
  
  // "I need to run code after render" — React schedules it
  useEffect(() => {
    fetchUser().then(setUser)
  }, [])
  
  // Component is "pure" — just describes what effects it needs
  // React (the "handler") decides how/when to execute them
}`,
      highlights: [
        "Hooks 'perform' effects, React 'handles' them",
        "Component stays declarative and testable",
        "React controls timing and batching",
        "Similar to dependency injection",
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Why This Matters",
      points: [
        "Components describe intent, not implementation",
        "React can optimize, batch, and schedule effects",
        "Enables features like Concurrent Mode and Suspense",
        "Makes time-travel debugging possible",
        "Components remain pure and predictable",
      ],
      emoji: "💡",
    },
  },
  {
    type: "comparison",
    content: {
      title: "Class Components vs Hooks",
      left: {
        label: "Class Components",
        items: [
          "State stored in this.state",
          "Lifecycle methods: componentDidMount, etc.",
          "this binding issues",
          "Logic scattered across methods",
        ],
      },
      right: {
        label: "Hooks (Algebraic Effects)",
        items: [
          "State stored in Fiber linked list",
          "Effects declared, React handles timing",
          "No this — just closures",
          "Logic grouped by concern",
        ],
      },
    },
  },

  // STATE HOOKS
  {
    type: "title",
    content: {
      title: "State Hooks",
      subtitle: "useState & useReducer",
      emoji: "📦",
    },
  },
  {
    type: "code",
    content: {
      title: "useState",
      code: `// Simple state
const [count, setCount] = useState(0)

// Object state
const [user, setUser] = useState({ name: '', level: 1 })

// Lazy initialization (for expensive calculations)
const [data, setData] = useState(() => computeExpensiveValue())

// Updating based on previous value
setCount(prev => prev + 1)

// Array state
const [items, setItems] = useState([])
setItems(prev => [...prev, newItem])`,
      highlights: [
        "Returns [value, setter] tuple",
        "Triggers re-render when updated",
        "Use callback form for updates based on previous value",
        "Lazy init runs only on first render",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "useReducer",
      code: `// Define reducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'decrement': return { count: state.count - 1 }
    case 'reset': return { count: 0 }
    default: return state
  }
}

// Use reducer
const [state, dispatch] = useReducer(reducer, { count: 0 })

// Dispatch actions
dispatch({ type: 'increment' })
dispatch({ type: 'reset' })`,
      highlights: [
        "Better for complex state logic",
        'Actions describe "what happened"',
        "Reducer is pure function: (state, action) => newState",
        "Great with useContext for global state",
      ],
    },
  },
  {
    type: "comparison",
    content: {
      title: "useState vs useReducer",
      left: {
        label: "useState",
        items: [
          "Simple state (numbers, strings, booleans)",
          "Independent state values",
          "Direct updates",
          "Less boilerplate",
        ],
      },
      right: {
        label: "useReducer",
        items: [
          "Complex state (objects, arrays)",
          "Related state values",
          "Action-based updates",
          "Better for testing",
        ],
      },
    },
  },

  // CONTEXT HOOKS
  {
    type: "title",
    content: {
      title: "Context Hooks",
      subtitle: "useContext",
      emoji: "🔗",
    },
  },
  {
    type: "code",
    content: {
      title: "useContext",
      code: `// 1. Create context
const ThemeContext = createContext('light')

// 2. Provide value (in parent)
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// 3. Consume value (in any child)
function Button() {
  const theme = useContext(ThemeContext)
  return <button className={theme}>Click me</button>
}`,
      highlights: [
        "Access context without Consumer component",
        "Component re-renders when context changes",
        "Avoids prop drilling",
        "Covered in depth in Module 10",
      ],
    },
  },

  // REF HOOKS
  {
    type: "title",
    content: {
      title: "Ref Hooks",
      subtitle: "useRef & useImperativeHandle",
      emoji: "🎯",
    },
  },
  {
    type: "code",
    content: {
      title: "useRef",
      code: `// DOM reference
const inputRef = useRef(null)

useEffect(() => {
  inputRef.current?.focus()  // Auto-focus on mount
}, [])

<input ref={inputRef} />

// Mutable value (no re-render)
const countRef = useRef(0)
countRef.current += 1  // Doesn't trigger re-render!

// Previous value pattern
const prevValueRef = useRef(value)
useEffect(() => {
  prevValueRef.current = value
}, [value])`,
      highlights: [
        ".current holds the mutable value",
        "Changes don't trigger re-renders",
        "Great for: DOM access, timers, previous values",
        "Persists across renders",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "useImperativeHandle",
      code: `// Child component with custom ref API
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) inputRef.current.value = ''
    },
    shake: () => inputRef.current?.classList.add('shake')
  }))

  return <input ref={inputRef} {...props} />
})

// Parent can use custom methods
const ref = useRef(null)
ref.current.focus()
ref.current.clear()`,
      highlights: [
        "Customize what parent sees via ref",
        "Expose only specific methods",
        "Used with forwardRef",
        "Rarely needed — prefer props when possible",
      ],
    },
  },

  // EFFECT HOOKS
  {
    type: "title",
    content: {
      title: "Effect Hooks",
      subtitle: "useEffect & useLayoutEffect",
      emoji: "⚡",
    },
  },
  {
    type: "code",
    content: {
      title: "useEffect",
      code: `// Run after every render
useEffect(() => {
  console.log('Rendered!')
})

// Run once on mount
useEffect(() => {
  fetchData()
}, [])

// Run when dependencies change
useEffect(() => {
  document.title = \`Count: \${count}\`
}, [count])

// Cleanup on unmount
useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)  // Cleanup!
}, [])`,
      highlights: [
        "Runs AFTER render (asynchronously)",
        "Dependency array controls when it runs",
        "Return function for cleanup",
        "Covered in depth in Module 5",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "useLayoutEffect",
      code: `// Runs SYNCHRONOUSLY after DOM mutations, before paint
useLayoutEffect(() => {
  // Measure DOM elements
  const rect = elementRef.current?.getBoundingClientRect()
  
  // Update state before browser paints
  setPosition({ x: rect.left, y: rect.top })
}, [])

// Common use: prevent visual flicker
useLayoutEffect(() => {
  // Adjust element position immediately
  if (tooltipRef.current) {
    tooltipRef.current.style.left = calculatedPosition + 'px'
  }
}, [calculatedPosition])`,
      highlights: [
        "Blocks browser paint until complete",
        "Use for DOM measurements",
        "Prevents visual flicker",
        "⚠️ Can hurt performance — prefer useEffect",
      ],
    },
  },
  {
    type: "comparison",
    content: {
      title: "useEffect vs useLayoutEffect",
      left: {
        label: "useEffect",
        items: [
          "Runs after paint",
          "Non-blocking",
          "Use for: data fetching, subscriptions",
          "✅ Default choice",
        ],
      },
      right: {
        label: "useLayoutEffect",
        items: [
          "Runs before paint",
          "Blocks rendering",
          "Use for: DOM measurements, tooltips",
          "⚠️ Only when needed",
        ],
      },
    },
  },

  // PERFORMANCE HOOKS
  {
    type: "title",
    content: {
      title: "Performance Hooks",
      subtitle: "useMemo, useCallback, useTransition",
      emoji: "🚀",
    },
  },
  {
    type: "code",
    content: {
      title: "useMemo",
      code: `// Memoize expensive calculation
const sortedList = useMemo(() => {
  console.log('Sorting...')  // Only logs when items change
  return [...items].sort((a, b) => a.name.localeCompare(b.name))
}, [items])

// Memoize object/array to prevent unnecessary re-renders
const config = useMemo(() => ({
  theme: 'dark',
  language: 'en'
}), [])  // Never recreated

// Don't overuse! Only for expensive operations
const simple = count * 2  // ❌ Don't memoize simple math`,
      highlights: [
        "Caches result between renders",
        "Recalculates only when dependencies change",
        "For expensive calculations",
        "Covered in depth in Module 12",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "useCallback",
      code: `// Memoize function reference
const handleClick = useCallback(() => {
  console.log('Clicked:', id)
}, [id])

// Without useCallback, new function every render
const handleClick = () => { }  // New reference each time!

// Useful when passing to memoized children
<MemoizedChild onClick={handleClick} />

// With dependencies
const handleSubmit = useCallback((data) => {
  submitForm(userId, data)
}, [userId])`,
      highlights: [
        "Returns same function reference if deps unchanged",
        "Prevents unnecessary child re-renders",
        "Use with React.memo() children",
        "Don't wrap every function — only when needed",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "useTransition",
      code: `const [isPending, startTransition] = useTransition()

function handleSearch(query) {
  // Urgent: update input immediately
  setQuery(query)
  
  // Non-urgent: can be interrupted
  startTransition(() => {
    setFilteredResults(filterLargeList(query))
  })
}

return (
  <>
    <input value={query} onChange={e => handleSearch(e.target.value)} />
    {isPending && <Spinner />}
    <Results data={filteredResults} />
  </>
)`,
      highlights: [
        "Marks updates as non-urgent",
        "Keeps UI responsive during heavy updates",
        "isPending shows transition in progress",
        "React 18+ feature",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "useDeferredValue",
      code: `// Defer a value to prevent blocking
const deferredQuery = useDeferredValue(query)

// UI uses deferred value for expensive operations
const filteredList = useMemo(() => {
  return items.filter(item => 
    item.name.includes(deferredQuery)
  )
}, [deferredQuery, items])

// Show stale indicator
const isStale = query !== deferredQuery

return (
  <div style={{ opacity: isStale ? 0.5 : 1 }}>
    <List items={filteredList} />
  </div>
)`,
      highlights: [
        'Returns "stale" version of value',
        "Updates lag behind actual value",
        "Similar to debouncing but smarter",
        "React 18+ feature",
      ],
    },
  },

  // OTHER HOOKS
  {
    type: "title",
    content: {
      title: "Other Hooks",
      subtitle: "useId & More",
      emoji: "🔧",
    },
  },
  {
    type: "code",
    content: {
      title: "useId",
      code: `function FormField({ label }) {
  const id = useId()  // Generates unique ID like ":r1:"
  
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  )
}

// Multiple IDs from one hook
function ComplexForm() {
  const id = useId()
  return (
    <>
      <label htmlFor={id + '-name'}>Name</label>
      <input id={id + '-name'} />
      <label htmlFor={id + '-email'}>Email</label>
      <input id={id + '-email'} />
    </>
  )
}`,
      highlights: [
        "Generates unique IDs",
        "Safe for server-side rendering",
        "Consistent between server and client",
        "Great for accessibility (label + input)",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "useSyncExternalStore",
      code: `// Subscribe to external store (like Redux, Zustand)
const state = useSyncExternalStore(
  store.subscribe,      // Subscribe function
  store.getSnapshot,    // Get current value
  store.getServerSnapshot  // Optional: SSR value
)

// Example: Browser online status
function useOnlineStatus() {
  return useSyncExternalStore(
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
}`,
      highlights: [
        "Subscribe to external data sources",
        "Handles concurrent rendering correctly",
        "Used by state management libraries",
        "Rarely needed in application code",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "useDebugValue",
      code: `// Add labels to custom hooks in React DevTools
function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot)
  
  // Shows "OnlineStatus: Online" in DevTools
  useDebugValue(isOnline ? 'Online' : 'Offline')
  
  return isOnline
}

// Defer formatting for expensive operations
useDebugValue(date, date => date.toISOString())`,
      highlights: [
        "Labels custom hooks in React DevTools",
        "Only for debugging custom hooks",
        "No runtime effect in production",
        "Second arg defers expensive formatting",
      ],
    },
  },

  // SUMMARY
  {
    type: "rules",
    content: {
      title: "Which Hook to Use?",
      rules: [
        {
          rule: "Need component state?",
          example: "useState or useReducer",
          icon: "📦",
        },
        { rule: "Need shared state?", example: "useContext", icon: "🔗" },
        { rule: "Need DOM access?", example: "useRef", icon: "🎯" },
        { rule: "Need side effects?", example: "useEffect", icon: "⚡" },
        {
          rule: "Need performance?",
          example: "useMemo, useCallback",
          icon: "🚀",
        },
        { rule: "Need unique IDs?", example: "useId", icon: "🔧" },
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "The Essential 6",
      points: [
        "📦 useState — local state",
        "⚡ useEffect — side effects",
        "🎯 useRef — DOM access, mutable values",
        "🔗 useContext — shared state",
        "🚀 useMemo — memoize values",
        "🚀 useCallback — memoize functions",
      ],
      emoji: "⭐",
    },
  },
  {
    type: "standard",
    content: {
      title: "Module 8 Quests",
      points: [
        "Quest 1: DOM Access — Focus inputs with useRef",
        "Quest 2: Persisting Values — Track renders without re-rendering",
        "Quest 3: Media Controls — Build a video player",
        "Quest 4: useReducer — Manage complex spell inventory",
      ],
      emoji: "📋",
    },
  },
  {
    type: "title",
    content: {
      title: "Let's Practice!",
      subtitle: "Time to master React's built-in hooks",
      emoji: "🚀",
    },
  },
];
