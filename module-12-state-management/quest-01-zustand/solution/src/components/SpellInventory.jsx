import { useState } from "react";
import { useSpellStore } from "../store/spellStore";
import { ELEMENTS } from "../data/elements";

export function SpellInventory() {
  const [filterElement, setFilterElement] = useState("all");

  const spells = useSpellStore((state) => state.spells);
  const removeSpell = useSpellStore((state) => state.removeSpell);
  const clearAll = useSpellStore((state) => state.clearAll);
  const totalPower = useSpellStore((state) => state.getTotalPower());

  // Filter spells based on filterElement
  const filteredSpells =
    filterElement === "all"
      ? spells
      : spells.filter((s) => s.element === filterElement);

  return (
    <section className="inventory">
      <div className="inventory-header">
        <h2>Spell Inventory</h2>
        <div className="controls">
          <select
            value={filterElement}
            onChange={(e) => setFilterElement(e.target.value)}
          >
            <option value="all">All Elements</option>
            {ELEMENTS.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
          {spells.length > 0 && (
            <button className="btn danger" onClick={clearAll}>
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="stat-value">{filteredSpells.length}</span>
          <span className="stat-label">Spells</span>
        </div>
        <div className="stat">
          <span className="stat-value">{totalPower}</span>
          <span className="stat-label">Total Power</span>
        </div>
      </div>

      <div className="spell-list">
        {filteredSpells.length === 0 ? (
          <p className="empty">
            No spells in inventory. Add some spells above!
          </p>
        ) : (
          filteredSpells.map((spell) => (
            <div key={spell.id} className="spell-card">
              <div className="spell-info">
                <h3>{spell.name}</h3>
                <p>Power: {spell.power}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeSpell(spell.id)}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      <p className="persistence-note">
        Your inventory is saved to localStorage automatically!
      </p>
    </section>
  );
}
