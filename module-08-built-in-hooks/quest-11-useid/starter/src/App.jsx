import { useId } from "react";
import "./App.css";

function App() {
  // TODO: Generate IDs with useId

  return (
    <div className="app">
      <h1>Spell Registration Form</h1>
      <p className="subtitle">Accessible forms with useId</p>

      <form className="spell-form">
        <div className="form-field">
          <label>Spell Name:</label>
          <input type="text" placeholder="Enter spell name..." />
        </div>

        <div className="form-field">
          <label>Element:</label>
          <select>
            <option>Fire</option>
            <option>Ice</option>
            <option>Lightning</option>
          </select>
        </div>

        <div className="form-field">
          <label>Power Level:</label>
          <input type="number" min="0" max="100" placeholder="0-100" />
        </div>

        <button type="submit" className="btn btn-primary">
          Register Spell
        </button>
      </form>

      <div className="info-box">
        <h3>Your Task</h3>
        <ul>
          <li>Call useId() for each form field</li>
          <li>Add id attribute to each input</li>
          <li>Add htmlFor attribute to each label</li>
          <li>Test with screen reader or tab navigation</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
