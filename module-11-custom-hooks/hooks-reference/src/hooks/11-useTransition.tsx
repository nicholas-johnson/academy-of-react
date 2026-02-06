import { useTransition, useState } from 'react'

// Simulate expensive list rendering
function SlowList({ text }: { text: string }) {
  const items = []
  for (let i = 0; i < 500; i++) {
    items.push(
      <li 
        key={i} 
        style={{ 
          padding: '4px 8px',
          background: text && `Spell ${i}`.toLowerCase().includes(text.toLowerCase()) 
            ? 'rgba(102, 126, 234, 0.3)' 
            : 'transparent',
          transition: 'background 0.2s'
        }}
      >
        Spell {i}: {text ? `Contains "${text}"?` : 'Enter search term'}
      </li>
    )
  }
  return <ul style={{ maxHeight: '300px', overflow: 'auto', listStyle: 'none' }}>{items}</ul>
}

// Tab content components
function BattleTab() {
  return (
    <div className="wizard-card">
      <div className="name">Battle Arena</div>
      <p style={{ color: '#9ca3af', marginTop: '8px' }}>
        View ongoing battles and start new duels.
      </p>
      <div className="stat-grid" style={{ marginTop: '16px' }}>
        <div className="stat-card">
          <div className="label">Active Battles</div>
          <div className="value">12</div>
        </div>
        <div className="stat-card">
          <div className="label">Your Wins</div>
          <div className="value">8</div>
        </div>
      </div>
    </div>
  )
}

function SpellsTab() {
  // Simulate slow render
  const items = Array.from({ length: 1000 }, (_, i) => (
    <div key={i} style={{ padding: '2px 0', fontSize: '0.85rem', color: '#9ca3af' }}>
      Spell #{i + 1}
    </div>
  ))
  
  return (
    <div className="wizard-card">
      <div className="name">Spell Library</div>
      <div style={{ maxHeight: '200px', overflow: 'auto', marginTop: '12px' }}>
        {items}
      </div>
    </div>
  )
}

function InventoryTab() {
  return (
    <div className="wizard-card">
      <div className="name">Inventory</div>
      <ul className="demo-list" style={{ marginTop: '12px' }}>
        <li>Health Potion x5</li>
        <li>Mana Crystal x3</li>
        <li>Magic Scroll x2</li>
      </ul>
    </div>
  )
}

export default function UseTransitionDemo() {
  const [isPending, startTransition] = useTransition()
  const [searchText, setSearchText] = useState('')
  const [filterText, setFilterText] = useState('')
  const [activeTab, setActiveTab] = useState('battle')

  // Handle input change with transition
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    // Urgent: Update input immediately
    setSearchText(value)
    
    // Non-urgent: Filter list can wait
    startTransition(() => {
      setFilterText(value)
    })
  }

  // Tab switching with transition
  const handleTabChange = (tab: string) => {
    startTransition(() => {
      setActiveTab(tab)
    })
  }

  const tabs = [
    { id: 'battle', label: 'Battle' },
    { id: 'spells', label: 'Spells (slow)' },
    { id: 'inventory', label: 'Inventory' }
  ]

  return (
    <div>
      <div className="hook-header">
        <span className="hook-category">Performance Hook</span>
        <h2>useTransition</h2>
        <p className="hook-description">
          Marks state updates as non-urgent "transitions", allowing urgent updates 
          (like typing) to interrupt them. Keeps your UI responsive during expensive 
          re-renders by showing pending state.
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`const [isPending, startTransition] = useTransition()

function handleClick() {
  // Wrap non-urgent updates in startTransition
  startTransition(() => {
    setExpensiveState(newValue)
  })
}

// isPending is true while transition is running
{isPending && <Spinner />}`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>When to Use</h3>
        <ul className="demo-list" style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Search/filter with large lists</strong> — Keep input responsive
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Tab switching</strong> — Show stale content while loading new tab
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Any expensive re-render</strong> — That shouldn't block user input
          </li>
        </ul>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Responsive Search</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Type quickly — the input stays responsive while the list update is deferred.
        </p>
        
        <div className="form-group">
          <label>Search (type fast!)</label>
          <div style={{ position: 'relative' }}>
            <input
              className="input"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search spells..."
              style={{ paddingRight: '40px' }}
            />
            {isPending && (
              <span 
                className="spinner" 
                style={{ 
                  position: 'absolute', 
                  right: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px'
                }} 
              />
            )}
          </div>
        </div>
        
        <div style={{ opacity: isPending ? 0.7 : 1, transition: 'opacity 0.2s' }}>
          <SlowList text={filterText} />
        </div>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Tab Navigation</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Click "Spells" tab — UI stays interactive while slow content loads.
        </p>
        
        <div className="button-group" style={{ marginBottom: '16px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`btn btn-small ${activeTab === tab.id ? '' : 'btn-secondary'}`}
              onClick={() => handleTabChange(tab.id)}
              style={{ 
                opacity: isPending && activeTab !== tab.id ? 0.7 : 1,
              }}
            >
              {tab.label}
            </button>
          ))}
          {isPending && <span className="spinner" style={{ marginLeft: '8px' }} />}
        </div>
        
        <div style={{ opacity: isPending ? 0.7 : 1, transition: 'opacity 0.2s' }}>
          {activeTab === 'battle' && <BattleTab />}
          {activeTab === 'spells' && <SpellsTab />}
          {activeTab === 'inventory' && <InventoryTab />}
        </div>
      </div>

      <div className="demo-section">
        <h3>How It Works</h3>
        <div className="code-block">
          <pre>{`function Search() {
  const [isPending, startTransition] = useTransition()
  const [inputValue, setInputValue] = useState('')
  const [results, setResults] = useState([])

  const handleChange = (e) => {
    const value = e.target.value
    
    // 1. Update input immediately (urgent)
    setInputValue(value)
    
    // 2. Update results with lower priority (transition)
    startTransition(() => {
      // This update can be interrupted by more typing
      setResults(filterResults(value))
    })
  }

  return (
    <>
      <input value={inputValue} onChange={handleChange} />
      {isPending ? <Spinner /> : <Results data={results} />}
    </>
  )
}`}</pre>
        </div>
      </div>

      <div className="info-box">
        <h5>💡 useTransition vs useDeferredValue</h5>
        <ul>
          <li><strong>useTransition</strong> — You control when to defer (wrap setState)</li>
          <li><strong>useDeferredValue</strong> — React defers a value you pass to it</li>
          <li>Use useTransition when you own the state update</li>
          <li>Use useDeferredValue when you receive a value as prop</li>
        </ul>
      </div>

      <div className="info-box warning">
        <h5>⚠️ Important Notes</h5>
        <ul>
          <li>Only works with concurrent features (React 18+)</li>
          <li>The function passed to startTransition must be synchronous</li>
          <li>Transitions can be interrupted by more urgent updates</li>
          <li>Don't use for data fetching — use Suspense instead</li>
        </ul>
      </div>
    </div>
  )
}
