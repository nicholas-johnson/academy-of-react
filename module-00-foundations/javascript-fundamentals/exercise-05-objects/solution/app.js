function log(text) {
  document.getElementById("output").textContent += text + "\n";
}

const wizard = {
  name: "Merlin",
  stats: { power: 100, defense: 50 },
  spells: ["Fireball", "Heal"],
  equipment: {
    weapon: "Staff of Ages",
    armor: "Enchanted Robes",
  },
};

log("=== Original Wizard ===");
log(JSON.stringify(wizard, null, 2));

// Task 1: Increase power to 120
const wizard2 = {
  ...wizard,
  stats: { ...wizard.stats, power: 120 },
};

log("\n=== Task 1: Power → 120 ===");
log(`wizard2 power: ${wizard2.stats.power}`);
log(`original power still: ${wizard.stats.power}`);

// Task 2: Add "Shield" to spells
const wizard3 = {
  ...wizard,
  spells: [...wizard.spells, "Shield"],
};

log("\n=== Task 2: Add Shield ===");
log(`wizard3 spells: ${wizard3.spells.join(", ")}`);
log(`original spells still: ${wizard.spells.join(", ")}`);

// Task 3: Change weapon to "Elder Wand"
const wizard4 = {
  ...wizard,
  equipment: { ...wizard.equipment, weapon: "Elder Wand" },
};

log("\n=== Task 3: Elder Wand ===");
log(`wizard4 weapon: ${wizard4.equipment.weapon}`);
log(`original weapon still: ${wizard.equipment.weapon}`);

// Task 4: Remove "Fireball" from spells
const wizard5 = {
  ...wizard,
  spells: wizard.spells.filter((s) => s !== "Fireball"),
};

log("\n=== Task 4: Remove Fireball ===");
log(`wizard5 spells: ${wizard5.spells.join(", ")}`);
log(`original spells still: ${wizard.spells.join(", ")}`);

// Task 5: Destructuring
const { name } = wizard;
const {
  stats: { power },
} = wizard;
const [primarySpell] = wizard.spells;

log("\n=== Task 5: Destructuring ===");
log(`name: ${name}`);
log(`power: ${power}`);
log(`primarySpell: ${primarySpell}`);
