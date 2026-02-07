import { useState } from 'react'
import './App.css'

function App() {
  // Demo 1: Basic Counter
  const [count, setCount] = useState(0);

  // Demo 2: Controlled Input
  const [name, setName] = useState('');

  // Demo 3: Conditional Rendering
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <h1>⚡ State Crystal Training</h1>
      
      {/* Demo 1: Counter */}
      <div className="counter">
        <h2>Energy Counter</h2>
        <div className="count">{count}</div>
        <button onClick={() => setCount(count + 1)}>Add Energy</button>
        <button onClick={() => setCount(count - 1)}>Use Energy</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      {/* Demo 2: Controlled Input */}
      <div className="counter">
        <h2>Wizard Name Registration</h2>
        <input
          type="text"
          placeholder="Enter your wizard name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {name && (
          <div className="message">
            Welcome, {name}! 🧙‍♂️
          </div>
        )}
      </div>

      {/* Demo 3: Conditional Rendering */}
      <div className="counter">
        <h2>Secret Passage</h2>
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Hide' : 'Reveal'} Passage
        </button>
        {isVisible && (
          <div className="message">
            🚪 The secret passage to the library is behind the portrait!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;





