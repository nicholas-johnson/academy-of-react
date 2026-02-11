import { useCounter } from "../context/CounterContext";

export function CounterDisplay() {
  const { count } = useCounter();
  return <div className="counter-display">{count}</div>;
}
