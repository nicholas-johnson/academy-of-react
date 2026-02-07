    const { useState, useEffect } = React;
    const { createRoot } = ReactDOM;

    const steps = [
      { id: 1, name: "Prepare Cauldron", icon: "🔥", duration: 5 },
      { id: 2, name: "Add Water", icon: "💧", duration: 3 },
      { id: 3, name: "Mix Ingredients", icon: "🌿", duration: 7 },
      { id: 4, name: "Stir Clockwise", icon: "↻", duration: 5 },
      { id: 5, name: "Simmer", icon: "♨️", duration: 10 },
      { id: 6, name: "Bottle Potion", icon: "🧪", duration: 3 }
    ];

    function PotionBrewing() {
      const [currentStep, setCurrentStep] = useState(0);
      const [timeLeft, setTimeLeft] = useState(steps[0].duration);
      const [isActive, setIsActive] = useState(false);
      const [success, setSuccess] = useState(null);
      
      const progress = ((currentStep + (steps[currentStep].duration - timeLeft) / steps[currentStep].duration) / steps.length) * 100;
      
      // Timer effect (bonus feature)
      useEffect(() => {
        let interval = null;
        
        if (isActive && timeLeft > 0) {
          interval = setInterval(() => {
            setTimeLeft(t => t - 1);
          }, 1000);
        } else if (timeLeft === 0 && currentStep < steps.length - 1) {
          nextStep();
        } else if (timeLeft === 0 && currentStep === steps.length - 1) {
          // Brewing complete!
          setIsActive(false);
          setSuccess(Math.random() > 0.2); // 80% success rate
        }
        
        return () => clearInterval(interval);
      }, [isActive, timeLeft, currentStep]);
      
      function startBrewing() {
        setIsActive(true);
        setCurrentStep(0);
        setTimeLeft(steps[0].duration);
        setSuccess(null);
      }
      
      function nextStep() {
        const next = currentStep + 1;
        setCurrentStep(next);
        if (next < steps.length) {
          setTimeLeft(steps[next].duration);
        }
      }
      
      function skipStep() {
        if (currentStep < steps.length - 1) {
          setIsActive(false);
          nextStep();
        }
      }
      
      function reset() {
        setIsActive(false);
        setCurrentStep(0);
        setTimeLeft(steps[0].duration);
        setSuccess(null);
      }
      
      if (success !== null) {
        return (
          <div className="potion-brewing">
            <div className={success ? "result-success" : "result-failure"}>
              <div className="result-icon">
                {success ? "✨🧪✨" : "💥"}
              </div>
              <h2>{success ? "Perfect Potion!" : "Brew Failed!"}</h2>
              <p>
                {success 
                  ? "You've created a masterful potion!"
                  : "The potion exploded. Try again!"
                }
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
              Step {currentStep + 1} of {steps.length}
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
            <div className="step-icon">{steps[currentStep].icon}</div>
            <h3 className="step-name">{steps[currentStep].name}</h3>
            <div className="timer">
              <span className="timer-value">{timeLeft}</span>
              <span className="timer-label">seconds</span>
            </div>
          </div>
          
          {/* All steps */}
          <div className="steps-list">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`step-item ${
                  index < currentStep ? 'step-completed' :
                  index === currentStep ? 'step-active' :
                  'step-pending'
                }`}
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-icon-small">{step.icon}</div>
                <div className="step-info">
                  <div className="step-name-small">{step.name}</div>
                  <div className="step-duration">{step.duration}s</div>
                </div>
                {index < currentStep && <div className="check-mark">✓</div>}
              </div>
            ))}
          </div>
          
          {/* Controls */}
          <div className="controls">
            {!isActive ? (
              <button className="action-btn start-btn" onClick={startBrewing}>
                ▶️ {currentStep === 0 ? 'Start Brewing' : 'Resume'}
              </button>
            ) : (
              <>
                <button className="action-btn pause-btn" onClick={() => setIsActive(false)}>
                  ⏸️ Pause
                </button>
                <button className="action-btn skip-btn" onClick={skipStep}>
                  ⏭️ Skip Step
                </button>
              </>
            )}
            <button className="action-btn reset-btn" onClick={reset}>
              🔄 Reset
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
            <p className="quest-subtitle">Complex state management</p>
          </div>
          
          <PotionBrewing />
        </div>
      );
    }

    const root = createRoot(document.getElementById('root'));
    root.render(<App />);
