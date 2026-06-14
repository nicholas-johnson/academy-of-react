# Module 2: JSX and Components

In Module 1, you built React elements with `createElement()` — and it worked, but it was verbose. Nesting elements meant nesting function calls, and even a simple card required a wall of code that was hard to read at a glance.

JSX fixes this. It's a syntax extension that lets you write elements in a format that looks like HTML but compiles down to the same `createElement` calls. Under the hood, nothing has changed. On the surface, everything becomes dramatically more readable.

This module also introduces **Vite** (the build tool that makes JSX work), **function components** (the way you organise your UI into reusable pieces), and **props** (how you pass data into components).

## From createElement to JSX

Here's the transformation:

```javascript
// Module 1 — createElement
React.createElement(
  'div', { className: 'card' },
  React.createElement('h1', null, 'Hello'),
  React.createElement('p', null, 'World')
)
```

```jsx
// Module 2 — JSX
<div className="card">
  <h1>Hello</h1>
  <p>World</p>
</div>
```

Same result, dramatically more readable. JSX isn't a template language — it's syntactic sugar that compiles to JavaScript. Your build tool (Vite) handles the transformation before the browser ever sees it.

## JSX Rules

JSX looks like HTML but has a few important differences:

**Use `className` instead of `class`** — because `class` is a reserved word in JavaScript:
```jsx
<div className="card">content</div>
```

**Use curly braces `{}` for JavaScript expressions:**
```jsx
<h1>{student.name}</h1>
<p>Power: {magicLevel * 2}</p>
<span>{isReady ? 'Ready!' : 'Preparing...'}</span>
```

**Every element must have one parent** — you can't return adjacent elements without a wrapper. Use a `<div>` or an empty fragment `<>...</>`:
```jsx
// Won't work — two adjacent elements
return (
  <h1>Title</h1>
  <p>Text</p>
)

// Works — wrapped in a fragment
return (
  <>
    <h1>Title</h1>
    <p>Text</p>
  </>
)
```

**All tags must be closed** — including self-closing ones:
```jsx
<img src="wizard.png" alt="A wizard" />
<br />
<input type="text" />
```

## Setting Up with Vite

JSX needs a build step — the browser doesn't understand it natively. **Vite** is a modern build tool that handles this transformation and gives you an excellent development experience with instant hot reloading.

To work with the course demos:

```bash
cd module-02-jsx-components/demo
npm install
npm run dev
```

Vite starts a local server (usually at `http://localhost:5173`). Edit any file, save, and see changes in the browser within milliseconds.

To scaffold a brand new project from scratch:

```bash
npm create vite@latest my-app
# Choose React, then JavaScript
cd my-app
npm install
npm run dev
```

A Vite project has this structure:

```
my-app/
├── package.json       # Dependencies and scripts
├── vite.config.js     # Build configuration
├── index.html         # Entry HTML (loads src/main.jsx)
└── src/
    ├── main.jsx       # Renders your App to the DOM
    ├── App.jsx        # Your root component
    └── App.css        # Styles
```

The key differences from Module 1's CDN approach: React comes from npm (not a CDN script tag), files use `import`/`export` statements, and Vite handles JSX transformation automatically.

## Function Components

A component is a function that returns JSX. That's it. The function name must start with a capital letter (so React can distinguish it from HTML tags):

```jsx
function StudentCard() {
  return (
    <div className="card">
      <h2>Toasty McPigeonfingers</h2>
      <p>House: Scarybird</p>
      <p>Level: 45</p>
    </div>
  )
}
```

You use it in JSX like an HTML tag:

```jsx
function App() {
  return (
    <div>
      <h1>Academy Roster</h1>
      <StudentCard />
      <StudentCard />
    </div>
  )
}
```

Two instances of `StudentCard` render independently. Components let you break complex UIs into small, focused pieces that you can build and reason about one at a time.

## Props — Passing Data to Components

A component that always shows the same data isn't very useful. **Props** (short for properties) let you pass data into a component, like arguments to a function:

```jsx
function StudentCard({ name, house, level }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>House: {house}</p>
      <p>Level: {level}</p>
    </div>
  )
}

// Usage — different data, same component
<StudentCard name="Toasty McPigeonfingers" house="Scarybird" level={45} />
<StudentCard name="Luna Starlight" house="Huftybadger" level={38} />
```

Props are passed as attributes in JSX (strings in quotes, everything else in curly braces) and received as an object parameter. Destructuring (`{ name, house, level }`) extracts the values directly.

Props are **read-only** — a component should never modify its own props. They flow down from parent to child, making data flow predictable and easy to trace.

## Rendering Lists

When you have an array of data, `.map()` transforms it into an array of elements:

```jsx
const students = [
  { id: 1, name: 'Toasty', house: 'Scarybird', level: 45 },
  { id: 2, name: 'Luna', house: 'Huftybadger', level: 38 },
  { id: 3, name: 'Thor', house: 'Liondudes', level: 62 }
]

function StudentRoster() {
  return (
    <div>
      <h1>Academy Roster</h1>
      {students.map(student => (
        <StudentCard
          key={student.id}
          name={student.name}
          house={student.house}
          level={student.level}
        />
      ))}
    </div>
  )
}
```

The `key` prop is required when rendering lists. It tells React which item is which, so it can efficiently update the DOM when the list changes. Use a stable, unique identifier (like an `id` from your data) — not the array index.

## Composing Components

The real power of components emerges when you compose them — small components combine into larger ones, which combine into pages:

```jsx
function App() {
  return (
    <div className="app">
      <Header />
      <StudentRoster />
      <Footer />
    </div>
  )
}

function Header() {
  return <header><h1>Arcane Academy</h1></header>
}

function Footer() {
  return <footer><p>© Arcane Academy</p></footer>
}
```

Each component does one thing. `Header` handles the header. `StudentRoster` handles the list. `StudentCard` handles a single card. You can work on any piece in isolation without worrying about the rest.

## Common Mistakes

**Forgetting the capital letter.** `<studentCard />` renders as an HTML element (which doesn't exist). `<StudentCard />` renders your component. Always capitalise component names.

**Returning adjacent elements without a wrapper.** JSX expressions must have a single root. Wrap siblings in a `<div>` or a fragment `<>...</>`.

**Forgetting keys in lists.** React will warn you, and your list updates may behave incorrectly (losing state, re-ordering wrong). Always provide a unique `key`.

**Using quotes for non-string props.** `level="45"` passes the string "45". Use `level={45}` for a number, `active={true}` for a boolean, `items={myArray}` for arrays and objects.

## Exercises

**Quest 1: JSX Conversion** — Convert your Module 1 createElement code into JSX. Experience firsthand how much cleaner it is.

[Start Quest 1 →](./quest-01-jsx-conversion/)

**Quest 2: Props Basics** — Create a reusable SpellCard component that receives data through props and renders differently based on what it's given.

[Start Quest 2 →](./quest-02-props-basics/)

**Quest 3: Component Lists** — Build a PotionCard component and render a list of potions using `.map()` with proper keys.

[Start Quest 3 →](./quest-03-component-lists/)

## Running the Code

```bash
cd demo
npm install
npm run dev
```

Slides cover JSX rules, Vite setup, Node.js/npm basics, and component structure:

```bash
cd slides
npm install
npm run dev
```

---

[← Module 1: React Elements](../module-01-react-elements/) | [Module 3: State with useState →](../module-03-state-usestate/)
