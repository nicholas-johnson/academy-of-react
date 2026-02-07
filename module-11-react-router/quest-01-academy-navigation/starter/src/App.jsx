// TODO: Import Routes, Route, NavLink, Outlet from 'react-router-dom'
import "./App.css";

// TODO: Create a Layout component that:
// - Has a header with the academy title
// - Has a nav with NavLink components to: /, /students, /spells, /about
// - Uses NavLink's className callback for active styling
// - Renders <Outlet /> for child routes

// Home page component
function Home() {
  return (
    <div className="page">
      <h2>🏠 Welcome to the Academy</h2>
      <p>Your journey into React Router begins here!</p>
      <div className="features">
        <div className="feature">
          <span>📚</span>
          <h3>Study Spells</h3>
          <p>Learn powerful magic</p>
        </div>
        <div className="feature">
          <span>👥</span>
          <h3>Meet Students</h3>
          <p>Join fellow wizards</p>
        </div>
        <div className="feature">
          <span>🎓</span>
          <h3>Graduate</h3>
          <p>Become a master</p>
        </div>
      </div>
    </div>
  );
}

// Students page component
function Students() {
  const students = [
    { id: 1, name: "Harry", house: "Gryffin", level: 5 },
    { id: 2, name: "Hermione", house: "Ravenclaw", level: 7 },
    { id: 3, name: "Ron", house: "Gryffin", level: 4 },
    { id: 4, name: "Luna", house: "Ravenclaw", level: 6 },
  ];

  return (
    <div className="page">
      <h2>👥 Students</h2>
      <div className="student-list">
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <h3>{student.name}</h3>
            <p>House: {student.house}</p>
            <p>Level: {student.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Spells page component
function Spells() {
  const spells = [
    { id: 1, name: "Fireball", element: "🔥" },
    { id: 2, name: "Ice Shield", element: "❄️" },
    { id: 3, name: "Lightning Bolt", element: "⚡" },
    { id: 4, name: "Healing Wave", element: "💚" },
  ];

  return (
    <div className="page">
      <h2>📜 Spells</h2>
      <div className="spell-list">
        {spells.map((spell) => (
          <div key={spell.id} className="spell-card">
            <span className="spell-icon">{spell.element}</span>
            <h3>{spell.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

// About page component
function About() {
  return (
    <div className="page">
      <h2>ℹ️ About</h2>
      <p>
        The Battle Academy was founded to train the next generation of React
        developers.
      </p>
      <p>Here you'll learn:</p>
      <ul>
        <li>React Router navigation</li>
        <li>URL parameters</li>
        <li>Nested routes</li>
        <li>Protected routes</li>
      </ul>
    </div>
  );
}

// TODO: Create a NotFound component for 404 pages

// Main App component
function App() {
  // TODO: Replace this with Routes and Route components
  // The structure should be:
  // - Layout as parent route at "/"
  //   - Home at index (default)
  //   - Students at "/students"
  //   - Spells at "/spells"
  //   - About at "/about"
  //   - NotFound at "*" (catch-all)

  return (
    <div>
      <p>TODO: Set up React Router</p>
      <p>Currently showing all pages at once (wrong!):</p>
      <Home />
    </div>
  );
}

export default App;
