import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [spells, setSpells] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect 1: Runs after every render (no dependency array)
  // Use sparingly - usually you want dependencies!
  useEffect(() => {
    document.title = `Count: ${count}`;
  });

  // Effect 2: Runs only on mount (empty dependency array)
  useEffect(() => {
    console.log("Component mounted!");

    // Cleanup function - runs on unmount
    return () => {
      console.log("Component will unmount!");
    };
  }, []);

  // Effect 3: Runs when count changes (count in dependency array)
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]);

  // Effect 4: Timer with cleanup
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup: clear interval when component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty array = setup once, cleanup on unmount

  // Effect 5: Data fetching
  useEffect(() => {
    fetch("/spells.json")
      .then((response) => response.json())
      .then((data) => {
        setSpells(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching spells:", error);
        setLoading(false);
      });
  }, []); // Empty array = fetch once on mount

  return (
    <div className="app">
      <h1>useEffect Demo</h1>
      <p>Understanding side effects in React</p>

      <div className="demo-section">
        <h2>Counter Example</h2>
        <p className="count-display">{count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <p className="hint">Check document title and browser console!</p>
      </div>

      <div className="demo-section">
        <h2>Timer Example</h2>
        <p className="time-display">{time}</p>
        <p className="hint">Updates every second with cleanup on unmount</p>
      </div>

      <div className="demo-section">
        <h2>Data Fetching Example</h2>
        {loading ? (
          <p>Loading spells...</p>
        ) : (
          <ul className="spell-list">
            {spells.map((spell) => (
              <li key={spell.id}>
                {spell.name} - Power: {spell.power}
              </li>
            ))}
          </ul>
        )}
        <p className="hint">Fetched from /spells.json on mount</p>
      </div>

      <div className="info-box">
        <h3>useEffect Patterns</h3>
        <ul>
          <li>
            <code>useEffect(() =&gt; {"{}"})</code> - Runs after every render
          </li>
          <li>
            <code>useEffect(() =&gt; {"{}"}, [])</code> - Runs once on mount
          </li>
          <li>
            <code>useEffect(() =&gt; {"{}"}, [dep])</code> - Runs when dep
            changes
          </li>
          <li>
            <code>return () =&gt; {"{}"}</code> - Cleanup function
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
