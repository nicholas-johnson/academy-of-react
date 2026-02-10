import { useState } from "react";
import { HelloWorld } from "./HelloWorld/HelloWorld";

import "./App.css";

function App() {
  const [tab, setTab] = useState("counter");

  const [list, setList] = useState(["John", "Jane", "Jim"]);

  const [obj, setObj] = useState({
    name: "John",
    age: 30,
    city: "New York",
  });

  return (
    <>
      <header>
        <button onClick={() => setTab("counter")}>Counter</button>
        <button onClick={() => setTab("hello")}>Hello World</button>
      </header>
      <div>
        {tab === "counter" && <Counter />}
        {tab === "hello" && <HelloWorld name="John" />}
      </div>
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      {count % 2 === 0 ? <h2>Even</h2> : <h2>Odd</h2>}
      {count === 0 && <h2>Zero</h2>}
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
}

export default App;
