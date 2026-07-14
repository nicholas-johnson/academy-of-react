import "./SpellCard.css";

function SpellCard({ spell }) {
  return (
    <div className={`spell-card element-${spell.element}`}>
      <div className="spell-card-header">
        <h3 className="spell-name">{spell.name}</h3>
        <span className="spell-element">{spell.element}</span>
      </div>
      <p className="spell-description">{spell.description}</p>
      <div className="spell-power">
        <div
          className="spell-power-bar"
          style={{ width: `${spell.power}%` }}
        />
        <span className="spell-power-label">{spell.power}</span>
      </div>
    </div>
  );
}

export default SpellCard;
