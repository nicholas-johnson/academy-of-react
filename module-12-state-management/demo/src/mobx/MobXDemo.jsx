import { observer } from "mobx-react-lite";
import { spellStore } from "./mobxSpellStore";
import { getRandomSpell } from "../data/spellData";
import { SpellList } from "../components/SpellList";

export const MobXDemo = observer(function MobXDemo() {
  const handleAdd = () => spellStore.addSpell(getRandomSpell());

  return (
    <div className="demo">
      <div className="demo-header">
        <h2>MobX</h2>
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

        <SpellList
          spells={spellStore.spells}
          onRemove={(id) => spellStore.removeSpell(id)}
        />

        <button onClick={handleAdd} className="add-btn">
          + Add Random Spell
        </button>
      </div>
    </div>
  );
});
