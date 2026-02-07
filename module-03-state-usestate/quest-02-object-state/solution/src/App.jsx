import { useState } from "react";
import "./App.css";

const steps = [
  { id: 1, name: "Prepare Cauldron", icon: "🔥" },
  { id: 2, name: "Add Water", icon: "💧" },
  { id: 3, name: "Mix Ingredients", icon: "🌿" },
  { id: 4, name: "Stir Clockwise", icon: "↻" },
  { id: 5, name: "Simmer", icon: "♨️" },
  { id: 6, name: "Bottle Potion", icon: "🧪" },
];

function PotionBrewing() {
  const [brewing, setBrewing] = useState({
    currentStep: 0,
    isComplete: false,
    success: null,
  });

  const progress = (brewing.currentStep / steps.length) * 100;

  const completeStep = () => {
    if (brewing.currentStep < steps.length - 1) {
      // Move to next step
      setBrewing({
        ...brewing,
        currentStep: brewing.currentStep + 1,
      });
    } else {
      // Final step - complete the brew!
      setBrewing({
        ...brewing,
        isComplete: true,
        success: Math.random() > 0.2, // 80% success rate
      });
    }
  };

  const reset = () => {
    setBrewing({
      currentStep: 0,
      isComplete: false,
      success: null,
    });
  };

  if (brewing.isComplete) {
    return (
      <div className="potion-brewing">
        <div className={brewing.success ? "result-success" : "result-failure"}>
          <div className="result-icon">{brewing.success ? "✨🧪✨" : "💥"}</div>
          <h2>{brewing.success ? "Perfect Potion!" : "Brew Failed!"}</h2>
          <p>
            {brewing.success
              ? "You've created a masterful potion!"
              : "The potion exploded. Try again!"}
          </p>
          <button className="action-btn" onClick={reset}>
            🔄 Brew Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="potion-brewing">
      <div className="brewing-header">
        <h2>🧙‍♀️ Potion Brewing Station</h2>
        <div className="progress-display">
          Step {brewing.currentStep + 1} of {steps.length}
        </div>
      </div>

      {/* Overall progress */}
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-text">{Math.round(progress)}%</span>
      </div>

      {/* Current step */}
      <div className="current-step">
        <div className="step-icon">{steps[brewing.currentStep].icon}</div>
        <h3 className="step-name">{steps[brewing.currentStep].name}</h3>
        <button className="complete-step-btn" onClick={completeStep}>
          ✓ Complete Step
        </button>
      </div>

      {/* All steps */}
      <div className="steps-list">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`step-item ${
              index < brewing.currentStep
                ? "step-completed"
                : index === brewing.currentStep
                  ? "step-active"
                  : "step-pending"
            }`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-icon-small">{step.icon}</div>
            <div className="step-info">
              <div className="step-name-small">{step.name}</div>
            </div>
            {index < brewing.currentStep && <div className="check-mark">✓</div>}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="controls">
        <button className="action-btn reset-btn" onClick={reset}>
          🔄 Start Over
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <div className="quest-header">
        <h1>⚡ Quest 2: Potion Brewing</h1>
        <p className="quest-subtitle">Managing state as an object</p>
      </div>

      <PotionBrewing />
    </div>
  );
}

export default App;
