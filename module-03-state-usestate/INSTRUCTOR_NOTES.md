# Module 3: Instructor Notes

## Overview

This module introduces **state** — React's way of tracking values that change over time. Students learn the `useState` hook, controlled components, and how to build truly interactive UIs.

**Key Goal**: Students should understand that state is how React components "remember" things, and that calling the setter function triggers a re-render automatically.

---

## The Big Idea: Why State?

Before diving into syntax, establish **why** state matters:

1. **Props are read-only** — We can pass data down, but components can't change props
2. **Components need memory** — Track health after damage, mana after spells, input values as user types
3. **UI must stay in sync** — When data changes, the display should update automatically

The demo progression (manual → useState) makes this tangible: "See how annoying it is to call render() manually? useState does this for you!"

---

## Demo Walkthrough

### Demo 1: Manual Re-render (The Problem)

**Location**: `demo-01-manual-rerender/`

```bash
cd module-03-state-usestate/demo-01-manual-rerender
npm install
npm run dev
```

**What it demonstrates:**

- State stored in a module-level variable (`let count = 0`)
- Event handlers that update the variable and call `render()` manually
- The tedium and error-proneness of this approach

**Key teaching points:**

```jsx
// The old way (DON'T do this in real React)
let count = 0;

const render = () => {
  root.render(<App />);
};

// Every click: update variable, THEN remember to render
onClick={() => { count++; render(); }}
```

**Ask students:**

- "What happens if we forget to call `render()`?" (Nothing updates!)
- "Is this scalable with 10 pieces of state?" (No way!)

---

### Demo 2: useState (The Solution)

**Location**: `demo-02-usestate/`

```bash
cd module-03-state-usestate/demo-02-usestate
npm install
npm run dev
```

**Three examples in one:**

1. **Counter** — The "Hello World" of state
2. **Controlled Input** — Form input tied to state
3. **Conditional Rendering** — Show/hide based on state

**Walk through each section:**

```jsx
// 1. Counter
const [count, setCount] = useState(0);
// Click button → setCount(count + 1) → component re-renders automatically!

// 2. Controlled Input
const [name, setName] = useState("");
<input value={name} onChange={(e) => setName(e.target.value)} />;
// Every keystroke updates state → input always shows current state

// 3. Conditional Rendering
const [isVisible, setIsVisible] = useState(true);
{
  isVisible && <div>Secret content!</div>;
}
// Toggle button flips the boolean → content appears/disappears
```

**The "Aha!" moment:** When you call `setCount()`, React automatically re-renders the component with the new value. No manual `render()` calls needed!

---

## useState Explained

### The Syntax

```jsx
const [value, setValue] = useState(initialValue);
//     ↑        ↑                    ↑
//  Current   Setter             Starting
//   value   function             value
```

### Array Destructuring

Students may not know this syntax. Explain briefly:

```jsx
// useState returns an array: [currentValue, setterFunction]
// We destructure it into two variables

const result = useState(0);
const count = result[0]; // The current value
const setCount = result[1]; // The setter function

// Same thing, shorter:
const [count, setCount] = useState(0);
```

### Rules of useState

Drill these repeatedly:

| Rule              | Why                                                       |
| ----------------- | --------------------------------------------------------- |
| Call at top level | React tracks hooks by call order — can't be conditional   |
| Use the setter    | `count = 5` doesn't trigger re-render; `setCount(5)` does |
| Updates are async | New value available on next render, not immediately       |
| Don't mutate      | Create new objects/arrays instead of modifying            |

---

## Controlled Components

This is a crucial pattern for forms:

```jsx
// The input's value ALWAYS reflects state
<input
  value={name} // Display current state
  onChange={(e) => setName(e.target.value)} // Update state on change
/>
```

**Why "controlled"?**

- React controls the input's value (not the DOM)
- Single source of truth (state)
- Enables validation, formatting, syncing

**Common mistake:**

```jsx
// ❌ This creates an uncontrolled input (can't set initial value properly)
<input onChange={(e) => setName(e.target.value)} />

// ✅ Always include value={state}
<input value={name} onChange={(e) => setName(e.target.value)} />
```

---

## Quests Overview

### Quest 1: Multiple State (Training System)

**Difficulty**: ⭐⭐ Intermediate  
**Time estimate**: 25-30 minutes

Students create a wizard training interface with three stats (magicLevel, energy, mana) and buttons that update multiple pieces of state at once.

**What they practice:**

- Multiple `useState` calls
- Event handlers with state updates
- Conditional logic (preventing negative values)
- Displaying state values

**Common struggles:**

- Forgetting that each state needs its own `useState`
- Not understanding that `setX()` triggers re-render
- Confusing when to use `count` vs `setCount`

**Key teaching moment:**

```jsx
// You CAN call multiple setters in one handler
const handleTrain = () => {
  setMagicLevel(magicLevel + 5);
  setEnergy(energy - 20);
  // Both update, then ONE re-render happens
};
```

---

### Quest 2: Object State (Potion Brewing)

**Difficulty**: ⭐⭐ Intermediate  
**Time estimate**: 30-35 minutes

Students build a potion brewing interface with checkboxes for ingredients, derived calculations, and conditional rendering.

**What they practice:**

- Arrays in state (`selectedIngredients`)
- Controlled checkboxes
- Adding/removing from arrays immutably
- Derived values (total brew time)

**Common struggles:**

- Checkbox `checked` vs `value` props
- Immutable array updates (spread operator)
- Calculating derived values from state

**Key teaching moment:**

```jsx
// Adding to array (immutable)
setSelectedIngredients([...selectedIngredients, newItem]);

// Removing from array (immutable)
setSelectedIngredients(selectedIngredients.filter((x) => x !== itemToRemove));

// Derived value (NOT state — calculate from state!)
const totalBrewTime = selectedIngredients.reduce(
  (sum, ing) => sum + ing.brewTime,
  0,
);
```

---

> **Note**: Array state (add/remove/update) is covered in Module 4's bonus quest after students learn forms. This module focuses on basic state patterns.

---

## Teaching Sequence

### Suggested Flow

1. **Slides: State Introduction** (10-12 min)
   - Run from `slides/` folder: `npm install && npm run dev`
   - Cover: Why state, useState syntax, state vs props, controlled inputs
   - Use arrow keys to navigate

2. **Demo 1: The Problem** (10 min)
   - Show manual re-rendering approach
   - Emphasize the pain of calling `render()` everywhere
   - "Imagine doing this for 20 pieces of state!"

3. **Demo 2: The Solution** (15 min)
   - Walk through all three examples
   - Live code a modification (add a "Double" button to counter)
   - Show the automatic re-rendering

4. **Quest 1: Multiple State** (25-30 min)
   - Students build training interface
   - Circulate to help with setter function confusion
   - Common issue: trying to read new value immediately after setting

5. **Mini-lecture: Controlled Components** (5 min)
   - Show the input pattern
   - Explain why `value={}` is required
   - Show what happens without it (uncontrolled)

6. **Quest 2: Object State** (30-35 min)
   - Students build step-through potion brewer
   - Key: using spread operator for object updates
   - Common issue: mutating state directly

7. **Wrap-up** (5 min)
   - Recap: State is component memory, setters trigger re-renders
   - Preview: Module 4 covers forms and event handling
   - Note: Array state patterns are covered in Module 4's bonus quest

---

## Common Questions

**Q: Why can't I just do `count = count + 1`?**
A: That changes a variable, but React doesn't know about it. React only re-renders when you call the setter function (`setCount`). The setter tells React "hey, something changed, please re-render!"

**Q: Why is my new value not showing up immediately after `setState`?**
A: State updates are asynchronous. The new value is available on the NEXT render, not immediately after calling the setter. If you need to use the new value, calculate it first:

```jsx
const newCount = count + 1;
setCount(newCount);
console.log(newCount); // ✅ Use the calculated value
```

**Q: Can I have multiple useState calls?**
A: Yes! You can have as many as you need. Each one tracks a separate piece of state.

**Q: When should I use one object vs multiple useState calls?**
A:

- Related values that change together → one object
- Independent values → separate useState calls
- When in doubt, start with separate calls (simpler)

**Q: Why do I need `e.preventDefault()` in form submission?**
A: By default, HTML forms cause a page refresh when submitted. `e.preventDefault()` stops that behavior so React can handle the submission without losing all your state.

**Q: What's the difference between state and props?**
A:

- **Props**: Passed from parent, read-only, for configuration
- **State**: Owned by component, can change, for interactivity

---

## Troubleshooting

### "My button click does nothing"

- Check: Is the setter being called? (`setCount` not just `count`)
- Check: Is the handler attached? (`onClick={handleClick}` not `onclick`)
- Check: Console for errors

### "My input won't let me type"

- Missing `onChange` handler
- Or `onChange` isn't calling the setter
- Add: `onChange={(e) => setName(e.target.value)}`

### "My form refreshes the page"

- Missing `e.preventDefault()` in submit handler
- Or handler isn't attached to form's `onSubmit`

### "My array/object state isn't updating"

- Probably mutating instead of creating new:

```jsx
// ❌ Mutation (won't trigger re-render)
students.push(newStudent);
setStudents(students);

// ✅ New array (triggers re-render)
setStudents([...students, newStudent]);
```

### "State shows old value right after setting"

- This is expected! State updates are async
- New value available on next render
- Calculate the value first if you need it immediately

---

## Immutability Patterns

These are essential for array/object state:

### Arrays

```jsx
// Add item
setItems([...items, newItem]);

// Remove item by id
setItems(items.filter((item) => item.id !== targetId));

// Update item by id
setItems(
  items.map((item) =>
    item.id === targetId ? { ...item, name: "New Name" } : item,
  ),
);

// Update item at index
setItems(
  items.map((item, i) => (i === targetIndex ? { ...item, done: true } : item)),
);
```

### Objects

```jsx
// Update one property
setUser({ ...user, name: "New Name" });

// Update nested property
setUser({
  ...user,
  address: { ...user.address, city: "New City" },
});
```

---

## Files Reference

```
module-03-state-usestate/
├── README.md                    # Student-facing overview
├── INSTRUCTOR_NOTES.md          # This file
├── slides/                      # Slide deck for state intro
│   ├── package.json
│   └── src/App.jsx
├── demo-01-manual-rerender/     # The problem (manual re-render)
│   └── src/main.jsx
├── demo-02-usestate/            # The solution (useState hook)
│   └── src/App.jsx
├── quest-01-multiple-state/     # Training system (3 stats)
│   ├── README.md
│   ├── starter/
│   └── solution/
├── quest-02-object-state/       # Potion brewing (checkboxes)
│   ├── README.md
│   ├── starter/
│   └── solution/
└── (Array state moved to Module 4 bonus quest)
```

---

## Preparation Checklist

- [ ] Test `npm install` and `npm run dev` in all demo/quest folders
- [ ] Review quest solutions
- [ ] Prepare to explain array destructuring if students haven't seen it
- [ ] Have console open to show re-render behavior
- [ ] Know the immutability patterns cold (spread operator)
- [ ] Prepare examples of common mistakes (mutation, missing preventDefault)
- [ ] Test the slides: `cd slides && npm install && npm run dev`
