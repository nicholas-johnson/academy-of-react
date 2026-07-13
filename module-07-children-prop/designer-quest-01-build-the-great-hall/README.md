# Build the Great Hall

> The Academy's new Great Hall needs a dashboard, and **YOU** are the architect. You have a box of beautiful, pre-built components — Cards, Sections, Stacks, and more. Your job is to arrange them into a stunning dashboard layout. No logic required — just composition.

## Getting Started

```bash
cd starter
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## What You'll See

A nearly empty page with one section that says "Start building your Great Hall here!" Your job is to fill it with a full Academy dashboard by composing the pre-built components together.

---

## Your Building Blocks

These components are already built, styled, and ready to use. You just arrange them like Lego bricks.

| Component | What it does | Props |
|-----------|-------------|-------|
| `<Card>` | A styled card container | `variant` — `"default"`, `"highlighted"`, or `"outlined"` |
| `<Section>` | A titled section with a heading | `title` — the section heading text |
| `<Stack>` | Arranges children in a row or column | `direction` — `"horizontal"` or `"vertical"` (default), `gap` — spacing like `"1rem"` |
| `<Sidebar>` | Two-column layout with a side panel | `sidebar` — JSX to render in the side panel |
| `<Modal>` | A popup overlay (bonus only) | `isOpen` — true/false, `onClose` — function, `title` — heading text |

Every one of these renders whatever you put **between its opening and closing tags** — that's the `children` prop in action.

```jsx
<Card>
  <p>Anything here becomes the card's content</p>
</Card>

<Section title="My Section">
  <p>This paragraph appears under the "My Section" heading</p>
</Section>

<Stack direction="horizontal" gap="1rem">
  <Card>First</Card>
  <Card>Second</Card>
  <Card>Third</Card>
</Stack>
```

---

## Tasks

### Task 1: Build the Sidebar Layout

Wrap your page in a `<Sidebar>` component. The sidebar prop takes JSX — put a simple navigation list there (Dashboard, Students, Spells, Battles). The main content area should start with a Section titled "Welcome to the Great Hall".

**You're done when:** You see a two-column layout with navigation links on the left and a welcome section on the right.

---

### Task 2: Stats Dashboard

Inside the main content area, create a horizontal `<Stack>` of 3 `<Card>` components showing stats from `data.js` — Total Students, Active Spells, and Upcoming Battles.

**You're done when:** Three cards sit side-by-side showing the academy stats.

---

### Task 3: Announcements

Below the stats, add a `<Section>` titled "Announcements". Inside it, put a vertical `<Stack>` of Cards — one for each announcement from `data.js`. Use `variant="highlighted"` for urgent ones.

**You're done when:** A column of announcement cards appears, with urgent ones visually distinct.

---

### Task 4: Top Students

Add another `<Section>` titled "Top Students" with a `<Card>` inside it containing a list of students from `data.js`.

**You're done when:** A section shows student names, houses, and levels in a card.

---

## Bonus: Add a Modal

This one requires a tiny bit of JavaScript (just copy-paste these two lines):

```jsx
// Add this line inside function App() BEFORE the return:
const [showModal, setShowModal] = React.useState(false);
```

```jsx
// Add this import at the top of the file:
import React from "react";
```

Then in your JSX, add a button and the Modal:

```jsx
<button className="modal-trigger" onClick={() => setShowModal(true)}>
  View Academy Rules
</button>

<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Academy Rules"
>
  <p>1. No magic in the corridors</p>
  <p>2. Respect all magical creatures</p>
  <p>3. Submit homework on time</p>
</Modal>
```

**You're done when:** Clicking the button opens a modal overlay, and clicking outside it (or the × button) closes it.

---

## What the JavaScript Was Doing

The `children` prop is the secret ingredient in all these components. When you write:

```jsx
<Card>
  <h3>Hello</h3>
  <p>World</p>
</Card>
```

React automatically passes everything between `<Card>` and `</Card>` as a special prop called `children`. Inside the Card component, it renders `{children}` wherever it wants that content to appear (inside the styled wrapper).

This is **composition** — building complex layouts by nesting simple building blocks. It's the same idea as HTML (a `<div>` inside a `<section>` inside a `<main>`) but with your own custom, styled components.

No logic. No state. Just nesting. That's the power of the children prop.
