import { useCounter } from "../hooks";

export function CounterDemo() {
  const counter = useCounter(0);

  return (
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
  );
}
