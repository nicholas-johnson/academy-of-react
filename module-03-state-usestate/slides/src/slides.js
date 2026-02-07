export const slides = [
  {
    type: "title",
    content: {
      title: "State with useState",
      subtitle: "Module 3: Making Components Come Alive",
      emoji: "⚡",
    },
  },
  {
    type: "standard",
    content: {
      title: "The Problem",
      points: [
        "Our components are static",
        "Props flow down but never change",
        "How do we track health after damage?",
        "How do we update mana after casting?",
        "We need values that can CHANGE...",
      ],
      emoji: "🤔",
    },
  },
  {
    type: "title",
    content: {
      title: "Enter State!",
      subtitle: "Values that change over time",
      emoji: "✨",
    },
  },
  {
    type: "standard",
    content: {
      title: "What is State?",
      points: [
        "Data that belongs to a component",
        "Can change over time",
        "When state changes, component re-renders",
        "Each component instance has its own state",
        'The "memory" of your component',
      ],
      emoji: "🧠",
    },
  },
  {
    type: "standard",
    content: {
      title: "Events: Responding to Users",
      points: [
        "onClick — When user clicks a button",
        "onChange — When input value changes",
        "onSubmit — When form is submitted",
        "Events trigger functions that update state",
        "camelCase in React (onClick not onclick)",
      ],
      emoji: "👆",
    },
  },
  {
    type: "rules",
    content: {
      title: "Common Event Patterns",
      rules: [
        {
          rule: "onClick",
          example: "<button onClick={handleClick}>",
          icon: "🖱️",
        },
        {
          rule: "onChange",
          example: "<input onChange={handleChange}>",
          icon: "⌨️",
        },
        {
          rule: "onSubmit",
          example: "<form onSubmit={handleSubmit}>",
          icon: "📤",
        },
        {
          rule: "Arrow function",
          example: "onClick={() => setCount(count + 1)}",
          icon: "➡️",
        },
      ],
    },
  },
  {
    type: "comparison",
    content: {
      title: "Button vs Link",
      left: {
        label: "<button>",
        items: [
          "Performs an ACTION",
          "Updates state, submits forms",
          "onClick to handle",
          "Keyboard: Space or Enter",
        ],
      },
      right: {
        label: "<a> (link)",
        items: [
          "NAVIGATES to a URL",
          "Goes to another page",
          'href="/somewhere"',
          "Keyboard: Enter only",
        ],
      },
    },
  },
  {
    type: "standard",
    content: {
      title: "Choose the Right Element",
      points: [
        'Does it GO somewhere? Use <a href="...">',
        "Does it DO something? Use <button>",
        "Never: <div onClick={...}> (not accessible!)",
        "Never: <a onClick={...}> without href",
        "Screen readers announce them differently",
      ],
      emoji: "♿",
    },
  },
  {
    type: "standard",
    content: {
      title: "Why Not <div onClick>?",
      points: [
        "No keyboard focus — Tab key skips it",
        "No Space/Enter key handling",
        "Screen readers don't announce as interactive",
        "Missing semantic meaning",
        "Just use <button> — free accessibility!",
      ],
      emoji: "🚫",
    },
  },
  {
    type: "title",
    content: {
      title: "This is Reactivity!",
      subtitle: "That's why it's called React",
      emoji: "⚛️",
    },
  },
  {
    type: "standard",
    content: {
      title: "The React Cycle",
      points: [
        "1. User triggers an EVENT (click, type, submit)",
        "2. Event handler updates STATE",
        "3. React REACTS — automatically re-renders",
        "4. UI updates to show new state",
        "You describe WHAT to show, React handles WHEN to update",
      ],
      emoji: "🔄",
    },
  },
  {
    type: "comparison",
    content: {
      title: "State vs Props",
      left: {
        label: "Props",
        items: [
          "Passed from parent",
          "Read-only (immutable)",
          "Like function arguments",
          "For configuration",
        ],
      },
      right: {
        label: "State",
        items: [
          "Owned by component",
          "Can be updated",
          "Like function variables",
          "For interactivity",
        ],
      },
    },
  },
  {
    type: "code",
    content: {
      title: "The useState Hook",
      code: `import { useState } from 'react';

function Counter() {
  // Declare state: [value, setValue]
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Add One
      </button>
    </div>
  );
}`,
      highlights: [
        "useState(0) — Initial value is 0",
        "count — Current state value",
        "setCount — Function to update state",
        "Calling setCount triggers re-render!",
      ],
    },
  },
  {
    type: "rules",
    content: {
      title: "useState Rules",
      rules: [
        {
          rule: "Call at top level",
          example: "Not inside loops or conditions",
          icon: "1️⃣",
        },
        {
          rule: "Use the setter function",
          example: "setCount(5) not count = 5",
          icon: "2️⃣",
        },
        {
          rule: "State updates are async",
          example: "New value on next render",
          icon: "3️⃣",
        },
        {
          rule: "Don't mutate directly",
          example: "Create new objects/arrays",
          icon: "4️⃣",
        },
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Controlled Components",
      points: [
        "Form inputs tied to state",
        "value={state} — display current state",
        "onChange — update state when user types",
        'React is the "source of truth"',
        "Enables validation, formatting, sync",
      ],
      emoji: "🎮",
    },
  },
  {
    type: "code",
    content: {
      title: "Controlled Input Example",
      code: `function NameForm() {
  const [name, setName] = useState('');
  
  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <p>Hello, {name || 'stranger'}!</p>
    </div>
  );
}`,
      highlights: [
        "value={name} — Input shows state",
        "onChange — Updates state on every keystroke",
        "e.target.value — The new input value",
        "UI always reflects current state",
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Module 3 Goals",
      points: [
        "Use useState for interactive values",
        "Handle clicks and form inputs",
        "Build controlled components",
        "Work with object and array state",
        "Understand state vs props",
      ],
      emoji: "🎯",
    },
  },
  {
    type: "title",
    content: {
      title: "Let's Code!",
      subtitle: "Time to make things interactive",
      emoji: "🚀",
    },
  },
];
