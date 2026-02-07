import { useState } from "react";
// TODO: Import create from 'zustand'
// TODO: Import persist from 'zustand/middleware' for localStorage
import "./App.css";

// TODO: Create a Zustand store with:
// - spells: array of spell objects
// - addSpell: function to add a spell
// - removeSpell: function to remove a spell by id
// - clearAll: function to remove all spells
//
// Each spell should have: { id, name, power, element }
//
// BONUS: Wrap with persist() middleware for localStorage

// Placeholder - replace with Zustand store
const useSpellStore = null;

const ELEMENTS = ["fire", "ice", "lightning", "holy", "dark", "earth"];

function App() {
  const [name, setName] = useState("");
  const [power, setPower] = useState(50);
  const [element, setElement] = useState("fire");
  const [filterElement, setFilterElement] = useState("all");

  // TODO: Get state and actions from Zustand store
  // const spells = useSpellStore((state) => state.spells)
  // const addSpell = useSpellStore((state) => state.addSpell)
  // const removeSpell = useSpellStore((state) => state.removeSpell)
  // const clearAll = useSpellStore((state) => state.clearAll)

  // Placeholder data - remove when using Zustand
  const spells = [
    { id: 1, name: "Fireball", power: 85, element: "fire" },
    { id: 2, name: "Ice Lance", power: 70, element: "ice" },
  ];

  // TODO: Filter spells based on filterElement
  const filteredSpells =
    filterElement === "all"
      ? spells
      : spells.filter((s) => s.element === filterElement);

  // TODO: Calculate total power
  const totalPower = spells.reduce((sum, s) => sum + s.power, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // TODO: Call addSpell with new spell data
    // addSpell({ name, power, element })

    console.log("TODO: Add spell", { name, power, element });
    setName("");
    setPower(50);
  };

  const getElementEmoji = (el) => {
    const emojis = {
      fire: "🔥",
      ice: "❄️",
      lightning: "⚡",
      holy: "✨",
      dark: "🌑",
      earth: "🪨",
    };
    return emojis[el] || "🔮";
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🐻 Zustand Spell Inventory</h1>
        <p>Simple state management with Zustand</p>
      </header>

      <main className="main">
        <section className="add-form">
          <h2>Add New Spell</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Spell name"
                required
              />
              <select
                value={element}
                onChange={(e) => setElement(e.target.value)}
              >
                {ELEMENTS.map((el) => (
                  <option key={el} value={el}>
                    {getElementEmoji(el)} {el}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label>
                Power: {power}
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={power}
                  onChange={(e) => setPower(Number(e.target.value))}
                />
              </label>
            </div>
            <button type="submit" className="btn primary">
              Add Spell
            </button>
          </form>
        </section>

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
                    {getElementEmoji(el)} {el}
                  </option>
                ))}
              </select>
              {/* TODO: Add clear all button */}
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
              <p className="empty">No spells in inventory</p>
            ) : (
              filteredSpells.map((spell) => (
                <div key={spell.id} className="spell-card">
                  <span className="spell-element">
                    {getElementEmoji(spell.element)}
                  </span>
                  <div className="spell-info">
                    <h3>{spell.name}</h3>
                    <p>Power: {spell.power}</p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => {
                      // TODO: Call removeSpell(spell.id)
                      console.log("TODO: Remove spell", spell.id);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
