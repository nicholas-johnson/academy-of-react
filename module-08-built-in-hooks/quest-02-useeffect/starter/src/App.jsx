import { useState } from "react";
import "./App.css";

function App() {
  const [mana, setMana] = useState(100);

  // TODO: Add useEffect for mana regeneration

  const castSpell = () => {
    if (mana >= 20) {
      setMana(mana - 20);
    }
  };

  return (
    <div className="app">
      <h1>Mana Regeneration</h1>
      <p className="subtitle">Watch your mana restore over time</p>

      <div className="mana-container">
        <div className="mana-bar">
          <div className="mana-fill" style={{ width: `${mana}%` }}>
            {mana}%
          </div>
        </div>
      </div>

      <button 
        className="btn btn-primary" 
        onClick={castSpell}
        disabled={mana < 20}
      >
        Cast Spell (-20%)
      </button>

      <div className="info-box">
        <h3>Your Task</h3>
        <ul>
          <li>Use useEffect to set up an interval</li>
          <li>Regenerate 5% mana every second</li>
          <li>Stop regeneration at 100%</li>
          <li>Clean up interval on unmount</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
