import { useState } from "react";
import "./App.css";

// TODO: Create AuthContext using createContext()

// TODO: Create AuthProvider component that:
// - Manages user state (null when logged out)
// - Provides login(name, house) function
// - Provides logout() function
// - Provides isAuthenticated boolean (!!user)
// - Saves user to localStorage on login

// TODO: Create useAuth custom hook that:
// - Uses useContext to access AuthContext
// - Throws an error if used outside AuthProvider

function LoginForm({ onLogin }) {
  const [name, setName] = useState("");
  const [house, setHouse] = useState("gryffin");

  // TODO: Replace onLogin prop with useAuth() hook
  // Get login function from context instead

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name, house);
    }
  };

  return (
    <div className="login-container">
      <h2>Join the Academy</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Wizard Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            required
          />
        </div>
        <div className="form-group">
          <label>Choose House</label>
          <select value={house} onChange={(e) => setHouse(e.target.value)}>
            <option value="gryffin">Gryffin</option>
            <option value="ravenclaw">Ravenclaw</option>
            <option value="hufflepuff">Hufflepuff</option>
            <option value="slytherin">Slytherin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-login">
          Enter Academy
        </button>
      </form>
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  // TODO: Replace props with useAuth() hook
  // Get user and logout from context instead

  if (!user) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Welcome back, {user.name}!</h2>
          <p className="house-badge">House {user.house}</p>
        </div>
        <button onClick={onLogout} className="btn btn-logout">
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">Level</div>
          <div>
            <div className="stat-value">Level {user.level}</div>
            <div className="stat-label">Current Level</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">Spells</div>
          <div>
            <div className="stat-value">42</div>
            <div className="stat-label">Spells Learned</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">Wins</div>
          <div>
            <div className="stat-value">8</div>
            <div className="stat-label">Battles Won</div>
          </div>
        </div>
      </div>

      <div className="quests-section">
        <h3>Available Quests</h3>
        <div className="quest-list">
          <div className="quest-card">
            <span className="quest-icon">Battle</span>
            <div>
              <div className="quest-title">Duel a Rival</div>
              <div className="quest-reward">+50 XP</div>
            </div>
          </div>
          <div className="quest-card">
            <span className="quest-icon">Study</span>
            <div>
              <div className="quest-title">Study Advanced Spells</div>
              <div className="quest-reward">+30 XP</div>
            </div>
          </div>
          <div className="quest-card">
            <span className="quest-icon">Potion</span>
            <div>
              <div className="quest-title">Brew a Potion</div>
              <div className="quest-reward">+25 XP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  // This state management should move into AuthProvider
  const [user, setUser] = useState(null);

  const login = (name, house) => {
    const newUser = {
      id: Date.now(),
      name,
      house,
      level: 1,
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!user;

  // TODO: Wrap with AuthProvider
  // Child components should use useAuth() instead of props
  return (
    <div className="app">
      <h1>Wizard Academy</h1>
      <p>Authentication with Context API</p>

      {isAuthenticated ? (
        <Dashboard user={user} onLogout={logout} />
      ) : (
        <LoginForm onLogin={login} />
      )}

      <div className="info-box">
        <h3>Auth Context Pattern</h3>
        <ul>
          <li>User state stored in context</li>
          <li>Login/logout available globally</li>
          <li>Conditional rendering based on auth state</li>
          <li>Protected content without prop drilling</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
