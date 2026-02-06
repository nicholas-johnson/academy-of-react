# Quest 1: Battle Rankings - Solution Notes

## Overview

Sortable table displaying 20 students with battle statistics. Click column headers to sort by different criteria. Top 3 performers highlighted with special styling.

## Key Concepts

### 1. Array Sorting
```javascript
const sorted = [...array].sort((a, b) => {
  return a.value - b.value // ascending
  // OR
  return b.value - a.value // descending
})
```

Always spread array first (`[...array]`) to avoid mutating original.

### 2. Dynamic Sorting
```javascript
const sortedStudents = [...STUDENTS].sort((a, b) => {
  let comparison = 0
  if (sortBy === 'name') {
    comparison = a.name.localeCompare(b.name) // String compare
  } else {
    comparison = a[sortBy] - b[sortBy] // Number compare
  }
  return sortOrder === 'asc' ? comparison : -comparison
})
```

### 3. Key Prop with Stable IDs
```javascript
{sortedStudents.map(student => (
  <tr key={student.id}>  {/* Use ID, not index! */}
```

Using stable IDs prevents bugs when reordering.

### 4. Conditional Styling
```javascript
<tr className={top3Ids.includes(student.id) ? 'top-3' : ''}>
```

### 5. Toggle Sort Direction
```javascript
const handleSort = (field) => {
  if (sortBy === field) {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  } else {
    setSortBy(field)
    setSortOrder('desc')
  }
}
```

## Common Pitfalls

❌ **Wrong**: Mutating original array
```javascript
const sorted = STUDENTS.sort(...) // Mutates!
```

✅ **Right**: Create new array
```javascript
const sorted = [...STUDENTS].sort(...)
```

❌ **Wrong**: Using index as key
```javascript
{students.map((s, i) => <tr key={i}>)} // Breaks on reorder
```

✅ **Right**: Using stable ID
```javascript
{students.map(s => <tr key={s.id}>)}
```

## Testing

1. Click each column header - list should reorder
2. Click same header twice - order should reverse
3. Top 3 by wins should have yellow background
4. Rank numbers should show gold/silver/bronze for top 3

## What's Next

Quest 2 teaches multiple filter criteria simultaneously - essential for real-world data tables.
