export const slides = [
  {
    type: "title",
    content: {
      title: "JSX & Components",
      subtitle: "Module 2: The Modern Way",
      icon: "sparkles",
    },
  },
  {
    type: "standard",
    content: {
      title: "Remember This?",
      points: [
        'React.createElement("div", { className: "card" }, ...)',
        "Nested calls everywhere",
        "Hard to read",
        "Hard to write",
        "There must be a better way...",
      ],
      icon: "frown",
    },
  },
  {
    type: "title",
    content: {
      title: "Enter JSX!",
      subtitle: "JavaScript + XML",
      icon: "party-popper",
    },
  },
  {
    type: "comparison",
    content: {
      title: "The Transformation",
      left: {
        label: "createElement (Module 1)",
        code: `React.createElement(
  "div",
  { className: "card" },
  React.createElement("h1", null, "Hello"),
  React.createElement("p", null, "World")
)`,
      },
      right: {
        label: "JSX (Module 2)",
        code: `<div className="card">
  <h1>Hello</h1>
  <p>World</p>
</div>`,
      },
    },
  },
  {
    type: "standard",
    content: {
      title: "What is JSX?",
      points: [
        "Looks like HTML, but it's JavaScript!",
        "A syntax extension for JavaScript",
        "Compiles to createElement() calls",
        "Makes React code readable and writable",
        "NOT a template language — it's just JS",
      ],
      icon: "help-circle",
    },
  },
  {
    type: "rules",
    content: {
      title: "JSX Rules",
      rules: [
        {
          rule: "className not class",
          example: '<div className="card">',
          icon: "circle-dot",
        },
        {
          rule: "Curly braces for JS",
          example: "<p>{user.name}</p>",
          icon: "circle-dot",
        },
        {
          rule: "One parent element",
          example: "<div>...</div> or <>...</>",
          icon: "circle-dot",
        },
        { rule: "Close all tags", example: "<img /> <br />", icon: "circle-dot" },
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Expressions in JSX",
      points: [
        "{variable} — Insert a value",
        "{2 + 2} — Do math",
        "{user.name} — Access properties",
        '{isLoggedIn ? "Hi!" : "Login"} — Conditionals',
        "{items.map(i => <li>{i}</li>)} — Loops",
      ],
      icon: "braces",
    },
  },
  {
    type: "standard",
    content: {
      title: "Welcome to Vite!",
      points: [
        "Lightning-fast dev server",
        "Hot Module Replacement (instant updates)",
        "Proper npm package management",
        "No more CDN scripts!",
        "How professionals build React apps",
      ],
      icon: "zap",
    },
  },
  {
    type: "standard",
    content: {
      title: "Vite Commands",
      points: [
        "npm install — Install dependencies",
        "npm run dev — Start dev server",
        "Open http://localhost:5173",
        "Edit code → See instant updates!",
        "Ctrl+C — Stop the server",
      ],
      icon: "code",
    },
  },
  {
    type: "standard",
    content: {
      title: "Module 2 Goals",
      points: [
        "Convert createElement to JSX",
        "Create function components",
        "Pass data with props",
        "Render lists with .map()",
        "Build reusable UI pieces",
      ],
      icon: "target",
    },
  },
  {
    type: "title",
    content: {
      title: "Let's Code!",
      subtitle: "Time to see JSX in action",
      icon: "rocket",
    },
  },
];
