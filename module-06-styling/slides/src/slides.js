export const slides = [
  {
    type: "title",
    content: {
      title: "Styling in React",
      subtitle: "Module 6: CSS Modules, Styled Components & Tailwind",
      icon: "palette",
    },
  },
  {
    type: "standard",
    content: {
      title: "The Styling Challenge",
      points: [
        "CSS is global by default — classes can collide",
        "React components are modular — styles should be too",
        "We need dynamic styles based on props/state",
        "Different approaches for different needs",
        'No single "right" answer!',
      ],
      icon: "help-circle",
    },
  },
  {
    type: "standard",
    content: {
      title: "Three Popular Approaches",
      points: [
        "CSS Modules — Scoped CSS files",
        "Styled Components — CSS-in-JS",
        "Tailwind CSS — Utility classes",
        "Each has pros and cons",
        "Choose based on project needs",
      ],
      icon: "wrench",
    },
  },
  {
    type: "title",
    content: {
      title: "CSS Modules",
      subtitle: "Scoped CSS made simple",
      icon: "package",
    },
  },
  {
    type: "standard",
    content: {
      title: "What are CSS Modules?",
      points: [
        "Regular CSS files with .module.css extension",
        "Class names automatically made unique",
        "No runtime overhead — compiled at build time",
        "Works with any CSS you already know",
        "Built into Vite (no extra setup!)",
      ],
      icon: "clipboard",
    },
  },
  {
    type: "code",
    content: {
      title: "CSS Modules in Action",
      code: `/* Button.module.css */
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}

.primary {
  background: blue;
  color: white;
}

/* Button.jsx */
import styles from './Button.module.css'

function Button({ variant }) {
  return (
    <button className={\`\${styles.button} \${styles[variant]}\`}>
      Click me
    </button>
  )
}`,
      highlights: [
        "File must end in .module.css",
        "Import gives you an object of class names",
        'styles.button becomes "Button_button_x7k2j"',
        "No class name collisions!",
      ],
    },
  },
  {
    type: "comparison",
    content: {
      title: "CSS Modules",
      left: {
        label: "Pros",
        items: [
          "Familiar CSS syntax",
          "Zero runtime cost",
          "IDE autocomplete works",
          "Easy to adopt gradually",
        ],
      },
      right: {
        label: "Cons",
        items: [
          "Separate files needed",
          "No dynamic styles from props",
          "Verbose for conditionals",
          "Import syntax to learn",
        ],
      },
    },
  },
  {
    type: "title",
    content: {
      title: "Styled Components",
      subtitle: "CSS-in-JS with superpowers",
      icon: "sparkles",
    },
  },
  {
    type: "standard",
    content: {
      title: "What are Styled Components?",
      points: [
        "CSS written directly in JavaScript",
        "Uses tagged template literals",
        "Dynamic styles based on props",
        "Automatic vendor prefixing",
        "Theming built in",
      ],
      icon: "sparkles",
    },
  },
  {
    type: "code",
    content: {
      title: "Styled Components in Action",
      code: `import styled from 'styled-components'

const Button = styled.button\`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  
  /* Dynamic styles from props! */
  background: \${props => 
    props.$primary ? 'blue' : 'gray'
  };
  color: white;
  
  &:hover {
    opacity: 0.9;
  }
\`

// Usage
<Button $primary>Click me</Button>`,
      highlights: [
        "styled.button creates a React component",
        "Use $ prefix for styling-only props",
        "Access props with arrow functions",
        "Supports nesting like Sass",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Styling Existing Components",
      code: `// You can style ANY React component!
// Just wrap it with styled()

import { Link } from 'react-router-dom'

const StyledLink = styled(Link)\`
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
\`

// Or your own components:
function Card({ className, children }) {
  return <div className={className}>{children}</div>
}

const FancyCard = styled(Card)\`
  background: #667eea;
  padding: 2rem;
  border-radius: 1rem;
\``,
      highlights: [
        "styled(Component) wraps existing components",
        "Component must accept className prop",
        "Works with react-router, UI libraries, etc.",
        "Your custom components work too!",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Styling Child Elements",
      code: `const Card = styled.div\`
  background: #1e293b;
  padding: 1.5rem;
  border-radius: 1rem;
  
  h2 { color: white; }
  p { color: #94a3b8; }
  .highlight { color: #667eea; }
  > button { margin-top: 1rem; }
\`

// Children are automatically styled!
<Card>
  <h2>Title</h2>
  <p>Some <span className="highlight">important</span> text</p>
  <button>Click me</button>
</Card>`,
      highlights: [
        "Nest selectors to target children",
        "Works like Sass/SCSS nesting",
        "> for direct children only",
        "Children don't need separate styled()",
      ],
    },
  },
  {
    type: "comparison",
    content: {
      title: "Styled Components",
      left: {
        label: "Pros",
        items: [
          "Dynamic styles from props",
          "Styles live with component",
          "Theming support built-in",
          "Automatic scoping",
        ],
      },
      right: {
        label: "Cons",
        items: [
          "Runtime overhead",
          "Larger bundle size",
          "New syntax to learn",
          "Not great with RSC",
        ],
      },
    },
  },
  {
    type: "title",
    content: {
      title: "Tailwind CSS",
      subtitle: "Utility-first styling",
      icon: "waves",
    },
  },
  {
    type: "standard",
    content: {
      title: "What is Tailwind CSS?",
      points: [
        "Pre-defined utility classes",
        "Style directly in JSX",
        "Consistent design tokens",
        "Purges unused CSS — tiny bundles",
        "Responsive design built in",
      ],
      icon: "zap",
    },
  },
  {
    type: "code",
    content: {
      title: "Tailwind in Action",
      code: `// No separate CSS file needed!

function Button({ primary, children }) {
  return (
    <button className={\`
      px-4 py-2 rounded
      transition-colors
      \${primary 
        ? 'bg-blue-500 hover:bg-blue-600 text-white'
        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
      }
    \`}>
      {children}
    </button>
  )
}`,
      highlights: [
        "px-4 = padding-left/right: 1rem",
        "bg-blue-500 = background-color from palette",
        "hover: prefix for hover states",
        "Responsive: md:px-6 lg:px-8",
      ],
    },
  },
  {
    type: "rules",
    content: {
      title: "Common Tailwind Utilities",
      rules: [
        { rule: "Spacing", example: "p-4, m-2, px-6, py-3, gap-4", icon: "ruler" },
        { rule: "Colors", example: "bg-blue-500, text-gray-100", icon: "palette" },
        { rule: "Layout", example: "flex, grid, items-center", icon: "square" },
        {
          rule: "Effects",
          example: "hover:, focus:, transition-all",
          icon: "sparkles",
        },
      ],
    },
  },
  {
    type: "comparison",
    content: {
      title: "Tailwind CSS",
      left: {
        label: "Pros",
        items: [
          "Rapid development",
          "Tiny production bundles",
          "Consistent design system",
          "Works great with RSC",
        ],
      },
      right: {
        label: "Cons",
        items: [
          "Learning curve (utilities)",
          "Verbose className strings",
          "Less semantic HTML",
          "Team conventions needed",
        ],
      },
    },
  },
  {
    type: "title",
    content: {
      title: "Choosing an Approach",
      subtitle: "Which one should you use?",
      icon: "help-circle",
    },
  },
  {
    type: "standard",
    content: {
      title: "When to Use CSS Modules",
      points: [
        "Team already knows CSS well",
        "Migrating from traditional CSS",
        "Performance is critical (zero runtime)",
        "Working with React Server Components",
        "Want IDE CSS autocomplete",
      ],
      icon: "package",
    },
  },
  {
    type: "standard",
    content: {
      title: "When to Use Styled Components",
      points: [
        "Building a component library",
        "Need dynamic theming",
        "Want styles co-located with components",
        "Heavy use of prop-based styling",
        "Don't mind the runtime cost",
      ],
      icon: "sparkles",
    },
  },
  {
    type: "standard",
    content: {
      title: "When to Use Tailwind",
      points: [
        "Rapid prototyping and iteration",
        "Want a consistent design system",
        "Team is comfortable with utilities",
        "Building for production (small bundles)",
        "Using React Server Components",
      ],
      icon: "waves",
    },
  },
  {
    type: "standard",
    content: {
      title: "Module 6 Goals",
      points: [
        "Understand CSS scoping challenges",
        "Use CSS Modules for scoped styles",
        "Build dynamic styles with Styled Components",
        "Apply utility-first styling with Tailwind",
        "Choose the right approach for your project",
      ],
      icon: "target",
    },
  },
  {
    type: "title",
    content: {
      title: "Let's Style!",
      subtitle: "Time to make things beautiful",
      icon: "rocket",
    },
  },
];
