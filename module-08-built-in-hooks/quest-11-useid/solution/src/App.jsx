import { useId } from "react";
import "./App.css";

function App() {
  const nameId = useId();
  const elementId = useId();
  const powerId = useId();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Spell registered!");
  };

  return (
    <div className="app">
      <h1>Spell Registration Form</h1>
      <p className="subtitle">Accessible forms with useId</p>

      <form className="spell-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor={nameId}>Spell Name:</label>
          <input 
            id={nameId}
            type="text" 
            placeholder="Enter spell name..." 
          />
        </div>

        <div className="form-field">
          <label htmlFor={elementId}>Element:</label>
          <select id={elementId}>
            <option>Fire</option>
            <option>Ice</option>
            <option>Lightning</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor={powerId}>Power Level:</label>
          <input 
            id={powerId}
            type="number" 
            min="0" 
            max="100" 
            placeholder="0-100" 
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register Spell
        </button>
      </form>

      <div className="info-box">
        <h3>useId Key Points</h3>
        <ul>
          <li>Generates unique, stable IDs</li>
          <li>Safe for server-side rendering</li>
          <li>Each useId() call returns different ID</li>
          <li>Proper label-input association for accessibility</li>
          <li>Works correctly with multiple component instances</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
