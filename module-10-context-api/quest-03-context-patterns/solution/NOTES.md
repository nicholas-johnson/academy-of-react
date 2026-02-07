# Quest 3: User Session - Solution Notes

## Overview

Authentication system using Context API. Login form, protected dashboard, logout functionality. Demonstrates conditional rendering based on auth state.

## Key Concepts

### Auth Context Shape

```javascript
// What the context provides
{
  user: { id, name, house, level } | null,
  login: (name, house) => void,
  logout: () => void,
  isAuthenticated: boolean
}
```

Provides user data and auth actions globally.

### Conditional Rendering

```javascript
{
  isAuthenticated ? <Dashboard /> : <LoginForm />;
}
```

Show different components based on auth state.

### Login Flow

```javascript
const login = (name, house) => {
  const newUser = { id: Date.now(), name, house, level: 1 };
  setUser(newUser);
  localStorage.setItem("user", JSON.stringify(newUser));
};
```

Create user object, update context, persist to localStorage.

### Derived State

```javascript
isAuthenticated: !!user;
```

Compute boolean from user object. Double negation converts truthy/falsy to true/false.

## Real-World Patterns

- Protected routes with React Router
- Authenticated API requests
- Role-based access control
- Session persistence

## Testing

1. Fill login form and submit
2. Dashboard should appear
3. User info displays correctly
4. Click logout - returns to login
5. No prop drilling for auth state

## What's Next

Module 11 introduces React Router for navigation and routing.
