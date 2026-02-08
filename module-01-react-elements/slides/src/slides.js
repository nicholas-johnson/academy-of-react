export const slides = [
  {
    type: "title",
    content: {
      title: "React Fundamentals",
      subtitle: "Building Modern User Interfaces",
      icon: "atom",
    },
  },
  {
    type: "welcome",
    content: {
      title: "Welcome to the Academy!",
      points: [
        "Welcome to React training",
        "By the end, you'll build real React applications",
        "We'll learn through the Wizard Academy story",
        "Hands-on quests at every step",
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "What is React?",
      points: [
        "A JavaScript library for building user interfaces",
        "Created by Facebook (Meta) in 2013",
        "Component-based architecture",
        "Declarative: describe WHAT you want, not HOW",
        "Used by: Facebook, Instagram, Netflix, Airbnb",
      ],
      icon: "atom",
    },
  },
  {
    type: "standard",
    content: {
      title: "Why Learn React?",
      points: [
        "Most popular frontend framework",
        "High demand in the job market",
        "Reusable components save time",
        "Virtual DOM enables fast updates",
        "Huge ecosystem and community",
        "React Native for mobile apps",
      ],
      icon: "trending-up",
    },
  },
  {
    type: "comparison",
    content: {
      title: "Traditional vs React",
      left: {
        label: "Traditional (Imperative)",
        code: `// Find the element
const btn = document.getElementById('btn');
const count = document.getElementById('count');

// Manually update DOM
btn.addEventListener('click', () => {
  const current = parseInt(count.textContent);
  count.textContent = current + 1;
});`,
      },
      right: {
        label: "React (Declarative)",
        code: `// Describe the UI
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
      },
    },
  },
  {
    type: "standard",
    content: {
      title: "Course Structure",
      points: [
        "13 Modules covering React fundamentals to advanced",
        "Each module has demos and quests",
        "Demos: Watch and learn",
        "Quests: Hands-on practice",
        "Side Quests: Optional projects to build",
      ],
      icon: "map",
    },
  },
  {
    type: "modules",
    content: {
      title: "What We'll Cover",
      modules: [
        { num: "1-2", name: "React Elements & JSX", icon: "layers" },
        { num: "3-4", name: "State & Forms", icon: "zap" },
        { num: "5-6", name: "Effects & Styling", icon: "palette" },
        { num: "7-8", name: "Children & Hooks", icon: "anchor" },
        { num: "9-10", name: "Custom Hooks & Context", icon: "compass" },
        { num: "11-13", name: "Router, State Mgmt & SSR", icon: "rocket" },
      ],
    },
  },
  {
    type: "title",
    content: {
      title: "Module 1",
      subtitle: "React Elements with createElement()",
      icon: "layers",
    },
  },
  {
    type: "standard",
    content: {
      title: "What You'll Learn",
      points: [
        "How React creates elements using JavaScript",
        "What the Virtual DOM is and why it matters",
        "How to render elements to the page",
        "How React efficiently updates the DOM",
        "Rendering lists of elements",
      ],
      icon: "target",
    },
  },
  {
    type: "code",
    content: {
      title: "React.createElement()",
      code: `// The fundamental building block of React
React.createElement(
  type,      // 'div', 'span', 'h1', or a component
  props,     // { className: 'card', id: 'main' }
  children   // Text, elements, or arrays
);

// Example: Create a heading
const heading = React.createElement(
  'h1',
  { className: 'title' },
  'Hello, Academy!'
);`,
      highlights: [
        "First argument: HTML tag name or component",
        "Second argument: props object (or null)",
        "Third+ arguments: children (content)",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "What createElement Returns",
      code: `// createElement returns a plain JavaScript object
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello'
);

// The element is just an object:
{
  type: 'h1',
  props: {
    className: 'title',
    children: 'Hello'
  }
}`,
      highlights: [
        "React elements are plain JavaScript objects",
        "They describe what should appear on screen",
        "They are cheap to create",
        "React uses these to build the Virtual DOM",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Nesting Elements",
      code: `// Elements can contain other elements
const card = React.createElement(
  'div',
  { className: 'card' },
  React.createElement('h2', null, 'Harry Potter'),
  React.createElement('p', null, 'House: Liondudesdor'),
  React.createElement('p', null, 'Level: 42')
);

// This creates a tree structure:
// <div class="card">
//   <h2>Harry Potter</h2>
//   <p>House: Liondudesdor</p>
//   <p>Level: 42</p>
// </div>`,
      highlights: [
        "Pass multiple children as additional arguments",
        "Creates a tree of elements",
        "This tree becomes the Virtual DOM",
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "The Virtual DOM",
      points: [
        "A lightweight copy of the real DOM in memory",
        "React elements form a tree (the Virtual DOM)",
        "When state changes, React builds a new tree",
        "React compares old and new trees (diffing)",
        "Only the differences get applied to the real DOM",
      ],
      icon: "tree",
    },
  },
  {
    type: "standard",
    content: {
      title: "Why Virtual DOM?",
      points: [
        "Real DOM operations are slow and expensive",
        "Virtual DOM operations are fast (plain objects)",
        "Batching: multiple updates combined into one",
        "Minimal DOM changes = better performance",
        "You describe the result, React handles updates",
      ],
      icon: "zap",
    },
  },
  {
    type: "code",
    content: {
      title: "Rendering to the DOM",
      code: `// Get the container element
const container = document.getElementById('root');

// Create a root (React 18+)
const root = ReactDOM.createRoot(container);

// Render your element tree
root.render(element);

// When you call render again, React:
// 1. Builds a new Virtual DOM
// 2. Compares with the previous one
// 3. Updates only what changed`,
      highlights: [
        "createRoot() creates a React root",
        "render() mounts elements to the DOM",
        "Subsequent renders trigger the diff algorithm",
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Render Batching",
      points: [
        "React batches multiple state updates together",
        "Instead of re-rendering after each change...",
        "...React waits and combines them into one render",
        "This prevents unnecessary DOM operations",
        "Automatic in React 18 for all updates",
      ],
      icon: "package",
    },
  },
  {
    type: "code",
    content: {
      title: "Rendering Lists with .map()",
      code: `const students = [
  { name: 'Harry', house: 'Liondudesdor' },
  { name: 'Luna', house: 'Scarybird' },
  { name: 'Draco', house: 'Snakeyguys' }
];

// Transform data into React elements
const elements = students.map(student =>
  React.createElement(
    'div',
    { className: 'student' },
    student.name + ' - ' + student.house
  )
);

// Render the array
root.render(
  React.createElement('div', null, elements)
);`,
      highlights: [
        ".map() transforms each item into an element",
        "Returns a new array of elements",
        "React can render arrays directly",
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Key Takeaways",
      points: [
        "React.createElement() creates element objects",
        "Elements describe what should appear on screen",
        "The Virtual DOM enables efficient updates",
        "ReactDOM.createRoot() and render() mount to the page",
        "React batches updates for performance",
        "This is the foundation for JSX (Module 2)",
      ],
      icon: "clipboard",
    },
  },
  {
    type: "title",
    content: {
      title: "Demo Time",
      subtitle: "Let's see createElement in action",
      icon: "code",
    },
  },
];
