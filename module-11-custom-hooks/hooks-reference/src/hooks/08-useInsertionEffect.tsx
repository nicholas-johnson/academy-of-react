import { useInsertionEffect, useLayoutEffect, useEffect, useState } from 'react'

// Simulated CSS-in-JS library behavior
let styleRules: Map<string, string> = new Map()

function useCustomStyles(styles: Record<string, string>) {
  const className = `dynamic-${Math.random().toString(36).slice(2, 8)}`
  
  // useInsertionEffect is for CSS-in-JS libraries
  // It fires before useLayoutEffect, allowing styles to be injected
  // before any DOM measurements
  useInsertionEffect(() => {
    const cssText = Object.entries(styles)
      .map(([prop, value]) => `${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
      .join('; ')
    
    // In a real CSS-in-JS library, this would inject a <style> tag
    styleRules.set(className, cssText)
    
    // For demo purposes, create actual style
    const styleEl = document.createElement('style')
    styleEl.textContent = `.${className} { ${cssText} }`
    document.head.appendChild(styleEl)
    
    return () => {
      styleRules.delete(className)
      document.head.removeChild(styleEl)
    }
  }, [JSON.stringify(styles)])
  
  return className
}

// Demo component using "CSS-in-JS"
function StyledBox({ color, size }: { color: string; size: number }) {
  const className = useCustomStyles({
    backgroundColor: color,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold'
  })
  
  return <div className={className}>{size}px</div>
}

export default function UseInsertionEffectDemo() {
  const [color, setColor] = useState('#667eea')
  const [size, setSize] = useState(100)
  const [effectOrder, setEffectOrder] = useState<string[]>([])

  // Demonstrate execution order
  useInsertionEffect(() => {
    setEffectOrder(prev => [...prev.slice(-4), '1. useInsertionEffect'])
  })

  useLayoutEffect(() => {
    setEffectOrder(prev => [...prev.slice(-4), '2. useLayoutEffect'])
  })

  useEffect(() => {
    setEffectOrder(prev => [...prev.slice(-4), '3. useEffect'])
  })

  const colors = ['#667eea', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6']

  return (
    <div>
      <div className="hook-header">
        <span className="hook-category">Effect Hook</span>
        <h2>useInsertionEffect</h2>
        <p className="hook-description">
          Fires before DOM mutations. Designed specifically for CSS-in-JS libraries 
          to inject styles before useLayoutEffect reads them. You probably don't 
          need this unless you're building a CSS-in-JS library.
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`useInsertionEffect(() => {
  // Inject styles BEFORE any DOM mutations
  const styleTag = document.createElement('style')
  styleTag.textContent = '.my-class { color: red }'
  document.head.appendChild(styleTag)
  
  return () => {
    document.head.removeChild(styleTag)
  }
}, [dependencies])`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>Execution Order</h3>
        <div className="code-block">
          <pre>{`Render
   ↓
useInsertionEffect  ← Styles injected (for CSS-in-JS)
   ↓
DOM mutations
   ↓
useLayoutEffect     ← DOM measurements (styles are ready!)
   ↓
Browser paint
   ↓
useEffect           ← Side effects`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>When to Use</h3>
        <div className="info-box warning">
          <h5>⚠️ Library Authors Only</h5>
          <p>
            useInsertionEffect is intended for CSS-in-JS library authors (styled-components, 
            emotion, etc.). If you're not building such a library, you almost certainly 
            don't need this hook.
          </p>
        </div>
        
        <ul className="demo-list" style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '16px' }}>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            Injecting dynamic &lt;style&gt; tags
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            CSS-in-JS runtime style injection
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            Ensuring styles exist before DOM measurements
          </li>
        </ul>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Effect Execution Order</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Watch the order in which effects fire when state changes.
        </p>
        
        <button 
          className="btn btn-small"
          onClick={() => setSize(s => s === 100 ? 150 : 100)}
          style={{ marginBottom: '16px' }}
        >
          Trigger Re-render
        </button>
        
        <div className="result-display">
          <div className="result-label">Effect Execution Log</div>
          <div style={{ marginTop: '8px' }}>
            {effectOrder.map((entry, i) => (
              <div 
                key={i} 
                style={{ 
                  padding: '4px 0',
                  color: entry.includes('Insertion') ? '#f59e0b' : 
                         entry.includes('Layout') ? '#22c55e' : '#667eea'
                }}
              >
                {entry}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="interactive-demo">
        <h4>Try It: CSS-in-JS Simulation</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          This simulates how CSS-in-JS libraries use useInsertionEffect to inject styles.
        </p>
        
        <div className="form-group">
          <label>Box Color</label>
          <div className="button-group">
            {colors.map(c => (
              <button
                key={c}
                className="btn btn-small"
                style={{ 
                  background: c,
                  outline: c === color ? '2px solid white' : 'none',
                  outlineOffset: '2px'
                }}
                onClick={() => setColor(c)}
              >
                &nbsp;
              </button>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label>Box Size: {size}px</label>
          <input
            type="range"
            min="50"
            max="200"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            style={{ width: '100%', maxWidth: '300px' }}
          />
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '24px',
          background: '#1a1a2e',
          borderRadius: '8px'
        }}>
          <StyledBox color={color} size={size} />
        </div>
      </div>

      <div className="demo-section">
        <h3>Why CSS-in-JS Libraries Need This</h3>
        <div className="code-block">
          <pre>{`// Problem: Without useInsertionEffect
function Component() {
  // 1. Component renders with className
  const className = getStyle({ width: '100px' })
  
  // 2. useLayoutEffect measures the element
  useLayoutEffect(() => {
    // ❌ Styles might not be injected yet!
    const width = element.offsetWidth // Wrong measurement
  })
}

// Solution: With useInsertionEffect
function Component() {
  const className = getStyle({ width: '100px' })
  
  // CSS-in-JS library internally uses:
  useInsertionEffect(() => {
    // ✅ Styles injected FIRST
    injectStyles(className, { width: '100px' })
  })
  
  useLayoutEffect(() => {
    // ✅ Now measurements are accurate
    const width = element.offsetWidth // Correct!
  })
}`}</pre>
        </div>
      </div>

      <div className="info-box">
        <h5>💡 Key Points</h5>
        <ul>
          <li>Fires synchronously before DOM mutations</li>
          <li>Cannot access refs (DOM not updated yet)</li>
          <li>Cannot schedule state updates</li>
          <li>Only use for style injection</li>
          <li>99% of apps will never use this directly</li>
        </ul>
      </div>
    </div>
  )
}
