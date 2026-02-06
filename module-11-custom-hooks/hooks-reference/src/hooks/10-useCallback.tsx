import { useCallback, useState, memo } from 'react'

// Memoized child component - only re-renders if props change
const SpellButton = memo(function SpellButton({ 
  spell, 
  onCast 
}: { 
  spell: string
  onCast: (spell: string) => void 
}) {
  console.log(`🔮 SpellButton rendered: ${spell}`)
  
  return (
    <button 
      className="btn btn-small"
      onClick={() => onCast(spell)}
      style={{ margin: '4px' }}
    >
      Cast {spell}
    </button>
  )
})

// Another memoized component
const WizardStats = memo(function WizardStats({ 
  name,
  onLevelUp 
}: { 
  name: string
  onLevelUp: () => void 
}) {
  console.log(`📊 WizardStats rendered for: ${name}`)
  
  return (
    <div className="wizard-card">
      <div className="name">{name}</div>
      <button className="btn btn-small" onClick={onLevelUp} style={{ marginTop: '12px' }}>
        Level Up
      </button>
    </div>
  )
})

export default function UseCallbackDemo() {
  const [castLog, setCastLog] = useState<string[]>([])
  const [level, setLevel] = useState(1)
  const [mana, setMana] = useState(100)
  const [useOptimized, setUseOptimized] = useState(true)

  // ❌ Without useCallback: New function every render
  // This causes SpellButton to re-render even when nothing changed
  const handleCastUnoptimized = (spell: string) => {
    setCastLog(prev => [...prev.slice(-4), `Cast ${spell}!`])
  }

  // ✅ With useCallback: Same function reference across renders
  const handleCastOptimized = useCallback((spell: string) => {
    setCastLog(prev => [...prev.slice(-4), `Cast ${spell}!`])
  }, []) // Empty deps = function never changes

  // Choose which handler to use based on toggle
  const handleCast = useOptimized ? handleCastOptimized : handleCastUnoptimized

  // Memoized handler with dependency
  const handleLevelUp = useCallback(() => {
    setLevel(l => l + 1)
  }, [])

  const spells = ['Fireball', 'Ice Storm', 'Lightning', 'Heal']

  return (
    <div>
      <div className="hook-header">
        <span className="hook-category">Performance Hook</span>
        <h2>useCallback</h2>
        <p className="hook-description">
          Returns a memoized callback function. The function only changes when dependencies 
          change. Essential for passing callbacks to optimized child components (React.memo) 
          to prevent unnecessary re-renders.
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`const memoizedCallback = useCallback(
  (arg) => {
    doSomething(arg, dependency)
  },
  [dependency]
)`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>The Problem It Solves</h3>
        <div className="code-block">
          <pre>{`// ❌ Without useCallback
function Parent() {
  // New function created every render!
  const handleClick = () => { ... }
  
  // Child re-renders even if nothing else changed
  return <MemoizedChild onClick={handleClick} />
}

// ✅ With useCallback
function Parent() {
  // Same function reference across renders
  const handleClick = useCallback(() => { ... }, [])
  
  // Child only re-renders when handleClick actually changes
  return <MemoizedChild onClick={handleClick} />
}`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>When to Use</h3>
        <ul className="demo-list" style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            Passing callbacks to memoized children (React.memo)
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            Callbacks used in dependency arrays of other hooks
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            Event handlers for many list items
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            Functions passed to useEffect dependencies
          </li>
        </ul>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Callback Optimization</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Check the console to see which components re-render. Toggle optimization 
          to see the difference.
        </p>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={useOptimized}
              onChange={(e) => setUseOptimized(e.target.checked)}
            />
            <span>Use useCallback optimization</span>
          </label>
        </div>
        
        <div className="stat-grid">
          <div className="stat-card">
            <div className="label">Level</div>
            <div className="value">{level}</div>
          </div>
          <div className="stat-card">
            <div className="label">Mana</div>
            <div className="value">{mana}</div>
          </div>
        </div>
        
        <div style={{ marginTop: '16px' }}>
          <div className="result-label" style={{ marginBottom: '8px' }}>Spell Buttons (check console)</div>
          <div>
            {spells.map(spell => (
              <SpellButton key={spell} spell={spell} onCast={handleCast} />
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '16px' }}>
          <button 
            className="btn btn-small btn-secondary"
            onClick={() => setMana(m => m - 10)}
          >
            Use Mana (-10)
          </button>
          <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '8px' }}>
            {useOptimized 
              ? '✅ SpellButtons should NOT re-render when mana changes'
              : '❌ SpellButtons WILL re-render (check console)'}
          </p>
        </div>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Memoized Child with Callback</h4>
        
        <WizardStats name="Apprentice Wizard" onLevelUp={handleLevelUp} />
        
        <div className="result-display" style={{ marginTop: '16px' }}>
          <div className="result-label">Cast Log</div>
          {castLog.length > 0 ? (
            castLog.map((log, i) => (
              <div key={i} style={{ color: '#4ade80' }}>{log}</div>
            ))
          ) : (
            <div style={{ color: '#6b7280' }}>Cast some spells!</div>
          )}
        </div>
      </div>

      <div className="demo-section">
        <h3>useCallback + React.memo Pattern</h3>
        <div className="code-block">
          <pre>{`// 1. Memoize the child component
const Child = memo(function Child({ onClick }) {
  console.log('Child rendered')
  return <button onClick={onClick}>Click</button>
})

// 2. Memoize the callback in parent
function Parent() {
  const [count, setCount] = useState(0)
  
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, []) // Stable reference
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      {/* Child won't re-render when count changes */}
      <Child onClick={handleClick} />
    </div>
  )
}`}</pre>
        </div>
      </div>

      <div className="info-box warning">
        <h5>⚠️ Common Mistake: Missing Dependencies</h5>
        <div className="code-block" style={{ marginTop: '12px' }}>
          <pre>{`// ❌ Bug: Using stale value
const [count, setCount] = useState(0)
const handleClick = useCallback(() => {
  console.log(count) // Always logs initial value!
}, []) // Missing count dependency

// ✅ Correct: Include all dependencies
const handleClick = useCallback(() => {
  console.log(count) // Logs current value
}, [count])`}</pre>
        </div>
      </div>

      <div className="info-box">
        <h5>💡 useCallback vs useMemo</h5>
        <p>They're equivalent for functions:</p>
        <div className="code-block" style={{ marginTop: '12px' }}>
          <pre>{`// These are identical
useCallback(fn, deps)
useMemo(() => fn, deps)

// useCallback is just syntactic sugar for memoizing functions`}</pre>
        </div>
      </div>
    </div>
  )
}
