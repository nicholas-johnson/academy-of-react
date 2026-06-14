function log(text) {
  document.getElementById("output").textContent += text + "\n";
}

const roster = [
  { name: "Merlin", power: 100, house: "Liondudes" },
  { name: "Luna", power: 45, house: "Raven" },
  { name: "Neville", power: 22, house: "Badger" },
  { name: "Morgana", power: 90, house: "Serpent" },
  { name: "Colin", power: 15, house: "Raven" },
  { name: "Draco", power: 60, house: "Serpent" },
];

function classifyWizard(wizard) {
  let effectivePower = wizard.power;

  if (wizard.house === "Raven") {
    effectivePower += 10;
  }

  if (effectivePower >= 100) {
    return "Archmage";
  } else if (effectivePower >= 50) {
    return "Battle Mage";
  } else if (effectivePower >= 25) {
    return "Journeyman";
  } else {
    return "Apprentice";
  }
}

function formatWizard(wizard) {
  const rank = classifyWizard(wizard);
  const icon = wizard.power >= 50 ? "⚔️" : "📖";
  const bonus = wizard.house === "Raven" ? " (+10 bonus)" : "";
  return `${icon} ${wizard.name} (${rank}) — power: ${wizard.power}, house: ${wizard.house}${bonus}`;
}

log("=== Wizard Classifications ===\n");

for (const wizard of roster) {
  log(formatWizard(wizard));
}
