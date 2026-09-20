# Spec: Spell Catalog

## Goal

A student can browse academy spells, filter them by element, and read one spell’s details in a dialog without leaving the list.

## Screens

One screen: catalog. Detail is a dialog over that screen, not a route.

## Component tree

- `App` — owns fetch status, filter, selected id
  - Filter buttons
  - `SpellList` — receives the already-filtered spells
  - `SpellDialog` — mounted only when a spell is selected

## Data shape

```ts
interface Spell {
  id: string
  name: string
  element: "fire" | "ice" | "lightning" | "healing" | "arcane"
  power: number
  description: string
}
```

All fields required. `arcane` exists so the empty-filter state is clickable.

## States

- Loading: “Opening the archives…” with `role="status"`
- Error: message from the failed fetch with `role="alert"`; Reload retries
- Empty: filter matches nothing — dashed empty message, not a blank page
- Success: list of buttons, one per spell

## Filter

Filter by `element`. State lives in `App` (`useState`). URL does not change. “All” plus each element.

## Detail dialog

Clicking a spell opens `SpellDialog`. Overlay click and Close dismiss it. Must not navigate. Title is labelled with `aria-labelledby`.

## Accessibility

Filters and list rows are `<button>`s, not clickable `div`s. Dialog has `role="dialog"` and `aria-modal`. Close is a button.

## Out of scope

- Next.js / `'use client'`
- Zustand, Redux, or Context for this screen
- A `/spells/:id` route
- Packages not in `package.json`

## Done when

- [ ] Loading is visible on first paint
- [ ] Simulate error shows an alert; Reload recovers
- [ ] Arcane filter shows the empty message
- [ ] Fire filter shows Fireball only
- [ ] Opening a spell shows a dialog; closing returns to the same list and filter
- [ ] No key warnings, no `any`
