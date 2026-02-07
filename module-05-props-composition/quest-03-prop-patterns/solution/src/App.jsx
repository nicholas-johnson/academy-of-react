import './App.css'

const houses = {
  Valor: {
    color: '#dc2626',
    emblem: '🦁',
    motto: "Courage Above All",
    students: [
      { id: 1, name: "Theron Stormforge", level: 38, specialty: "Combat Magic" },
      { id: 2, name: "Atlas Ironheart", level: 35, specialty: "Defense Magic" },
      { id: 3, name: "Kira Flameheart", level: 41, specialty: "Fire Magic" }
    ]
  },
  Wisdom: {
    color: '#2563eb',
    emblem: '🦅',
    motto: "Knowledge is Power",
    students: [
      { id: 4, name: "Elara Moonwhisper", level: 42, specialty: "Elemental Magic" },
      { id: 5, name: "Seraphina Starlight", level: 48, specialty: "Astral Magic" },
      { id: 6, name: "Cassius Bookbinder", level: 39, specialty: "Ancient Runes" }
    ]
  },
  Nature: {
    color: '#16a34a',
    emblem: '🐺',
    motto: "In Harmony We Thrive",
    students: [
      { id: 7, name: "Luna Willowshade", level: 45, specialty: "Healing Arts" },
      { id: 8, name: "Finn Oakwalker", level: 33, specialty: "Beast Taming" },
      { id: 9, name: "Ivy Thornwood", level: 37, specialty: "Herbology" }
    ]
  },
  Mystery: {
    color: '#9333ea',
    emblem: '🐍',
    motto: "Secrets Unveil Truth",
    students: [
      { id: 10, name: "Raven Shadowmere", level: 40, specialty: "Illusion Magic" },
      { id: 11, name: "Morgana Nightshade", level: 50, specialty: "Dark Arts" },
      { id: 12, name: "Silas Voidwalker", level: 36, specialty: "Necromancy" }
    ]
  }
};

function StudentCard({ name, level, specialty }) {
  return (
    <div className="student-card">
      <div className="student-header">
        <span className="student-name">{name}</span>
        <span className="student-level">Lv {level}</span>
      </div>
      <div className="student-specialty">{specialty}</div>
    </div>
  );
}

function HouseStatistics({ students }) {
  const totalStudents = students.length;
  const avgLevel = Math.round(students.reduce((sum, s) => sum + s.level, 0) / totalStudents);
  const maxLevel = Math.max(...students.map(s => s.level));
  
  return (
    <div className="house-stats">
      <div className="stat-box">
        <div className="stat-value">{totalStudents}</div>
        <div className="stat-label">Students</div>
      </div>
      <div className="stat-box">
        <div className="stat-value">{avgLevel}</div>
        <div className="stat-label">Avg Level</div>
      </div>
      <div className="stat-box">
        <div className="stat-value">{maxLevel}</div>
        <div className="stat-label">Max Level</div>
      </div>
    </div>
  );
}

function HouseRoster({ houseName, color, emblem, motto, students }) {
  return (
    <div className="house-roster">
      <div className="house-header" style={{ borderTopColor: color }}>
        <div className="house-emblem" style={{ color }}>{emblem}</div>
        <div className="house-info">
          <h2 className="house-name">{houseName}</h2>
          <p className="house-motto">"{motto}"</p>
        </div>
      </div>
      
      <HouseStatistics students={students} />
      
      <div className="students-list">
        {students.map(student => (
          <StudentCard key={student.id} {...student} />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <div className="quest-header">
        <h1>⚡ Quest 3: House Roster</h1>
        <p className="quest-subtitle">Organizing data with composition</p>
      </div>
      
      <div className="houses-grid">
        {Object.entries(houses).map(([houseName, houseData]) => (
          <HouseRoster
            key={houseName}
            houseName={houseName}
            {...houseData}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

