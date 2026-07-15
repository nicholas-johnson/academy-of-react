import { Provider } from "react-redux";
import { store } from "./reduxStore.ts";
import { addSpell, removeSpell, selectSpells, selectTotalPower } from "./spellSlice.ts";
import { useAppSelector, useAppDispatch } from "./hooks.ts";
import { getRandomSpell } from "../data/spellData.ts";
import { SpellList } from "../components/SpellList.tsx";

function ReduxDemoContent() {
  const spells = useAppSelector(selectSpells);
  const totalPower = useAppSelector(selectTotalPower);
  const dispatch = useAppDispatch();

  const handleAdd = () => dispatch(addSpell(getRandomSpell()));

  return (
    <div className="demo">
      <div className="demo-header">
        <h2>Redux Toolkit</h2>
        <p className="tagline">Predictable state with slices and actions</p>
      </div>

      <div className="code-preview">
        <pre>{`const spellSlice = createSlice({
  name: 'spells',
  initialState: { list: [] as Spell[] },
  reducers: {
    addSpell: (state, action: PayloadAction<Omit<Spell, "id">>) => {
      state.list.push({ ...action.payload, id: Date.now() })
    }
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const spells = useAppSelector(selectSpells)
dispatch(addSpell({ name: 'Fireball', power: 85, element: 'fire' }))`}</pre>
      </div>

      <div className="demo-content">
        <div className="stats">
          <span>Total Spells: {spells.length}</span>
          <span>Total Power: {totalPower}</span>
        </div>

        <SpellList spells={spells} onRemove={(id) => dispatch(removeSpell(id))} />

        <button onClick={handleAdd} className="add-btn">
          + Add Random Spell
        </button>
      </div>
    </div>
  );
}

export function ReduxDemo() {
  return (
    <Provider store={store}>
      <ReduxDemoContent />
    </Provider>
  );
}
