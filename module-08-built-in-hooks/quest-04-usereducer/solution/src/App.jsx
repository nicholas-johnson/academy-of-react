import { useReducer, useState } from "react";
import "./App.css";

// Initial data
const initialSpells = [
  { id: 1, name: "Fireball", power: 50, isFavorite: true },
  { id: 2, name: "Ice Shard", power: 35, isFavorite: false },
  { id: 3, name: "Lightning Bolt", power: 65, isFavorite: false },
];

// Reducer function
function spellReducer(state, action) {
  switch (action.type) {
    case "ADD_SPELL":
      return {
        ...state,
        spells: [...state.spells, action.spell],
      };

    case "REMOVE_SPELL":
      return {
        ...state,
        spells: state.spells.filter((spell) => spell.id !== action.id),
      };

    case "UPGRADE_SPELL":
      return {
        ...state,
        spells: state.spells.map((spell) =>
          spell.id === action.id
            ? { ...spell, power: spell.power + 10 }
            : spell,
        ),
      };

    case "TOGGLE_FAVORITE":
      return {
        ...state,
        spells: state.spells.map((spell) =>
          spell.id === action.id
            ? { ...spell, isFavorite: !spell.isFavorite }
            : spell,
        ),
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(spellReducer, { spells: initialSpells });
  const [newSpellName, setNewSpellName] = useState("");

  // Derived state (calculated from reducer state)
  const totalPower = state.spells.reduce((sum, spell) => sum + spell.power, 0);
  const favoriteCount = state.spells.filter((spell) => spell.isFavorite).length;

  const handleAddSpell = () => {
    if (!newSpellName.trim()) return;

    dispatch({
      type: "ADD_SPELL",
      spell: {
        id: Date.now(),
        name: newSpellName,
        power: 20,
        isFavorite: false,
      },
    });
    setNewSpellName("");
  };

  return (
    <div className="app">
      <h1>Spell Inventory</h1>
      <p className="subtitle">Manage your magical arsenal with useReducer</p>

      <div className="stats">
        <div className="stat">
          <span className="stat-value">{state.spells.length}</span>
          <span className="stat-label">Total Spells</span>
        </div>
        <div className="stat">
          <span className="stat-value">{totalPower}</span>
          <span className="stat-label">Total Power</span>
        </div>
        <div className="stat">
          <span className="stat-value">{favoriteCount}</span>
          <span className="stat-label">Favorites</span>
        </div>
      </div>

      <div className="add-spell">
        <input
          type="text"
          value={newSpellName}
          onChange={(e) => setNewSpellName(e.target.value)}
          placeholder="Enter spell name..."
          onKeyDown={(e) => e.key === "Enter" && handleAddSpell()}
        />
        <button onClick={handleAddSpell}>Add Spell</button>
      </div>

      <ul className="spell-list">
        {state.spells.map((spell) => (
          <li key={spell.id} className={spell.isFavorite ? "favorite" : ""}>
            <div className="spell-info">
              <span className="spell-name">
                {spell.isFavorite && "★ "}
                {spell.name}
              </span>
              <span className="spell-power">Power: {spell.power}</span>
            </div>
            <div className="spell-actions">
              <button
                onClick={() =>
                  dispatch({ type: "TOGGLE_FAVORITE", id: spell.id })
                }
                className="btn-favorite"
              >
                {spell.isFavorite ? "Unfavorite" : "Favorite"}
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "UPGRADE_SPELL", id: spell.id })
                }
                className="btn-upgrade"
              >
                Upgrade +10
              </button>
              <button
                onClick={() => dispatch({ type: "REMOVE_SPELL", id: spell.id })}
                className="btn-remove"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {state.spells.length === 0 && (
        <p className="empty-message">No spells in inventory. Add some!</p>
      )}
    </div>
  );
}

export default App;
