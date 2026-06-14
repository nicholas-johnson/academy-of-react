# Exercise 5: Objects

## Objects

An **object** groups related data (and optionally behavior) under named **keys**. Instead of many separate variables, you use one value with properties like `wizard.name` or `wizard.power`. JSON-style data from APIs and React props are both object-shaped.

### Object Literals

An **object literal** is the `{ key: value, ... }` syntax: curly braces, comma-separated properties, keys are usually strings (written without quotes when they're simple identifiers). You read a property with dot notation or brackets.

```js
const wizard = {
  name: "Merlin",
  power: 100,
  house: "Liondudes",
  spells: ["Fireball", "Lightning"],
};

// Access properties
wizard.name;          // "Merlin"
wizard["power"];      // 100

// Add / modify properties
wizard.level = 50;
wizard.power = 120;

// Delete properties
delete wizard.level;
```

### Shorthand Properties

When the variable name matches the key:

```js
const name = "Merlin";
const power = 100;

// Long form
const wizard = { name: name, power: power };

// Shorthand
const wizard = { name, power };
```

### Computed Property Names

Sometimes the property name isn't known until runtime — it's stored in a variable. **Computed property names** use square brackets in the object literal (`[expression]`) so the key is whatever that expression evaluates to.

```js
const field = "house";
const wizard = {
  name: "Merlin",
  [field]: "Liondudes",
};
// { name: "Merlin", house: "Liondudes" }
```

### Methods

Functions as object properties:

```js
const wizard = {
  name: "Merlin",
  mana: 100,
  castSpell(cost) {
    this.mana -= cost;
    return `${this.name} casts a spell! Mana: ${this.mana}`;
  },
};

wizard.castSpell(30); // "Merlin casts a spell! Mana: 70"
```

### Destructuring

Extract values from objects into variables — you'll use this everywhere in React:

```js
const wizard = {
  name: "Merlin",
  power: 100,
  house: "Liondudes",
};

// Destructure specific properties
const { name, power } = wizard;
console.log(name);  // "Merlin"
console.log(power); // 100

// Rename during destructuring
const { name: wizardName, house: wizardHouse } = wizard;

// Default values
const { level = 1 } = wizard; // level is 1 (not in wizard)

// Nested destructuring
const academy = {
  name: "Wizard Academy",
  location: { city: "London", country: "UK" },
};
const {
  location: { city },
} = academy;
console.log(city); // "London"
```

### Array Destructuring

**Array destructuring** pulls values out of an array by **position** — same idea as object destructuring, but order matters. The first variable matches index `0`, the second index `1`, and you can skip slots or use `...rest` to collect the remainder.

```js
const spells = ["Fireball", "Ice Shard", "Lightning"];

const [first, second] = spells;
// first = "Fireball", second = "Ice Shard"

// Skip elements
const [, , third] = spells;
// third = "Lightning"

// Rest element
const [primary, ...rest] = spells;
// primary = "Fireball", rest = ["Ice Shard", "Lightning"]

// Swap variables
let a = 1;
let b = 2;
[a, b] = [b, a];
// a = 2, b = 1
```

### Spread Operator

Copies elements from one object or array into another:

```js
// Spread arrays
const basic = ["Fireball", "Heal"];
const advanced = ["Lightning", "Teleport"];
const allSpells = [...basic, ...advanced];
// ["Fireball", "Heal", "Lightning", "Teleport"]

// Add to array without mutating
const withNewSpell = [...basic, "Shield"];

// Spread objects
const wizard = { name: "Merlin", power: 100 };
const updated = { ...wizard, power: 150, level: 50 };
// { name: "Merlin", power: 150, level: 50 }
```

This is how you update state in React — never mutate, always spread:

```js
// Updating an object
const newWizard = { ...wizard, power: wizard.power + 10 };

// Updating an array
const newSpells = [...spells, "New Spell"];
const withoutFirst = spells.filter((_, i) => i !== 0);
```

### Optional Chaining

Safely access nested properties that might not exist:

```js
const wizard = {
  name: "Merlin",
  familiar: {
    name: "Archimedes",
    type: "owl",
  },
};

// Without optional chaining — crashes if familiar is null
wizard.familiar.name; // "Archimedes"

// With optional chaining — returns undefined instead of crashing
wizard.familiar?.name;   // "Archimedes"
wizard.pet?.name;        // undefined (no crash)
wizard.pet?.name ?? "No pet"; // "No pet"
```

### Useful Object Methods

JavaScript provides **static helpers** on `Object` to inspect an object: list keys, list values, or get `[key, value]` pairs. They're handy when you need to loop or serialize data without hard-coding every property name.

```js
const wizard = { name: "Merlin", power: 100, house: "Liondudes" };

// Get all keys
Object.keys(wizard);   // ["name", "power", "house"]

// Get all values
Object.values(wizard);  // ["Merlin", 100, "Liondudes"]

// Get key-value pairs
Object.entries(wizard);
// [["name", "Merlin"], ["power", 100], ["house", "Liondudes"]]

// Check if key exists
"name" in wizard;      // true
wizard.hasOwnProperty("name"); // true
```

---

## Story

A wizard's gear is sacred — never modify it directly. At the Academy, all inventory changes must produce a *new* record, keeping the original intact for the Archive. This is the same immutable-update pattern you'll use for React state.

## Objective

Practice destructuring, spread operator, and immutable object/array updates.

## Starting Data

```js
const wizard = {
  name: "Merlin",
  stats: { power: 100, defense: 50 },
  spells: ["Fireball", "Heal"],
  equipment: {
    weapon: "Staff of Ages",
    armor: "Enchanted Robes",
  },
};
```

## Requirements

Using **spread** and **without mutating the original**:

1. Create `wizard2` with power increased to 120 (nested update inside `stats`)
2. Create `wizard3` with "Shield" added to spells
3. Create `wizard4` with the weapon changed to "Elder Wand" (nested update inside `equipment`)
4. Create `wizard5` with "Fireball" removed from spells (use `filter`)
5. Use **destructuring** to extract:
   - `name` from the wizard
   - `power` from `stats`
   - The first spell as `primarySpell` (array destructuring)

After each step, verify the original `wizard` is unchanged.

## Acceptance Criteria

- [ ] All updates use spread (`...`) — no direct mutation
- [ ] `wizard.stats.power` is still 100 after creating `wizard2`
- [ ] `wizard.spells` still has 2 items after creating `wizard3`
- [ ] `wizard.equipment.weapon` is still "Staff of Ages" after creating `wizard4`
- [ ] Destructuring extracts `name`, `power`, and `primarySpell` correctly
- [ ] All results logged to the page

## Hints

<details>
<summary>Click to reveal hints</summary>

**Hint 1**: Nested spread for updating `stats`:
```js
const wizard2 = {
  ...wizard,
  stats: { ...wizard.stats, power: 120 },
};
```

**Hint 2**: Adding to an array without mutating:
```js
const wizard3 = {
  ...wizard,
  spells: [...wizard.spells, "Shield"],
};
```

**Hint 3**: Removing from an array without mutating:
```js
const wizard5 = {
  ...wizard,
  spells: wizard.spells.filter(s => s !== "Fireball"),
};
```

**Hint 4**: Nested destructuring:
```js
const { name, stats: { power } } = wizard;
const [primarySpell] = wizard.spells;
```

</details>

## Bonus

- Create `wizard6` that updates *both* power to 200 *and* adds "Teleport" to spells in a single spread expression
- Use `Object.freeze()` on the original wizard and confirm that direct mutation throws an error (in strict mode) while spread still works

---

[Solution](./solution/) | [Previous](../exercise-04-functions/) | [Back to JavaScript Fundamentals](../)
