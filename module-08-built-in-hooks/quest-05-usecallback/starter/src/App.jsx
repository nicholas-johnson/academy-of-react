import { useState, useCallback, memo } from "react";
import "./App.css";

// TODO: Wrap SpellButton in React.memo

function SpellButton({ onCast, spellName }) {
  console.log(`SpellButton "${spellName}" rendered`);
  
  return (
    <button className="btn btn-primary" onClick={onCast}>
      Cast {spellName}
    </button>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // TODO: Wrap this in useCallback
  const castFireball = () => {
    setCount(count + 1);
    console.log("Fireball cast!");
  };

  return (
    <div className="app">
      <h1>useCallback Demo</h1>
      <p className="subtitle">Optimizing function references</p>

      <div className="stats">
        <p>Spells Cast: {count}</p>
        <p>Other State: {otherState}</p>
      </div>

      <SpellButton onCast={castFireball} spellName="Fireball" />
      
      <button 
        className="btn btn-secondary" 
        onClick={() => setOtherState(otherState + 1)}
      >
        Update Other State
      </button>

      <div className="info-box">
        <h3>Your Task</h3>
        <ul>
          <li>Wrap castFireball in useCallback</li>
          <li>Add correct dependencies</li>
          <li>Wrap SpellButton in React.memo</li>
          <li>Check console - button shouldn't re-render when other state changes</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
