import { useState } from "react";
import spells from "./data";
import SpellCard from "./SpellCard";
import "./App.css";

// ─────────────────────────────────────────────
// 🎨 TASK 2 — Change this value from false to true
// ─────────────────────────────────────────────
// This is a BOOLEAN — a value that's either true or false.
// false = spell details are hidden when the page loads
// true  = spell details are visible when the page loads
const SHOW_DETAILS_BY_DEFAULT = false;

function App() {
  // ⚙️ ENGINE CODE — state for the archive toggle
  const [showArchived, setShowArchived] = useState(false);

  // ⚙️ ENGINE CODE — filter logic
  // When "Show Archived" is on, we show an empty list (simulating archived view).
  // When it's off, we show all the spells.
  const visibleSpells = showArchived ? [] : spells;

  return (
    <div className="vault">
      <header className="vault-header">
        <h1 className="vault-title">The Spell Vault</h1>
        <p className="vault-subtitle">Academy Spell Collection</p>

        {/* ⚙️ ENGINE CODE — toggle button */}
        <button
          className={`toggle-btn ${showArchived ? "active" : ""}`}
          onClick={() => setShowArchived(!showArchived)}
        >
          {showArchived ? "◀ Back to Collection" : "Show Archived ▶"}
        </button>
      </header>

      {visibleSpells.length > 0 ? (
        <div className="spell-grid">
          {/* ⚙️ THE LOOP — .map() goes through each spell and creates a <SpellCard>.
              When you add a spell to data.js, this loop picks it up automatically. */}
          {visibleSpells.map((spell) => (
            <SpellCard
              key={spell.id}
              name={spell.name}
              element={spell.element}
              power={spell.power}
              description={spell.description}
              icon={spell.icon}
              showDetails={SHOW_DETAILS_BY_DEFAULT}
            />
          ))}
        </div>
      ) : (
        // ─────────────────────────────────────────────
        // 🎨 TASK 3 — Design the empty state
        // ─────────────────────────────────────────────
        // This shows when the vault has no spells to display.
        // Click "Show Archived" to see this in action.
        // Replace the plain <p> below with something more interesting:
        //   - Add an emoji or icon above the text
        //   - Write a better message
        //   - Use the "empty-state" CSS class (see App.css)
        <div className="empty-state">
          <p>No spells in the vault</p>
        </div>
      )}
    </div>
  );
}

export default App;
