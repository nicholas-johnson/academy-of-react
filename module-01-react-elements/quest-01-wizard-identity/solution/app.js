// Get React and ReactDOM from global scope
const { createElement: h } = React;
const { createRoot } = ReactDOM;

// Wizard data
const wizard = {
  name: "Elara Moonwhisper",
  house: "Wisdom",
  level: 42,
  specialty: "Elemental Magic",
  magicPower: 85,
  intelligence: 92,
  stamina: 78,
  experience: 3250,
  maxExperience: 4000,
};

// House color mapping
const houseColors = {
  Valor: "#dc2626",
  Wisdom: "#2563eb",
  Nature: "#16a34a",
  Mystery: "#9333ea",
};

// Get house color
const houseColor = houseColors[wizard.house] || "#6b7280";

// Calculate experience percentage
const experiencePercent = (wizard.experience / wizard.maxExperience) * 100;

// Stat bar component (using createElement)
function createStatBar(label, value, maxValue = 100) {
  const percentage = (value / maxValue) * 100;

  return h(
    "div",
    { className: "stat-row" },
    h("div", { className: "stat-label" }, label),
    h(
      "div",
      { className: "stat-bar-container" },
      h("div", {
        className: "stat-bar-fill",
        style: {
          width: `${percentage}%`,
          backgroundColor: houseColor,
        },
      }),
      h("span", { className: "stat-value" }, `${value}/${maxValue}`)
    )
  );
}

// House emblem (bonus feature)
function createHouseEmblem(house) {
  const emblems = {
    Valor: "🦁",
    Wisdom: "🦅",
    Nature: "🐺",
    Mystery: "🐍",
  };

  return h(
    "div",
    { className: "house-emblem" },
    h(
      "span",
      {
        className: "emblem-icon",
        style: { color: houseColor },
      },
      emblems[house] || "⭐"
    ),
    h("span", { className: "emblem-text" }, house)
  );
}

// Main wizard card component
function WizardCard() {
  return h(
    "div",
    { className: "wizard-card" },
    // Header with house accent
    h(
      "div",
      {
        className: "card-header",
        style: { borderTopColor: houseColor },
      },
      h("h1", { className: "wizard-name" }, wizard.name),
      createHouseEmblem(wizard.house)
    ),

    // Wizard details
    h(
      "div",
      { className: "card-body" },
      h(
        "div",
        { className: "wizard-info" },
        h(
          "div",
          { className: "info-row" },
          h("span", { className: "info-label" }, "Level:"),
          h(
            "span",
            {
              className: "level-badge",
              style: { backgroundColor: houseColor },
            },
            wizard.level
          )
        ),
        h(
          "div",
          { className: "info-row" },
          h("span", { className: "info-label" }, "Specialty:"),
          h("span", { className: "info-value" }, wizard.specialty)
        )
      ),

      // Animated stat bars (bonus feature)
      h(
        "div",
        { className: "stats-section" },
        h("h3", { className: "section-title" }, "Attributes"),
        createStatBar("Magic Power", wizard.magicPower),
        createStatBar("Intelligence", wizard.intelligence),
        createStatBar("Stamina", wizard.stamina)
      ),

      // Experience bar
      h(
        "div",
        { className: "stats-section" },
        h("h3", { className: "section-title" }, "Experience"),
        h(
          "div",
          { className: "exp-bar-container" },
          h("div", {
            className: "exp-bar-fill",
            style: {
              width: `${experiencePercent}%`,
              backgroundColor: houseColor,
            },
          }),
          h(
            "span",
            { className: "exp-text" },
            `${wizard.experience} / ${wizard.maxExperience} XP`
          )
        )
      )
    )
  );
}

// App container
function App() {
  return h(
    "div",
    { className: "app-container" },
    h(
      "div",
      { className: "quest-header" },
      h("h2", null, "⚡ Quest 1: Wizard Identity"),
      h("p", { className: "quest-subtitle" }, "React.createElement() Solution")
    ),
    WizardCard()
  );
}

// Render the app
const root = createRoot(document.getElementById("root"));
root.render(h(App));





