# Quest 2: Spell Directory - Solution Notes

## Key Concepts

### 1. Dynamic Route Parameters

```jsx
// Route definition with :id parameter
<Route path="spells/:id" element={<SpellDetail />} />;

// Access the parameter in the component
function SpellDetail() {
  const { id } = useParams(); // { id: "1" }
  // Note: id is always a string!
}
```

### 2. Link with Dynamic Paths

```jsx
// Template literal for dynamic paths
<Link to={`/spells/${spell.id}`}>{spell.name}</Link>
```

### 3. useNavigate for Programmatic Navigation

```jsx
const navigate = useNavigate();

// Go to a specific path
navigate("/spells");

// Go back (like browser back button)
navigate(-1);

// Go forward
navigate(1);

// Replace current history entry
navigate("/spells", { replace: true });
```

### 4. Handling Invalid Parameters

```jsx
function SpellDetail() {
  const { id } = useParams();
  const spell = spells.find((s) => s.id === parseInt(id));

  // Handle not found
  if (!spell) {
    return <div>Spell not found!</div>;
  }

  return <div>{spell.name}</div>;
}
```

## Important Notes

### Parameter Types

- `useParams()` always returns **strings**
- Convert to number if needed: `parseInt(id)` or `Number(id)`

### Link vs useNavigate

- `Link` — For user-initiated navigation (clicking)
- `useNavigate` — For programmatic navigation (after form submit, etc.)

### Back Button Patterns

```jsx
// Go back one page
navigate(-1);

// Go to specific route (doesn't preserve back history)
navigate("/spells", { replace: true });
```

## Real-World Applications

- Product detail pages: `/products/:productId`
- User profiles: `/users/:username`
- Blog posts: `/blog/:slug`
- Order tracking: `/orders/:orderId`
