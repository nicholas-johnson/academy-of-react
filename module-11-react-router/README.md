# Module 11: React Router

Up to this point, your React apps have been single-screen affairs. Everything lives on one page — no navigation, no URLs, no back button support. That's fine for small tools, but real applications have multiple views: a home page, a detail page, a settings screen, a login flow.

**React Router** gives your single-page app multi-page behaviour. The URL changes, different components render, the back button works — but the page never actually reloads. State is preserved, transitions are instant, and the experience feels seamless.

## The Core Idea

React Router maps URL paths to components. When the URL is `/spells`, render the spell list. When it's `/spells/42`, render the detail page for spell #42. When it's `/about`, render the about page. You declare these mappings, and React Router handles the rest.

First, install it:

```bash
npm install react-router-dom
```

Then wrap your app in a `BrowserRouter` and define routes:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spells" element={<SpellLibrary />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
```

`BrowserRouter` enables routing for everything inside it. `Routes` looks at the current URL and renders the first `Route` that matches. The `path="*"` catch-all handles any URL that doesn't match — your 404 page.

## Navigation with Link and NavLink

Don't use `<a>` tags for internal navigation — they cause a full page reload. Use `Link` instead:

```jsx
import { Link, NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/spells">Spells</Link>
      <Link to="/about">About</Link>
    </nav>
  )
}
```

`Link` renders an `<a>` tag but intercepts the click and updates the URL without reloading. The page re-renders with the matching route component.

`NavLink` does the same thing but adds an "active" class when the link matches the current URL — perfect for navigation menus:

```jsx
<NavLink
  to="/spells"
  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
>
  Spells
</NavLink>
```

## Dynamic Routes with useParams

Many pages depend on a variable in the URL — a spell ID, a student name, a category. Define these with a colon prefix in the path, and read them with `useParams`:

```jsx
// Route definition
<Route path="/spells/:spellId" element={<SpellDetail />} />

// Component
import { useParams } from 'react-router-dom'

function SpellDetail() {
  const { spellId } = useParams()

  return <h1>Viewing spell #{spellId}</h1>
}
```

When the URL is `/spells/42`, `spellId` is `"42"`. When it's `/spells/fireball`, `spellId` is `"fireball"`. The parameter name matches what you put after the colon in the route path.

## Programmatic Navigation with useNavigate

Sometimes you need to navigate in response to an action — after a form submission, when a timer expires, or when data finishes loading. `useNavigate` gives you a function to do this:

```jsx
import { useNavigate } from 'react-router-dom'

function BattleResult({ winner }) {
  const navigate = useNavigate()

  const handleClaim = () => {
    // Do something...
    navigate('/results')
  }

  return <button onClick={handleClaim}>Claim Victory</button>
}
```

You can also go back: `navigate(-1)` is equivalent to hitting the browser's back button.

## Current Location with useLocation

`useLocation` gives you information about the current URL — the pathname, search string, and any state passed during navigation:

```jsx
import { useLocation } from 'react-router-dom'

function Breadcrumbs() {
  const location = useLocation()

  return <p>Current path: {location.pathname}</p>
}
```

This is useful for analytics, breadcrumbs, conditional rendering based on the current route, or reading state passed via `navigate('/results', { state: { winner: 'Team A' } })`.

## Search Parameters with useSearchParams

Query strings (`?type=fire&level=5`) are handled with `useSearchParams`:

```jsx
import { useSearchParams } from 'react-router-dom'

function SpellSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get('type')

  const handleFilter = (newType) => {
    setSearchParams({ type: newType })
  }

  return (
    <div>
      <p>Filtering by: {type || 'all'}</p>
      <button onClick={() => handleFilter('fire')}>Fire</button>
      <button onClick={() => handleFilter('ice')}>Ice</button>
    </div>
  )
}
```

Search params update the URL without a page reload, and the component re-renders with the new values. They're bookmarkable and shareable — someone can send a filtered URL to a friend.

## Nested Routes with Outlet

Complex apps have layout sections that persist across pages — a sidebar, a header, tabs. Nested routes let child routes render inside a parent layout:

```jsx
// Route structure
<Route path="/academy" element={<AcademyLayout />}>
  <Route index element={<Dashboard />} />
  <Route path="students" element={<Students />} />
  <Route path="spells" element={<Spells />} />
</Route>
```

The parent component uses `Outlet` to mark where children render:

```jsx
import { Outlet, NavLink } from 'react-router-dom'

function AcademyLayout() {
  return (
    <div className="layout">
      <nav>
        <NavLink to="/academy">Dashboard</NavLink>
        <NavLink to="/academy/students">Students</NavLink>
        <NavLink to="/academy/spells">Spells</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
```

The nav stays constant. Only the content inside `<Outlet />` changes as you navigate between `/academy/students` and `/academy/spells`. The `index` route renders when the URL matches exactly `/academy` with no further path.

## Protected Routes

Some pages should only be accessible to logged-in users. A common pattern wraps protected content in a component that checks authentication:

```jsx
import { Navigate, useLocation } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

// Usage in routes
<Route path="/war-room" element={
  <ProtectedRoute>
    <WarRoom />
  </ProtectedRoute>
} />
```

If the user isn't logged in, they're redirected to `/login`. The `state={{ from: location }}` saves where they were trying to go, so you can redirect them back after login.

## Common Mistakes

**Using `<a>` tags for internal links.** This causes a full page reload, destroying React state. Always use `Link` or `NavLink` for in-app navigation.

**Forgetting the catch-all route.** Without `path="*"`, unmatched URLs render nothing. Add a NotFound component as the last route.

**Putting Routes outside BrowserRouter.** All routing components (`Routes`, `Route`, `Link`, etc.) must be inside a `BrowserRouter`. If they're not, you'll get a cryptic error about missing context.

**Using `useParams` in the wrong component.** It only works inside a component that's rendered by a Route with a dynamic segment. The component must be a child of the route definition that contains the `:param`.

## Exercises

**Quest 1: Basic Routing** — Build a multi-page Academy portal with navigation between Home, Students, Spells, and About pages.

[Start Quest 1 →](./quest-01-basic-routing/)

**Quest 2: Dynamic Routes** — Create a spell directory with a list page and dynamic detail pages using URL parameters.

[Start Quest 2 →](./quest-02-dynamic-routes/)

**Quest 3: Protected Routes** — Build a War Room that only authenticated users can access. Includes login flow, protected routes, and search parameter filtering.

[Start Quest 3 →](./quest-03-protected-routes/)

**Quest 4: The Artifact Vault (TypeScript)** — Build a typed React app that fetches magic items from a real API. Shared interfaces, a generic fetch helper, a list page, and dynamic detail pages — all in TypeScript.

[Start Quest 4 →](./quest-04-typescript-api/)

## Running the Code

```bash
cd demo
npm install
npm run dev
```

A TypeScript version of the same demo is available in `demo-ts`:

```bash
cd demo-ts
npm install
npm run dev
```

Slides cover SPA concepts, route matching, and the full React Router API:

```bash
cd slides
npm install
npm run dev
```

---

[← Module 10: Context API](../module-10-context-api/) | [Module 12: State Management →](../module-12-state-management/)
