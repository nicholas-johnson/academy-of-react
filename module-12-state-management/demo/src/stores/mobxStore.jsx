import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

// MobX store class
class SpellStore {
  spells = [
    { id: 1, name: "Fireball", power: 85, element: "fire" },
    { id: 2, name: "Ice Lance", power: 70, element: "ice" },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  // Actions - direct mutations are tracked!
  addSpell(spell) {
    this.spells.push({ ...spell, id: Date.now() });
  }

  removeSpell(id) {
    this.spells = this.spells.filter((s) => s.id !== id);
  }

  // Computed value - automatically cached and updated
  get totalPower() {
    return this.spells.reduce((sum, s) => sum + s.power, 0);
  }

  get spellCount() {
    return this.spells.length;
  }
}

// Create store instance
const spellStore = new SpellStore();

// Component wrapped with observer for reactivity
export const MobXDemo = observer(() => {
  const handleAdd = () => {
    const names = [
      "Thunder Strike",
      "Healing Light",
      "Shadow Bolt",
      "Earth Shield",
    ];
    const elements = ["lightning", "holy", "dark", "earth"];
    const idx = Math.floor(Math.random() * names.length);
    spellStore.addSpell({
      name: names[idx],
      power: Math.floor(Math.random() * 50) + 50,
      element: elements[idx],
    });
  };

  return (
    <div className="demo">
      <div className="demo-header">
        <h2>👁️ MobX</h2>
        <p className="tagline">Observable state with automatic tracking</p>
      </div>

      <div className="code-preview">
        <pre>{`class SpellStore {
  spells = []
  
  constructor() {
    makeAutoObservable(this)
  }
  
  addSpell(spell) {
    this.spells.push(spell)  // Direct mutation!
  }
  
  get totalPower() {  // Computed
    return this.spells.reduce((sum, s) => sum + s.power, 0)
  }
}

const MyComponent = observer(() => { ... })`}</pre>
      </div>

      <div className="demo-content">
        <div className="stats">
          <span>Total Spells: {spellStore.spellCount}</span>
          <span>Total Power: {spellStore.totalPower}</span>
        </div>

        <div className="spell-list">
          {spellStore.spells.map((spell) => (
            <div key={spell.id} className="spell-item">
              <span className="spell-name">{spell.name}</span>
              <span className="spell-power">⚡ {spell.power}</span>
              <button
                onClick={() => spellStore.removeSpell(spell.id)}
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
});
