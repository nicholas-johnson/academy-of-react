import './App.css'

// Wizard data
const wizards = [
  { id: 1, name: "Elara Moonwhisper", house: "Wisdom", level: 42 },
  { id: 2, name: "Thorin Flameheart", house: "Valor", level: 38 },
  { id: 3, name: "Luna Shadowmere", house: "Mystery", level: 45 },
];

// TODO: Create a WizardCard component that accepts props: name, house, level
// function WizardCard({ name, house, level }) { ... }

// TODO: Create a Header component that accepts props: title, subtitle
// function Header({ title, subtitle }) { ... }

function App() {
  return (
    <div className="app">
      {/* TODO: Use your Header component here */}
      <h1>Quest 2: Props Basics</h1>
      
      {/* TODO: Map over wizards and render a WizardCard for each */}
      <div className="wizard-list">
        <p>Create WizardCard components for each wizard!</p>
      </div>
    </div>
  );
}

export default App;
