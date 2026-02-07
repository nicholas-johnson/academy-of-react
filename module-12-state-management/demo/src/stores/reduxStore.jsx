import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Provider, useSelector, useDispatch } from 'react-redux'

// Redux Toolkit slice
const spellSlice = createSlice({
  name: 'spells',
  initialState: {
    list: [
      { id: 1, name: 'Fireball', power: 85, element: 'fire' },
      { id: 2, name: 'Ice Lance', power: 70, element: 'ice' },
    ]
  },
  reducers: {
    addSpell: (state, action) => {
      // Immer allows "mutating" syntax that's actually immutable
      state.list.push({ ...action.payload, id: Date.now() })
    },
    removeSpell: (state, action) => {
      state.list = state.list.filter(s => s.id !== action.payload)
    }
  }
})

// Export actions
export const { addSpell, removeSpell } = spellSlice.actions

// Create store
const store = configureStore({
  reducer: {
    spells: spellSlice.reducer
  }
})

// Selector
const selectSpells = (state) => state.spells.list
const selectTotalPower = (state) => state.spells.list.reduce((sum, s) => sum + s.power, 0)

// Inner component using Redux hooks
function ReduxDemoInner() {
  const spells = useSelector(selectSpells)
  const totalPower = useSelector(selectTotalPower)
  const dispatch = useDispatch()

  const handleAdd = () => {
    const names = ['Thunder Strike', 'Healing Light', 'Shadow Bolt', 'Earth Shield']
    const elements = ['lightning', 'holy', 'dark', 'earth']
    const idx = Math.floor(Math.random() * names.length)
    dispatch(addSpell({
      name: names[idx],
      power: Math.floor(Math.random() * 50) + 50,
      element: elements[idx]
    }))
  }

  return (
    <div className="demo">
      <div className="demo-header">
        <h2>🔮 Redux Toolkit</h2>
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

        <div className="spell-list">
          {spells.map(spell => (
            <div key={spell.id} className="spell-item">
              <span className="spell-name">{spell.name}</span>
              <span className="spell-power">⚡ {spell.power}</span>
              <button onClick={() => dispatch(removeSpell(spell.id))} className="remove-btn">×</button>
            </div>
          ))}
        </div>

        <button onClick={handleAdd} className="add-btn">
          + Add Random Spell
        </button>
      </div>
    </div>
  )
}

// Wrapped with Provider
export function ReduxDemo() {
  return (
    <Provider store={store}>
      <ReduxDemoInner />
    </Provider>
  )
}
