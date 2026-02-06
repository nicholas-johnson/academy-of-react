import { useState, useRef } from 'react'
import './App.css'

interface BattleEvent {
  time: number
  description: string
  icon: string
}

const BATTLE_EVENTS: BattleEvent[] = [
  { time: 5, description: 'Battle begins!', icon: '⚔️' },
  { time: 12, description: 'Fireball cast', icon: '🔥' },
  { time: 23, description: 'Shield activated', icon: '🛡️' },
  { time: 35, description: 'Lightning strike', icon: '⚡' },
  { time: 48, description: 'Healing potion used', icon: '💚' },
  { time: 58, description: 'Victory!', icon: '🏆' },
]

const MAX_TIME = 60

function App() {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const play = () => {
    if (isPlaying) return
    
    setIsPlaying(true)
    intervalRef.current = window.setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= MAX_TIME) {
          pause()
          return MAX_TIME
        }
        return prev + 1
      })
    }, 1000)
  }

  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsPlaying(false)
  }

  const restart = () => {
    pause()
    setCurrentTime(0)
  }

  const progress = (currentTime / MAX_TIME) * 100
  const activeEvents = BATTLE_EVENTS.filter(event => event.time <= currentTime)

  return (
    <div className="app">
      <h1>🎬 Battle Replay</h1>
      <p>Relive the epic battle with timeline controls</p>

      <div className="timeline-display">
        <div className="time-counter">
          {currentTime}s / {MAX_TIME}s
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="controls">
        <button 
          onClick={play} 
          disabled={isPlaying || currentTime >= MAX_TIME}
          className="btn btn-play"
        >
          ▶️ Play
        </button>
        <button 
          onClick={pause} 
          disabled={!isPlaying}
          className="btn btn-pause"
        >
          ⏸️ Pause
        </button>
        <button 
          onClick={restart}
          className="btn btn-restart"
        >
          🔄 Restart
        </button>
      </div>

      <div className="events-section">
        <h3>Battle Events</h3>
        {activeEvents.length === 0 ? (
          <p className="empty-message">Press Play to start the replay</p>
        ) : (
          <ul className="events-list">
            {activeEvents.map((event, index) => (
              <li key={index} className="event-item">
                <span className="event-icon">{event.icon}</span>
                <span className="event-time">{event.time}s</span>
                <span className="event-description">{event.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="info-box">
        <h3>🔑 Ref vs State</h3>
        <ul>
          <li><strong>intervalRef</strong> (ref): Stores interval ID, doesn't cause re-renders</li>
          <li><strong>currentTime</strong> (state): Causes re-renders to update UI</li>
          <li><strong>isPlaying</strong> (state): Controls button disabled states</li>
        </ul>
      </div>
    </div>
  )
}

export default App
