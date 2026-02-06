import { useState } from 'react'
import './App.css'

function StatTrainer({ label, icon, value, onTrain, color }) {
  const isMaxed = value >= 100;
  
  return (
    <div className="stat-trainer">
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <span className="stat-label">{label}</span>
      </div>
      
      <div className="stat-value-display" style={{ color }}>
        {value}
      </div>
      
      <div className="stat-bar">
        <div 
          className="stat-fill" 
          style={{ 
            width: `${value}%`,
            backgroundColor: color 
          }}
        />
      </div>
      
      <button
        className={isMaxed ? "train-btn train-btn-disabled" : "train-btn"}
        onClick={onTrain}
        disabled={isMaxed}
        style={{ 
          backgroundColor: isMaxed ? '#9ca3af' : color,
          borderColor: color 
        }}
      >
        {isMaxed ? '✓ Maxed' : '▲ Train (+5)'}
      </button>
    </div>
  );
}

function TrainingSystem() {
  // State for each stat
  const [strength, setStrength] = useState(50);
  const [intelligence, setIntelligence] = useState(50);
  const [dexterity, setDexterity] = useState(50);
  const [stamina, setStamina] = useState(50);
  const [level, setLevel] = useState(1);
  
  // Calculate total power
  const totalPower = strength + intelligence + dexterity + stamina;
  const nextLevelXP = level * 100;
  const currentXP = totalPower;
  const progress = Math.min((currentXP / nextLevelXP) * 100, 100);
  
  // Train function
  function train(statSetter, currentValue) {
    if (currentValue < 100) {
      statSetter(currentValue + 5);
      
      // Check for level up
      const newTotal = totalPower + 5;
      const requiredForLevel = level * 100;
      if (newTotal >= requiredForLevel) {
        setLevel(level + 1);
      }
    }
  }
  
  // Reset function (bonus)
  function reset() {
    setStrength(50);
    setIntelligence(50);
    setDexterity(50);
    setStamina(50);
    setLevel(1);
  }
  
  return (
    <div className="training-system">
      <div className="header">
        <h2>🏋️ Training System</h2>
        <div className="level-display">
          <span className="level-label">Level</span>
          <span className="level-value">{level}</span>
        </div>
      </div>
      
      {/* Progress bar to next level */}
      <div className="progress-section">
        <div className="progress-label">
          <span>Progress to Level {level + 1}</span>
          <span>{currentXP} / {nextLevelXP} XP</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
      
      {/* Training stats */}
      <div className="stats-grid">
        <StatTrainer
          label="Strength"
          icon="💪"
          value={strength}
          onTrain={() => train(setStrength, strength)}
          color="#dc2626"
        />
        <StatTrainer
          label="Intelligence"
          icon="🧠"
          value={intelligence}
          onTrain={() => train(setIntelligence, intelligence)}
          color="#2563eb"
        />
        <StatTrainer
          label="Dexterity"
          icon="⚡"
          value={dexterity}
          onTrain={() => train(setDexterity, dexterity)}
          color="#eab308"
        />
        <StatTrainer
          label="Stamina"
          icon="❤️"
          value={stamina}
          onTrain={() => train(setStamina, stamina)}
          color="#16a34a"
        />
      </div>
      
      {/* Summary */}
      <div className="summary">
        <div className="summary-stat">
          <span className="summary-label">Total Power:</span>
          <span className="summary-value">{totalPower}</span>
        </div>
        <button className="reset-btn" onClick={reset}>
          🔄 Reset Training
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <div className="quest-header">
        <h1>⚡ Quest 1: Training System</h1>
        <p className="quest-subtitle">useState for interactive UI</p>
      </div>
      
      <TrainingSystem />
    </div>
  );
}

export default App;





