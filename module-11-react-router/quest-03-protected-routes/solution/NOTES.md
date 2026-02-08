# Quest 3: War Room - Solution Notes

## Key Concepts

### 1. Protected Routes

```jsx
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Save where they wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
```

Key points:

- Check auth state from context
- `Navigate` component handles the redirect
- `state` prop passes data to the login page
- `replace` prevents back button going to protected page

### 2. Redirect After Login

```jsx
function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get saved location
  const from = location.state?.from?.pathname || "/";

  const handleLogin = () => {
    login(username);
    navigate(from, { replace: true }); // Go back where they wanted
  };
}
```

### 3. useSearchParams for Filters

```jsx
function WarRoom() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read from URL
  const statusFilter = searchParams.get("status") || "all";

  // Update URL
  const handleFilterChange = (status) => {
    if (status === "all") {
      setSearchParams({}); // Remove param
    } else {
      setSearchParams({ status }); // Set param
    }
  };
}
```

Benefits:

- Filter state in URL (shareable, bookmarkable)
- Survives page refresh
- Browser back/forward works
- Works like `useState` but synced to URL

### 4. Location State

```jsx
// Sender: pass state with Navigate
<Navigate to="/login" state={{ from: location }} />;

// Receiver: read state from location
const location = useLocation();
const from = location.state?.from?.pathname;
```

State is:

- Not visible in URL
- Lost on page refresh
- Good for temporary data like redirect targets

## URL Structure Review

```
https://example.com/war-room?status=victory#battles
|_____|___________|________|______________|_______|
protocol   host     path    search/query   hash
```

- `useParams()` → reads path params (`/spells/:id`)
- `useSearchParams()` → reads query params (`?status=victory`)
- `useLocation()` → full location object with pathname, search, hash, state

## Real-World Applications

- Dashboard filters saved in URL
- Admin panels with auth
- E-commerce with product filters
- Any app with login-protected areas
