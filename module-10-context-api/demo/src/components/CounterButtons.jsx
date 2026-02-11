import { useCounter } from "../context/CounterContext";

export function CounterButtons() {
  const { increment, decrement } = useCounter();
  return (
    <div className="button-group">
      <button onClick={decrement} className="btn">
        -
      </button>
      <button onClick={increment} className="btn">
        +
      </button>
    </div>
  );
}
