import { createContext, useContext, useState } from "react";
import "./App.css";

const AuthContext = createContext(undefined);

function AuthProvider({ children }) {
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

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

function LoginForm() {
  const [name, setName] = useState("");
  const [house, setHouse] = useState("Liondudes");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login(name, house);
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
            <option value="Liondudes">Liondudes</option>
            <option value="Scarybird">Scarybird</option>
            <option value="Huftybadger">Huftybadger</option>
            <option value="Snakeyguys">Snakeyguys</option>
          </select>
        </div>
        <button type="submit" className="btn btn-login">
          Enter Academy ✨
        </button>
      </form>
    </div>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Welcome back, {user.name}!</h2>
          <p className="house-badge"> House {user.house}</p>
        </div>
        <button onClick={logout} className="btn btn-logout">
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div>
            <div className="stat-value">Level {user.level}</div>
            <div className="stat-label">Current Level</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div>
            <div className="stat-value">42</div>
            <div className="stat-label">Spells Learned</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
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
            <div>
              <div className="quest-title">Duel a Rival</div>
              <div className="quest-reward">+50 XP</div>
            </div>
          </div>
          <div className="quest-card">
            <div>
              <div className="quest-title">Study Advanced Spells</div>
              <div className="quest-reward">+30 XP</div>
            </div>
          </div>
          <div className="quest-card">
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
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      <h1> Wizard Academy</h1>
      <p>Authentication with Context API</p>

      {isAuthenticated ? <Dashboard /> : <LoginForm />}

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

function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithProvider;
