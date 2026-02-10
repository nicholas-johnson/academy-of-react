import { useTheme } from "../context/ThemeContext";

export function Content() {
  const { theme } = useTheme();

  return (
    <div className="content">
      <h2>Welcome, Wizard!</h2>
      <p>
        Current theme: <strong>{theme}</strong>
      </p>
      <p>This component accesses theme without prop drilling!</p>

      <div className="stats">
        <div className="stat-card">
          <div>
            <div className="stat-value">250</div>
            <div className="stat-label">Spells Cast</div>
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-value">1,420</div>
            <div className="stat-label">Experience</div>
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-value">15</div>
            <div className="stat-label">Victories</div>
          </div>
        </div>
      </div>
    </div>
  );
}
