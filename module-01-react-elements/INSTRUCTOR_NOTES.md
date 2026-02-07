# Module 1: Instructor Notes

## Overview

This module introduces React fundamentals using `React.createElement()` without JSX. Students learn how React actually works under the hood before the syntactic sugar of JSX is introduced in Module 2.

**Key Goal**: Students should understand that React elements are just JavaScript objects, and `createElement()` is the foundation that JSX compiles to.

---

## Demos

### Demo 1: Basic createElement (`demo/`)

**What to show:**
- Open `index.html` in browser
- Walk through `app.js` line by line
- Show the three arguments to `createElement(type, props, children)`
- Demonstrate nesting elements
- Show how `createRoot()` and `render()` work

**Key points to emphasize:**
```js
// This is just a function call that returns an object!
const element = React.createElement('h1', { className: 'title' }, 'Hello');

// The object looks something like:
// { type: 'h1', props: { className: 'title', children: 'Hello' } }
```

**Live coding suggestion:**
- Create a simple element together
- Add a child element
- Show what happens if you `console.log()` the element

---

### Demo 2: Virtual DOM Speed (`demo-02-virtual-dom/`)

**What to show:**
- Open `index.html` in browser
- Click "Render with DOM" and "Render with React" to show initial render
- Click "Change Random Value → Then Render Both"
- Point out the stats: DOM rebuilds ALL 10,000 nodes, React updates only 1

**Key points to emphasize:**
- Traditional DOM: destroys and rebuilds everything
- React Virtual DOM: diffs old vs new, patches only what changed
- This is WHY React is fast for dynamic UIs
- Keys matter! (show the `key={item.id}` in code)

**Console demo:**
```js
// Change a value manually
items[0].value = 999999;
// Then click render buttons to see the difference
```

---

### Demo 3: Rendering Lists (`demo-03-lists/`)

**What to show:**
- Three examples of using `.map()` with createElement
- Simple strings → list items
- Objects → complex cards
- Using the index parameter

**Key points to emphasize:**
```js
// The pattern: array.map(item => createElement(...))
spells.map(spell => h('li', { key: spell.id }, spell.name))
```

- Always provide a `key` prop when rendering lists
- Use unique IDs as keys when available
- Index is okay for static lists, but problematic for dynamic ones

**Common question**: "Why do we need keys?"
- React uses keys to track which items changed/moved/were deleted
- Without keys, React re-renders the entire list
- Demo: remove the key and show the console warning

---

### Demo 4: Events and Reactivity (`demo-04-events/`)

**What to show:**
- Counter with increment/decrement/reset buttons
- Text input that updates a greeting in real-time
- Range slider with visual power bar
- A "wizard card" that combines all values

**Key points to emphasize:**
```js
// The reactivity pattern (before useState):
// 1. Store data in variables
let count = 0;

// 2. Event handler updates the variable
onClick: () => {
  count = count + 1;  // Update state
  render();           // Re-render manually!
}
```

- React uses camelCase event names: `onClick` not `onclick`
- `onChange` for text inputs, `onInput` for sliders (instant feedback)
- Event handlers receive an `event` object with `event.target.value`
- **Manual re-render pattern** — call `render()` after state changes

**Live coding suggestion:**
- Add a new piece of state (e.g., `wizardLevel`)
- Create an input for it
- Show how forgetting `render()` means nothing updates

**Transition to Quest 3:**
"Now you'll build a spell calculator that uses these same patterns. You'll have sliders that affect spell power and buttons that trigger calculations."

---

## Quests Overview

### Quest 1: Wizard Identity
**Difficulty**: Beginner
**Time estimate**: 15-20 minutes

Students create a single wizard object and render it as a card.

**What they practice:**
- Creating JavaScript objects
- Basic `createElement()` calls
- Nesting elements
- Rendering to the DOM

**Common struggles:**
- Forgetting the `null` for props when there are none
- Nesting syntax confusion

---

### Quest 2: Student Registry
**Difficulty**: Beginner-Intermediate
**Time estimate**: 20-30 minutes

Students render an array of student objects as a list.

**What they practice:**
- Arrays of objects
- Using `.map()` to transform data into elements
- Keys for list items

**Common struggles:**
- Forgetting to return from the map callback
- Missing keys (show them the console warning)
- Arrow function syntax with implicit return

---

### Quest 3: Spell Calculator
**Difficulty**: Intermediate
**Time estimate**: 25-35 minutes

Students build an interactive calculator with sliders.

**What they practice:**
- Functions that calculate values
- Event handling (`onInput`, `onClick`)
- Re-rendering when data changes
- More complex element structures

**Common struggles:**
- Understanding how to trigger re-renders (manual re-render pattern)
- Event handler syntax in createElement
- Debugging calculation logic

---

## Teaching Sequence

### Suggested Flow

1. **Introduction** (5 min)
   - Why learn createElement? (It's what JSX compiles to)
   - React elements are just objects
   - No build tools needed for this module

2. **Demo 1: Basic createElement** (15 min)
   - Live code a simple element
   - Show nesting
   - Render to the DOM

3. **Quest 1** (15-20 min)
   - Students work independently
   - Circulate and help with syntax issues

4. **Demo 3: Lists with Map** (10 min)
   - Show the map pattern
   - Emphasize keys

5. **Quest 2** (20-30 min)
   - Students work independently
   - Help with map/key issues

6. **Demo 2: Virtual DOM** (10 min)
   - Show why React is fast
   - Explain diffing conceptually

7. **Demo 4: Events and Reactivity** (15 min)
   - Show click events and counter
   - Show input events and live updates
   - Emphasize the manual re-render pattern

8. **Quest 3** (25-35 min)
   - More challenging, may need hints
   - Focus on the re-render pattern

9. **Wrap-up** (5 min)
   - Recap: createElement is the foundation
   - Preview: JSX makes this much easier (Module 2)

---

## Common Questions

**Q: Why not just teach JSX from the start?**
A: Understanding createElement helps students debug JSX issues and understand what React is actually doing. It also reinforces that "it's just JavaScript."

**Q: When would I actually use createElement in real code?**
A: Rarely directly, but it's useful for:
- Dynamic element types: `createElement(isButton ? 'button' : 'a', ...)`
- Library code
- Understanding build output

**Q: Why does React need keys?**
A: Keys help React identify which items changed, were added, or removed. Without keys, React has to re-render the entire list. With keys, it can surgically update only what changed.

**Q: What's the difference between `render()` and `createRoot().render()`?**
A: `createRoot()` is the React 18 way. The old `ReactDOM.render()` is deprecated. Always use `createRoot()` for new code.

---

## Troubleshooting

### "React is not defined"
- Check that the CDN scripts are loaded before app.js
- Check for typos in the script src URLs
- Ensure the browser isn't blocking CDN requests

### "Cannot read property 'render' of null"
- The `#root` element doesn't exist
- Script is running before DOM is ready
- Check the element ID matches

### Console warning about keys
- Show students where to add the `key` prop
- Explain why keys matter (see Demo 2)

### Elements not updating
- Students need to call `render()` again after changing data
- This is intentional — state management comes in Module 4

---

## Files Reference

```
module-01-react-elements/
├── demo/                    # Basic createElement demo
│   ├── index.html
│   └── app.js
├── demo-02-virtual-dom/     # Virtual DOM speed comparison
│   └── index.html
├── demo-03-lists/           # Rendering lists with map
│   ├── index.html
│   └── app.js
├── demo-04-events/          # Events and reactivity
│   ├── index.html
│   └── app.js
├── quest-01-wizard-identity/
│   ├── README.md            # Quest instructions
│   ├── starter/             # Starting point for students
│   └── solution/            # Reference solution
├── quest-02-student-registry/
│   ├── README.md
│   ├── starter/
│   └── solution/
├── quest-03-spell-calculator/
│   ├── README.md
│   ├── starter/
│   └── solution/
├── README.md                # Student-facing module overview
└── INSTRUCTOR_NOTES.md      # This file
```

---

## Preparation Checklist

- [ ] Test all demos in browser
- [ ] Review quest solutions
- [ ] Have console open to show errors/warnings
- [ ] Prepare to live-code basic examples
- [ ] Know the common gotchas for each quest
