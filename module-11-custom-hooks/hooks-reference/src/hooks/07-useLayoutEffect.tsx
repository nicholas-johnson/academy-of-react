import { useLayoutEffect, useEffect, useState, useRef } from 'react'

export default function UseLayoutEffectDemo() {
  const [boxWidth, setBoxWidth] = useState(0)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [showTooltip, setShowTooltip] = useState(false)
  const [useLayout, setUseLayout] = useState(true)
  
  const boxRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Measure element with useLayoutEffect (synchronous, before paint)
  useLayoutEffect(() => {
    if (boxRef.current) {
      setBoxWidth(boxRef.current.getBoundingClientRect().width)
    }
  }, [])

  // Tooltip positioning - must happen before paint to avoid flicker
  useLayoutEffect(() => {
    if (showTooltip && buttonRef.current && tooltipRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      
      setTooltipPosition({
        top: buttonRect.top - tooltipRect.height - 8,
        left: buttonRect.left + (buttonRect.width - tooltipRect.width) / 2
      })
    }
  }, [showTooltip])

  // Demonstration of timing difference
  const [effectLog, setEffectLog] = useState<string[]>([])

  useLayoutEffect(() => {
    if (useLayout) {
      setEffectLog(prev => [...prev, 'useLayoutEffect ran (before paint)'])
    }
  }, [useLayout])

  useEffect(() => {
    if (!useLayout) {
      setEffectLog(prev => [...prev, 'useEffect ran (after paint)'])
    }
  }, [useLayout])

  return (
    <div>
      <div className="hook-header">
        <span className="hook-category">Effect Hook</span>
        <h2>useLayoutEffect</h2>
        <p className="hook-description">
          Identical to useEffect, but fires synchronously after DOM mutations and before 
          the browser paints. Use for DOM measurements and mutations that must happen 
          before the user sees the update.
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`useLayoutEffect(() => {
  // Runs synchronously after DOM update, before paint
  const rect = element.getBoundingClientRect()
  setPosition(rect)
  
  return () => {
    // Cleanup (same as useEffect)
  }
}, [dependencies])`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>useEffect vs useLayoutEffect Timing</h3>
        <div className="code-block">
          <pre>{`Render → DOM Update → useLayoutEffect → Paint → useEffect

useLayoutEffect:
  ✓ Blocks painting (synchronous)
  ✓ Good for: measurements, preventing flicker
  ✗ Can cause performance issues if slow

useEffect:
  ✓ Non-blocking (asynchronous)
  ✓ Good for: data fetching, subscriptions
  ✓ Preferred in most cases`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>When to Use</h3>
        <ul className="demo-list" style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>DOM measurements</strong> — getBoundingClientRect, scroll position
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Tooltip/popover positioning</strong> — Must measure before showing
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Animations</strong> — Set initial position before animating
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Preventing visual flicker</strong> — When useEffect causes visible jump
          </li>
        </ul>
      </div>

      <div className="interactive-demo">
        <h4>Try It: DOM Measurement</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          The box width is measured synchronously before paint using useLayoutEffect.
        </p>
        
        <div 
          ref={boxRef}
          className="wizard-card"
          style={{ 
            width: '100%',
            maxWidth: '400px'
          }}
        >
          <div className="name">Measurement Demo</div>
          <p style={{ color: '#9ca3af', marginTop: '8px' }}>
            This box's width is: <strong>{boxWidth}px</strong>
          </p>
          <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '8px' }}>
            Try resizing the window — the measurement updates without flicker.
          </p>
        </div>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Tooltip Positioning</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Tooltip position is calculated before paint to avoid visual jump.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0 20px' }}>
          <button 
            ref={buttonRef}
            className="btn"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            Hover for Tooltip
          </button>
        </div>
        
        {showTooltip && (
          <div 
            ref={tooltipRef}
            style={{
              position: 'fixed',
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              background: '#1f2937',
              border: '1px solid #667eea',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              color: '#e5e7eb',
              zIndex: 1000,
              pointerEvents: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            This tooltip is positioned with useLayoutEffect!
          </div>
        )}
      </div>

      <div className="demo-section">
        <h3>Example: Preventing Flicker</h3>
        <div className="code-block">
          <pre>{`function Tooltip({ targetRef, children }) {
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const tooltipRef = useRef()

  // ✅ useLayoutEffect: Position calculated BEFORE paint
  // No flicker, tooltip appears in correct position
  useLayoutEffect(() => {
    const targetRect = targetRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    
    setPosition({
      top: targetRect.top - tooltipRect.height - 8,
      left: targetRect.left + (targetRect.width - tooltipRect.width) / 2
    })
  }, [])

  // ❌ useEffect would cause tooltip to flash at (0,0) first
  
  return <div ref={tooltipRef} style={position}>{children}</div>
}`}</pre>
        </div>
      </div>

      <div className="info-box warning">
        <h5>⚠️ Performance Warning</h5>
        <p>
          useLayoutEffect blocks the browser from painting. If your effect is slow, 
          it will delay the visual update and make your app feel sluggish. 
        </p>
        <p style={{ marginTop: '8px' }}>
          <strong>Rule of thumb:</strong> Start with useEffect. Only switch to 
          useLayoutEffect if you see visual flicker or need measurements.
        </p>
      </div>

      <div className="info-box success">
        <h5>✅ Decision Guide</h5>
        <ul>
          <li>Need DOM measurements? → <strong>useLayoutEffect</strong></li>
          <li>Positioning popups/tooltips? → <strong>useLayoutEffect</strong></li>
          <li>Data fetching? → <strong>useEffect</strong></li>
          <li>Event subscriptions? → <strong>useEffect</strong></li>
          <li>Not sure? → <strong>useEffect</strong> (default choice)</li>
        </ul>
      </div>
    </div>
  )
}
