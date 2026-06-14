# Exercise 2: Conditionals

## Conditionals

**Conditionals** let your program choose what to do based on whether something is true or false. Instead of running every line in order, you can run one block of code in some situations and a different block in others — the same idea as "if this, then that" in everyday logic.

### if / else if / else

The `if` statement is the main way to branch: JavaScript evaluates the expression in parentheses; if it's truthy, it runs the block in `{}`. Optional `else if` branches try other conditions in order; `else` runs when nothing above matched.

```js
const power = 85;

if (power >= 100) {
  console.log("Legendary wizard");
} else if (power >= 50) {
  console.log("Skilled wizard");
} else {
  console.log("Apprentice");
}
```

### Comparison Operators

**Comparison operators** compare two values and produce a boolean (`true` or `false`). You use them inside `if` conditions and anywhere else you need a yes/no answer. Prefer **strict** equality (`===` / `!==`) so JavaScript doesn't silently convert types.

```js
// Strict equality (always use these)
5 === 5       // true
5 === "5"     // false
5 !== 10      // true

// Loose equality (avoid — causes surprises)
5 == "5"      // true (type coercion)
null == undefined // true

// Relational
power > 50
power >= 100
power < 25
power <= 0
```

### Logical Operators

**Logical operators** let you combine or invert boolean conditions. `&&` means "both must be true", `||` means "at least one must be true", and `!` flips true to false and vice versa. They're how you express rules like "allowed only if they have a wand *and* are not banned".

```js
const hasWand = true;
const knowsSpells = true;
const isBanned = false;

// AND — both must be true
if (hasWand && knowsSpells) {
  console.log("Ready for battle");
}

// OR — at least one must be true
if (hasWand || knowsSpells) {
  console.log("Has some ability");
}

// NOT — flip the value
if (!isBanned) {
  console.log("Allowed to enter");
}
```

### Ternary Operator

A compact `if/else` that returns a value — you'll use this constantly in React:

```js
const power = 85;
const rank = power >= 100 ? "Master" : "Student";

// Nested (use sparingly)
const rank =
  power >= 100 ? "Master" :
  power >= 50  ? "Journeyman" :
                 "Apprentice";
```

### Switch

Use when comparing one value against many options:

```js
const house = "Liondudes";

switch (house) {
  case "Liondudes":
    console.log("Brave and bold");
    break;
  case "Serpent":
    console.log("Cunning and ambitious");
    break;
  case "Raven":
    console.log("Wise and creative");
    break;
  case "Badger":
    console.log("Loyal and patient");
    break;
  default:
    console.log("Unknown house");
}
```

### Truthy and Falsy

JavaScript treats some values as `false` in boolean contexts:

```js
// Falsy values (all of these are "false-ish")
false
0
"" (empty string)
null
undefined
NaN

// Everything else is truthy
"hello"   // truthy
42        // truthy
[]        // truthy (even empty arrays!)
{}        // truthy (even empty objects!)
```

This matters for short-circuit patterns you'll see in React:

```js
const spells = [];

// && short-circuit: returns first falsy value, or the last value
const message = spells.length && "Has spells";  // 0 (falsy)
const message2 = spells.length > 0 && "Has spells"; // false

// || short-circuit: returns first truthy value
const name = userInput || "Anonymous";

// ?? nullish coalescing: returns right side only if left is null/undefined
const count = 0;
count || 10;   // 10 (0 is falsy)
count ?? 10;   // 0 (0 is not null/undefined)
```

---

## Story

The Academy's Sorting Crystal needs a new classification algorithm. When a wizard steps forward, the crystal must assess their power level and house to determine their rank. Your job is to write that logic.

## Objective

Practice `if/else`, ternary operators, comparison and logical operators, and truthy/falsy values.

## Requirements

1. Write a function `classifyWizard(wizard)` that takes an object with `name`, `power`, and `house` properties and returns a rank string:
   - Power 100+ → `"Archmage"`
   - Power 50–99 → `"Battle Mage"`
   - Power 25–49 → `"Journeyman"`
   - Below 25 → `"Apprentice"`

2. Add a house bonus: wizards from `"Raven"` get +10 to their effective power before classification

3. Write a function `formatWizard(wizard)` that uses a **ternary** to return:
   - `"⚔️ Merlin (Battle Mage)"` if power >= 50
   - `"📖 Merlin (Apprentice)"` if power < 50

4. Test with the provided roster and log results

## Test Data

```js
const roster = [
  { name: "Merlin", power: 100, house: "Liondudes" },
  { name: "Luna", power: 45, house: "Raven" },
  { name: "Neville", power: 22, house: "Badger" },
  { name: "Morgana", power: 90, house: "Serpent" },
  { name: "Colin", power: 15, house: "Raven" },
  { name: "Draco", power: 60, house: "Serpent" },
];
```

## Acceptance Criteria

- [ ] `classifyWizard` uses `if/else if/else`
- [ ] Raven house bonus is applied correctly (Luna at 45 + 10 = 55 → "Battle Mage")
- [ ] `formatWizard` uses a ternary operator
- [ ] All 6 wizards are classified and logged
- [ ] Colin (power 15 + Raven bonus 10 = 25) lands exactly on the boundary → "Journeyman"

## Hints

<details>
<summary>Click to reveal hints</summary>

**Hint 1**: Calculate effective power first, then classify:
```js
let effectivePower = wizard.power;
if (wizard.house === "Raven") {
  effectivePower += 10;
}
```

**Hint 2**: Ternary syntax: `condition ? valueIfTrue : valueIfFalse`

**Hint 3**: You can nest ternaries but it's usually clearer to use `if/else` for more than two branches.

</details>

## Bonus

- Add a `switch` statement that returns a house motto for each house
- Handle an unknown house gracefully with a default case

---

[Solution](./solution/) | [Previous](../exercise-01-variables/) | [Next Exercise](../exercise-03-loops/)
