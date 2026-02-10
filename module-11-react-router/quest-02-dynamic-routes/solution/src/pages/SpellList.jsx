import { Link } from "react-router-dom";
import { spells } from "../data/spells";

export function SpellList() {
  return (
    <div className="page">
      <h2>All Spells</h2>
      <p>Click a spell to view its details</p>

      <div className="spell-grid">
        {spells.map((spell) => (
          <Link
            key={spell.id}
            to={`/spells/${spell.id}`}
            className="spell-card"
          >
            <h3>{spell.name}</h3>
            <div className="spell-meta">
              <span>Power: {spell.power}</span>
              <span>Mana: {spell.mana}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
