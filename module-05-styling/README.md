# Module 5: Styling in React

CSS is global by default. You write `.button { background: blue }` and every element with that class on the entire page turns blue. That's fine for small sites, but in a component-based architecture where dozens of developers might independently create a `.card` or `.title` class, collisions become inevitable.

React doesn't prescribe a single styling solution — instead, the ecosystem offers several approaches, each with different tradeoffs. This module covers three of the most popular: CSS Modules for scoped styles with zero runtime cost, Styled Components for dynamic CSS-in-JS, and Tailwind CSS for utility-first rapid development.

## CSS Modules

CSS Modules are the simplest step up from regular CSS. You write normal CSS in a file named `*.module.css`, and the build tool (Vite, in our case) automatically makes every class name unique by appending a hash. No configuration needed — it works out of the box.

```css
/* Button.module.css */
.button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.primary {
  background: #3b82f6;
  color: white;
}

.secondary {
  background: #e5e7eb;
  color: #374151;
}
```

In your component, you import the file and get an object whose keys are your class names:

```jsx
import styles from './Button.module.css'

function Button({ variant = 'primary', children }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  )
}
```

When this renders, the actual class names look something like `Button_button_x7k2j` — guaranteed unique. Two different components can both define a `.title` class and they'll never collide.

**Why choose CSS Modules:**
- Zero runtime overhead — class names are resolved at build time
- You already know CSS — no new syntax to learn
- IDE support works perfectly (autocomplete, hover previews)
- Great for teams migrating from traditional CSS

**The downsides:**
- You need a separate `.module.css` file for each component
- Dynamic styles based on props require combining multiple classes
- Conditional class logic can get verbose

## Styled Components

Styled Components takes a fundamentally different approach: you write CSS directly in your JavaScript files using tagged template literals. Each styled call creates a new React component with the styles baked in:

```jsx
import styled from 'styled-components'

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  background: ${props => props.$primary ? '#3b82f6' : '#e5e7eb'};
  color: ${props => props.$primary ? 'white' : '#374151'};

  &:hover {
    opacity: 0.9;
  }
`

// Usage
<Button $primary>Save</Button>
<Button>Cancel</Button>
```

Notice how the background colour comes from props — this is the killer feature. You can make any CSS property dynamic based on component state or props. The `$` prefix on prop names is a convention that prevents them from being passed to the underlying DOM element.

You can also style child elements using nesting (like Sass):

```jsx
const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin-top: 0;
    color: #1e293b;
  }

  p {
    color: #64748b;
  }
`

<Card>
  <h2>Spell Details</h2>
  <p>Description goes here</p>
</Card>
```

And you can extend existing components — even third-party ones — by wrapping them with `styled()`:

```jsx
import { Link } from 'react-router-dom'

const NavLink = styled(Link)`
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`
```

**Why choose Styled Components:**
- Dynamic styles from props without juggling class names
- Styles live right next to the component that uses them
- Built-in theming support for design systems
- Nesting and other Sass-like features

**The downsides:**
- Runtime overhead — styles are generated and injected at runtime
- Larger bundle size (the library itself)
- Doesn't work with React Server Components (needs client-side JS)
- Team needs to learn a new API

**Setup:** Install with `npm install styled-components`.

## Tailwind CSS

Tailwind is a utility-first framework. Instead of writing CSS rules, you compose pre-defined utility classes directly in your JSX:

```jsx
function Button({ primary, children }) {
  return (
    <button className={`
      px-4 py-2 rounded cursor-pointer transition-colors
      ${primary
        ? 'bg-blue-500 hover:bg-blue-600 text-white'
        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
      }
    `}>
      {children}
    </button>
  )
}
```

Each class does one thing: `px-4` sets horizontal padding, `bg-blue-500` sets a blue background, `hover:bg-blue-600` changes the background on hover. You build up complex styles by combining small utilities.

This feels strange at first — especially if you've been taught to keep content and presentation separate. But in practice, since your components already encapsulate structure and behaviour, co-locating the styles completes the picture. A `Button` component with its styling utilities is fully self-contained.

Common utility patterns:

```jsx
{/* Layout */}
<div className="flex items-center justify-between gap-4">

{/* Typography */}
<h1 className="text-2xl font-bold text-gray-900">

{/* Spacing & sizing */}
<div className="p-6 m-4 w-full max-w-md">

{/* Responsive */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

The `md:` and `lg:` prefixes apply styles at specific breakpoints. `hover:`, `focus:`, and `active:` handle interaction states.

**Why choose Tailwind:**
- Extremely fast development once you know the utilities
- Tiny production bundles — unused utilities are purged automatically
- Enforces a consistent design system (spacing scale, colour palette)
- Works perfectly with Server Components (no runtime)

**The downsides:**
- Learning curve — you need to memorise (or look up) utility names
- Class strings get long and can feel cluttered
- Less semantic than named CSS classes
- Teams need conventions for consistency

**Setup:** `npm install -D tailwindcss @tailwindcss/vite` and add the plugin to your Vite config.

## Which Should You Choose?

There's no universal answer. Here's a practical guide:

**Choose CSS Modules** if your team knows CSS well, you're migrating an existing project, or you need zero runtime cost. It's the safest, most conservative choice.

**Choose Styled Components** if you're building a component library, need heavy prop-based theming, or want styles and components in the same file. Be aware of the RSC limitation.

**Choose Tailwind** if you want rapid iteration, a consistent design system out of the box, and the smallest possible production CSS. It's become the most popular choice in new React projects.

Many projects combine approaches — Tailwind for most styling, with CSS Modules or inline styles for edge cases. There's no rule saying you must pick just one.

## Common Mistakes

**Fighting the approach.** If you choose Tailwind, lean into utilities rather than writing custom CSS for everything. If you choose CSS Modules, don't try to make them dynamic like Styled Components. Each approach has a natural grain — work with it.

**Over-engineering.** For a small component used in one place, a few utility classes or a small CSS file is fine. You don't need a complex styled-components theme system for a todo app.

**Forgetting the `.module.css` extension.** Regular `.css` files imported in React are global. Only files ending in `.module.css` get scoped class names.

**Using `style` prop for everything.** Inline `style={{ }}` works for truly dynamic values (like positioning), but it can't handle pseudo-classes, media queries, or hover states. Use one of the three approaches above for real styling.

## Exercises

Each quest uses a different approach, so you get hands-on experience with all three:

**Quest 1: House Badges** — Style wizard house badges using CSS Modules. Each house gets distinct colours and layout.

[Start Quest 1 →](./quest-01-css-modules/)

**Quest 2: Spell Cards** — Build themed spell cards with Styled Components. Use prop-based styling for different spell types.

[Start Quest 2 →](./quest-02-styled-components/)

**Quest 3: Battle Dashboard** — Create a responsive battle dashboard with Tailwind CSS. Practice layout utilities and responsive design.

[Start Quest 3 →](./quest-03-tailwind/)

## Designer Track

**Designer Quest 1: One Card, Three Ways** — Restyle a SpellCard using all three approaches. No JavaScript knowledge needed.

[Start Designer Quest 1 →](./designer-quest-01-one-card-three-ways/)

**Designer Quest 2: The Perfect Input** — Build a component from scratch, then style it three ways. The first exercise where you create a React file yourself.

[Start Designer Quest 2 →](./designer-quest-02-the-perfect-input/)

## Running the Code

```bash
cd demo
npm install
npm run dev
```

Slides compare all three approaches with pros/cons and decision guidance:

```bash
cd slides
npm install
npm run dev
```

---

[← Module 4: Forms and Events](../module-04-forms-events/) | [Module 6: Side Effects with useEffect →](../module-06-effects-useeffect/)
