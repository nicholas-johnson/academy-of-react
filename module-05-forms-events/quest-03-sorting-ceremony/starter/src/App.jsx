import { useState } from 'react'
import './App.css'

function App() {
  // TODO: Create state for current step (1, 2, 3, or 'complete')

  // TODO: Create state for form data with:
  //   - name
  //   - house
  //   - familiar
  //   - wand

  // TODO: Create handleNext function that advances to next step

  // TODO: Create handleBack function that goes to previous step

  // TODO: Create handleComplete function that shows summary

  return (
    <div className="app">
      <h1>🎓 Sorting Ceremony</h1>
      <p>Complete your enrollment at the Arcane Academy</p>

      {/* TODO: Add progress indicator showing current step */}

      <div className="form-container">
        {/* TODO: Step 1 - Personal Info (name, house) */}

        {/* TODO: Step 2 - Choose Familiar */}

        {/* TODO: Step 3 - Select Wand */}

        {/* TODO: Summary/Complete Step */}
      </div>

      {/* TODO: Add navigation buttons (Back/Next) */}
    </div>
  )
}

export default App
