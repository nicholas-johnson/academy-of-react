import { useState, useInsertionEffect } from "react";
import "./App.css";

function App() {
  const [spellType, setSpellType] = useState("fire");
  const [renderCount, setRenderCount] = useState(0);

  useInsertionEffect(() => {
    console.log("useInsertionEffect: injecting styles for", spellType);
    
    const styleId = "dynamic-spell-styles";
    let styleEl = document.getElementById(styleId);
    
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    const colors = {
      fire: "#ef4444",
      ice: "#3b82f6",
      lightning: "#eab308",
    };

    styleEl.textContent = `
      .spell-${spellType} {
        background: ${colors[spellType]};
        box-shadow: 0 0 20px ${colors[spellType]};
      }
    `;

    return () => {
      // Cleanup if needed
    };
  }, [spellType]);

  return (
    <div className="app">
      <h1>Dynamic Spell Styles</h1>
      <p className="subtitle">useInsertionEffect (CSS-in-JS)</p>

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
        <h3>useInsertionEffect Key Points</h3>
        <ul>
          <li>Runs before all other effects</li>
          <li>For CSS-in-JS libraries only</li>
          <li>Injects styles before layout reads</li>
          <li>Prevents layout thrashing</li>
          <li>You'll rarely need this!</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
