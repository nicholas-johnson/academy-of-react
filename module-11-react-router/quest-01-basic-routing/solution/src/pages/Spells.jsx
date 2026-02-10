import { spells } from "../data/spells";

export function Spells() {
  return (
    <div className="page">
      <h2>Spells</h2>
      <div className="spell-list">
        {spells.map((spell) => (
          <div key={spell.id} className="spell-card">
            <spell.Icon className="spell-icon" size={24} />
            <h3>{spell.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
