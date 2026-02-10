import { SpellCard } from "./SpellCard";

export function SpellGrid({ spells, title }) {
  return (
    <div className="spells-section">
      <h3>{title}</h3>
      <div className="spell-grid">
        {spells.map((spell) => (
          <SpellCard key={spell.id} spell={spell} />
        ))}
      </div>
    </div>
  );
}
