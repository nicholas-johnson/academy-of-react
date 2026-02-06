import { useState } from 'react'
import './App.css'

function App() {
  const [gold, setGold] = useState(500)
  const [manaCrystals, setManaCrystals] = useState(10)
  const [potionSupplies, setPotionSupplies] = useState(20)
  const [students, setStudents] = useState(5)
  const [studentPower, setStudentPower] = useState(50) // Total army power

  // Train Student: costs 100 gold, adds 1 student with +15 power
  const trainStudent = () => {
    if (gold >= 100) {
      setGold(gold - 100)
      setStudents(students + 1)
      setStudentPower(studentPower + 15)
    }
  }

  // Brew Potion: costs 5 supplies + 1 crystal, produces potions
  const brewPotion = () => {
    if (potionSupplies >= 5 && manaCrystals >= 1) {
      setPotionSupplies(potionSupplies - 5)
      setManaCrystals(manaCrystals - 1)
      // Could add potion count state if needed
    }
  }

  // Gather Resources: adds gold and supplies
  const gatherResources = () => {
    setGold(gold + 50)
    setPotionSupplies(potionSupplies + 10)
    setManaCrystals(manaCrystals + 2)
  }

  return (
    <div className="app">
      <h1>🏰 Academy Resource Dashboard</h1>
      <p>Manage your academy's resources and army</p>

      <div className="resources">
        <div className="resource-card">
          <div className="resource-icon">💰</div>
          <div className="resource-name">Gold</div>
          <div className="resource-value">{gold}</div>
        </div>
        <div className="resource-card">
          <div className="resource-icon">💎</div>
          <div className="resource-name">Mana Crystals</div>
          <div className="resource-value">{manaCrystals}</div>
        </div>
        <div className="resource-card">
          <div className="resource-icon">🧪</div>
          <div className="resource-name">Potion Supplies</div>
          <div className="resource-value">{potionSupplies}</div>
        </div>
      </div>

      <div className="army-section">
        <h2>Student Army</h2>
        <div className="army-stats">
          <div className="stat">
            <span className="stat-label">Students:</span>
            <span className="stat-value">{students}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Total Power:</span>
            <span className="stat-value">{studentPower}</span>
          </div>
        </div>
      </div>

      <div className="actions">
        <h2>Actions</h2>
        <button
          onClick={trainStudent}
          disabled={gold < 100}
          className="action-btn"
        >
          <div className="btn-title">Train Student</div>
          <div className="btn-cost">Cost: 100 💰</div>
          <div className="btn-effect">+1 student, +15 power</div>
        </button>

        <button
          onClick={brewPotion}
          disabled={potionSupplies < 5 || manaCrystals < 1}
          className="action-btn"
        >
          <div className="btn-title">Brew Potion</div>
          <div className="btn-cost">Cost: 5 🧪, 1 💎</div>
          <div className="btn-effect">Produce healing potions</div>
        </button>

        <button
          onClick={gatherResources}
          className="action-btn gather"
        >
          <div className="btn-title">Gather Resources</div>
          <div className="btn-cost">Free</div>
          <div className="btn-effect">+50 💰, +10 🧪, +2 💎</div>
        </button>
      </div>
    </div>
  )
}

export default App
