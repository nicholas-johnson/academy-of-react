import './App.css'

// Step 1: Create a Function Component
// Components are just functions that return JSX
function StudentCard(props) {
  return (
    <div className="student-card">
      <h2>{props.name}</h2>
      <span className="house-badge">{props.house}</span>
      
      <div className="stats">
        <div className="stat">
          <div className="stat-label">Magic Level</div>
          <div className="stat-value">{props.magicLevel}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Health</div>
          <div className="stat-value">{props.health}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Mana</div>
          <div className="stat-value">{props.mana}</div>
        </div>
      </div>
    </div>
  );
}

// Step 2: Use the component with props
// Notice how much cleaner JSX is compared to createElement!
function App() {
  return (
    <div>
      <h1>⚡ Arcane Academy - Student Profiles</h1>
      
      <StudentCard 
        name="Aria Spellweaver"
        house="Ravenclaw"
        magicLevel={45}
        health={100}
        mana={80}
      />
      
      <StudentCard 
        name="Thor Ironforge"
        house="Gryffindor"
        magicLevel={62}
        health={100}
        mana={75}
      />
    </div>
  );
}

export default App;

// Compare this to Module 1's createElement() - so much easier to read!





