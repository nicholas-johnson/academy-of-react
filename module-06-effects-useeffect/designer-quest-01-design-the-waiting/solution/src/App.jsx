import { useState, useEffect } from "react";
import "./App.css";

// 🎨 TASK 4: Changed from 2000 to 1500 for a snappier feel
const FETCH_DELAY_MS = 1500;

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
            {/* 🎨 TASK 1: Polished loading state */}
            <div className="loading-spinner" aria-label="Loading"></div>
            <p className="loading-message">Gathering intelligence...</p>
            <div className="skeleton-grid">
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
            </div>
          </section>
        )}

        {!loading && error && (
          <section className="error-zone">
            {/* 🎨 TASK 2: Polished error state */}
            <div className="error-card">
              <span className="error-icon">⚠️</span>
              <h2 className="error-title">Transmission Failed</h2>
              <p className="error-message">{error}</p>
              <button className="retry-btn" onClick={handleRefresh}>
                ↻ Retry Connection
              </button>
            </div>
          </section>
        )}

        {!loading && !error && intel.length === 0 && (
          <section className="empty-zone">
            {/* 🎨 TASK 3: Polished empty state */}
            <div className="empty-card">
              <span className="empty-icon">📡</span>
              <h2 className="empty-title">No Intelligence Reports Available</h2>
              <p className="empty-message">
                All channels are quiet. Either no academies are active or your
                clearance level doesn't include current operations.
              </p>
              <button className="retry-btn" onClick={handleRefresh}>
                ↻ Scan Again
              </button>
            </div>
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
