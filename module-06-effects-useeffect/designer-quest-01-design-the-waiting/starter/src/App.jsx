import { useState, useEffect } from "react";
import "./App.css";

// 🎨 TASK 4: Change this number to see how it affects the loading experience.
// Try 500, 1500, 4000, or even 10000 (10 seconds) while you design.
const FETCH_DELAY_MS = 2000;

function App() {
  /* ⚙️ ENGINE CODE — you don't need to read this ———————————————————————————
     This section handles fetching data. The important thing is that it sets
     three variables you'll use below: `loading`, `error`, and `intel`.
  ——————————————————————————————————————————————————————————————————————————— */
  const [intel, setIntel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, FETCH_DELAY_MS));

      if (simulateFailure) {
        if (!cancelled) {
          setError("NETWORK ERROR: Intelligence relay compromised. Hostile interference detected on channel 7.");
          setLoading(false);
        }
        return;
      }

      try {
        const response = await fetch("/api/intelligence.json");
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const data = await response.json();
        if (!cancelled) {
          setIntel(data.reports);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unknown error occurred");
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, [fetchTrigger, simulateFailure]);

  const handleRefresh = () => setFetchTrigger((n) => n + 1);
  /* ⚙️ END ENGINE CODE ———————————————————————————————————————————————————— */

  return (
    <div className="app">
      <header className="app-header">
        <h1>⚔️ War Room Intelligence</h1>
        <div className="controls">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={simulateFailure}
              onChange={(e) => setSimulateFailure(e.target.checked)}
            />
            Simulate Failure
          </label>
          <button className="refresh-btn" onClick={handleRefresh}>
            ↻ Refresh
          </button>
        </div>
      </header>

      <main className="app-main">
        {loading && (
          <section className="loading-zone">
            {/* 🎨 TASK 1: Design the loading state
                Replace this bare text with something better!
                Ideas: spinner, skeleton cards, animated dots, progress bar...
                The class "loading-zone" is connected in App.css — add styles there. */}
            <p>Loading...</p>
          </section>
        )}

        {!loading && error && (
          <section className="error-zone">
            {/* 🎨 TASK 2: Design the error state
                Replace this ugly inline-styled error with a proper error card.
                The Refresh button above already works — you could add another one here too.
                The class "error-zone" is connected in App.css — add styles there. */}
            <p style={{ color: "red" }}>{error}</p>
          </section>
        )}

        {!loading && !error && intel.length === 0 && (
          <section className="empty-zone">
            {/* 🎨 TASK 3: Design the empty state
                This shows when the fetch succeeds but returns no data.
                Make it look intentional — not like a bug.
                The class "empty-zone" is connected in App.css — add styles there. */}
            <p>No reports.</p>
          </section>
        )}

        {!loading && !error && intel.length > 0 && (
          <section className="intel-grid">
            {intel.map((report) => (
              <article key={report.id} className="intel-card">
                <div className="card-header">
                  <span className="threat-badge" data-level={report.threatLevel}>
                    Threat: {report.threatLevel}
                  </span>
                  <span className="card-id">#{report.id}</span>
                </div>
                <h2 className="card-academy">{report.academy}</h2>
                <p className="card-info">{report.info}</p>
                <time className="card-time">{report.lastUpdated}</time>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
