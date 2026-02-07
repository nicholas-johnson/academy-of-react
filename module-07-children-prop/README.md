# Module 7: The Children Prop

## Story Context

The Academy needs reusable building blocks! Cards, modals, layouts — components that wrap other content. Professor Hooksweasel reveals the secret: the `children` prop. "A truly powerful component doesn't dictate its contents," she explains. "It provides structure and lets others fill in the details."

## Learning Objectives

By the end of this module, you will:

- Understand what the `children` prop is
- Build wrapper components (cards, containers, layouts)
- Create flexible, reusable UI components
- Compose complex interfaces from simple pieces

## React Concepts Covered

- The `children` prop
- Component composition
- Wrapper/container components
- Slot patterns (named children)

## The Children Prop

Everything between a component's opening and closing tags becomes `children`:

```jsx
// Using a Card component:
<Card>
  <h2>Title</h2>
  <p>Any content can go here!</p>
</Card>;

// Inside Card:
function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

The `children` prop contains the `<h2>` and `<p>` — Card doesn't need to know what's inside!

## Why This Matters

Without `children`, you'd need props for everything:

```jsx
// Inflexible — what if you want different content?
<Card title="Hello" body="Some text" />

// Flexible — put anything inside!
<Card>
  <h2>Hello</h2>
  <p>Some text</p>
  <button>Click me</button>
  <img src="..." />
</Card>
```

## Slides

Introduction slides covering the children prop:

```bash
cd slides
npm install
npm run dev
```

## Setup

Navigate to `demo/`, run `npm install`, then `npm run dev`.

## Quest

### Quest 1: Layout Components

**Difficulty**: ⭐⭐ Intermediate

Build reusable layout components using the `children` prop: Card, Section, Modal, and a two-column Layout.

[Start Quest →](./quest-01-layout-components/)

## Key Takeaways

- `children` is whatever you put between opening and closing tags
- Use `children` when the component wraps content
- This enables composition — building complex UIs from simple pieces
- Cards, modals, layouts, and containers all use this pattern

---

**Previous Module**: [Module 6: Styling in React](../module-06-styling/)

**Next Module**: [Module 8: Built-in React Hooks](../module-08-built-in-hooks/)
