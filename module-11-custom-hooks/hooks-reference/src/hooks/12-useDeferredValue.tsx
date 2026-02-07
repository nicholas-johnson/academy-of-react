import { useDeferredValue, useState, useMemo } from 'react'

// Expensive component that renders a large list
function SpellList({ searchTerm }: { searchTerm: string }) {
  const spells = useMemo(() => {
    // Simulate expensive filtering
    const allSpells = Array.from({ length: 5000 }, (_, i) => ({
      id: i,
      name: `Spell of ${['Fire', 'Ice', 'Lightning', 'Earth', 'Wind', 'Water'][i % 6]} #${i}`,
      power: Math.floor(Math.random() * 100)
    }))
    
    if (!searchTerm) return allSpells.slice(0, 50)
    
    return allSpells
      .filter(spell => spell.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 50)
  }, [searchTerm])

  return (
    <div>
      <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '12px' }}>
        Showing {spells.length} of 5000 spells
      </p>
      <ul style={{ maxHeight: '300px', overflow: 'auto', listStyle: 'none' }}>
        {spells.map(spell => (
          <li 
            key={spell.id}
            style={{ 
              padding: '8px 12px', 
              background: '#1f2937', 
              marginBottom: '4px',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>{spell.name}</span>
            <span style={{ color: '#667eea' }}>Power: {spell.power}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function UseDeferredValueDemo() {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Defer the search term - list uses "stale" value while typing
  const deferredSearchTerm = useDeferredValue(searchTerm)
  
  // Check if we're showing stale data
  const isStale = searchTerm !== deferredSearchTerm

  return (
    <div>
      <div className="hook-header">
        <span className="hook-category">Performance Hook</span>
        <h2>useDeferredValue</h2>
        <p className="hook-description">
          Defers updating a value until more urgent updates complete. React will first 
          render with the old value, then try to re-render with the new value in the 
          background. Useful when a value triggers expensive re-renders.
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`const deferredValue = useDeferredValue(value)

// deferredValue will "lag behind" value during rapid updates
// React prioritizes keeping the UI responsive`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>When to Use</h3>
        <ul className="demo-list" style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Props from parent</strong> — When you don't control the state update
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Expensive child renders</strong> — Show stale content while updating
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Search/filter inputs</strong> — Alternative to debouncing
          </li>
        </ul>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Deferred Search</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Type quickly — the input updates immediately while the list uses 
          the deferred (slightly stale) value.
        </p>
        
        <div className="form-group">
          <label>Search Spells (type fast!)</label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              className="input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search 5000 spells..."
            />
            {isStale && <span className="spinner" />}
          </div>
        </div>
        
        <div className="stat-grid" style={{ marginBottom: '16px' }}>
          <div className="stat-card">
            <div className="label">Current Value</div>
            <div className="value" style={{ fontSize: '0.9rem' }}>
              "{searchTerm || '(empty)'}"
            </div>
          </div>
          <div className="stat-card">
            <div className="label">Deferred Value</div>
            <div className="value" style={{ fontSize: '0.9rem', color: isStale ? '#f59e0b' : '#4ade80' }}>
              "{deferredSearchTerm || '(empty)'}"
            </div>
          </div>
        </div>
        
        <div style={{ opacity: isStale ? 0.7 : 1, transition: 'opacity 0.2s' }}>
          <SpellList searchTerm={deferredSearchTerm} />
        </div>
      </div>

      <div className="demo-section">
        <h3>How It Works</h3>
        <div className="code-block">
          <pre>{`function SearchResults({ query }) {
  // query changes frequently (every keystroke)
  const deferredQuery = useDeferredValue(query)
  
  // This will show stale results while new ones calculate
  return <ExpensiveList filter={deferredQuery} />
}

// Timeline during fast typing:
// 1. User types "f" → query="f", deferredQuery="" (stale)
// 2. User types "i" → query="fi", deferredQuery="f" (catching up)
// 3. User types "r" → query="fir", deferredQuery="fi" (still behind)
// 4. User pauses → query="fir", deferredQuery="fir" (synced!)`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>useDeferredValue vs useTransition</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="info-box">
            <h5>useDeferredValue</h5>
            <ul>
              <li>Defers a <strong>value</strong></li>
              <li>Use when you receive props</li>
              <li>No control over when to defer</li>
              <li>Simpler API</li>
            </ul>
            <div className="code-block" style={{ marginTop: '12px' }}>
              <pre>{`// Receive value, defer it
function Child({ query }) {
  const deferred = useDeferredValue(query)
  return <List filter={deferred} />
}`}</pre>
            </div>
          </div>
          <div className="info-box">
            <h5>useTransition</h5>
            <ul>
              <li>Defers a <strong>state update</strong></li>
              <li>Use when you own the state</li>
              <li>You control when to defer</li>
              <li>More explicit</li>
            </ul>
            <div className="code-block" style={{ marginTop: '12px' }}>
              <pre>{`// Own the state, defer update
function Parent() {
  const [, startTransition] = useTransition()
  startTransition(() => {
    setQuery(newQuery)
  })
}`}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Showing Stale Content</h3>
        <div className="code-block">
          <pre>{`function SearchPage() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  
  // Detect when showing stale data
  const isStale = query !== deferredQuery
  
  return (
    <>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      
      {/* Visual indicator of stale state */}
      <div style={{ 
        opacity: isStale ? 0.5 : 1,
        transition: 'opacity 0.2s'
      }}>
        <Results query={deferredQuery} />
      </div>
    </>
  )
}`}</pre>
        </div>
      </div>

      <div className="info-box success">
        <h5>✅ Benefits Over Debouncing</h5>
        <ul>
          <li><strong>No artificial delay</strong> — Updates as fast as possible</li>
          <li><strong>Interruptible</strong> — New input cancels stale renders</li>
          <li><strong>Integrated with React</strong> — Works with Suspense, concurrent features</li>
          <li><strong>Shows stale UI</strong> — Instead of nothing or spinner</li>
        </ul>
      </div>
    </div>
  )
}
