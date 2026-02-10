export function SpellCard({ spell }) {
  return (
    <div className="spell-card">
      <h4>{spell.name}</h4>
      <span className={`type-badge ${spell.type}`}>{spell.type}</span>
      <div className="power-display">Power: {spell.power}</div>
    </div>
  );
}
