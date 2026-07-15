import { useSpellStore } from "./zustandStore.ts";
import { getRandomSpell } from "../data/spellData.ts";
import { SpellList } from "../components/SpellList.tsx";

export function ZustandDemo() {
  const spells = useSpellStore((state) => state.spells);
  const addSpell = useSpellStore((state) => state.addSpell);
  const removeSpell = useSpellStore((state) => state.removeSpell);
  const totalPower = useSpellStore((state) => state.getTotalPower());

  const handleAdd = () => addSpell(getRandomSpell());

  return (
    <div className="demo">
      <div className="demo-header">
        <h2>Zustand</h2>
        <p className="tagline">Simple, hooks-based state management</p>
      </div>

      <div className="code-preview">
        <pre>{`interface SpellState {
  spells: Spell[]
  addSpell: (spell: Omit<Spell, "id">) => void
  removeSpell: (id: number) => void
}

const useStore = create<SpellState>()((set) => ({
  spells: [],
  addSpell: (spell) => set((state) => ({
    spells: [...state.spells, { ...spell, id: Date.now() }]
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

        <SpellList spells={spells} onRemove={removeSpell} />

        <button onClick={handleAdd} className="add-btn">
          + Add Random Spell
        </button>
      </div>
    </div>
  );
}
