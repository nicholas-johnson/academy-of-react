import { useState, useMemo } from 'react'
import './App.css'

interface Student {
  id: number
  name: string
  power: number
  mana: number
  level: number
}

const STUDENTS: Student[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Wizard ${i + 1}`,
  power: Math.floor(Math.random() * 100) + 1,
  mana: Math.floor(Math.random() * 100) + 1,
  level: Math.floor(Math.random() * 10) + 1,
}))

// Expensive calculation: simulate complex battle simulation
function calculateBattleOutcome(students: Student[], powerMultiplier: number): {
  totalPower: number
  averageMana: number
  strongestWizard: Student | null
  battleScore: number
} {
  console.log('💥 Calculating battle outcome (expensive)...')
  
  // Simulate expensive calculation
  let result = 0
  for (let i = 0; i < 10000000; i++) {
    result += Math.sqrt(i)
  }

  const totalPower = students.reduce((sum, s) => sum + s.power * powerMultiplier, 0)
  const averageMana = students.reduce((sum, s) => sum + s.mana, 0) / students.length
  const strongestWizard = students.reduce((max, s) => s.power > max.power ? s : max, students[0])
  const battleScore = Math.floor(totalPower + averageMana * 2)

  return { totalPower: Math.floor(totalPower), averageMana: Math.floor(averageMana), strongestWizard, battleScore }
}

function App() {
  const [powerMultiplier, setPowerMultiplier] = useState(1)
  const [minLevel, setMinLevel] = useState(1)
  const [renderCount, setRenderCount] = useState(0)

  // Filter students by level
  const filteredStudents = useMemo(() => {
    console.log('🔍 Filtering students...')
    return STUDENTS.filter(s => s.level >= minLevel)
  }, [minLevel])

  // Calculate battle outcome - expensive!
  const battleResult = useMemo(() => {
    return calculateBattleOutcome(filteredStudents, powerMultiplier)
  }, [filteredStudents, powerMultiplier])

  // Force re-render to demonstrate useMemo benefit
  const forceRender = () => setRenderCount(renderCount + 1)

  return (
    <div className="app">
      <h1>⚔️ Battle Calculator</h1>
      <p>useMemo prevents expensive recalculations</p>

      <div className="controls-section">
        <div className="control-group">
          <label>Power Multiplier: {powerMultiplier}x</label>
          <input
            type="range"
            min="1"
            max="5"
            value={powerMultiplier}
            onChange={(e) => setPowerMultiplier(Number(e.target.value))}
          />
          <p className="hint">Changes battle calculation ✓</p>
        </div>

        <div className="control-group">
          <label>Minimum Level: {minLevel}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={minLevel}
            onChange={(e) => setMinLevel(Number(e.target.value))}
          />
          <p className="hint">Changes filtered students ✓</p>
        </div>

        <button onClick={forceRender} className="btn btn-secondary">
          Force Re-render (Render #{renderCount})
        </button>
        <p className="hint">Check console - battle NOT recalculated!</p>
      </div>

      <div className="results-section">
        <h3>Battle Results</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div>
              <div className="stat-value">{filteredStudents.length}</div>
              <div className="stat-label">Eligible Wizards</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div>
              <div className="stat-value">{battleResult.totalPower}</div>
              <div className="stat-label">Total Power</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✨</div>
            <div>
              <div className="stat-value">{battleResult.averageMana}</div>
              <div className="stat-label">Average Mana</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div>
              <div className="stat-value">{battleResult.battleScore}</div>
              <div className="stat-label">Battle Score</div>
            </div>
          </div>
        </div>

        {battleResult.strongestWizard && (
          <div className="champion-section">
            <h4>🌟 Strongest Wizard</h4>
            <p><strong>{battleResult.strongestWizard.name}</strong></p>
            <p>Power: {battleResult.strongestWizard.power} | Mana: {battleResult.strongestWizard.mana}</p>
          </div>
        )}
      </div>

      <div className="info-box">
        <h3>🔑 useMemo in Action</h3>
        <ul>
          <li>Battle calculation runs ONLY when dependencies change</li>
          <li>Changing power multiplier → recalculates ✓</li>
          <li>Changing level filter → recalculates ✓</li>
          <li>Force re-render → does NOT recalculate ✓</li>
          <li>Check console to see when calculations run</li>
        </ul>
      </div>
    </div>
  )
}

export default App
