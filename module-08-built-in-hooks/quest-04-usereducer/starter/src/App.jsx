import { useState } from 'react'
import './App.css'

// TODO: Create the reducer function
// function spellReducer(state, action) {
//   switch (action.type) {
//     case 'ADD_SPELL':
//       // Return new state with spell added
//     case 'REMOVE_SPELL':
//       // Return new state with spell removed
//     case 'UPGRADE_SPELL':
//       // Return new state with spell power increased by 10
//     case 'TOGGLE_FAVORITE':
//       // Return new state with spell favorite toggled
//     default:
//       return state
//   }
// }

// Initial spells data
const initialSpells = [
  { id: 1, name: 'Fireball', power: 50, isFavorite: true },
  { id: 2, name: 'Ice Shard', power: 35, isFavorite: false },
  { id: 3, name: 'Lightning Bolt', power: 65, isFavorite: false },
]

function App() {
  // TODO: Replace useState with useReducer
  // const [state, dispatch] = useReducer(spellReducer, { spells: initialSpells })
  
  // Temporary: using useState (replace with useReducer)
  const [spells, setSpells] = useState(initialSpells)
  const [newSpellName, setNewSpellName] = useState('')

  // TODO: Calculate stats from state.spells
  const totalPower = spells.reduce((sum, s) => sum + s.power, 0)
  const favoriteCount = spells.filter(s => s.isFavorite).length

  const handleAddSpell = () => {
    if (!newSpellName.trim()) return
    
    // TODO: Replace with dispatch({ type: 'ADD_SPELL', spell: {...} })
    const newSpell = {
      id: Date.now(),
      name: newSpellName,
      power: 20,
      isFavorite: false,
    }
    setSpells([...spells, newSpell])
    setNewSpellName('')
  }

  const handleRemoveSpell = (id) => {
    // TODO: Replace with dispatch({ type: 'REMOVE_SPELL', id })
    setSpells(spells.filter(s => s.id !== id))
  }

  const handleUpgradeSpell = (id) => {
    // TODO: Replace with dispatch({ type: 'UPGRADE_SPELL', id })
    setSpells(spells.map(s => 
      s.id === id ? { ...s, power: s.power + 10 } : s
    ))
  }

  const handleToggleFavorite = (id) => {
    // TODO: Replace with dispatch({ type: 'TOGGLE_FAVORITE', id })
    setSpells(spells.map(s => 
      s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
    ))
  }

  return (
    <div className="app">
      <h1>📚 Spell Inventory</h1>
      <p className="subtitle">Manage your magical arsenal with useReducer</p>

      <div className="stats">
        <div className="stat">
          <span className="stat-value">{spells.length}</span>
          <span className="stat-label">Total Spells</span>
        </div>
        <div className="stat">
          <span className="stat-value">{totalPower}</span>
          <span className="stat-label">Total Power</span>
        </div>
        <div className="stat">
          <span className="stat-value">{favoriteCount}</span>
          <span className="stat-label">Favorites</span>
        </div>
      </div>

      <div className="add-spell">
        <input
          type="text"
          value={newSpellName}
          onChange={(e) => setNewSpellName(e.target.value)}
          placeholder="Enter spell name..."
          onKeyDown={(e) => e.key === 'Enter' && handleAddSpell()}
        />
        <button onClick={handleAddSpell}>Add Spell</button>
      </div>

      <ul className="spell-list">
        {spells.map((spell) => (
          <li key={spell.id} className={spell.isFavorite ? 'favorite' : ''}>
            <div className="spell-info">
              <span className="spell-name">
                {spell.isFavorite && '⭐ '}
                {spell.name}
              </span>
              <span className="spell-power">Power: {spell.power}</span>
            </div>
            <div className="spell-actions">
              <button 
                onClick={() => handleToggleFavorite(spell.id)}
                className="btn-favorite"
              >
                {spell.isFavorite ? '💔' : '❤️'}
              </button>
              <button 
                onClick={() => handleUpgradeSpell(spell.id)}
                className="btn-upgrade"
              >
                ⬆️ +10
              </button>
              <button 
                onClick={() => handleRemoveSpell(spell.id)}
                className="btn-remove"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>

      {spells.length === 0 && (
        <p className="empty-message">No spells in inventory. Add some!</p>
      )}
    </div>
  )
}

export default App
