import { Routes, Route, Link, NavLink, useParams, useNavigate, Outlet } from 'react-router-dom'
import './App.css'

// Sample spell data
const spells = [
  { id: 1, name: 'Fireball', element: 'fire', power: 85, description: 'A blazing sphere of flame' },
  { id: 2, name: 'Ice Lance', element: 'ice', power: 70, description: 'A piercing shard of ice' },
  { id: 3, name: 'Thunder Strike', element: 'lightning', power: 90, description: 'Lightning from the heavens' },
  { id: 4, name: 'Healing Light', element: 'holy', power: 60, description: 'Restore vitality' },
]

// Layout component with navigation
function Layout() {
  return (
    <div className="app">
      <header className="header">
        <h1>🏰 Battle Academy</h1>
        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/spells" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Spells
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            About
          </NavLink>
        </nav>
      </header>
      
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}

// Home page
function Home() {
  return (
    <div className="page">
      <h2>Welcome to the Academy</h2>
      <p>Learn the ancient arts of React Router navigation!</p>
      
      <div className="info-cards">
        <div className="info-card">
          <span className="card-icon">🧭</span>
          <h3>Navigation</h3>
          <p>Use <code>Link</code> and <code>NavLink</code> to move between pages</p>
        </div>
        <div className="info-card">
          <span className="card-icon">🔗</span>
          <h3>URL Parameters</h3>
          <p>Dynamic routes with <code>useParams</code></p>
        </div>
        <div className="info-card">
          <span className="card-icon">📍</span>
          <h3>Nested Routes</h3>
          <p>Layouts with <code>Outlet</code></p>
        </div>
      </div>
      
      <div className="cta">
        <Link to="/spells" className="btn">Explore Spells →</Link>
      </div>
    </div>
  )
}

// Spells list page
function SpellList() {
  return (
    <div className="page">
      <h2>📜 Spell Library</h2>
      <p>Click a spell to view details</p>
      
      <div className="spell-grid">
        {spells.map(spell => (
          <Link key={spell.id} to={`/spells/${spell.id}`} className="spell-card">
            <span className="spell-element">{getElementEmoji(spell.element)}</span>
            <h3>{spell.name}</h3>
            <p>Power: {spell.power}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Spell detail page - uses useParams
function SpellDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const spell = spells.find(s => s.id === parseInt(id))
  
  if (!spell) {
    return (
      <div className="page">
        <h2>Spell Not Found</h2>
        <p>The spell you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/spells')} className="btn">
          ← Back to Spells
        </button>
      </div>
    )
  }
  
  return (
    <div className="page">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      
      <div className="spell-detail">
        <span className="detail-element">{getElementEmoji(spell.element)}</span>
        <h2>{spell.name}</h2>
        <p className="spell-description">{spell.description}</p>
        
        <div className="spell-stats">
          <div className="stat">
            <span className="stat-label">Element</span>
            <span className="stat-value">{spell.element}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Power</span>
            <span className="stat-value">{spell.power}</span>
          </div>
        </div>
        
        <div className="power-bar">
          <div className="power-fill" style={{ width: `${spell.power}%` }} />
        </div>
      </div>
    </div>
  )
}

// About page
function About() {
  const navigate = useNavigate()
  
  return (
    <div className="page">
      <h2>About the Academy</h2>
      <p>The Battle Academy teaches the ancient arts of React development.</p>
      
      <div className="about-content">
        <h3>What You'll Learn</h3>
        <ul>
          <li><code>BrowserRouter</code> — Wrap your app for routing</li>
          <li><code>Routes</code> & <code>Route</code> — Define paths</li>
          <li><code>Link</code> & <code>NavLink</code> — Navigation</li>
          <li><code>useParams</code> — Read URL parameters</li>
          <li><code>useNavigate</code> — Programmatic navigation</li>
          <li><code>Outlet</code> — Nested route rendering</li>
        </ul>
      </div>
      
      <button onClick={() => navigate('/')} className="btn">
        Return Home
      </button>
    </div>
  )
}

// 404 page
function NotFound() {
  return (
    <div className="page not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn">Go Home</Link>
    </div>
  )
}

// Helper function
function getElementEmoji(element) {
  const emojis = {
    fire: '🔥',
    ice: '❄️',
    lightning: '⚡',
    holy: '✨'
  }
  return emojis[element] || '🔮'
}

// Main App with routes
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="spells" element={<SpellList />} />
        <Route path="spells/:id" element={<SpellDetail />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
