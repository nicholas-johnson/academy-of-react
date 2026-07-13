/* ⚙️ ENGINE CODE — this component is already built for you.
   It receives spell data and renders a card.
   You don't need to edit this file. */

import "./SpellCard.css";

const ELEMENT_LABELS = {
  fire: "Fire",
  ice: "Ice",
  lightning: "Lightning",
  earth: "Earth",
  arcane: "Arcane",
};

function SpellCard({ name, element, power, description, icon, showDetails }) {
  return (
    <div className={`spell-card element-${element}`}>
      <div className="spell-header">
        <span className="spell-icon">{icon}</span>
        <h3 className="spell-name">{name}</h3>
      </div>

      <span className={`spell-badge badge-${element}`}>
        {ELEMENT_LABELS[element] || element}
      </span>

      <div className="power-section">
        <div className="power-label">
          <span>Power</span>
          <span className="power-value">{power}</span>
        </div>
        <div className="power-bar">
          <div className="power-fill" style={{ width: `${power}%` }} />
        </div>
      </div>

      <div className={`spell-details ${showDetails ? "visible" : ""}`}>
        <p className="spell-description">{description}</p>
      </div>
    </div>
  );
}

export default SpellCard;
