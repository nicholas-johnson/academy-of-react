# Quest 1: Wizard Identity

> **Quick Start:** A starter template is available in the `starter/` folder with all the setup ready. You can start coding right away, or build from scratch following the instructions below.

## Story Introduction

The ancient Enrollment Crystal awaits you. To register as a student at the Arcane Academy, you must create your wizard identity using the old incantations. The Headmaster insists all new students learn `React.createElement()` before moving on to modern JSX runes — it builds character and understanding of React's inner workings.

## Objective

Create a student object representing your wizard and render it to the page using `React.createElement()`.

## Technical Concepts

- JavaScript objects
- Object properties
- React.createElement()
- ReactDOM.createRoot() and render()

## Requirements

Create an HTML file that:

1. Loads React and ReactDOM from CDN
2. Creates a student object with these properties:
   - `name` (string) - Your wizard's name
   - `house` (string) - Choose: Gryffin, Ravenclaw, Hufflepuff, or Slytherin
   - `magicLevel` (number) - Starting power level (1-100)
   - `health` (number) - Hit points (usually 100)
3. Uses `React.createElement()` to create elements displaying:
   - A heading with your wizard's name
   - Each stat labeled and showing its value
4. Renders the elements to a div with id="root"

## Example Data

```javascript
const myWizard = {
  name: "Luna Moonwhisper",
  house: "Ravenclaw",
  magicLevel: 35,
  health: 100,
};
```

## Acceptance Criteria

- [ ] HTML file loads React 18 from CDN
- [ ] Student object created with all 4 required properties
- [ ] All properties displayed on the page using createElement()
- [ ] Elements are rendered to #root div
- [ ] Page displays without errors in console

## Hints

<details>
<summary>Click for hints</summary>

**Hint 1**: Start with the HTML structure from the demo. You need script tags for React and ReactDOM.

**Hint 2**: The basic pattern for createElement is:

```javascript
React.createElement("tagName", null, "content");
```

**Hint 3**: To nest elements, pass them as additional arguments:

```javascript
React.createElement(
  "div",
  null,
  React.createElement("h1", null, "Title"),
  React.createElement("p", null, "Paragraph"),
);
```

**Hint 4**: You can use template strings to combine text and variables:

```javascript
`House: ${student.house}`;
```

**Hint 5**: Don't forget to create a root and call render():

```javascript
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(yourElements);
```

</details>

## Bonus Challenge

Add a calculated property to display:

- **Power Rating**: Calculated as `magicLevel + (health / 10)`
- Display this with a special color or styling

Example: If magicLevel is 35 and health is 100, Power Rating would be 45.

---

**Next Quest**: [Quest 2: Rendering Arrays](../quest-02-rendering-arrays/)
