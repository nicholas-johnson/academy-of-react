import { useState, useMemo } from "react";
import "./App.css";

const SPELLS = [
  { id: 1, name: "Fireball", power: 40, element: "fire" },
  { id: 2, name: "Ice Blast", power: 35, element: "ice" },
  { id: 3, name: "Lightning", power: 50, element: "lightning" },
  { id: 4, name: "Flame Wave", power: 45, element: "fire" },
  { id: 5, name: "Frost Nova", power: 38, element: "ice" },
  { id: 6, name: "Thunder Strike", power: 55, element: "lightning" },
  { id: 7, name: "Inferno", power: 60, element: "fire" },
  { id: 8, name: "Blizzard", power: 52, element: "ice" },
];

function App() {
  const [filter, setFilter] = useState("all");
  const [renderCount, setRenderCount] = useState(0);

  const filteredSpells = useMemo(() => {
    console.log("Filtering spells...");
    return SPELLS.filter(
      (spell) => filter === "all" || spell.element === filter
    );
  }, [filter]);

  const totalPower = useMemo(() => {
    console.log("Calculating total power...");
    return filteredSpells.reduce((sum, spell) => sum + spell.power, 0);
  }, [filteredSpells]);

  return (
    <div className="app">
      <h1>Spell Power Calculator</h1>
      <p className="subtitle">Filter: {filter} | Total Power: {totalPower}</p>

      <div className="filter-buttons">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
        <button className={filter === "fire" ? "active" : ""} onClick={() => setFilter("fire")}>Fire</button>
        <button className={filter === "ice" ? "active" : ""} onClick={() => setFilter("ice")}>Ice</button>
        <button className={filter === "lightning" ? "active" : ""} onClick={() => setFilter("lightning")}>Lightning</button>
      </div>

      <div className="spell-grid">
        {filteredSpells.map((spell) => (
          <div key={spell.id} className="spell-card">
            <h3>{spell.name}</h3>
            <p>Power: {spell.power}</p>
            <span className={`element ${spell.element}`}>{spell.element}</span>
          </div>
        ))}
      </div>

      <button className="btn btn-secondary" onClick={() => setRenderCount(renderCount + 1)}>
        Force Re-render ({renderCount})
      </button>

      <div className="info-box">
        <h3>useMemo Key Points</h3>
        <ul>
          <li>Memoizes the result of expensive calculations</li>
          <li>Only recalculates when dependencies change</li>
          <li>Check console - no logs when force re-rendering</li>
          <li>Great for filtering, sorting, complex calculations</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
