export function SpellList({ spells }) {
  if (spells.length === 0) {
    return (
      <div className="empty-message">
        No spells match your search. Try "fire" or "ice"!
      </div>
    );
  }

  return (
    <div className="spell-list">
      {spells.map((spell) => (
        <div key={spell.id} className="spell-item">
          <div>
            <h4>{spell.name}</h4>
            <p className="spell-desc">{spell.description}</p>
          </div>
          <div className="spell-meta">
            <span className={`type-badge ${spell.type}`}>{spell.type}</span>
            <span className="power-badge">Power: {spell.power}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
