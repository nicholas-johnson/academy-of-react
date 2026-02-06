import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [minutes, setMinutes] = useState(5)
  const [secondsRemaining, setSecondsRemaining] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [totalSeconds, setTotalSeconds] = useState(0)

  // Start timer - convert minutes to seconds
  const startTimer = () => {
    const total = minutes * 60
    setSecondsRemaining(total)
    setTotalSeconds(total)
    setIsRunning(true)
  }

  // Stop timer
  const stopTimer = () => {
    setIsRunning(false)
  }

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false)
    setSecondsRemaining(0)
    setTotalSeconds(0)
  }

  // Countdown effect
  useEffect(() => {
    if (!isRunning || secondsRemaining <= 0) return

    const intervalId = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          setIsRunning(false)
          alert('🧘 Meditation complete! Your focus is restored.')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Cleanup function - CRITICAL to prevent memory leaks!
    return () => clearInterval(intervalId)
  }, [isRunning, secondsRemaining])

  // Format seconds as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate progress percentage
  const progress = totalSeconds > 0 ? ((totalSeconds - secondsRemaining) / totalSeconds) * 100 : 0

  return (
    <div className="app">
      <h1>🧘 Meditation Timer</h1>
      <p>Focus your magical energy</p>

      {!isRunning && secondsRemaining === 0 && (
        <div className="input-section">
          <label htmlFor="minutes">Duration (minutes)</label>
          <input
            type="number"
            id="minutes"
            min="1"
            max="60"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
        </div>
      )}

      <div className="timer-display">
        {formatTime(secondsRemaining)}
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="controls">
        {!isRunning && secondsRemaining === 0 && (
          <button onClick={startTimer} className="btn-primary">
            Start Meditation
          </button>
        )}
        {isRunning && (
          <button onClick={stopTimer} className="btn-secondary">
            Pause
          </button>
        )}
        {!isRunning && secondsRemaining > 0 && (
          <button onClick={() => setIsRunning(true)} className="btn-primary">
            Resume
          </button>
        )}
        {secondsRemaining > 0 && (
          <button onClick={resetTimer} className="btn-secondary">
            Reset
          </button>
        )}
      </div>
    </div>
  )
}

export default App
