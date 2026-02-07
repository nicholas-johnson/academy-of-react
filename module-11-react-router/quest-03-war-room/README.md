# Quest 3: War Room

Create a protected War Room that only authenticated users can access. Includes login flow, protected routes, and search parameters for filtering.

## Requirements

- Create a simple auth context with login/logout
- Build a ProtectedRoute component using Navigate
- Use useLocation to remember where user wanted to go
- Implement search/filter with useSearchParams
- Redirect to login if not authenticated

## Acceptance Criteria

- [ ] War Room route is protected (redirects to /login if not logged in)
- [ ] Login form authenticates the user
- [ ] After login, user is redirected to where they wanted to go
- [ ] War Room shows battle data with filtering
- [ ] Filter changes update the URL query string
- [ ] URL filters persist on page refresh

## Hints

- Create AuthContext to track login state
- ProtectedRoute checks auth and either renders children or redirects
- `useLocation()` gives current location including state
- `useSearchParams()` works like useState but syncs with URL
- `Navigate` component handles redirects with state

[← Previous](../quest-02-spell-directory/)
