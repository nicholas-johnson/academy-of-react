import './App.css'

// TODO: Create a StatDisplay component that accepts props
// Props: label (string), value (number), icon (optional)
function StatDisplay(props) {
  // TODO: Destructure props
  // TODO: Return a stat display element
  return null;
}

function App() {
  // TODO: Create a wizard object with various stats
  const wizard = {
    name: "Your Wizard Name",
    health: 100,
    mana: 50,
    strength: 15,
    intelligence: 20
  };
  
  return (
    <div>
      <h1>Quest 1: Stat Display</h1>
      <p>Create reusable StatDisplay components with props!</p>
      
      <div className="stats-container">
        {/* TODO: Use StatDisplay components to show wizard stats */}
        {/* Example: <StatDisplay label="Health" value={wizard.health} /> */}
      </div>
    </div>
  );
}

export default App;





