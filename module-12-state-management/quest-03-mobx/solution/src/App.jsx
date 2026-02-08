import { useState } from "react";
import { observer } from "mobx-react-lite";
import { academyStore } from "./store";
import "./App.css";

const HOUSES = ["Liondudes", "Snakeyguys", "Scarybird", "Huftybadger"];
const HOUSE_COLORS = {
  Liondudes: "#ae0001",
  Snakeyguys: "#1a472a",
  Scarybird: "#0e1a40",
  Huftybadger: "#ecb939",
};

const App = observer(() => {
  const [name, setName] = useState("");
  const [house, setHouse] = useState("Liondudes");
  const [power, setPower] = useState(50);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    academyStore.addStudent({ name, house, power });
    setName("");
    setPower(50);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>👁️ MobX Academy Dashboard</h1>
        <p>Observable state with automatic tracking</p>
      </header>

      <main className="main">
        <section className="stats">
          <div className="stat-card">
            <span className="stat-value">{academyStore.studentCount}</span>
            <span className="stat-label">Students</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{academyStore.totalPower}</span>
            <span className="stat-label">Total Power</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{academyStore.averagePower}</span>
            <span className="stat-label">Avg Power</span>
          </div>
        </section>

        <section className="house-stats">
          {HOUSES.map((h) => {
            const stats = academyStore.houseStats[h] || { count: 0, power: 0 };
            return (
              <div
                key={h}
                className="house-stat"
                style={{ borderColor: HOUSE_COLORS[h] }}
              >
                <span className="house-name" style={{ color: HOUSE_COLORS[h] }}>
                  {h}
                </span>
                <span className="house-count">{stats.count} students</span>
                <span className="house-power">{stats.power} power</span>
              </div>
            );
          })}
        </section>

        <section className="add-form">
          <h2>Enroll Student</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Student name"
                required
              />
              <select value={house} onChange={(e) => setHouse(e.target.value)}>
                {HOUSES.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label>
                Power Level: {power}
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={power}
                  onChange={(e) => setPower(Number(e.target.value))}
                />
              </label>
            </div>
            <button type="submit" className="btn primary">
              Enroll
            </button>
          </form>
        </section>

        <section className="roster">
          <div className="roster-header">
            <h2>Student Roster</h2>
            <div className="controls">
              <select
                value={academyStore.houseFilter}
                onChange={(e) => academyStore.setHouseFilter(e.target.value)}
              >
                <option value="all">All Houses</option>
                {HOUSES.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <select
                value={academyStore.sortBy}
                onChange={(e) => academyStore.setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="power">Sort by Power</option>
              </select>
            </div>
          </div>

          <div className="student-list">
            {academyStore.sortedStudents.length === 0 ? (
              <p className="empty">No students enrolled</p>
            ) : (
              academyStore.sortedStudents.map((student) => (
                <div
                  key={student.id}
                  className="student-card"
                  style={{ borderLeftColor: HOUSE_COLORS[student.house] }}
                >
                  <div className="student-info">
                    <h3>{student.name}</h3>
                    <span
                      className="house-badge"
                      style={{ backgroundColor: HOUSE_COLORS[student.house] }}
                    >
                      {student.house}
                    </span>
                  </div>
                  <div className="student-power">
                    <span className="power-value">{student.power}</span>
                    <div className="power-controls">
                      <button
                        onClick={() => academyStore.boostPower(student.id, -5)}
                      >
                        -
                      </button>
                      <button
                        onClick={() => academyStore.boostPower(student.id, 5)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => academyStore.removeStudent(student.id)}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
});

export default App;
