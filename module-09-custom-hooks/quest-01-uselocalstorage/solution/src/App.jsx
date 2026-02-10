import { useLocalStorage } from "./hooks/useLocalStorage";
import { ProfileForm } from "./components/ProfileForm";
import "./App.css";

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

      <ProfileForm
        profile={profile}
        onNameChange={handleNameChange}
        onHouseChange={handleHouseChange}
        onLevelUp={levelUp}
      />

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
