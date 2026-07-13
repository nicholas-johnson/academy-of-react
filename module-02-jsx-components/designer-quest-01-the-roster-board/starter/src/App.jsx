import students from "./data";
import StudentCard from "./StudentCard";
import "./App.css";

// 🎨 TASK 3 — Change these variables to update the page heading.
//    They're just text between quotes. Change the words, save, and look!
const PAGE_TITLE = "Academy Roster";
const SUBTITLE = "Current students enrolled at the Arcane Academy";

function App() {
  return (
    <div className="app">
      {/* ⚙️ ENGINE CODE — the header uses the variables above */}
      <header className="header">
        <h1 className="title">{PAGE_TITLE}</h1>
        <p className="subtitle">{SUBTITLE}</p>
      </header>

      {/* ⚙️ ENGINE CODE — this loops through students and renders a card for each one */}
      <div className="roster">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            name={student.name}
            house={student.house}
            level={student.level}
            motto={student.motto}
          />
        ))}
      </div>

      <footer className="footer">
        Showing {students.length} students
      </footer>
    </div>
  );
}

export default App;
