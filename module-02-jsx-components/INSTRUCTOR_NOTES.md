# Module 2: Instructor Notes

## Overview

This module transitions students from raw `createElement()` to JSX and introduces modern React development with Vite. Students learn that JSX is syntactic sugar that compiles to the `createElement()` calls they already know.

**Key Goal**: Students should understand that JSX is just a more readable way to write `createElement()`, and they should be comfortable with the Vite development workflow.

---

## Big Transition: CDN → Vite

This is a significant shift from Module 1. Take time to:

1. **Explain why** — CDN + file:// worked for learning, but has CORS issues and isn't how pros work
2. **Walk through setup** — Run `npm install` and `npm run dev` together as a class
3. **Show HMR** — Edit a file, save, watch the browser update instantly (this is the "wow" moment!)

**Common student confusion:**

- "Why do I need a terminal now?"
- "What is npm?"
- "Why can't I just open the HTML file?"

**Answer**: Modern JavaScript development uses build tools. Vite compiles JSX → JavaScript, bundles your code, and runs a dev server. This is how every professional React project works.

---

## Demo Walkthrough

### Demo: JSX and Components (`demo/`)

**Setup:**

```bash
cd module-02-jsx-components/demo
npm install
npm run dev
```

**What to show:**

1. **Project structure** — Point out `package.json`, `vite.config.js`, `src/` folder
2. **Entry point chain**: `index.html` → `src/main.jsx` → `src/App.jsx`
3. **The StudentCard component** — A function that returns JSX
4. **Props** — Data passed to components like HTML attributes
5. **Live editing** — Change something in App.jsx, save, watch browser update

**Key points to emphasize:**

```jsx
// This JSX:
<h1>Hello</h1>;

// Compiles to this (what you learned in Module 1):
React.createElement("h1", null, "Hello");
```

**Live coding suggestion:**

- Add a new prop to StudentCard (e.g., `specialty`)
- Show how it flows from usage → props parameter → JSX output
- Break something intentionally to show error messages

---

## JSX Rules to Drill

These cause the most errors. Emphasize them repeatedly:

### 1. Single Parent Element

```jsx
// BAD: Won't work:
return (
  <h1>Title</h1>
  <p>Text</p>
)

// - Wrap in a parent:
return (
  <div>
    <h1>Title</h1>
    <p>Text</p>
  </div>
)

// - Or use a Fragment:
return (
  <>
    <h1>Title</h1>
    <p>Text</p>
  </>
)
```

### 2. Curly Braces for JavaScript

```jsx
// Variables:
<h1>{student.name}</h1>

// Expressions:
<p>Power: {level * 2}</p>

// NOT for strings (just use quotes):
<p className="card">  // - Not className={"card"}
```

### 3. className, not class

```jsx
<div className="card">  // - React
<div class="card">      // BAD: HTML (won't work)
```

### 4. Self-Closing Tags

```jsx
<img src="photo.jpg" />  // - Must self-close
<br />                    // - Must self-close
<input type="text" />    // - Must self-close
```

---

## Quests Overview

### Quest 1: JSX Conversion

**Difficulty**: Beginner  
**Time estimate**: 20-25 minutes

Students convert their Module 1 createElement code to JSX.

**What they practice:**

- JSX syntax
- Vite project setup
- ES module imports
- className and curly braces

**Common struggles:**

- Forgetting `npm install` before `npm run dev`
- Mixing up when to use `{}` vs quotes
- Not understanding file structure

**Tip**: Have them open their Module 1 solution side-by-side for reference.

---

### Quest 2: Props Basics

**Difficulty**: Beginner-Intermediate  
**Time estimate**: 25-30 minutes

Students create their first reusable component with props.

**What they practice:**

- Function components
- Props (receiving and using)
- Component reusability
- Numbers as props need `{}`

**Common struggles:**

- Forgetting to pass props when using the component
- Confusing `props.name` with just `name`
- String vs number props: `manaCost={20}` not `manaCost="20"`

**Key teaching moment:**

```jsx
// Props flow DOWN from parent to child
<SpellCard name="Fireball" power={35} />
          ↓
function SpellCard(props) {
  return <h3>{props.name}</h3>  // "Fireball"
}
```

---

### Quest 3: Component Lists

**Difficulty**: Intermediate  
**Time estimate**: 30-35 minutes

Students render a list of components using `.map()` and handle arrays as props.

**What they practice:**

- Arrays as props
- `.map()` to render lists
- Keys for list items
- Props destructuring
- Nested `.map()` (for ingredients)

**Common struggles:**

- Forgetting the `key` prop (show console warning)
- Not returning from the map callback
- Nested map for ingredients array

**Key teaching moment:**

```jsx
// Outer map: render each potion
{
  potions.map((potion) => <PotionCard key={potion.name} {...potion} />);
}

// Inner map (inside PotionCard): render each ingredient
{
  ingredients.map((ing, i) => <li key={i}>{ing}</li>);
}
```

---

## Teaching Sequence

### Suggested Flow

1. **Slides: JSX Introduction** (10 min)
   - Run from `slides/` folder: `npm install && npm run dev`
   - Cover: Why JSX, the 4 rules, Vite intro
   - Use arrow keys to navigate

2. **Setup + First Look** (15 min)
   - Walk through `npm install` and `npm run dev` together
   - Show HMR — edit and save to see instant updates
   - Point out project structure

3. **Demo: JSX Basics** (15 min)
   - Walk through App.jsx
   - Show createElement ↔ JSX equivalence
   - Emphasize the four JSX rules
   - Live code a small addition

4. **Quest 1** (20-25 min)
   - Students convert Module 1 code to JSX
   - Circulate to help with setup issues
   - Common issue: forgetting `npm install`

5. **Demo: Components and Props** (10 min)
   - Show StudentCard component
   - Explain props as "function arguments for components"
   - Show destructuring: `function Card({ name, level })`

6. **Quest 2** (25-30 min)
   - Students create WizardCard component
   - Help with props confusion
   - Emphasize number props need `{}`

7. **Demo: Lists and Keys** (10 min)
   - Show `.map()` pattern for lists
   - Explain why keys matter
   - Show the console warning without keys

8. **Quest 3** (30-35 min)
   - Students build PotionCard with array rendering
   - Two levels of `.map()` — potions and ingredients
   - Help with key placement

9. **Wrap-up** (5 min)
   - Recap: JSX is just prettier createElement
   - Preview: Module 3 introduces useState for interactive components
   - Mention: Module 4 will go deeper into props and composition patterns

---

## Common Questions

**Q: Why does JSX need a single parent element?**
A: A function can only return one thing. JSX compiles to `createElement()` calls, and you can only return one element. Use a `<div>` wrapper or `<>` Fragment.

**Q: When do I use quotes vs curly braces?**
A:

- Quotes for literal strings: `className="card"`
- Curly braces for JavaScript: `className={dynamicClass}`, `count={42}`

**Q: What's the difference between props and state?**
A: Props come from outside (parent passes them down), state lives inside (component manages it). We'll learn state in Module 3!

**Q: Why do lists need keys?**
A: React uses keys to track which items changed/moved/deleted. Without keys, React re-renders the entire list. With keys, it only updates what changed.

**Q: Can I use `class` instead of `className`?**
A: No. `class` is a reserved word in JavaScript, so React uses `className`. Same reason: `htmlFor` instead of `for`.

---

## Troubleshooting

### "npm: command not found"

- Node.js isn't installed
- Download from [nodejs.org](https://nodejs.org)
- Restart terminal after installing

### "Module not found" errors

- Run `npm install` first
- Check import paths (case-sensitive on Linux/Mac)
- Make sure file extensions are `.jsx` not `.js` for JSX files

### Port 5173 already in use

- Another dev server is running
- Kill it with `Ctrl+C` in that terminal
- Or Vite will auto-use a different port

### Changes not appearing

- Check terminal for errors (red text)
- Try `Ctrl+C` then `npm run dev` again
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

### "Adjacent JSX elements must be wrapped"

- Missing parent element
- Wrap in `<div>` or `<>` Fragment

### Console warning about keys

- Add `key` prop to mapped elements
- Use unique IDs or index as last resort

---

## Props Destructuring

Show both patterns and let students choose:

```jsx
// Pattern 1: props.name
function SpellCard(props) {
  return <h3>{props.name}</h3>;
}

// Pattern 2: Destructuring (cleaner)
function SpellCard({ name, type, power }) {
  return <h3>{name}</h3>;
}
```

Destructuring is preferred in real codebases — it's clearer which props the component expects.

---

## Files Reference

```
module-02-jsx-components/
├── README.md                   # Student-facing overview + Vite guide
├── INSTRUCTOR_NOTES.md         # This file
├── demo/                       # Main demo: JSX + Components
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx            # Entry point
│       ├── App.jsx             # Main component + StudentCard
│       ├── App.css
│       └── index.css
├── quest-01-jsx-conversion/
│   ├── README.md               # Quest instructions
│   ├── starter/                # Vite template for students
│   └── solution/               # Reference solution
├── quest-02-props-basics/
│   ├── README.md
│   ├── starter/
│   └── solution/
└── quest-03-component-lists/
    ├── README.md
    ├── starter/
    └── solution/
```

---

## Vite Commands Cheat Sheet

```bash
npm install          # Install dependencies (first time)
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
Ctrl+C               # Stop the dev server
```

---

## Preparation Checklist

- [ ] Test `npm install` and `npm run dev` in all folders
- [ ] Have Node.js download link ready for students who need it
- [ ] Review quest solutions
- [ ] Prepare to show createElement ↔ JSX comparison
- [ ] Know the four JSX rules cold
- [ ] Have a browser console open to show errors/warnings
- [ ] Test HMR works (edit → save → see change)
