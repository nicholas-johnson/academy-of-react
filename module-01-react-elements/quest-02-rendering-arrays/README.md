# Quest 2: Student Registry

> **Quick Start:** A starter template is available in the `starter/` folder with all the setup ready. You can start coding right away, or build from scratch following the instructions below.

## Story Introduction

The Headmaster needs a complete registry of new students for the Academy records. You've mastered creating a single wizard profile, but now you must level up — create a system that can display multiple students from an array. This is essential training, as real wizarding systems always deal with collections of data.

## Objective

Create an array of student objects and render them all as a list using loops and `React.createElement()`.

## Technical Concepts

- JavaScript arrays
- Array iteration (for loop or map)
- Creating multiple React elements
- Passing arrays of elements as children

## Requirements

Create an HTML file that:

1. Defines an array of at least 5 student objects
2. Each student should have: name, house, magicLevel, health
3. Uses a loop (or array method) to create React elements for each student
4. Displays all students in a list format
5. Each student should be visually distinct (e.g., in separate cards or list items)

## Example Data

```javascript
const students = [
  {
    name: "Toasty McPigeonfingers",
    house: "Scarybird",
    magicLevel: 45,
    health: 100,
  },
  { name: "Thor Ironforge", house: "Liondudes", magicLevel: 62, health: 100 },
  { name: "Luna Starlight", house: "Huftybadger", magicLevel: 38, health: 100 },
  {
    name: "Draco Shadowmere",
    house: "Snakeyguys",
    magicLevel: 55,
    health: 100,
  },
  { name: "Finn Earthshaker", house: "Liondudes", magicLevel: 41, health: 100 },
];
```

## Acceptance Criteria

- [ ] Array contains at least 5 student objects
- [ ] All students are displayed on the page
- [ ] Loop or array method used to generate elements
- [ ] Each student's information is clearly shown
- [ ] Students are visually separated (cards, borders, or spacing)
- [ ] No console errors

## Hints

<details>
<summary>Click to reveal hints</summary>

**Hint 1**: You can create an array of React elements using a for loop:

```javascript
const studentElements = [];
for (let i = 0; i < students.length; i++) {
  const student = students[i];
  const element = React.createElement("div", null, student.name);
  studentElements.push(element);
}
```

**Hint 2**: Or use the array .map() method (more common in React):

```javascript
const studentElements = students.map((student) => {
  return React.createElement("div", null, student.name);
});
```

**Hint 3**: Pass the array of elements as children:

```javascript
React.createElement("div", null, ...studentElements);
```

**Hint 4**: Add a className prop for styling:

```javascript
React.createElement('div', { className: 'student-card' }, ...)
```

**Hint 5**: Create nested elements for each stat:

```javascript
React.createElement(
  "div",
  { className: "student-card" },
  React.createElement("h3", null, student.name),
  React.createElement("p", null, `House: ${student.house}`),
  React.createElement("p", null, `Magic Level: ${student.magicLevel}`),
);
```

</details>

## Bonus Challenge

Add these enhancements:

1. **Display a count**: Show "Total Students: 5" at the top
2. **Calculate averages**: Show the average magicLevel of all students
3. **House colors**: Give each house a different background color for their cards
4. **Sorting**: Display students sorted by magicLevel (highest first)

Bonus tip: For house colors, you could use:

```javascript
const houseColors = {
  Liondudes: "#FFD700",
  Scarybird: "#00B4D8",
  Huftybadger: "#FFB703",
  Snakeyguys: "#06A77D",
};
```

---

**Congratulations!** You've completed Module 1!

**Next Module**: [Module 2: JSX and Components](../../module-02-jsx-components/) — Learn the modern JSX syntax that makes React much more readable!
