import './App.css'

const students = [
  {
    id: 1,
    name: "Elara Moonwhisper",
    house: "Wisdom",
    level: 42,
    specialty: "Elemental Magic",
    strength: 75,
    intelligence: 92,
    dexterity: 68,
    stamina: 80,
    status: "active",
    avatar: "🧙‍♀️"
  },
  {
    id: 2,
    name: "Theron Stormforge",
    house: "Valor",
    level: 38,
    specialty: "Combat Magic",
    strength: 95,
    intelligence: 70,
    dexterity: 85,
    stamina: 88,
    status: "quest",
    avatar: "⚔️"
  },
  {
    id: 3,
    name: "Luna Willowshade",
    house: "Nature",
    level: 45,
    specialty: "Healing Arts",
    strength: 60,
    intelligence: 88,
    dexterity: 72,
    stamina: 95,
    status: "active",
    avatar: "🌿"
  }
];

const houseConfig = {
  Valor: { color: '#dc2626', emblem: '🦁' },
  Wisdom: { color: '#2563eb', emblem: '🦅' },
  Nature: { color: '#16a34a', emblem: '🐺' },
  Mystery: { color: '#9333ea', emblem: '🐍' }
};

// StudentCard with all props
function StudentCard({ 
  name = "Unknown Student",
  house = "Valor",
  level = 1,
  specialty = "None",
  strength = 50,
  intelligence = 50,
  dexterity = 50,
  stamina = 50,
  status = "active",
  avatar = "🧙"
}) {
  const config = houseConfig[house];
  
  return (
    <div className="student-card">
      <div className="card-header" style={{ borderTopColor: config.color }}>
        <div className="avatar">{avatar}</div>
        <div className="header-info">
          <h3 className="student-name">{name}</h3>
          <div className="house-badge" style={{ backgroundColor: config.color }}>
            <span>{config.emblem}</span>
            <span>{house}</span>
          </div>
        </div>
        <div className="level-badge" style={{ backgroundColor: config.color }}>
          Lv {level}
        </div>
      </div>
      
      <div className="card-body">
        <div className="specialty-row">
          <span className="label">✨ Specialty:</span>
          <span className="value">{specialty}</span>
        </div>
        
        {/* Conditional rendering based on status */}
        {status === "quest" && (
          <div className="status-alert status-quest">
            🗺️ Currently on a Quest
          </div>
        )}
        {status === "training" && (
          <div className="status-alert status-training">
            💪 Training in Progress
          </div>
        )}
        
        <div className="stats-grid">
          <StatBar icon="💪" label="Strength" value={strength} color={config.color} />
          <StatBar icon="🧠" label="Intelligence" value={intelligence} color={config.color} />
          <StatBar icon="⚡" label="Dexterity" value={dexterity} color={config.color} />
          <StatBar icon="❤️" label="Stamina" value={stamina} color={config.color} />
        </div>
        
        <div className="overall-rating">
          <span className="rating-icon">⭐</span>
          <span className="rating-text">Overall Rating:</span>
          <span className="rating-score" style={{ color: config.color }}>
            {Math.round((strength + intelligence + dexterity + stamina) / 4)}
          </span>
        </div>
      </div>
    </div>
  );
}

// StatBar component
function StatBar({ icon, label, value, color }) {
  return (
    <div className="stat-item">
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
      </div>
      <div className="stat-bar">
        <div 
          className="stat-fill" 
          style={{ 
            width: `${value}%`,
            backgroundColor: color 
          }}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <div className="quest-header">
        <h1>⚡ Quest 1: Stat Display Component</h1>
        <p className="quest-subtitle">Complex props with default values</p>
      </div>
      
      <div className="student-grid">
        {students.map(student => (
          <StudentCard key={student.id} {...student} />
        ))}
      </div>
    </div>
  );
}

export default App;

