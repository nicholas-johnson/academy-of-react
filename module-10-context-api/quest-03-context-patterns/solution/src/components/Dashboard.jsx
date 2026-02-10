import { useAuth } from "../context/AuthContext";

export function Dashboard() {
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
