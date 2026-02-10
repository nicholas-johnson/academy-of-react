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
  // TODO: Add useDeferredValue for deferred power

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
      </div>

      {/* TODO: Pass deferredPower to SpellParticles */}
      <div className="visualization">
        <SpellParticles power={power} />
      </div>

      <div className="info-box">
        <h3>Your Task</h3>
        <ul>
          <li>Use useDeferredValue on power</li>
          <li>Pass deferredPower to SpellParticles</li>
          <li>Move slider - notice it stays smooth!</li>
          <li>Visual updates slightly delayed</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
