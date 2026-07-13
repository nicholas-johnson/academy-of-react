import { useState } from "react";
import "./App.css";

export default function App() {
  // ⚙️ STATE — these variables hold the form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [house, setHouse] = useState("Phoenix");
  const [level, setLevel] = useState(1);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // ⚙️ HANDLE CHANGE — updates state when the user types
  const handleChange = (e) => {
    const { name: field, value } = e.target;
    const setters = { name: setName, email: setEmail, house: setHouse, level: setLevel };
    if (setters[field]) {
      setters[field](field === "level" ? Number(value) : value);
    }
  };

  // ⚙️ HANDLE SUBMIT — runs when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    // ⚙️ VALIDATION — checks if the form data is correct
    const newErrors = {};

    // 🎨 TASK 3 — Changed minimum name length to 2
    if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // ⚙️ Engine code — email must contain @
    if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    // ⚙️ Engine code — level must be between 1 and 100
    if (level < 1 || level > 100) {
      newErrors.level = "Level must be between 1 and 100";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
      return;
    }

    // ⚙️ SUCCESS — form passed validation!
    // 🎨 TASK 2 — Custom success message
    setSuccessMessage(`Congratulations, ${name}! House ${house} welcomes you to the Academy. Your magical journey begins at Level ${level}! 🎉`);
    setSubmitted(true);
    setErrors({});
  };

  // ⚙️ CLEAR — resets everything
  const handleClear = () => {
    setName("");
    setEmail("");
    setHouse("Phoenix");
    setLevel(1);
    setErrors({});
    setSuccessMessage("");
    setSubmitted(false);
  };

  return (
    <div className="app">
      <h1 className="title">Academy Enrolment</h1>

      {/* ⚙️ SUCCESS MESSAGE — shows after successful submission */}
      {submitted && (
        <div className="success-banner">🎉 {successMessage}</div>
      )}

      <form className="form" onSubmit={handleSubmit}>
        {/* ⚙️ NAME FIELD */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {/* ⚙️ EMAIL FIELD */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="wizard@academy.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* ⚙️ HOUSE SELECT */}
        <div className="form-group">
          <label htmlFor="house">House</label>
          <select id="house" name="house" value={house} onChange={handleChange}>
            <option value="Phoenix">Phoenix</option>
            <option value="Dragon">Dragon</option>
            <option value="Griffin">Griffin</option>
            <option value="Serpent">Serpent</option>
            {/* 🎨 TASK 1 — Added Unicorn house */}
            <option value="Unicorn">Unicorn</option>
          </select>
        </div>

        {/* ⚙️ LEVEL FIELD */}
        <div className="form-group">
          <label htmlFor="level">Starting Level</label>
          <input
            type="number"
            id="level"
            name="level"
            value={level}
            onChange={handleChange}
            min="1"
            max="100"
          />
          {errors.level && <span className="error-message">{errors.level}</span>}
        </div>

        {/* ⚙️ BUTTONS */}
        <div className="button-group">
          <button type="submit" className="btn-submit">Enrol</button>
          <button type="button" className="btn-clear" onClick={handleClear}>Clear</button>
        </div>
      </form>
    </div>
  );
}
