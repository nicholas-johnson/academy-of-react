# Module 9: Custom Hooks

## Story Context

Advanced wizards create **reusable magic**! Custom hooks encapsulate logic that multiple components can share. Master the art of extracting and reusing stateful logic.

## Learning Objectives

- Extract reusable logic into custom hooks
- Follow "use" naming convention
- Compose built-in hooks
- Share stateful logic without HOCs or render props
- Test custom hooks

## React Concepts

- Custom hook patterns
- Hook composition
- Return type patterns (array vs object)
- When to extract a custom hook

## Slides

Introduction slides covering custom hooks:

```bash
cd slides
npm install
npm run dev
```

## Setup

Run `npm install` then `npm run dev`.

## Demo

The demo showcases three simple custom hooks:

```bash
cd demo
npm install
npm run dev
```

## Quests

1. **useLocalStorage** - Sync state with localStorage
2. **useFetch** - Reusable data fetching hook
3. **useDebounce** - Debounce any value

## Key Takeaways

- Custom hooks start with "use"
- They can use any built-in hooks inside
- Return whatever makes sense (value, array, object)
- Extract when logic is used in 2+ components
- Hooks can compose other hooks

---

**Previous Module**: [Module 8: Built-in React Hooks](../module-08-built-in-hooks/)

**Next Module**: [Module 10: Context API](../module-10-context-api/)
