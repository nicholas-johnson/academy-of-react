import { useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import "./App.css";

// Zustand store with localStorage persistence
const useSpellStore = create(
  persist(
    (set, get) => ({
      spells: [],

      addSpell: (spell) =>
        set((state) => ({
          spells: [...state.spells, { ...spell, id: Date.now() }],
        })),

      removeSpell: (id) =>
        set((state) => ({
          spells: state.spells.filter((s) => s.id !== id),
        })),

      clearAll: () => set({ spells: [] }),

      // Computed value using get()
      getTotalPower: () => get().spells.reduce((sum, s) => sum + s.power, 0),
    }),
    {
      name: "spell-inventory", // localStorage key
    },
  ),
);

const ELEMENTS = ["fire", "ice", "lightning", "holy", "dark", "earth"];

function App() {
  const [name, setName] = useState("");
  const [power, setPower] = useState(50);
  const [element, setElement] = useState("fire");
  const [filterElement, setFilterElement] = useState("all");

  // Get state and actions from Zustand store
  const spells = useSpellStore((state) => state.spells);
  const addSpell = useSpellStore((state) => state.addSpell);
  const removeSpell = useSpellStore((state) => state.removeSpell);
  const clearAll = useSpellStore((state) => state.clearAll);
  const totalPower = useSpellStore((state) => state.getTotalPower());

  // Filter spells based on filterElement
  const filteredSpells =
    filterElement === "all"
      ? spells
      : spells.filter((s) => s.element === filterElement);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addSpell({ name, power, element });
    setName("");
    setPower(50);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Zustand Spell Inventory</h1>
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
                    {el}
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
      </main>
    </div>
  );
}

export default App;
