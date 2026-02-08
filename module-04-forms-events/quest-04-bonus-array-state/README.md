# Bonus Quest: Roster Manager (Array State)

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

The Academy needs a complete student management system! You must build an interface where administrators can add new students, remove existing ones, and see live statistics. This combines everything you've learned: state, forms, lists, calculations, and events.

## Objective

Create a dynamic student roster with add/remove functionality, displaying student count and average magic level in real-time.

## Technical Concepts

- Array state management
- Adding items to state arrays
- Removing items from state arrays
- Form handling with multiple inputs
- Controlled form inputs
- Derived calculations from state
- Key prop for dynamic lists

## Requirements

Create a Vite React project with:

1. Proper Vite project structure (`src/`, `package.json`, `vite.config.js`)
2. Components that:

3. A form to add new students with fields:
   - Name (text input)
   - House (select dropdown)
   - Magic Level (number input)
4. A list displaying all students
5. Delete button for each student
6. Display total student count
7. Calculate and display average magic level
8. Form clears after submission
9. Start with 2-3 students already in the roster

## Example Starting Data

```javascript
const [students, setStudents] = useState([
  { id: 1, name: "Aria", house: "Scarybird", magicLevel: 45 },
  { id: 2, name: "Thor", house: "Liondudes", magicLevel: 62 },
  { id: 3, name: "Luna", house: "Huftybadger", magicLevel: 38 },
]);
```

## Acceptance Criteria

- [ ] Form with 3 inputs (name, house, magicLevel)
- [ ] All inputs are controlled (tied to state)
- [ ] Add button/submit adds new student to list
- [ ] Each student has a unique ID
- [ ] All students displayed in a list
- [ ] Delete button for each student works
- [ ] Total count displayed
- [ ] Average magic level calculated and displayed
- [ ] Form clears after adding student
- [ ] No console errors or warnings

## Hints

<details>
<summary>Click to reveal hints</summary>

**Hint 1**: Set up state for students and form:

```jsx
const [students, setStudents] = useState([
  { id: 1, name: "Aria", house: "Scarybird", magicLevel: 45 },
  { id: 2, name: "Thor", house: "Liondudes", magicLevel: 62 },
]);

const [name, setName] = useState("");
const [house, setHouse] = useState("Liondudes");
const [magicLevel, setMagicLevel] = useState(50);
```

**Hint 2**: Handle form submission:

```jsx
const handleSubmit = (e) => {
  e.preventDefault(); // Prevent page refresh!

  const newStudent = {
    id: Date.now(), // Simple unique ID
    name: name,
    house: house,
    magicLevel: parseInt(magicLevel),
  };

  setStudents([...students, newStudent]); // Add to array

  // Clear form
  setName("");
  setHouse("Liondudes");
  setMagicLevel(50);
};
```

**Hint 3**: Controlled form inputs:

```jsx
<form onSubmit={handleSubmit}>
  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Student name"
    required
  />

  <select value={house} onChange={(e) => setHouse(e.target.value)}>
    <option value="Liondudes">Liondudes</option>
    <option value="Scarybird">Scarybird</option>
    <option value="Huftybadger">Huftybadger</option>
    <option value="Snakeyguys">Snakeyguys</option>
  </select>

  <input
    type="number"
    value={magicLevel}
    onChange={(e) => setMagicLevel(e.target.value)}
    min="1"
    max="100"
  />

  <button type="submit">Add Student</button>
</form>
```

**Hint 4**: Delete student:

```jsx
const handleDelete = (id) => {
  setStudents(students.filter((student) => student.id !== id));
};
```

**Hint 5**: Display students and stats:

```jsx
const totalStudents = students.length;
const averageLevel =
  students.length > 0
    ? (
        students.reduce((sum, s) => sum + s.magicLevel, 0) / students.length
      ).toFixed(1)
    : 0;

return (
  <div>
    <h2>
      Students: {totalStudents} | Average Level: {averageLevel}
    </h2>

    <div className="student-list">
      {students.map((student) => (
        <div key={student.id} className="student-item">
          <span>
            {student.name} - {student.house} (Level {student.magicLevel})
          </span>
          <button onClick={() => handleDelete(student.id)}>Delete</button>
        </div>
      ))}
    </div>
  </div>
);
```

</details>

## Bonus Challenge

Take your roster manager to the next level:

1. **Edit Functionality**: Add an "Edit" button that allows modifying student details

2. **Search/Filter**: Add a search box to filter students by name

3. **House Filter**: Add buttons to show only students from a specific house

4. **Sort Options**: Add buttons to sort by:
   - Name (A-Z or Z-A)
   - Magic Level (high to low or low to high)
   - House

5. **Validation**: Prevent adding students with:
   - Empty names
   - Duplicate names
   - Invalid magic levels

6. **House Statistics**: Show per-house breakdown:
   - Liondudes: 5 students, avg 65
   - Scarybird: 3 students, avg 52
   - etc.

7. **Local Storage**: Save students to localStorage so they persist on page refresh:

   ```jsx
   // Load on mount
   useEffect(() => {
     const saved = localStorage.getItem("students");
     if (saved) {
       setStudents(JSON.parse(saved));
     }
   }, []);

   // Save when students change
   useEffect(() => {
     localStorage.setItem("students", JSON.stringify(students));
   }, [students]);
   ```

   Note: useEffect is covered in Module 5!

8. **Bulk Actions**: Add "Select All" checkbox and "Delete Selected" button

---

**Congratulations!** You've completed the Module 4 bonus quest!

You've mastered:

- ✅ Forms and controlled inputs
- ✅ Form submission and validation
- ✅ Array state (add, remove, update)
- ✅ Derived calculations from state
- ✅ Dynamic list rendering with keys

**Next Module**: [Module 5: Side Effects with useEffect](../../module-05-effects-useeffect/) — Learn to fetch data from APIs and handle side effects!
