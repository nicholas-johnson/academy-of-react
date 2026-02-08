# Tailwind CSS with React

## Overview

Tailwind CSS is a **utility-first CSS framework** that lets you style components directly in your JSX using pre-built utility classes. Instead of writing custom CSS, you compose styles from small, single-purpose classes.

This extra module teaches you how to use Tailwind effectively with React.

## Why Tailwind?

**Traditional CSS:**

```css
/* styles.css */
.card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}
```

```jsx
<div className="card">
  <h2 className="card-title">Hello</h2>
</div>
```

**With Tailwind:**

```jsx
<div className="bg-white rounded-lg p-6 shadow">
  <h2 className="text-xl font-semibold text-gray-800">Hello</h2>
</div>
```

### Benefits

- **No context switching** — Style without leaving your component
- **No naming things** — No more `.card-wrapper-inner-container`
- **Consistent design** — Built-in spacing, color, and typography scales
- **Small bundle** — Unused styles are purged in production
- **Responsive built-in** — `md:`, `lg:` prefixes for breakpoints
- **Dark mode** — `dark:` prefix for dark mode variants

### Trade-offs

- **Learning curve** — Need to learn utility class names
- **Verbose JSX** — Long class strings can get messy
- **Different paradigm** — Breaks the "separation of concerns" model

## Setup with Vite + React

### New Project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configure `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Add Tailwind to `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Verify It Works

```tsx
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">Tailwind is working!</h1>
    </div>
  );
}
```

## Core Concepts

### Spacing Scale

Tailwind uses a consistent spacing scale (in `rem` by default):

| Class | Value         |
| ----- | ------------- |
| `p-0` | 0             |
| `p-1` | 0.25rem (4px) |
| `p-2` | 0.5rem (8px)  |
| `p-4` | 1rem (16px)   |
| `p-6` | 1.5rem (24px) |
| `p-8` | 2rem (32px)   |

Works with: `p` (padding), `m` (margin), `gap`, `space-x`, `space-y`, `w`, `h`

**Directional variants:**

- `pt-4` — padding-top
- `pb-4` — padding-bottom
- `pl-4` — padding-left
- `pr-4` — padding-right
- `px-4` — padding left + right
- `py-4` — padding top + bottom

### Colors

```jsx
// Text colors
<p className="text-gray-500">Muted text</p>
<p className="text-blue-600">Blue text</p>
<p className="text-red-500">Error text</p>

// Background colors
<div className="bg-white">White bg</div>
<div className="bg-gray-100">Light gray bg</div>
<div className="bg-blue-500">Blue bg</div>

// Border colors
<div className="border border-gray-300">Gray border</div>
```

Color scale: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`

### Typography

```jsx
// Font size
<p className="text-sm">Small</p>
<p className="text-base">Base (16px)</p>
<p className="text-lg">Large</p>
<p className="text-xl">Extra large</p>
<p className="text-2xl">2XL</p>

// Font weight
<p className="font-normal">Normal</p>
<p className="font-medium">Medium</p>
<p className="font-semibold">Semibold</p>
<p className="font-bold">Bold</p>

// Line height
<p className="leading-tight">Tight</p>
<p className="leading-normal">Normal</p>
<p className="leading-relaxed">Relaxed</p>
```

### Flexbox

```jsx
// Flex container
<div className="flex">...</div>
<div className="flex flex-col">...</div>

// Justify content
<div className="flex justify-start">...</div>
<div className="flex justify-center">...</div>
<div className="flex justify-between">...</div>
<div className="flex justify-end">...</div>

// Align items
<div className="flex items-start">...</div>
<div className="flex items-center">...</div>
<div className="flex items-end">...</div>

// Gap
<div className="flex gap-4">...</div>
```

### Grid

```jsx
// Grid container
<div className="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

// Responsive columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  ...
</div>
```

### Responsive Design

Tailwind uses mobile-first breakpoints:

| Prefix | Min-width |
| ------ | --------- |
| `sm:`  | 640px     |
| `md:`  | 768px     |
| `lg:`  | 1024px    |
| `xl:`  | 1280px    |
| `2xl:` | 1536px    |

```jsx
// Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">Left</div>
  <div className="w-full md:w-1/2">Right</div>
</div>

// Different padding at breakpoints
<div className="p-4 md:p-6 lg:p-8">
  Responsive padding
</div>
```

### States (Hover, Focus, etc.)

```jsx
// Hover
<button className="bg-blue-500 hover:bg-blue-600">
  Hover me
</button>

// Focus
<input className="border focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />

// Active
<button className="bg-blue-500 active:bg-blue-700">
  Click me
</button>

// Disabled
<button className="bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed">
  Disabled
</button>

// Group hover (parent hover affects child)
<div className="group">
  <p className="group-hover:text-blue-500">Hover parent</p>
</div>
```

### Dark Mode

```jsx
// Enable in tailwind.config.js
export default {
  darkMode: 'class', // or 'media' for system preference
  // ...
}

// Usage
<div className="bg-white dark:bg-gray-800">
  <p className="text-gray-900 dark:text-gray-100">
    Adapts to dark mode
  </p>
</div>
```

## Common Patterns

### Card Component

```tsx
function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="text-gray-600">{children}</div>
    </div>
  );
}
```

### Button Variants

```tsx
type ButtonVariant = "primary" | "secondary" | "danger";

function Button({
  variant = "primary",
  children,
}: {
  variant?: ButtonVariant;
  children: React.ReactNode;
}) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`}>{children}</button>
  );
}
```

### Form Input

```tsx
function Input({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        className={`
          w-full px-3 py-2 border rounded-lg
          focus:outline-none focus:ring-2
          ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
          }
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
```

### Navigation

```tsx
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">Logo</span>
          </div>
          <div className="flex items-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) => `
                px-3 py-2 rounded-md text-sm font-medium
                ${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `
                px-3 py-2 rounded-md text-sm font-medium
                ${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
            >
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

## Managing Long Class Lists

### Option 1: Template Literals

```tsx
const buttonClasses = `
  px-4 py-2
  bg-blue-500 hover:bg-blue-600
  text-white font-medium
  rounded-lg
  transition-colors
`

<button className={buttonClasses}>Click</button>
```

### Option 2: clsx / classnames Library

```bash
npm install clsx
```

```tsx
import clsx from "clsx";

function Button({
  disabled,
  variant,
}: {
  disabled?: boolean;
  variant: "primary" | "danger";
}) {
  return (
    <button
      className={clsx("px-4 py-2 rounded-lg font-medium", {
        "bg-blue-500 hover:bg-blue-600": variant === "primary",
        "bg-red-500 hover:bg-red-600": variant === "danger",
        "opacity-50 cursor-not-allowed": disabled,
      })}
    >
      Button
    </button>
  );
}
```

### Option 3: CVA (Class Variance Authority)

For complex component variants:

```bash
npm install class-variance-authority
```

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const button = cva("px-4 py-2 rounded-lg font-medium transition-colors", {
  variants: {
    intent: {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      danger: "bg-red-500 text-white hover:bg-red-600",
    },
    size: {
      sm: "text-sm px-3 py-1",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
});

type ButtonProps = VariantProps<typeof button> & {
  children: React.ReactNode;
};

function Button({ intent, size, children }: ButtonProps) {
  return <button className={button({ intent, size })}>{children}</button>;
}

// Usage
<Button intent="danger" size="lg">
  Delete
</Button>;
```

## Customizing Tailwind

### Extend the Theme

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        // Custom brand colors
        brand: {
          50: "#f0f9ff",
          500: "#3b82f6",
          900: "#1e3a8a",
        },
        // Single color
        "wizard-purple": "#7c3aed",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
      },
      spacing: {
        128: "32rem",
      },
    },
  },
};
```

### Using Custom Values

```jsx
<div className="bg-brand-500">Brand color</div>
<h1 className="font-display">Display font</h1>
<div className="w-128">Custom width</div>
```

## Tailwind + React Best Practices

1. **Extract repeated patterns into components**, not CSS classes
2. **Use `clsx` or `cva`** for conditional classes
3. **Keep related utilities together** (spacing, colors, typography)
4. **Use Tailwind's design tokens** instead of arbitrary values
5. **Configure your theme** for brand colors and fonts
6. **Use the Tailwind CSS IntelliSense extension** in VS Code

## VS Code Setup

Install the **Tailwind CSS IntelliSense** extension for:

- Autocomplete for class names
- Hover preview of CSS
- Linting for errors
- Syntax highlighting in `className`

## Exercises

### Exercise 1: Style a Wizard Card

Create a styled wizard profile card with:

- Name, house, and power level
- House-colored accent (Liondudes = red, Serpent = green, etc.)
- Hover effect
- Responsive (stack on mobile, row on desktop)

### Exercise 2: Form with Validation Styles

Build a login form with:

- Email and password fields
- Error states (red border, error message)
- Success states (green border)
- Disabled button when invalid
- Focus rings

### Exercise 3: Responsive Dashboard

Create a dashboard layout with:

- Sidebar (hidden on mobile, visible on desktop)
- Header with navigation
- Main content area with card grid
- Mobile menu toggle

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind UI](https://tailwindui.com/) — Official component examples
- [Headless UI](https://headlessui.com/) — Unstyled, accessible components
- [Class Variance Authority](https://cva.style/docs)

---

**This is an extras module** — not part of the main course flow. Complete this anytime after Module 4 (Forms) when you're comfortable with React components and want to level up your styling.
