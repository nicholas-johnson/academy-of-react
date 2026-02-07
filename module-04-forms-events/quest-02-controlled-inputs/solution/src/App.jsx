import { useState } from 'react'
import './App.css'

// Sample spell data - 15 spells with various properties
const SPELLS = [
  { id: 1, name: 'Fireball', type: 'fire', level: 3, damage: 45, manaCost: 30 },
  { id: 2, name: 'Ice Shard', type: 'ice', level: 2, damage: 30, manaCost: 20 },
  { id: 3, name: 'Lightning Bolt', type: 'lightning', level: 4, damage: 60, manaCost: 40 },
  { id: 4, name: 'Flame Strike', type: 'fire', level: 5, damage: 75, manaCost: 50 },
  { id: 5, name: 'Frost Nova', type: 'ice', level: 3, damage: 40, manaCost: 35 },
  { id: 6, name: 'Thunder Clap', type: 'lightning', level: 2, damage: 35, manaCost: 25 },
  { id: 7, name: 'Blaze', type: 'fire', level: 1, damage: 20, manaCost: 15 },
  { id: 8, name: 'Frozen Orb', type: 'ice', level: 5, damage: 70, manaCost: 55 },
  { id: 9, name: 'Chain Lightning', type: 'lightning', level: 5, damage: 80, manaCost: 60 },
  { id: 10, name: 'Heal', type: 'light', level: 2, damage: 0, manaCost: 25 },
  { id: 11, name: 'Inferno', type: 'fire', level: 5, damage: 90, manaCost: 70 },
  { id: 12, name: 'Glacial Spike', type: 'ice', level: 4, damage: 55, manaCost: 45 },
  { id: 13, name: 'Storm Fury', type: 'lightning', level: 3, damage: 50, manaCost: 38 },
  { id: 14, name: 'Holy Light', type: 'light', level: 3, damage: 0, manaCost: 30 },
  { id: 15, name: 'Meteor', type: 'fire', level: 5, damage: 100, manaCost: 80 },
]

function App() {
  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [minLevel, setMinLevel] = useState(1)

  // Compute filtered spells based on current filters
  // This is "derived state" - calculated from other state
  const filteredSpells = SPELLS.filter(spell => {
    // Check search term (case-insensitive)
    const matchesSearch = spell.name.toLowerCase().includes(searchTerm.toLowerCase())

    // Check type filter
    const matchesType = typeFilter === 'all' || spell.type === typeFilter

    // Check minimum level
    const matchesLevel = spell.level >= minLevel

    // Spell must match ALL filters
    return matchesSearch && matchesType && matchesLevel
  })

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('')
    setTypeFilter('all')
    setMinLevel(1)
  }

  return (
    <div className="app">
      <h1>📖 Spell Grimoire</h1>
      <p>Search and filter the Academy's spell collection</p>

      <div className="filters">
        {/* Search Input */}
        <div className="filter-group">
          <label htmlFor="search">Search Spells</label>
          <input
            type="text"
            id="search"
            placeholder="Enter spell name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Type Filter */}
        <div className="filter-group">
          <label htmlFor="type">Spell Type</label>
          <select
            id="type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="fire">Fire</option>
            <option value="ice">Ice</option>
            <option value="lightning">Lightning</option>
            <option value="light">Light</option>
          </select>
        </div>

        {/* Level Filter */}
        <div className="filter-group">
          <label htmlFor="level">Min Level</label>
          <select
            id="level"
            value={minLevel}
            onChange={(e) => setMinLevel(Number(e.target.value))}
          >
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>

      <div className="results-info">
        <span>
          Showing {filteredSpells.length} of {SPELLS.length} spells
        </span>
        {(searchTerm || typeFilter !== 'all' || minLevel > 1) && (
          <button onClick={handleClearFilters} className="clear-btn">
            Clear Filters
          </button>
        )}
      </div>

      <div className="spell-grid">
        {filteredSpells.length === 0 ? (
          <div className="no-results">
            No spells match your search criteria. Try different filters!
          </div>
        ) : (
          filteredSpells.map(spell => (
            <div key={spell.id} className="spell-card">
              <div className="spell-name">{spell.name}</div>
              <span className={`spell-type ${spell.type}`}>
                {spell.type}
              </span>
              <div className="spell-stats">
                <div className="spell-stat">
                  <span className="stat-label">Level</span>
                  <span className="stat-value">{spell.level}</span>
                </div>
                <div className="spell-stat">
                  <span className="stat-label">Damage</span>
                  <span className="stat-value">{spell.damage}</span>
                </div>
                <div className="spell-stat">
                  <span className="stat-label">Mana</span>
                  <span className="stat-value">{spell.manaCost}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
