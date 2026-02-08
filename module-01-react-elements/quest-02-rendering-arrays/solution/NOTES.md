# Quest 2: Student Registry - Solution Notes

## Overview

This solution demonstrates rendering **lists of elements** with `React.createElement()`, including advanced bonus features like filtering by house and sorting by different criteria.

## Key Concepts Demonstrated

### 1. Rendering Arrays/Lists

React can render arrays of elements:

```javascript
students.map((student) => h(StudentCard, { key: student.id, ...student }));
```

**Important**: Always provide a `key` prop when rendering lists! React uses keys to track which items have changed.

### 2. Component with Props

Components can be functions that accept a props object:

```javascript
function StudentCard(student) {
  // student is the props object
  return h("div", { className: "student-card" }, h("h3", null, student.name));
}

// Usage:
h(StudentCard, { ...student });
```

### 3. Dynamic Styling

Using JavaScript to compute styles:

```javascript
const config = houseConfig[student.house];
h("div", {
  style: { borderTopColor: config.color },
});
```

### 4. Re-rendering on User Input

This solution demonstrates a simple manual re-render pattern:

```javascript
function App() {
  function render() {
    // Create element tree
    const app = h('div', ...);
    // Re-render
    root.render(app);
  }

  render(); // Initial render

  // Buttons can call render() to update UI
  h('button', { onclick: render })
}
```

**Note**: This is NOT how you'd normally do it! Module 3 introduces `useState` for proper state management.

## Implementation Approach

### Data Structure

```javascript
const students = [
  {
    id: 1,
    name: "Dixie Spiderwhomp",
    house: "Wisdom",
    level: 42,
    specialty: "Elemental Magic",
    status: "active",
  },
  // ...more students
];
```

### Component Hierarchy

```
App
├── Quest Header
├── Stats Summary (bonus)
├── Controls
│   ├── Filter Buttons (bonus)
│   └── Sort Buttons (bonus)
└── Student Grid
    └── StudentCard (×8)
        ├── Card Header
        └── Card Body
```

### Bonus Features Explained

#### 1. Filter by House

Uses a closure variable to track current filter:

```javascript
let currentFilter = "all";

function filterStudents() {
  return currentFilter === "all"
    ? students
    : students.filter((s) => s.house === currentFilter);
}
```

#### 2. Sort by Name or Level

```javascript
let currentSort = "name";

if (currentSort === "name") {
  filtered.sort((a, b) => a.name.localeCompare(b.name));
} else {
  filtered.sort((a, b) => b.level - a.level);
}
```

#### 3. Live Statistics

Calculates stats from filtered results:

```javascript
const totalStudents = studentsToShow.length;
const avgLevel = Math.round(
  studentsToShow.reduce((sum, s) => sum + s.level, 0) / totalStudents,
);
```

## Common Pitfalls

### ❌ Wrong: Missing key prop

```javascript
students.map((student) => h(StudentCard, { ...student }));
```

React warning: "Each child should have a unique 'key' prop"

### ✅ Right: Always provide key

```javascript
students.map((student) => h(StudentCard, { key: student.id, ...student }));
```

### ❌ Wrong: Modifying props object

```javascript
function StudentCard(props) {
  props.name = props.name.toUpperCase(); // NEVER mutate props!
  return h("h3", null, props.name);
}
```

### ✅ Right: Props are read-only

```javascript
function StudentCard(props) {
  const uppercaseName = props.name.toUpperCase();
  return h("h3", null, uppercaseName);
}
```

### ❌ Wrong: Using array index as key

```javascript
students.map((student, index) => h(StudentCard, { key: index, ...student }));
```

Causes bugs when list order changes!

### ✅ Right: Use stable, unique ID

```javascript
students.map((student) => h(StudentCard, { key: student.id, ...student }));
```

## Performance Notes

- Each re-render creates a new element tree
- React's diffing algorithm efficiently updates only what changed
- With 8 students, performance is excellent
- For 100+ items, consider virtualization (later modules)

## Styling Strategy

### Grid Layout

```css
.student-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

Auto-fills columns based on available space - fully responsive!

### Hover Effects

```css
.student-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

Provides tactile feedback - makes UI feel alive.

### Animations

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Cards animate in on load for polish.

## Extensions and Improvements

### Easy

- Add search by name
- Show total per house
- Add more student properties (age, year, etc.)
- Different card styles per house

### Medium

- Pagination (show 6 at a time)
- Click card to see full profile
- Add "favorites" toggle
- Export to CSV

### Hard

- Drag and drop to reorder
- Compare two students side-by-side
- Add new students via form (preview of Module 4!)
- Persist filter/sort preferences to localStorage

## Real-World Patterns

This quest previews concepts you'll use constantly:

1. **Mapping over arrays** - Every list in React
2. **Component props** - How data flows down
3. **Conditional rendering** - Show/hide based on state
4. **Event handlers** - User interactions
5. **Dynamic styling** - Theming and customization

## What's Different in Real React?

In production code with JSX and state:

```javascript
// This solution (createElement, manual render):
let currentFilter = "all";
function render() {
  root.render(h(App));
}
h("button", {
  onclick: () => {
    currentFilter = "Valor";
    render();
  },
});

// Real React (JSX, useState):
const [filter, setFilter] = useState("all");
<button onClick={() => setFilter("Valor")}>Valor</button>;
```

Much cleaner! But the underlying concepts are identical.

## Testing the Solution

1. Open in browser - should see 8 students
2. Click house filters - should filter correctly
3. Click sort buttons - order should change
4. Check console - no errors
5. Resize window - should be responsive
6. Hover cards - should lift up

## What's Next?

**Module 2** converts this to JSX syntax - you'll appreciate how much cleaner it becomes!

**Module 3** introduces proper state management with `useState` - no more manual re-rendering!
