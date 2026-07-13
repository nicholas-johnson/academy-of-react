# Designer Quest: The Roster Board

The Academy's student roster board needs updating. Some names are wrong, a new student just enrolled and isn't on the board yet, and honestly — the whole thing could use a fresh look. Professor Hooksweasel has asked you to fix it up.

You won't be writing code from scratch. Everything already works. Your job is to **change existing values** — names, text, colours — and watch the page update instantly.

---

## Before You Start

If this is your first time opening a code project, here's what you need to know:

- **Files** are listed in the sidebar on the left. Click a file name to open it.
- **Code** is just text. You can click anywhere in a file and type, just like a document.
- **Saving** matters. Press `Cmd + S` (Mac) or `Ctrl + S` (Windows) after each change. The browser will update automatically.
- **Quotes matter.** When you change text in code, make sure you keep the quote marks `"like this"` around your text. If you accidentally delete a quote, the page will break — just undo with `Cmd + Z` / `Ctrl + Z`.

Don't worry about breaking things. You can always undo, and nothing here is permanent.

---

## Getting Started

Open your terminal and run these two commands:

```bash
cd starter
npm install
npm run dev
```

- `npm install` downloads the project's dependencies (this only needs to happen once).
- `npm run dev` starts a local development server. It will show a URL — usually `http://localhost:5173` — open it in your browser.

---

## What You'll See

A dark-themed roster board showing **4 student cards** in a grid. Each card has:

- A student **name**
- A coloured **house badge** (Phoenix, Dragon, Griffin, or Serpent)
- A **level bar** showing their power level
- A **motto** in italics

The page heading says "Academy Roster" with a subtitle underneath. At the bottom, a counter shows how many students are displayed.

Everything works already. Your tasks are about changing what's displayed.

---

> **What's a Variable?**
>
> A variable is a labelled container that holds a value. `const students = [...]` creates a container called "students" that holds a list of student data. When you change what's inside the container, the screen changes too — React takes care of that automatically.

---

## Task 1 — Rename a Student

**Open:** `src/data.js`

Find the student named **"Aria Flameheart"** near the top of the file. You'll see a block that looks like this:

```js
{
  id: 1,
  name: "Aria Flameheart",
  house: "Phoenix",
  level: 88,
  motto: "From the ashes, we rise",
},
```

Each line is a **property** — a labelled piece of data. The text between the quotes is the **value**.

**What to do:**

1. Change `"Aria Flameheart"` to your own name (keep the quotes!)
2. Change `"Phoenix"` to a different house — try `"Dragon"`, `"Griffin"`, or `"Serpent"`
3. Change the motto to something you'd say
4. Save the file (`Cmd + S` / `Ctrl + S`)

Look at the browser. The first card now shows your name, your house badge colour, and your motto. You just changed a **variable** — the data that feeds the screen.

**You're done when:** the first card shows your name, a different house badge, and your custom motto.

---

## Task 2 — Add a New Student

**Open:** `src/data.js`

The Academy has a new enrolment! You need to add a 5th student to the roster.

**What to do:**

1. Find the comment that says `🎨 TASK 2` near the bottom of the student list
2. Copy an existing student block — everything from the `{` to the `},` (including the comma). For example, copy this whole chunk:

```js
  {
    id: 4,
    name: "Milo Shadowveil",
    house: "Serpent",
    level: 64,
    motto: "Still waters cut deepest",
  },
```

3. Paste it just below the `🎨 TASK 2` comment
4. Change the values:
   - Set `id` to `5` (no quotes around numbers)
   - Change `name` to any name you like
   - Pick a `house`: `"Phoenix"`, `"Dragon"`, `"Griffin"`, or `"Serpent"`
   - Set `level` to any number from 1 to 100
   - Write a new `motto`
5. Save the file

**You're done when:** 5 cards appear on the page, and the footer says "Showing 5 students". Your new student has their own card with the correct house colour.

---

## Task 3 — Change the Page Heading

**Open:** `src/App.jsx`

At the top of this file, you'll see two lines:

```js
const PAGE_TITLE = "Academy Roster";
const SUBTITLE = "Current students enrolled at the Arcane Academy";
```

These are **variables** too — simple ones that each hold a single piece of text (called a "string" in code). The page heading reads directly from them.

**What to do:**

1. Change `"Academy Roster"` to something else — try `"The Great Roster"` or `"Hall of Champions"`
2. Change the subtitle text to anything you like
3. Save the file

**You're done when:** the page heading and subtitle show your new text.

---

## Task 4 — Restyle the Cards with CSS Variables

**Open:** `src/StudentCard.module.css`

At the very top of this file, you'll see a section called **CSS Custom Properties**:

```css
:root {
  --card-bg: #1e293b;
  --card-border: #334155;
  --card-radius: 1rem;
  --card-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}
```

These work like variables, but for styling. Every card on the page reads from these four values. Change one, and every card changes.

**What to do:**

1. Change `--card-bg` to a different dark colour — try `#1a1a2e` (deep navy) or `#1c1917` (warm dark)
2. Change `--card-border` to `#4a4a6a` or another colour you like
3. Change `--card-radius` to `1.5rem` (rounder) or `0.5rem` (sharper corners)
4. Change `--card-shadow` — try `0 8px 32px rgba(0, 0, 0, 0.45)` for a stronger shadow, or `none` for flat cards
5. Save the file

**You're done when:** all cards look different from how they started — different background, border, corner roundness, or shadow.

---

## What the JavaScript Was Doing

You didn't write any JavaScript in this quest, but here's what was happening behind the scenes — good context for when you work alongside developers:

**Variables** (`const students = [...]`, `const PAGE_TITLE = "..."`)
A variable stores a value and gives it a name. When React renders the page, it reads these variables and puts their values on screen. Change the variable, and the screen updates.

**Objects** (`{ id: 1, name: "Aria", ... }`)
An object groups related data together using labelled properties. Each student is an object with properties like `name`, `house`, `level`, and `motto`.

**Arrays** (`[student1, student2, ...]`)
An array is a list. The `students` variable holds an array of student objects. When you added a 5th student, you added another item to this list.

**`.map()`** (in App.jsx)
The `.map()` method loops through the students array and creates one `StudentCard` for each student. That's why adding a student to the data automatically added a card to the page — no extra wiring needed.

---

**Well done!** You've changed variables, added data to an array, updated text, and restyled components — all without writing a single line of logic. Next up, you'll learn how React **components** break a page into reusable pieces.
