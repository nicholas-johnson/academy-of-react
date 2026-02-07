# Quest 1: Theme Switcher - Solution Notes

## Overview
Theme context that manages light/dark mode across the entire app. Demonstrates the core Context API pattern with localStorage persistence.

## Key Concepts

### The 3-Part Context Pattern

```javascript
// 1. Create context
const ThemeContext = createContext(undefined)

// 2. Create provider
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  // ... state logic
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Create custom hook
function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
```

### Persistence with localStorage

```javascript
// Initialize from localStorage
const [theme, setTheme] = useState(() => {
  const saved = localStorage.getItem('theme')
  return saved || 'light'
})

// Sync to localStorage
useEffect(() => {
  localStorage.setItem('theme', theme)
  document.body.className = theme
}, [theme])
```

### Why Custom Hook?

1. **Better errors** - Catch missing provider immediately
2. **Cleaner API** - `useTheme()` vs `useContext(ThemeContext)`
3. **Encapsulation** - Hide context implementation details
4. **Type safety** - In TypeScript, guarantees non-null return

## Testing
1. Toggle theme - should switch light/dark
2. Refresh page - theme should persist
3. Check body class changes
4. All components update without props
