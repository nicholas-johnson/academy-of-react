import { useState, useEffect } from "react";
import "./App.css";

// TODO: Fetch intelligence data from /api/intelligence.json
//
// The JSON file is already in public/api/intelligence.json
// Vite serves files from public/ at the root URL
//
// Your tasks:
// 1. Use useEffect to fetch data when component mounts
// 2. Handle loading state (show spinner)
// 3. Handle error state (show error message)
// 4. Display the intelligence reports
// 5. Add a refresh button

function App() {
  const [intel, setIntel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Add useEffect to fetch data on mount
  // Hint: fetch('/api/intelligence.json')
  //       .then(res => res.json())
  //       .then(data => setIntel(data.reports))
  //
  // Or use async/await inside the effect

  // Loading state
  if (loading) {
    return (
      <div className="app">
        <h1>War Intelligence</h1>
        <div className="loading">
          <div className="spinner"></div>
          <p>Gathering intelligence...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="app">
        <h1>War Intelligence</h1>
        <div className="error">
          <p>Error: {error}</p>
          <button className="btn-primary">Retry</button>
        </div>
      </div>
    );
  }

  // Success state - render the data
  return (
    <div className="app">
      <h1>War Intelligence</h1>
      <p>Latest reports on rival academies</p>

      <button className="refresh-btn">Refresh Intelligence</button>

      <div className="intel-grid">
        {intel.map((report) => (
          <div key={report.id} className="intel-card">
            <div className="card-header">
              <h3>{report.academy}</h3>
              <span
                className={`threat-badge ${report.threatLevel.toLowerCase()}`}
              >
                {report.threatLevel}
              </span>
            </div>
            <p className="intel-info">{report.info}</p>
            <div className="card-footer">
              <span className="timestamp">
                Updated: {new Date(report.lastUpdated).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
