import { useState } from "react";

function App({ name: _name }) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState(_name);

  const handleIncrement = () => {
    if (count > 9) return;
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count === 0) return;
    setCount(count - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  console.log({ name, count, setCount, setName });

  return (
    <div>
      <h1 style={{ opacity: count / 10 }}>Hello {name}</h1>

      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleReset}>Reset</button>

      <input type="text" onChange={handleNameChange} />

      <p>Count: {count}</p>
    </div>
  );
}

export default App;
