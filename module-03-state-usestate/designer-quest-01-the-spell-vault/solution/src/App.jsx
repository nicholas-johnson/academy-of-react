import { useState } from "react";
import spells from "./data";
import SpellCard from "./SpellCard";
import "./App.css";

// ✅ TASK 2 — Changed from false to true
const SHOW_DETAILS_BY_DEFAULT = true;

function App() {
  // ⚙️ ENGINE CODE — state for the archive toggle
  const [showArchived, setShowArchived] = useState(false);

  // ⚙️ ENGINE CODE — filter logic
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
        // ✅ TASK 3 — Designed empty state
        <div className="empty-state">
          <div className="empty-icon">📜</div>
          <h2 className="empty-heading">The vault is empty</h2>
          <p className="empty-subtitle">
            All spells are currently archived. Click &ldquo;Back to
            Collection&rdquo; to return.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
