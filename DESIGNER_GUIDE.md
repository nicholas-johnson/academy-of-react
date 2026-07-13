# How to Read a React File

A one-page survival guide for designers working through the Designer Track.

## The Shape of a React File

Every `.jsx` file you'll open follows this pattern:

```jsx
import { useState } from "react";     // ← Imports: loading tools
import "./App.css";                    // ← Your CSS file

function App() {                       // ← The component (a function)
  const [count, setCount] = useState(0);  // ← Engine code (state)

  return (                             // ← YOUR MARKUP STARTS HERE
    <div className="app">
      <h1>Hello</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Add one
      </button>
    </div>
  );                                   // ← YOUR MARKUP ENDS HERE
}

export default App;                    // ← Makes it available to other files
```

The part between `return (` and `);` is your territory — it's basically HTML.

## Five Things That Look Different from HTML

| HTML | React JSX | Why |
|------|-----------|-----|
| `class="card"` | `className="card"` | `class` is reserved in JavaScript |
| `for="email"` | `htmlFor="email"` | `for` is reserved in JavaScript |
| `<img>` | `<img />` | All tags must close |
| `onclick="..."` | `onClick={...}` | camelCase, curly braces |
| `style="color: red"` | `style={{ color: 'red' }}` | Object instead of string |

## Curly Braces `{ }` = Live Data

Anything inside `{ }` in JSX is a live JavaScript value:

```jsx
<h1>{wizard.name}</h1>           // Shows the wizard's name
<p>{spells.length} spells</p>    // Shows how many spells
<div className={theme}>          // Sets the class dynamically
```

If you see `{something}`, it means "whatever `something` currently is." You don't need to understand how it's calculated — just know it's live.

## The Files You'll See

| File | What it does | Do you edit it? |
|------|-------------|-----------------|
| `App.jsx` | The main component | Usually yes |
| `App.css` | Styles for the app | Yes |
| `tokens.css` | Design variables (colours, spacing) | Yes — this is a big one |
| `data.js` or `data.json` | Content the app displays | Sometimes |
| `main.jsx` | Boots the app (2 lines) | No |
| `index.html` | HTML shell (1 div) | No |
| `package.json` | Project config | No |
| `vite.config.js` | Build tool config | No |

## Running a Project

Every exercise uses the same two commands:

```bash
npm install     # First time only — downloads dependencies
npm run dev     # Starts the app at http://localhost:5173
```

Save a file and the browser updates instantly.

## The Designer Quest Pattern

Every designer quest follows the same rules:

1. **The app already works.** You'll see a running UI before you change anything.
2. **Edit zones are marked.** Look for `/* 🎨 TASK 1 — edit below */` comments.
3. **Engine code is labelled.** Files marked "you don't need to read this" can be ignored.
4. **Each task has a "you're done when…" check** so you know you got it right.

## CSS Variables (Design Tokens)

Most exercises use CSS variables to drive the look. You'll edit values like these:

```css
:root {
  --primary: #6366f1;
  --background: #0f172a;
  --surface: #1e293b;
  --text: #e2e8f0;
  --radius: 0.75rem;
}
```

Change `--primary` and every button, link, and accent in the app updates. This is your main lever.

## What `useState` Does (in Plain English)

You'll see this everywhere:

```jsx
const [theme, setTheme] = useState("dark");
```

It means: "there's a value called `theme` that starts as `"dark"`. When someone calls `setTheme("light")`, the value changes and the screen updates." You don't need to write this — just know that `theme` is a live value and `setTheme` is how it changes.

## What `useEffect` Does (in Plain English)

```jsx
useEffect(() => {
  fetch("/api/data.json")
    .then(res => res.json())
    .then(data => setData(data));
}, []);
```

It means: "when the component first appears, go get some data." The `[]` at the end means "do this once." You don't write effects — but they create the loading/error/success states you'll be designing.

## JavaScript Concepts You'll Meet

The designer quests for Modules 2–4 introduce three JavaScript fundamentals through small, guided edits. You won't write these from scratch — you'll change values inside code that already works.

**Variables** (Module 2): A variable is a named container — `const title = "Academy Roster"` stores a piece of text you can use anywhere on the page. Change the text between the quotes and the page updates. Arrays like `const students = [...]` are variables that hold lists.

**Loops** (Module 3): A loop repeats an action for each item in a list. JavaScript's `.map()` goes through each spell in an array and creates a card for it. Add a spell to the array and the loop creates a new card automatically — you never touch the loop itself.

**Functions** (Module 4): A function is a recipe that runs when something happens. `handleSubmit` runs when a form is submitted. Inside it, you'll change the words in a message string — you're tweaking one step of the recipe, not writing the recipe from scratch.

## You've Got This

The designer quests are designed so you never need to invent JavaScript from scratch. At most you'll:

- Edit CSS values and variables
- Change text and content inside JSX tags
- Copy an existing pattern line and modify the words
- Change a number (like a delay or threshold)

If you can write HTML and CSS, you can do these exercises.
