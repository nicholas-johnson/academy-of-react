import { useState, useTransition, useRef, useEffect } from "react";
import { spells, elements } from "./data.js";
import "./App.css";

// ⚙️ ENGINE — All the logic is wired. You don't need to change how it works,
// just how it LOOKS (Tasks 1–2) and two small values (Tasks 3–4).

const SEARCH_DELAY_MS = 200; // 🎨 TASK 3 — Changed to 200 for visible pending state

function slowSearch(query, element) {
  const start = performance.now();
  while (performance.now() - start < SEARCH_DELAY_MS) {
    // Blocking loop to simulate heavy computation
  }

  return spells.filter((spell) => {
    const matchesQuery =
      !query || spell.name.toLowerCase().includes(query.toLowerCase());
    const matchesElement = element === "all" || spell.element === element;
    return matchesQuery && matchesElement;
  });
}

export default function App() {
  const [query, setQuery] = useState("");
  const [elementFilter, setElementFilter] = useState("all");
  const [filteredSpells, setFilteredSpells] = useState(spells);
  const [isPending, startTransition] = useTransition();
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  function handleSearch(newQuery, newElement) {
    const q = newQuery !== undefined ? newQuery : query;
    const el = newElement !== undefined ? newElement : elementFilter;

    if (newQuery !== undefined) setQuery(q);
    if (newElement !== undefined) setElementFilter(el);

    startTransition(() => {
      const results = slowSearch(q, el);
      setFilteredSpells(results);
    });
  }

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────

  return (
    <div className="app">
      <header className="app-header">
        <h1>⚡ Spell Library</h1>
        <p className="subtitle">Search the arcane archives</p>
      </header>

      <div className="search-bar">
        {/* 🎨 TASK 4 — ref moved to the <select> below */}
        <input
          type="text"
          className="search-input"
          placeholder="Search spells..."
          value={query}
          onChange={(e) => handleSearch(e.target.value, undefined)}
        />

        <select
          ref={searchInputRef}
          className="element-select"
          value={elementFilter}
          onChange={(e) => handleSearch(undefined, e.target.value)}
        >
          {elements.map((el) => (
            <option key={el} value={el}>
              {el === "all" ? "All Elements" : el.charAt(0).toUpperCase() + el.slice(1)}
            </option>
          ))}
        </select>

        {/* 🎨 TASK 1 — Designed spinner instead of bare text */}
        {isPending && (
          <div className="spinner-wrapper">
            <div className="spinner" />
          </div>
        )}
      </div>

      <div className={`results-area ${isPending ? "search-pending" : ""}`}>
        {filteredSpells.length === 0 && query && !isPending ? (
          // 🎨 TASK 2 — Designed empty state
          <div className="no-results">
            <span className="no-results-icon">🔮</span>
            <h2 className="no-results-heading">No spells match your search</h2>
            <p className="no-results-hint">Try a different keyword</p>
          </div>
        ) : (
          <div className="spell-grid">
            {filteredSpells.map((spell) => (
              <div key={spell.id} className={`spell-card element-${spell.element}`}>
                <div className="spell-card-header">
                  <h3 className="spell-name">{spell.name}</h3>
                  <span className="spell-element">{spell.element}</span>
                </div>
                <p className="spell-description">{spell.description}</p>
                <div className="spell-power">
                  <div
                    className="spell-power-bar"
                    style={{ width: `${spell.power}%` }}
                  />
                  <span className="spell-power-label">{spell.power}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
