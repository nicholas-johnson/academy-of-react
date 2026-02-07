# Module 3: State with useState

## Story Context

Your wizard is growing stronger! But there's a problem: everything we've built so far is **static**. Props flow down, but they never change. How do we track a wizard's health after taking damage? How do we update mana after casting spells? 

Enter **state** — React's way of remembering values that can change over time. Professor Hooksweasel reveals the State Crystal: "With the `useState` hook, your components come alive!"

## Learning Objectives

By the end of this module, you will:
- Understand what state is and why it's needed
- Use the `useState` hook to create stateful variables
- Update state with setter functions
- Handle button clicks and form inputs
- Create controlled components (forms)
- Use conditional rendering based on state
- Build interactive, dynamic UIs

## React Concepts Covered

- The `useState` hook
- State vs Props
- Event handlers (onClick, onChange, onSubmit)
- Controlled components
- Conditional rendering
- Immutability and state updates

## JavaScript Concepts

- Array and object destructuring
- Event objects
- Preventing default behavior
- Immutability patterns
- Callback functions

## Slides

Start with the slide deck to introduce state concepts:

```bash
cd slides
npm install
npm run dev
```

The slides cover:
- Why we need state (the problem with static components)
- What state is and how it differs from props
- The useState hook syntax
- Rules of state
- Controlled components

## Setup Instructions

Continuing with Vite for this module!

1. Navigate to a demo folder (e.g., `demo-01-manual-rerender/`)
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open http://localhost:5173

**New to Vite?** See the comprehensive setup guide in [Module 2](../module-02-jsx-components/README.md#welcome-to-vite-).

## Demo Walkthrough

### Demo 1: Manual Re-rendering (The Problem)

Before `useState`, we had to manage state manually:
- Store values in module-level variables
- Manually call `render()` after every change
- This is tedious and error-prone!

This demo shows WHY we need `useState`.

### Demo 2: useState (The Solution)

The demo shows:

1. **Basic Counter** — The "Hello World" of state
2. **Controlled Input** — Form inputs tied to state
3. **Conditional Rendering** — Showing/hiding based on state

Key concepts:
- `useState` returns [value, setter function]
- Calling the setter function triggers a re-render automatically!
- State is **local** to each component instance
- Never mutate state directly (always use setter)

## The useState Hook

```jsx
import { useState } from 'react'; // In real apps
// With CDN: const { useState } = React;

function Counter() {
  // Declare state variable
  const [count, setCount] = useState(0);
  
  // Update state
  const increment = () => {
    setCount(count + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

## Quests

### Quest 1: Multiple State
**Difficulty**: ⭐⭐ Intermediate

Create an interface with multiple useState hooks that interact.

[Start Quest →](./quest-01-multiple-state/)

### Quest 2: Object State
**Difficulty**: ⭐⭐ Intermediate

Build an interface that manages state as objects with nested properties.

[Start Quest →](./quest-02-object-state/)

## Bonus Mastery Challenge

**The Battle Simulator**

Create a two-wizard battle:
- Each wizard has health and mana (state)
- Buttons to cast spells (costs mana, damages opponent)
- Button to rest (restores mana)
- Display winner when one reaches 0 health
- Reset button to start over

This combines multiple state variables, calculations, conditional rendering, and interactivity!

## Key Takeaways

- State is for values that change over time
- Props are passed from parent; state is owned by component
- `useState(initialValue)` returns [value, setValue]
- Calling setValue triggers a re-render
- Never mutate state directly - always use setter
- State updates are asynchronous
- Each component instance has its own state
- Controlled components tie form inputs to state
- Use state for interactivity

## State vs Props

| Props | State |
|-------|-------|
| Passed from parent | Owned by component |
| Read-only | Can be updated |
| Used for configuration | Used for interactivity |
| Like function arguments | Like function variables |

---

**Previous Module**: [Module 2: JSX and Components](../module-02-jsx-components/)

**Next Module**: [Module 4: Forms and Events](../module-04-forms-events/) — Master form handling, validation, and controlled inputs!

