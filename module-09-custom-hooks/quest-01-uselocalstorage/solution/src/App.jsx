import { useState } from "react";
import "./App.css";

// Custom Hook: useLocalStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

function App() {
  const [profile, setProfile] = useLocalStorage("wizardProfile", {
    name: "Anonymous Wizard",
    house: "Liondudes",
    level: 1,
  });

  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

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
    setProfile({ name: "Anonymous Wizard", house: "Liondudes", level: 1 });
    setDarkMode(false);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="header">
        <h1>Wizard Profile</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="theme-btn">
          {darkMode ? "Light Mode" : "Dark Mode"}
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
            <option value="Liondudes">Liondudes</option>
            <option value="Scarybird">Scarybird</option>
            <option value="Huftybadger">Huftybadger</option>
            <option value="Snakeyguys">Snakeyguys</option>
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
