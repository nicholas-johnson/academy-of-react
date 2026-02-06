import { useRef, useState, useEffect } from 'react'

export default function UseRefDemo() {
  // DOM reference
  const inputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  
  // Mutable value that doesn't trigger re-render
  const renderCount = useRef(0)
  const previousValue = useRef<string>('')
  const intervalRef = useRef<number | null>(null)
  
  const [inputValue, setInputValue] = useState('')
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Track renders
  renderCount.current += 1

  // Focus input
  const focusInput = () => {
    inputRef.current?.focus()
  }

  // Select all text
  const selectAll = () => {
    inputRef.current?.select()
  }

  // Scroll into view
  const scrollToElement = () => {
    videoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // Track previous value
  useEffect(() => {
    previousValue.current = inputValue
  }, [inputValue])

  // Interval example
  const startTimer = () => {
    if (intervalRef.current) return
    setIsRunning(true)
    intervalRef.current = window.setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsRunning(false)
    }
  }

  const resetTimer = () => {
    stopTimer()
    setCount(0)
  }

  return (
    <div>
      <div className="hook-header">
        <span className="hook-category">Ref Hook</span>
        <h2>useRef</h2>
        <p className="hook-description">
          Creates a mutable ref object that persists across renders. Used for two main purposes:
          accessing DOM elements directly, and storing mutable values that don't trigger re-renders.
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`// For DOM elements
const inputRef = useRef<HTMLInputElement>(null)
<input ref={inputRef} />
inputRef.current?.focus()

// For mutable values
const countRef = useRef(0)
countRef.current += 1 // Doesn't trigger re-render!`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>Two Use Cases</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="info-box">
            <h5>1. DOM Access</h5>
            <ul>
              <li>Focus management</li>
              <li>Text selection</li>
              <li>Scroll control</li>
              <li>Measuring elements</li>
              <li>Triggering animations</li>
            </ul>
          </div>
          <div className="info-box">
            <h5>2. Mutable Values</h5>
            <ul>
              <li>Storing interval/timeout IDs</li>
              <li>Previous value tracking</li>
              <li>Render counting</li>
              <li>Any value that shouldn't trigger re-render</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-demo">
        <h4>Try It: DOM Reference</h4>
        
        <div className="form-group">
          <label>Input with ref</label>
          <input 
            ref={inputRef}
            className="input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type something..."
          />
        </div>
        
        <div className="button-group" style={{ marginTop: '16px' }}>
          <button className="btn btn-small" onClick={focusInput}>
            Focus Input
          </button>
          <button className="btn btn-small" onClick={selectAll}>
            Select All
          </button>
          <button className="btn btn-small btn-secondary" onClick={scrollToElement}>
            Scroll to Element Below
          </button>
        </div>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Tracking Previous Value</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          useRef can store the previous value without causing re-renders.
        </p>
        
        <div className="stat-grid">
          <div className="stat-card">
            <div className="label">Current Value</div>
            <div className="value" style={{ fontSize: '1rem' }}>{inputValue || '(empty)'}</div>
          </div>
          <div className="stat-card">
            <div className="label">Previous Value</div>
            <div className="value" style={{ fontSize: '1rem', color: '#9ca3af' }}>
              {previousValue.current || '(empty)'}
            </div>
          </div>
          <div className="stat-card">
            <div className="label">Render Count</div>
            <div className="value">{renderCount.current}</div>
          </div>
        </div>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Storing Interval ID</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Store the interval ID in a ref to properly clear it later.
        </p>
        
        <div className="result-display" style={{ textAlign: 'center' }}>
          <div className="result-label">Timer</div>
          <div className="result-value" style={{ fontSize: '3rem' }}>{count}s</div>
        </div>
        
        <div className="button-group" style={{ marginTop: '16px', justifyContent: 'center' }}>
          <button 
            className="btn btn-small" 
            onClick={startTimer}
            disabled={isRunning}
          >
            Start
          </button>
          <button 
            className="btn btn-small" 
            onClick={stopTimer}
            disabled={!isRunning}
          >
            Stop
          </button>
          <button className="btn btn-small btn-secondary" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>

      <div 
        ref={videoRef}
        className="wizard-card" 
        style={{ marginTop: '100px', textAlign: 'center' }}
      >
        <div className="name">Scroll Target Element</div>
        <p style={{ color: '#9ca3af', marginTop: '8px' }}>
          You scrolled here using ref.current.scrollIntoView()
        </p>
      </div>

      <div className="info-box warning">
        <h5>⚠️ ref.current Changes Don't Trigger Re-renders</h5>
        <p>
          Unlike state, changing ref.current doesn't cause the component to re-render.
          This is intentional — use refs for values that shouldn't affect the UI directly.
        </p>
      </div>

      <div className="demo-section">
        <h3>useRef vs useState</h3>
        <div className="code-block">
          <pre>{`// useState: Value changes → Re-render
const [count, setCount] = useState(0)
setCount(1) // Component re-renders!

// useRef: Value changes → NO re-render
const countRef = useRef(0)
countRef.current = 1 // Nothing happens to UI`}</pre>
        </div>
      </div>
    </div>
  )
}
