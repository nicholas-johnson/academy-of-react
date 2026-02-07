import { useState } from 'react'
import './App.css'

// TODO: Create an array of 20 students with:
// - id (unique number)
// - name (wizard name)
// - house (Gryffin, Ravenclaw, Hufflepuff, Slytherin)
// - wins (number)
// - losses (number)
// - magicLevel (1-100)

function App() {
  // TODO: Create state for students array
  // TODO: Create state for sort field ('name', 'wins', 'losses', 'magicLevel')
  // TODO: Create state for sort order ('asc' or 'desc')

  // TODO: Create sorted students array based on sort settings
  // Use array.sort() with comparison function

  // TODO: Create handleSort function that:
  // - If clicking same column, toggle asc/desc
  // - If clicking different column, set new column and default to desc

  // TODO: Calculate top 3 students (highest wins)

  return (
    <div className="app">
      <h1>⚔️ Battle Rankings</h1>
      <p>Track wizard performance in the tournament</p>

      {/* TODO: Add table with:
          - Clickable column headers for sorting
          - Rows for each student
          - Highlight top 3 students
          - Show sort indicators (↑ or ↓)
      */}
    </div>
  )
}

export default App
