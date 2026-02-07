import { useState, useEffect } from "react";
import "./App.css";

// TODO: Create the useDebounce custom hook
// It should:
// 1. Accept a value and delay (in milliseconds)
// 2. Return the debounced value
// 3. Only update the debounced value after the delay has passed
// 4. Reset the timer if value changes before delay completes
//
// function useDebounce(value, delay) {
//   // Hint: Use useState to store the debounced value
//   // Hint: Use useEffect with setTimeout
//   // Hint: Return cleanup function to clear timeout
// }

const SPELLS = [
  {
    id: 1,
    name: "Fireball",
    type: "fire",
    power: 85,
    description: "Launch a blazing fireball at enemies",
  },
  {
    id: 2,
    name: "Ice Blast",
    type: "ice",
    power: 70,
    description: "Freeze opponents in their tracks",
  },
  {
    id: 3,
    name: "Lightning Strike",
    type: "lightning",
    power: 90,
    description: "Call down thunder from the sky",
  },
  {
    id: 4,
    name: "Healing Wave",
    type: "healing",
    power: 60,
    description: "Restore health to allies",
  },
  {
    id: 5,
    name: "Shadow Bolt",
    type: "dark",
    power: 75,
    description: "Dark magic missile attack",
  },
  {
    id: 6,
    name: "Light Beam",
    type: "light",
    power: 80,
    description: "Pure light energy blast",
  },
  {
    id: 7,
    name: "Earth Shield",
    type: "earth",
    power: 55,
    description: "Protect with stone armor",
  },
  {
    id: 8,
    name: "Wind Slash",
    type: "wind",
    power: 65,
    description: "Cutting wind blade attack",
  },
  {
    id: 9,
    name: "Fire Storm",
    type: "fire",
    power: 95,
    description: "Rain fire from above",
  },
  {
    id: 10,
    name: "Frost Nova",
    type: "ice",
    power: 88,
    description: "Freeze all nearby enemies",
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // TODO: Replace this with useDebounce hook
  // const debouncedSearch = useDebounce(searchTerm, 500)
  const debouncedSearch = searchTerm; // Currently not debounced!

  const [searchCount, setSearchCount] = useState(0);

  useEffect(() => {
    if (debouncedSearch) {
      setSearchCount((prev) => prev + 1);
      console.log("Search performed:", debouncedSearch);
    }
  }, [debouncedSearch]);

  const filteredSpells = SPELLS.filter(
    (spell) =>
      spell.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      spell.type.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      spell.description.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <div className="app">
      <h1>🔍 useDebounce Hook Demo</h1>
      <p>Optimize search with debouncing</p>

      <div className="search-section">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search spells by name, type, or description..."
          className="search-input"
        />
        <div className="search-stats">
          <span>
            Typing: <strong>{searchTerm || "(empty)"}</strong>
          </span>
          <span>
            Searching for:{" "}
            <strong className="highlight">
              {debouncedSearch || "(empty)"}
            </strong>
          </span>
          <span>
            API Calls: <strong>{searchCount}</strong>
          </span>
        </div>
      </div>

      <div className="results-section">
        <h3>Results ({filteredSpells.length} spells)</h3>
        {filteredSpells.length === 0 ? (
          <div className="empty-message">
            No spells match your search. Try "fire" or "ice"!
          </div>
        ) : (
          <div className="spell-list">
            {filteredSpells.map((spell) => (
              <div key={spell.id} className="spell-item">
                <div>
                  <h4>{spell.name}</h4>
                  <p className="spell-desc">{spell.description}</p>
                </div>
                <div className="spell-meta">
                  <span className={`type-badge ${spell.type}`}>
                    {spell.type}
                  </span>
                  <span className="power-badge">⚡ {spell.power}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="info-box">
        <h3>🔑 useDebounce Benefits</h3>
        <ul>
          <li>
            <strong>Performance</strong>: Reduces API calls dramatically
          </li>
          <li>
            <strong>UX</strong>: Waits for user to stop typing
          </li>
          <li>
            <strong>Generic</strong>: Works with any value type
          </li>
          <li>
            <strong>Cleanup</strong>: Cancels pending timeouts
          </li>
          <li>
            Try typing fast - notice delay before "Searching for" updates!
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
