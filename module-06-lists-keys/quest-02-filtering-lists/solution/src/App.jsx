import { useState } from 'react'
import './App.css'

const SPELLS = [
  { id: 1, name: 'Fireball', type: 'fire', power: 85, manaCost: 45 },
  { id: 2, name: 'Ice Shard', type: 'ice', power: 60, manaCost: 30 },
  { id: 3, name: 'Lightning Bolt', type: 'lightning', power: 95, manaCost: 55 },
  { id: 4, name: 'Heal', type: 'healing', power: 50, manaCost: 40 },
  { id: 5, name: 'Flame Strike', type: 'fire', power: 90, manaCost: 50 },
  { id: 6, name: 'Frost Nova', type: 'ice', power: 70, manaCost: 38 },
  { id: 7, name: 'Thunder Clap', type: 'lightning', power: 75, manaCost: 42 },
  { id: 8, name: 'Greater Heal', type: 'healing', power: 80, manaCost: 60 },
  { id: 9, name: 'Blaze', type: 'fire', power: 55, manaCost: 25 },
  { id: 10, name: 'Glacial Spike', type: 'ice', power: 88, manaCost: 52 },
  { id: 11, name: 'Chain Lightning', type: 'lightning', power: 92, manaCost: 58 },
  { id: 12, name: 'Mass Heal', type: 'healing', power: 70, manaCost: 75 },
  { id: 13, name: 'Inferno', type: 'fire', power: 98, manaCost: 70 },
  { id: 14, name: 'Frozen Orb', type: 'ice', power: 82, manaCost: 48 },
  { id: 15, name: 'Storm Fury', type: 'lightning', power: 86, manaCost: 50 },
  { id: 16, name: 'Regeneration', type: 'healing', power: 45, manaCost: 35 },
  { id: 17, name: 'Meteor', type: 'fire', power: 100, manaCost: 80 },
  { id: 18, name: 'Blizzard', type: 'ice', power: 94, manaCost: 65 },
  { id: 19, name: 'Thunder Storm', type: 'lightning', power: 88, manaCost: 54 },
  { id: 20, name: 'Holy Light', type: 'healing', power: 65, manaCost: 45 },
  { id: 21, name: 'Fire Lance', type: 'fire', power: 72, manaCost: 40 },
  { id: 22, name: 'Ice Wall', type: 'ice', power: 50, manaCost: 32 },
  { id: 23, name: 'Spark', type: 'lightning', power: 45, manaCost: 20 },
  { id: 24, name: 'Minor Heal', type: 'healing', power: 35, manaCost: 18 },
  { id: 25, name: 'Flame Burst', type: 'fire', power: 78, manaCost: 44 },
  { id: 26, name: 'Frost Armor', type: 'ice', power: 40, manaCost: 28 },
  { id: 27, name: 'Static Shock', type: 'lightning', power: 52, manaCost: 26 },
  { id: 28, name: 'Cure Wounds', type: 'healing', power: 55, manaCost: 38 },
  { id: 29, name: 'Dragon\'s Breath', type: 'fire', power: 96, manaCost: 68 },
  { id: 30, name: 'Arctic Blast', type: 'ice', power: 84, manaCost: 50 },
]

function App() {
  const [typeFilter, setTypeFilter] = useState('all')
  const [powerRange, setPowerRange] = useState([0, 100])
  const [manaRange, setManaRange] = useState([0, 100])

  const filteredSpells = SPELLS.filter(spell => {
    const matchesType = typeFilter === 'all' || spell.type === typeFilter
    const matchesPower = spell.power >= powerRange[0] && spell.power <= powerRange[1]
    const matchesMana = spell.manaCost >= manaRange[0] && spell.manaCost <= manaRange[1]
    return matchesType && matchesPower && matchesMana
  })

  const clearFilters = () => {
    setTypeFilter('all')
    setPowerRange([0, 100])
    setManaRange([0, 100])
  }

  return (
    <div className="app">
      <h1>📚 Spell Inventory</h1>
      <p>Advanced filtering with multiple criteria</p>

      <div className="filters">
        <div className="filter-row">
          <div className="filter-group">
            <label>Spell Type</label>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">All Types</option>
              <option value="fire">Fire</option>
              <option value="ice">Ice</option>
              <option value="lightning">Lightning</option>
              <option value="healing">Healing</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Power: {powerRange[0]} - {powerRange[1]}</label>
            <div className="range-inputs">
              <input
                type="range"
                min="0"
                max="100"
                value={powerRange[0]}
                onChange={(e) => setPowerRange([+e.target.value, powerRange[1]])}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={powerRange[1]}
                onChange={(e) => setPowerRange([powerRange[0], +e.target.value])}
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Mana Cost: {manaRange[0]} - {manaRange[1]}</label>
            <div className="range-inputs">
              <input
                type="range"
                min="0"
                max="100"
                value={manaRange[0]}
                onChange={(e) => setManaRange([+e.target.value, manaRange[1]])}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={manaRange[1]}
                onChange={(e) => setManaRange([manaRange[0], +e.target.value])}
              />
            </div>
          </div>
        </div>

        <div className="filter-actions">
          <div className="results-count">
            Showing {filteredSpells.length} of {SPELLS.length} spells
          </div>
          <button onClick={clearFilters} className="clear-btn">Clear Filters</button>
        </div>
      </div>

      <div className="spell-grid">
        {filteredSpells.map(spell => (
          <div key={spell.id} className="spell-card">
            <h3 className="spell-name">{spell.name}</h3>
            <span className={`spell-type ${spell.type}`}>{spell.type}</span>
            <div className="spell-stats">
              <div className="stat">
                <span className="stat-label">Power</span>
                <span className="stat-value power">{spell.power}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Mana</span>
                <span className="stat-value mana">{spell.manaCost}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
