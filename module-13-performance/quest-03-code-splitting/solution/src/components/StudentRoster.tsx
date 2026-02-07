export default function StudentRoster() {
  const students = [
    { id: 1, name: 'Harry Potter', house: 'Gryffin', level: 7 },
    { id: 2, name: 'Hermione Granger', house: 'Gryffin', level: 8 },
    { id: 3, name: 'Luna Lovegood', house: 'Ravenclaw', level: 6 },
    { id: 4, name: 'Cedric Diggory', house: 'Hufflepuff', level: 7 },
    { id: 5, name: 'Draco Malfoy', house: 'Slytherin', level: 6 },
  ]

  return (
    <div className="section">
      <h2>👥 Student Roster</h2>
      <p className="section-desc">This component was lazy loaded!</p>
      <div className="roster-list">
        {students.map(student => (
          <div key={student.id} className="roster-card">
            <div className="student-info">
              <h4>{student.name}</h4>
              <p>House: {student.house}</p>
            </div>
            <div className="student-level">
              Level {student.level}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
