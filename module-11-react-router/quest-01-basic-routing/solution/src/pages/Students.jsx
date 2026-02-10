import { students } from "../data/students";

export function Students() {
  return (
    <div className="page">
      <h2> Students</h2>
      <div className="student-list">
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <h3>{student.name}</h3>
            <p>House: {student.house}</p>
            <p>Level: {student.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
