function log(text) {
  document.getElementById("output").textContent += text + "\n";
}

const name = "Merlin";
let health = 100;
let mana = 50;
const spells = ["Fireball", "Heal", "Shield"];
let inCombat = false;

log("=== Starting Stats ===");
log(`Name: ${name}`);
log(`Health: ${health}`);
log(`Mana: ${mana}`);
log(`Spells: ${spells.join(", ")}`);
log(`In Combat: ${inCombat}`);

log("\n=== Battle Round ===");

health -= 25;
log("Took 25 damage");

mana -= 15;
log("Cast a spell for 15 mana");

spells.push("Barrier");
log("Learned Barrier");

inCombat = true;
log("Entered combat");

log("\n=== Updated Stats ===");
log(
  `${name} — HP: ${health} / Mana: ${mana} — Spells: ${spells.join(", ")} — In Combat: ${inCombat}`,
);
