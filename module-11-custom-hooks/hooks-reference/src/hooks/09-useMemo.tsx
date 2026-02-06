import { useMemo, useState } from 'react'

// Expensive calculation function
function calculateSpellPower(baseStats: number[], multiplier: number): number {
  console.log('⏳ Calculating spell power...')
  // Simulate expensive calculation
  let result = 0
  for (let i = 0; i < 10000000; i++) {
    result += baseStats.reduce((a, b) => a + b, 0) * multiplier
  }
  return Math.round(result / 10000000)
}

// Find matching spells
function filterSpells(spells: string[], searchTerm: string): string[] {
  console.log('🔍 Filtering spells...')
  return spells.filter(spell => 
    spell.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

const ALL_SPELLS = [
  'Fireball', 'Ice Storm', 'Lightning Bolt', 'Healing Wave',
  'Fire Shield', 'Frost Nova', 'Thunder Strike', 'Regeneration',
  'Meteor Shower', 'Blizzard', 'Chain Lightning', 'Divine Light',
  'Inferno', 'Glacial Spike', 'Storm Call', 'Holy Fire'
]

export default function UseMemoDemo() {
  const [strength, setStrength] = useState(10)
  const [intelligence, setIntelligence] = useState(15)
  const [multiplier, setMultiplier] = useState(1.5)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [searchTerm, setSearchTerm] = useState('')
  const [renderTrigger, setRenderTrigger] = useState(0)

  // Without useMemo - recalculates on EVERY render
  // const spellPower = calculateSpellPower([strength, intelligence], multiplier)

  // With useMemo - only recalculates when dependencies change
  const spellPower = useMemo(() => {
    return calculateSpellPower([strength, intelligence], multiplier)
  }, [strength, intelligence, multiplier])

  // Memoized filtered list
  const filteredSpells = useMemo(() => {
    return filterSpells(ALL_SPELLS, searchTerm)
  }, [searchTerm])

  // Memoized object (for stable reference)
  const wizardStats = useMemo(() => ({
    strength,
    intelligence,
    totalPower: strength + intelligence
  }), [strength, intelligence])

  return (
    <div>
      <div className="hook-header">
        <span className="hook-category">Performance Hook</span>
        <h2>useMemo</h2>
        <p className="hook-description">
          Memoizes expensive calculations so they only recompute when dependencies change. 
          Returns a memoized value. Use when you have computationally expensive operations 
          that shouldn't run on every render.
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b)
}, [a, b]) // Only recalculates when a or b change`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>When to Use</h3>
        <ul className="demo-list" style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Expensive calculations</strong> — Sorting, filtering, complex math
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Referential equality</strong> — Stable object/array references for child props
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Derived data</strong> — Transform data only when source changes
          </li>
        </ul>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Expensive Calculation</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Spell power is only recalculated when stats or multiplier change. 
          Check the console to see when calculations run.
        </p>
        
        <div className="stat-grid">
          <div className="stat-card">
            <div className="label">Strength</div>
            <div className="value">{strength}</div>
          </div>
          <div className="stat-card">
            <div className="label">Intelligence</div>
            <div className="value">{intelligence}</div>
          </div>
          <div className="stat-card">
            <div className="label">Multiplier</div>
            <div className="value">{multiplier}x</div>
          </div>
          <div className="stat-card">
            <div className="label">Spell Power</div>
            <div className="value" style={{ color: '#fbbf24' }}>{spellPower}</div>
          </div>
        </div>
        
        <div className="button-group" style={{ marginTop: '16px' }}>
          <button className="btn btn-small" onClick={() => setStrength(s => s + 5)}>
            +5 Strength
          </button>
          <button className="btn btn-small" onClick={() => setIntelligence(i => i + 5)}>
            +5 Intelligence
          </button>
          <button className="btn btn-small" onClick={() => setMultiplier(m => m + 0.5)}>
            +0.5 Multiplier
          </button>
        </div>
        
        <div style={{ marginTop: '16px' }}>
          <button 
            className="btn btn-small btn-secondary"
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          >
            Toggle Theme (unrelated state)
          </button>
          <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '8px' }}>
            Theme: {theme} — Notice calculation doesn't re-run!
          </p>
        </div>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Memoized Filtering</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Spell list only re-filters when search term changes.
        </p>
        
        <div className="form-group">
          <label>Search Spells</label>
          <input
            className="input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to filter..."
          />
        </div>
        
        <ul className="demo-list">
          {filteredSpells.map(spell => (
            <li key={spell}>{spell}</li>
          ))}
        </ul>
        
        {filteredSpells.length === 0 && (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
            No spells found
          </p>
        )}
        
        <button 
          className="btn btn-small btn-secondary"
          onClick={() => setRenderTrigger(r => r + 1)}
          style={{ marginTop: '16px' }}
        >
          Force Re-render ({renderTrigger})
        </button>
        <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '8px' }}>
          Check console — filter doesn't re-run on unrelated renders
        </p>
      </div>

      <div className="demo-section">
        <h3>Memoizing Object References</h3>
        <div className="code-block">
          <pre>{`// ❌ Without useMemo: New object every render
const wizardStats = {
  health: 100,
  mana: 50
}
// Child receives new object reference every time
<ChildComponent stats={wizardStats} />

// ✅ With useMemo: Same reference until dependencies change
const wizardStats = useMemo(() => ({
  health,
  mana
}), [health, mana])
// Child only re-renders when health or mana actually change`}</pre>
        </div>
      </div>

      <div className="info-box warning">
        <h5>⚠️ Don't Overuse</h5>
        <p>
          useMemo has its own cost (memory, comparison overhead). Only use when:
        </p>
        <ul>
          <li>Calculation is measurably slow</li>
          <li>Dependencies change infrequently</li>
          <li>Need stable reference for child optimization</li>
        </ul>
        <p style={{ marginTop: '8px' }}>
          <strong>Profile first!</strong> Don't optimize prematurely.
        </p>
      </div>

      <div className="info-box success">
        <h5>✅ useMemo vs useCallback</h5>
        <ul>
          <li><strong>useMemo</strong> — Returns a memoized <em>value</em></li>
          <li><strong>useCallback</strong> — Returns a memoized <em>function</em></li>
          <li><code>useCallback(fn, deps)</code> equals <code>useMemo(() =&gt; fn, deps)</code></li>
        </ul>
      </div>
    </div>
  )
}
