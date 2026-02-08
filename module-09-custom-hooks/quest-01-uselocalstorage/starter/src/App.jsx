import { useState } from "react";
import "./App.css";

// TODO: Create the useLocalStorage custom hook
// It should:
// 1. Accept a key (string) and initialValue
// 2. Initialize state from localStorage if available, otherwise use initialValue
// 3. Return [storedValue, setValue] like useState
// 4. When setValue is called, update both state AND localStorage
//
// function useLocalStorage(key, initialValue) {
//   // Hint: Use useState with a lazy initializer to read from localStorage
//   // Hint: The setValue function should write to localStorage
//   // Hint: Use JSON.parse/JSON.stringify for serialization
// }

function App() {
  // TODO: Replace useState with useLocalStorage
  // const [profile, setProfile] = useLocalStorage('wizardProfile', {...})
  // const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)

  const [profile, setProfile] = useState({
    name: "Anonymous Wizard",
    house: "gryffin",
    level: 1,
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleNameChange = (name) => {
    setProfile({ ...profile, name });
  };

  const handleHouseChange = (house) => {
    setProfile({ ...profile, house });
  };

  const levelUp = () => {
    setProfile((prev) => ({ ...prev, level: prev.level + 1 }));
  };

  const reset = () => {
    setProfile({ name: "Anonymous Wizard", house: "gryffin", level: 1 });
    setDarkMode(false);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="header">
        <h1>Wizard Profile</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="theme-btn">
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>

      <p>Data persists in localStorage using custom hook</p>

      <div className="profile-card">
        <div className="form-group">
          <label>Wizard Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Enter your name..."
          />
        </div>

        <div className="form-group">
          <label>House</label>
          <select
            value={profile.house}
            onChange={(e) => handleHouseChange(e.target.value)}
          >
            <option value="gryffin">Gryffin</option>
            <option value="ravenclaw">Ravenclaw</option>
            <option value="hufflepuff">Hufflepuff</option>
            <option value="slytherin">Slytherin</option>
          </select>
        </div>

        <div className="level-section">
          <div className="level-display">
            <span>Level</span>
            <span className="level-value">{profile.level}</span>
          </div>
          <button onClick={levelUp} className="btn btn-primary">
            Level Up!
          </button>
        </div>
      </div>

      <button onClick={reset} className="btn btn-secondary">
        Reset All Data
      </button>

      <div className="info-box">
        <h3>useLocalStorage Hook</h3>
        <ul>
          <li>Automatically syncs with localStorage</li>
          <li>JSON serialization/deserialization</li>
          <li>Same API as useState</li>
          <li>Try refreshing the page - data persists!</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
