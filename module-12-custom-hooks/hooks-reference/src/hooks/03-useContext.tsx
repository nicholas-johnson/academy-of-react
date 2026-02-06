import { createContext, useContext, useState, ReactNode } from 'react'

// Create a Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

// Custom hook for using theme (best practice)
function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// Theme Provider component
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Create a Wizard Context (more complex example)
interface Wizard {
  name: string
  house: string
  level: number
}

interface WizardContextType {
  wizard: Wizard
  updateWizard: (updates: Partial<Wizard>) => void
}

const WizardContext = createContext<WizardContextType | null>(null)

function useWizard() {
  const context = useContext(WizardContext)
  if (!context) {
    throw new Error('useWizard must be used within WizardProvider')
  }
  return context
}

function WizardProvider({ children }: { children: ReactNode }) {
  const [wizard, setWizard] = useState<Wizard>({
    name: 'Apprentice',
    house: 'Gryffin',
    level: 1
  })
  
  const updateWizard = (updates: Partial<Wizard>) => {
    setWizard(prev => ({ ...prev, ...updates }))
  }
  
  return (
    <WizardContext.Provider value={{ wizard, updateWizard }}>
      {children}
    </WizardContext.Provider>
  )
}

// Components that consume context
function ThemeDisplay() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div style={{ 
      padding: '20px', 
      background: theme === 'dark' ? '#1f2937' : '#f3f4f6',
      color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
      borderRadius: '8px',
      transition: 'all 0.3s'
    }}>
      <div style={{ marginBottom: '12px' }}>
        Current theme: <strong>{theme}</strong>
      </div>
      <button className="btn btn-small" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  )
}

function WizardProfile() {
  const { wizard, updateWizard } = useWizard()
  
  return (
    <div className="wizard-card">
      <div className="name">{wizard.name}</div>
      <div style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '12px' }}>
        House {wizard.house} • Level {wizard.level}
      </div>
      <div className="button-group">
        <button 
          className="btn btn-small"
          onClick={() => updateWizard({ level: wizard.level + 1 })}
        >
          Level Up
        </button>
        <button 
          className="btn btn-small btn-secondary"
          onClick={() => updateWizard({ name: 'Master Wizard' })}
        >
          Graduate
        </button>
      </div>
    </div>
  )
}

function WizardStats() {
  const { wizard } = useWizard()
  
  return (
    <div className="stat-grid">
      <div className="stat-card">
        <div className="label">Name</div>
        <div className="value" style={{ fontSize: '1rem' }}>{wizard.name}</div>
      </div>
      <div className="stat-card">
        <div className="label">House</div>
        <div className="value" style={{ fontSize: '1rem' }}>{wizard.house}</div>
      </div>
      <div className="stat-card">
        <div className="label">Level</div>
        <div className="value">{wizard.level}</div>
      </div>
    </div>
  )
}

export default function UseContextDemo() {
  return (
    <div>
      <div className="hook-header">
        <span className="hook-category">Context Hook</span>
        <h2>useContext</h2>
        <p className="hook-description">
          Allows components to subscribe to React context. Provides a way to pass data 
          through the component tree without manually passing props at every level 
          (avoiding "prop drilling").
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`// 1. Create context
const ThemeContext = createContext<ThemeType | null>(null)

// 2. Provide context value (in parent)
<ThemeContext.Provider value={{ theme, toggleTheme }}>
  {children}
</ThemeContext.Provider>

// 3. Consume context (in any child)
const theme = useContext(ThemeContext)`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>When to Use</h3>
        <ul className="demo-list" style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li style={{ background: 'transparent', padding: '8px 0' }}>Theme (dark/light mode)</li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>Authentication state (current user)</li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>Locale/language preferences</li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>Any "global" state needed by many components</li>
        </ul>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Theme Context</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          The ThemeDisplay component reads theme from context, not props.
        </p>
        
        <ThemeProvider>
          <ThemeDisplay />
        </ThemeProvider>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Wizard Context</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Both components share the same wizard state without prop drilling.
        </p>
        
        <WizardProvider>
          <WizardProfile />
          <div style={{ marginTop: '16px' }}>
            <WizardStats />
          </div>
        </WizardProvider>
      </div>

      <div className="demo-section">
        <h3>Best Practice: Custom Hook</h3>
        <div className="code-block">
          <pre>{`// Create a custom hook for type-safe context access
function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// Usage in components
function MyComponent() {
  const { theme, toggleTheme } = useTheme() // Type-safe!
}`}</pre>
        </div>
      </div>

      <div className="info-box warning">
        <h5>⚠️ Performance Consideration</h5>
        <p>
          All components that useContext will re-render when the context value changes.
          For frequently changing values, consider:
        </p>
        <ul>
          <li>Splitting context into multiple smaller contexts</li>
          <li>Memoizing context values</li>
          <li>Using state management libraries for complex cases</li>
        </ul>
      </div>

      <div className="info-box success">
        <h5>✅ Context vs Props vs State Management</h5>
        <ul>
          <li><strong>Props</strong> — Direct parent-to-child, 1-2 levels deep</li>
          <li><strong>Context</strong> — Cross-cutting concerns, moderate frequency</li>
          <li><strong>Redux/Zustand</strong> — Complex state, high-frequency updates</li>
        </ul>
      </div>
    </div>
  )
}
