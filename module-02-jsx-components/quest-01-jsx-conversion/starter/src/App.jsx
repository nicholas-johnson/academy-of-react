import "./App.css";

// Wizard data - same as Module 1
const wizard = {
  name: "Elara Moonwhisper",
  house: "Wisdom",
  level: 42,
  specialty: "Elemental Magic",
};

// TODO: Convert the Module 1 createElement code to JSX
//
// In Module 1, this was:
//   React.createElement("div", { className: "wizard-card" },
//     React.createElement("h1", { className: "wizard-name" }, wizard.name),
//     ...
//   )
//
// Convert it to JSX syntax like:
//   <div className="wizard-card">
//     <h1 className="wizard-name">{wizard.name}</h1>
//     ...
//   </div>

function App() {
  return (
    // Your JSX code here
    <div>
      <p>Convert the Module 1 wizard card to JSX!</p>
    </div>
  );
}

export default App;
