import { Routes, Route, NavLink, Outlet, Link } from "react-router-dom";
import "./App.css";

// Layout component with navigation
function Layout() {
  return (
    <div className="app">
      <header className="header">
        <h1> Battle Academy</h1>
        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/students"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Students
          </NavLink>
          <NavLink
            to="/spells"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Spells
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

// Home page component
function Home() {
  return (
    <div className="page">
      <h2> Welcome to the Academy</h2>
      <p>Your journey into React Router begins here!</p>
      <div className="features">
        <div className="feature">
          <h3>Study Spells</h3>
          <p>Learn powerful magic</p>
        </div>
        <div className="feature">
          <h3>Meet Students</h3>
          <p>Join fellow wizards</p>
        </div>
        <div className="feature">
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
    { id: 1, name: "Harry", house: "Liondudes", level: 5 },
    { id: 2, name: "Hermione", house: "Scarybird", level: 7 },
    { id: 3, name: "Ron", house: "Liondudes", level: 4 },
    { id: 4, name: "Luna", house: "Scarybird", level: 6 },
  ];

  return (
    <div className="page">
      <h2> Students</h2>
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
    { id: 1, name: "Fireball", Icon: Flame },
    { id: 2, name: "Ice Shield", Icon: Snowflake },
    { id: 3, name: "Lightning Bolt", Icon: Zap },
    { id: 4, name: "Healing Wave", Icon: Heart },
  ];

  return (
    <div className="page">
      <h2>Spells</h2>
      <div className="spell-list">
        {spells.map((spell) => (
          <div key={spell.id} className="spell-card">
            <spell.Icon className="spell-icon" size={24} />
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
      <h2> About</h2>
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

// 404 Not Found page
function NotFound() {
  return (
    <div className="page not-found">
      <h2>404</h2>
      <p>Oops! This page doesn't exist.</p>
      <Link to="/" className="btn">
        Return Home
      </Link>
    </div>
  );
}

// Main App component with routes
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="students" element={<Students />} />
        <Route path="spells" element={<Spells />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
