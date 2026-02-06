import { useState } from 'react'
import './App.css'

const CREATURES = [
  { id: 1, name: 'Phoenix', type: 'beast', power: 85, manaCost: 50 },
  { id: 2, name: 'Ice Spirit', type: 'spirit', power: 70, manaCost: 40 },
  { id: 3, name: 'Fire Elemental', type: 'elemental', power: 90, manaCost: 55 },
  { id: 4, name: 'Shadow Wolf', type: 'beast', power: 65, manaCost: 35 },
  { id: 5, name: 'Water Spirit', type: 'spirit', power: 60, manaCost: 30 },
  { id: 6, name: 'Earth Golem', type: 'elemental', power: 95, manaCost: 60 },
  { id: 7, name: 'Thunder Eagle', type: 'beast', power: 80, manaCost: 45 },
  { id: 8, name: 'Light Spirit', type: 'spirit', power: 75, manaCost: 42 },
  { id: 9, name: 'Storm Elemental', type: 'elemental', power: 88, manaCost: 52 },
  { id: 10, name: 'Frost Dragon', type: 'beast', power: 100, manaCost: 70 },
  { id: 11, name: 'Ancient Spirit', type: 'spirit', power: 82, manaCost: 48 },
  { id: 12, name: 'Lava Titan', type: 'elemental', power: 92, manaCost: 58 },
  { id: 13, name: 'Crystal Unicorn', type: 'beast', power: 78, manaCost: 44 },
  { id: 14, name: 'Void Spirit', type: 'spirit', power: 85, manaCost: 50 },
  { id: 15, name: 'Wind Djinn', type: 'elemental', power: 72, manaCost: 38 },
  { id: 16, name: 'Iron Bear', type: 'beast', power: 68, manaCost: 36 },
  { id: 17, name: 'Ethereal Phantom', type: 'spirit', power: 80, manaCost: 46 },
  { id: 18, name: 'Magma Serpent', type: 'elemental', power: 86, manaCost: 51 },
  { id: 19, name: 'Silver Griffin', type: 'beast', power: 88, manaCost: 53 },
  { id: 20, name: 'Celestial Spirit', type: 'spirit', power: 90, manaCost: 56 },
]

function App() {
  const [typeFilter, setTypeFilter] = useState('all')
  const [minPower, setMinPower] = useState(0)
  const [maxMana, setMaxMana] = useState(100)
  const [selectedIds, setSelectedIds] = useState([])

  const filteredCreatures = CREATURES.filter(creature => {
    const matchesType = typeFilter === 'all' || creature.type === typeFilter
    const matchesPower = creature.power >= minPower
    const matchesMana = creature.manaCost <= maxMana
    return matchesType && matchesPower && matchesMana
  })

  const toggleCreature = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
    } else if (selectedIds.length < 5) {
      setSelectedIds([...selectedIds, id])
    }
  }

  const selectedCreatures = CREATURES.filter(c => selectedIds.includes(c.id))
  const totalPower = selectedCreatures.reduce((sum, c) => sum + c.power, 0)
  const totalMana = selectedCreatures.reduce((sum, c) => sum + c.manaCost, 0)

  return (
    <div className="app">
      <h1>🐉 Creature Gallery</h1>
      <p>Select up to 5 creatures for your battle team</p>

      <div className="team-panel">
        <h3>Battle Team ({selectedIds.length}/5)</h3>
        <div className="team-stats">
          <div className="team-stat">
            <span>Total Power:</span>
            <span className="stat-value">{totalPower}</span>
          </div>
          <div className="team-stat">
            <span>Total Mana Cost:</span>
            <span className="stat-value">{totalMana}</span>
          </div>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Type</label>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="beast">Beast</option>
            <option value="spirit">Spirit</option>
            <option value="elemental">Elemental</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Min Power: {minPower}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={minPower}
            onChange={(e) => setMinPower(Number(e.target.value))}
          />
        </div>
        <div className="filter-group">
          <label>Max Mana Cost: {maxMana}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={maxMana}
            onChange={(e) => setMaxMana(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="results-info">
        Showing {filteredCreatures.length} creatures
      </div>

      <div className="creature-grid">
        {filteredCreatures.map(creature => (
          <div
            key={creature.id}
            onClick={() => toggleCreature(creature.id)}
            className={`creature-card ${selectedIds.includes(creature.id) ? 'selected' : ''} ${selectedIds.length >= 5 && !selectedIds.includes(creature.id) ? 'disabled' : ''}`}
          >
            <h4>{creature.name}</h4>
            <span className={`type-badge ${creature.type}`}>{creature.type}</span>
            <div className="creature-stats">
              <div>⚡ {creature.power}</div>
              <div>✨ {creature.manaCost}</div>
            </div>
            {selectedIds.includes(creature.id) && (
              <div className="selected-badge">✓ Selected</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
