# Quest 1: Stat Display - Solution Notes

## Key Concepts

### 1. Props Destructuring with Defaults

```jsx
function StudentCard({ 
  name = "Unknown Student",
  level = 1,
  status = "active"
}) {
  // name, level, status are guaranteed to exist
}
```

Default values provide fallback when props aren't passed!

### 2. Conditional Rendering

```jsx
{status === "quest" && (
  <div className="status-alert">Currently on Quest</div>
)}
```

Uses short-circuit evaluation: renders only if condition is true.

### 3. Multiple Components

- `StudentCard` - main component
- `StatBar` - reusable stat display
- `OverallRating` - computed from multiple props

### 4. Prop Types

All types work as props:
- Strings: `name="Elara"`
- Numbers: `level={42}`
- Booleans: `isActive={true}`
- Objects: `config={{ color: 'red' }}`
- Functions: `onClick={() => {}}`
- Arrays: `stats={[75, 92, 68]}`

## Best Practices

✅ Always provide default values for optional props
✅ Use descriptive prop names
✅ Keep components focused (single responsibility)
✅ Pass only needed props (don't over-pass)

Next: Module 3 Quest 2 explores the `children` prop!






