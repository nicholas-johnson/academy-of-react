import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [mana, setMana] = useState(100);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMana((currentMana) => {
        if (currentMana >= 100) return 100;
        return Math.min(currentMana + 5, 100);
      });
    }, 1000);

    // Cleanup function
    return () => {
      console.log("Cleaning up interval");
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array - run once on mount

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
          <div 
            className="mana-fill" 
            style={{ width: `${mana}%` }}
          >
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
        <h3>useEffect Key Points</h3>
        <ul>
          <li>Runs after render (not during)</li>
          <li>Empty deps [] = run once on mount</li>
          <li>Return function = cleanup on unmount</li>
          <li>Use functional setState for current values</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
