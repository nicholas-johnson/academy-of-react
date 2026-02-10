import { useParams, useNavigate } from "react-router-dom";
import { spells } from "../data/spells";

export function SpellDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const spell = spells.find((s) => s.id === parseInt(id));

  if (!spell) {
    return (
      <div className="page not-found">
        <h2>Spell Not Found</h2>
        <p>The spell you're looking for doesn't exist in our directory.</p>
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
        <span className="element-badge">{spell.element}</span>
        <p className="spell-description">{spell.description}</p>

        <div className="spell-stats">
          <div className="stat">
            <span className="stat-label">Power</span>
            <span className="stat-value">{spell.power}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Mana Cost</span>
            <span className="stat-value">{spell.mana}</span>
          </div>
        </div>

        <div className="power-bar">
          <div className="power-bar-label">
            <span>Power Level</span>
            <span>{spell.power}%</span>
          </div>
          <div className="power-bar-track">
            <div
              className="power-bar-fill"
              style={{ width: `${spell.power}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
