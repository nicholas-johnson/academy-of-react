import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [spellInput, setSpellInput] = useState('')
  const [history, setHistory] = useState([])
  const inputRef = useRef(null)

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (spellInput.trim()) {
      setHistory([...history, spellInput])
      setSpellInput('')
      inputRef.current?.focus()
    }
  }

  const handleClearAndFocus = () => {
    setSpellInput('')
    setHistory([])
    inputRef.current?.focus()
  }

  return (
    <div className="app">
      <h1>⚔️ Battle Command Prompt</h1>
      <p>Quick spell casting interface</p>

      <form onSubmit={handleSubmit} className="command-form">
        <input
          ref={inputRef}
          type="text"
          value={spellInput}
          onChange={(e) => setSpellInput(e.target.value)}
          placeholder="Enter spell name..."
          className="command-input"
        />
        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            Cast Spell
          </button>
          <button 
            type="button" 
            onClick={handleClearAndFocus}
            className="btn btn-secondary"
          >
            Clear & Focus
          </button>
        </div>
      </form>

      <div className="history-section">
        <h3>Command History ({history.length})</h3>
        {history.length === 0 ? (
          <p className="empty-message">No spells cast yet</p>
        ) : (
          <ul className="history-list">
            {history.map((spell, index) => (
              <li key={index}>
                <span className="history-number">#{index + 1}</span>
                <span className="spell-name">{spell}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
