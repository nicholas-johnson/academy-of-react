# Quest 3: User Session - Solution Notes

## Overview
Authentication system using Context API. Login form, protected dashboard, logout functionality. Demonstrates conditional rendering based on auth state.

## Key Concepts

### Auth Context Shape
```typescript
interface AuthContextType {
  user: User | null
  login: (name: string, house: string) => void
  logout: () => void
  isAuthenticated: boolean
}
```

Provides user data and auth actions globally.

### Conditional Rendering
```typescript
{isAuthenticated ? <Dashboard /> : <LoginForm />}
```

Show different components based on auth state.

### Login Flow
```typescript
const login = (name: string, house: string) => {
  const newUser: User = { id: Date.now(), name, house, level: 1 }
  setUser(newUser)
  localStorage.setItem('user', JSON.stringify(newUser))
}
```

Create user object, update context, persist to localStorage.

### Derived State
```typescript
isAuthenticated: !!user
```

Compute boolean from user object.

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
Module 11 introduces custom hooks to encapsulate reusable logic with TypeScript.
