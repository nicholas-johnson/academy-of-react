import { useDebugValue, useState, useEffect, useSyncExternalStore, useCallback } from 'react'

// Custom hook with debug value
function useOnlineStatus() {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener('online', callback)
    window.addEventListener('offline', callback)
    return () => {
      window.removeEventListener('online', callback)
      window.removeEventListener('offline', callback)
    }
  }, [])
  
  const isOnline = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  )
  
  // Shows "Online" or "Offline" in React DevTools
  useDebugValue(isOnline ? 'Online' : 'Offline')
  
  return isOnline
}

// Custom hook with formatted debug value
interface Wizard {
  name: string
  level: number
  health: number
  mana: number
}

function useWizard(initialWizard: Wizard) {
  const [wizard, setWizard] = useState(initialWizard)
  
  // Expensive formatting only runs when DevTools is open
  useDebugValue(wizard, (w) => `${w.name} (Lvl ${w.level}) - HP: ${w.health}/${100}`)
  
  const takeDamage = (amount: number) => {
    setWizard(prev => ({ ...prev, health: Math.max(0, prev.health - amount) }))
  }
  
  const heal = (amount: number) => {
    setWizard(prev => ({ ...prev, health: Math.min(100, prev.health + amount) }))
  }
  
  const levelUp = () => {
    setWizard(prev => ({ ...prev, level: prev.level + 1, health: 100, mana: 100 }))
  }
  
  return { wizard, takeDamage, heal, levelUp, setWizard }
}

// Custom hook for localStorage with debug value
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  
  // Show key and current value in DevTools
  useDebugValue({ key, value })
  
  return [value, setValue] as const
}

// Custom hook for fetch with debug value
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    setLoading(true)
    setError(null)
    
    // Simulate fetch
    const timeoutId = setTimeout(() => {
      setData({ message: 'Simulated data from ' + url } as T)
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout(timeoutId)
  }, [url])
  
  // Complex debug value with deferred formatting
  useDebugValue(
    { loading, hasData: !!data, hasError: !!error },
    (debug) => {
      if (debug.loading) return 'Loading...'
      if (debug.hasError) return 'Error!'
      if (debug.hasData) return 'Data loaded'
      return 'Idle'
    }
  )
  
  return { data, loading, error }
}

export default function UseDebugValueDemo() {
  const isOnline = useOnlineStatus()
  const { wizard, takeDamage, heal, levelUp } = useWizard({
    name: 'Merlin',
    level: 1,
    health: 100,
    mana: 80
  })
  const [savedName, setSavedName] = useLocalStorage('wizard-name', 'Apprentice')
  const { data, loading } = useFetch<{ message: string }>('/api/spells')

  return (
    <div>
      <div className="hook-header">
        <span className="hook-category">Other Hook</span>
        <h2>useDebugValue</h2>
        <p className="hook-description">
          Displays a label for custom hooks in React DevTools. Helps developers 
          understand the current state of custom hooks during debugging. Only 
          useful for shared library hooks.
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`// Simple value
useDebugValue(value)
// Shows: value in DevTools

// With formatter (deferred - only runs when DevTools inspects)
useDebugValue(value, (v) => formatValue(v))
// Formatter only called when DevTools is open`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>When to Use</h3>
        <ul className="demo-list" style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Shared library hooks</strong> — Hooks used by many developers
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Complex internal state</strong> — When hook state isn't obvious
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Debugging custom hooks</strong> — During development
          </li>
        </ul>
        
        <div className="info-box warning" style={{ marginTop: '16px' }}>
          <h5>⚠️ Not for every hook!</h5>
          <p>
            Only add useDebugValue to hooks that are part of shared libraries. 
            For internal application hooks, it's usually not worth the overhead.
          </p>
        </div>
      </div>

      <div className="interactive-demo">
        <h4>Open React DevTools to See Debug Values!</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          The custom hooks below all have useDebugValue. Open React DevTools 
          (Components tab) and select this component to see the debug labels.
        </p>
        
        <div className="wizard-card">
          <h5 style={{ color: '#a5b4fc', marginBottom: '12px' }}>useOnlineStatus</h5>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px'
          }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%',
              background: isOnline ? '#22c55e' : '#ef4444'
            }} />
            <span>Status: {isOnline ? 'Online' : 'Offline'}</span>
          </div>
          <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '8px' }}>
            Debug value shows: "{isOnline ? 'Online' : 'Offline'}"
          </p>
        </div>
        
        <div className="wizard-card" style={{ marginTop: '16px' }}>
          <h5 style={{ color: '#a5b4fc', marginBottom: '12px' }}>useWizard</h5>
          <div className="name">{wizard.name}</div>
          <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
            Level {wizard.level} • Health {wizard.health}/100
          </div>
          <div className="button-group" style={{ marginTop: '12px' }}>
            <button className="btn btn-small" onClick={() => takeDamage(15)}>
              Take Damage
            </button>
            <button className="btn btn-small" onClick={() => heal(20)}>
              Heal
            </button>
            <button className="btn btn-small" onClick={levelUp}>
              Level Up
            </button>
          </div>
          <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '12px' }}>
            Debug value shows: "{wizard.name} (Lvl {wizard.level}) - HP: {wizard.health}/100"
          </p>
        </div>
        
        <div className="wizard-card" style={{ marginTop: '16px' }}>
          <h5 style={{ color: '#a5b4fc', marginBottom: '12px' }}>useLocalStorage</h5>
          <div className="form-group">
            <label>Saved Wizard Name</label>
            <input
              className="input"
              value={savedName}
              onChange={(e) => setSavedName(e.target.value)}
            />
          </div>
          <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>
            Debug value shows: {`{ key: "wizard-name", value: "${savedName}" }`}
          </p>
        </div>
        
        <div className="wizard-card" style={{ marginTop: '16px' }}>
          <h5 style={{ color: '#a5b4fc', marginBottom: '12px' }}>useFetch</h5>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="spinner" />
              <span>Loading...</span>
            </div>
          ) : (
            <div style={{ color: '#4ade80' }}>{data?.message}</div>
          )}
          <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '8px' }}>
            Debug value shows: "{loading ? 'Loading...' : 'Data loaded'}"
          </p>
        </div>
      </div>

      <div className="demo-section">
        <h3>Deferred Formatting</h3>
        <div className="code-block">
          <pre>{`// ❌ Expensive formatting runs every render
useDebugValue(Date.now())  // Converts to string every time

// ✅ Formatter only runs when DevTools inspects
useDebugValue(data, (d) => {
  // This expensive operation only runs 
  // when DevTools is actually open
  return expensiveFormatting(d)
})`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>Example Implementation</h3>
        <div className="code-block">
          <pre>{`function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // ... fetch auth state
  }, [])
  
  // Helpful debug label
  useDebugValue(
    user,
    (u) => u ? \`Logged in as \${u.name}\` : 'Not authenticated'
  )
  
  return { user, loading, login, logout }
}

// In React DevTools, you'll see:
// useAuth: "Logged in as John" 
// or
// useAuth: "Not authenticated"`}</pre>
        </div>
      </div>

      <div className="info-box">
        <h5>💡 Tips</h5>
        <ul>
          <li>Keep debug values concise and informative</li>
          <li>Use the formatter function for expensive formatting</li>
          <li>Only useful when using React DevTools</li>
          <li>Has no effect on production builds (tree-shaken)</li>
          <li>Best for library authors, not application code</li>
        </ul>
      </div>
    </div>
  )
}
