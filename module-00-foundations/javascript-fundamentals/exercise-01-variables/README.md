# Exercise 1: Variables

## Variables

A **variable** is a named place in memory where you store a value so you can read or update it later. You pick a name, assign a value with `=`, and JavaScript keeps track of it for you.

JavaScript has three ways to declare variables:

### `const` — Use by Default

```js
const name = "Merlin";
const maxSpells = 10;
const isWizard = true;

name = "Gandalf"; // Error: Assignment to constant variable
```

`const` doesn't mean the value is immutable — it means the **binding** can't be reassigned. Objects and arrays declared with `const` can still be modified:

```js
const wizard = { name: "Merlin", power: 100 };
wizard.power = 150; // This is fine
wizard = {}; // Error: can't reassign
```

### `let` — When You Need Reassignment

```js
let score = 0;
score = 10; // Fine
score += 5; // Fine

let health = 100;
health -= 25;
```

### `var` — Avoid This

`var` is function-scoped rather than block-scoped, which causes subtle bugs:

```js
// var leaks out of blocks
if (true) {
  var leaked = "oops";
}
console.log(leaked); // "oops" — still accessible

// let stays in its block
if (true) {
  let contained = "safe";
}
console.log(contained); // Error: not defined
```

**Rule of thumb:** Use `const` by default. Use `let` when you need to reassign. Never use `var`.

### Data Types

JavaScript has seven primitive types:

```js
const name = "Merlin";        // string
const power = 100;            // number
const isWizard = true;        // boolean
const nothing = null;          // null (intentional absence)
const notSet = undefined;      // undefined (not yet assigned)
const id = Symbol("unique");   // symbol
const bigNum = 9007199254740991n; // bigint
```

And one complex type:

```js
const wizard = { name: "Merlin" }; // object (includes arrays, functions, dates)
```

### Template Literals

Use backticks for string interpolation:

```js
const name = "Merlin";
const power = 100;

const greeting = `${name} has power level ${power}`;
const multiline = `
  Name: ${name}
  Power: ${power}
  Rating: ${power > 50 ? "Strong" : "Weak"}
`;
```

---

## Story

Every wizard at the Arcane Academy starts with a character sheet. Your job is to build one using JavaScript variables - choosing the right declaration for each value based on whether it will change.

## Objective

Practice `const`, `let`, data types, and template literals by creating and modifying a wizard's stats.

## Requirements

1. Declare variables for a wizard:
   - `name` - a string (won't change)
   - `health` - a number starting at 100 (will change)
   - `mana` - a number starting at 50 (will change)
   - `spells` - an array of at least 3 spell names (will be added to)
   - `inCombat` - a boolean, starts `false`

2. Use the correct declaration (`const` vs `let`) for each

3. Simulate a battle round:
   - Take 25 damage (reduce health)
   - Cast a spell for 15 mana (reduce mana)
   - Learn a new spell (add to the array)
   - Enter combat (set `inCombat` to `true`)

4. Log a summary using a template literal:
   ```
   Merlin - HP: 75 / Mana: 35 - Spells: Fireball, Heal, Shield, Barrier - In Combat: true
   ```

## Acceptance Criteria

- [ ] All variables use `const` or `let` appropriately
- [ ] No use of `var`
- [ ] Health and mana are modified after declaration
- [ ] A new spell is added to the array
- [ ] Summary uses a template literal with `${}` interpolation
- [ ] Output displays in the browser

## Hints

<details>
<summary>Click to reveal hints</summary>

**Hint 1**: `const` doesn't mean the value can't change - it means the binding can't be reassigned. Arrays and objects declared with `const` can still be modified with methods like `.push()`.

**Hint 2**: Use `.join(", ")` to turn an array into a comma-separated string.

**Hint 3**: Template literals use backticks, not quotes: `` `Hello ${name}` ``

</details>

## Bonus

- Add a `level` that starts at 1
- After the battle round, gain a level
- Display a different title based on level: 1-5 = "Apprentice", 6-10 = "Journeyman", 11+ = "Master"

---

[Solution](./solution/) | [Next Exercise](../exercise-02-conditionals/)
