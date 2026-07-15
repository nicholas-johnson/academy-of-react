import type { Spell } from "../types/spell";

interface SpellListProps {
  spells: Spell[];
  onRemove: (id: number) => void;
}

export function SpellList({ spells, onRemove }: SpellListProps) {
  return (
    <div className="spell-list">
      {spells.map((spell) => (
        <div key={spell.id} className="spell-item">
          <span className="spell-name">{spell.name}</span>
          <span className="spell-power"> {spell.power}</span>
          <button onClick={() => onRemove(spell.id)} className="remove-btn">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
