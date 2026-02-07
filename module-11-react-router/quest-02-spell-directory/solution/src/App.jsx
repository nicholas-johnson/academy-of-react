import { Routes, Route, NavLink, Outlet, Link, useParams, useNavigate } from 'react-router-dom'
import './App.css'

// Spell data
const spells = [
  { id: 1, name: 'Fireball', element: 'fire', power: 85, mana: 30, description: 'Hurls a blazing sphere of flame at your enemies, dealing massive fire damage.' },
  { id: 2, name: 'Ice Lance', element: 'ice', power: 70, mana: 25, description: 'Launches a piercing shard of ice that freezes enemies on impact.' },
  { id: 3, name: 'Thunder Strike', element: 'lightning', power: 90, mana: 40, description: 'Calls down lightning from the heavens to smite your foes.' },
  { id: 4, name: 'Healing Light', element: 'holy', power: 60, mana: 35, description: 'Bathes allies in holy light, restoring health and vitality.' },
  { id: 5, name: 'Shadow Bolt', element: 'dark', power: 75, mana: 30, description: 'Fires a bolt of dark energy that drains the life force of enemies.' },
  { id: 6, name: 'Earth Shield', element: 'earth', power: 50, mana: 20, description: 'Surrounds you with protective stones that absorb damage.' },
]

const elementEmojis = {
  fire: '🔥',
  ice: '❄️',
  lightning: '⚡',
  holy: '✨',
  dark: '🌑',
  earth: '🪨'
}

// Layout component
function Layout() {
  return (
    <div className="app">
      <header className="header">
        <h1>📜 Spell Directory</h1>
        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>
            Home
          </NavLink>
          <NavLink to="/spells" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Spells
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
      <h2>Welcome to the Spell Directory</h2>
      <p>Browse our collection of powerful spells. Click on any spell to see its details!</p>
      <div className="home-stats">
        <div className="stat-card">
          <span className="stat-number">{spells.length}</span>
          <span className="stat-label">Spells Available</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">6</span>
          <span className="stat-label">Elements</span>
        </div>
      </div>
      <Link to="/spells" className="btn" style={{ marginTop: '32px', display: 'inline-block' }}>
        Browse Spells →
      </Link>
    </div>
  )
}

// Spell list page
function SpellList() {
  return (
    <div className="page">
      <h2>All Spells</h2>
      <p>Click a spell to view its details</p>
      
      <div className="spell-grid">
        {spells.map(spell => (
          <Link key={spell.id} to={`/spells/${spell.id}`} className="spell-card">
            <span className="spell-emoji">{elementEmojis[spell.element]}</span>
            <h3>{spell.name}</h3>
            <div className="spell-meta">
              <span>Power: {spell.power}</span>
              <span>Mana: {spell.mana}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Spell detail page
function SpellDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const spell = spells.find(s => s.id === parseInt(id))
  
  if (!spell) {
    return (
      <div className="page not-found">
        <h2>Spell Not Found</h2>
        <p>The spell you're looking for doesn't exist in our directory.</p>
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
        <span className="detail-emoji">{elementEmojis[spell.element]}</span>
        <h2>{spell.name}</h2>
        <span className="element-badge">{spell.element}</span>
        <p className="spell-description">{spell.description}</p>
        
        <div className="spell-stats">
          <div className="stat">
            <span className="stat-label">Power</span>
            <span className="stat-value">{spell.power}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Mana Cost</span>
            <span className="stat-value">{spell.mana}</span>
          </div>
        </div>
        
        <div className="power-bar">
          <div className="power-bar-label">
            <span>Power Level</span>
            <span>{spell.power}%</span>
          </div>
          <div className="power-bar-track">
            <div className="power-bar-fill" style={{ width: `${spell.power}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// App with routes
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="spells" element={<SpellList />} />
        <Route path="spells/:id" element={<SpellDetail />} />
      </Route>
    </Routes>
  )
}

export default App
