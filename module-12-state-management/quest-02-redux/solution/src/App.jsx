import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  addBattle, 
  updateStatus, 
  addCombatant, 
  removeBattle, 
  setFilter,
  selectFilteredBattles, 
  selectFilter,
  selectBattleStats
} from './battleSlice'
import './App.css'

const STATUSES = ['pending', 'active', 'victory', 'defeat']

function App() {
  const [battleName, setBattleName] = useState('')
  const [combatantName, setCombatantName] = useState('')
  const [selectedBattle, setSelectedBattle] = useState(null)

  const battles = useSelector(selectFilteredBattles)
  const filter = useSelector(selectFilter)
  const stats = useSelector(selectBattleStats)
  const dispatch = useDispatch()

  const handleAddBattle = (e) => {
    e.preventDefault()
    if (!battleName.trim()) return
    
    dispatch(addBattle({ name: battleName }))
    setBattleName('')
  }

  const handleStatusChange = (battleId, newStatus) => {
    dispatch(updateStatus({ id: battleId, status: newStatus }))
  }

  const handleAddCombatant = (battleId) => {
    if (!combatantName.trim()) return
    dispatch(addCombatant({ battleId, combatant: combatantName }))
    setCombatantName('')
    setSelectedBattle(null)
  }

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter))
  }

  const getStatusColor = (status) => {
    const colors = { pending: '#f59e0b', active: '#3b82f6', victory: '#10b981', defeat: '#ef4444' }
    return colors[status] || '#6b7280'
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🔮 Redux Battle Tracker</h1>
        <p>Predictable state with Redux Toolkit</p>
      </header>

      <main className="main">
        <section className="stats-bar">
          <div className="stat-item">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item pending">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-item active">
            <span className="stat-value">{stats.active}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-item victory">
            <span className="stat-value">{stats.victories}</span>
            <span className="stat-label">Victories</span>
          </div>
          <div className="stat-item defeat">
            <span className="stat-value">{stats.defeats}</span>
            <span className="stat-label">Defeats</span>
          </div>
        </section>

        <section className="add-form">
          <h2>Start New Battle</h2>
          <form onSubmit={handleAddBattle}>
            <input
              type="text"
              value={battleName}
              onChange={(e) => setBattleName(e.target.value)}
              placeholder="Battle name"
              required
            />
            <button type="submit" className="btn primary">Declare Battle</button>
          </form>
        </section>

        <section className="tracker">
          <div className="tracker-header">
            <h2>Battle Log</h2>
            <div className="filter-tabs">
              {['all', ...STATUSES].map(status => (
                <button
                  key={status}
                  className={filter === status ? 'tab active' : 'tab'}
                  onClick={() => handleFilterChange(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="battle-list">
            {battles.length === 0 ? (
              <p className="empty">No battles recorded</p>
            ) : (
              battles.map(battle => (
                <div key={battle.id} className="battle-card">
                  <div className="battle-header">
                    <h3>{battle.name}</h3>
                    <div className="battle-actions">
                      <select
                        value={battle.status}
                        onChange={(e) => handleStatusChange(battle.id, e.target.value)}
                        style={{ borderColor: getStatusColor(battle.status) }}
                      >
                        {STATUSES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button 
                        className="delete-btn"
                        onClick={() => dispatch(removeBattle(battle.id))}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  
                  <div className="combatants">
                    <span className="label">Combatants:</span>
                    {battle.combatants.length === 0 ? (
                      <span className="none">None yet</span>
                    ) : (
                      battle.combatants.map((c, i) => (
                        <span key={i} className="combatant">{c}</span>
                      ))
                    )}
                    <button 
                      className="add-combatant-btn"
                      onClick={() => setSelectedBattle(battle.id)}
                    >
                      +
                    </button>
                  </div>

                  {selectedBattle === battle.id && (
                    <div className="add-combatant-form">
                      <input
                        type="text"
                        value={combatantName}
                        onChange={(e) => setCombatantName(e.target.value)}
                        placeholder="Combatant name"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddCombatant(battle.id)
                          if (e.key === 'Escape') setSelectedBattle(null)
                        }}
                      />
                      <button onClick={() => handleAddCombatant(battle.id)}>Add</button>
                      <button onClick={() => setSelectedBattle(null)}>Cancel</button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
