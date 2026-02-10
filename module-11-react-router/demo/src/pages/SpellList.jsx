import { Link } from "react-router-dom";
import { spells } from "../data/spells";

export function SpellList() {
  return (
    <div className="page">
      <h2>Spell Library</h2>
      <p>Click a spell to view details</p>

      <div className="spell-grid">
        {spells.map((spell) => (
          <Link
            key={spell.id}
            to={`/spells/${spell.id}`}
            className="spell-card"
          >
            <h3>{spell.name}</h3>
            <p>Power: {spell.power}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
