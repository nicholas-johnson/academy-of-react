function log(text) {
  document.getElementById("output").textContent += text + "\n";
}

const roster = [
  { name: "Merlin", power: 100, house: "Liondudes" },
  { name: "Morgana", power: 90, house: "Serpent" },
  { name: "Ron", power: 30, house: "Liondudes" },
  { name: "Luna", power: 75, house: "Raven" },
  { name: "Draco", power: 60, house: "Serpent" },
  { name: "Neville", power: 40, house: "Badger" },
];

// Task 1: Names only
const names = roster.map((w) => w.name);
log("=== Task 1: Names ===");
log(names.join(", "));

// Task 2: Powerful wizards
const powerful = roster.filter((w) => w.power > 50);
log("\n=== Task 2: Powerful Wizards (power > 50) ===");
powerful.forEach((w) => log(`  ${w.name} (${w.power})`));

// Task 3: Find Luna
const luna = roster.find((w) => w.name === "Luna");
log("\n=== Task 3: Find Luna ===");
log(`  ${luna.name}, power: ${luna.power}, house: ${luna.house}`);

// Task 4: Total power
const totalPower = roster.reduce((sum, w) => sum + w.power, 0);
log("\n=== Task 4: Total Power ===");
log(`  ${totalPower}`);

// Task 5: Group by house
const grouped = roster.reduce((groups, wizard) => {
  const house = wizard.house;
  groups[house] = groups[house] || [];
  groups[house].push(wizard);
  return groups;
}, {});

log("\n=== Task 5: Grouped by House ===");
for (const house in grouped) {
  const houseNames = grouped[house].map((w) => w.name).join(", ");
  log(`  ${house}: ${houseNames}`);
}

// Task 6: Liondudes names, sorted
const liondudesNames = roster
  .filter((w) => w.house === "Liondudes")
  .map((w) => w.name)
  .sort();

log("\n=== Task 6: Liondudes (sorted) ===");
log(`  ${liondudesNames.join(", ")}`);
