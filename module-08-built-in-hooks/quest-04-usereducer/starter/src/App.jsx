import { useReducer } from "react";
import "./App.css";

// TODO: Define reducer function

const initialState = { spells: [] };

function App() {
  // TODO: Use useReducer hook
  const [state, dispatch] = [initialState, () => {}]; // Replace this

  const addSpell = () => {
    const newSpell = {
      id: Date.now(),
      name: prompt("Spell name:") || "Unnamed Spell",
    };
    // TODO: dispatch ADD_SPELL action
  };

  const removeSpell = (id) => {
    // TODO: dispatch REMOVE_SPELL action
  };

  return (
    <div className="app">
      <h1>Spell Manager</h1>
      <p className="subtitle">Managing spells with useReducer</p>

      <button className="btn btn-primary" onClick={addSpell}>
        Add Spell
      </button>

      <div className="spell-list">
        {state.spells.map((spell) => (
          <div key={spell.id} className="spell-item">
            <span>{spell.name}</span>
            <button 
              className="btn btn-secondary" 
              onClick={() => removeSpell(spell.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="info-box">
        <h3>Your Task</h3>
        <ul>
          <li>Define reducer function outside component</li>
          <li>Use useReducer hook</li>
          <li>Handle ADD_SPELL and REMOVE_SPELL actions</li>
          <li>Use dispatch to trigger state changes</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
