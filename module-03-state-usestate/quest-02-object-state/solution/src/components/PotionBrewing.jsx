import { useState } from "react";
import { Sparkles, Flame } from "lucide-react";
import { steps } from "./steps";

export function PotionBrewing() {
  const [brewing, setBrewing] = useState({
    currentStep: 0,
    isComplete: false,
    success: null,
    skippedSteps: [], // Track which steps were skipped
  });

  const progress = (brewing.currentStep / steps.length) * 100;
  const skippedCount = brewing.skippedSteps.length;
  
  // Calculate success rate based on skipped steps
  const getSuccessRate = () => {
    const baseRate = 0.8; // 80% base success rate
    const penaltyPerSkip = 0.15; // 15% penalty per skipped step
    return Math.max(0, baseRate - (skippedCount * penaltyPerSkip));
  };

  const completeStep = () => {
    if (brewing.currentStep < steps.length - 1) {
      // Move to next step
      setBrewing({
        ...brewing,
        currentStep: brewing.currentStep + 1,
      });
    } else {
      // Final step - complete the brew!
      const successRate = getSuccessRate();
      setBrewing({
        ...brewing,
        isComplete: true,
        success: Math.random() < successRate,
      });
    }
  };

  const skipStep = () => {
    if (brewing.currentStep < steps.length - 1) {
      // Skip current step and move to next
      setBrewing({
        ...brewing,
        currentStep: brewing.currentStep + 1,
        skippedSteps: [...brewing.skippedSteps, brewing.currentStep],
      });
    } else {
      // Can't skip the final step
      const successRate = getSuccessRate();
      setBrewing({
        ...brewing,
        isComplete: true,
        success: Math.random() < successRate,
      });
    }
  };

  const reset = () => {
    setBrewing({
      currentStep: 0,
      isComplete: false,
      success: null,
      skippedSteps: [],
    });
  };

  if (brewing.isComplete) {
    return (
      <div className="potion-brewing">
        <div className={brewing.success ? "result-success" : "result-failure"}>
          <div className="result-icon">
            {brewing.success ? (
              <Sparkles size={64} />
            ) : (
              <Flame size={64} />
            )}
          </div>
          <h2>{brewing.success ? "Perfect Potion!" : "Brew Failed!"}</h2>
          <p>
            {brewing.success
              ? "You've created a masterful potion!"
              : "The potion exploded. Try again!"}
          </p>
          {skippedCount > 0 && (
            <p className="skipped-warning">
              You skipped {skippedCount} step{skippedCount > 1 ? "s" : ""}
              {brewing.success ? " but succeeded anyway!" : ", which caused the failure."}
            </p>
          )}
          <button className="action-btn" onClick={reset}>
            Brew Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="potion-brewing">
      <div className="brewing-header">
        <h2>Potion Brewing Station</h2>
        <div className="progress-display">
          Step {brewing.currentStep + 1} of {steps.length}
          {skippedCount > 0 && (
            <span className="skip-count"> • {skippedCount} skipped</span>
          )}
        </div>
      </div>

      {/* Success rate indicator */}
      {skippedCount > 0 && (
        <div className="success-rate-warning">
          Current Success Rate: {Math.round(getSuccessRate() * 100)}%
        </div>
      )}

      {/* Overall progress */}
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-text">{Math.round(progress)}%</span>
      </div>

      {/* Current step */}
      <div className="current-step">
        <h3 className="step-name">{steps[brewing.currentStep].name}</h3>
        <div className="step-buttons">
          <button className="complete-step-btn" onClick={completeStep}>
            Complete Step
          </button>
          <button className="skip-step-btn" onClick={skipStep}>
            Skip Step (-15% success)
          </button>
        </div>
      </div>

      {/* All steps */}
      <div className="steps-list">
        {steps.map((step, index) => {
          const isSkipped = brewing.skippedSteps.includes(index);
          return (
            <div
              key={step.id}
              className={`step-item ${
                index < brewing.currentStep
                  ? isSkipped
                    ? "step-skipped"
                    : "step-completed"
                  : index === brewing.currentStep
                    ? "step-active"
                    : "step-pending"
              }`}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-info">
                <div className="step-name-small">{step.name}</div>
              </div>
              {index < brewing.currentStep && (
                <div className="check-mark">
                  {isSkipped ? "Skipped" : "Done"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="controls">
        <button className="action-btn reset-btn" onClick={reset}>
          Start Over
        </button>
      </div>
    </div>
  );
}
