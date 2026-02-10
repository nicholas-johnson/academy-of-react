import { useFetch } from "./hooks/useFetch";
import { SpellGrid } from "./components/SpellGrid";
import "./App.css";

const API_URL = "/api/spells.json";

function App() {
  const { data, loading, error, refetch } = useFetch(API_URL);

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
        </div>
      )}

      {!loading && !error && data && (
        <SpellGrid spells={data} title={`Available Spells (${data.length})`} />
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
