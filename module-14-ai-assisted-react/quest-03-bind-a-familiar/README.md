# Quest 3: Bind a Familiar

You will put shadcn-style primitives **in this repo**, compose one screen, write the instructions file a familiar will actually follow, and change a component that now belongs to you.

An agent is optional. Copying primitives from the [module demo](../demo/) is in-bounds — that *is* the shadcn idea. Using the CLI is also in-bounds if you pin the same versions as the demo’s `package.json`. Do not let the CLI upgrade you to Tailwind v4 or React 19.

## Story Context

Rundoolius will not bind a familiar to a project with no conventions. The ledger must be composed from primitives that live beside your code, and the familiar must be told how this Academy writes React.

## Requirements

- Start from `starter/` (Vite + TypeScript + Tailwind, **no** `src/components/ui` yet)
- Add shadcn-style primitives: at least `Button`, `Input`, `Label`, `Table`, `Dialog` (and `Card` if you want it)
- Compose **one** screen: a form to bind a familiar, a table of bindings, a dialog (confirm unbind, or inspect a row)
- Write `AGENTS.md` with Academy conventions (see below)
- Change a copied primitive in `src/components/ui/` — a new variant, a radius, a comment that is *yours*. If you did not touch that folder, you have not learned why shadcn is in the stack

### `AGENTS.md` must say

- TypeScript, no `any`
- Tailwind utilities, not CSS Modules or styled-components
- Vite — do not add `'use client'` or invent Next.js
- Prefer Zustand over Redux if a store appears; prefer props over Context for this screen
- Colocate; do not hide files behind a catch-all barrel
- Do not invent packages missing from `package.json`
- Verify in the browser, not in the chat

## Acceptance Criteria

- [ ] `src/components/ui/` exists and is imported by your screen
- [ ] Form adds a row to the table
- [ ] Dialog opens from the table (detail or confirm)
- [ ] `AGENTS.md` covers the bullets above
- [ ] A primitive in `src/components/ui/` differs from the stock copy (variant, class, or documented tweak)
- [ ] `npm run dev` shows the screen; you clicked bind + dialog yourself

## Hints

- The demo already has the Vite `@` alias, CSS variables, and `cn()`. Steal that scaffolding; it is the pinned stack.
- `npx shadcn@latest` may disagree with this course’s Tailwind 3 pin. Prefer the demo, or pass the same versions.
- Changing `button.tsx` is the point. Wrapping it in `AcademyButton.tsx` that you never open is the old design-system habit.

[← Quest 2](../quest-02-spec-first/)
