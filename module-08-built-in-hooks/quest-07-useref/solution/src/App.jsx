import { useRef } from "react";
import "./App.css";

function App() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  const selectAll = () => {
    inputRef.current.select();
  };

  return (
    <div className="app">
      <h1>Spell Input Focus</h1>
      <p className="subtitle">Direct DOM access with useRef</p>

      <div className="input-group">
        <label htmlFor="spell-name">Spell Name:</label>
        <input
          ref={inputRef}
          id="spell-name"
          type="text"
          placeholder="Enter spell name..."
        />
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={focusInput}>
          Focus Input
        </button>
        <button className="btn btn-secondary" onClick={selectAll}>
          Select All
        </button>
      </div>

      <div className="info-box">
        <h3>useRef Key Points</h3>
        <ul>
          <li>Creates a mutable ref object</li>
          <li>ref.current persists across renders</li>
          <li>Changing ref.current doesn't trigger re-render</li>
          <li>Perfect for DOM access and mutable values</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
