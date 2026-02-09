// Module 1 Demo: React Elements with createElement()

// Step 1: Create a student object with wizard stats
const student = {
  name: "Toasty McPigeonfingers",
  house: "Scarybird",
  magicLevel: 45,
  health: 100,
  mana: 80,
};

// Step 2: Create React elements using createElement()
// Syntax: React.createElement(type, props, ...children)

const title = React.createElement(
  "h1",
  null,
  "Arcane Academy - Student Profile",
);

const studentCard = React.createElement(
  "div",
  { className: "student-card" },
  React.createElement("h2", null, student.name),
  React.createElement("p", null, `House: ${student.house}`),
  React.createElement(
    "div",
    { className: "stat" },
    React.createElement("strong", null, "Magic Level: "),
    student.magicLevel,
  ),
  React.createElement(
    "div",
    { className: "stat" },
    React.createElement("strong", null, "Health: "),
    student.health,
  ),
  React.createElement(
    "div",
    { className: "stat" },
    React.createElement("strong", null, "Mana: "),
    student.mana,
  ),
);

// Step 3: Combine elements into an app
const app = React.createElement("div", null, title, studentCard);

// Step 4: Render to the DOM
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(app);

// Note: This is the "old way" of creating React elements
// In Module 2, we'll learn JSX which makes this MUCH easier!
// Instead of:
//   React.createElement('h1', null, 'Hello')
// We'll write:
//   <h1>Hello</h1>
