# Module 4: State with useState

## Story Context

Your wizard is growing stronger! But there's a problem: everything we've built so far is **static**. Props flow down, but they never change. How do we track a wizard's health after taking damage? How do we update mana after casting spells? 

Enter **state** — React's way of remembering values that can change over time. Professor Hooksworth reveals the State Crystal: "With the `useState` hook, your components come alive!"

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

## Setup Instructions

Continuing with Vite for this module!

1. Navigate to the `demo/` folder
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open http://localhost:5173
5. Interact with the buttons and inputs
6. Study how state updates trigger re-renders

**New to Vite?** See the comprehensive setup guide in [Module 2](../module-02-jsx-components/README.md#welcome-to-vite-).

## Demo Walkthrough

The demo shows:

1. **Basic Counter** — The "Hello World" of state
2. **Controlled Input** — Form inputs tied to state
3. **Conditional Rendering** — Showing/hiding based on state

Key concepts:
- `useState` returns [value, setter function]
- Calling the setter function triggers a re-render
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

### Quest 1: Training System
**Difficulty**: ⭐⭐ Intermediate

Create a wizard training interface with buttons that update stats.

[Start Quest →](./quest-01-training-system/)

### Quest 2: Potion Brewing
**Difficulty**: ⭐⭐ Intermediate

Build a potion brewing interface with ingredient selection.

[Start Quest →](./quest-02-potion-brewing/)

### Quest 3: Roster Manager
**Difficulty**: ⭐⭐⭐ Intermediate-Advanced

Create a dynamic student roster with add/remove functionality.

[Start Quest →](./quest-03-roster-manager/)

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

**Previous Module**: [Module 3: Props and Composition](../module-03-props-composition/)

**Next Module**: [Module 5: Forms and Event Handling](../module-05-forms-events/) — Time to move to Vite and build more complex applications!

