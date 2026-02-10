import { useState } from "react";
import "./App.css";

function App() {
  const [spellCount, setSpellCount] = useState(0);

  const castSpell = () => {
    setSpellCount(spellCount + 1);
  };

  const reset = () => {
    setSpellCount(0);
  };

  const getMilestoneMessage = () => {
    if (spellCount >= 20) return "Legendary Wizard! 🌟";
    if (spellCount >= 10) return "Spell Master! ⚡";
    if (spellCount >= 5) return "Getting the hang of it! 🔥";
    return "";
  };

  return (
    <div className="app">
      <h1>Spell Counter</h1>
      <p className="subtitle">Track your daily spell casting progress</p>

      <div className="counter-display">
        <span className="count">{spellCount}</span>
        <span className="label">Spells Cast</span>
      </div>

      {getMilestoneMessage() && (
        <div className="milestone-message">{getMilestoneMessage()}</div>
      )}

      <div className="button-group">
        <button className="btn btn-primary" onClick={castSpell}>
          Cast Spell
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="info-box">
        <h3>useState in Action</h3>
        <ul>
          <li>State persists between renders</li>
          <li>Calling setState triggers a re-render</li>
          <li>State updates are asynchronous</li>
          <li>Each component instance has its own state</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
