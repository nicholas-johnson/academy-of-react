import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [intel, setIntel] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchIntelligence = async () => {
    setLoading(true)
    setError(null)

    try {
      // Simulated intelligence data (in real app, fetch from API)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay

      const mockData = [
        { id: 1, academy: 'Shadowvale Academy', threatLevel: 'High', info: 'Advanced spell mastery detected. 15 elite wizards prepared.', timestamp: Date.now() },
        { id: 2, academy: 'Crystal Peaks Institute', threatLevel: 'Medium', info: 'Moderate preparation. Focus on defensive spells.', timestamp: Date.now() },
        { id: 3, academy: 'Ember Ridge School', threatLevel: 'High', info: 'Fire magic specialists. Strong offensive capabilities.', timestamp: Date.now() },
        { id: 4, academy: 'Misty Hollow Academy', threatLevel: 'Low', info: 'Limited combat training. Primarily academic focus.', timestamp: Date.now() },
        { id: 5, academy: 'Stormwatch College', threatLevel: 'High', info: 'Lightning magic experts. Weather manipulation confirmed.', timestamp: Date.now() },
      ]

      setIntel(mockData)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIntelligence()
  }, [])

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
          <button onClick={fetchIntelligence} className="btn-primary">
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

      <button onClick={fetchIntelligence} className="refresh-btn">
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
                Updated: {new Date(report.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
