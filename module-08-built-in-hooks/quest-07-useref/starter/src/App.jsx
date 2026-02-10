import { useRef } from "react";
import "./App.css";

function App() {
  // TODO: Create ref with useRef

  const focusInput = () => {
    // TODO: Use ref.current.focus()
  };

  return (
    <div className="app">
      <h1>Spell Input Focus</h1>
      <p className="subtitle">Direct DOM access with useRef</p>

      <div className="input-group">
        <label htmlFor="spell-name">Spell Name:</label>
        <input
          id="spell-name"
          type="text"
          placeholder="Enter spell name..."
          // TODO: attach ref here
        />
      </div>

      <button className="btn btn-primary" onClick={focusInput}>
        Focus Input
      </button>

      <div className="info-box">
        <h3>Your Task</h3>
        <ul>
          <li>Create ref with useRef(null)</li>
          <li>Attach ref to input element</li>
          <li>Call ref.current.focus() on button click</li>
          <li>Notice: changing ref doesn't cause re-render</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
