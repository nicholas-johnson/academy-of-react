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

## Quests Overview

### Quest 1: Basic Elements
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

### Quest 2: Rendering Arrays
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

## Teaching Sequence

### Suggested Flow

1. **Slides: Course Introduction** (15 min)
   - Run from `slides/` folder: `npm install && npm run dev`
   - Cover: What is React, Why React, Course structure, Resources
   - Set expectations for the module
   - Use arrow keys to navigate

2. **Introduction to createElement** (5 min)
   - Why learn createElement? (It's what JSX compiles to)
   - React elements are just objects
   - No build tools needed for this module

3. **Demo 1: Basic createElement** (15 min)
   - Live code a simple element
   - Show nesting
   - Render to the DOM

4. **Quest 1** (15-20 min)
   - Students work independently
   - Circulate and help with syntax issues

5. **Demo 2: Virtual DOM** (10 min)
   - Show why React is fast
   - Explain diffing conceptually

6. **Demo 3: Lists with Map** (10 min)
   - Show the map pattern
   - Emphasize keys

7. **Quest 2** (20-30 min)
   - Students work independently
   - Help with map/key issues

8. **Wrap-up** (5 min)
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
- This is intentional — state management comes in Module 3

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
├── quest-01-basic-elements/
│   ├── README.md            # Quest instructions
│   ├── starter/             # Starting point for students
│   └── solution/            # Reference solution
├── quest-02-rendering-arrays/
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
