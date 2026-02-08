import { useState } from "react";
import "./App.css";

function RosterManager() {
  const [students, setStudents] = useState([
    { id: 1, name: "Dixie Spiderwhomp", house: "Wisdom", level: 42 },
    { id: 2, name: "Theron Stormforge", house: "Valor", level: 38 },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    house: "Valor",
    level: 1,
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  // Add student
  const addStudent = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Name is required!");
      return;
    }

    if (editingId) {
      // Update existing
      setStudents(
        students.map((s) => (s.id === editingId ? { ...s, ...formData } : s)),
      );
      setEditingId(null);
    } else {
      // Add new
      const newStudent = {
        id: Date.now(),
        ...formData,
        level: parseInt(formData.level),
      };
      setStudents([...students, newStudent]);
    }

    // Reset form
    setFormData({ name: "", house: "Valor", level: 1 });
  };

  // Delete student
  const deleteStudent = (id) => {
    if (confirm("Remove this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  // Start editing
  const startEdit = (student) => {
    setEditingId(student.id);
    setFormData({
      name: student.name,
      house: student.house,
      level: student.level,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", house: "Valor", level: 1 });
  };

  // Filter students
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="roster-manager">
      <div className="header">
        <h2>📋 Roster Manager</h2>
        <div className="count">{students.length} Students</div>
      </div>

      {/* Add/Edit Form */}
      <form className="student-form" onSubmit={addStudent}>
        <h3>{editingId ? "✏️ Edit Student" : "➕ Add Student"}</h3>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter name..."
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>House</label>
            <select
              value={formData.house}
              onChange={(e) =>
                setFormData({ ...formData, house: e.target.value })
              }
            >
              <option value="Valor">🦁 Valor</option>
              <option value="Wisdom">🦅 Wisdom</option>
              <option value="Nature">🐺 Nature</option>
              <option value="Mystery">🐍 Mystery</option>
            </select>
          </div>

          <div className="form-group">
            <label>Level</label>
            <input
              type="number"
              min="1"
              max="50"
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingId ? "💾 Update" : "➕ Add"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelEdit}
            >
              ✖️ Cancel
            </button>
          )}
        </div>
      </form>

      {/* Search */}
      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="clear-search" onClick={() => setSearch("")}>
            ✖️
          </button>
        )}
      </div>

      {/* Student List */}
      <div className="student-list">
        {filteredStudents.length === 0 ? (
          <div className="empty-state">
            {search ? "No students found" : "No students yet. Add one above!"}
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div key={student.id} className="student-item">
              <div className="student-info">
                <div className="student-name">{student.name}</div>
                <div className="student-details">
                  <span className="house">{student.house}</span>
                  <span className="level">Lv {student.level}</span>
                </div>
              </div>

              <div className="student-actions">
                <button
                  className="btn-icon btn-edit"
                  onClick={() => startEdit(student)}
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  className="btn-icon btn-delete"
                  onClick={() => deleteStudent(student.id)}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <div className="quest-header">
        <h1>⚡ Quest 3: Roster Manager</h1>
        <p className="quest-subtitle">
          Array state management (CRUD operations)
        </p>
      </div>

      <RosterManager />
    </div>
  );
}

export default App;
