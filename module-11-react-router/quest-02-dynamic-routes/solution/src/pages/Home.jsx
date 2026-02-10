import { Link } from "react-router-dom";
import { spells } from "../data/spells";

export function Home() {
  return (
    <div className="page">
      <h2>Welcome to the Spell Directory</h2>
      <p>
        Browse our collection of powerful spells. Click on any spell to see its
        details!
      </p>
      <div className="home-stats">
        <div className="stat-card">
          <span className="stat-number">{spells.length}</span>
          <span className="stat-label">Spells Available</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">6</span>
          <span className="stat-label">Elements</span>
        </div>
      </div>
      <Link
        to="/spells"
        className="btn"
        style={{ marginTop: "32px", display: "inline-block" }}
      >
        Browse Spells →
      </Link>
    </div>
  );
}
