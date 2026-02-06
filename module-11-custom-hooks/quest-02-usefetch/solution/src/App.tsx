import { useState, useEffect } from 'react'
import './App.css'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

// Custom Hook: useFetch
function useFetch<T>(url: string): FetchState<T> & { refetch: () => void } {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const json = await response.json()
        setData(json)
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, refetchTrigger])

  const refetch = () => setRefetchTrigger(prev => prev + 1)

  return { data, loading, error, refetch }
}

interface Spell {
  id: number
  name: string
  type: string
  power: number
}

// Simulated API endpoint
const API_URL = 'https://api.jsonserve.com/Uw5CrZ'

function App() {
  const { data, loading, error, refetch } = useFetch<Spell[]>(API_URL)

  return (
    <div className="app">
      <h1>📡 useFetch Hook Demo</h1>
      <p>Reusable data fetching with loading and error states</p>

      <div className="controls">
        <button onClick={refetch} disabled={loading} className="btn">
          {loading ? '⏳ Loading...' : '🔄 Refetch Data'}
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
          <h3>❌ Error Occurred</h3>
          <p>{error.message}</p>
          <p className="hint">Using fallback mock data below</p>
        </div>
      )}

      {!loading && !error && data && (
        <div className="spells-section">
          <h3>✨ Available Spells ({data.length})</h3>
          <div className="spell-grid">
            {data.map((spell) => (
              <div key={spell.id} className="spell-card">
                <h4>{spell.name}</h4>
                <span className={`type-badge ${spell.type}`}>{spell.type}</span>
                <div className="power-display">
                  ⚡ {spell.power}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fallback for API error - show mock data */}
      {error && (
        <div className="spells-section">
          <h3>✨ Mock Spells (Fallback)</h3>
          <div className="spell-grid">
            {[
              { id: 1, name: 'Fireball', type: 'fire', power: 85 },
              { id: 2, name: 'Ice Blast', type: 'ice', power: 70 },
              { id: 3, name: 'Lightning', type: 'lightning', power: 90 },
            ].map((spell) => (
              <div key={spell.id} className="spell-card">
                <h4>{spell.name}</h4>
                <span className={`type-badge ${spell.type}`}>{spell.type}</span>
                <div className="power-display">⚡ {spell.power}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="info-box">
        <h3>🔑 useFetch Hook Features</h3>
        <ul>
          <li>Generic type for response data</li>
          <li>Loading, error, and data states</li>
          <li>Automatic refetch on URL change</li>
          <li>Manual refetch function</li>
          <li>TypeScript type safety</li>
        </ul>
      </div>
    </div>
  )
}

export default App
