import { useEffect, useState } from 'react'

export default function UseEffectDemo() {
  const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [data, setData] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showTimer, setShowTimer] = useState(true)
  const [seconds, setSeconds] = useState(0)

  // Effect with no dependencies - runs after every render
  // (Usually not what you want!)

  // Effect with empty dependencies - runs once on mount
  useEffect(() => {
    console.log('Component mounted!')
    
    return () => {
      console.log('Component will unmount!')
    }
  }, [])

  // Effect with dependencies - runs when dependencies change
  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count])

  // Effect with cleanup - event listeners
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Simulated data fetching
  useEffect(() => {
    if (!searchTerm) {
      setData(null)
      return
    }

    setLoading(true)
    const timeoutId = setTimeout(() => {
      setData(`Results for "${searchTerm}"`)
      setLoading(false)
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchTerm])

  // Timer component to demonstrate cleanup
  function Timer() {
    const [time, setTime] = useState(0)

    useEffect(() => {
      const intervalId = setInterval(() => {
        setTime(t => t + 1)
      }, 1000)

      // Cleanup function - called when component unmounts
      return () => {
        clearInterval(intervalId)
        console.log('Timer cleaned up!')
      }
    }, [])

    return (
      <div className="result-display">
        <div className="result-label">Timer (seconds)</div>
        <div className="result-value">{time}</div>
      </div>
    )
  }

  return (
    <div>
      <div className="hook-header">
        <span className="hook-category">Effect Hook</span>
        <h2>useEffect</h2>
        <p className="hook-description">
          Performs side effects in functional components. Replaces componentDidMount, 
          componentDidUpdate, and componentWillUnmount. Runs after render, allowing 
          React to update the DOM first.
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`useEffect(() => {
  // Effect code runs after render
  
  return () => {
    // Cleanup code runs before next effect or unmount
  }
}, [dependencies])`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>Dependency Array Rules</h3>
        <div className="code-block">
          <pre>{`// No array: Runs after EVERY render (rarely needed)
useEffect(() => { ... })

// Empty array: Runs ONCE on mount
useEffect(() => { ... }, [])

// With dependencies: Runs when dependencies change
useEffect(() => { ... }, [count, userId])`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>Common Use Cases</h3>
        <ul className="demo-list" style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li style={{ background: 'transparent', padding: '8px 0' }}>Data fetching</li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>Subscriptions (WebSocket, event listeners)</li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>Timers and intervals</li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>DOM manipulations</li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>Logging and analytics</li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>Syncing with external systems</li>
        </ul>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Document Title Effect</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          The browser tab title updates when count changes.
        </p>
        
        <div className="stat-grid">
          <div className="stat-card">
            <div className="label">Count</div>
            <div className="value">{count}</div>
          </div>
          <div className="stat-card">
            <div className="label">Window Width</div>
            <div className="value" style={{ fontSize: '1.2rem' }}>{windowWidth}px</div>
          </div>
        </div>
        
        <div className="button-group" style={{ marginTop: '16px' }}>
          <button className="btn btn-small" onClick={() => setCount(c => c + 1)}>
            Increment (watch tab title)
          </button>
          <button className="btn btn-small btn-secondary" onClick={() => setCount(0)}>
            Reset
          </button>
        </div>
        <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '8px' }}>
          Try resizing the window to see the width update!
        </p>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Debounced Search</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Effect with cleanup — cancels previous request when input changes.
        </p>
        
        <div className="form-group">
          <label>Search Spells</label>
          <input
            className="input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
          />
        </div>
        
        <div className="result-display" style={{ minHeight: '60px' }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="spinner" />
              <span style={{ color: '#9ca3af' }}>Searching...</span>
            </div>
          ) : data ? (
            <>
              <div className="result-label">Search Results</div>
              <div className="result-value" style={{ fontSize: '1rem' }}>{data}</div>
            </>
          ) : (
            <span style={{ color: '#6b7280' }}>Enter a search term</span>
          )}
        </div>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Cleanup on Unmount</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Toggle the timer to see cleanup in action (check console).
        </p>
        
        <button 
          className="btn btn-small" 
          onClick={() => setShowTimer(!showTimer)}
          style={{ marginBottom: '16px' }}
        >
          {showTimer ? 'Unmount Timer' : 'Mount Timer'}
        </button>
        
        {showTimer && <Timer />}
      </div>

      <div className="demo-section">
        <h3>Cleanup Pattern</h3>
        <div className="code-block">
          <pre>{`useEffect(() => {
  // Setup: Subscribe to something
  const subscription = dataSource.subscribe(handleData)
  
  // Cleanup: Unsubscribe when component unmounts
  // or before the effect runs again
  return () => {
    subscription.unsubscribe()
  }
}, [dataSource])`}</pre>
        </div>
      </div>

      <div className="info-box warning">
        <h5>⚠️ Common Mistakes</h5>
        <ul>
          <li><strong>Missing dependencies</strong> — Always include all used values</li>
          <li><strong>Forgetting cleanup</strong> — Leads to memory leaks</li>
          <li><strong>Infinite loops</strong> — Don't update state that's in dependencies</li>
          <li><strong>Async directly in effect</strong> — Create inner async function</li>
        </ul>
      </div>

      <div className="demo-section">
        <h3>Async Data Fetching</h3>
        <div className="code-block">
          <pre>{`useEffect(() => {
  // Can't make effect callback async directly
  // Create inner function instead
  
  async function fetchData() {
    const response = await fetch('/api/wizard')
    const data = await response.json()
    setWizard(data)
  }
  
  fetchData()
}, [wizardId])`}</pre>
        </div>
      </div>
    </div>
  )
}
