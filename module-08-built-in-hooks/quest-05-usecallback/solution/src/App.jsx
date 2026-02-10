import { useState, useCallback, memo } from "react";
import "./App.css";

const SpellButton = memo(function SpellButton({ onCast, spellName }) {
  console.log(`SpellButton "${spellName}" rendered`);
  
  return (
    <button className="btn btn-primary" onClick={onCast}>
      Cast {spellName}
    </button>
  );
});

function App() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  const castFireball = useCallback(() => {
    setCount((c) => c + 1);
    console.log("Fireball cast!");
  }, []); // No dependencies - uses functional setState

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
        <h3>useCallback Key Points</h3>
        <ul>
          <li>Returns memoized version of callback</li>
          <li>Only changes if dependencies change</li>
          <li>Prevents child re-renders with React.memo</li>
          <li>Use functional setState to avoid dependencies</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
