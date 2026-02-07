# Module 6: Styling in React

## Story Context

The Academy's buildings need a makeover! As preparations for the Wizarding War intensify, each house wants their quarters styled distinctively. You'll learn three approaches to styling React components — from scoped CSS to utility-first frameworks.

## Learning Objectives

- Understand the challenges of styling React applications
- Use CSS Modules for scoped, collision-free styles
- Build component-based styles with Styled Components
- Apply utility-first styling with Tailwind CSS
- Choose the right approach for different scenarios

## React Concepts

- CSS-in-JS vs CSS Modules vs Utility CSS
- Component-scoped styling
- Dynamic styles based on props
- Theming and design systems
- Build tool integration (Vite)

## Setup

Navigate to `demo/`, run `npm install`, then `npm run dev`.

## The Three Approaches

### 1. CSS Modules

- **What**: Regular CSS files with automatic class name scoping
- **Syntax**: `import styles from './Button.module.css'`
- **Best for**: Teams familiar with CSS, projects needing gradual adoption
- **Tradeoff**: Separate files, no dynamic styles based on props

### 2. Styled Components

- **What**: CSS-in-JS library using tagged template literals
- **Syntax**: `const Button = styled.button`background: blue`;`
- **Best for**: Dynamic theming, component libraries, co-located styles
- **Tradeoff**: Runtime overhead, learning curve, bundle size

### 3. Tailwind CSS

- **What**: Utility-first CSS framework with predefined classes
- **Syntax**: `<button className="bg-blue-500 hover:bg-blue-700">`
- **Best for**: Rapid prototyping, consistent design systems, small bundles
- **Tradeoff**: Verbose classNames, learning utility names, HTML-heavy

## Quests

1. **House Badges** — Style wizard house badges using CSS Modules
2. **Spell Cards** — Build themed spell cards with Styled Components
3. **Battle Dashboard** — Create a responsive dashboard with Tailwind CSS

---

## Slides

Navigate to `slides/`, run `npm install`, then `npm run dev`.

---

**Previous Module**: [Module 5: Side Effects with useEffect](../module-05-effects-useeffect/)

**Next Module**: [Module 7: The Children Prop](../module-07-children-prop/)
