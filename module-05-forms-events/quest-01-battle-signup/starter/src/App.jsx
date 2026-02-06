import { useState } from 'react'
import './App.css'

function App() {
  // TODO: Create state for form data (name, spellType, role)
  // TODO: Create state for validation errors
  // TODO: Create state for submission success

  // TODO: Create validation function that checks:
  //   - name is not empty
  //   - spellType is selected
  //   - role is selected

  // TODO: Create handleSubmit function that:
  //   - Prevents default form submission
  //   - Validates the form
  //   - If valid: shows success message and clears form
  //   - If invalid: shows error messages

  // TODO: Create handleChange function for inputs

  return (
    <div className="app">
      <h1>⚔️ Battle Registration</h1>
      <p>Sign up for the Wizarding War competition</p>

      {/* TODO: Add success message when form is submitted */}

      <form className="form">
        {/* TODO: Add name input field with:
            - label
            - controlled input
            - error message display
        */}

        {/* TODO: Add spell type select with options:
            - Fire Magic
            - Ice Magic
            - Lightning Magic
            - Dark Magic
            - Light Magic
        */}

        {/* TODO: Add role radio buttons:
            - Attacker
            - Defender
            - Support
        */}

        <button type="submit" className="submit-btn">
          Register for Battle
        </button>
      </form>
    </div>
  )
}

export default App
