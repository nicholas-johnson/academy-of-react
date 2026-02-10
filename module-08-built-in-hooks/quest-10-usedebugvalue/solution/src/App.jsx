import { useState, useDebugValue } from "react";
import "./App.css";

// Custom hook with useDebugValue
function useSpellPower(baseLevel) {
  const [multiplier, setMultiplier] = useState(1);
  const power = baseLevel * multiplier;

  // Show debug info in React DevTools
  useDebugValue(power, (p) => `Power: ${p}`);
  
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
        <h3>useDebugValue Key Points</h3>
        <ul>
          <li>Only for custom hooks</li>
          <li>Shows value in React DevTools</li>
          <li>Optional formatter function</li>
          <li>No runtime cost in production</li>
          <li>Open DevTools Components tab to see it!</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
