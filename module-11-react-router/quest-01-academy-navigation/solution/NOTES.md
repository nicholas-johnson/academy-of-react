# Quest 1: Academy Navigation - Solution Notes

## Key Concepts

### 1. BrowserRouter Setup

```jsx
// main.jsx
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter>
  <App />
</BrowserRouter>
```

BrowserRouter is a **context provider** that must wrap your entire app. It provides routing context to all components, enabling `Link`, `useNavigate`, `useParams`, etc. to work.

### 2. Routes and Route

```jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="students" element={<Students />} />
    <Route path="*" element={<NotFound />} />
  </Route>
</Routes>
```

- `Routes` is the container for all routes
- `Route` maps a path to a component
- `index` route is the default for the parent path
- `path="*"` catches all unmatched routes

### 3. NavLink for Active Styling

```jsx
<NavLink 
  to="/students" 
  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
>
  Students
</NavLink>
```

NavLink provides `isActive` to style the current route differently.

### 4. Outlet for Nested Routes

```jsx
function Layout() {
  return (
    <div>
      <nav>...</nav>
      <Outlet />  {/* Child routes render here */}
    </div>
  )
}
```

Outlet is a placeholder where child routes render.

### 5. The `end` Prop

```jsx
<NavLink to="/" end>Home</NavLink>
```

The `end` prop ensures "/" only matches exactly "/", not "/students" etc.

## Common Mistakes

1. **Forgetting BrowserRouter** - Routes won't work without it
2. **Missing Outlet** - Child routes won't render
3. **Not using `end` on root NavLink** - Home always appears active
4. **Using `<a>` instead of Link/NavLink** - Causes full page reload
