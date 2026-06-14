# Exercise 3: Loops and Array Methods

## Loops

**Loops** repeat a block of code more than once — for example, printing every item in a list or draining mana until it hits zero. JavaScript offers several loop styles; pick the one that matches whether you know how many times you'll repeat or you're repeating until a condition changes.

### for Loop

The classic loop — you control the counter:

```js
const spells = ["Fireball", "Ice Shard", "Lightning", "Heal"];

for (let i = 0; i < spells.length; i++) {
  console.log(`${i + 1}. ${spells[i]}`);
}
// 1. Fireball
// 2. Ice Shard
// 3. Lightning
// 4. Heal
```

### for...of

Cleaner iteration over arrays (and other iterables):

```js
const spells = ["Fireball", "Ice Shard", "Lightning"];

for (const spell of spells) {
  console.log(spell);
}
```

### for...in

Iterates over object keys — use this for objects, not arrays:

```js
const wizard = {
  name: "Merlin",
  power: 100,
  house: "Liondudes",
};

for (const key in wizard) {
  console.log(`${key}: ${wizard[key]}`);
}
// name: Merlin
// power: 100
// house: Liondudes
```

### while / do...while

**`while`** keeps running its body as long as the condition at the top stays true — useful when you don't know in advance how many iterations you need. **`do...while`** is similar but checks the condition *after* each run, so the body always executes at least once.

```js
// while — check first, then run
let mana = 100;
while (mana > 0) {
  console.log(`Mana: ${mana}`);
  mana -= 30;
}

// do...while — run first, then check (runs at least once)
let attempts = 0;
do {
  console.log(`Attempt ${attempts + 1}`);
  attempts++;
} while (attempts < 3);
```

### Array Methods (The Modern Way)

In practice, you'll use array methods far more than traditional loops — especially in React:

#### forEach

**`forEach`** runs a function once for every element in an array. It doesn't return a new array — it's for doing something with each item (like logging). If you need a transformed array, use `map` instead.

```js
const spells = ["Fireball", "Ice Shard", "Lightning"];

spells.forEach((spell, index) => {
  console.log(`${index + 1}. ${spell}`);
});
```

#### map — Transform Each Element

Returns a new array. This is the most important array method for React:

```js
const spells = ["Fireball", "Ice Shard", "Lightning"];
const shoutedSpells = spells.map((spell) => spell.toUpperCase());
// ["FIREBALL", "ICE SHARD", "LIGHTNING"]

const wizards = [
  { name: "Merlin", power: 100 },
  { name: "Morgana", power: 90 },
];
const names = wizards.map((w) => w.name);
// ["Merlin", "Morgana"]
```

#### filter — Keep Matching Elements

```js
const wizards = [
  { name: "Merlin", power: 100 },
  { name: "Apprentice", power: 20 },
  { name: "Morgana", power: 90 },
];

const powerful = wizards.filter((w) => w.power >= 50);
// [{ name: "Merlin", power: 100 }, { name: "Morgana", power: 90 }]
```

#### find — Get First Match

```js
const merlin = wizards.find((w) => w.name === "Merlin");
// { name: "Merlin", power: 100 }
```

#### reduce — Accumulate Into a Single Value

```js
const scores = [10, 25, 15, 30];
const total = scores.reduce((sum, score) => sum + score, 0);
// 80

const wizards = [
  { name: "Merlin", house: "Liondudes" },
  { name: "Morgana", house: "Serpent" },
  { name: "Ron", house: "Liondudes" },
];

const byHouse = wizards.reduce((groups, wizard) => {
  const house = wizard.house;
  groups[house] = groups[house] || [];
  groups[house].push(wizard);
  return groups;
}, {});
// { Liondudes: [{...}, {...}], Serpent: [{...}] }
```

#### Chaining Methods

Because methods like `filter` and `map` return new arrays, you can **chain** them: each call's return value becomes the input to the next dot. That lets you express a pipeline (e.g. "keep active wizards, then take names, then sort") as one left-to-right expression.

```js
const wizards = [
  { name: "Merlin", power: 100, active: true },
  { name: "Apprentice", power: 20, active: true },
  { name: "Morgana", power: 90, active: false },
  { name: "Gandalf", power: 150, active: true },
];

const topActiveNames = wizards
  .filter((w) => w.active)
  .filter((w) => w.power >= 50)
  .map((w) => w.name)
  .sort();
// ["Gandalf", "Merlin"]
```

---

## Story

The Academy Council has requested a full analysis of the student roster. They need names, power rankings, house groupings, and totals — all generated from a single data array. Time to put array methods to work.

## Objective

Practice `map`, `filter`, `find`, `reduce`, method chaining, and `for...of` / `for...in` loops.

## Requirements

Given this roster:

```js
const roster = [
  { name: "Merlin", power: 100, house: "Liondudes" },
  { name: "Morgana", power: 90, house: "Serpent" },
  { name: "Ron", power: 30, house: "Liondudes" },
  { name: "Luna", power: 75, house: "Raven" },
  { name: "Draco", power: 60, house: "Serpent" },
  { name: "Neville", power: 40, house: "Badger" },
];
```

Complete these tasks using array methods (not manual `for` loops):

1. **Names only** — get an array of just the wizard names
2. **Powerful wizards** — find all wizards with power above 50
3. **Find Luna** — find the wizard object named "Luna"
4. **Total power** — get the sum of all wizards' power levels
5. **Group by house** — create an object where each key is a house name and each value is an array of wizards from that house
6. **Liondudes names, sorted** — get the names of Liondudes members, sorted alphabetically

## Acceptance Criteria

- [ ] Task 1 uses `map`
- [ ] Task 2 uses `filter`
- [ ] Task 3 uses `find`
- [ ] Task 4 uses `reduce`
- [ ] Task 5 uses `reduce` to build a grouped object
- [ ] Task 6 chains `filter`, `map`, and `sort`
- [ ] All results logged to the page

## Hints

<details>
<summary>Click to reveal hints</summary>

**Hint 1**: `map` transforms: `roster.map(w => w.name)`

**Hint 2**: `reduce` signature: `array.reduce((accumulator, current) => ..., initialValue)`

**Hint 3**: For grouping, start with an empty object `{}` as the initial value:
```js
roster.reduce((groups, wizard) => {
  const key = wizard.house;
  groups[key] = groups[key] || [];
  groups[key].push(wizard);
  return groups;
}, {})
```

**Hint 4**: Chain methods left to right: `roster.filter(...).map(...).sort()`

</details>

## Bonus

- Find the wizard with the highest power using `reduce`
- Count wizards per house (object with house → number)
- Use `for...in` to iterate over the grouped-by-house object and log each house and its members

---

[Solution](./solution/) | [Previous](../exercise-02-conditionals/) | [Next Exercise](../exercise-04-functions/)
