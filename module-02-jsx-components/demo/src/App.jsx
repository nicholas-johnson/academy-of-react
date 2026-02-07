import "./App.css";

// ============================================
// STEP 1: Function Components
// Components are just functions that return JSX
// ============================================

function StudentCard({ name, house, magicLevel }) {
  return (
    <div className="student-card">
      <h2>{name}</h2>
      <span className="house-badge">{house}</span>
      <div className="stat">
        <span className="stat-label">Magic Level:</span>
        <span className="stat-value">{magicLevel}</span>
      </div>
    </div>
  );
}

// ============================================
// STEP 2: Props
// Pass data to components like function arguments
// ============================================

function SpellCard({ name, icon, power, manaCost }) {
  return (
    <div className="spell-card">
      <div className="spell-header">
        <span className="spell-icon">{icon}</span>
        <h3>{name}</h3>
      </div>
      <div className="spell-stats">
        <div className="spell-stat">
          <span>⚔️ Power:</span>
          <span>{power}</span>
        </div>
        <div className="spell-stat">
          <span>💧 Mana:</span>
          <span>{manaCost}</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// STEP 3: Rendering Lists with .map()
// Transform an array of data into an array of components
// ============================================

const spells = [
  { id: 1, name: "Fireball", icon: "🔥", power: 40, manaCost: 25 },
  { id: 2, name: "Ice Shard", icon: "❄️", power: 30, manaCost: 15 },
  { id: 3, name: "Lightning", icon: "⚡", power: 50, manaCost: 35 },
  { id: 4, name: "Heal", icon: "💚", power: 25, manaCost: 20 },
];

function App() {
  return (
    <div className="app">
      <h1>⚡ Module 2 Demo: JSX & Components</h1>

      {/* Step 1: Basic component */}
      <section className="demo-section">
        <h2>Step 1: Function Component</h2>
        <StudentCard name="Aria Spellweaver" house="Wisdom" magicLevel={45} />
      </section>

      {/* Step 2: Component with more props */}
      <section className="demo-section">
        <h2>Step 2: Props</h2>
        <SpellCard name="Fireball" icon="🔥" power={40} manaCost={25} />
      </section>

      {/* Step 3: Rendering a list with .map() */}
      <section className="demo-section">
        <h2>Step 3: Lists with .map()</h2>
        <div className="spell-grid">
          {spells.map((spell) => (
            <SpellCard
              key={spell.id}
              name={spell.name}
              icon={spell.icon}
              power={spell.power}
              manaCost={spell.manaCost}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
