import { observer } from "mobx-react-lite";
import { academyStore } from "../store";
import { HOUSES, HOUSE_COLORS } from "../data/houses";

export const StudentRoster = observer(() => {
  return (
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
  );
});
