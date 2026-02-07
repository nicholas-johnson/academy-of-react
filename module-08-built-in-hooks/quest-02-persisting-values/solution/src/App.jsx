import { useRef } from 'react'
import './App.css'

const SPELLS = [
  { id: 1, name: 'Fireball', animation: 'shake', icon: '🔥' },
  { id: 2, name: 'Ice Blast', animation: 'spin', icon: '❄️' },
  { id: 3, name: 'Lightning Strike', animation: 'flash', icon: '⚡' },
  { id: 4, name: 'Healing Wave', animation: 'pulse', icon: '💚' },
]

function App() {
  const spellRefs = useRef([])

  const triggerAnimation = (index, animationClass) => {
    const element = spellRefs.current[index]
    if (!element) return

    // Add animation class
    element.classList.add(animationClass)

    // Remove after animation completes
    setTimeout(() => {
      element.classList.remove(animationClass)
    }, 600)
  }

  return (
    <div className="app">
      <h1>✨ Spell Animations</h1>
      <p>Click spells to trigger visual effects</p>

      <div className="spell-grid">
        {SPELLS.map((spell, index) => (
          <div
            key={spell.id}
            ref={(el) => (spellRefs.current[index] = el)}
            onClick={() => triggerAnimation(index, spell.animation)}
            className="spell-card"
          >
            <div className="spell-icon">{spell.icon}</div>
            <h3>{spell.name}</h3>
            <p className="animation-name">{spell.animation}</p>
          </div>
        ))}
      </div>

      <div className="info-box">
        <h3>🎯 How It Works</h3>
        <ul>
          <li>Each spell card has a ref stored in an array</li>
          <li>Click triggers <code>classList.add()</code> via ref</li>
          <li>CSS animation plays</li>
          <li>setTimeout removes class to reset</li>
          <li>This is imperative DOM manipulation!</li>
        </ul>
      </div>
    </div>
  )
}

export default App
