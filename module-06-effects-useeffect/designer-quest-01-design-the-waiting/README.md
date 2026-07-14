# Designer Quest: Design the Waiting

## The Story

The War Room's intelligence feed is live. Data streams in from academies across the realm, but the interface was thrown together by an engineer in a hurry. The intelligence cards look great once they load — but the **loading screen** is just bare text, the **error state** is an ugly red line, and if no data comes back there's... nothing.

Your mission: design the states people actually spend time looking at.

---

## Getting Started

```bash
cd starter
npm install
npm run dev
```

Open the URL shown in terminal (usually http://localhost:5173).

## What You'll See

1. The app shows **"Loading..."** for 2 seconds (an artificial delay so you can actually see it)
2. Then intelligence cards appear in a styled grid
3. Check **"Simulate Failure"** and click **Refresh** to see the error state

Notice how polished the cards look vs. how bare the loading/error states are? That's your job.

---

## Your Tasks

### 🎨 Task 1 — Design the Loading State

|                      |                                                                                                                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File**             | `src/App.jsx`                                                                                                                                                                                                             |
| **Find**             | The comment `{/* 🎨 TASK 1: Design the loading state */}`                                                                                                                                                                 |
| **What to change**   | Replace the bare `<p>Loading...</p>` with a proper loading UI. Try a spinner, skeleton cards, a progress message — anything better than plain text. Use the class `loading-zone` which is already connected in `App.css`. |
| **You're done when** | The loading screen looks intentional, not broken.                                                                                                                                                                         |

### 🎨 Task 2 — Design the Error State

|                      |                                                                                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File**             | `src/App.jsx`                                                                                                                                                         |
| **Find**             | The comment `{/* 🎨 TASK 2: Design the error state */}`                                                                                                               |
| **What to change**   | Replace the ugly inline-styled error with a proper error card. The Refresh button is already wired — just make it look good. Use the class `error-zone` in `App.css`. |
| **You're done when** | Checking "Simulate Failure" and clicking Refresh shows something a user would trust, not fear.                                                                        |

### 🎨 Task 3 — Design the Empty State

|                      |                                                                                                                                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File**             | `src/App.jsx`                                                                                                                                                                                                    |
| **Find**             | The comment `{/* 🎨 TASK 3: Design the empty state */}`                                                                                                                                                          |
| **What to change**   | Add a meaningful empty state inside the existing conditional. Right now it just says "No reports." Make it helpful — maybe suggest what to do, or show an illustration. Use the class `empty-zone` in `App.css`. |
| **You're done when** | An empty feed looks like a designed screen, not a bug.                                                                                                                                                           |

### 🎨 Task 4 — Change the Loading Duration

|                      |                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| **File**             | `src/App.jsx`                                                                                      |
| **Find**             | The line `const FETCH_DELAY_MS = 2000` near the top (marked with 🎨 TASK 4)                        |
| **What to change**   | Change `2000` to a different number (milliseconds). Try `500`, `4000`, `10000` — see how it feels. |
| **You're done when** | You understand that this one number controls how long your loading design is visible.              |

### 🎨 Task 5 — Add Your Own Intelligence Report

|                      |                                                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **File**             | `public/api/intelligence.json`                                                                                    |
| **Find**             | The array of reports                                                                                              |
| **What to change**   | Add a 5th report object with your own academy name, threat level, and intel. Copy the format of existing entries. |
| **You're done when** | Your new report appears in the card grid after loading.                                                           |

---

## Extension: Create Your First Component — `<SkeletonCard />`

In Task 1 you probably wrote the same placeholder card markup several times — once for each ghost card. That works, but if you want to change the design you have to update every copy. Components let you write it once and reuse it everywhere.

This task walks you through creating a **SkeletonCard** component in its own file.

### Step 1 — Create the component file

Create a new folder and file: `src/components/SkeletonCard.jsx`

Paste this code into it:

```jsx
import "./SkeletonCard.css";

function SkeletonCard() {
  return <div className="skeleton-card"></div>;
}

export default SkeletonCard;
```

That's a complete React component. It's just a function that returns some JSX.

### Step 2 — Add the component styles

Create `src/components/SkeletonCard.css` and paste these styles:

```css
.skeleton-card {
  height: 180px;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid #334155;
  border-radius: 1rem;
  animation: pulse-skeleton 1.5s ease-in-out infinite;
}

@keyframes pulse-skeleton {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
```

### Step 3 — Use it in App.jsx

Add this import near the top of `src/App.jsx`, below the existing imports:

```jsx
import SkeletonCard from "./components/SkeletonCard";
```

Then find your loading zone and replace your placeholder cards with the component. Put them inside a wrapper div with the class `skeleton-grid`:

```jsx
<section className="loading-zone">
  <p>Gathering intelligence...</p>
  <div className="skeleton-grid">
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </div>
</section>
```

### Step 4 — Add the grid styles

If you don't already have a `.skeleton-grid` rule in `App.css`, add this:

```css
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
}
```

**You're done when:** The loading screen shows a grid of pulsing ghost cards, and editing `SkeletonCard.jsx` once changes all four cards at the same time.

---

## File Map

```
starter/
├── src/
│   ├── main.jsx        ← Boot file (don't touch)
│   ├── App.jsx         ← ⭐ Your main workspace (Tasks 1-4)
│   ├── App.css         ← Styles (loading-zone, error-zone, empty-zone ready for you)
│   ├── index.css       ← Base reset (don't touch)
│   └── components/
│       ├── SkeletonCard.jsx  ← ⭐ Your first component (Extension)
│       └── SkeletonCard.css  ← Styles for the skeleton card
├── public/
│   └── api/
│       └── intelligence.json  ← ⭐ Your data file (Task 5)
├── index.html
├── package.json
└── vite.config.js
```

---

## What the JavaScript Was Doing (Plain English)

The app uses a React feature called `useEffect` to fetch data when the page loads. Here's what happens in non-code terms:

1. **Page opens** → React says "I need data" and starts fetching from a JSON file
2. **While waiting** → The `loading` variable is `true`, so React shows whatever is in the loading section
3. **If something goes wrong** → The `error` variable gets a message, so React shows the error section
4. **If it works** → The `intel` variable gets the data, so React shows the cards

The artificial delay (`FETCH_DELAY_MS`) just makes step 2 last longer so you can actually see and design it. In real apps, this delay is the network — sometimes fast, sometimes slow, sometimes it fails entirely.

**The takeaway:** Every fetch creates at least three UI states (loading, error, success). Designers must design all three, or users see ugly placeholder text during the most anxious moment — waiting.

---

## Tips

- **Ctrl+S / Cmd+S** saves and hot-reloads instantly
- Toggle "Simulate Failure" ON, then click Refresh to test your error design repeatedly
- Try setting `FETCH_DELAY_MS` to `10000` (10 seconds) while designing your loading state — gives you time to really look at it
- The success cards use CSS Grid — look at `.intel-grid` in `App.css` for inspiration
