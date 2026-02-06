import { useState, useCallback, memo } from 'react'
import './App.css'

interface Spell {
  id: number
  name: string
  power: number
  manaCost: number
}

// Child component WITHOUT optimization
function UnoptimizedSpellItem({ spell, onCast }: { spell: Spell; onCast: (id: number) => void }) {
  console.log(`❌ Rendering UnoptimizedSpellItem: ${spell.name}`)
  return (
    <div className="spell-item unoptimized">
      <h4>{spell.name}</h4>
      <p>Power: {spell.power} | Mana: {spell.manaCost}</p>
      <button onClick={() => onCast(spell.id)} className="cast-btn">
        Cast Spell
      </button>
    </div>
  )
}

// Child component WITH React.memo
const OptimizedSpellItem = memo(({ spell, onCast }: { spell: Spell; onCast: (id: number) => void }) => {
  console.log(`✅ Rendering OptimizedSpellItem: ${spell.name}`)
  return (
    <div className="spell-item optimized">
      <h4>{spell.name}</h4>
      <p>Power: {spell.power} | Mana: {spell.manaCost}</p>
      <button onClick={() => onCast(spell.id)} className="cast-btn">
        Cast Spell
      </button>
    </div>
  )
})

const SPELLS: Spell[] = [
  { id: 1, name: 'Fireball', power: 85, manaCost: 50 },
  { id: 2, name: 'Ice Blast', power: 70, manaCost: 40 },
  { id: 3, name: 'Lightning', power: 90, manaCost: 55 },
]

function App() {
  const [castCount, setCastCount] = useState(0)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // WITHOUT useCallback - new function every render
  const handleCastWithout = (id: number) => {
    console.log(`Cast spell ${id}`)
    setCastCount(castCount + 1)
  }

  // WITH useCallback - stable function reference
  const handleCastWith = useCallback((id: number) => {
    console.log(`Cast spell ${id}`)
    setCastCount(prev => prev + 1)
  }, []) // Empty deps - function never changes

  return (
    <div className={`app ${theme}`}>
      <h1>🎯 Spell List Optimizer</h1>
      <p>React.memo + useCallback prevent unnecessary re-renders</p>

      <div className="stats-bar">
        <div>Spells Cast: <strong>{castCount}</strong></div>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="theme-btn">
          Toggle Theme (Triggers Parent Re-render)
        </button>
      </div>

      <div className="demo-grid">
        <div className="demo-column">
          <h3>❌ Without Optimization</h3>
          <p className="hint">Re-renders on every parent render</p>
          {SPELLS.map(spell => (
            <UnoptimizedSpellItem
              key={spell.id}
              spell={spell}
              onCast={handleCastWithout}
            />
          ))}
        </div>

        <div className="demo-column">
          <h3>✅ With React.memo + useCallback</h3>
          <p className="hint">Only re-renders when props actually change</p>
          {SPELLS.map(spell => (
            <OptimizedSpellItem
              key={spell.id}
              spell={spell}
              onCast={handleCastWith}
            />
          ))}
        </div>
      </div>

      <div className="info-box">
        <h3>🔑 Optimization Strategy</h3>
        <ul>
          <li><strong>React.memo</strong>: Wraps component, skips re-render if props haven't changed</li>
          <li><strong>useCallback</strong>: Memoizes function so reference stays stable</li>
          <li><strong>Why both?</strong>: memo checks prop equality by reference</li>
          <li><strong>Without useCallback</strong>: Function recreated each render, memo thinks props changed</li>
          <li>Toggle theme and check console - optimized column doesn't re-render!</li>
        </ul>
      </div>
    </div>
  )
}

export default App
