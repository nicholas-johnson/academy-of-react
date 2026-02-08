# Module 11: React Router

## Story Context

The Academy is expanding! With the Wizarding War approaching, students need to navigate between multiple areas: the Training Grounds, the Spell Library, the Battle Arena, and the War Room. Professor Hooksweasel reveals the ancient art of **Routing** — creating pathways that let users move between different views without the page reloading.

"A well-structured Academy," she explains, "allows wizards to move freely between chambers while maintaining their state. React Router is our navigation spell."

## Learning Objectives

By the end of this module, you will:

- Set up React Router in a Vite project
- Create routes for different pages/views
- Navigate between routes with `Link` and `NavLink`
- Read URL parameters with `useParams`
- Navigate programmatically with `useNavigate`
- Access location info with `useLocation`
- Build nested routes with `Outlet`
- Create protected routes for authenticated users
- Handle 404 (not found) pages
- Work with search/query parameters using `useSearchParams`

## React Router Concepts

- `BrowserRouter` — The router provider
- `Routes` and `Route` — Defining route paths
- `Link` and `NavLink` — Navigation components
- `Outlet` — Nested route rendering
- `useParams` — Access URL parameters
- `useNavigate` — Programmatic navigation
- `useLocation` — Current location info
- `useSearchParams` — Query string parameters

## JavaScript Concepts

- URL structure (path, params, query string)
- History API basics
- Conditional rendering based on routes
- Pattern matching

## Setup Instructions

This module uses **Vite + React Router**.

```bash
cd module-11-react-router/demo
npm install
npm run dev
```

React Router is included as a dependency:

```bash
npm install react-router-dom
```

## Core Concepts

### Basic Routing Setup

```jsx
// main.jsx
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// App.jsx
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/spells" element={<SpellLibrary />} />
      <Route path="/spells/:id" element={<SpellDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

### Navigation with Link and NavLink

```jsx
import { Link, NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      {/* Basic link */}
      <Link to="/">Home</Link>

      {/* NavLink adds "active" class when route matches */}
      <NavLink
        to="/spells"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Spells
      </NavLink>
    </nav>
  );
}
```

### URL Parameters

```jsx
import { useParams } from "react-router-dom";

// Route: /spells/:spellId
function SpellDetail() {
  const { spellId } = useParams();

  return <div>Viewing spell: {spellId}</div>;
}
```

### Programmatic Navigation

```jsx
import { useNavigate } from "react-router-dom";

function BattleResult() {
  const navigate = useNavigate();

  const handleVictory = () => {
    // Navigate to results page
    navigate("/results");

    // Or go back
    navigate(-1);

    // With state
    navigate("/results", { state: { winner: "Liondudes" } });
  };

  return <button onClick={handleVictory}>Claim Victory</button>;
}
```

### Nested Routes

```jsx
// App.jsx
<Routes>
  <Route path="/academy" element={<AcademyLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="students" element={<Students />} />
    <Route path="spells" element={<Spells />} />
  </Route>
</Routes>;

// AcademyLayout.jsx
import { Outlet, NavLink } from "react-router-dom";

function AcademyLayout() {
  return (
    <div>
      <nav>
        <NavLink to="/academy">Dashboard</NavLink>
        <NavLink to="/academy/students">Students</NavLink>
        <NavLink to="/academy/spells">Spells</NavLink>
      </nav>

      {/* Child routes render here */}
      <Outlet />
    </div>
  );
}
```

### Search Parameters

```jsx
import { useSearchParams } from "react-router-dom";

// URL: /spells?type=fire&level=5
function SpellSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type"); // 'fire'
  const level = searchParams.get("level"); // '5'

  const handleFilterChange = (newType) => {
    setSearchParams({ type: newType, level: level || "" });
  };

  return (
    <div>
      <select onChange={(e) => handleFilterChange(e.target.value)}>
        <option value="fire">Fire</option>
        <option value="ice">Ice</option>
      </select>
    </div>
  );
}
```

### Protected Routes

```jsx
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useAuth(); // From your auth context
  const location = useLocation();

  if (!user) {
    // Redirect to login, remembering where they wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Usage
<Route
  path="/war-room"
  element={
    <ProtectedRoute>
      <WarRoom />
    </ProtectedRoute>
  }
/>;
```

## Quests

### Quest 1: Basic Routing

**Difficulty**: Intermediate

Create a multi-page Academy portal with navigation between Home, Students, Spells, and About pages.

[Start Quest →](./quest-01-basic-routing/)

### Quest 2: Dynamic Routes

**Difficulty**: Intermediate

Build a spell directory with dynamic routes. View spell lists and individual spell details using URL parameters.

[Start Quest →](./quest-02-dynamic-routes/)

### Quest 3: Protected Routes

**Difficulty**: Advanced

Create a protected War Room that only authenticated users can access. Includes login flow, protected routes, and search parameters for filtering battle data.

[Start Quest →](./quest-03-protected-routes/)

## Bonus Mastery Challenge

**The Complete Academy Portal**

Combine all routing patterns into a full application:

- Public pages (Home, About, Spell Library)
- Protected pages (War Room, Battle History)
- Nested routes (Academy dashboard with sub-pages)
- Search/filter with query parameters
- 404 handling
- Breadcrumb navigation based on route

## Key Takeaways

- React Router enables single-page app navigation
- `BrowserRouter` wraps your app to enable routing
- `Routes` and `Route` define your path-to-component mapping
- `Link` and `NavLink` for navigation (NavLink has active styling)
- `useParams` reads dynamic URL segments (`:id`)
- `useNavigate` for programmatic navigation
- `useLocation` gives current URL info
- `useSearchParams` for query string parameters
- `Outlet` renders child routes in nested layouts
- Protected routes combine routing with authentication
- Always include a `*` catch-all route for 404 pages

## Routes vs Server Rendering

This module teaches **client-side routing** — the browser handles navigation without page reloads. In Module 13 (Server Rendering), you'll learn **server-side routing** where:

- Next.js uses file-based routing in the `app/` folder
- Remix uses file-based routing with loaders/actions
- Routes can render on the server for SEO and performance

Both patterns are valuable:

- **Client-side (React Router)**: Great for SPAs, dashboards, apps behind login
- **Server-side (Next.js/Remix)**: Great for public sites, SEO, content sites

---

**Previous Module**: [Module 10: Context API](../module-10-context-api/)

**Next Module**: [Module 12: Performance](../module-12-performance/)
