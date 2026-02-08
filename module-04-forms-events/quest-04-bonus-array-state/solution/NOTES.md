# Quest 3: Roster Manager - Solution Notes

## Key Concept: Array State Management

### 1. Array State

```jsx
const [students, setStudents] = useState([]);
```

Store arrays in state just like any other value!

### 2. CRUD Operations

**Create (Add)**:

```jsx
setStudents([...students, newStudent]);
```

**Read (Display)**:

```jsx
students.map((student) => <StudentCard key={student.id} {...student} />);
```

**Update**:

```jsx
setStudents(
  students.map((s) => (s.id === editingId ? { ...s, ...formData } : s)),
);
```

**Delete**:

```jsx
setStudents(students.filter((s) => s.id !== id));
```

### 3. Form State

```jsx
const [formData, setFormData] = useState({
  name: "",
  house: "Valor",
  level: 1,
});
```

Object state for form fields.

### 4. Controlled Inputs

```jsx
<input
  value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
/>
```

Input value controlled by state!

## Array Update Patterns

**BAD: Mutating directly**

```jsx
students.push(newStudent); // Don't mutate!
setStudents(students);
```

**- Right: Create new array**

```jsx
setStudents([...students, newStudent]);
```

**BAD: Modifying element**

```jsx
students[0].name = "New Name"; // Don't mutate!
```

**- Right: Map with new object**

```jsx
setStudents(students.map((s, i) => (i === 0 ? { ...s, name: "New Name" } : s)));
```

## Search/Filter Pattern

```jsx
const [search, setSearch] = useState("");

const filtered = students.filter((s) =>
  s.name.toLowerCase().includes(search.toLowerCase()),
);
```

Don't store filtered results in state - compute them!

## Form Validation

```jsx
if (!formData.name.trim()) {
  alert("Name is required!");
  return;
}
```

Validate before updating state.

## Best Practices

- **Immutable updates**: Always create new arrays/objects
- **Unique keys**: Use stable IDs (not array index)
- **Controlled inputs**: Sync input value with state
- **Compute, don't store**: Derive filtered/sorted data
- **Validation**: Check data before state updates

## Module 4 Complete!

You now master:

- - useState hook basics
- - Multiple state variables
- - Complex state (objects/arrays)
- - Form handling
- - CRUD operations

**Congratulations!** You've completed Phase 1 (Modules 1-4) - JavaScript Basics with React!

**Next Phase**: Modules 5-8 will introduce Vite, forms, lists, and side effects!
