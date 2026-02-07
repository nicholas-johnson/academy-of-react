import { useState } from "react";
import "./App.css";

function App() {
  // TODO: Add state for students array
  // const [students, setStudents] = useState([]);

  // TODO: Add state for form inputs
  // const [name, setName] = useState('');
  // const [house, setHouse] = useState('');
  // etc...

  // TODO: Create function to add a new student
  // function handleAddStudent(e) {
  //   e.preventDefault();
  //   // Create new student object
  //   // Add to students array
  //   // Clear form
  // }

  // TODO: Create function to remove a student
  // function handleRemoveStudent(id) { }

  // TODO: Create function to edit a student (bonus)

  return (
    <div>
      <h1>Quest 3: Roster Manager</h1>
      <p>Create a full CRUD application for managing students!</p>

      <div className="roster-container">
        <div className="form-panel">
          <h2>Add New Student</h2>
          <form onSubmit={() => {}}>
            {/* TODO: Add input fields for name, house, level, etc. */}
            {/* TODO: Add submit button */}
          </form>
        </div>

        <div className="students-panel">
          <h2>Current Students</h2>
          {/* TODO: Display list of students */}
          {/* Each student should have a "Remove" button */}
        </div>
      </div>
    </div>
  );
}

export default App;
