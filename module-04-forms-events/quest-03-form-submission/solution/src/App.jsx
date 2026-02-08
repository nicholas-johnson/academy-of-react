import { useState } from "react";
import "./App.css";

const HOUSES = [
  { id: "Liondudes", name: "Liondudes", icon: "🦁" },
  { id: "Scarybird", name: "Scarybird", icon: "🦅" },
  { id: "Huftybadger", name: "Huftybadger", icon: "🦡" },
  { id: "Snakeyguys", name: "Snakeyguys", icon: "🐍" },
];

const FAMILIARS = [
  { id: "owl", name: "Owl", icon: "🦉" },
  { id: "cat", name: "Cat", icon: "🐱" },
  { id: "toad", name: "Toad", icon: "🐸" },
];

const WANDS = [
  { id: "oak", name: "Oak & Phoenix Feather", icon: "🪵" },
  { id: "holly", name: "Holly & Dragon Heartstring", icon: "🌿" },
  { id: "elder", name: "Elder & Unicorn Hair", icon: "✨" },
];

function App() {
  // Current step in the wizard (1, 2, 3, or 'complete')
  const [currentStep, setCurrentStep] = useState(1);

  // Form data for all steps
  const [formData, setFormData] = useState({
    name: "",
    house: "",
    familiar: "",
    wand: "",
  });

  // Check if current step is complete
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== "" && formData.house !== "";
      case 2:
        return formData.familiar !== "";
      case 3:
        return formData.wand !== "";
      default:
        return false;
    }
  };

  // Advance to next step
  const handleNext = () => {
    if (currentStep === 3) {
      setCurrentStep("complete");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  // Go back to previous step
  const handleBack = () => {
    if (currentStep === "complete") {
      setCurrentStep(3);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  // Update form data
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Reset form
  const handleReset = () => {
    setFormData({ name: "", house: "", familiar: "", wand: "" });
    setCurrentStep(1);
  };

  return (
    <div className="app">
      <h1>Sorting Ceremony</h1>
      <p>Complete your enrollment at the Arcane Academy</p>

      {/* Progress Indicator */}
      <div className="progress">
        <div className="progress-step">
          <div
            className={`step-circle ${currentStep >= 1 ? "active" : ""} ${currentStep > 1 ? "complete" : ""}`}
          >
            {currentStep > 1 ? "✓" : "1"}
          </div>
          <span className="step-label">Personal Info</span>
        </div>
        <div className="progress-step">
          <div
            className={`step-circle ${currentStep >= 2 ? "active" : ""} ${currentStep > 2 ? "complete" : ""}`}
          >
            {currentStep > 2 ? "✓" : "2"}
          </div>
          <span className="step-label">Familiar</span>
        </div>
        <div className="progress-step">
          <div
            className={`step-circle ${currentStep >= 3 ? "active" : ""} ${currentStep === "complete" ? "complete" : ""}`}
          >
            {currentStep === "complete" ? "✓" : "3"}
          </div>
          <span className="step-label">Wand</span>
        </div>
      </div>

      <div className="form-container">
        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div>
            <h2>Step 1: Personal Information</h2>

            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your wizard name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Choose Your House</label>
              <div className="options-grid">
                {HOUSES.map((house) => (
                  <div
                    key={house.id}
                    className={`option-card ${formData.house === house.id ? "selected" : ""}`}
                    onClick={() => updateField("house", house.id)}
                  >
                    <div className="option-icon">{house.icon}</div>
                    <div className="option-name">{house.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Familiar */}
        {currentStep === 2 && (
          <div>
            <h2>Step 2: Choose Your Familiar</h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Every wizard needs a magical companion
            </p>

            <div className="options-grid">
              {FAMILIARS.map((familiar) => (
                <div
                  key={familiar.id}
                  className={`option-card ${formData.familiar === familiar.id ? "selected" : ""}`}
                  onClick={() => updateField("familiar", familiar.id)}
                >
                  <div className="option-icon">{familiar.icon}</div>
                  <div className="option-name">{familiar.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Wand */}
        {currentStep === 3 && (
          <div>
            <h2>Step 3: Select Your Wand</h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              The wand chooses the wizard
            </p>

            <div className="options-grid">
              {WANDS.map((wand) => (
                <div
                  key={wand.id}
                  className={`option-card ${formData.wand === wand.id ? "selected" : ""}`}
                  onClick={() => updateField("wand", wand.id)}
                >
                  <div className="option-icon">{wand.icon}</div>
                  <div className="option-name">{wand.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Complete/Summary */}
        {currentStep === "complete" && (
          <div className="summary">
            <div className="success-icon">🎉</div>
            <h2>Enrollment Complete!</h2>
            <p style={{ color: "#666", marginBottom: "30px" }}>
              Welcome to the Arcane Academy, {formData.name}!
            </p>

            <div className="summary-item">
              <span className="summary-label">Name:</span>
              <span className="summary-value">{formData.name}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">House:</span>
              <span className="summary-value">
                {HOUSES.find((h) => h.id === formData.house)?.name}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Familiar:</span>
              <span className="summary-value">
                {FAMILIARS.find((f) => f.id === formData.familiar)?.name}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Wand:</span>
              <span className="summary-value">
                {WANDS.find((w) => w.id === formData.wand)?.name}
              </span>
            </div>

            <button
              onClick={handleReset}
              className="btn btn-next"
              style={{ marginTop: "20px", width: "100%" }}
            >
              Start New Enrollment
            </button>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      {currentStep !== "complete" && (
        <div className="navigation">
          <button
            onClick={handleBack}
            className="btn btn-back"
            disabled={currentStep === 1}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="btn btn-next"
            disabled={!isStepValid()}
          >
            {currentStep === 3 ? "Complete" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
