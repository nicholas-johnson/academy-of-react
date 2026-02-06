import { useState } from 'react'
import './App.css'

function App() {
  // Multiple pieces of state to manage
  const [gold, setGold] = useState(1000)
  const [mana, setMana] = useState(100)
  const [health, setHealth] = useState(100)
  const [activeTab, setActiveTab] = useState('resources')

  // Coordinated state updates
  const castSpell = () => {
    if (mana >= 20) {
      setMana(mana - 20)
      setGold(gold + 50) // Spell generates gold
    }
  }

  const buyPotion = () => {
    if (gold >= 100) {
      setGold(gold - 100)
      setHealth(Math.min(health + 30, 100))
    }
  }

  const restoreMana = () => {
    if (gold >= 50) {
      setGold(gold - 50)
      setMana(Math.min(mana + 40, 100))
    }
  }

  return (
    <div className="app">
      <h1>🎮 Resource Management</h1>
      <p>Managing multiple pieces of state</p>

      {/* Tabs */}
      <div className="tabs">
        <button
          onClick={() => setActiveTab('resources')}
          className={activeTab === 'resources' ? 'active' : ''}
        >
          Resources
        </button>
        <button
          onClick={() => setActiveTab('actions')}
          className={activeTab === 'actions' ? 'active' : ''}
        >
          Actions
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'resources' && (
        <div className="tab-content">
          <div className="resource-grid">
            <div className="resource-card">
              <div className="resource-icon">💰</div>
              <div className="resource-name">Gold</div>
              <div className="resource-value">{gold}</div>
            </div>
            <div className="resource-card">
              <div className="resource-icon">✨</div>
              <div className="resource-name">Mana</div>
              <div className="resource-value">{mana}/100</div>
            </div>
            <div className="resource-card">
              <div className="resource-icon">❤️</div>
              <div className="resource-name">Health</div>
              <div className="resource-value">{health}/100</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'actions' && (
        <div className="tab-content">
          <div className="actions">
            <button onClick={castSpell} disabled={mana < 20} className="action-btn">
              Cast Spell (-20 mana, +50 gold)
            </button>
            <button onClick={buyPotion} disabled={gold < 100 || health === 100} className="action-btn">
              Buy Health Potion (-100 gold, +30 health)
            </button>
            <button onClick={restoreMana} disabled={gold < 50 || mana === 100} className="action-btn">
              Restore Mana (-50 gold, +40 mana)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
