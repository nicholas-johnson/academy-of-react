# Academy conventions for familiars

This is a Vite + React 18 + TypeScript + Tailwind 3 app. Primitives in `src/components/ui/` are **source in this repo**. Edit them. Do not wrap them in a parallel design-system package.

## Stack (do not change)

- React `^18.2.0` — not React 19 APIs unless asked
- Vite — not Next.js. Do not add `'use client'`
- Tailwind `^3.4.1` — utilities on the element. No CSS Modules, no styled-components
- TypeScript strict — no `any`

## Patterns to use

- Typed props (`interface Binding`)
- Colocate the screen and its state
- Composition via `children` and shadcn primitives
- Derived values computed during render
- If a store appears, Zustand — not Redux. For this screen, props and `useState` are enough. Do not invent Context.

## Patterns to avoid

- Barrel files that re-export the world
- MUI / Chakra / `sx`
- Packages that are not in `package.json`
- Secrets in client source

## Verification

After a change: `npm run build` (typecheck) and click bind → table row → dialog in the browser. Chat is not verification.
