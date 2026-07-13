# Instructor Notes: Styled Components

## Key Teaching Points

### 1. Tagged Template Literals

Explain the syntax — it's JavaScript, not magic:

```jsx
// This is just a function call with a special syntax
styled.div`...`;
// Equivalent to:
styled.div(["..."]);
```

### 2. Transient Props ($prefix)

Props with `$` prefix don't get passed to the DOM:

```jsx
// $element is used for styling but not rendered as an attribute
<Card $element="fire">

// Without $, React warns: "Unknown prop `element` on <div> tag"
<Card element="fire">  // Bad - element gets passed to DOM
```

### 3. Dynamic Styles with Props

Show the interpolation pattern:

```jsx
const Box = styled.div`
  /* Simple conditional */
  color: ${(props) => (props.$primary ? "blue" : "gray")};

  /* Lookup from object */
  background: ${(props) => colors[props.$variant]};

  /* Computed value */
  width: ${(props) => props.$size * 10}px;
`;
```

### 4. Nesting (like Sass)

```jsx
const Card = styled.div`
  padding: 1rem;

  &:hover {
    transform: scale(1.05);
  }

  & > h2 {
    color: blue;
  }
`;
```

### 5. Animations with keyframes

```jsx
import { keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  animation: ${spin} 1s linear infinite;
`;
```

## Common Student Mistakes

1. **Missing backticks** — `styled.div()` won't work
2. **Forgetting $** — Props without $ go to DOM and cause warnings
3. **String interpolation confusion** — Remember it's `${props => ...}` not `${props.color}`
4. **Overusing** — Not everything needs to be a styled component

## When to Use Styled Components

**Good for:**

- Component libraries with theming
- Dynamic styles based on props
- Co-located styles with components
- Complex conditional styling

**Maybe not for:**

- Static sites with simple styling
- Teams unfamiliar with CSS-in-JS
- Performance-critical applications (runtime cost)

## Performance Note

Styled Components has runtime overhead:

- Styles are computed at runtime
- Class names generated dynamically
- Consider CSS Modules for static styles

For React Server Components, prefer CSS Modules or Tailwind (no runtime).
