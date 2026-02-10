import { useParams, useNavigate } from "react-router-dom";
import { spells } from "../data/spells";

export function SpellDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const spell = spells.find((s) => s.id === parseInt(id));

  if (!spell) {
    return (
      <div className="page">
        <h2>Spell Not Found</h2>
        <p>The spell you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/spells")} className="btn">
          ← Back to Spells
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <div className="spell-detail">
        <h2>{spell.name}</h2>
        <p className="spell-description">{spell.description}</p>

        <div className="spell-stats">
          <div className="stat">
            <span className="stat-label">Element</span>
            <span className="stat-value">{spell.element}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Power</span>
            <span className="stat-value">{spell.power}</span>
          </div>
        </div>

        <div className="power-bar">
          <div className="power-fill" style={{ width: `${spell.power}%` }} />
        </div>
      </div>
    </div>
  );
}
