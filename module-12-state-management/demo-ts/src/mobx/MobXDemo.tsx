import { observer } from "mobx-react-lite";
import { spellStore } from "./mobxSpellStore.ts";
import { getRandomSpell } from "../data/spellData.ts";
import { SpellList } from "../components/SpellList.tsx";

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
  spells: Spell[] = []

  constructor() {
    makeAutoObservable(this)
  }

  addSpell(spell: Omit<Spell, "id">) {
    this.spells.push({ ...spell, id: Date.now() })
  }

  get totalPower(): number {
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
