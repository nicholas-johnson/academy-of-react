# Familiar output

This folder is what a familiar produced from the prompt:

> make a nice spell dashboard with filters and details, use modern react

It is **not** the solution. It is the first draft you were warned about. Read it against your `SPEC.md`.

Files:

- `App.tsx` — `'use client'`, a Redux-shaped store, fetch with no ignore flag
- `SpellDetailPage.tsx` — a page, not a dialog
- `store.ts` — global store for a filter one component needed
- `spells.ts` — the data the spec would have named
