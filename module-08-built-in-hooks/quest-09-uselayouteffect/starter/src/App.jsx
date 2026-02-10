import { useState, useRef, useLayoutEffect } from "react";
import "./App.css";

function App() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const cardRef = useRef(null);

  // TODO: Use useLayoutEffect to measure the card

  const addContent = () => {
    // Force a resize by adding content
    const card = cardRef.current;
    const p = document.createElement("p");
    p.textContent = "New spell added!";
    card.appendChild(p);
  };

  return (
    <div className="app">
      <h1>Spell Card Measurement</h1>
      <p className="subtitle">Measuring with useLayoutEffect</p>

      <div ref={cardRef} className="spell-card">
        <h2>Fireball</h2>
        <p>A powerful fire spell</p>
      </div>

      <div className="dimensions">
        Width: {Math.round(dimensions.width)}px
        <br />
        Height: {Math.round(dimensions.height)}px
      </div>

      <button className="btn btn-primary" onClick={addContent}>
        Add Content
      </button>

      <div className="info-box">
        <h3>Your Task</h3>
        <ul>
          <li>Use useLayoutEffect (not useEffect!)</li>
          <li>Measure card with getBoundingClientRect()</li>
          <li>Update dimensions state</li>
          <li>Add window resize listener</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
