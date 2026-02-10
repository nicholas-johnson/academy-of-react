import { useRef, useImperativeHandle, forwardRef } from "react";
import "./App.css";

const SpellInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = "";
    },
    getValue: () => {
      return inputRef.current.value;
    }
  }));

  return (
    <input
      ref={inputRef}
      type="text"
      className="spell-input"
      placeholder="Enter spell name..."
    />
  );
});

function App() {
  const spellInputRef = useRef(null);

  const handleFocus = () => {
    spellInputRef.current.focus();
  };

  const handleClear = () => {
    spellInputRef.current.clear();
  };

  const handleGetValue = () => {
    const value = spellInputRef.current.getValue();
    alert(`Current value: "${value}"`);
  };

  return (
    <div className="app">
      <h1>Custom Spell Input</h1>
      <p className="subtitle">useImperativeHandle Demo</p>

      <div className="input-container">
        <SpellInput ref={spellInputRef} />
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={handleFocus}>
          Focus Input
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          Clear Input
        </button>
        <button className="btn btn-secondary" onClick={handleGetValue}>
          Get Value
        </button>
      </div>

      <div className="info-box">
        <h3>useImperativeHandle Key Points</h3>
        <ul>
          <li>Customizes the ref value exposed to parent</li>
          <li>Must be used with forwardRef</li>
          <li>Exposes only what you choose</li>
          <li>Keeps internal implementation hidden</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
