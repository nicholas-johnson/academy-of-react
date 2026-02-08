import "./App.css";

// Wizard data
const wizards = [
  { id: 1, name: "Dixie Spiderwhomp", house: "Wisdom", level: 42 },
  { id: 2, name: "Spinstar Galbraticus", house: "Valor", level: 38 },
  { id: 3, name: "Ranger Marvel De-la-mode", house: "Mystery", level: 45 },
];

// Child component: displays a single wizard
function WizardCard({ name, house, level }) {
  return (
    <div className="wizard-card">
      <h2 className="wizard-name">{name}</h2>
      <p>
        <strong>House:</strong> {house}
      </p>
      <p>
        <strong>Level:</strong> {level}
      </p>
    </div>
  );
}

// Child component: displays the header
function Header({ title, subtitle }) {
  return (
    <div className="header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

// Main App component
function App() {
  return (
    <div className="app">
      <Header title="Wizard Academy" subtitle="Meet our wizards" />

      <div className="wizard-list">
        {wizards.map((wizard) => (
          <WizardCard
            key={wizard.id}
            name={wizard.name}
            house={wizard.house}
            level={wizard.level}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
