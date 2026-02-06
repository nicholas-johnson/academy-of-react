import { useReducer } from 'react'

// Define types
interface WizardState {
  name: string
  health: number
  mana: number
  level: number
  gold: number
  inventory: string[]
}

type WizardAction =
  | { type: 'TAKE_DAMAGE'; amount: number }
  | { type: 'HEAL'; amount: number }
  | { type: 'CAST_SPELL'; manaCost: number }
  | { type: 'REST' }
  | { type: 'LEVEL_UP' }
  | { type: 'ADD_GOLD'; amount: number }
  | { type: 'ADD_ITEM'; item: string }
  | { type: 'REMOVE_ITEM'; item: string }
  | { type: 'RESET' }

const initialState: WizardState = {
  name: 'Apprentice Wizard',
  health: 100,
  mana: 100,
  level: 1,
  gold: 50,
  inventory: ['Health Potion', 'Mana Crystal']
}

// Reducer function - pure function that calculates new state
function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'TAKE_DAMAGE':
      return { ...state, health: Math.max(0, state.health - action.amount) }
    
    case 'HEAL':
      return { ...state, health: Math.min(100, state.health + action.amount) }
    
    case 'CAST_SPELL':
      if (state.mana < action.manaCost) return state
      return { ...state, mana: state.mana - action.manaCost }
    
    case 'REST':
      return { ...state, mana: Math.min(100, state.mana + 25) }
    
    case 'LEVEL_UP':
      return { 
        ...state, 
        level: state.level + 1,
        health: 100,
        mana: 100
      }
    
    case 'ADD_GOLD':
      return { ...state, gold: state.gold + action.amount }
    
    case 'ADD_ITEM':
      return { ...state, inventory: [...state.inventory, action.item] }
    
    case 'REMOVE_ITEM':
      return { 
        ...state, 
        inventory: state.inventory.filter(item => item !== action.item)
      }
    
    case 'RESET':
      return initialState
    
    default:
      return state
  }
}

export default function UseReducerDemo() {
  const [state, dispatch] = useReducer(wizardReducer, initialState)

  return (
    <div>
      <div className="hook-header">
        <span className="hook-category">State Hook</span>
        <h2>useReducer</h2>
        <p className="hook-description">
          An alternative to useState for complex state logic. Uses a reducer function 
          to manage state transitions, similar to Redux. Ideal when state updates depend 
          on previous state or involve multiple sub-values.
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`const [state, dispatch] = useReducer(reducer, initialState)

// Reducer signature
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 }
    default:
      return state
  }
}`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>When to Use (vs useState)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="info-box success">
            <h5>✅ Use useReducer</h5>
            <ul>
              <li>Complex state objects</li>
              <li>Multiple related values</li>
              <li>State depends on previous state</li>
              <li>Many different update actions</li>
              <li>Want predictable state transitions</li>
            </ul>
          </div>
          <div className="info-box">
            <h5>📌 Use useState</h5>
            <ul>
              <li>Simple primitive values</li>
              <li>Independent state pieces</li>
              <li>Straightforward updates</li>
              <li>Few update patterns</li>
              <li>Quick prototyping</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Wizard Battle System</h4>
        
        <div className="wizard-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="name">{state.name}</div>
            <div style={{ color: '#fbbf24' }}>Level {state.level}</div>
          </div>
          
          <div className="stat-grid" style={{ marginTop: '16px' }}>
            <div className="stat-card">
              <div className="label">Health</div>
              <div className="value" style={{ color: state.health < 30 ? '#ef4444' : '#4ade80' }}>
                {state.health}
              </div>
            </div>
            <div className="stat-card">
              <div className="label">Mana</div>
              <div className="value" style={{ color: '#8b5cf6' }}>{state.mana}</div>
            </div>
            <div className="stat-card">
              <div className="label">Gold</div>
              <div className="value" style={{ color: '#fbbf24' }}>{state.gold}</div>
            </div>
          </div>
          
          <div style={{ marginTop: '16px' }}>
            <div className="result-label">Inventory ({state.inventory.length} items)</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              {state.inventory.map((item, i) => (
                <span 
                  key={i}
                  style={{ 
                    padding: '4px 12px', 
                    background: '#374151', 
                    borderRadius: '16px',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', item })}
                  title="Click to remove"
                >
                  {item} ×
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <div className="result-label" style={{ marginBottom: '12px' }}>Battle Actions</div>
          <div className="button-group">
            <button 
              className="btn btn-small" 
              onClick={() => dispatch({ type: 'TAKE_DAMAGE', amount: 15 })}
            >
              Take Damage (-15 HP)
            </button>
            <button 
              className="btn btn-small" 
              onClick={() => dispatch({ type: 'HEAL', amount: 20 })}
            >
              Heal (+20 HP)
            </button>
            <button 
              className="btn btn-small" 
              onClick={() => dispatch({ type: 'CAST_SPELL', manaCost: 30 })}
              disabled={state.mana < 30}
            >
              Cast Fireball (-30 MP)
            </button>
            <button 
              className="btn btn-small btn-secondary" 
              onClick={() => dispatch({ type: 'REST' })}
            >
              Rest (+25 MP)
            </button>
          </div>
        </div>

        <div style={{ marginTop: '16px' }}>
          <div className="result-label" style={{ marginBottom: '12px' }}>Economy Actions</div>
          <div className="button-group">
            <button 
              className="btn btn-small" 
              onClick={() => dispatch({ type: 'ADD_GOLD', amount: 25 })}
            >
              Find Gold (+25)
            </button>
            <button 
              className="btn btn-small" 
              onClick={() => dispatch({ type: 'ADD_ITEM', item: 'Magic Scroll' })}
            >
              Add Scroll
            </button>
            <button 
              className="btn btn-small" 
              onClick={() => dispatch({ type: 'LEVEL_UP' })}
            >
              Level Up!
            </button>
            <button 
              className="btn btn-small btn-secondary" 
              onClick={() => dispatch({ type: 'RESET' })}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>The Reducer Pattern</h3>
        <div className="code-block">
          <pre>{`// 1. Define your state type
interface WizardState {
  health: number
  mana: number
  level: number
}

// 2. Define action types (discriminated union)
type Action =
  | { type: 'TAKE_DAMAGE'; amount: number }
  | { type: 'HEAL'; amount: number }
  | { type: 'LEVEL_UP' }

// 3. Write the reducer (pure function!)
function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case 'TAKE_DAMAGE':
      return { ...state, health: state.health - action.amount }
    case 'HEAL':
      return { ...state, health: state.health + action.amount }
    case 'LEVEL_UP':
      return { ...state, level: state.level + 1 }
    default:
      return state
  }
}

// 4. Use in component
const [state, dispatch] = useReducer(reducer, initialState)
dispatch({ type: 'TAKE_DAMAGE', amount: 10 })`}</pre>
        </div>
      </div>

      <div className="info-box">
        <h5>💡 Key Benefits</h5>
        <ul>
          <li><strong>Predictable</strong> — All state changes go through one function</li>
          <li><strong>Testable</strong> — Reducer is a pure function, easy to unit test</li>
          <li><strong>Debuggable</strong> — Log actions to trace state changes</li>
          <li><strong>Scalable</strong> — Clean pattern for complex state</li>
        </ul>
      </div>
    </div>
  )
}
