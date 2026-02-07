import { useState } from 'react'
import './App.css'

function App() {
  // Form data state - stores all input values
  const [formData, setFormData] = useState({
    name: '',
    spellType: '',
    role: ''
  })

  // Validation errors state - stores error messages per field
  const [errors, setErrors] = useState({})

  // Success state - tracks if form was successfully submitted
  const [submitted, setSubmitted] = useState(false)

  // Validation function - returns object with error messages
  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Wizard name is required'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters'
    }

    if (!formData.spellType) {
      newErrors.spellType = 'Please select your spell specialization'
    }

    if (!formData.role) {
      newErrors.role = 'Please select your battle role'
    }

    return newErrors
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent page reload

    const newErrors = validate()

    if (Object.keys(newErrors).length === 0) {
      // Form is valid - submit it
      console.log('Battle registration submitted:', formData)
      setSubmitted(true)

      // Clear the form
      setFormData({ name: '', spellType: '', role: '' })

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000)
    } else {
      // Form has errors - show them
      setErrors(newErrors)
      setSubmitted(false)
    }
  }

  // Handle input changes - works for text inputs and selects
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div className="app">
      <h1>⚔️ Battle Registration</h1>
      <p>Sign up for the Wizarding War competition</p>

      {submitted && (
        <div className="success">
          ✓ Registration successful! You're ready for battle!
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        {/* Name Input */}
        <div className="form-group">
          <label htmlFor="name">Wizard Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your wizard name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && (
            <span className="error-message">{errors.name}</span>
          )}
        </div>

        {/* Spell Type Select */}
        <div className="form-group">
          <label htmlFor="spellType">Spell Specialization *</label>
          <select
            id="spellType"
            name="spellType"
            value={formData.spellType}
            onChange={handleChange}
            className={errors.spellType ? 'error' : ''}
          >
            <option value="">-- Select Spell Type --</option>
            <option value="fire">Fire Magic</option>
            <option value="ice">Ice Magic</option>
            <option value="lightning">Lightning Magic</option>
            <option value="dark">Dark Magic</option>
            <option value="light">Light Magic</option>
          </select>
          {errors.spellType && (
            <span className="error-message">{errors.spellType}</span>
          )}
        </div>

        {/* Role Radio Buttons */}
        <div className="form-group">
          <label>Battle Role *</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="attacker"
                name="role"
                value="attacker"
                checked={formData.role === 'attacker'}
                onChange={handleChange}
              />
              <label htmlFor="attacker">Attacker</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="defender"
                name="role"
                value="defender"
                checked={formData.role === 'defender'}
                onChange={handleChange}
              />
              <label htmlFor="defender">Defender</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="support"
                name="role"
                value="support"
                checked={formData.role === 'support'}
                onChange={handleChange}
              />
              <label htmlFor="support">Support</label>
            </div>
          </div>
          {errors.role && (
            <span className="error-message">{errors.role}</span>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Register for Battle
        </button>
      </form>
    </div>
  )
}

export default App
