import { useActionState, useState } from 'react'

// Simulated server action
async function registerWizard(
  prevState: { success: boolean; message: string } | null,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const name = formData.get('name') as string
  const house = formData.get('house') as string
  const level = formData.get('level') as string
  
  // Validation
  if (!name || name.length < 2) {
    return { success: false, message: 'Name must be at least 2 characters' }
  }
  
  if (!house) {
    return { success: false, message: 'Please select a house' }
  }
  
  if (!level || parseInt(level) < 1 || parseInt(level) > 100) {
    return { success: false, message: 'Level must be between 1 and 100' }
  }
  
  // Simulate random failure (10% chance)
  if (Math.random() < 0.1) {
    return { success: false, message: 'Server error. Please try again.' }
  }
  
  return { 
    success: true, 
    message: `Welcome, ${name} of House ${house}! You're registered at level ${level}.` 
  }
}

// Simulated battle action
async function castSpell(
  prevState: { damage: number; message: string } | null,
  formData: FormData
): Promise<{ damage: number; message: string }> {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const spell = formData.get('spell') as string
  const target = formData.get('target') as string
  
  const damages: Record<string, number> = {
    fireball: 25,
    icestorm: 20,
    lightning: 30,
    heal: -15
  }
  
  const damage = damages[spell] || 10
  
  return {
    damage,
    message: `Cast ${spell} on ${target}! ${damage > 0 ? `Dealt ${damage} damage!` : `Healed ${Math.abs(damage)} HP!`}`
  }
}

export default function UseActionStateDemo() {
  const [registerState, registerAction, registerPending] = useActionState(registerWizard, null)
  const [battleState, battleAction, battlePending] = useActionState(castSpell, null)
  const [battleLog, setBattleLog] = useState<string[]>([])

  // Update battle log when spell is cast
  if (battleState?.message && !battleLog.includes(battleState.message)) {
    setBattleLog(prev => [...prev.slice(-4), battleState.message])
  }

  return (
    <div>
      <div className="hook-header">
        <span className="hook-category">React 19 Hook</span>
        <h2>useActionState</h2>
        <p className="hook-description">
          Manages form state with async actions. Provides the action result, a wrapped 
          action function, and pending state automatically. Perfect for form submissions 
          that call server actions.
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`const [state, formAction, isPending] = useActionState(
  action,      // Async function: (prevState, formData) => newState
  initialState // Initial state value
)

// Use with form
<form action={formAction}>
  <input name="field" />
  <button disabled={isPending}>
    {isPending ? 'Submitting...' : 'Submit'}
  </button>
</form>`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>When to Use</h3>
        <ul className="demo-list" style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Form submissions</strong> — With server actions or async handlers
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Mutations with feedback</strong> — Show success/error states
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Replace manual loading states</strong> — isPending is automatic
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Progressive enhancement</strong> — Works without JS
          </li>
        </ul>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Registration Form</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Submit the form to see loading state and success/error handling.
        </p>
        
        <form action={registerAction} className="wizard-card">
          <div className="form-group">
            <label htmlFor="name">Wizard Name</label>
            <input
              id="name"
              name="name"
              className="input"
              placeholder="Enter your name..."
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="house">House</label>
            <select 
              id="house"
              name="house" 
              className="input"
              style={{ appearance: 'auto' }}
            >
              <option value="">Select a house...</option>
              <option value="Gryffin">Gryffin</option>
              <option value="Ravenclaw">Ravenclaw</option>
              <option value="Hufflepuff">Hufflepuff</option>
              <option value="Slytherin">Slytherin</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="level">Magic Level (1-100)</label>
            <input
              id="level"
              name="level"
              type="number"
              className="input"
              min="1"
              max="100"
              defaultValue="1"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn"
            disabled={registerPending}
            style={{ width: '100%', marginTop: '8px' }}
          >
            {registerPending ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span className="spinner" style={{ width: '16px', height: '16px' }} />
                Registering...
              </span>
            ) : (
              'Register Wizard'
            )}
          </button>
          
          {registerState && (
            <div 
              className={`info-box ${registerState.success ? 'success' : 'warning'}`}
              style={{ marginTop: '16px' }}
            >
              <p>{registerState.message}</p>
            </div>
          )}
        </form>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Battle Action</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Cast spells to see action state updates.
        </p>
        
        <form action={battleAction}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Spell</label>
              <select name="spell" className="input" style={{ appearance: 'auto' }}>
                <option value="fireball">Fireball (25 dmg)</option>
                <option value="icestorm">Ice Storm (20 dmg)</option>
                <option value="lightning">Lightning (30 dmg)</option>
                <option value="heal">Heal (-15 dmg)</option>
              </select>
            </div>
            
            <div className="form-group" style={{ margin: 0 }}>
              <label>Target</label>
              <input
                name="target"
                className="input"
                defaultValue="Dark Wizard"
                placeholder="Target name..."
              />
            </div>
            
            <button 
              type="submit" 
              className="btn"
              disabled={battlePending}
            >
              {battlePending ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="spinner" style={{ width: '16px', height: '16px' }} />
                  Casting...
                </span>
              ) : (
                'Cast Spell!'
              )}
            </button>
          </div>
        </form>
        
        <div className="result-display" style={{ marginTop: '16px' }}>
          <div className="result-label">Battle Log</div>
          {battleLog.length > 0 ? (
            battleLog.map((log, i) => (
              <div 
                key={i} 
                style={{ 
                  color: log.includes('Healed') ? '#4ade80' : '#f59e0b',
                  padding: '4px 0'
                }}
              >
                {log}
              </div>
            ))
          ) : (
            <div style={{ color: '#6b7280' }}>Cast a spell to begin...</div>
          )}
        </div>
      </div>

      <div className="demo-section">
        <h3>Action Function Signature</h3>
        <div className="code-block">
          <pre>{`// Action receives previous state and form data
async function myAction(
  prevState: StateType | null,  // Previous return value (or initial)
  formData: FormData            // Form data from submission
): Promise<StateType> {
  
  const name = formData.get('name')
  
  // Validate
  if (!name) {
    return { error: 'Name required' }
  }
  
  // Perform async operation
  await saveToDatabase(name)
  
  // Return new state
  return { success: true, message: 'Saved!' }
}`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>Compared to Manual State</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="info-box warning">
            <h5>❌ Manual Approach</h5>
            <div className="code-block" style={{ marginTop: '8px' }}>
              <pre style={{ fontSize: '0.75rem' }}>{`const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const [data, setData] = useState(null)

async function handleSubmit(e) {
  e.preventDefault()
  setLoading(true)
  setError(null)
  try {
    const result = await submit(formData)
    setData(result)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}`}</pre>
            </div>
          </div>
          <div className="info-box success">
            <h5>✅ useActionState</h5>
            <div className="code-block" style={{ marginTop: '8px' }}>
              <pre style={{ fontSize: '0.75rem' }}>{`const [state, action, pending] = 
  useActionState(submitAction, null)

// That's it! 
// - pending is automatic
// - state contains result/error
// - No try/catch needed
// - Works with form action`}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="info-box">
        <h5>💡 Key Benefits</h5>
        <ul>
          <li><strong>Automatic pending state</strong> — No manual loading management</li>
          <li><strong>Progressive enhancement</strong> — Form works without JavaScript</li>
          <li><strong>Server Actions ready</strong> — Works seamlessly with Next.js/Remix</li>
          <li><strong>Optimistic updates</strong> — Can show optimistic state before completion</li>
          <li><strong>Error handling</strong> — State contains both success and error info</li>
        </ul>
      </div>
    </div>
  )
}
