import './App.css'

// Wizard data - same as Module 1
const wizard = {
  name: "Elara Moonwhisper",
  house: "Wisdom",
  level: 42,
  specialty: "Elemental Magic",
};

// The same card from Module 1, now in JSX!
function App() {
  return (
    <div className="wizard-card">
      <h1 className="wizard-name">{wizard.name}</h1>
      <div className="wizard-info">
        <p>
          <strong>House: </strong>
          {wizard.house}
        </p>
        <p>
          <strong>Level: </strong>
          {wizard.level}
        </p>
        <p>
          <strong>Specialty: </strong>
          {wizard.specialty}
        </p>
      </div>
    </div>
  );
}

export default App;
