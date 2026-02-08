import { useState, useEffect } from "react";
import "./App.css";

// Custom Hook #1: useWindowSize
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

// Custom Hook #2: useToggle
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(!value);
  return [value, toggle];
}

// Custom Hook #3: useCounter
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

function App() {
  const { width, height } = useWindowSize();
  const [isVisible, toggleVisible] = useToggle(true);
  const counter = useCounter(0);

  return (
    <div className="app">
      <h1>🪝 Custom Hooks Demo</h1>
      <p>Reusable stateful logic</p>

      <div className="demo-section">
        <h3>1. useWindowSize</h3>
        <div className="stat-display">
          <div>
            Width: <strong>{width}px</strong>
          </div>
          <div>
            Height: <strong>{height}px</strong>
          </div>
        </div>
        <p className="hint">Try resizing your window!</p>
      </div>

      <div className="demo-section">
        <h3>2. useToggle</h3>
        <button onClick={toggleVisible} className="btn">
          Toggle Visibility
        </button>
        {isVisible && (
          <div className="message-box">
            👋 Hello! I can be toggled on and off.
          </div>
        )}
      </div>

      <div className="demo-section">
        <h3>3. useCounter</h3>
        <div className="counter-display">{counter.count}</div>
        <div className="button-group">
          <button onClick={counter.decrement} className="btn">
            -
          </button>
          <button onClick={counter.reset} className="btn btn-secondary">
            Reset
          </button>
          <button onClick={counter.increment} className="btn">
            +
          </button>
        </div>
      </div>

      <div className="info-box">
        <h3>Custom Hook Benefits</h3>
        <ul>
          <li>
            <strong>Reusability</strong>: Share logic across components
          </li>
          <li>
            <strong>Composition</strong>: Build hooks from other hooks
          </li>
          <li>
            <strong>Testability</strong>: Test logic independently
          </li>
          <li>
            <strong>Separation</strong>: Separate concerns cleanly
          </li>
          <li>
            <strong>Convention</strong>: Always start with "use"
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
