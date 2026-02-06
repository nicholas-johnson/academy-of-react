import { useSyncExternalStore, useCallback, useState } from 'react'

// Example 1: Simple external store (like a mini-Redux)
type Listener = () => void

function createStore<T>(initialState: T) {
  let state = initialState
  const listeners = new Set<Listener>()
  
  return {
    getState: () => state,
    setState: (newState: T | ((prev: T) => T)) => {
      state = typeof newState === 'function' 
        ? (newState as (prev: T) => T)(state) 
        : newState
      listeners.forEach(listener => listener())
    },
    subscribe: (listener: Listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    }
  }
}

// Create a wizard stats store
interface WizardStats {
  health: number
  mana: number
  gold: number
}

const wizardStore = createStore<WizardStats>({
  health: 100,
  mana: 80,
  gold: 50
})

// Hook to use the store
function useWizardStats() {
  return useSyncExternalStore(
    wizardStore.subscribe,
    wizardStore.getState
  )
}

// Example 2: Browser API - Online status
function useOnlineStatus() {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener('online', callback)
    window.addEventListener('offline', callback)
    return () => {
      window.removeEventListener('online', callback)
      window.removeEventListener('offline', callback)
    }
  }, [])
  
  const getSnapshot = useCallback(() => navigator.onLine, [])
  
  // Server snapshot for SSR
  const getServerSnapshot = useCallback(() => true, [])
  
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

// Example 3: Window dimensions
function useWindowDimensions() {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
  }, [])
  
  const getSnapshot = useCallback(() => ({
    width: window.innerWidth,
    height: window.innerHeight
  }), [])
  
  // Return a stable reference for SSR
  const getServerSnapshot = useCallback(() => ({
    width: 1024,
    height: 768
  }), [])
  
  return useSyncExternalStore(
    subscribe, 
    () => JSON.stringify(getSnapshot()),
    () => JSON.stringify(getServerSnapshot())
  )
}

// Components using the stores
function WizardStatsDisplay() {
  const stats = useWizardStats()
  
  return (
    <div className="stat-grid">
      <div className="stat-card">
        <div className="label">Health</div>
        <div className="value" style={{ color: stats.health < 30 ? '#ef4444' : '#4ade80' }}>
          {stats.health}
        </div>
      </div>
      <div className="stat-card">
        <div className="label">Mana</div>
        <div className="value" style={{ color: '#8b5cf6' }}>{stats.mana}</div>
      </div>
      <div className="stat-card">
        <div className="label">Gold</div>
        <div className="value" style={{ color: '#fbbf24' }}>{stats.gold}</div>
      </div>
    </div>
  )
}

function OnlineIndicator() {
  const isOnline = useOnlineStatus()
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      padding: '12px 16px',
      background: isOnline ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
      borderRadius: '8px',
      border: `1px solid ${isOnline ? '#22c55e' : '#ef4444'}`
    }}>
      <div style={{ 
        width: '12px', 
        height: '12px', 
        borderRadius: '50%',
        background: isOnline ? '#22c55e' : '#ef4444'
      }} />
      <span>{isOnline ? 'Online' : 'Offline'}</span>
    </div>
  )
}

function WindowSizeDisplay() {
  const dimensionsJson = useWindowDimensions()
  const dimensions = JSON.parse(dimensionsJson)
  
  return (
    <div className="stat-grid">
      <div className="stat-card">
        <div className="label">Width</div>
        <div className="value" style={{ fontSize: '1.2rem' }}>{dimensions.width}px</div>
      </div>
      <div className="stat-card">
        <div className="label">Height</div>
        <div className="value" style={{ fontSize: '1.2rem' }}>{dimensions.height}px</div>
      </div>
    </div>
  )
}

export default function UseSyncExternalStoreDemo() {
  const [, forceRender] = useState(0)

  const handleDamage = () => {
    wizardStore.setState(prev => ({ ...prev, health: Math.max(0, prev.health - 10) }))
  }
  
  const handleHeal = () => {
    wizardStore.setState(prev => ({ ...prev, health: Math.min(100, prev.health + 15) }))
  }
  
  const handleCastSpell = () => {
    wizardStore.setState(prev => ({ ...prev, mana: Math.max(0, prev.mana - 20) }))
  }
  
  const handleAddGold = () => {
    wizardStore.setState(prev => ({ ...prev, gold: prev.gold + 25 }))
  }

  return (
    <div>
      <div className="hook-header">
        <span className="hook-category">Other Hook</span>
        <h2>useSyncExternalStore</h2>
        <p className="hook-description">
          Subscribe to external stores (state management libraries, browser APIs, 
          or custom stores) in a way that's compatible with concurrent React features. 
          Ensures consistent reads during rendering.
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`const state = useSyncExternalStore(
  subscribe,      // Function to subscribe to store changes
  getSnapshot,    // Function to get current value
  getServerSnapshot? // Optional: value for server rendering
)

// Example
const isOnline = useSyncExternalStore(
  (callback) => {
    window.addEventListener('online', callback)
    return () => window.removeEventListener('online', callback)
  },
  () => navigator.onLine,
  () => true  // Server always assumes online
)`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>When to Use</h3>
        <ul className="demo-list" style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>State management libraries</strong> — Redux, Zustand, MobX
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Browser APIs</strong> — Online status, media queries, geolocation
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Custom external stores</strong> — Shared state outside React
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Third-party data sources</strong> — WebSocket connections
          </li>
        </ul>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Custom Store</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          This external store works like a mini-Redux. Multiple components can 
          subscribe and stay in sync.
        </p>
        
        <WizardStatsDisplay />
        
        <div className="button-group" style={{ marginTop: '16px' }}>
          <button className="btn btn-small" onClick={handleDamage}>
            Take Damage
          </button>
          <button className="btn btn-small" onClick={handleHeal}>
            Heal
          </button>
          <button className="btn btn-small" onClick={handleCastSpell}>
            Cast Spell
          </button>
          <button className="btn btn-small" onClick={handleAddGold}>
            Find Gold
          </button>
        </div>
        
        <div style={{ marginTop: '16px' }}>
          <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>
            Another instance of WizardStatsDisplay (both stay in sync):
          </p>
          <WizardStatsDisplay />
        </div>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Browser Online Status</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Toggle your network connection (or use DevTools) to see this update.
        </p>
        
        <OnlineIndicator />
      </div>

      <div className="interactive-demo">
        <h4>Try It: Window Dimensions</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Resize your browser window to see live updates.
        </p>
        
        <WindowSizeDisplay />
      </div>

      <div className="demo-section">
        <h3>Creating an External Store</h3>
        <div className="code-block">
          <pre>{`function createStore(initialState) {
  let state = initialState
  const listeners = new Set()
  
  return {
    getState: () => state,
    
    setState: (newState) => {
      state = newState
      // Notify all subscribers
      listeners.forEach(listener => listener())
    },
    
    subscribe: (listener) => {
      listeners.add(listener)
      // Return unsubscribe function
      return () => listeners.delete(listener)
    }
  }
}

// Use in component
const store = createStore({ count: 0 })

function Counter() {
  const state = useSyncExternalStore(
    store.subscribe,
    store.getState
  )
  return <div>{state.count}</div>
}`}</pre>
        </div>
      </div>

      <div className="info-box warning">
        <h5>⚠️ Important Requirements</h5>
        <ul>
          <li><strong>getSnapshot must return immutable data</strong> — Or same reference if unchanged</li>
          <li><strong>subscribe must return cleanup function</strong></li>
          <li><strong>getServerSnapshot required for SSR</strong> — Must not call browser APIs</li>
          <li><strong>Memoize your functions</strong> — Avoid recreating on every render</li>
        </ul>
      </div>

      <div className="info-box">
        <h5>💡 When NOT to Use</h5>
        <ul>
          <li>Regular React state (use useState/useReducer)</li>
          <li>Props passed from parents (just use props)</li>
          <li>Context values (use useContext)</li>
          <li>Only use for truly external data sources</li>
        </ul>
      </div>
    </div>
  )
}
