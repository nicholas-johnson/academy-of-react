import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./reduxStore";
import { addSpell, removeSpell, selectSpells, selectTotalPower } from "./spellSlice";
import { getRandomSpell } from "../data/spellData";
import { SpellList } from "../components/SpellList";

function ReduxDemoContent() {
  const spells = useSelector(selectSpells);
  const totalPower = useSelector(selectTotalPower);
  const dispatch = useDispatch();

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
  initialState: { list: [] },
  reducers: {
    addSpell: (state, action) => {
      state.list.push(action.payload)  // Immer!
    }
  }
})

const spells = useSelector(state => state.spells.list)
dispatch(addSpell({ name: 'Fireball' }))`}</pre>
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
