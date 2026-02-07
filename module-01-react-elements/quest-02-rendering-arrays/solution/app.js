// Get React and ReactDOM from global scope
const { createElement: h } = React;
const { createRoot } = ReactDOM;

// Student data
const students = [
  {
    id: 1,
    name: "Elara Moonwhisper",
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

// House colors and emblems
const houseConfig = {
  Valor: { color: "#dc2626", emblem: "🦁" },
  Wisdom: { color: "#2563eb", emblem: "🦅" },
  Nature: { color: "#16a34a", emblem: "🐺" },
  Mystery: { color: "#9333ea", emblem: "🐍" },
};

// Student card component
const StudentCard = (student) => {
  const config = houseConfig[student.house];

  return h(
    "div",
    {
      className: "student-card",
      "data-house": student.house.toLowerCase(),
    },
    // Card header with house accent
    h(
      "div",
      {
        className: "card-header",
        style: { borderTopColor: config.color },
      },
      h(
        "div",
        { className: "header-content" },
        h("h3", { className: "student-name" }, student.name),
        h(
          "span",
          {
            className: "level-badge",
            style: { backgroundColor: config.color },
          },
          `Lv ${student.level}`,
        ),
      ),
      h(
        "span",
        {
          className: "house-emblem",
          style: { color: config.color },
        },
        config.emblem,
      ),
    ),

    // Card body
    h(
      "div",
      { className: "card-body" },
      h(
        "div",
        { className: "info-row" },
        h("span", { className: "info-label" }, "🏠 House:"),
        h(
          "span",
          {
            className: "house-name",
            style: { color: config.color },
          },
          student.house,
        ),
      ),
      h(
        "div",
        { className: "info-row" },
        h("span", { className: "info-label" }, "✨ Specialty:"),
        h("span", { className: "info-value" }, student.specialty),
      ),
      h(
        "div",
        { className: "info-row" },
        h("span", { className: "info-label" }, "📊 Status:"),
        h(
          "span",
          {
            className: `status-badge status-${student.status}`,
          },
          student.status,
        ),
      ),
    ),
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
      h("h1", null, "⚡ Quest 2: Student Registry"),
      h(
        "p",
        { className: "quest-subtitle" },
        "Displaying students with React.createElement()",
      ),
    ),

    h(
      "div",
      { className: "student-grid" },
      students.map((student) =>
        h(StudentCard, { key: student.id, ...student }),
      ),
    ),
  );
};

// Render the app
const root = createRoot(document.getElementById("root"));
root.render(h(App));
