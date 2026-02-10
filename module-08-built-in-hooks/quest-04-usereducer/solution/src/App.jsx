import { useReducer } from "react";
import "./App.css";

// Reducer function (pure function outside component)
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
    default:
      return state;
  }
}

const initialState = { spells: [] };

function App() {
  const [state, dispatch] = useReducer(spellReducer, initialState);

  const addSpell = () => {
    const newSpell = {
      id: Date.now(),
      name: prompt("Spell name:") || "Unnamed Spell",
    };
    dispatch({ type: "ADD_SPELL", spell: newSpell });
  };

  const removeSpell = (id) => {
    dispatch({ type: "REMOVE_SPELL", id });
  };

  return (
    <div className="app">
      <h1>Spell Manager</h1>
      <p className="subtitle">Managing {state.spells.length} spells with useReducer</p>

      <button className="btn btn-primary" onClick={addSpell}>
        Add Spell
      </button>

      <div className="spell-list">
        {state.spells.length === 0 ? (
          <p className="empty">No spells yet. Add one to get started!</p>
        ) : (
          state.spells.map((spell) => (
            <div key={spell.id} className="spell-item">
              <span>{spell.name}</span>
              <button 
                className="btn btn-secondary" 
                onClick={() => removeSpell(spell.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="info-box">
        <h3>useReducer Key Points</h3>
        <ul>
          <li>Reducer is a pure function: (state, action) => newState</li>
          <li>dispatch sends actions to the reducer</li>
          <li>Actions are objects with type and optional payload</li>
          <li>Better than useState for complex state logic</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
