# Designer Quest: The Third House

> The Academy of React has two great houses — **Phoenix** and **Dragon**. Each has its own colors, its own identity, its own pride. But the Academy is growing, and a third house needs its identity. **You're designing it.**

## Getting Started

```bash
cd starter
npm install
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`).

## What You'll See

A dark dashboard with two theme buttons: **Phoenix** and **Dragon**. Click each one — the entire page transforms: background, text, accent colors, fonts, everything.

Your job: **add a third house.** When you're done, a third button will appear automatically. No wiring required — just add your theme data and it shows up.

---

## Before You Start

> **You're about to edit JavaScript for the first time!** Don't worry — you're only changing color strings inside a structured list. It's like filling in a design-token spreadsheet. If you can write a hex color, you can do this.

The file you'll edit is `src/context/ThemeContext.jsx`. Open it now and find the `THEMES` object near the top. It looks like this:

```javascript
const THEMES = {
  phoenix: {
    name: "Phoenix",
    colors: { bg: "#1a0a0a", surface: "#2d1515", ... },
    font: "'Georgia', serif"
  },
  dragon: {
    name: "Dragon",
    colors: { bg: "#0a1a0a", surface: "#152d15", ... },
    font: "'Trebuchet MS', sans-serif"
  },
  // 🎨 TASK 1 — Add your third house theme here!
};
```

Each theme is a block of data: a name, six color values, and a font. That's all you're touching.

---

## Task 1 — Create Your Third House Theme

This is the big one. You're going to copy an existing theme and make it your own.

### Step by Step

1. **Find the comment** that says `🎨 TASK 1` inside `src/context/ThemeContext.jsx`.

2. **Copy the dragon theme block.** That's everything from `dragon: {` down to the closing `},` — here it is for reference:

   ```javascript
   dragon: {
     name: "Dragon",
     colors: {
       bg: "#0a1a0a",
       surface: "#152d15",
       text: "#e8fde8",
       primary: "#22c55e",
       accent: "#10b981",
       border: "#14532d"
     },
     font: "'Trebuchet MS', sans-serif"
   },
   ```

3. **Paste it** right below the dragon block (where the Task 1 comment is).

4. **Change the key.** The word before the colon is the theme's ID. Change `dragon` to something new — your house name in lowercase. For example: `serpent`, `griffin`, `shadow`, `storm`, anything you like.

   ```javascript
   serpent: {
   ```

5. **Change the name.** This is the display name that appears on the button. Use title case:

   ```javascript
   name: "Serpent",
   ```

6. **Change every color value.** Each one is a hex color string in quotes. Pick your house's palette:

   | Property    | What it controls                        | Example       |
   |------------|----------------------------------------|---------------|
   | `bg`       | Page background                        | `"#0a0a1a"`   |
   | `surface`  | Card backgrounds                       | `"#15152d"`   |
   | `text`     | All text                               | `"#e8e8fd"`   |
   | `primary`  | Headings, active button backgrounds    | `"#8b5cf6"`   |
   | `accent`   | Highlights, stat numbers               | `"#6366f1"`   |
   | `border`   | Card borders, dividers                 | `"#312e81"`   |

7. **Change the font** (optional). Pick any web-safe font:

   ```javascript
   font: "'Palatino', serif"
   ```

8. **Save the file.** The browser should hot-reload. You'll see a **third button** appear in the theme picker automatically.

### You're Done When

- A third button appears in the theme picker
- Clicking it applies your custom colors to the entire page
- All three buttons work and switch between themes

---

## Task 2 — Refine an Existing Theme

Still in `src/context/ThemeContext.jsx`, pick either the `phoenix` or `dragon` theme and change at least **2 color values**. Look for the `🎨 TASK 2` comments next to each theme.

For example, you might warm up Phoenix's accent or lighten Dragon's border. Save and watch the theme update live.

### You're Done When

- The Phoenix or Dragon theme looks noticeably different from before
- The theme still looks cohesive (colors work well together)

---

## Task 3 — Style the Theme Buttons on Hover

Open `src/App.css` and find the `.theme-btn:hover` rule — it's empty, waiting for you.

Add hover styles. For example:

```css
.theme-btn:hover {
  background-color: var(--primary);
  color: white;
  transform: scale(1.05);
}
```

### You're Done When

- Hovering over a theme button shows a visual change
- The hover effect feels satisfying and responsive

---

## Task 4 — Animate Theme Transitions

In `src/App.css`, find the `.app` rule. The `transition` property is set to `none`. Change it so that switching themes animates smoothly:

```css
transition: background-color 0.4s ease, color 0.4s ease;
```

### You're Done When

- Clicking a theme button causes the colors to **fade** smoothly instead of snapping instantly

---

## What the JavaScript Was Doing

You didn't need to understand the JavaScript engine code (marked with ⚙️), but here's what was happening behind the scenes:

**Context** is React's way of sharing data across many components without passing it through every level. The `ThemeContext` created a shared "bucket" that holds the current theme.

**The ThemeProvider** wraps the entire app and makes the theme available everywhere. When you call `setThemeKey("serpent")`, every component that uses the theme automatically re-renders with new colors.

**The magic moment:** because the theme picker reads `Object.keys(THEMES)` to build its buttons, adding a new key to the `THEMES` object automatically adds a new button. No extra wiring needed. The data drives the UI.

This pattern — **data-driven UI** — is one of React's superpowers. You changed the data, and the interface updated itself.

---

**Next Module**: [Module 11 →](../../module-11/)
