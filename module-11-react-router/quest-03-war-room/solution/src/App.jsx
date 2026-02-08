import { createContext, useContext, useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  Outlet,
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./App.css";

// Battle data
const battles = [
  {
    id: 1,
    name: "Battle of Eldoria",
    status: "victory",
    date: "2024-01-15",
    casualties: 120,
  },
  {
    id: 2,
    name: "Siege of Ironhold",
    status: "defeat",
    date: "2024-01-18",
    casualties: 450,
  },
  {
    id: 3,
    name: "Ambush at Darkwood",
    status: "victory",
    date: "2024-01-22",
    casualties: 85,
  },
  {
    id: 4,
    name: "Defense of Crystal Bay",
    status: "ongoing",
    date: "2024-01-25",
    casualties: 200,
  },
  {
    id: 5,
    name: "Raid on Shadow Keep",
    status: "victory",
    date: "2024-01-28",
    casualties: 150,
  },
  {
    id: 6,
    name: "March to Winterfell",
    status: "ongoing",
    date: "2024-02-01",
    casualties: 300,
  },
];

// ============================================
// AUTH CONTEXT
// ============================================

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => {
    setUser({ name: username, role: "commander" });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

// ============================================
// PROTECTED ROUTE COMPONENT
// ============================================

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login, saving current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// ============================================
// COMPONENTS
// ============================================

function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="app">
      <header className="header">
        <h1>Battle Command</h1>
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
            to="/war-room"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            War Room
          </NavLink>
          {user ? (
            <button onClick={logout} className="nav-btn">
              Logout ({user.name})
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Login
            </NavLink>
          )}
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

function Home() {
  const { user } = useAuth();

  return (
    <div className="page">
      <h2>Welcome to Battle Command</h2>
      <p>Track and manage ongoing military operations.</p>

      {user ? (
        <div className="welcome-box">
          <p>
            Welcome back, <strong>{user.name}</strong>!
          </p>
          <Link to="/war-room" className="btn">
            Enter War Room →
          </Link>
        </div>
      ) : (
        <div className="welcome-box">
          <p>Please log in to access the War Room.</p>
          <Link to="/login" className="btn">
            Login →
          </Link>
        </div>
      )}
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Get the page they tried to visit
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      // Send them back to the page they tried to visit
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="page">
      <div className="login-box">
        <h2>Commander Login</h2>
        {from !== "/" && (
          <p className="login-notice">You must log in to access that page.</p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

function WarRoom() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "all";

  const filteredBattles =
    statusFilter === "all"
      ? battles
      : battles.filter((b) => b.status === statusFilter);

  const handleFilterChange = (status) => {
    if (status === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ status });
    }
  };

  // Calculate stats
  const stats = {
    total: battles.length,
    victories: battles.filter((b) => b.status === "victory").length,
    defeats: battles.filter((b) => b.status === "defeat").length,
    ongoing: battles.filter((b) => b.status === "ongoing").length,
  };

  return (
    <div className="page">
      <h2>War Room</h2>
      <p>Classified battle information. Commanders only.</p>

      <div className="stats-row">
        <div className="stat-box">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Battles</span>
        </div>
        <div className="stat-box victory">
          <span className="stat-value">{stats.victories}</span>
          <span className="stat-label">Victories</span>
        </div>
        <div className="stat-box defeat">
          <span className="stat-value">{stats.defeats}</span>
          <span className="stat-label">Defeats</span>
        </div>
        <div className="stat-box ongoing">
          <span className="stat-value">{stats.ongoing}</span>
          <span className="stat-label">Ongoing</span>
        </div>
      </div>

      <div className="filters">
        <span>Filter by status:</span>
        <button
          onClick={() => handleFilterChange("all")}
          className={
            statusFilter === "all" ? "filter-btn active" : "filter-btn"
          }
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("victory")}
          className={
            statusFilter === "victory" ? "filter-btn active" : "filter-btn"
          }
        >
          Victory
        </button>
        <button
          onClick={() => handleFilterChange("defeat")}
          className={
            statusFilter === "defeat" ? "filter-btn active" : "filter-btn"
          }
        >
          Defeat
        </button>
        <button
          onClick={() => handleFilterChange("ongoing")}
          className={
            statusFilter === "ongoing" ? "filter-btn active" : "filter-btn"
          }
        >
          Ongoing
        </button>
      </div>

      <p className="results-count">
        Showing {filteredBattles.length} of {battles.length} battles
      </p>

      <div className="battle-list">
        {filteredBattles.map((battle) => (
          <div key={battle.id} className={`battle-card ${battle.status}`}>
            <div className="battle-header">
              <h3>{battle.name}</h3>
              <span className={`status-badge ${battle.status}`}>
                {battle.status}
              </span>
            </div>
            <div className="battle-info">
              <span>Date: {battle.date}</span>
              <span>Casualties: {battle.casualties}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// APP WITH ROUTES
// ============================================

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route
            path="war-room"
            element={
              <ProtectedRoute>
                <WarRoom />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
