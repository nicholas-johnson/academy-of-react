import { useState, useTransition } from "react";
import "./App.css";

// Generate large spell list
const generateSpells = () => {
  const elements = ["fire", "ice", "lightning", "earth", "wind"];
  const adjectives = ["Mighty", "Ancient", "Swift", "Eternal", "Mystic"];
  const spells = [];
  
  for (let i = 0; i < 5000; i++) {
    spells.push({
      id: i,
      name: `${adjectives[i % 5]} ${elements[i % 5]} Spell ${i}`,
      element: elements[i % 5],
    });
  }
  
  return spells;
};

const ALL_SPELLS = generateSpells();

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSpells, setFilteredSpells] = useState(ALL_SPELLS);
  // TODO: Add useTransition here

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // TODO: Wrap this expensive operation in startTransition
    const filtered = ALL_SPELLS.filter((spell) =>
      spell.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSpells(filtered);
  };

  return (
    <div className="app">
      <h1>Spell Search</h1>
      <p className="subtitle">Searching {ALL_SPELLS.length} spells</p>

      <input
        type="text"
        className="search-input"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search spells..."
      />

      {/* TODO: Show loading indicator when isPending */}

      <div className="results">
        Found {filteredSpells.length} spells
      </div>

      <div className="spell-list">
        {filteredSpells.slice(0, 50).map((spell) => (
          <div key={spell.id} className="spell-item">
            {spell.name}
          </div>
        ))}
      </div>

      <div className="info-box">
        <h3>Your Task</h3>
        <ul>
          <li>Add useTransition hook</li>
          <li>Wrap filter operation in startTransition</li>
          <li>Show loading state when isPending</li>
          <li>Notice input stays responsive!</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
