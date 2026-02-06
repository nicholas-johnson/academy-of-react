import { useId, useState } from 'react'

// Reusable form field component
function FormField({ 
  label, 
  type = 'text',
  placeholder = ''
}: { 
  label: string
  type?: string
  placeholder?: string
}) {
  // Generate unique ID for accessibility
  const id = useId()
  
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input 
        id={id}
        type={type}
        className="input"
        placeholder={placeholder}
        aria-describedby={`${id}-help`}
      />
      <small id={`${id}-help`} style={{ color: '#6b7280', fontSize: '0.8rem' }}>
        Field ID: {id}
      </small>
    </div>
  )
}

// Multiple instances of same component
function WizardRegistrationForm() {
  const formId = useId()
  
  return (
    <form aria-labelledby={`${formId}-title`}>
      <h4 id={`${formId}-title`} style={{ color: '#a5b4fc', marginBottom: '16px' }}>
        Wizard Registration
      </h4>
      <FormField label="Wizard Name" placeholder="Enter your name..." />
      <FormField label="Email" type="email" placeholder="wizard@academy.com" />
      <FormField label="Magic Level" type="number" placeholder="1-100" />
    </form>
  )
}

// Checkbox group with proper accessibility
function HouseSelector() {
  const groupId = useId()
  const [selected, setSelected] = useState<string | null>(null)
  
  const houses = ['Gryffin', 'Ravenclaw', 'Hufflepuff', 'Slytherin']
  
  return (
    <fieldset role="radiogroup" aria-labelledby={`${groupId}-legend`}>
      <legend id={`${groupId}-legend`} style={{ color: '#a5b4fc', marginBottom: '12px' }}>
        Select Your House
      </legend>
      {houses.map((house, index) => {
        const optionId = `${groupId}-${index}`
        return (
          <label 
            key={house}
            htmlFor={optionId}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '8px',
              cursor: 'pointer',
              background: selected === house ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
              borderRadius: '6px',
              marginBottom: '4px'
            }}
          >
            <input
              type="radio"
              id={optionId}
              name={`${groupId}-house`}
              value={house}
              checked={selected === house}
              onChange={() => setSelected(house)}
            />
            {house}
          </label>
        )
      })}
    </fieldset>
  )
}

export default function UseIdDemo() {
  const [showSecondForm, setShowSecondForm] = useState(false)
  const demoId = useId()

  return (
    <div>
      <div className="hook-header">
        <span className="hook-category">Other Hook</span>
        <h2>useId</h2>
        <p className="hook-description">
          Generates unique IDs that are stable across server and client rendering. 
          Essential for accessibility attributes (htmlFor, aria-describedby) without 
          ID collisions when components are reused.
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`const id = useId()

// Use for accessibility attributes
<label htmlFor={id}>Name</label>
<input id={id} />

// Create related IDs
<input id={id} aria-describedby={\`\${id}-error\`} />
<span id={\`\${id}-error\`}>Error message</span>`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>When to Use</h3>
        <ul className="demo-list" style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Form accessibility</strong> — Linking labels to inputs
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>ARIA attributes</strong> — aria-describedby, aria-labelledby
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Reusable components</strong> — Multiple instances need unique IDs
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Server rendering</strong> — IDs must match between server and client
          </li>
        </ul>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Reusable Form Fields</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Each FormField component generates its own unique ID automatically.
          Check the IDs shown below each field — they're all unique!
        </p>
        
        <WizardRegistrationForm />
      </div>

      <div className="interactive-demo">
        <h4>Try It: Multiple Form Instances</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Add a second form — useId ensures no ID collisions occur.
        </p>
        
        <button 
          className="btn btn-small"
          onClick={() => setShowSecondForm(!showSecondForm)}
          style={{ marginBottom: '16px' }}
        >
          {showSecondForm ? 'Hide' : 'Show'} Second Form
        </button>
        
        <div style={{ display: 'grid', gridTemplateColumns: showSecondForm ? '1fr 1fr' : '1fr', gap: '24px' }}>
          <div className="wizard-card">
            <WizardRegistrationForm />
          </div>
          {showSecondForm && (
            <div className="wizard-card">
              <WizardRegistrationForm />
            </div>
          )}
        </div>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Radio Group</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Properly accessible radio group with unique IDs.
        </p>
        
        <div className="wizard-card">
          <HouseSelector />
        </div>
      </div>

      <div className="demo-section">
        <h3>Creating Related IDs</h3>
        <div className="code-block">
          <pre>{`function PasswordField() {
  const id = useId()
  const [error, setError] = useState('')
  
  return (
    <div>
      <label htmlFor={id}>Password</label>
      <input 
        id={id}
        type="password"
        aria-describedby={\`\${id}-requirements \${id}-error\`}
      />
      <p id={\`\${id}-requirements\`}>
        Must be 8+ characters
      </p>
      {error && (
        <p id={\`\${id}-error\`} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}`}</pre>
        </div>
      </div>

      <div className="info-box warning">
        <h5>⚠️ Don't Use For</h5>
        <ul>
          <li><strong>List keys</strong> — Use data IDs or indexes instead</li>
          <li><strong>CSS selectors</strong> — IDs have colons, not valid in CSS</li>
          <li><strong>Non-accessibility purposes</strong> — It's specifically for a11y</li>
        </ul>
        <div className="code-block" style={{ marginTop: '12px' }}>
          <pre>{`// ❌ Don't use for list keys
{items.map(item => (
  <li key={useId()}>  // Wrong! Creates new ID each render
))}

// ✅ Use data IDs
{items.map(item => (
  <li key={item.id}>  // Correct!
))}`}</pre>
        </div>
      </div>

      <div className="info-box success">
        <h5>✅ Why Not Use Random IDs?</h5>
        <ul>
          <li><strong>Server/Client match</strong> — useId produces same ID on both</li>
          <li><strong>Hydration safety</strong> — Random IDs cause mismatches</li>
          <li><strong>Stability</strong> — Same component instance = same ID</li>
        </ul>
      </div>

      <div className="result-display">
        <div className="result-label">Demo Component ID</div>
        <div className="result-value" style={{ fontSize: '1rem' }}>{demoId}</div>
        <p style={{ color: '#6b7280', marginTop: '8px', fontSize: '0.85rem' }}>
          This ID is generated by useId() and will be consistent across server and client renders.
        </p>
      </div>
    </div>
  )
}
