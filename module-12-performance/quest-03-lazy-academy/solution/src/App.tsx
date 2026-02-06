import { useState, lazy, Suspense } from 'react'
import './App.css'

// Lazy load components - only load when needed
const SpellLibrary = lazy(() => import('./components/SpellLibrary'))
const BattleArena = lazy(() => import('./components/BattleArena'))
const StudentRoster = lazy(() => import('./components/StudentRoster'))

type Tab = 'home' | 'spells' | 'battle' | 'roster'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')

  return (
    <div className="app">
      <header className="header">
        <h1>🏰 Lazy Academy</h1>
        <p>Code splitting with React.lazy and Suspense</p>
      </header>

      <nav className="tabs">
        <button
          onClick={() => setActiveTab('home')}
          className={activeTab === 'home' ? 'tab active' : 'tab'}
        >
          🏠 Home
        </button>
        <button
          onClick={() => setActiveTab('spells')}
          className={activeTab === 'spells' ? 'tab active' : 'tab'}
        >
          📚 Spells
        </button>
        <button
          onClick={() => setActiveTab('battle')}
          className={activeTab === 'battle' ? 'tab active' : 'tab'}
        >
          ⚔️ Battle
        </button>
        <button
          onClick={() => setActiveTab('roster')}
          className={activeTab === 'roster' ? 'tab active' : 'tab'}
        >
          👥 Roster
        </button>
      </nav>

      <main className="content">
        {activeTab === 'home' && (
          <div className="home-section">
            <h2>Welcome to Lazy Academy!</h2>
            <p>Click tabs above to load different sections.</p>
            <p className="info">Components load on-demand with React.lazy</p>
            
            <div className="features">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Faster Initial Load</h3>
                <p>Only load code for home page initially</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📦</div>
                <h3>Smaller Bundles</h3>
                <p>Split code into separate chunks</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Better UX</h3>
                <p>Users only download what they need</p>
              </div>
            </div>
          </div>
        )}

        <Suspense fallback={<LoadingFallback message="Loading component..." />}>
          {activeTab === 'spells' && <SpellLibrary />}
          {activeTab === 'battle' && <BattleArena />}
          {activeTab === 'roster' && <StudentRoster />}
        </Suspense>
      </main>

      <div className="info-box">
        <h3>🔑 Code Splitting Benefits</h3>
        <ul>
          <li><strong>React.lazy()</strong>: Dynamically imports components</li>
          <li><strong>Suspense</strong>: Shows fallback while loading</li>
          <li><strong>Automatic</strong>: Vite creates separate chunks</li>
          <li><strong>Network tab</strong>: Open DevTools to see chunks load</li>
          <li>Try clicking tabs - watch Network tab for new JS files!</li>
        </ul>
      </div>
    </div>
  )
}

function LoadingFallback({ message }: { message: string }) {
  return (
    <div className="loading-fallback">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  )
}

export default App
