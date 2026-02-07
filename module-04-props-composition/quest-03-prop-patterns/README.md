# Quest 3: House Roster

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

The Great Sorting has been completed, and students are divided among the four houses. The House Masters need a roster system that shows all students grouped by their house, with statistics for each house. This is your most complex quest yet — you'll need to organize data, perform calculations, and create a multi-level component structure.

## Objective

Create a `HouseRoster` component that displays students grouped by house, calculates average magic level for each house, and shows house totals.

## Technical Concepts

- Mapping over arrays
- Filtering arrays by criteria
- Array reduce for calculations
- Nested components
- Derived/computed values
- Grouping data
- Multiple map operations

## Requirements

Create a Vite React project with:

1. Proper Vite project structure (`src/`, `package.json`, `vite.config.js`)

1. An array of at least 12 students from 4 different houses
2. A `HouseRoster` component that:
   - Groups students by house
   - Displays each house separately
   - Shows all students in each house
   - Calculates average magicLevel per house
   - Displays total student count per house
3. Style each house distinctively (colors, badges)
4. Display houses in a clear, organized manner

## Example Data

```javascript
const students = [
  { name: "Aria Spellweaver", house: "Ravenclaw", magicLevel: 45 },
  { name: "Thor Ironforge", house: "Gryffin", magicLevel: 62 },
  { name: "Luna Starlight", house: "Hufflepuff", magicLevel: 38 },
  { name: "Draco Shadowmere", house: "Slytherin", magicLevel: 55 },
  { name: "Finn Earthshaker", house: "Gryffin", magicLevel: 41 },
  { name: "Maya Brightwind", house: "Ravenclaw", magicLevel: 58 },
  { name: "Zara Moonstone", house: "Hufflepuff", magicLevel: 44 },
  { name: "Rex Stormborn", house: "Slytherin", magicLevel: 67 },
  { name: "Ivy Greenleaf", house: "Hufflepuff", magicLevel: 35 },
  { name: "Kai Firehart", house: "Gryffin", magicLevel: 70 },
  { name: "Nova Skywhisper", house: "Ravenclaw", magicLevel: 52 },
  { name: "Ash Nightshade", house: "Slytherin", magicLevel: 49 }
];
```

## Acceptance Criteria

- [ ] Array of 12+ students from 4 houses created
- [ ] Students are grouped and displayed by house
- [ ] Each house section shows all its students
- [ ] Average magic level calculated per house
- [ ] Total student count shown per house
- [ ] Houses have distinct styling/colors
- [ ] All calculations are correct
- [ ] No console errors

## Hints

<details>
<summary>Click for hints</summary>

**Hint 1**: Filter students by house:
```jsx
const gryffins = students.filter(s => s.house === "Gryffin");
const ravenclaws = students.filter(s => s.house === "Ravenclaw");
// etc...
```

**Hint 2**: Calculate average:
```jsx
function calculateAverage(students) {
  if (students.length === 0) return 0;
  const sum = students.reduce((total, student) => total + student.magicLevel, 0);
  return (sum / students.length).toFixed(1);
}
```

**Hint 3**: Create a HouseSection component:
```jsx
function HouseSection({ houseName, students, color }) {
  const average = calculateAverage(students);
  
  return (
    <div className="house-section" style={{ borderColor: color }}>
      <h2>{houseName}</h2>
      <p>Students: {students.length} | Average Level: {average}</p>
      <div className="student-list">
        {students.map((student, index) => (
          <div key={index} className="student">
            {student.name} - Level {student.magicLevel}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Hint 4**: Use HouseSection for each house:
```jsx
function HouseRoster({ students }) {
  const houses = ["Gryffin", "Ravenclaw", "Hufflepuff", "Slytherin"];
  const colors = {
    Gryffin: "#dc143c",
    Ravenclaw: "#0082c8",
    Hufflepuff: "#ffb81c",
    Slytherin: "#1a472a"
  };

  return (
    <div>
      {houses.map(house => {
        const houseStudents = students.filter(s => s.house === house);
        return (
          <HouseSection
            key={house}
            houseName={house}
            students={houseStudents}
            color={colors[house]}
          />
        );
      })}
    </div>
  );
}
```

**Hint 5**: Style with CSS:
```css
.house-section {
  border: 3px solid;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.student-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 15px;
}

.student {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
}
```

</details>

## Bonus Challenge

Add advanced features:

1. **Highest/Lowest**: Show the strongest and weakest student in each house

2. **House Ranking**: Display houses sorted by average magic level (highest first)

3. **Total Power**: Calculate and show total combined magic level for each house

4. **Visual Stats**: Add a bar or progress indicator showing relative house strength

5. **Search/Filter**: Add an input to filter students by name across all houses

6. **Sorting Options**: Add buttons to sort students within each house by:
   - Name (A-Z)
   - Magic Level (highest first)
   - Magic Level (lowest first)

7. **House Comparison**: Add a summary section showing:
   - Most powerful house (highest average)
   - Largest house (most students)
   - Total students across all houses
   - Overall academy average

Example comparison component:
```jsx
function AcademySummary({ students }) {
  const totalStudents = students.length;
  const overallAverage = calculateAverage(students);
  
  // Calculate per-house averages
  const houses = ["Gryffin", "Ravenclaw", "Hufflepuff", "Slytherin"];
  const houseAverages = houses.map(house => ({
    name: house,
    avg: calculateAverage(students.filter(s => s.house === house))
  }));
  
  const topHouse = houseAverages.sort((a, b) => b.avg - a.avg)[0];
  
  return (
    <div className="summary">
      <h3>Academy Statistics</h3>
      <p>Total Students: {totalStudents}</p>
      <p>Overall Average: {overallAverage}</p>
      <p>Top House: {topHouse.name} ({topHouse.avg})</p>
    </div>
  );
}
```

---

**Congratulations!** You've completed Module 4!

**Next Module**: [Module 5: Forms and Events](../../module-05-forms-events/) — Master complex forms and event handling patterns!

