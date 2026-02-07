# Quest 1: Theme Switcher - Solution Notes

## Overview
Global theme state using Context API. Header, content, and footer all access theme without prop drilling. Persists to localStorage.

## Key Concepts

### Typed Context Creation
```typescript
type Theme = 'light' | 'dark'
interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
```

TypeScript ensures type safety.

### Provider with localStorage
```typescript
const [theme, setTheme] = useState<Theme>(() => {
  const saved = localStorage.getItem('theme')
  return (saved as Theme) || 'light'
})

useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])
```

Initialize from storage, save on change.

### Custom Hook Pattern
```typescript
function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

Validates context exists, provides better error messages.

### Consuming Context
```typescript
function Header() {
  const { theme, toggleTheme } = useTheme()
  // No props needed!
}
```

Any component can access theme without passing props down.

## Testing
1. Toggle theme - UI should update
2. Refresh page - theme persists
3. Multiple components access theme
4. No prop drilling

## What's Next
Quest 2 builds notification system with context and advanced patterns.
