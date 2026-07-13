# 🌓 Day and Night

> The Academy's dashboard has a theme toggle — but the light mode looks *terrible*.
> The dark mode could use some love too. Your mission: make both themes beautiful.

## Getting Started

```bash
cd starter
npm install
npm run dev
```

Open the URL shown in your terminal (usually http://localhost:5173).

## What You'll See

A dark-themed Academy dashboard with stats and a list of recent spells. In the top-right corner there's a **theme toggle button**.

Click it — the app switches to light mode. It's ugly. That's your job to fix.

Now try this: **refresh the page**. Your theme choice is still there! That's the custom hook (`useLocalStorage`) at work — it saves your preference to the browser's local storage automatically.

---

## Your Tasks

### 🎨 Task 1 — Redesign the Light Theme

**File:** `src/App.css`
**Find:** The `[data-theme="light"]` section (marked with 🎨 TASK 1)

The light theme currently uses lazy values like `white`, `black`, `blue`. Replace them with a refined light palette. Think warm grays, subtle borders, and a proper accent color.

**You're done when:** toggling to light mode looks clean and professional — not like a broken prototype.

---

### 🎨 Task 2 — Refine the Dark Theme

**File:** `src/App.css`
**Find:** The `[data-theme="dark"]` section (marked with 🎨 TASK 2)

The dark theme is OK, but it could have more personality. Try warmer accents, a slightly different background shade, or a more interesting surface color.

**You're done when:** the dark theme feels intentional and polished — not just "default dark."

---

### 🎨 Task 3 — Add a Theme Transition

**File:** `src/App.css`
**Find:** The `.app` rule (marked with 🎨 TASK 3)

The `transition` property is set to `none`. Change it so the background and text colors animate smoothly when you toggle themes.

**You're done when:** clicking the toggle produces a smooth fade between themes instead of a hard snap.

---

### 🎨 Task 4 — Personalise the Data

**File:** `src/data.js` (marked with 🎨 TASK 4)

Change one stat card's icon and label to something you like. This is a pure data edit — no logic needed.

**You're done when:** the dashboard shows something that feels like *yours*.

---

## ✨ The Persistence Moment

After you've finished your themes, try this:

1. Toggle to light mode
2. **Close the browser tab entirely**
3. Open it again (`npm run dev` if the server stopped)

> **It remembers your choice!** That's `useLocalStorage` — a custom hook that saves data to the browser so it survives page refreshes and even closing the tab.

You didn't write that hook. But you experienced exactly what it does — and that's the point.

---

## What the JavaScript Was Doing

Behind the scenes, the app uses a **custom hook** called `useLocalStorage`. Here's what that means in plain English:

- **Hook** = a reusable piece of React logic. Instead of copying the same code into every component, you write it once and share it.
- **localStorage** = a built-in browser feature that stores small pieces of data (like your theme preference) that persist even when you close the tab.
- **useLocalStorage** = a custom hook that combines React's state with localStorage. When you toggle the theme, it saves your choice. When the page loads, it checks localStorage first — so your preference comes back.

The toggle button and all the wiring were pre-built. You focused on the design — and still got to experience the power of a custom hook. That's the collaboration between design and engineering in React.
