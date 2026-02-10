import { useState, useRef, useLayoutEffect } from "react";
import "./App.css";

function App() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const measureCard = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    // Measure on mount
    measureCard();

    // Measure on resize
    window.addEventListener("resize", measureCard);

    return () => {
      window.removeEventListener("resize", measureCard);
    };
  }, []); // Empty deps - setup once

  const addContent = () => {
    const card = cardRef.current;
    const p = document.createElement("p");
    p.textContent = "New spell added!";
    card.appendChild(p);
    
    // Re-measure after adding content
    const rect = card.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
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
        <h3>useLayoutEffect Key Points</h3>
        <ul>
          <li>Runs synchronously after DOM updates</li>
          <li>Fires before browser paint (no flash)</li>
          <li>Perfect for DOM measurements</li>
          <li>Use sparingly - blocks visual updates</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
