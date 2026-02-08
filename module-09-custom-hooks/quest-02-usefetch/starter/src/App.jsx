import { useState, useEffect } from "react";
import "./App.css";

// TODO: Create the useFetch custom hook
// It should:
// 1. Accept a URL string
// 2. Return { data, loading, error, refetch }
// 3. Fetch data when URL changes
// 4. Handle loading and error states
//
// function useFetch(url) {
//   // Hint: Use useState for data, loading, and error
//   // Hint: Use useEffect to fetch when url changes
//   // Hint: Use try/catch for error handling
//   // Hint: Add a refetchTrigger state to enable manual refetch
// }

// Simulated API endpoint
const API_URL = "https://api.jsonserve.com/Uw5CrZ";

function App() {
  // TODO: Replace this with useFetch hook
  // const { data, loading, error, refetch } = useFetch(API_URL)

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Move this logic into useFetch hook
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetch = () => {
    // TODO: Implement refetch in your hook
    window.location.reload();
  };

  return (
    <div className="app">
      <h1>useFetch Hook Demo</h1>
      <p>Reusable data fetching with loading and error states</p>

      <div className="controls">
        <button onClick={refetch} disabled={loading} className="btn">
          {loading ? "Loading..." : "Refetch Data"}
        </button>
      </div>

      {loading && (
        <div className="loading-section">
          <div className="spinner"></div>
          <p>Fetching spells from API...</p>
        </div>
      )}

      {error && (
        <div className="error-section">
          <h3>Error Occurred</h3>
          <p>{error.message}</p>
          <p className="hint">Using fallback mock data below</p>
        </div>
      )}

      {!loading && !error && data && (
        <div className="spells-section">
          <h3>Available Spells ({data.length})</h3>
          <div className="spell-grid">
            {data.map((spell) => (
              <div key={spell.id} className="spell-card">
                <h4>{spell.name}</h4>
                <span className={`type-badge ${spell.type}`}>{spell.type}</span>
                <div className="power-display">Power: {spell.power}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fallback for API error - show mock data */}
      {error && (
        <div className="spells-section">
          <h3>Mock Spells (Fallback)</h3>
          <div className="spell-grid">
            {[
              { id: 1, name: "Fireball", type: "fire", power: 85 },
              { id: 2, name: "Ice Blast", type: "ice", power: 70 },
              { id: 3, name: "Lightning", type: "lightning", power: 90 },
            ].map((spell) => (
              <div key={spell.id} className="spell-card">
                <h4>{spell.name}</h4>
                <span className={`type-badge ${spell.type}`}>{spell.type}</span>
                <div className="power-display">Power: {spell.power}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="info-box">
        <h3>useFetch Hook Features</h3>
        <ul>
          <li>Loading, error, and data states</li>
          <li>Automatic refetch on URL change</li>
          <li>Manual refetch function</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
