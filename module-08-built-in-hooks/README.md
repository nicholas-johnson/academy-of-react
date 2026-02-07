# Module 8: Built-in React Hooks

## Story Context

**Hook Mastery Begins!** Before diving into advanced patterns, Professor Hooksweasel provides a comprehensive tour of React's built-in hooks — the fundamental spells every wizard must master.

"Each hook," she explains, "solves a specific problem. Understanding when to use which hook is the mark of a true React wizard."

## Learning Objectives

By the end of this module, you will:

- Understand ALL built-in React hooks
- Know when to use each hook
- Choose the right hook for the job
- Combine hooks effectively

## Built-in Hooks Overview

### State Hooks

| Hook | Purpose |
|------|---------|
| `useState` | Local component state |
| `useReducer` | Complex state with actions |

### Context Hooks

| Hook | Purpose |
|------|---------|
| `useContext` | Access context values |

### Ref Hooks

| Hook | Purpose |
|------|---------|
| `useRef` | DOM access, mutable values |
| `useImperativeHandle` | Customize ref exposed to parent |

### Effect Hooks

| Hook | Purpose |
|------|---------|
| `useEffect` | Side effects (data fetching, subscriptions) |
| `useLayoutEffect` | Synchronous effects (before paint) |
| `useInsertionEffect` | CSS-in-JS library use only |

### Performance Hooks

| Hook | Purpose |
|------|---------|
| `useMemo` | Memoize expensive calculations |
| `useCallback` | Memoize functions |
| `useTransition` | Non-blocking UI updates |
| `useDeferredValue` | Defer non-urgent updates |

### Other Hooks

| Hook | Purpose |
|------|---------|
| `useId` | Generate unique IDs (SSR-safe) |
| `useSyncExternalStore` | Subscribe to external stores |
| `useDebugValue` | Custom hook debugging |

## Slides

Introduction slides covering all built-in hooks:

```bash
cd slides
npm install
npm run dev
```

## Setup

Run `npm install` then `npm run dev`.

## Demo

The demo showcases multiple hooks working together:

```bash
cd demo
npm install
npm run dev
```

## Quests

1. **DOM Access** — Auto-focus input with useRef
2. **Persisting Values** — Track values without re-renders using useRef
3. **Media Controls** — Video controls with useRef
4. **Spell Inventory** — Manage complex state with useReducer

## Where Each Hook is Covered

| Hook | Module |
|------|--------|
| useState | Module 3 |
| useEffect | Module 5 |
| useRef | **This module** |
| useContext | Module 10 |
| useMemo, useCallback | Module 12 |
| useReducer | **This module** |

## Key Takeaways

- React has ~15 built-in hooks
- Most apps use 5-6 regularly: useState, useEffect, useRef, useContext, useMemo, useCallback
- Each hook has a specific purpose — use the right tool for the job

---

**Previous Module**: [Module 7: The Children Prop](../module-07-children-prop/)

**Next Module**: [Module 9: Custom Hooks](../module-09-custom-hooks/)
