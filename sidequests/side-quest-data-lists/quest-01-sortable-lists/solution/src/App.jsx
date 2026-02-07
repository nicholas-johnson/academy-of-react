import { useState } from 'react'
import './App.css'

const STUDENTS = [
  { id: 1, name: 'Luna Moonwhisper', house: 'Ravenclaw', wins: 28, losses: 5, magicLevel: 92 },
  { id: 2, name: 'Thor Ironforge', house: 'Gryffin', wins: 32, losses: 8, magicLevel: 88 },
  { id: 3, name: 'Aria Stormwind', house: 'Ravenclaw', wins: 25, losses: 7, magicLevel: 85 },
  { id: 4, name: 'Finn Shadowblade', house: 'Slytherin', wins: 30, losses: 10, magicLevel: 82 },
  { id: 5, name: 'Sage Brightwood', house: 'Hufflepuff', wins: 22, losses: 6, magicLevel: 79 },
  { id: 6, name: 'Nova Starlight', house: 'Ravenclaw', wins: 27, losses: 9, magicLevel: 90 },
  { id: 7, name: 'Blaze Fireheart', house: 'Gryffin', wins: 35, losses: 12, magicLevel: 95 },
  { id: 8, name: 'River Waterfall', house: 'Hufflepuff', wins: 18, losses: 5, magicLevel: 76 },
  { id: 9, name: 'Shadow Nightshade', house: 'Slytherin', wins: 26, losses: 11, magicLevel: 84 },
  { id: 10, name: 'Crystal Frostborn', house: 'Ravenclaw', wins: 29, losses: 8, magicLevel: 89 },
  { id: 11, name: 'Storm Thunderstrike', house: 'Gryffin', wins: 31, losses: 9, magicLevel: 91 },
  { id: 12, name: 'Willow Greenleaf', house: 'Hufflepuff', wins: 20, losses: 6, magicLevel: 77 },
  { id: 13, name: 'Raven Darkwing', house: 'Slytherin', wins: 24, losses: 10, magicLevel: 81 },
  { id: 14, name: 'Phoenix Ashborne', house: 'Gryffin', wins: 33, losses: 11, magicLevel: 93 },
  { id: 15, name: 'Jade Earthshaker', house: 'Hufflepuff', wins: 19, losses: 7, magicLevel: 75 },
  { id: 16, name: 'Onyx Blackstone', house: 'Slytherin', wins: 28, losses: 13, magicLevel: 83 },
  { id: 17, name: 'Aurora Dawnbringer', house: 'Ravenclaw', wins: 26, losses: 6, magicLevel: 87 },
  { id: 18, name: 'Ember Flamecaster', house: 'Gryffin', wins: 30, losses: 10, magicLevel: 86 },
  { id: 19, name: 'Ivy Thornheart', house: 'Hufflepuff', wins: 21, losses: 8, magicLevel: 78 },
  { id: 20, name: 'Viper Venomstrike', house: 'Slytherin', wins: 27, losses: 12, magicLevel: 80 },
]

function App() {
  const [sortBy, setSortBy] = useState('wins') // Default sort by wins
  const [sortOrder, setSortOrder] = useState('desc') // Descending by default

  // Sort students based on current settings
  const sortedStudents = [...STUDENTS].sort((a, b) => {
    let comparison = 0

    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name)
    } else {
      // Numeric comparison for wins, losses, magicLevel
      comparison = a[sortBy] - b[sortBy]
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })

  // Get top 3 by wins
  const top3Ids = [...STUDENTS]
    .sort((a, b) => b.wins - a.wins)
    .slice(0, 3)
    .map(s => s.id)

  // Handle column header click
  const handleSort = (field) => {
    if (sortBy === field) {
      // Same column - toggle order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // Different column - set new field and default to desc
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  // Get rank class for top 3
  const getRankClass = (student) => {
    const index = top3Ids.indexOf(student.id)
    if (index === 0) return 'top-1'
    if (index === 1) return 'top-2'
    if (index === 2) return 'top-3'
    return ''
  }

  return (
    <div className="app">
      <h1>⚔️ Battle Rankings</h1>
      <p>Track wizard performance in the tournament</p>

      <div className="table-container">
        <table className="rankings-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th
                onClick={() => handleSort('name')}
                className={sortBy === 'name' ? 'active' : ''}
              >
                Name
                {sortBy === 'name' && (
                  <span className="sort-icon">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th>House</th>
              <th
                onClick={() => handleSort('wins')}
                className={sortBy === 'wins' ? 'active' : ''}
              >
                Wins
                {sortBy === 'wins' && (
                  <span className="sort-icon">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                onClick={() => handleSort('losses')}
                className={sortBy === 'losses' ? 'active' : ''}
              >
                Losses
                {sortBy === 'losses' && (
                  <span className="sort-icon">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                onClick={() => handleSort('magicLevel')}
                className={sortBy === 'magicLevel' ? 'active' : ''}
              >
                Magic Level
                {sortBy === 'magicLevel' && (
                  <span className="sort-icon">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents.map((student, index) => (
              <tr
                key={student.id}
                className={top3Ids.includes(student.id) ? 'top-3' : ''}
              >
                <td className={`rank ${getRankClass(student)}`}>
                  {index + 1}
                </td>
                <td className="name">{student.name}</td>
                <td>
                  <span className={`house-badge ${student.house.toLowerCase()}`}>
                    {student.house}
                  </span>
                </td>
                <td className="stat wins">{student.wins}</td>
                <td className="stat losses">{student.losses}</td>
                <td className="stat magic-level">{student.magicLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
