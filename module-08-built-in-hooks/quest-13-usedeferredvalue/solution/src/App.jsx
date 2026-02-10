import { useState, useDeferredValue } from "react";
import "./App.css";

// Expensive component that renders many particles
function SpellParticles({ power }) {
  console.log("Rendering particles for power:", power);
  
  const particles = [];
  for (let i = 0; i < power * 5; i++) {
    particles.push(
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    );
  }
  
  return <div className="particles">{particles}</div>;
}

function App() {
  const [power, setPower] = useState(50);
  const deferredPower = useDeferredValue(power);

  return (
    <div className="app">
      <h1>Spell Power Slider</h1>
      <p className="subtitle">Smooth slider with useDeferredValue</p>

      <div className="slider-container">
        <label htmlFor="power">Power: {power}</label>
        <input
          id="power"
          type="range"
          min="0"
          max="100"
          value={power}
          onChange={(e) => setPower(Number(e.target.value))}
          className="slider"
        />
        <p className="deferred-info">
          Deferred Power: {deferredPower}
          {power !== deferredPower && " (catching up...)"}
        </p>
      </div>

      <div className="visualization">
        <SpellParticles power={deferredPower} />
      </div>

      <div className="info-box">
        <h3>useDeferredValue Key Points</h3>
        <ul>
          <li>Defers updating a value</li>
          <li>Keeps UI responsive during updates</li>
          <li>Expensive component uses deferred value</li>
          <li>Input remains smooth and responsive</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
