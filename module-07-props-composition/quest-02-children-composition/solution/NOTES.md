# Quest 2: Layout Components - Solution Notes

## Key Concept: The `children` Prop

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Usage:
<Card>
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

Everything between opening and closing tags becomes `children`!

## Component Composition

Build complex UIs from simple pieces:

```jsx
<Container>
  <Section title="Info">
    <Card variant="elevated">
      <Header>Title</Header>
      <p>Content</p>
    </Card>
  </Section>
</Container>
```

Each component wraps content, adding its own behavior/styling.

## Variants Pattern

```jsx
function Card({ variant = "default" }) {
  return <div className={`card card-${variant}`} />;
}

// Creates: "card card-default", "card card-outlined", etc.
```

CSS classes control appearance based on variant prop.

## Best Practices

✅ Use `children` for wrapper components
✅ Provide sensible defaults for all props
✅ Keep components generic and reusable
✅ Use composition over complex props

Next: Module 3 Quest 3 puts it all together!






