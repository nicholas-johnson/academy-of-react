# Designer Quest: The Perfect Input

Every other exercise in this track hands you a working app. This one is different. You're going to **build a component from scratch** — from an empty file to a polished, styled input box. Then you'll rebuild it two more ways, so you can see all three styling approaches side by side.

By the end, you'll understand what a React component actually *is*.

---

## Getting Started

```bash
cd starter
npm install
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`). You'll see a heading and three empty panels labelled "CSS Modules", "Styled Components", and "Tailwind CSS". Each one says *"Your input will appear here."*

Your job is to make the input appear.

---

## Part 1: What Is a Component?

A component is a **function that returns markup**. That's it.

The function's name starts with a capital letter, so React knows it's a component and not a regular HTML tag. The markup it returns looks like HTML (it's called JSX). The file it lives in ends with `.jsx`.

Every component you've seen in the course — every card, every layout, every button — is one of these functions.

---

## Task 1 — Build Your First Component

**Create a new file:** `src/TextInput.jsx`

In your code editor, right-click the `src` folder and choose "New File." Name it `TextInput.jsx`. It will be completely empty.

Now type (or paste) this into the file. Every line is explained:

```jsx
// This line makes your component available to other files.
// Without it, nobody can use TextInput.
// "export default" means "this is the main thing this file provides."
// We put it at the top so you see it first, but it works anywhere in the file.

function TextInput() {
  // This is a FUNCTION. It's a set of instructions with a name.
  // "TextInput" is the name. The capital T tells React it's a component.

  return (
    // Everything inside return (...) is your MARKUP.
    // This is what appears on screen. It looks like HTML — and mostly is.

    <div>
      <label htmlFor="wizard-name">Wizard Name</label>
      <input type="text" id="wizard-name" placeholder="Enter your name..." />
    </div>

    // Two small differences from HTML:
    // 1. "htmlFor" instead of "for" (because "for" is reserved in JavaScript)
    // 2. The <input /> has a closing slash (all tags must close in JSX)
  );
}

export default TextInput;
```

**Save the file.**

Nothing will happen on screen yet — you've created the component, but you haven't told the app to show it. That's the next step.

**You're done when:** the file exists and your editor isn't showing any red error squiggles.

---

## Task 2 — Show It on Screen

**Open:** `src/App.jsx`

You need to do two things:

### Step 1: Import your component

Near the top of the file, find this line:

```jsx
// 🎨 TASK 2 — Uncomment the line below once you've created TextInput.jsx
// import TextInput from "./TextInput";
```

Remove the `//` at the start of the import line so it reads:

```jsx
import TextInput from "./TextInput";
```

This tells the app: "Go find the file `TextInput.jsx` and bring in the component it exports."

### Step 2: Use your component

Find the first `input-section` with the "CSS Modules" heading. Replace the placeholder paragraph:

```jsx
<p className="placeholder">Your input will appear here.</p>
```

with your component:

```jsx
<TextInput />
```

Your component name becomes a tag — like an HTML element you invented. The `/>` at the end means it's self-closing (no children between opening and closing tags).

**Save the file.**

**You're done when:** an unstyled input with a "Wizard Name" label appears in the first panel. It'll look plain and default-styled — that's expected. You're about to fix that.

---

## Task 3 — Style It with CSS Modules

Now you'll make the input look good.

### Step 1: Create the CSS file

**Create a new file:** `src/TextInput.module.css`

The `.module.css` ending is special — it tells Vite to scope these styles to your component so they never leak out and affect other parts of the page.

Paste this CSS into the file:

```css
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 0.025em;
}

.input {
  background: #0f172a;
  border: 2px solid #334155;
  border-radius: 0.75rem;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  color: #e2e8f0;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input::placeholder {
  color: #475569;
}

.input:hover {
  border-color: #475569;
}

.input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
}
```

### Step 2: Connect the styles to your component

**Open:** `src/TextInput.jsx`

Add this import at the very top of the file (before the function):

```jsx
import styles from "./TextInput.module.css";
```

This loads your CSS and gives you a `styles` object. Each class name becomes a property: `styles.wrapper`, `styles.label`, `styles.input`.

### Step 3: Apply the class names

Replace the plain `<div>`, `<label>`, and `<input>` with class-name versions. Your full component should now look like this:

```jsx
import styles from "./TextInput.module.css";

function TextInput() {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="wizard-name">
        Wizard Name
      </label>
      <input
        className={styles.input}
        type="text"
        id="wizard-name"
        placeholder="Enter your name..."
      />
    </div>
  );
}

export default TextInput;
```

Notice `className={styles.wrapper}` — not `className="wrapper"`. The curly braces mean "use the JavaScript variable `styles.wrapper`", which holds the auto-generated unique class name.

**Save both files.**

**You're done when:** the first panel shows a polished dark input with a subtle border that glows indigo when you click into it.

---

## Task 4 — Rebuild It with Styled Components

Now you'll create the same input using a completely different approach: CSS written inside JavaScript.

**Create a new file:** `src/TextInputStyled.jsx`

Paste this entire component:

```jsx
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: 0.025em;
`;

const Input = styled.input`
  background: #0f172a;
  border: 2px solid #334155;
  border-radius: 0.75rem;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  color: #e2e8f0;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: #475569;
  }

  &:hover {
    border-color: #475569;
  }

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
  }
`;

function TextInputStyled() {
  return (
    <Wrapper>
      <Label htmlFor="wizard-name-sc">Wizard Name</Label>
      <Input
        type="text"
        id="wizard-name-sc"
        placeholder="Enter your name..."
      />
    </Wrapper>
  );
}

export default TextInputStyled;
```

Look at what's different: each element (`Wrapper`, `Label`, `Input`) is created with `styled.div`, `styled.label`, `styled.input`. The CSS goes inside the backtick strings. The `&` symbol means "this element" — so `&:focus` means "when this element is focused."

Now connect it to the app. **Open** `src/App.jsx` and:

1. Uncomment the import: `import TextInputStyled from "./TextInputStyled";`
2. In the "Styled Components" section, replace `<p className="placeholder">Your input will appear here.</p>` with `<TextInputStyled />`

**Save both files.**

**You're done when:** the second panel shows an identical polished input — same look, different technology underneath.

---

## Task 5 — Rebuild It with Tailwind

One more time, with utility classes.

**Create a new file:** `src/TextInputTailwind.jsx`

Paste this component:

```jsx
function TextInputTailwind() {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-sm font-semibold text-slate-400 tracking-wide"
        htmlFor="wizard-name-tw"
      >
        Wizard Name
      </label>
      <input
        className="bg-slate-900 border-2 border-slate-700 rounded-xl px-4 py-3.5 text-base text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 hover:border-slate-500 focus:border-indigo-500 focus:ring-[3px] focus:ring-indigo-500/25"
        type="text"
        id="wizard-name-tw"
        placeholder="Enter your name..."
      />
    </div>
  );
}

export default TextInputTailwind;
```

No import for styles, no separate CSS file. Every style is a class name directly on the element: `bg-slate-900` sets the background, `rounded-xl` rounds the corners, `focus:border-indigo-500` changes the border colour on focus. The long className string replaces the entire CSS file.

Connect it to the app. **Open** `src/App.jsx` and:

1. Uncomment the import: `import TextInputTailwind from "./TextInputTailwind";`
2. In the "Tailwind CSS" section, replace the placeholder with `<TextInputTailwind />`

**Save both files.**

**You're done when:** all three panels show identical polished inputs. Same design, three technologies.

---

## What You Just Built

You built a React component from nothing. Here's what each part was doing:

**The function** (`function TextInput() { ... }`) is a component — a reusable piece of UI with a name. You can use `<TextInput />` anywhere, as many times as you want, and each one is independent.

**The return statement** (`return ( ... )`) holds the markup. Everything inside the parentheses is JSX — HTML-like syntax that React turns into real DOM elements.

**The export** (`export default TextInput`) makes the component available to other files. The import in App.jsx (`import TextInput from './TextInput'`) brings it in.

**CSS Modules** keep styles in a separate `.module.css` file. Class names are auto-scoped so they never collide with anything else. You reference them as `styles.className`.

**Styled Components** write CSS inside JavaScript using tagged template literals (the backtick strings). Each styled block creates a new React component with the styles baked in.

**Tailwind** skips CSS files entirely. You compose styles from utility classes directly on the element. It's verbose in the markup but requires no separate files.

All three produce the exact same result. Pick whichever feels right for your project.

---

**Try this:** click into each input and type your wizard name. The focus ring should glow identically across all three. That's the same CSS — three different ways of delivering it.
