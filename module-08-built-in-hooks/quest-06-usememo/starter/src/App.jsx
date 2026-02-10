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

  // TODO: Use useMemo for filteredSpells
  const filteredSpells = SPELLS.filter(
    (spell) => filter === "all" || spell.element === filter
  );
  console.log("Filtering spells...");

  // TODO: Use useMemo for totalPower
  const totalPower = filteredSpells.reduce((sum, spell) => sum + spell.power, 0);
  console.log("Calculating total power...");

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
        <h3>Your Task</h3>
        <ul>
          <li>Wrap filteredSpells in useMemo</li>
          <li>Wrap totalPower in useMemo</li>
          <li>Check console - calculations should only run when filter changes</li>
          <li>Force re-render shouldn't trigger calculations</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
