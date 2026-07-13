const students = [
  { id: 1, name: "Aria Moonwhisper", house: "Wisdom", level: 42 },
  { id: 2, name: "Bolt Thunderstrike", house: "Courage", level: 38 },
  { id: 3, name: "Celeste Nightbloom", house: "Mystery", level: 55 },
  { id: 4, name: "Dax Ironforge", house: "Courage", level: 29 },
  { id: 5, name: "Elara Frostweave", house: "Harmony", level: 47 },
];

function Students() {
  return (
    <div className="page">
      <h1 className="page-title">Student Roster</h1>
      <p className="page-text">Current scholars enrolled at the Academy.</p>

      <div className="card-grid">
        {students.map((student) => (
          <div key={student.id} className="card">
            <h3 className="card-name">{student.name}</h3>
            <p className="card-detail">
              <span className="label">House:</span> {student.house}
            </p>
            <p className="card-detail">
              <span className="label">Level:</span> {student.level}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Students;
