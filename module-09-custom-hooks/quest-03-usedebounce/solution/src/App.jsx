import { useState, useEffect, useMemo } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { SPELLS } from "./data/spells";
import { SearchInput } from "./components/SearchInput";
import { SearchStats } from "./components/SearchStats";
import { SpellList } from "./components/SpellList";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [searchCount, setSearchCount] = useState(0);

  useEffect(() => {
    if (debouncedSearch) {
      setSearchCount((prev) => prev + 1);
      console.log("Search performed:", debouncedSearch);
    }
  }, [debouncedSearch]);

  const filteredSpells = useMemo(() => {
    console.log("Filtering spells with:", debouncedSearch);
    return SPELLS.filter(
      (spell) =>
        spell.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        spell.type.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        spell.description.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch]);

  return (
    <div className="app">
      <h1>useDebounce Hook Demo</h1>
      <p>Optimize search with debouncing</p>

      <div className="search-section">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
        <SearchStats
          searchTerm={searchTerm}
          debouncedSearch={debouncedSearch}
          searchCount={searchCount}
        />
      </div>

      <div className="results-section">
        <h3>Results ({filteredSpells.length} spells)</h3>
        <SpellList spells={filteredSpells} />
      </div>

      <div className="info-box">
        <h3>useDebounce Benefits</h3>
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
