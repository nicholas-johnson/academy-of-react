import { useRef, useImperativeHandle, forwardRef, useState } from 'react'

// Define the imperative handle interface
interface WizardInputHandle {
  focus: () => void
  clear: () => void
  getValue: () => string
  shake: () => void
}

// Custom input with imperative handle
const WizardInput = forwardRef<WizardInputHandle, { placeholder?: string }>(
  function WizardInput({ placeholder }, ref) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState('')
    const [isShaking, setIsShaking] = useState(false)

    // Expose limited, controlled API to parent
    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus()
      },
      clear() {
        setValue('')
        inputRef.current?.focus()
      },
      getValue() {
        return value
      },
      shake() {
        setIsShaking(true)
        setTimeout(() => setIsShaking(false), 500)
      }
    }), [value])

    return (
      <input
        ref={inputRef}
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          animation: isShaking ? 'shake 0.5s ease' : 'none'
        }}
      />
    )
  }
)

// Modal with imperative handle
interface ModalHandle {
  open: () => void
  close: () => void
  toggle: () => void
}

const Modal = forwardRef<ModalHandle, { title: string; children: React.ReactNode }>(
  function Modal({ title, children }, ref) {
    const [isOpen, setIsOpen] = useState(false)

    useImperativeHandle(ref, () => ({
      open() {
        setIsOpen(true)
      },
      close() {
        setIsOpen(false)
      },
      toggle() {
        setIsOpen(prev => !prev)
      }
    }), [])

    if (!isOpen) return null

    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: '#1f2937',
          padding: '24px',
          borderRadius: '12px',
          border: '2px solid #667eea',
          maxWidth: '400px',
          width: '90%'
        }}>
          <h3 style={{ color: '#667eea', marginBottom: '16px' }}>{title}</h3>
          {children}
          <button 
            className="btn btn-small btn-secondary" 
            onClick={() => setIsOpen(false)}
            style={{ marginTop: '16px' }}
          >
            Close
          </button>
        </div>
      </div>
    )
  }
)

export default function UseImperativeHandleDemo() {
  const inputRef = useRef<WizardInputHandle>(null)
  const modalRef = useRef<ModalHandle>(null)
  const [lastValue, setLastValue] = useState('')

  const handleSubmit = () => {
    const value = inputRef.current?.getValue()
    if (value) {
      setLastValue(value)
      inputRef.current?.clear()
    } else {
      inputRef.current?.shake()
    }
  }

  return (
    <div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
      
      <div className="hook-header">
        <span className="hook-category">Ref Hook</span>
        <h2>useImperativeHandle</h2>
        <p className="hook-description">
          Customizes the value exposed to parent components when using ref. Instead of 
          exposing the entire DOM node, you can expose a limited, controlled API. 
          Always used with forwardRef.
        </p>
      </div>

      <div className="demo-section">
        <h3>Syntax</h3>
        <div className="code-block">
          <pre>{`const MyInput = forwardRef<MyHandle, Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    // Only these methods are exposed to parent
    focus() {
      inputRef.current?.focus()
    },
    clear() {
      // Custom logic here
    }
  }), [/* dependencies */])

  return <input ref={inputRef} />
})`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h3>When to Use</h3>
        <ul className="demo-list" style={{ listStyle: 'disc', paddingLeft: '20px' }}>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Limit exposed API</strong> — Don't expose entire DOM node
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Custom component actions</strong> — focus(), open(), close(), reset()
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Encapsulation</strong> — Hide internal implementation
          </li>
          <li style={{ background: 'transparent', padding: '8px 0' }}>
            <strong>Imperative animations</strong> — Trigger animations from parent
          </li>
        </ul>
      </div>

      <div className="interactive-demo">
        <h4>Try It: Custom Input Handle</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          The parent can call focus(), clear(), getValue(), and shake() — but can't 
          access the raw DOM input.
        </p>
        
        <div className="form-group">
          <label>Wizard Name Input</label>
          <WizardInput ref={inputRef} placeholder="Enter wizard name..." />
        </div>
        
        <div className="button-group" style={{ marginTop: '16px' }}>
          <button className="btn btn-small" onClick={() => inputRef.current?.focus()}>
            Focus
          </button>
          <button className="btn btn-small" onClick={() => inputRef.current?.clear()}>
            Clear
          </button>
          <button className="btn btn-small" onClick={() => inputRef.current?.shake()}>
            Shake
          </button>
          <button className="btn btn-small" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        
        {lastValue && (
          <div className="result-display" style={{ marginTop: '16px' }}>
            <div className="result-label">Last submitted value</div>
            <div className="result-value">{lastValue}</div>
          </div>
        )}
      </div>

      <div className="interactive-demo">
        <h4>Try It: Modal Handle</h4>
        <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '0.9rem' }}>
          Parent controls modal imperatively with open(), close(), and toggle().
        </p>
        
        <div className="button-group">
          <button className="btn btn-small" onClick={() => modalRef.current?.open()}>
            Open Modal
          </button>
          <button className="btn btn-small btn-secondary" onClick={() => modalRef.current?.toggle()}>
            Toggle Modal
          </button>
        </div>
        
        <Modal ref={modalRef} title="Spell Information">
          <p style={{ color: '#d1d5db' }}>
            This modal is controlled imperatively through its ref handle. 
            The parent doesn't need to manage isOpen state!
          </p>
        </Modal>
      </div>

      <div className="demo-section">
        <h3>Complete Pattern</h3>
        <div className="code-block">
          <pre>{`// 1. Define the handle interface
interface VideoPlayerHandle {
  play: () => void
  pause: () => void
  seek: (time: number) => void
}

// 2. Create component with forwardRef
const VideoPlayer = forwardRef<VideoPlayerHandle, Props>((props, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current?.play()
    },
    pause() {
      videoRef.current?.pause()
    },
    seek(time: number) {
      if (videoRef.current) {
        videoRef.current.currentTime = time
      }
    }
  }), [])

  return <video ref={videoRef} {...props} />
})

// 3. Use in parent
function Parent() {
  const playerRef = useRef<VideoPlayerHandle>(null)
  
  return (
    <>
      <VideoPlayer ref={playerRef} src="..." />
      <button onClick={() => playerRef.current?.play()}>Play</button>
    </>
  )
}`}</pre>
        </div>
      </div>

      <div className="info-box warning">
        <h5>⚠️ Use Sparingly</h5>
        <p>
          Imperative code is harder to reason about. Prefer declarative patterns 
          (props and state) when possible. Use useImperativeHandle only when you 
          need to expose imperative methods like focus, scroll, or animation triggers.
        </p>
      </div>
    </div>
  )
}
