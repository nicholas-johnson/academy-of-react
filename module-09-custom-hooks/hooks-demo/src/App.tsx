import "./App.css";
import { useCounter } from "./useCounter";

function App() {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div>
      <h1>Custom Hooks Demo</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
