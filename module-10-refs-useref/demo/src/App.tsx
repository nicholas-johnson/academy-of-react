import { useRef, useEffect } from 'react'
import './App.css'

function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<number>(0)

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleFlash = () => {
    if (divRef.current) {
      divRef.current.classList.add('flash')
      setTimeout(() => {
        divRef.current?.classList.remove('flash')
      }, 500)
    }
  }

  // Ref for values that don't trigger re-renders
  const handleCount = () => {
    countRef.current += 1
    console.log('Count (no re-render):', countRef.current)
  }

  return (
    <div className="app">
      <h1>🎯 useRef Demo</h1>
      <p>Direct DOM access and persistent values</p>

      <div className="demo-section">
        <h3>1. Auto-Focus Input</h3>
        <input 
          ref={inputRef}
          type="text"
          placeholder="This auto-focuses on mount"
          className="demo-input"
        />
      </div>

      <div className="demo-section">
        <h3>2. Trigger Animation</h3>
        <div ref={divRef} className="flash-box">
          Click button to flash
        </div>
        <button onClick={handleFlash} className="btn">
          Trigger Flash
        </button>
      </div>

      <div className="demo-section">
        <h3>3. Persistent Value (No Re-render)</h3>
        <button onClick={handleCount} className="btn">
          Increment Count (Check Console)
        </button>
        <p className="hint">Count: {countRef.current} (won't update in UI)</p>
      </div>

      <div className="info-box">
        <h3>🔑 useRef vs useState</h3>
        <ul>
          <li><strong>useRef</strong>: Doesn't trigger re-renders when changed</li>
          <li><strong>useState</strong>: Triggers re-renders when changed</li>
          <li>Use refs for: DOM access, timers, previous values</li>
          <li>Use state for: Data that affects the UI</li>
        </ul>
      </div>
    </div>
  )
}

export default App
