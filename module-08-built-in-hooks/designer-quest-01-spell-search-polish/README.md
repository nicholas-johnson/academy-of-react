# Designer Quest: Spell Search Polish

> **Quick Start:** Open `starter/` in your terminal, run `npm install` then `npm run dev`, and open the URL it gives you.

## The Story

The **Spell Library** search works — you can type a spell name and the list filters. But when the search is running, it just says "Searching..." in plain text. And when nothing matches, it just says "No spells found." These moments feel broken, not intentional.

Your job: make the waiting state feel *designed* and the empty state feel *helpful*.

---

## Getting Started

```bash
cd starter
npm install
npm run dev
```

Open the URL (usually http://localhost:5173). You'll see:

- A **search input** at the top (already focused)
- An **element filter** dropdown
- A **grid of spell cards** (these already look good!)

Try typing "fire" — results filter. Try typing "xyzzzz" — no results. Notice how the in-between moments look rough? That's your job.

---

## What You'll See

| Moment | Current state | Your goal |
|--------|--------------|-----------|
| Searching... | Bare text "Searching..." | Designed pending feedback |
| No results | Bare text "No spells found" | Helpful empty state |

---

## Tasks

### 🎨 Task 1: Design the Pending State

**File:** `starter/src/App.css`  
**What to change:** The `.search-pending` class (currently empty)

When you type in the search box, there's a brief moment where the app is filtering. During that moment, a `<div className="search-pending">` wraps the results area. Right now it has no styles.

**Ideas:**
- Add `opacity: 0.5` to dim the results while searching
- Add a pulsing animation
- Add a gradient overlay

**Also in:** `starter/src/App.jsx`  
Look for `{/* 🎨 TASK 1 */}` — you can replace the bare `<p>Searching...</p>` with something more designed (a spinner, an animated icon, a styled message).

**You're done when:** typing in the search box shows visible, *intentional* feedback while results load.

---

### 🎨 Task 2: Design the No-Results State

**File:** `starter/src/App.jsx`  
**What to change:** Look for `{/* 🎨 TASK 2 */}`

When someone searches for something that doesn't exist (try "xyzzzz"), the app shows bare text. Replace it with a proper empty state.

**Ideas:**
- A large emoji (🔮, 🧙, ✨) as a visual anchor
- A clear heading: "No spells match your search"
- A helpful hint: "Try a different keyword"
- Style it with the `.no-results` class in App.css

**You're done when:** searching for gibberish shows a friendly, designed empty state instead of bare text.

---

### 🎨 Task 3: Change the Search Speed (Your First JS Value Edit!)

**File:** `starter/src/App.jsx`  
**What to change:** Find this line near the top of the file:

```javascript
const SEARCH_DELAY_MS = 50; // 🎨 TASK 3 — Change this number!
```

This number controls how long the search takes (in milliseconds). A bigger number means you'll see your pending design from Task 1 for longer.

**Try these values:**
- `200` — a noticeable pause (good for testing your design)
- `500` — a long pause (very obvious)
- `10` — almost instant (barely visible)

**Leave it at `200`** when you're done — that's a good middle ground for seeing the effect.

**You're done when:** you can see your Task 1 pending design clearly while searching.

> 💡 **What is this number doing?** It simulates a slow search. In a real app, searches might be slow because the database is big or the network is slow. This fake delay lets you *see* the loading state you're designing.

---

### 🎨 Task 4: Change Which Element Gets Focus (Your First Ref Edit!)

**File:** `starter/src/App.jsx`  
**What to change:** Find this line in the search input:

```jsx
ref={searchInputRef}
```

Move it! Cut `ref={searchInputRef}` from the search input and paste it onto the element filter `<select>` instead.

**Before:**
```jsx
<input ref={searchInputRef} ... />     {/* ← has the ref */}
<select ... >                          {/* ← no ref */}
```

**After:**
```jsx
<input ... />                          {/* ← no ref now */}
<select ref={searchInputRef} ... >     {/* ← has the ref now */}
```

Refresh the page. Notice how the *select dropdown* is now focused instead of the search input.

**You're done when:** refreshing the page focuses the element filter dropdown instead of the search input.

> 💡 **What is a ref?** A ref is React's way of saying "remember this specific element." The code says "when the page loads, focus whatever element has the ref." By moving the ref, you're telling React to focus a different element.

---

## What the JavaScript Is Doing (Plain English)

You don't need to understand all the code, but here's what the key pieces do:

| Code | What it does |
|------|-------------|
| `useState` | Remembers the current search text and filtered results |
| `useTransition` | Tells React "this update is low priority" — React can show the old results while computing new ones, and gives us `isPending` (true/false) to know when it's working |
| `useRef` | Creates a "bookmark" for a specific element on the page |
| `useEffect` | Runs code after the page first appears (used here to focus the bookmarked element) |
| `startTransition` | Wraps the slow search so React knows it can be interrupted |
| `SEARCH_DELAY_MS` | A number that controls how long the fake "slow search" takes |

---

## Extension: Create Your First Component — `<SpellCard>`

The spell cards in the grid are rendered as inline JSX inside `App.jsx` — about 15 lines of markup repeated for every spell. In this extension you'll extract that markup into its own component file.

### Step 1 — Create the component file

Create a new folder and file: `src/components/SpellCard.jsx`

Paste this code into it:

```jsx
import "./SpellCard.css";

function SpellCard({ spell }) {
  return (
    <div className={`spell-card element-${spell.element}`}>
      <div className="spell-card-header">
        <h3 className="spell-name">{spell.name}</h3>
        <span className="spell-element">{spell.element}</span>
      </div>
      <p className="spell-description">{spell.description}</p>
      <div className="spell-power">
        <div
          className="spell-power-bar"
          style={{ width: `${spell.power}%` }}
        />
        <span className="spell-power-label">{spell.power}</span>
      </div>
    </div>
  );
}

export default SpellCard;
```

Notice `{ spell }` in the function signature — that's a **prop**. The parent passes data in, the component renders it.

### Step 2 — Add the component styles

Create `src/components/SpellCard.css` and paste these styles:

```css
.spell-card {
  background: #1e293b;
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid #334155;
  transition: transform 0.15s, box-shadow 0.15s;
}

.spell-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.spell-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.spell-name {
  font-size: 1.1rem;
  color: #f1f5f9;
  margin: 0;
}

.spell-element {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}

.spell-description {
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0.5rem 0 1rem;
}

.spell-power {
  position: relative;
  height: 6px;
  background: #334155;
  border-radius: 3px;
  overflow: hidden;
}

.spell-power-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.spell-power-label {
  position: absolute;
  right: 0;
  top: -1.4rem;
  font-size: 0.7rem;
  color: #64748b;
  font-weight: 600;
}
```

### Step 3 — Use it in App.jsx

Add this import near the top of `src/App.jsx`:

```jsx
import SpellCard from "./components/SpellCard";
```

Then find the spell grid section and replace the inline card markup with the component. The whole `.map()` block simplifies to:

```jsx
<div className="spell-grid">
  {filteredSpells.map((spell) => (
    <SpellCard key={spell.id} spell={spell} />
  ))}
</div>
```

**You're done when:** The spell grid looks exactly the same, but `App.jsx` is shorter and cleaner. Editing `SpellCard.jsx` updates every card in the grid.

---

## File Map

```
starter/src/
├── main.jsx       — Boots the app (don't edit)
├── data.js        — The spell list (don't edit)
├── App.jsx        — Main component (Tasks 1–4 are here)
├── App.css        — Styles (Tasks 1–2 are here)
├── index.css      — Base reset (don't edit)
└── components/
    ├── SpellCard.jsx  — Your first component (Extension)
    └── SpellCard.css  — Styles for the spell card
```
