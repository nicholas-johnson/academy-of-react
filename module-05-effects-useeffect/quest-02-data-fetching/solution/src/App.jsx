import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [intel, setIntel] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch data when component mounts
    const fetchIntelligence = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch from local JSON file (served by Vite from public/)
        const response = await fetch('/api/intelligence.json')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setIntel(data.reports)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchIntelligence()
  }, []) // Empty array = run once on mount

  // Manual refresh function
  const handleRefresh = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/intelligence.json')
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      setIntel(data.reports)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="app">
        <h1>🔍 War Intelligence</h1>
        <div className="loading">
          <div className="spinner"></div>
          <p>Gathering intelligence...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <h1>🔍 War Intelligence</h1>
        <div className="error">
          <p>❌ Error: {error}</p>
          <button onClick={handleRefresh} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <h1>🔍 War Intelligence</h1>
      <p>Latest reports on rival academies</p>

      <button onClick={handleRefresh} className="refresh-btn">
        🔄 Refresh Intelligence
      </button>

      <div className="intel-grid">
        {intel.map(report => (
          <div key={report.id} className="intel-card">
            <div className="card-header">
              <h3>{report.academy}</h3>
              <span className={`threat-badge ${report.threatLevel.toLowerCase()}`}>
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
  )
}

export default App
