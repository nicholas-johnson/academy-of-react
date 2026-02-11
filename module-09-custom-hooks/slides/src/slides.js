export const slides = [
  {
    type: "title",
    content: {
      title: "Custom Hooks",
      subtitle: "Module 9: Reusable Stateful Logic",
      icon: "anchor",
    },
  },
  {
    type: "standard",
    content: {
      title: "The Problem",
      points: [
        "Multiple components need the same logic",
        "Copy-pasting useState + useEffect everywhere",
        "Logic gets duplicated across the codebase",
        "Hard to test and maintain",
        "We need a way to share stateful logic!",
      ],
      icon: "help-circle",
    },
  },
  {
    type: "standard",
    content: {
      title: "What is a Custom Hook?",
      points: [
        "A function that uses other hooks",
        "Extracts reusable stateful logic",
        'Must start with "use" prefix',
        "Can use any built-in hooks inside",
        "Returns whatever you want (value, array, object)",
      ],
      icon: "anchor",
    },
  },
  {
    type: "standard",
    content: {
      title: "Why Custom Hooks?",
      points: [
        "Reusability — Use same logic in many components",
        "Testability — Test logic separately from UI",
        "Encapsulation — Hide complex implementation",
        "Clean Code — Components stay focused on rendering",
        "Sharing — Publish hooks as npm packages",
      ],
      icon: "sparkles",
    },
  },
  {
    type: "code",
    content: {
      title: "Your First Custom Hook",
      code: `// Custom Hook: useToggle
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  
  const toggle = () => setValue(v => !v)
  
  return [value, toggle]
}

// Usage in any component
function App() {
  const [isOpen, toggleOpen] = useToggle(false)
  const [isDark, toggleDark] = useToggle(true)
  
  return (
    <div>
      <button onClick={toggleOpen}>
        {isOpen ? 'Close' : 'Open'}
      </button>
    </div>
  )
}`,
      highlights: [
        'Name starts with "use"',
        "Uses useState inside",
        "Returns value + function",
        "Can be reused anywhere!",
      ],
    },
  },
  {
    type: "rules",
    content: {
      title: "Rules of Custom Hooks",
      rules: [
        {
          rule: 'Name starts with "use"',
          example: "useLocalStorage, useFetch",
          icon: "tag",
        },
        {
          rule: "Call hooks at the top level",
          example: "Not in loops or conditions",
          icon: "circle-up",
        },
        {
          rule: "Only call from React functions",
          example: "Components or other hooks",
          icon: "atom",
        },
        {
          rule: "Can use any hooks inside",
          example: "useState, useEffect, useRef...",
          icon: "anchor",
        },
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "useCounter",
      code: `function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  
  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => c - 1)
  const reset = () => setCount(initialValue)
  const set = (value) => setCount(value)
  
  return { count, increment, decrement, reset, set }
}

// Usage
const { count, increment, decrement, reset } = useCounter(10)

<button onClick={decrement}>-</button>
<span>{count}</span>
<button onClick={increment}>+</button>
<button onClick={reset}>Reset</button>`,
      highlights: [
        "Encapsulates counter logic",
        "Returns value + multiple actions",
        "Can be used for any counting need",
        "Shows object return pattern",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "useWindowSize",
      code: `function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

// Usage
const { width, height } = useWindowSize()
const isMobile = width < 768`,
      highlights: [
        "Tracks browser window dimensions",
        "Cleanup removes event listener",
        "Returns current size object",
        "Useful for responsive logic",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "useLocalStorage",
      code: `function useLocalStorage(key, initialValue) {
  // Initialize from localStorage or use default
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  // Sync to localStorage when value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

// Usage - data persists across page refreshes!
const [theme, setTheme] = useLocalStorage('theme', 'light')
const [user, setUser] = useLocalStorage('user', null)`,
      highlights: [
        "Combines useState + useEffect",
        "Lazy initialization reads from localStorage",
        "Effect syncs changes back",
        "Same API as useState!",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "useFetch",
      code: `function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
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

// Usage
const { data, loading, error } = useFetch('/api/spells')`,
      highlights: [
        "Encapsulates fetch + loading + error pattern",
        "Refetches when URL changes",
        "Returns object with all states",
        "Reusable for any API endpoint",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "useDebounce",
      code: `function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set timeout to update debounced value
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clear timeout if value changes before delay
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// Usage - search only runs after typing stops
const [query, setQuery] = useState('')
const debouncedQuery = useDebounce(query, 500)

useEffect(() => {
  searchAPI(debouncedQuery)
}, [debouncedQuery])`,
      highlights: [
        "Delays value updates",
        "Cleanup cancels pending timeout",
        "Great for search/filter inputs",
        "Reduces unnecessary API calls",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Hook Composition",
      code: `// Custom hooks can use other custom hooks!
function useSearchWithDebounce(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery)
  const debouncedQuery = useDebounce(query, 300)
  const { data, loading } = useFetch(
    debouncedQuery ? \`/api/search?q=\${debouncedQuery}\` : null
  )
  
  return {
    query,
    setQuery,
    results: data,
    isSearching: loading
  }
}

// Usage - complex logic, simple interface
const { query, setQuery, results, isSearching } = useSearchWithDebounce()`,
      highlights: [
        "Combine useDebounce + useFetch",
        "Each hook does one thing well",
        "Compose into powerful abstractions",
        "Single clean API for consumers",
      ],
    },
  },
  {
    type: "comparison",
    content: {
      title: "Before vs After Custom Hooks",
      left: {
        label: "Without Custom Hook",
        code: `// Repeated in every component
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  fetch(url)
    .then(r => r.json())
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false))
}, [url])`,
      },
      right: {
        label: "With Custom Hook",
        code: `// All logic extracted
const { data, loading, error } = useFetch(url)

// Component focuses on rendering
if (loading) return <Spinner />
if (error) return <Error />
return <DataList data={data} />`,
      },
    },
  },
  {
    type: "rules",
    content: {
      title: "When to Create a Custom Hook",
      rules: [
        {
          rule: "Logic is used in 2+ components",
          example: "Extract and share it",
          icon: "recycle",
        },
        {
          rule: "Component is getting complex",
          example: "Separate concerns",
          icon: "eraser",
        },
        {
          rule: "You want to test logic",
          example: "Test hook independently",
          icon: "flask",
        },
        {
          rule: "You see useState + useEffect together",
          example: "Often a hook waiting to happen",
          icon: "anchor",
        },
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Common Custom Hooks",
      points: [
        "useLocalStorage — Persist state in browser",
        "useFetch — Data fetching with loading/error",
        "useDebounce — Delay value updates",
        "useWindowSize — Track window dimensions",
        "usePrevious — Access previous value",
        "useKeyPress — Detect key presses",
      ],
      icon: "wrench",
    },
  },
  {
    type: "title",
    content: {
      title: "Common Hook Libraries",
      subtitle: "Don't reinvent the wheel",
      icon: "package",
    },
  },
  {
    type: "standard",
    content: {
      title: "Hook Libraries",
      points: [
        "react-use — 100+ essential hooks",
        "ahooks — Enterprise-grade React hooks library",
        "usehooks-ts — TypeScript-first collection",
        "Don't reinvent the wheel!",
        "Great for learning hook patterns",
        "Production-tested and optimized",
      ],
      icon: "package",
    },
  },
  {
    type: "standard",
    content: {
      title: "TanStack React Query",
      points: [
        "Powerful data fetching and caching library",
        "Built on custom hooks (useQuery, useMutation)",
        "Automatic background refetching",
        "Built-in caching and stale data management",
        "Loading, error, and success states",
        "Industry standard for server state",
      ],
      icon: "database",
    },
  },
  {
    type: "standard",
    content: {
      title: "React Hook Form",
      points: [
        "Performant form library using hooks",
        "Built with useForm hook at its core",
        "Minimal re-renders during input changes",
        "Easy validation with built-in/custom rules",
        "Works with UI libraries and native inputs",
        "Industry standard for complex forms",
      ],
      icon: "file-text",
    },
  },
  {
    type: "standard",
    content: {
      title: "Framer Motion",
      points: [
        "Animation library powered by hooks",
        "useAnimation, useMotionValue, useScroll",
        "Declarative animations with motion components",
        "Gesture detection (drag, tap, hover)",
        "Layout animations and transitions",
        "Production-ready animation system",
      ],
      icon: "zap",
    },
  },
  {
    type: "standard",
    content: {
      title: "React Aria",
      points: [
        "Accessibility-focused hook library by Adobe",
        "Hooks for building accessible UI primitives",
        "useButton, useTextField, useDialog, etc.",
        "Keyboard navigation and screen reader support",
        "ARIA patterns and focus management",
        "Foundation for design systems",
      ],
      icon: "accessibility",
    },
  },
  {
    type: "standard",
    content: {
      title: "Module 9 Goals",
      points: [
        "Understand what custom hooks are",
        'Follow the "use" naming convention',
        "Build useLocalStorage from scratch",
        "Build useFetch for data fetching",
        "Build useDebounce for performance",
        "Compose hooks together",
      ],
      icon: "target",
    },
  },
  {
    type: "title",
    content: {
      title: "Let's Build Hooks!",
      subtitle: "Time to extract reusable logic",
      icon: "rocket",
    },
  },
];
