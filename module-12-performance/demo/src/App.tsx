import { useState, useMemo, useCallback, memo } from 'react'
import './App.css'

// Expensive calculation simulation
function calculatePower(number: number): number {
  console.log('🔥 Calculating power...')
  let result = 0
  for (let i = 0; i < 100000000; i++) {
    result += Math.sqrt(number)
  }
  return Math.floor(result)
}

// Child component WITHOUT memo (re-renders on every parent render)
function UnoptimizedChild({ count }: { count: number }) {
  console.log('❌ UnoptimizedChild rendered')
  return (
    <div className="child-box unoptimized">
      <h4>Without memo</h4>
      <p>Renders: Every time</p>
      <p>Count: {count}</p>
    </div>
  )
}

// Child component WITH memo (only re-renders when props change)
const OptimizedChild = memo(({ count }: { count: number }) => {
  console.log('✅ OptimizedChild rendered')
  return (
    <div className="child-box optimized">
      <h4>With memo</h4>
      <p>Renders: Only on prop change</p>
      <p>Count: {count}</p>
    </div>
  )
})

function App() {
  const [count, setCount] = useState(5)
  const [color, setColor] = useState('blue')

  // WITHOUT useMemo - recalculates on every render
  const slowPowerWithout = calculatePower(count)
  
  // WITH useMemo - only recalculates when count changes
  const slowPowerWith = useMemo(() => calculatePower(count), [count])

  // WITHOUT useCallback - new function on every render
  const handleClickWithout = () => {
    console.log('Clicked')
  }

  // WITH useCallback - stable function reference
  const handleClickWith = useCallback(() => {
    console.log('Clicked')
  }, [])

  return (
    <div className="app">
      <h1>⚡ Performance Optimization</h1>
      <p>Open console to see render behavior</p>

      <div className="demo-section">
        <h3>1. useMemo for Expensive Calculations</h3>
        <p className="hint">Notice console logs - one fires twice!</p>
        <div className="stat-display">
          <div>Without useMemo: <strong>{slowPowerWithout}</strong></div>
          <div>With useMemo: <strong>{slowPowerWith}</strong></div>
        </div>
        <div className="button-group">
          <button onClick={() => setCount(count + 1)} className="btn">
            Change Count (recalculates)
          </button>
          <button onClick={() => setColor(color === 'blue' ? 'red' : 'blue')} className="btn btn-secondary">
            Change Color (no recalc needed)
          </button>
        </div>
      </div>

      <div className="demo-section">
        <h3>2. React.memo for Component Optimization</h3>
        <p className="hint">Change color - unoptimized re-renders unnecessarily</p>
        <div className="children-grid">
          <UnoptimizedChild count={count} />
          <OptimizedChild count={count} />
        </div>
      </div>

      <div className="info-box">
        <h3>🔑 Performance Rules</h3>
        <ul>
          <li><strong>useMemo</strong>: Cache expensive calculation results</li>
          <li><strong>useCallback</strong>: Stabilize function references</li>
          <li><strong>React.memo</strong>: Prevent unnecessary component re-renders</li>
          <li><strong>When to use</strong>: Profile first, optimize bottlenecks only</li>
          <li><strong>Premature optimization</strong>: Usually unnecessary!</li>
        </ul>
      </div>
    </div>
  )
}

export default App
