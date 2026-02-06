import { useState } from 'react'

export default function UseStateDemo() {
  // Basic state
  const [wizardName, setWizardName] = useState('Merlin')
  const [health, setHealth] = useState(100)
  const [mana, setMana] = useState(80)
  
  // Object state
  const [wizard, setWizard] = useState({
    name: 'Gandalf',
    level: 42,
    house: 'Ravenclaw'
  })
  
  // Array state
  const [spells, setSpells] = useState(['Fireball', 'Ice Shield', 'Lightning Bolt'])
  const [newSpell, setNewSpell] = useState('')

  const takeDamage = () => setHealth(prev => Math.max(0, prev - 10))
  const heal = () => setHealth(prev => Math.min(100, prev + 15))
  const castSpell = () => setMana(prev => Math.max(0, prev - 20))
  const rest = () => setMana(prev => Math.min(100, prev + 10))
  
  const updateWizardLevel = () => {
    setWizard(prev => ({ ...prev, level: prev.level + 1 }))
  }
  
  const addSpell = () => {
    if (newSpell.trim()) {
      setSpells(prev => [...prev, newSpell.trim()])
      setNewSpell('')
    }
  }
  
  const removeSpell = (index: number) => {
    setSpells(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="hook-header">
        <span className="hook-category">State Hook</span>
        <h2>useState</h2>
        <p className="hook-description">
          The most fundamental React hook. Adds state to functional components, 
          allowing values to persist across re-renders and trigger UI updates when changed.
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`const [state, setState] = useState(initialValue)

// With TypeScript type annotation
const [count, setCount] = useState<number>(0)
const [user, setUser] = useState<User | null>(null)`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>When to Use</h3>
        <ul className="demo-list" style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li style={{ background: 'transparent', padding: '8px 0' }}>Tracking user input (forms, search)</li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>Toggle states (modals, dropdowns, dark mode)</li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>Counters and numeric values</li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>Any value that changes over time and should trigger re-render</li>
        </ul>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Primitive State</h4>
        
        <div className="form-group">
          <label>Wizard Name</label>
          <input 
            className="input"
            value={wizardName}
            onChange={(e) => setWizardName(e.target.value)}
          />
        </div>
        
        <div className="wizard-card">
          <div className="name">{wizardName}</div>
          <div style={{ marginTop: '12px' }}>
            <div className="result-label">Health: {health}/100</div>
            <div className="health-bar">
              <div className="health-fill" style={{ width: `${health}%` }} />
            </div>
          </div>
          <div style={{ marginTop: '8px' }}>
            <div className="result-label">Mana: {mana}/100</div>
            <div className="mana-bar">
              <div className="mana-fill" style={{ width: `${mana}%` }} />
            </div>
          </div>
          <div className="button-group" style={{ marginTop: '16px' }}>
            <button className="btn btn-small" onClick={takeDamage}>Take Damage</button>
            <button className="btn btn-small" onClick={heal}>Heal</button>
            <button className="btn btn-small" onClick={castSpell}>Cast Spell</button>
            <button className="btn btn-small btn-secondary" onClick={rest}>Rest</button>
          </div>
        </div>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Object State</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          When updating objects, always spread the previous state to preserve other properties.
        </p>
        
        <div className="wizard-card">
          <div className="name">{wizard.name}</div>
          <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
            Level {wizard.level} • House {wizard.house}
          </div>
          <button className="btn btn-small" onClick={updateWizardLevel} style={{ marginTop: '12px' }}>
            Level Up!
          </button>
        </div>
        
        <div className="code-block">
          <pre>{`// ✅ Correct: spread previous state
setWizard(prev => ({ ...prev, level: prev.level + 1 }))

// ❌ Wrong: overwrites other properties
setWizard({ level: wizard.level + 1 })`}</pre>
        </div>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Array State</h4>
        
        <div className="form-group">
          <label>Add New Spell</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              className="input"
              value={newSpell}
              onChange={(e) => setNewSpell(e.target.value)}
              placeholder="Enter spell name..."
              onKeyDown={(e) => e.key === 'Enter' && addSpell()}
            />
            <button className="btn btn-small" onClick={addSpell}>Add</button>
          </div>
        </div>
        
        <ul className="demo-list">
          {spells.map((spell, index) => (
            <li key={index}>
              {spell}
              <button 
                className="btn btn-small btn-secondary"
                onClick={() => removeSpell(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="info-box warning">
        <h5>⚠️ Common Pitfalls</h5>
        <ul>
          <li><strong>Don't mutate state directly</strong> — always use the setter function</li>
          <li><strong>State updates are async</strong> — use functional updates when depending on previous value</li>
          <li><strong>Object/array references</strong> — create new objects/arrays to trigger re-renders</li>
        </ul>
      </div>

      <div className="info-box success">
        <h5>✅ Best Practices</h5>
        <ul>
          <li>Use functional updates: <code>setState(prev =&gt; prev + 1)</code></li>
          <li>Keep state minimal — derive computed values instead</li>
          <li>Split unrelated state into multiple useState calls</li>
          <li>Consider useReducer for complex state logic</li>
        </ul>
      </div>
    </div>
  )
}
