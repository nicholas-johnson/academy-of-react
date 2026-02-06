import { useState } from 'react'
import './App.css'

// Sample student data
const INITIAL_STUDENTS = [
  { id: 1, name: 'Luna Moonwhisper', house: 'Ravenclaw', score: 95 },
  { id: 2, name: 'Thor Ironforge', house: 'Gryffin', score: 88 },
  { id: 3, name: 'Aria Stormwind', house: 'Ravenclaw', score: 92 },
  { id: 4, name: 'Finn Shadowblade', house: 'Slytherin', score: 78 },
  { id: 5, name: 'Sage Brightwood', house: 'Hufflepuff', score: 85 },
]

function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS)
  const [sortBy, setSortBy] = useState('name') // 'name' or 'score'
  const [sortOrder, setSortOrder] = useState('asc') // 'asc' or 'desc'

  // Sort students based on current sort settings
  const sortedStudents = [...students].sort((a, b) => {
    let comparison = 0

    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name)
    } else if (sortBy === 'score') {
      comparison = a.score - b.score
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })

  // Toggle sort order
  const handleSort = (field) => {
    if (sortBy === field) {
      // Same field - toggle order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // Different field - set new field and reset to ascending
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  return (
    <div className="app">
      <h1>📊 Student Rankings</h1>
      <p>Demonstrating list rendering, keys, and sorting</p>

      <div className="controls">
        <button
          onClick={() => handleSort('name')}
          className={sortBy === 'name' ? 'active' : ''}
        >
          Sort by Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        <button
          onClick={() => handleSort('score')}
          className={sortBy === 'score' ? 'active' : ''}
        >
          Sort by Score {sortBy === 'score' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      <div className="table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>House</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map((student, index) => (
              <tr key={student.id}>
                <td className="rank">#{index + 1}</td>
                <td className="name">{student.name}</td>
                <td>
                  <span className={`house-badge ${student.house.toLowerCase()}`}>
                    {student.house}
                  </span>
                </td>
                <td className="score">{student.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="info-box">
        <h3>🔑 Key Concept: The "key" Prop</h3>
        <p>
          Notice each student row has <code>key={"{student.id}"}</code>.
          Keys help React identify which items have changed, been added, or removed.
        </p>
        <ul>
          <li>✅ Use unique, stable IDs (like <code>student.id</code>)</li>
          <li>❌ Don't use array index as key (causes bugs when reordering)</li>
          <li>⚡ Keys improve performance by minimizing DOM updates</li>
        </ul>
      </div>
    </div>
  )
}

export default App
