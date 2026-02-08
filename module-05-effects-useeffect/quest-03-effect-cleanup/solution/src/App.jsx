import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [incantation, setIncantation] = useState("");
  const [lastSaved, setLastSaved] = useState(null);
  const [saveStatus, setSaveStatus] = useState(""); // 'saving' or 'saved'

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("incantation");
    const timestamp = localStorage.getItem("lastSaved");
    if (saved) {
      setIncantation(saved);
      setLastSaved(timestamp ? new Date(timestamp) : null);
    }
  }, []);

  // Debounced save to localStorage
  useEffect(() => {
    if (incantation === "") return; // Don't save empty

    setSaveStatus("saving");

    // Debounce: wait 1 second after user stops typing
    const timeoutId = setTimeout(() => {
      localStorage.setItem("incantation", incantation);
      const now = new Date().toISOString();
      localStorage.setItem("lastSaved", now);
      setLastSaved(new Date(now));
      setSaveStatus("saved");

      // Clear saved status after 2 seconds
      setTimeout(() => setSaveStatus(""), 2000);
    }, 1000);

    // Cleanup: cancel timeout if user types again
    return () => clearTimeout(timeoutId);
  }, [incantation]);

  const clearIncantation = () => {
    setIncantation("");
    localStorage.removeItem("incantation");
    localStorage.removeItem("lastSaved");
    setLastSaved(null);
  };

  return (
    <div className="app">
      <h1>Spell Practice</h1>
      <p>Practice your incantations - auto-saves as you type</p>

      <div className="practice-area">
        <label htmlFor="incantation">Your Incantation</label>
        <textarea
          id="incantation"
          value={incantation}
          onChange={(e) => setIncantation(e.target.value)}
          placeholder="Expecto Patronum..."
          rows="8"
        />

        <div className="status-bar">
          <div className="save-status">
            {saveStatus === "saving" && (
              <span className="status saving">Saving...</span>
            )}
            {saveStatus === "saved" && (
              <span className="status saved">Saved!</span>
            )}
          </div>

          {lastSaved && (
            <div className="last-saved">
              Last saved: {lastSaved.toLocaleTimeString()}
            </div>
          )}
        </div>

        <button onClick={clearIncantation} className="clear-btn">
          Clear Incantation
        </button>
      </div>

      <div className="info-box">
        <h3>Auto-Save Feature</h3>
        <ul>
          <li>Automatically saves 1 second after you stop typing</li>
          <li>Saved to localStorage (persists on refresh)</li>
          <li>Debouncing prevents excessive saves</li>
          <li>Cleanup cancels pending saves when typing resumes</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
