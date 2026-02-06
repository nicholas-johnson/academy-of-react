# Module 3: Props and Composition

## Story Context

The Academy's information systems are growing more complex. You need to build layouts, organize data by houses, and create components that work together. Professor Hooksworth introduces you to the art of **component composition** — building large applications by combining smaller, focused components. "Great wizards compose spells," she explains. "Great React developers compose components."

## Learning Objectives

By the end of this module, you will:

- Master passing props between parent and child components
- Use the `children` prop for flexible layouts
- Compose components to build complex UIs
- Map over arrays to create dynamic lists
- Calculate derived values from props
- Group and organize data

## React Concepts Covered

- Props in depth
- The `children` prop
- Component composition patterns
- Prop drilling basics
- Computed/derived values

## JavaScript Concepts

- Array methods: map, filter, reduce
- Object property access
- Arrow functions
- Array grouping/categorization
- Calculations and aggregations

## Setup Instructions

Continuing with Vite for this module!

1. Navigate to the `demo/` folder
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open http://localhost:5173
5. Study how props flow from parent to children
6. Note how the `children` prop enables composition

**New to Vite?** See the comprehensive setup guide in [Module 2](../module-02-jsx-components/README.md#welcome-to-vite-).

## Demo Walkthrough

The demo shows:

1. **Passing Props Down** — Parent components providing data to children
2. **The children Prop** — Creating layout components
3. **Composition** — Building complex UIs from simple pieces

Key concept: **Props flow down**. Parent components pass data to children, never the other way around (that comes later with state lifting).

## The Children Prop

Special prop that represents anything between opening and closing tags:

```jsx
// Using a component:
<Card>
  <h2>Title</h2>
  <p>Content here</p>
</Card>;

// Inside Card component:
function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

The `children` prop contains the `<h2>` and `<p>` elements!

## Quests

### Quest 1: Stat Display

**Difficulty**: ⭐⭐ Intermediate

Create StatCard components that display wizard stats using props.

[Start Quest →](./quest-01-stat-display/)

### Quest 2: Layout Component

**Difficulty**: ⭐⭐ Intermediate

Build an AcademyLayout component using the children prop.

[Start Quest →](./quest-02-layout/)

### Quest 3: House Roster

**Difficulty**: ⭐⭐⭐ Intermediate-Advanced

Create a HouseRoster component that groups students by house and calculates averages.

[Start Quest →](./quest-03-house-roster/)

## Bonus Mastery Challenge

**The Student Comparison Dashboard**

Build a complex composed interface:

- A `ComparisonLayout` component with left, right, and center sections
- Two student profiles in left and right sections
- Center section shows comparison stats:
  - Who has higher magic level
  - Health difference
  - Mana difference
  - Combined total power
- Use multiple composed components
- Calculate all values from props

## Key Takeaways

- Props are how data flows in React (parent → child)
- The `children` prop enables flexible composition
- Small, focused components are easier to maintain
- Use `.map()` to transform data arrays into component arrays
- Derived values can be calculated from props
- Composition is more powerful than inheritance in React
- Good component design makes complex UIs manageable

---

**Previous Module**: [Module 2: JSX and Components](../module-02-jsx-components/)

**Next Module**: [Module 4: State with useState](../module-04-state-usestate/)
