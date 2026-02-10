import { useRef, useImperativeHandle, forwardRef } from "react";
import "./App.css";

// TODO: Wrap in forwardRef
const SpellInput = (props, ref) => {
  const inputRef = useRef(null);

  // TODO: Use useImperativeHandle to expose methods

  return (
    <input
      ref={inputRef}
      type="text"
      className="spell-input"
      placeholder="Enter spell name..."
    />
  );
};

// TODO: Wrap component with forwardRef

function App() {
  const spellInputRef = useRef(null);

  const handleFocus = () => {
    // TODO: Call exposed focus method
  };

  const handleClear = () => {
    // TODO: Call exposed clear method
  };

  return (
    <div className="app">
      <h1>Custom Spell Input</h1>
      <p className="subtitle">useImperativeHandle Demo</p>

      <div className="input-container">
        <SpellInput />
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={handleFocus}>
          Focus Input
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          Clear Input
        </button>
      </div>

      <div className="info-box">
        <h3>Your Task</h3>
        <ul>
          <li>Wrap SpellInput in forwardRef</li>
          <li>Use useImperativeHandle to expose focus() and clear()</li>
          <li>Parent calls methods via ref.current</li>
          <li>Internal implementation stays encapsulated</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
