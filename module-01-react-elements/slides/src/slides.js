export const slides = [
  {
    type: "title",
    content: {
      title: "React Fundamentals",
      subtitle: "Building Modern User Interfaces",
      emoji: "⚛️",
    },
  },
  {
    type: "welcome",
    content: {
      title: "Welcome to the Academy!",
      points: [
        "👋 Welcome to React training",
        "🎯 By the end, you'll build real React applications",
        "🧙‍♂️ We'll learn through the Wizard Academy story",
        "💪 Hands-on quests at every step",
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
        "Declarative — describe WHAT you want, not HOW",
        "Used by: Facebook, Instagram, Netflix, Airbnb, and more",
      ],
      emoji: "🤔",
    },
  },
  {
    type: "standard",
    content: {
      title: "Why Learn React?",
      points: [
        "📈 Most popular frontend framework (by far)",
        "💼 High demand in job market",
        "🔄 Reusable components save time",
        "⚡ Virtual DOM = fast updates",
        "🌐 Huge ecosystem and community",
        "📱 React Native for mobile apps",
      ],
      emoji: "🚀",
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
        "📚 13 Modules covering React fundamentals to advanced",
        "🎯 Each module has demos and quests",
        "✨ Demos: Watch and learn",
        "⚔️ Quests: Hands-on practice",
        "🏆 Side Quests: Optional projects to build",
      ],
      emoji: "🗺️",
    },
  },
  {
    type: "modules",
    content: {
      title: "What We'll Cover",
      modules: [
        { num: "1-2", name: "React Elements & JSX", icon: "🧱" },
        { num: "3-4", name: "State & Forms", icon: "⚡" },
        { num: "5-6", name: "Effects & Styling", icon: "🎨" },
        { num: "7-8", name: "Children & Hooks", icon: "🪝" },
        { num: "9-10", name: "Custom Hooks & Context", icon: "🧭" },
        { num: "11-13", name: "Router, State Mgmt & SSR", icon: "🚀" },
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Resources",
      points: [
        "📖 Course README — Start here!",
        "📁 Each module has its own folder",
        "💡 INSTRUCTOR_NOTES.md — Teaching guides",
        "🧪 demo/ folders — Live code examples",
        "⚔️ quest-XX/ folders — Your challenges",
        "📚 extras/ — Tailwind CSS & TypeScript guides",
      ],
      emoji: "📚",
    },
  },
  {
    type: "standard",
    content: {
      title: "How to Succeed",
      points: [
        "👀 Watch the demos carefully",
        "⌨️ Type the code yourself (don't copy-paste)",
        "🐛 Embrace errors — they teach you!",
        "❓ Ask questions anytime",
        "🔄 Practice, practice, practice",
      ],
      emoji: "🎯",
    },
  },
  {
    type: "standard",
    content: {
      title: "Module 1: React Elements",
      points: [
        "Understanding React.createElement()",
        "How React builds the UI tree",
        "Why this matters (even though we'll use JSX later)",
        "Rendering to the DOM with ReactDOM",
        "Building without a build step!",
      ],
      emoji: "🧱",
    },
  },
  {
    type: "code",
    content: {
      title: "Rendering Lists with .map()",
      code: `const students = [
  { name: "Harry", house: "Gryffin" },
  { name: "Luna", house: "Ravenclaw" },
  { name: "Draco", house: "Slytherin" }
];

// Transform data into React elements
const studentElements = students.map(student =>
  React.createElement(
    "div",
    { className: "student" },
    student.name + " - " + student.house
  )
);

// Render the array of elements
root.render(
  React.createElement("div", null, studentElements)
);`,
      highlights: [
        ".map() transforms each item into a React element",
        "Returns a new array of elements",
        "React can render arrays of elements directly",
        "This pattern is fundamental to React",
      ],
    },
  },
  {
    type: "title",
    content: {
      title: "Let's Begin!",
      subtitle: "Time for Demo 1: React.createElement()",
      emoji: "🚀",
    },
  },
];
