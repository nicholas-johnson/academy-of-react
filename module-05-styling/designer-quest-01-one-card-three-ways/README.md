# Designer Quest: One Card, Three Ways

> **Quick Start:** A starter template is in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story

The Academy's Spell Archive recently got a fresh batch of spell data, but the display cases look *terrible*. Three junior developers each wired up a `SpellCard` using a different CSS approach — **CSS Modules**, **styled-components**, and **Tailwind CSS** — but none of them bothered with the visual design. The cards work, they show the right data, but they're an eyesore: white boxes, Times New Roman, zero spacing.

Professor Hooksweasel has asked you — the design specialist — to give each card a polished dark-theme makeover. You won't touch any JavaScript logic. You'll only edit CSS values, styled-component template strings, and Tailwind class names.

---

## Getting Started

```bash
cd starter
npm install
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`). You should see **three identical ugly cards** side by side on a dark background. They all display the same spell — "Fireball" — but they look terrible on purpose. That's your starting point.

---

## What You'll See

Three white, unstyled cards in a row. Each card has:

- A spell name heading
- An element badge (says "fire")
- A power bar (should show 85% fill, but it looks broken)
- A short description

All three show the same data. The only difference is *how* they're styled under the hood. Your job is to make each one look great.

---

## Task 1 — CSS Modules

**Open:** `src/SpellCardModules.module.css`

This file contains plain CSS classes that are automatically scoped to the component. You'll see ugly starter styles — white backgrounds, no padding, Times New Roman font.

**What to change:**

- Change the `.card` background from `white` to a dark colour like `#1e293b`
- Change the text colour to something light like `#e2e8f0`
- Add `padding` (try `1.5rem`), `border-radius` (try `1rem`), and remove the basic border
- Give `.card` a subtle `box-shadow` and a hover transform (e.g. `translateY(-4px)`)
- Style the `.name` heading with a larger font size and a bright colour like `#a5b4fc`
- Give the `.badge` a coloured background (`#ef4444` for fire), white text, rounded corners, and small padding
- Make the `.powerBar` background darker (`#334155`) with rounded corners
- Give the `.powerFill` a gradient background (e.g. `linear-gradient(90deg, #6366f1, #8b5cf6)`) and rounded corners
- Style the `.description` with a muted text colour like `#94a3b8`

**You're done when:** the first card has a polished dark look with a glowing power bar, coloured badge, and smooth hover effect.

---

## Task 2 — Styled Components

**Open:** `src/SpellCardStyled.jsx`

This file uses JavaScript template strings (the backtick sections after `styled.div\`...\``) to define CSS directly in the component file. Look for the `/* 🎨 TASK 2` comment markers.

**What to change:**

Same visual result as Task 1, but you're editing the CSS inside the backtick strings:

- In `StyledCard`: change `background` to `#1e293b`, `color` to `#e2e8f0`, add `padding`, `border-radius`, `box-shadow`, and a `&:hover` block with `transform: translateY(-4px)`
- In `SpellName`: change `color` to `#a5b4fc`, increase `font-size`
- In `ElementBadge`: add `background` (`#ef4444`), `color: white`, `border-radius`, `padding`
- In `PowerBarTrack`: change `background` to `#334155`, add `border-radius`, set a fixed `height`
- In `PowerFill`: add a `background: linear-gradient(...)`, `border-radius`, set `height: 100%`
- In `Description`: change `color` to `#94a3b8`

**You're done when:** the middle card matches the first card's dark theme.

---

## Task 3 — Tailwind CSS

**Open:** `src/SpellCardTailwind.jsx`

This file uses Tailwind utility classes — short class names like `bg-white`, `text-black`, `p-4`. You'll replace the ugly class names with better ones.

**What to change:**

- On the outer card `div`: replace `bg-white text-black border font-serif` with classes like `bg-slate-800 text-slate-200 rounded-2xl p-6 shadow-lg hover:-translate-y-1 transition-transform`
- On the spell name `h3`: replace `text-base` with something like `text-2xl font-bold text-indigo-300`
- On the badge `span`: replace `border text-xs` with classes like `bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full`
- On the power bar outer `div`: replace `border` with `bg-slate-700 rounded-full h-3 overflow-hidden`
- On the power fill inner `div`: replace `bg-gray-400` with `bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full`
- On the description `p`: replace `text-sm` with `text-sm text-slate-400 leading-relaxed`

**You're done when:** the third card matches the other two — all three should look like a cohesive set.

---

## What the JavaScript Was Doing

You didn't need to write any JavaScript for this quest, but here's what each approach does behind the scenes — good to know when talking to developers:

**CSS Modules** (`SpellCardModules.module.css`)
Regular CSS files, but each class name gets automatically renamed to something unique (like `.card_a1b2c3`) so styles never leak between components. You write normal CSS, just in a `.module.css` file.

**styled-components** (`SpellCardStyled.jsx`)
CSS written inside JavaScript using tagged template literals. Each styled block creates a real React component. The CSS is scoped automatically and can use JavaScript variables if needed.

**Tailwind CSS** (`SpellCardTailwind.jsx`)
A utility-first CSS framework. Instead of writing CSS rules, you compose styles from small single-purpose classes directly in the HTML/JSX. `bg-slate-800` sets the background, `p-6` adds padding, `rounded-2xl` rounds corners, etc.

All three produce the same visual result — they're just different tools for getting CSS onto the page.

---

**Next:** Try changing the spell data in `App.jsx` (the `spell` object at the top) to see all three cards update at once.
