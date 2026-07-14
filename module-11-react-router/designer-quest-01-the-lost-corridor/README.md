# The Lost Corridor

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

Visitors keep stumbling into dead ends in the Academy's magical corridors. The wayfinding signs don't highlight where you are, the 404 page is bare stone, and there's a whole Library wing that's not on the map yet. Professor Routesworth has asked you to fix the navigation experience before the new intake arrives.

## Getting Started

```bash
cd starter
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## What You'll See

A nav bar across the top with four links: **Home**, **Students**, **Spells**, and **About**. Click around — the pages change, but the nav links all look the same. You can't tell which page you're on.

Now try typing a made-up URL like `http://localhost:5173/dungeon`. You'll get an ugly 404 — just bare text on the page.

Your three tasks will fix all of this.

---

## Task 1: Design the 404 Page

**Files:** `src/pages/NotFound.jsx` and `src/App.css`

Right now the 404 page is just:

```jsx
<h1>404</h1>
<p>Page not found</p>
```

Replace this with a designed "lost in the corridors" page. The component already imports `Link` from React Router (it creates a clickable link to another page — works just like `<a>` but for the app).

Open `src/pages/NotFound.jsx` and replace the contents of the `<div className="not-found">` with your design. Ideas:

- A big atmospheric heading like "Lost in the Corridors..."
- Decorative elements (emoji mist, magical symbols, unicode art)
- A message: "You've wandered into uncharted territory"
- A styled link home: `<Link to="/">Return to the Great Hall</Link>`

Then open `src/App.css` and find the `.not-found` section (search for `TASK 1`). Add styles to make your 404 page look great — background color, centered text, padding, decorative fonts, whatever you like.

**You're done when:** Going to `/dungeon` shows a beautiful, atmospheric 404 page with a working link back to home.

---

## Task 2: Style the Active Nav Link

**File:** `src/App.css`

Open `src/App.css` and find the `.nav-link.active` rule (search for `TASK 2`). It's empty — that's why every link looks the same regardless of which page you're on.

Add styles that clearly show which page you're on. Ideas:

- A different text color (try `#6366f1` for a nice indigo)
- A bottom border (`border-bottom: 2px solid`)
- A subtle background color
- Brighter text

```css
/* Example — make it your own */
.nav-link.active {
  color: #6366f1;
  border-bottom: 2px solid #6366f1;
}
```

**You're done when:** Clicking each nav link visually highlights it. You can always tell which page you're on.

---

## Task 3: Add the Library Route

**This is the copy moment.** You're about to add a real route to the app. This is the first time you'll copy a JavaScript pattern. We'll walk through it line by line.

The Library page (`src/pages/Library.jsx`) already exists with full content. It's just not connected to the app yet. You need to make three small edits in `src/App.jsx` — each one is copying an existing line and changing a few words.

### Step 1: Add the import

Open `src/App.jsx`. At the top you'll see lines like this:

```jsx
import Home from "./pages/Home";
import Students from "./pages/Students";
import Spells from "./pages/Spells";
import About from "./pages/About";
```

Copy one of these lines. Paste it below the others. Change it to:

```jsx
import Library from "./pages/Library";
```

That's it — you've told the app to load the Library page.

### Step 2: Add the nav link

Scroll down to the nav section. You'll see a comment that says `🎨 TASK 3`. Just above it are NavLinks like this:

```jsx
<NavLink to="/about" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
```

Copy that whole line. Paste it where the TASK 3 comment is. Change two things:

1. Change `"/about"` to `"/library"`
2. Change `About` (the text between the tags) to `Library`

So your new line looks like:

```jsx
<NavLink to="/library" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Library</NavLink>
```

### Step 3: Add the route

Scroll down a bit more to the Routes section. You'll see another `🎨 TASK 3` comment. Just above it are Route lines like:

```jsx
<Route path="/about" element={<About />} />
```

Copy that line. Paste it where the TASK 3 comment is. Change two things:

1. Change `"/about"` to `"/library"`
2. Change `<About />` to `<Library />`

So your new line looks like:

```jsx
<Route path="/library" element={<Library />} />
```

**You're done when:** A "Library" link appears in the nav bar. Clicking it shows the Library page with categorized spells.

---

## What the JavaScript Was Doing

You don't need to memorize any of this — just a peek behind the curtain.

**`<NavLink to="/about">`** — Like an `<a href>` but smarter. When you click it, React swaps the page content without reloading the browser. The `className` callback checks `isActive` so you can style the current page's link differently.

**`<Route path="/about" element={<About />} />`** — This says "when the URL is `/about`, show the `About` component." It's a mapping from URL to page.

**`<Route path="*">`** — The `*` means "anything that didn't match above." This is the catch-all that shows your 404 page.

**`<BrowserRouter>`** — In `main.jsx`, this wraps the whole app and enables routing. You don't need to touch it.

**`import Library from "./pages/Library"`** — This loads the Library component from its file so the app can use it. Without this line, writing `<Library />` would cause an error.

---

## Extension: Create a Potions Page From Scratch

In Task 3 you hooked up a pre-built Library page. In this extension you'll create a brand new page yourself and wire it into the app using the same three-step pattern.

### Step 1 — Create the page file

Create a new file: `src/pages/Potions.jsx`

Paste this code into it — or change the content to whatever you like:

```jsx
function Potions() {
  return (
    <div className="page">
      <h1 className="page-title">Potions Laboratory</h1>
      <p className="page-text">
        Welcome to the Potions wing. Brews are organised by difficulty.
      </p>

      <div className="card-grid">
        <div className="card">
          <h3 className="card-name">Beginner Brews</h3>
          <ul className="spell-list">
            <li className="spell-list-item">Healing Tonic</li>
            <li className="spell-list-item">Glow Elixir</li>
            <li className="spell-list-item">Stamina Draught</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="card-name">Advanced Concoctions</h3>
          <ul className="spell-list">
            <li className="spell-list-item">Invisibility Serum</li>
            <li className="spell-list-item">Phoenix Tears</li>
            <li className="spell-list-item">Liquid Luck</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Potions;
```

The classes `page`, `page-title`, `card-grid`, and `card` are already styled in `App.css` — your page will look consistent with the others automatically.

### Step 2 — Wire it up in App.jsx

Use the same three-step pattern from Task 3:

**Import** (at the top, with the other page imports):

```jsx
import Potions from "./pages/Potions";
```

**NavLink** (in the nav section, after the Library link):

```jsx
<NavLink to="/potions" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Potions</NavLink>
```

**Route** (in the Routes section, before the `*` catch-all):

```jsx
<Route path="/potions" element={<Potions />} />
```

### Step 3 — Make it yours

Change the content inside `Potions.jsx` to anything you want. Add more cards, change the text, try a different layout. This is your page — there are no wrong answers.

**You're done when:** A "Potions" link appears in the nav bar, clicking it shows your page, and the active nav styling highlights it.

---

**Next:** Continue to the next quest in Module 11.
