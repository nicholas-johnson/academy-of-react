# Quest 3: User Session

Create an AuthContext for managing user authentication state. Includes login form, protected dashboard, and logout functionality.

## Requirements
- AuthContext with user state
- Login function that creates user object
- Logout function that clears user
- Derived `isAuthenticated` boolean
- useAuth custom hook
- Conditional rendering based on auth state

## Acceptance Criteria
- [ ] Context stores user object (or null)
- [ ] Login creates user and updates context
- [ ] Logout clears user state
- [ ] Dashboard only shows when authenticated
- [ ] Login form shows when not authenticated
- [ ] No prop drilling for auth state

## Hints
- User object: `{ id, name, house, level }`
- `isAuthenticated` can be `!!user`
- Wrap App component with AuthProvider

[← Previous](../quest-02-multi-provider/)
