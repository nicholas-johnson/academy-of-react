import { useState } from "react";
import "./App.css";

// Sample spell data
const SPELLS = [
  { id: 1, name: "Fireball", type: "fire", level: 3, damage: 45 },
  { id: 2, name: "Ice Shard", type: "ice", level: 2, damage: 30 },
  { id: 3, name: "Lightning Bolt", type: "lightning", level: 4, damage: 60 },
  { id: 4, name: "Flame Strike", type: "fire", level: 5, damage: 75 },
  { id: 5, name: "Frost Nova", type: "ice", level: 3, damage: 40 },
  { id: 6, name: "Thunder Clap", type: "lightning", level: 2, damage: 35 },
  { id: 7, name: "Blaze", type: "fire", level: 1, damage: 20 },
  { id: 8, name: "Frozen Orb", type: "ice", level: 5, damage: 70 },
  { id: 9, name: "Chain Lightning", type: "lightning", level: 5, damage: 80 },
  { id: 10, name: "Heal", type: "light", level: 2, damage: 0 },
];

function App() {
  // TODO: Create state for search term
  // TODO: Create state for selected type filter
  // TODO: Create state for minimum level filter

  // TODO: Create filtered spells based on search term and filters
  // Use array.filter() to filter spells by:
  //   - name includes search term (case-insensitive)
  //   - type matches selected type (or show all if "all")
  //   - level is >= minimum level

  return (
    <div className="app">
      <h1>Spell Grimoire</h1>
      <p>Search and filter the Academy's spell collection</p>

      <div className="filters">
        {/* TODO: Add search input */}

        {/* TODO: Add type filter select (all, fire, ice, lightning, light) */}

        {/* TODO: Add minimum level filter (1-5) */}
      </div>

      <div className="results-info">
        {/* TODO: Show count of filtered spells */}
      </div>

      <div className="spell-grid">
        {/* TODO: Map over filtered spells and display spell cards */}
      </div>
    </div>
  );
}

export default App;
