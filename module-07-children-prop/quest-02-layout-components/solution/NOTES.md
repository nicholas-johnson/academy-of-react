# Quest 2 Solution: Layout Components

## Key Concepts Demonstrated

### 1. The children Prop

The `children` prop is whatever you put between a component's opening and closing tags:

```jsx
<Card>
  <h3>Title</h3> {/* This becomes children */}
  <p>Content</p>
</Card>
```

### 2. Wrapper Components

Card and Section both "wrap" their children:

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children} {/* Render whatever was passed in */}
    </div>
  );
}
```

Modal is the same pattern — it was built in Quest 1 and is imported from `src/components/Modal.jsx`. Reusing it here is the point: a children wrapper works in any page.

### 3. Slot Pattern (Named Children)

Layout uses multiple "slots" — specific props for different areas:

```jsx
function Layout({ header, sidebar, children }) {
  return (
    <div className="layout">
      <header>{header}</header> {/* Named slot */}
      <aside>{sidebar}</aside> {/* Named slot */}
      <main>{children}</main> {/* Default slot */}
    </div>
  );
}
```

### 4. Composition

Small components combine to build complex UIs:

- Layout contains Sections
- Sections contain Cards
- Cards contain any content
- The provided Modal wraps any content

## When to Use children

| Use children when...        | Use props when...            |
| --------------------------- | ---------------------------- |
| Content is JSX              | Content is simple data       |
| User decides what to render | Component controls rendering |
| Component wraps/decorates   | Specific structure required  |
| Maximum flexibility needed  | Data transformation needed   |

## Common Mistakes

1. **Forgetting to render children**: Always include `{children}` in your JSX
2. **Not destructuring**: Use `({ children })` not `(props)` for clarity
3. **Overcomplicating**: Sometimes a simple div with className is enough!
4. **Dropping the provided Modal**: Keep it in the tree so the Cast Spell button still works
