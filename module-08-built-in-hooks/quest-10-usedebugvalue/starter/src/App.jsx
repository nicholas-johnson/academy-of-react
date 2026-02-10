import { useState, useDebugValue } from "react";
import "./App.css";

// Custom hook with useDebugValue
function useSpellPower(baseLevel) {
  const [multiplier, setMultiplier] = useState(1);
  const power = baseLevel * multiplier;

  // TODO: Add useDebugValue here
  
  return [power, setMultiplier];
}

function SpellDisplay({ name, baseLevel }) {
  const [power, setMultiplier] = useSpellPower(baseLevel);

  return (
    <div className="spell-card">
      <h3>{name}</h3>
      <p>Base: {baseLevel}</p>
      <p className="power">Power: {power}</p>
      <div className="button-group">
        <button className="btn btn-primary" onClick={() => setMultiplier((m) => m + 0.5)}>
          Boost (+0.5x)
        </button>
        <button className="btn btn-secondary" onClick={() => setMultiplier(1)}>
          Reset
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <h1>useDebugValue Demo</h1>
      <p className="subtitle">Open React DevTools to see debug info!</p>

      <div className="spell-grid">
        <SpellDisplay name="Fireball" baseLevel={40} />
        <SpellDisplay name="Ice Blast" baseLevel={35} />
        <SpellDisplay name="Lightning" baseLevel={50} />
      </div>

      <div className="info-box">
        <h3>Your Task</h3>
        <ul>
          <li>Add useDebugValue inside useSpellPower hook</li>
          <li>Display the current power value</li>
          <li>Optional: Add formatter function</li>
          <li>Open React DevTools to see the debug label!</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
