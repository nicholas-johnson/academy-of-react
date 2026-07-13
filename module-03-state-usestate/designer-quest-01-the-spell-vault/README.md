# Designer Quest: The Spell Vault

> **Quick Start:** A starter template is in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story

The Academy's spell vault has most of its collection catalogued — five powerful spells are already on display, with polished cards showing each spell's name, element, and power level. But a newly discovered spell has arrived and needs adding to the inventory. On top of that, the vault's display system needs a few tweaks: the spell descriptions are hidden by default, the "archived" view is an eyesore, and the lead enchanter wants to see what the cards look like with different colours.

You'll make four changes. None of them require writing any JavaScript logic — the engine code is already wired up.

---

## Getting Started

```bash
cd starter
npm install
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`). You should see five spell cards on a dark background, each with an icon, element badge, and power bar. The descriptions are hidden. This is your starting point.

---

## What's a Loop?

> A **loop** repeats the same action for each item in a list. `.map()` is JavaScript's way of saying "for each spell, create a card." Add a spell to the list and the loop creates a new card automatically — you never need to touch the loop itself.

## What's a Boolean?

> A **boolean** is `true` or `false` — like an on/off switch. It controls whether something shows or hides.

---

## Task 1 — Add a Spell to the Vault

**Open:** `src/data.js`

This file contains the list of spells. Each spell is an object with properties like `name`, `element`, `power`, and `icon`. The app uses a loop (`.map()`) to go through each spell and build a card. You don't need to understand the loop — just know that **adding a spell to this list means one more card on screen**. The loop does the rest.

**What to do:**

Find the `🎨 TASK 1` marker near the bottom of the file. You're going to add a 6th spell by copying an existing one:

1. Copy one complete spell object — from `{` to `}` (including the comma-separated properties inside)
2. Paste it at the end of the list, just before the closing `]`
3. Make sure there's a comma `,` after the `}` of the previous spell
4. Change the values:
   - `id` → `6`
   - `name` → your spell name (e.g. `"Void Rift"`)
   - `element` → `"fire"`, `"ice"`, `"lightning"`, `"earth"`, or `"arcane"`
   - `power` → a number from `0` to `100`
   - `description` → a short sentence about the spell
   - `icon` → an emoji (`🔥 ❄️ ⚡ 🌿 ✨ 🌀 💀 🌊` — pick any!)

**You're done when:** you save the file and a 6th card appears on screen with your spell's name, icon, and power bar.

---

## Task 2 — Flip a Boolean Switch

**Open:** `src/App.jsx`

Near the top of the file, find the `🎨 TASK 2` marker and this line:

```js
const SHOW_DETAILS_BY_DEFAULT = false;
```

This is a **boolean** — a value that's either `true` or `false`, like an on/off switch. Right now it's `false`, which means spell descriptions are hidden when the page loads.

**What to do:**

Change `false` to `true`:

```js
const SHOW_DETAILS_BY_DEFAULT = true;
```

**You're done when:** you save the file and every spell card now shows a description paragraph underneath the power bar.

---

## Task 3 — Design the Empty State

**Open:** `src/App.jsx` and `src/App.css`

Click the **"Show Archived ▶"** button in the vault header. You'll see a bare, ugly message: "No spells in the vault." That's the empty state — what shows when there are no spells to display. It needs your design eye.

**What to do in App.jsx:**

Find the `🎨 TASK 3` marker. Replace the plain `<p>No spells in the vault</p>` with something more interesting. For example:

```jsx
<div className="empty-state">
  <div className="empty-icon">📜</div>
  <h2 className="empty-heading">The vault is empty</h2>
  <p className="empty-subtitle">All spells are currently archived.</p>
</div>
```

**What to do in App.css:**

Find the `🎨 TASK 3` marker in the CSS. The `.empty-state` class exists but is mostly bare. Fill it in — and add styles for any new class names you used. For example:

- A `dashed` or `dotted` border
- A muted text colour
- Padding, `text-align: center`, `border-radius`
- A larger font size for the emoji

**You're done when:** the "Show Archived" view has a polished, centred empty state instead of a bare paragraph.

---

## Task 4 — Restyle with CSS Custom Properties

**Open:** `src/SpellCard.css`

At the top of the file, find the `🎨 TASK 4` marker and three CSS custom properties:

```css
:root {
  --spell-card-bg: #1e293b;
  --spell-badge-radius: 999px;
  --spell-power-height: 8px;
}
```

These variables control the look of every spell card at once. Changing one value here changes every card on the page.

**What to try:**

- `--spell-card-bg` — change the card background colour (try `#162032`, `#1a1a2e`, or `#2d1b4e`)
- `--spell-badge-radius` — change how rounded the element badge is (`999px` = pill shape, `8px` = slightly rounded, `0` = square)
- `--spell-power-height` — change how tall the power bar is (try `10px`, `14px`, or `4px`)

**You're done when:** all spell cards update together and you've found values you like.

---

## What the JavaScript Was Doing

You didn't need to write any JavaScript for this quest, but here's what was happening behind the scenes — good to know when talking to developers:

**The data array** (`data.js`)
A JavaScript array — a list of items wrapped in `[ ]`. Each item is an object wrapped in `{ }` with named properties. The app reads this list and creates one card per item.

**The loop** (`.map()` in `App.jsx`)
`.map()` takes a list and creates something new for each item. In this case, it takes each spell object and creates a `<SpellCard>` component. When you added a 6th spell, `.map()` automatically created a 6th card — no extra wiring needed.

**The boolean** (`SHOW_DETAILS_BY_DEFAULT`)
A `true`/`false` value passed down to each card. The `SpellCard` component checks this value and either shows or hides the description. Changing it from `false` to `true` flipped every card's description on.

**State** (`useState`)
The "Show Archived" button uses React's `useState` to remember whether you've toggled the view. When you click the button, React re-renders the page with the updated value. This is the same mechanism that powers form inputs, counters, toggles, and most interactive UI in React.

---

**Next:** [Module 4 — Forms & Events](../../module-04-forms-events/)
