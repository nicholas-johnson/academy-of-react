import { 
  useState, 
  useEffect, 
  useRef, 
  useReducer, 
  useMemo, 
  useCallback,
  useId,
  useTransition
} from 'react'
import './App.css'

// Reducer for useReducer demo
function wizardReducer(state, action) {
  switch (action.type) {
    case 'ADD_WIZARD':
      return { ...state, wizards: [...state.wizards, action.wizard] }
    case 'REMOVE_WIZARD':
      return { ...state, wizards: state.wizards.filter(w => w.id !== action.id) }
    case 'SET_FILTER':
      return { ...state, filter: action.filter }
    default:
      return state
  }
}

// Demo components for each hook
function UseStateDemo() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  return (
    <div className="hook-demo">
      <h3>useState</h3>
      <p>Local component state</p>
      <div className="demo-content">
        <button onClick={() => setCount(c => c + 1)}>
          Count: {count}
        </button>
        <input 
          value={name} 
          onChange={e => setName(e.target.value)}
          placeholder="Type your name"
        />
        {name && <p>Hello, {name}!</p>}
      </div>
    </div>
  )
}

function UseReducerDemo() {
  const [state, dispatch] = useReducer(wizardReducer, {
    wizards: [
      { id: 1, name: 'Merlin', power: 100 },
      { id: 2, name: 'Gandalf', power: 95 }
    ],
    filter: ''
  })

  const addWizard = () => {
    const id = Date.now()
    dispatch({ 
      type: 'ADD_WIZARD', 
      wizard: { id, name: `Wizard ${id % 1000}`, power: Math.floor(Math.random() * 100) }
    })
  }

  const filteredWizards = state.wizards.filter(w => 
    w.name.toLowerCase().includes(state.filter.toLowerCase())
  )

  return (
    <div className="hook-demo">
      <h3>useReducer</h3>
      <p>Complex state with actions</p>
      <div className="demo-content">
        <input 
          placeholder="Filter wizards..."
          value={state.filter}
          onChange={e => dispatch({ type: 'SET_FILTER', filter: e.target.value })}
        />
        <button onClick={addWizard}>Add Wizard</button>
        <ul>
          {filteredWizards.map(w => (
            <li key={w.id}>
              {w.name} (Power: {w.power})
              <button onClick={() => dispatch({ type: 'REMOVE_WIZARD', id: w.id })}>×</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function UseRefDemo() {
  const inputRef = useRef(null)
  const renderCount = useRef(0)
  
  renderCount.current += 1

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <div className="hook-demo">
      <h3>useRef</h3>
      <p>DOM access & mutable values</p>
      <div className="demo-content">
        <input ref={inputRef} placeholder="Click button to focus me" />
        <button onClick={focusInput}>Focus Input</button>
        <p className="hint">Render count: {renderCount.current} (doesn't cause re-render)</p>
      </div>
    </div>
  )
}

function UseEffectDemo() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    
    const interval = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
    
    return () => clearInterval(interval)  // Cleanup!
  }, [running])

  return (
    <div className="hook-demo">
      <h3>useEffect</h3>
      <p>Side effects & cleanup</p>
      <div className="demo-content">
        <p className="timer">{seconds}s</p>
        <button onClick={() => setRunning(!running)}>
          {running ? 'Stop' : 'Start'} Timer
        </button>
        <button onClick={() => setSeconds(0)}>Reset</button>
      </div>
    </div>
  )
}

function UseMemoDemo() {
  const [count, setCount] = useState(0)
  const [numbers] = useState(() => Array.from({ length: 1000 }, (_, i) => i))

  // Expensive calculation - memoized
  const sum = useMemo(() => {
    console.log('Calculating sum...')
    return numbers.reduce((a, b) => a + b, 0)
  }, [numbers])

  return (
    <div className="hook-demo">
      <h3>useMemo</h3>
      <p>Memoize expensive calculations</p>
      <div className="demo-content">
        <p>Sum of 1-1000: {sum.toLocaleString()}</p>
        <button onClick={() => setCount(c => c + 1)}>
          Re-render ({count})
        </button>
        <p className="hint">Check console - sum only calculates once!</p>
      </div>
    </div>
  )
}

function UseCallbackDemo() {
  const [count, setCount] = useState(0)
  
  // Memoized callback - same reference unless count changes
  const handleClick = useCallback(() => {
    console.log('Button clicked! Count:', count)
  }, [count])

  return (
    <div className="hook-demo">
      <h3>useCallback</h3>
      <p>Memoize functions</p>
      <div className="demo-content">
        <button onClick={handleClick}>Log Count</button>
        <button onClick={() => setCount(c => c + 1)}>
          Increment ({count})
        </button>
        <p className="hint">Function reference stable between renders</p>
      </div>
    </div>
  )
}

function UseIdDemo() {
  const emailId = useId()
  const passwordId = useId()

  return (
    <div className="hook-demo">
      <h3>useId</h3>
      <p>Generate unique IDs (SSR-safe)</p>
      <div className="demo-content">
        <div className="form-field">
          <label htmlFor={emailId}>Email</label>
          <input id={emailId} type="email" placeholder="wizard@academy.com" />
        </div>
        <div className="form-field">
          <label htmlFor={passwordId}>Password</label>
          <input id={passwordId} type="password" placeholder="••••••••" />
        </div>
        <p className="hint">IDs: {emailId}, {passwordId}</p>
      </div>
    </div>
  )
}

function UseTransitionDemo() {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const [items, setItems] = useState([])

  // Generate lots of items for demo
  const allItems = useMemo(() => 
    Array.from({ length: 5000 }, (_, i) => `Spell #${i + 1}: ${['Fireball', 'Ice Shard', 'Lightning', 'Heal', 'Shield'][i % 5]}`),
    []
  )

  const handleSearch = (value) => {
    setQuery(value)
    
    // Non-urgent update - can be interrupted
    startTransition(() => {
      const filtered = allItems.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      )
      setItems(filtered.slice(0, 100))
    })
  }

  return (
    <div className="hook-demo">
      <h3>useTransition</h3>
      <p>Non-blocking UI updates</p>
      <div className="demo-content">
        <input 
          value={query}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Search 5000 spells..."
        />
        {isPending && <span className="pending">Searching...</span>}
        <ul className="spell-list">
          {items.slice(0, 5).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
          {items.length > 5 && <li>...and {items.length - 5} more</li>}
        </ul>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <header>
        <h1>🪝 Built-in React Hooks</h1>
        <p>Interactive demo of React's built-in hooks</p>
      </header>

      <div className="hooks-grid">
        <UseStateDemo />
        <UseReducerDemo />
        <UseRefDemo />
        <UseEffectDemo />
        <UseMemoDemo />
        <UseCallbackDemo />
        <UseIdDemo />
        <UseTransitionDemo />
      </div>

      <footer>
        <p>💡 Open browser console to see hook effects</p>
      </footer>
    </div>
  )
}

export default App
