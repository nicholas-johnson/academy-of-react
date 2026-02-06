# Quest 1: Translation

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

Professor Hooksworth has tasked you with a critical mission: translate the old `createElement()` incantations from Module 1 into modern JSX. This will prove you understand both the ancient and modern methods of React magic. "Those who know the old ways," the Professor says with a twinkle in his eye, "appreciate the new ways even more."

## Objective

Convert your Module 1 code (from any quest) from `React.createElement()` syntax to JSX syntax.

## Technical Concepts

- JSX syntax
- Converting createElement to JSX
- JSX expressions with `{}`
- className vs class
- Babel transformation

## Requirements

Create a Vite React project that:

1. Uses proper Vite project structure (`src/`, `package.json`, `vite.config.js`)
2. Contains your Module 1 code **rewritten in JSX**
3. Displays the same information as before, but using JSX
4. Has at least one student object rendered with JSX
5. Uses React imports (`import React from 'react'`)

## Setup

```bash
npm install      # Install dependencies
npm run dev      # Start dev server
```

## Translation Guide

Here's how createElement maps to JSX:

```javascript
// createElement:
React.createElement('h1', null, 'Hello')
// JSX:
<h1>Hello</h1>

// createElement with className:
React.createElement('div', { className: 'card' }, 'Content')
// JSX:
<div className="card">Content</div>

// createElement with children:
React.createElement('div', null,
  React.createElement('h1', null, 'Title'),
  React.createElement('p', null, 'Text')
)
// JSX:
<div>
  <h1>Title</h1>
  <p>Text</p>
</div>

// createElement with variables:
React.createElement('p', null, student.name)
// JSX:
<p>{student.name}</p>
```

## Acceptance Criteria

- [ ] Proper Vite project structure with `package.json` and `vite.config.js`
- [ ] React imported from npm (`import React from 'react'`)
- [ ] No createElement() calls (all converted to JSX)
- [ ] JSX uses `{}` for JavaScript expressions
- [ ] Uses `className` instead of `class`
- [ ] Page displays correctly
- [ ] Dev server runs without errors (`npm run dev`)

## Hints

<details>
<summary>Click for hints</summary>

**Hint 1**: Create a Vite project structure:

```
solution/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    └── index.css
```

**Hint 2**: Your `src/main.jsx` renders the App:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Hint 3**: JSX expressions use curly braces:

```jsx
const student = { name: "Aria", magicLevel: 45 };

// Use variables:
<h2>{student.name}</h2>

// Use calculations:
<p>Power: {student.magicLevel * 2}</p>

// Use template strings:
<p>{`Level: ${student.magicLevel}`}</p>
```

**Hint 4**: JSX must have a single parent element:

```jsx
// ❌ This won't work:
return (
  <h1>Title</h1>
  <p>Text</p>
);

// ✅ This works:
return (
  <div>
    <h1>Title</h1>
    <p>Text</p>
  </div>
);
```

**Hint 5**: Rendering is still the same:

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<div>Your JSX here</div>);
```

</details>

## Bonus Challenge

Now that you've converted to JSX:

1. **Create a Component**: Wrap your JSX in a function component

   ```jsx
   function StudentProfile() {
     return <div>{/* Your JSX here */}</div>;
   }

   root.render(<StudentProfile />);
   ```

2. **Multiple Students**: If you did Quest 2 (registry), convert the whole thing including the loop/map

3. **Styling**: Add some CSS classes and see how much cleaner `className` is in JSX

---

**Next Quest**: [Quest 2: SpellCard](../quest-02-spellcard/)
