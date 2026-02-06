# Quest 3: House Roster - Solution Notes

## Key Concepts

### 1. Passing Arrays as Props

```jsx
const students = [/* array of student objects */];

<HouseRoster students={students} />

function HouseRoster({ students }) {
  return (
    <div>
      {students.map(student => (
        <StudentCard key={student.id} {...student} />
      ))}
    </div>
  );
}
```

### 2. Object.entries() for Mapping Objects

```jsx
const houses = { Valor: {...}, Wisdom: {...} };

Object.entries(houses).map(([houseName, houseData]) => (
  <HouseRoster key={houseName} houseName={houseName} {...houseData} />
))
```

Converts object to array of [key, value] pairs!

### 3. Computed Statistics

```jsx
const avgLevel = Math.round(
  students.reduce((sum, s) => sum + s.level, 0) / students.length
);
```

Calculate stats from array of data.

### 4. Nested Components

- `HouseRoster` contains
  - `HouseStatistics`
  - Multiple `StudentCard` components

## Module 3 Complete!

You now master:
- ✅ Props and default values
- ✅ The `children` prop
- ✅ Component composition
- ✅ Passing arrays/objects
- ✅ Mapping over data

**Next**: Module 4 adds interactivity with `useState`!






