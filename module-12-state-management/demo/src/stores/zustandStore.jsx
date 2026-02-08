import { create } from "zustand";

// Zustand store - simple and elegant
const useSpellStore = create((set, get) => ({
  spells: [
    { id: 1, name: "Fireball", power: 85, element: "fire" },
    { id: 2, name: "Ice Lance", power: 70, element: "ice" },
  ],

  // Actions
  addSpell: (spell) =>
    set((state) => ({
      spells: [...state.spells, { ...spell, id: Date.now() }],
    })),

  removeSpell: (id) =>
    set((state) => ({
      spells: state.spells.filter((s) => s.id !== id),
    })),

  // Computed values via get()
  getTotalPower: () => get().spells.reduce((sum, s) => sum + s.power, 0),
}));

// Component using the store
export function ZustandDemo() {
  const spells = useSpellStore((state) => state.spells);
  const addSpell = useSpellStore((state) => state.addSpell);
  const removeSpell = useSpellStore((state) => state.removeSpell);
  const totalPower = useSpellStore((state) => state.getTotalPower());

  const handleAdd = () => {
    const names = [
      "Thunder Strike",
      "Healing Light",
      "Shadow Bolt",
      "Earth Shield",
    ];
    const elements = ["lightning", "holy", "dark", "earth"];
    const idx = Math.floor(Math.random() * names.length);
    addSpell({
      name: names[idx],
      power: Math.floor(Math.random() * 50) + 50,
      element: elements[idx],
    });
  };

  return (
    <div className="demo">
      <div className="demo-header">
        <h2>🐻 Zustand</h2>
        <p className="tagline">Simple, hooks-based state management</p>
      </div>

      <div className="code-preview">
        <pre>{`const useStore = create((set) => ({
  spells: [],
  addSpell: (spell) => set((state) => ({
    spells: [...state.spells, spell]
  }))
}))

// No provider needed!
const spells = useStore(state => state.spells)`}</pre>
      </div>

      <div className="demo-content">
        <div className="stats">
          <span>Total Spells: {spells.length}</span>
          <span>Total Power: {totalPower}</span>
        </div>

        <div className="spell-list">
          {spells.map((spell) => (
            <div key={spell.id} className="spell-item">
              <span className="spell-name">{spell.name}</span>
              <span className="spell-power"> {spell.power}</span>
              <button
                onClick={() => removeSpell(spell.id)}
                className="remove-btn"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button onClick={handleAdd} className="add-btn">
          + Add Random Spell
        </button>
      </div>
    </div>
  );
}
