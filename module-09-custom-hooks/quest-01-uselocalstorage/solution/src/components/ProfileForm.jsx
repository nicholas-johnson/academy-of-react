export function ProfileForm({ profile, onNameChange, onHouseChange, onLevelUp }) {
  return (
    <div className="profile-card">
      <div className="form-group">
        <label>Wizard Name</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter your name..."
        />
      </div>

      <div className="form-group">
        <label>House</label>
        <select value={profile.house} onChange={(e) => onHouseChange(e.target.value)}>
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
        <button onClick={onLevelUp} className="btn btn-primary">
          Level Up!
        </button>
      </div>
    </div>
  );
}
