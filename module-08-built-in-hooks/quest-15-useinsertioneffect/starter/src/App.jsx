import { useState, useInsertionEffect } from "react";
import "./App.css";

function App() {
  const [spellType, setSpellType] = useState("fire");
  const [renderCount, setRenderCount] = useState(0);

  // TODO: Use useInsertionEffect to inject styles
  useInsertionEffect(() => {
    console.log("useInsertionEffect: injecting styles");
    // Inject dynamic styles here
  }, [spellType]);

  return (
    <div className="app">
      <h1>Dynamic Spell Styles</h1>
      <p className="subtitle">useInsertionEffect (rarely used!)</p>

      <div className="spell-type-buttons">
        <button 
          className={spellType === "fire" ? "active" : ""}
          onClick={() => setSpellType("fire")}
        >
          Fire
        </button>
        <button 
          className={spellType === "ice" ? "active" : ""}
          onClick={() => setSpellType("ice")}
        >
          Ice
        </button>
        <button 
          className={spellType === "lightning" ? "active" : ""}
          onClick={() => setSpellType("lightning")}
        >
          Lightning
        </button>
      </div>

      <div className={`spell-display spell-${spellType}`}>
        Current Spell: {spellType}
      </div>

      <button 
        className="btn btn-secondary" 
        onClick={() => setRenderCount(renderCount + 1)}
      >
        Force Re-render ({renderCount})
      </button>

      <div className="info-box">
        <h3>Your Task</h3>
        <ul>
          <li>Use useInsertionEffect to inject style tag</li>
          <li>Create dynamic CSS rules based on spellType</li>
          <li>Check console for effect timing</li>
          <li>Compare with useLayoutEffect timing</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
