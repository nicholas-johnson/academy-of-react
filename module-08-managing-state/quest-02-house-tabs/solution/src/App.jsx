import { useState } from 'react'
import './App.css'

const HOUSES = {
  gryffin: {
    name: 'Gryffin',
    students: ['Harry Potter', 'Ron Weasley', 'Hermione Granger', 'Neville Longbottom'],
    points: 472,
    achievements: ['Won Quidditch Cup', 'Defeated Dark Arts Challenge', 'Top Potions Score']
  },
  ravenclaw: {
    name: 'Ravenclaw',
    students: ['Luna Lovegood', 'Cho Chang', 'Padma Patil', 'Terry Boot'],
    points: 485,
    achievements: ['Won Trivia Competition', 'Library Research Award', 'Astronomy Excellence']
  },
  hufflepuff: {
    name: 'Hufflepuff',
    students: ['Cedric Diggory', 'Hannah Abbott', 'Susan Bones', 'Justin Finch'],
    points: 451,
    achievements: ['Community Service Award', 'Best Teamwork', 'Herbology Masters']
  },
  slytherin: {
    name: 'Slytherin',
    students: ['Draco Malfoy', 'Pansy Parkinson', 'Blaise Zabini', 'Theodore Nott'],
    points: 467,
    achievements: ['Dungeon Defense Competition', 'Strategic Planning Award', 'Dueling Champions']
  }
}

function App() {
  const [activeHouse, setActiveHouse] = useState('gryffin')

  const house = HOUSES[activeHouse]

  return (
    <div className="app">
      <h1>🏰 House Management</h1>
      <p>View and manage the four houses</p>

      <div className="tabs">
        {Object.keys(HOUSES).map(houseKey => (
          <button
            key={houseKey}
            onClick={() => setActiveHouse(houseKey)}
            className={activeHouse === houseKey ? 'tab active' : 'tab'}
          >
            {HOUSES[houseKey].name}
          </button>
        ))}
      </div>

      <div className="tab-content">
        <div className="house-header">
          <h2>{house.name}</h2>
          <div className="points-badge">{house.points} points</div>
        </div>

        <div className="section">
          <h3>Students</h3>
          <div className="student-list">
            {house.students.map((student, index) => (
              <div key={index} className="student-card">
                <span className="student-icon">🧙</span>
                {student}
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>Recent Achievements</h3>
          <ul className="achievement-list">
            {house.achievements.map((achievement, index) => (
              <li key={index}>🏆 {achievement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
