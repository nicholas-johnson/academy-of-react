// Get React and ReactDOM from global scope
const { createElement: h } = React;
const { createRoot } = ReactDOM;

// Student data
const students = [
  {
    id: 1,
    name: "Dixie Spiderwhomp",
    house: "Wisdom",
    level: 42,
    specialty: "Elemental Magic",
    status: "active",
  },
  {
    id: 2,
    name: "Theron Stormforge",
    house: "Valor",
    level: 38,
    specialty: "Combat Magic",
    status: "active",
  },
  {
    id: 3,
    name: "Luna Willowshade",
    house: "Nature",
    level: 45,
    specialty: "Healing Arts",
    status: "active",
  },
  {
    id: 4,
    name: "Raven Shadowmere",
    house: "Mystery",
    level: 40,
    specialty: "Illusion Magic",
    status: "active",
  },
  {
    id: 5,
    name: "Atlas Ironheart",
    house: "Valor",
    level: 35,
    specialty: "Defense Magic",
    status: "training",
  },
  {
    id: 6,
    name: "Seraphina Starlight",
    house: "Wisdom",
    level: 48,
    specialty: "Astral Magic",
    status: "active",
  },
  {
    id: 7,
    name: "Finn Oakwalker",
    house: "Nature",
    level: 33,
    specialty: "Beast Taming",
    status: "active",
  },
  {
    id: 8,
    name: "Morgana Nightshade",
    house: "Mystery",
    level: 50,
    specialty: "Dark Arts",
    status: "active",
  },
];

// Student card component
const StudentCard = ({ student }) => {
  return h(
    "div",
    null,
    student.name,
    " — ",
    student.house,
    ", Lv ",
    student.level,
    ", ",
    student.specialty,
  );
};

// Main App component
const App = () => {
  return h(
    "div",
    { className: "app-container" },
    h(
      "div",
      { className: "quest-header" },
      h("h1", null, "Quest 2: Student Registry"),
      h(
        "p",
        { className: "quest-subtitle" },
        "Displaying students with React.createElement()",
      ),
    ),

    h(
      "ul",
      { className: "student-list" },
      students.map((student) =>
        h("li", null, h(StudentCard, { student }))
      ),
    ),
  );
};

// Render the app
const root = createRoot(document.getElementById("root"));
root.render(h(App));
