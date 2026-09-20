# Familiar's Codex — Agent Instructions

This is a Vite + React 18 + TypeScript + Tailwind 3 app. shadcn-style primitives live in `src/components/ui/` as **source in this repo**. Edit them directly. Do not wrap them in a new abstraction layer.

## Stack (do not change)

- React `^18.2.0` — not React 19 APIs (`use()`, form Actions) unless asked
- Vite — not Next.js. Do not add `'use client'`
- Tailwind `^3.4.1` — utility classes on the element, not CSS Modules or styled-components
- TypeScript strict — no `any`, no unused locals

## Patterns to use

- Typed props (`interface FooProps`)
- Colocate component + local state
- Composition via `children`
- Derived values computed during render, not stored in state
- Loading / error / empty / success as data

## Patterns to avoid

- Redux or Context for state a single tree can pass as props
- MUI / Chakra / `sx` props
- Barrel files that re-export the world
- Inventing packages that are not in `package.json`
- Putting secrets in client source

## Verification

After a change: `npm run build` (runs `tsc`) and click the flow in the browser. A screenshot is not verification.
