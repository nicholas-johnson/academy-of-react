# Designer Quest: The Spell Shop

> **Quick Start:** A starter template is in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story

The Academy's new spell shop is open for business! A developer has wired up the whole thing — spells go in the cart, the count updates, items can be removed, the cart clears. It all **works perfectly**.

But the cart states look... unfinished. The empty cart is just the words "Cart is empty." The cart badge is a plain number floating next to the shopping cart icon. And when you add a spell, the only feedback is a sad little "✓" that appears and disappears. Professor Hooksweasel needs a designer to make these moments shine.

---

## Getting Started

```bash
cd starter
npm install
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`).

---

## What You'll See

A dark-themed spell shop with:

- **A top bar** with "Spell Shop" title and a cart icon
- **A grid of 8 spell cards** — each with an icon, name, element, power, price, and "Add to Cart" button
- **A cart sidebar** on the right

**Everything works right now.** Click "Add to Cart" on any spell — it appears in the cart. Click the ✕ to remove it. Click "Clear Cart" to empty it. The number next to the cart icon updates automatically.

But three things look ugly, and one number could use a tweak. That's your job.

---

## Task 1 — Design the Empty Cart State

**Open:** `src/App.jsx` and `src/App.css`

Right now, when the cart is empty, it just shows:

```
Cart is empty
```

That's boring! Replace the `<p>Cart is empty</p>` inside the `<div className="empty-cart">` with something more inviting. For example:

```jsx
<div className="empty-cart">
  <div className="empty-cart-icon">🛍️</div>
  <h3 className="empty-cart-heading">Your cart is empty</h3>
  <p className="empty-cart-subtitle">Browse the collection and add some spells!</p>
</div>
```

Then style it in `src/App.css` — find the `.empty-cart` class (it's currently empty) and add styles. Try centring the text, making the icon big, and using muted colours.

**You're done when:** the empty cart shows a friendly icon, a heading, and a subtitle — all centred and styled in muted tones.

---

## Task 2 — Design the Cart Badge

**Open:** `src/App.jsx` and `src/App.css`

The cart count is just a plain number sitting next to the 🛒 icon. It should be a proper notification badge — a little red circle with white text, positioned over the cart icon.

In `src/App.jsx`, you can optionally wrap the badge so it only shows when there are items:

```jsx
{totalItems > 0 && (
  <span className="cart-badge">{totalItems}</span>
)}
```

Then in `src/App.css`, find the `.cart-badge` class (currently empty) and style it. Think:

- Red or accent background (`#ef4444`)
- White text, small bold font
- `position: absolute` with `top` and `right` to overlap the cart icon
- `border-radius: 9999px` for a circle
- `min-width` so single digits still look round
- Maybe a pop animation when it appears

**You're done when:** adding a spell makes a red badge appear on the cart icon showing the item count, and it disappears when the cart is empty.

---

## Task 3 — Design the "Added!" Feedback

**Open:** `src/components/SpellCard.jsx` and `src/App.css`

When you add a spell, a brief "✓" appears on the card. It works — but it's invisible and unstyled. Make it a proper animated notification.

In `src/components/SpellCard.jsx`, find the feedback zone and change the text:

```jsx
{isJustAdded && (
  <div className="added-feedback">✓ Added!</div>
)}
```

Then in `src/App.css`, find the `.added-feedback` class (currently empty) and style it:

- Green accent background (`#22c55e`)
- White text, small bold font
- `position: absolute` (top-right corner of the card)
- `border-radius: 9999px` for a pill shape
- Connect the existing `@keyframes fadeInOut` animation: `animation: fadeInOut 1.5s ease forwards`
- Add `pointer-events: none` so it doesn't block clicks

The `@keyframes fadeInOut` animation is already defined in the CSS file — you just need to connect it.

**You're done when:** adding a spell shows a green "✓ Added!" pill that slides in, holds, and fades out smoothly.

---

## Task 4 — Change the Feedback Duration

**Open:** `src/store/useCartStore.js`

Near the top of this file, you'll find a line that says:

```js
const FEEDBACK_DURATION_MS = 2000;
```

This controls how long the "Added!" message shows (in milliseconds). `2000` means 2 seconds.

**Change it to a different number:**

- Try `1000` for a snappy, quick flash
- Try `1500` for a balanced feel
- Try `3000` for a slow, leisurely fade

Pick whatever feels best to you. Save, add a spell, and see the difference.

**You're done when:** the "Added!" feedback shows for your chosen duration and it feels intentional, not too fast, not too slow.

---

## What the JavaScript Was Doing

You didn't need to write JavaScript for this quest (except changing one number). Here's what was happening behind the scenes:

**The Store** (`src/store/useCartStore.js`)

The store is like a shared notebook that every component can read from and write to. It keeps track of:

- `items` — the list of spells in the cart
- `justAdded` — which spell was just added (for the feedback animation)

When someone clicks "Add to Cart," the store updates `items` and sets `justAdded` to that spell's ID. After a timeout (the number you changed in Task 4), it clears `justAdded` back to `null`.

**Why everything updates automatically**

This is the magic of a Zustand store. The badge reads `totalItems` from the store. The cart list reads `items`. The spell card reads `justAdded`. When any of these change, only the components that care about that specific piece of data re-render. You didn't have to wire up any of that — the store handles it all.

Think of it this way: **the store's state drives everything on screen.** You designed how those states *look*. The store decided *when* they show and hide.

---

**Tip:** Try adding the same spell multiple times — the quantity goes up! Try removing items one by one. Notice how the badge, cart list, and total all stay perfectly in sync. That's the store at work.
