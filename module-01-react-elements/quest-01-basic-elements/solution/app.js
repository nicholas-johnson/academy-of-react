// Wizard data
const wizard = {
  name: "Elara Moonwhisper",
  house: "Wisdom",
  level: 42,
  specialty: "Elemental Magic",
};

// Create a simple wizard card using React.createElement
const WizardCard = React.createElement(
  "div",
  { className: "wizard-card" },
  React.createElement("h1", { className: "wizard-name" }, wizard.name),
  React.createElement(
    "div",
    { className: "wizard-info" },
    React.createElement(
      "p",
      null,
      React.createElement("strong", null, "House: "),
      wizard.house
    ),
    React.createElement(
      "p",
      null,
      React.createElement("strong", null, "Level: "),
      wizard.level
    ),
    React.createElement(
      "p",
      null,
      React.createElement("strong", null, "Specialty: "),
      wizard.specialty
    )
  )
);

// Render to the page
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(WizardCard);
