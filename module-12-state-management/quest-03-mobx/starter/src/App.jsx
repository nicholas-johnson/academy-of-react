import { useState } from 'react'
// TODO: Import observer from 'mobx-react-lite'
// TODO: Import academyStore from './store'
import './App.css'

const HOUSES = ['Gryffin', 'Slytherin', 'Ravenclaw', 'Hufflepuff']
const HOUSE_COLORS = {
  Gryffin: '#ae0001',
  Slytherin: '#1a472a',
  Ravenclaw: '#0e1a40',
  Hufflepuff: '#ecb939'
}

// TODO: Wrap this component with observer()
function App() {
  const [name, setName] = useState('')
  const [house, setHouse] = useState('Gryffin')
  const [power, setPower] = useState(50)

  // TODO: Use academyStore instead of placeholder data
  // Placeholder data - replace with MobX store
  const students = [
    { id: 1, name: 'Harry', house: 'Gryffin', power: 85 },
    { id: 2, name: 'Hermione', house: 'Ravenclaw', power: 95 },
    { id: 3, name: 'Draco', house: 'Slytherin', power: 70 },
  ]
  const houseFilter = 'all'
  const sortBy = 'name'
  const totalPower = students.reduce((sum, s) => sum + s.power, 0)
  const averagePower = Math.round(totalPower / students.length)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    
    // TODO: academyStore.addStudent({ name, house, power })
    console.log('TODO: Add student', { name, house, power })
    setName('')
    setPower(50)
  }

  // TODO: Replace with academyStore.sortedStudents
  const displayStudents = students

  return (
    <div className="app">
      <header className="header">
        <h1>👁️ MobX Academy Dashboard</h1>
        <p>Observable state with automatic tracking</p>
      </header>

      <main className="main">
        <section className="stats">
          <div className="stat-card">
            <span className="stat-value">{students.length}</span>
            <span className="stat-label">Students</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{totalPower}</span>
            <span className="stat-label">Total Power</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{averagePower}</span>
            <span className="stat-label">Avg Power</span>
          </div>
        </section>

        <section className="add-form">
          <h2>Enroll Student</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Student name"
                required
              />
              <select value={house} onChange={(e) => setHouse(e.target.value)}>
                {HOUSES.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label>
                Power Level: {power}
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={power}
                  onChange={(e) => setPower(Number(e.target.value))}
                />
              </label>
            </div>
            <button type="submit" className="btn primary">Enroll</button>
          </form>
        </section>

        <section className="roster">
          <div className="roster-header">
            <h2>Student Roster</h2>
            <div className="controls">
              <select 
                value={houseFilter} 
                onChange={(e) => {
                  // TODO: academyStore.setHouseFilter(e.target.value)
                  console.log('TODO: Set filter', e.target.value)
                }}
              >
                <option value="all">All Houses</option>
                {HOUSES.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              <select 
                value={sortBy} 
                onChange={(e) => {
                  // TODO: academyStore.setSortBy(e.target.value)
                  console.log('TODO: Set sort', e.target.value)
                }}
              >
                <option value="name">Sort by Name</option>
                <option value="power">Sort by Power</option>
              </select>
            </div>
          </div>

          <div className="student-list">
            {displayStudents.length === 0 ? (
              <p className="empty">No students enrolled</p>
            ) : (
              displayStudents.map(student => (
                <div 
                  key={student.id} 
                  className="student-card"
                  style={{ borderLeftColor: HOUSE_COLORS[student.house] }}
                >
                  <div className="student-info">
                    <h3>{student.name}</h3>
                    <span className="house-badge" style={{ backgroundColor: HOUSE_COLORS[student.house] }}>
                      {student.house}
                    </span>
                  </div>
                  <div className="student-power">
                    <span className="power-value">{student.power}</span>
                    <div className="power-controls">
                      <button onClick={() => {
                        // TODO: academyStore.boostPower(student.id, -5)
                        console.log('TODO: Decrease power')
                      }}>-</button>
                      <button onClick={() => {
                        // TODO: academyStore.boostPower(student.id, 5)
                        console.log('TODO: Increase power')
                      }}>+</button>
                    </div>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => {
                      // TODO: academyStore.removeStudent(student.id)
                      console.log('TODO: Remove student')
                    }}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
