function log(text) {
  document.getElementById("output").textContent += text + "\n";
}

// Part A: Arrow functions & defaults

const createSpell = (name, damage = 10, element = "arcane") => ({
  name,
  damage,
  element,
});

log("=== Part A: Create Spells ===\n");

const fireball = createSpell("Fireball", 50, "fire");
log(`Fireball: ${JSON.stringify(fireball)}`);

const spark = createSpell("Spark");
log(`Spark:    ${JSON.stringify(spark)}`);

const iceLance = createSpell("Ice Lance", 35);
log(`Ice Lance: ${JSON.stringify(iceLance)}`);

// Part B: Your own map

function applyToAll(arr, fn) {
  const result = [];
  for (const item of arr) {
    result.push(fn(item));
  }
  return result;
}

log("\n=== Part B: applyToAll ===\n");

const doubled = applyToAll([2, 5, 10], (n) => n * 2);
log(`Doubled: ${doubled}`);

const uppercased = applyToAll(["fireball", "heal", "shield"], (s) =>
  s.toUpperCase(),
);
log(`Uppercased: ${uppercased}`);

// Part C: Closures

function createManaPool(startingMana) {
  let mana = startingMana;

  return {
    cast(cost) {
      if (cost > mana) return false;
      mana -= cost;
      return true;
    },
    remaining() {
      return mana;
    },
  };
}

log("\n=== Part C: Mana Pool ===\n");

const pool = createManaPool(50);
log(`Starting mana: ${pool.remaining()}`);

let success;

success = pool.cast(20);
log(`Cast for 20: ${success} (remaining: ${pool.remaining()})`);

success = pool.cast(20);
log(`Cast for 20: ${success} (remaining: ${pool.remaining()})`);

success = pool.cast(20);
log(`Cast for 20: ${success} (remaining: ${pool.remaining()})`);
