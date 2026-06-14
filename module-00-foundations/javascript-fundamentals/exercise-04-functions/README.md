# Exercise 4: Functions

## Functions

A **function** is a reusable block of code with a name (or a variable holding it). You define it once, then **call** it whenever you need that behavior — with different inputs if you use parameters. Functions keep programs organized and are everywhere in React (components, event handlers, hooks).

### Function Declarations

A **function declaration** starts with the `function` keyword followed by a name and parentheses. It's the traditional way to define a callable piece of logic.

```js
function castSpell(spellName) {
  return `${spellName} has been cast!`;
}

castSpell("Fireball"); // "Fireball has been cast!"
```

Declarations are **hoisted** — you can call them before they appear in the code.

### Function Expressions

A **function expression** creates a function value and usually assigns it to a variable (often with `const`). The function can be anonymous or named; either way, you're treating the function like any other value you store and pass around.

```js
const castSpell = function (spellName) {
  return `${spellName} has been cast!`;
};
```

Expressions are **not hoisted** — you must define them before calling.

### Arrow Functions

The concise syntax you'll use most in React:

```js
// Full form
const castSpell = (spellName) => {
  return `${spellName} has been cast!`;
};

// Implicit return (single expression)
const castSpell = (spellName) => `${spellName} has been cast!`;

// Single parameter — parentheses optional
const double = (n) => n * 2;

// No parameters
const roll = () => Math.floor(Math.random() * 6) + 1;

// Returning an object (wrap in parentheses)
const createWizard = (name) => ({ name, power: 100 });
```

### Parameters

**Parameters** are the named slots in a function's definition; **arguments** are the actual values you pass when you call it. You can give parameters default values so callers can omit them, and use **rest** (`...`) to gather any extra arguments into an array.

```js
// Default values
function greet(name = "stranger") {
  return `Hello, ${name}!`;
}
greet();        // "Hello, stranger!"
greet("Merlin"); // "Hello, Merlin!"

// Rest parameters (gather remaining args into an array)
function sumAll(...numbers) {
  return numbers.reduce((sum, n) => sum + n, 0);
}
sumAll(1, 2, 3, 4); // 10
```

### Callbacks

A function passed as an argument to another function:

```js
function repeatAction(times, action) {
  for (let i = 0; i < times; i++) {
    action(i);
  }
}

repeatAction(3, (i) => console.log(`Round ${i + 1}`));
// Round 1
// Round 2
// Round 3
```

You already saw callbacks with `map`, `filter`, `forEach`, and `reduce`.

### Closures

A function that remembers variables from its outer scope:

```js
function createCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter(10);
counter.increment(); // 11
counter.increment(); // 12
counter.getCount();  // 12
```

The inner functions "close over" the `count` variable — they remember it even after `createCounter` has finished running. This concept is fundamental to how React hooks work.

---

## Story

The Academy's Spell Workshop lets wizards forge new spells, build custom enchantment tools, and manage their mana reserves. You'll practise all the function patterns that come up constantly in React.

## Objective

Practice arrow functions, default parameters, rest parameters, callbacks, and closures.

## Requirements

### Part A: Arrow Functions & Defaults

1. Write an arrow function `createSpell(name, damage, element)` that returns an object `{ name, damage, element }`. Give `damage` a default of `10` and `element` a default of `"arcane"`.

2. Create these spells and log them:
   - `createSpell("Fireball", 50, "fire")`
   - `createSpell("Spark")` — should use both defaults
   - `createSpell("Ice Lance", 35)` — should default element only

### Part B: Your Own Map

3. Write a function `applyToAll(arr, fn)` that takes an array and a callback, and returns a new array with the callback applied to each element. (You're building your own `map`.)

4. Use `applyToAll` to:
   - Double every number in `[2, 5, 10]`
   - Uppercase every string in `["fireball", "heal", "shield"]`

### Part C: Closures

5. Write a function `createManaPool(startingMana)` that returns an object with:
   - `cast(cost)` — deducts `cost` from mana and returns `true`, or returns `false` if not enough mana
   - `remaining()` — returns current mana

6. Create a pool with 50 mana, cast three spells costing 20, 20, and 20, and log what happens.

## Acceptance Criteria

- [ ] `createSpell` is an arrow function with default parameters
- [ ] Spells are returned as objects using shorthand `{ name, damage, element }`
- [ ] `applyToAll` takes a callback and returns a new array
- [ ] `applyToAll` does not use `.map()` internally (use a `for` loop)
- [ ] `createManaPool` uses a closure to keep mana private
- [ ] Third cast (20 mana when only 10 left) returns `false`

## Hints

<details>
<summary>Click to reveal hints</summary>

**Hint 1**: Arrow function returning an object needs parentheses:
```js
const createSpell = (name, damage = 10, element = "arcane") => ({ name, damage, element });
```

**Hint 2**: `applyToAll` is just a loop that pushes transformed values:
```js
function applyToAll(arr, fn) {
  const result = [];
  for (const item of arr) {
    result.push(fn(item));
  }
  return result;
}
```

**Hint 3**: Closures capture variables from the outer scope:
```js
function createManaPool(startingMana) {
  let mana = startingMana;
  return {
    cast(cost) { /* use and modify mana here */ },
    remaining() { return mana; },
  };
}
```

</details>

## Bonus

- Add a `rest` parameter version: `sumAll(...numbers)` that sums any number of arguments
- Add a `meditate(amount)` method to the mana pool that restores mana (but never above the starting value)

---

[Solution](./solution/) | [Previous](../exercise-03-loops/) | [Next Exercise](../exercise-05-objects/)
